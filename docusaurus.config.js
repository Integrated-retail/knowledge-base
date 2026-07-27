// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Integrated Retail Knowledge Hub',
  tagline:
    'Omnichannel POS, unified commerce and retail technology guides for fashion, lifestyle and CPG retailers in Asia Pacific',
  favicon: 'img/ir-icon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://integrated-retail.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/knowledge-base/',

  // GitHub pages deployment config.
  organizationName: 'Integrated-retail', // GitHub org name.
  projectName: 'knowledge-base', // GitHub repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          routeBasePath: '/blog',
          showReadingTime: true,
          blogTitle: 'Retail Technology Insights',
          blogDescription:
            'Guides on unified commerce, POS and retail technology for fashion, lifestyle and CPG retailers in Asia Pacific.',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social share preview image (shown on LinkedIn/Facebook/X link previews).
      image: 'img/ir-logo.png',
      metadata: [
        {
          name: 'keywords',
          content:
            'retail POS system, unified commerce, omnichannel retail, retail technology Asia Pacific, Cegid, Retail Pro Prism, POS software Singapore',
        },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        // Explicit empty title — the logo image already contains the
        // company name, so showing both would be redundant. Omitting this
        // key isn't enough; Docusaurus falls back to siteConfig.title.
        title: '',
        logo: {
          alt: 'Integrated Retail — Strategize, Execute, Grow',
          src: 'img/ir-logo.png',
          height: 40,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Knowledge Base',
          },
          { to: '/blog', label: 'Insights', position: 'left' },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Knowledge Base',
            items: [
              { label: 'Product Documentation', to: '/docs/product-documentation/brochure' },
              { label: 'Cegid Retail Platform', to: '/docs/product-documentation/cegid-retail-platform' },
              { label: 'Retail Pro Prism Platform', to: '/docs/product-documentation/retailpro-prism-platform' },
            ],
          },
          {
            title: 'Insights',
            items: [{ label: 'Retail Technology Blog', to: '/blog' }],
          },
          {
            title: 'Company',
            items: [
              { label: 'integratedretail.com', href: 'https://integratedretail.com' },
              { label: 'Contact us', href: 'https://integratedretail.com/contact/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Integrated Retail. Content synced from the internal knowledge base.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
