#!/usr/bin/env node
/**
 * Scaffolds the Knowledge Base's category / sub-topic structure as
 * placeholder Docusaurus docs. Lives under docs/ alongside (but separate
 * from) docs/kb/, which is fully managed by scripts/sync-from-glpi.js —
 * this script never touches docs/kb/.
 *
 * Re-running is safe: existing placeholder files are left alone unless you
 * pass --force, so you can fill pages in by hand without them being
 * overwritten on the next run.
 *
 * Usage: node scripts/scaffold-categories.js [--force]
 */
const fs = require('fs');
const path = require('path');

const FORCE = process.argv.includes('--force');

const TAXONOMY = {
    'Legal & Policies': [
        'Privacy Policy',
        'PDPA Compliance',
        'GDPR Compliance',
        'Security Policy',
        'Sales Terms and Conditions',
        'Master Service Agreement',
        'Service Level Agreement (SLA)',
        'Warranty Terms',
        'Return & Refund Policy',
        'Data Retention Policy',
        'Backup Policy',
        'Change Management Policy',
        'Password Policy',
        'Environment Protection Policy',
        'Health and Safety Policy',
        'Vendor Assessment Policy',
        'Non-Disclosure Agreement (NDA)',
        'Disaster Recovery Plan',
        'Pilot Agreement',
        'Corporate Social Responsibility Statement',
    ],
    'Product Documentation': [
        'Brochure',
        'Slide Pack',
        'Datasheet',
        'System Requirements',
        'Reporting',
    ],
    'User Guide': [
        'Pre-deployment Checklist',
        'Site Survey',
        'Network Requirements',
        'Installation Guide',
        'Camera Positioning',
        'Store Layout Planning',
        'Server Installation',
        'Cloud Deployment',
        'On-premise Deployment',
        'Acceptance Testing',
        'Account/User Management',
        'Device Management',
        'Site Management',
        'Reporting and Dashboard Configuration',
        'Troubleshooting',
        'Data Management',
    ],
    Certificate: [
        'ISO 27001',
        'ISO 9001',
        'SOC Report',
        'Security Assessment',
        'Penetration Test Summary',
        'Compliance Certificates',
        'Partner Certifications',
    ],
    'Developer Portal': [
        'API Reference',
        'Authentication',
        'SDK',
        'Sample Code',
        'Integration Guide',
        'Power BI Connector',
        'ERP Integration',
        'POS Integration',
        'Database Schema',
    ],
};

function slugify(text) {
    return (
        String(text)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || 'untitled'
    );
}

const docsDir = path.join(__dirname, '..', 'docs');

let categoryPosition = 2; // 1 is docs/intro.mdx
let created = 0;
let skipped = 0;

for (const [category, subtopics] of Object.entries(TAXONOMY)) {
    const categorySlug = slugify(category);
    const categoryDir = path.join(docsDir, categorySlug);
    fs.mkdirSync(categoryDir, { recursive: true });

    fs.writeFileSync(
        path.join(categoryDir, '_category_.json'),
        JSON.stringify({ label: category, position: categoryPosition }, null, 2) + '\n'
    );
    categoryPosition++;

    subtopics.forEach((subtopic, index) => {
        const slug = slugify(subtopic);
        const filePath = path.join(categoryDir, `${slug}.md`);

        if (fs.existsSync(filePath) && !FORCE) {
            skipped++;
            return;
        }

        const escapedTitle = subtopic.replace(/"/g, '\\"');
        const content = [
            '---',
            `id: ${slug}`,
            `title: "${escapedTitle}"`,
            `sidebar_position: ${index + 1}`,
            '---',
            '',
            `# ${subtopic}`,
            '',
            '_Content coming soon._',
            '',
        ].join('\n');

        fs.writeFileSync(filePath, content);
        created++;
    });
}

console.log(`Created ${created} placeholder page(s), skipped ${skipped} existing page(s) across ${Object.keys(TAXONOMY).length} categories.`);
if (skipped > 0) {
    console.log('Run with --force to overwrite existing pages instead of skipping them.');
}
