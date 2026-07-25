-- Run against the GLPI database to export articles eligible for the public
-- Knowledge Base site: flagged FAQ, and shared publicly (root entity,
-- recursive) — the same visibility rule the GLPI Knowledge Hub plugin uses
-- for anonymous visitors (see KnowbaseItem::isPubliclyVisible()).
--
-- Output is a single-row JSON array, ready to feed into
-- `npm run sync -- <file>`.

SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', k.id,
  'name', k.name,
  'answer', k.answer,
  'date_mod', k.date_mod,
  'category', COALESCE(c.name, 'Uncategorized')
))
FROM glpi_knowbaseitems k
LEFT JOIN glpi_knowbaseitems_knowbaseitemcategories kc ON kc.knowbaseitems_id = k.id
LEFT JOIN glpi_knowbaseitemcategories c ON c.id = kc.knowbaseitemcategories_id
JOIN glpi_entities_knowbaseitems e ON e.knowbaseitems_id = k.id
WHERE k.is_faq = 1 AND e.entities_id = 0 AND e.is_recursive = 1;
