---
id: security-uptime-recovery
title: "Security, Uptime, and Recovery FAQ"
description: "How Cegid Retail Y2 protects data, keeps trading during outages, and recovers cleanly — authentication, Standalone Mode and disaster recovery."
sidebar_position: 5
---

At Integrated Retail, we understand that your data is your most valuable
asset. Our approach to system security and ERP uptime is built on
proactive monitoring, multi-layered authentication, and robust business
continuity features.

### How does Integrated Retail protect my sensitive business data?

We implement a multi-layered security strategy:

- **Advanced authentication** — passwords are never stored in plain
  text; they use a secure "hash + salt" format. Higher-security
  environments support biometric fingerprints and magnetic stripe badges.
- **Granular access rights** — our Access Right Management (GDA) module
  lets administrators define exactly which menus and actions each user
  group can access.
- **Comprehensive traceability** — every significant action is recorded
  in a secure Event Log, providing a full audit trail.

### What happens to my store operations if the internet goes down?

If your store loses connection to the central server, Cegid Retail Y2
automatically prompts a switch to **Standalone Mode**.

- **Seamless trading** — registers continue to process sales, identify
  customers, and even apply loyalty rewards using a local database.
- **Automated recovery** — the system periodically tests for a restored
  connection, then runs a two-phase integration process to synchronize
  all offline receipts without manual data entry.

### How do you monitor and prevent system slowdowns before they impact sales?

We use **CBR Network Control (CBRNC)** to proactively manage performance
— an independent program that measures the exact response time for SQL
queries between your store and headquarters, so latency issues can be
addressed before they escalate into downtime.

### What is your strategy for POS disaster recovery and data integrity?

- **Inventory Snapshots and Statements** — "duplicate" inventory records
  for specific dates, serving as a reference point for audits and
  recovery.
- **Automated database maintenance** — the Cegid Database Maintenance
  (CDM) tool performs regular checks on dictionaries and database
  structures to prevent corruption.
- **Remote connection management** — administrators can reset
  connections, safely disconnecting users and releasing locked registers
  to restore operations quickly.

### How does regular maintenance contribute to long-term stability?

A proactive **Data Purge and Archiving** system removes obsolete records
and movement logs no longer needed for active management, keeping
processing times rapid.

### Can I restrict data visibility so stores only see what they need?

Yes. **User Restrictions** allow staff in a specific region or franchise
to only view the inventory, sales, and customer data relevant to their
authorized locations.

---

Need help with a specific issue? [Raise a support ticket](https://helpdesk.integratedretail.com/)
or contact your Retail Consultant.
