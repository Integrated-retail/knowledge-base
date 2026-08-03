#!/usr/bin/env node
/**
 * Turns glpi-import.json (produced by export-to-glpi.js) into a raw SQL
 * script that creates the matching KB categories and articles directly in
 * GLPI's database — public/FAQ-eligible (entities_id=0, is_recursive=1,
 * is_faq=1), authored by user id 8 (Joseph), matching the convention of
 * existing KB content on this server.
 *
 * Usage: node scripts/generate-glpi-import-sql.js glpi-import.json > import.sql
 */
const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node scripts/generate-glpi-import-sql.js <input.json>');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

const WRITER_USER_ID = 8; // Joseph

function esc(str) {
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const lines = [];
lines.push('-- Auto-generated GLPI KB import. Creates categories + FAQ articles');
lines.push('-- (public visibility: entities_id=0, is_recursive=1).');
lines.push('START TRANSACTION;');
lines.push('');

for (const { category, articles } of data) {
    lines.push(`-- Category: ${category}`);
    lines.push(
        `INSERT INTO glpi_knowbaseitemcategories (entities_id, is_recursive, knowbaseitemcategories_id, name, completename, level, date_mod, date_creation) VALUES (0, 1, 0, '${esc(category)}', '${esc(category)}', 1, NOW(), NOW());`
    );
    lines.push('SET @cat_id = LAST_INSERT_ID();');
    lines.push('');

    for (const { title, html } of articles) {
        lines.push(
            `INSERT INTO glpi_knowbaseitems (entities_id, is_recursive, name, answer, is_faq, users_id, view, date_creation, date_mod) VALUES (0, 1, '${esc(title)}', '${esc(html)}', 1, ${WRITER_USER_ID}, 0, NOW(), NOW());`
        );
        lines.push('SET @item_id = LAST_INSERT_ID();');
        lines.push(
            'INSERT INTO glpi_knowbaseitems_knowbaseitemcategories (knowbaseitems_id, knowbaseitemcategories_id) VALUES (@item_id, @cat_id);'
        );
        lines.push(
            'INSERT INTO glpi_entities_knowbaseitems (knowbaseitems_id, entities_id, is_recursive) VALUES (@item_id, 0, 1);'
        );
        lines.push('');
    }
}

lines.push('COMMIT;');

console.log(lines.join('\n'));
