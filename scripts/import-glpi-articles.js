#!/usr/bin/env node
/**
 * Writes GLPI-eligible KB articles (exported as JSON by a raw SQL query
 * mirroring Hub::getPublishableArticles()) into docs/, using the same
 * layout rules as GithubPublisher.php: articles in one of the five
 * top-level categories land in docs/<slug>/ with a clean, ID-free URL;
 * everything else lands in docs/kb/<category-slug>/ with an ID-suffixed
 * URL. Also updates docs/.glpi-sync-manifest.json so a future automated
 * publish (once the org repo has a working deploy key) knows these files
 * are GLPI-managed.
 *
 * Usage: node scripts/import-glpi-articles.js glpi-publishable.json
 */
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node scripts/import-glpi-articles.js <input.json>');
    process.exit(1);
}

const docsRoot = path.join(__dirname, '..', 'docs');
const manifestPath = path.join(docsRoot, '.glpi-sync-manifest.json');

const TOP_LEVEL_CATEGORIES = {
    'legal & policies': 'legal-policies',
    'product documentation': 'product-documentation',
    'user guide': 'user-guide',
    'developer portal': 'developer-portal',
    certificate: 'certificate',
};

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function slugify(text) {
    let s = String(text).toLowerCase().trim();
    s = s.replace(/[^a-z0-9]+/g, '-');
    s = s.replace(/^-+|-+$/g, '');
    return s || 'untitled';
}

const articles = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

const oldManifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
const writtenNow = [];

const byCategory = {};
for (const a of articles) {
    const cat = a.category || 'Uncategorized';
    (byCategory[cat] = byCategory[cat] || []).push(a);
}

let count = 0;
for (const [category, items] of Object.entries(byCategory)) {
    const categoryKey = category.toLowerCase().trim();
    const isTopLevel = Object.prototype.hasOwnProperty.call(TOP_LEVEL_CATEGORIES, categoryKey);
    const categorySlug = isTopLevel ? TOP_LEVEL_CATEGORIES[categoryKey] : slugify(category);
    const categoryDir = isTopLevel ? path.join(docsRoot, categorySlug) : path.join(docsRoot, 'kb', categorySlug);
    const manifestBase = isTopLevel ? categorySlug : `kb/${categorySlug}`;

    fs.mkdirSync(categoryDir, { recursive: true });

    const catJsonPath = path.join(categoryDir, '_category_.json');
    if (!fs.existsSync(catJsonPath)) {
        fs.writeFileSync(catJsonPath, JSON.stringify({ label: category, position: 1 }, null, 2) + '\n');
    }

    for (const article of items) {
        const topicSlug = slugify(article.name || 'untitled');
        const fileSlug = `${topicSlug}-${article.id}`;
        const urlSlug = isTopLevel ? topicSlug : fileSlug;

        let markdown = (article.answer || '').trim() === '' ? '' : turndown.turndown(article.answer);
        markdown = markdown.trim();
        if (markdown === '') {
            markdown = '_This article has no content yet._';
        }

        const title = String(article.name || 'Untitled').replace(/"/g, '\\"');
        const slugPrefix = isTopLevel ? categorySlug : `kb/${categorySlug}`;
        const frontmatter = `---\nid: ${fileSlug}\ntitle: "${title}"\nslug: /${slugPrefix}/${urlSlug}\n---\n\n`;

        fs.writeFileSync(path.join(categoryDir, `${fileSlug}.md`), frontmatter + markdown + '\n');
        writtenNow.push(`${manifestBase}/${fileSlug}.md`);
        count++;
    }
}

const newManifest = Array.from(new Set([...oldManifest, ...writtenNow])).sort();
fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2) + '\n');

console.log(`Wrote ${count} article(s) across ${Object.keys(byCategory).length} categories.`);
console.log(`Manifest now tracks ${newManifest.length} file(s).`);
