# Integrated Retail Knowledge Base (public site)

Docusaurus site published to GitHub Pages at
https://integrated-retail.github.io/KB-Test/.

Articles under `docs/kb/` are **generated, not hand-written** — they're
synced from the internal GLPI knowledge base (only articles flagged FAQ with
public/root-entity visibility are included, same rule the GLPI Knowledge Hub
plugin uses for anonymous visitors). Anything outside `docs/kb/` (like
`docs/intro.mdx`) is safe to hand-edit.

## Syncing content from GLPI

1. On the GLPI server, export eligible articles as JSON (id, name, answer,
   category). See the SQL query in `scripts/glpi-export-query.sql`.
2. Copy the resulting JSON file to this machine.
3. Run:
   ```bash
   npm run sync -- path/to/export.json
   ```
   This regenerates everything under `docs/kb/` from the export (existing
   files there are replaced; nothing else is touched).
4. Review the diff (`git status` / `git diff`), then commit.

## Local development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
GIT_USER=<your GitHub username> npm run deploy
```

Builds the site and pushes the `build/` output to the `gh-pages` branch,
which GitHub Pages is configured to serve from.
