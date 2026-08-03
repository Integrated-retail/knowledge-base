#!/usr/bin/env node
/**
 * Converts the 3 hand-written SEO blog posts into HTML for GLPI import.
 * GLPI's KB item only has one "name" field, used both for display and for
 * GithubPublisher's slug generation — so `name` here is a short phrase
 * chosen to slugify to the exact same URL the post already has. The full
 * SEO title is kept as an H2 at the top of the body so readers still see
 * it, even though the frontmatter title (derived from `name`) is shorter.
 *
 * Usage: node scripts/export-blog-to-glpi.js > blog-import.json
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

const posts = [
    { dir: 'blog/2026-07-20-what-is-unified-commerce', name: 'What Is Unified Commerce' },
    { dir: 'blog/2026-07-22-choosing-a-pos-system-for-fashion-retail', name: 'Choosing A POS System For Fashion Retail' },
    { dir: 'blog/2026-07-24-signs-you-need-an-omnichannel-upgrade', name: 'Signs You Need An Omnichannel Upgrade' },
];

const result = [];

for (const { dir, name } of posts) {
    const filePath = path.join(__dirname, '..', dir, 'index.md');
    const raw = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const parsed = fm(raw);
    const fullTitle = parsed.attributes.title;

    let body = parsed.body.trim();
    body = body.replace(/\{\/\*\s*truncate\s*\*\/\}\n*/, '');

    const markdown = `## ${fullTitle}\n\n${body}`;
    const html = marked.parse(markdown).trim();

    result.push({ name, category: 'Blog', answer: html });
}

console.log(JSON.stringify(result, null, 2));
