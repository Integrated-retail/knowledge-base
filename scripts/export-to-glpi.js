#!/usr/bin/env node
/**
 * Exports the hand-written placeholder/draft content (Legal & Policies,
 * Product Documentation, User Guide, Developer Portal, Certificate) into a
 * JSON file, converting markdown bodies to HTML, ready to be imported into
 * GLPI as real KB articles.
 *
 * Usage: node scripts/export-to-glpi.js > glpi-import.json
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

const docsDir = path.join(__dirname, '..', 'docs');

const CATEGORIES = {
    'legal-policies': 'Legal & Policies',
    'product-documentation': 'Product Documentation',
    'user-guide': 'User Guide',
    'developer-portal': 'Developer Portal',
    certificate: 'Certificate',
};

const result = [];

for (const [folder, categoryName] of Object.entries(CATEGORIES)) {
    const dir = path.join(docsDir, folder);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    const articles = [];

    for (const file of files) {
        const raw = fs.readFileSync(path.join(dir, file), 'utf8').replace(/\r\n/g, '\n');
        const parsed = fm(raw);
        const title = parsed.attributes.title || file.replace(/\.md$/, '');

        // Strip a leading "# Title" heading that just repeats the frontmatter title.
        let body = parsed.body.trim().replace(/^#\s+.+\n+/, '');
        const html = marked.parse(body).trim();

        articles.push({ title, html });
    }

    result.push({ category: categoryName, articles });
}

console.log(JSON.stringify(result, null, 2));
