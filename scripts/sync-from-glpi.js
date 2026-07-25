#!/usr/bin/env node
/**
 * Converts a GLPI Knowledge Base export (JSON) into Docusaurus markdown docs.
 *
 * The export JSON is produced on the GLPI server from glpi_knowbaseitems,
 * restricted to articles that are flagged FAQ and have public (root entity,
 * recursive) visibility — the same rule the GLPI Knowledge Hub plugin page
 * uses for anonymous visitors.
 *
 * Usage: node scripts/sync-from-glpi.js <export.json>
 */
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const exportPath = process.argv[2];
if (!exportPath) {
    console.error('Usage: node scripts/sync-from-glpi.js <export.json>');
    process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
const turndown = new TurndownService();

const docsDir = path.join(__dirname, '..', 'docs');
const syncedRoot = path.join(docsDir, 'kb');

function slugify(text) {
    return (
        String(text)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || 'untitled'
    );
}

// Only touch the "kb/" subfolder, so any hand-written docs elsewhere are untouched.
fs.rmSync(syncedRoot, { recursive: true, force: true });
fs.mkdirSync(syncedRoot, { recursive: true });

const byCategory = {};
for (const article of articles) {
    const category = article.category || 'Uncategorized';
    (byCategory[category] = byCategory[category] || []).push(article);
}

let count = 0;
for (const [category, items] of Object.entries(byCategory)) {
    const categorySlug = slugify(category);
    const categoryDir = path.join(syncedRoot, categorySlug);
    fs.mkdirSync(categoryDir, { recursive: true });

    fs.writeFileSync(
        path.join(categoryDir, '_category_.json'),
        JSON.stringify({ label: category, position: 1 }, null, 2) + '\n'
    );

    for (const article of items) {
        const slug = `${slugify(article.name)}-${article.id}`;
        const markdown = turndown.turndown(article.answer || '').trim();
        const frontmatter = [
            '---',
            `id: ${slug}`,
            `title: ${JSON.stringify(article.name || 'Untitled')}`,
            `slug: /kb/${categorySlug}/${slug}`,
            '---',
            '',
        ].join('\n');

        fs.writeFileSync(
            path.join(categoryDir, `${slug}.md`),
            frontmatter + (markdown || '_This article has no content yet._') + '\n'
        );
        count++;
    }
}

const categoryCount = Object.keys(byCategory).length;
console.log(`Synced ${count} article(s) across ${categoryCount} categor${categoryCount === 1 ? 'y' : 'ies'}.`);
