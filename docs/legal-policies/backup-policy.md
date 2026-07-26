---
id: backup-policy
title: "Backup Policy"
sidebar_position: 11
---

# Backup Policy

> **Draft template.** This is generic starting content, not a reviewed or binding company policy. Have Legal review and approve before publishing externally.

## Principles
- Production data is backed up on a regular schedule appropriate to its
  criticality.
- Backups are tested periodically to confirm they can be restored.
- Backup storage is protected with access controls and, where applicable,
  encryption.

## Typical schedule
| Data type | Frequency | Retention |
| --- | --- | --- |
| Transactional/database | Daily | Rolling 30 days |
| Configuration | On change | Last 5 versions |
| Full system | Weekly | Rolling 3 months |

Actual schedules vary by deployment (cloud vs on-premise) — confirm with
the infrastructure team for a specific environment.
