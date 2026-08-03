#!/usr/bin/env node
/**
 * Writes GLPI Blog-category articles into blog/<date>-<slug>-<id>/index.md,
 * mirroring GithubPublisher::writeBlogPost()'s exact output format so this
 * matches what a real "Publish to GitHub" click would generate.
 *
 * Usage: node scripts/import-blog-articles.js articles.json
 * articles.json: [{ id, name, answer, date }]
 */
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node scripts/import-blog-articles.js <input.json>');
    process.exit(1);
}

const blogRoot = path.join(__dirname, '..', 'blog');
const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function slugify(text) {
    let s = String(text).toLowerCase().trim();
    s = s.replace(/[^a-z0-9]+/g, '-');
    s = s.replace(/^-+|-+$/g, '');
    return s || 'untitled';
}

function insertTruncateMarker(markdown) {
    const blocks = markdown.split('\n\n');
    const insertIndex = blocks.findIndex((b) => !b.trim().startsWith('#'));
    if (insertIndex === -1) return markdown;
    blocks.splice(insertIndex + 1, 0, '{/* truncate */}');
    return blocks.join('\n\n');
}

const articles = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

for (const article of articles) {
    const topicSlug = slugify(article.name || 'untitled');
    const date = article.date;
    const folderSlug = `${date}-${topicSlug}-${article.id}`;
    const postDir = path.join(blogRoot, folderSlug);
    fs.mkdirSync(postDir, { recursive: true });

    let markdown = (article.answer || '').trim() === '' ? '' : turndown.turndown(article.answer);
    markdown = markdown.trim();
    if (markdown === '') markdown = '_This post has no content yet._';
    markdown = insertTruncateMarker(markdown);

    const title = String(article.name || 'Untitled').replace(/"/g, '\\"');
    const frontmatter = `---\nslug: ${topicSlug}\ntitle: "${title}"\nauthors: [integratedretail]\ndate: ${date}\n---\n\n`;

    fs.writeFileSync(path.join(postDir, 'index.md'), frontmatter + markdown + '\n');
    console.log(`Wrote blog/${folderSlug}/index.md`);
}
