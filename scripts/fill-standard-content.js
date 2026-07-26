#!/usr/bin/env node
/**
 * Fills placeholder pages (created by scaffold-categories.js) with generic,
 * industry-standard starting content. This is NOT a substitute for legal,
 * security or engineering review — every Legal & Policies page carries an
 * explicit draft/review notice for that reason. Certificate/* pages are
 * intentionally left untouched (compliance claims must never be
 * fabricated).
 *
 * Usage: node scripts/fill-standard-content.js
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

const LEGAL_NOTICE =
    '> **Draft template.** This is generic starting content, not a reviewed or ' +
    'binding company policy. Have Legal review and approve before publishing ' +
    'externally.\n\n';

function write(categorySlug, slug, body, { legal = false } = {}) {
    const filePath = path.join(docsDir, categorySlug, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        console.warn(`Skipping ${filePath} (not found)`);
        return;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = raw.match(/^---\n[\s\S]*?\n---\n/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
    const titleMatch = frontmatter.match(/title:\s*"(.*)"/);
    const title = titleMatch ? titleMatch[1] : slug;

    const content = frontmatter + '\n# ' + title + '\n\n' + (legal ? LEGAL_NOTICE : '') + body.trim() + '\n';
    fs.writeFileSync(filePath, content);
}

// ---------------------------------------------------------------------
// Legal & Policies (all draft templates — see LEGAL_NOTICE above)
// ---------------------------------------------------------------------

write('legal-policies', 'privacy-policy', `
Integrated Retail collects and processes personal data to deliver, support
and improve our retail technology solutions.

## What we collect
- Contact details (name, email, phone) provided when you reach out to us.
- Account and usage data for users of our platforms.
- Technical data (device, browser, IP address) for security and support.

## How we use it
- To provide and support our products and services.
- To respond to enquiries and provide customer support.
- To meet legal and regulatory obligations.

## Your rights
You may request access to, correction of, or deletion of your personal
data, subject to applicable law. Contact us at connect@integratedretail.com.

## Retention
Personal data is retained only as long as necessary for the purposes above,
or as required by law.
`, { legal: true });

write('legal-policies', 'pdpa-compliance', `
As a Singapore-headquartered company, Integrated Retail is committed to
handling personal data in accordance with the Personal Data Protection Act
2012 (PDPA).

## Our commitments
- Obtain consent before collecting, using or disclosing personal data,
  except where permitted or required by law.
- Use personal data only for the purposes it was collected for.
- Maintain reasonable security arrangements to protect personal data.
- Respond to data access and correction requests within the timeframes set
  by the Personal Data Protection Commission (PDPC).

## Contact
Data protection queries can be directed to connect@integratedretail.com.
`, { legal: true });

write('legal-policies', 'gdpr-compliance', `
For clients and users in the European Economic Area, Integrated Retail
aims to align its data handling practices with the EU General Data
Protection Regulation (GDPR) where applicable to our services.

## Principles we follow
- Lawfulness, fairness and transparency in processing personal data.
- Purpose limitation and data minimisation.
- A documented legal basis for each processing activity.
- Support for data subject rights: access, rectification, erasure,
  restriction, portability and objection.

## Data transfers
Where personal data is transferred outside the EEA, appropriate safeguards
are put in place consistent with GDPR requirements.
`, { legal: true });

write('legal-policies', 'security-policy', `
Integrated Retail maintains information security practices designed to
protect customer and company data across our products and internal
systems.

## Key areas
- **Access control** — access to systems and data is granted on a
  least-privilege, need-to-know basis.
- **Data protection** — encryption in transit, and at rest where
  applicable.
- **Monitoring** — logging and monitoring of critical systems for
  suspicious activity.
- **Incident response** — a defined process for identifying, containing
  and reporting security incidents.
- **Employee awareness** — regular security awareness practices for staff.

Specific technical controls and audit results are available to clients
under NDA upon request.
`, { legal: true });

write('legal-policies', 'sales-terms-and-conditions', `
These terms outline the general basis on which Integrated Retail supplies
products and services to customers. Specific commercial terms (pricing,
payment schedule, deliverables) are set out in the applicable quotation or
order form.

## General terms
- Quotations are valid for the period stated therein.
- Payment terms are as specified on the invoice, unless otherwise agreed in
  writing.
- Title to software/hardware passes only upon full payment, where
  applicable.
- Either party's liability is subject to the limitations set out in the
  signed agreement.

This page is a summary only — the signed contract or order form takes
precedence.
`, { legal: true });

write('legal-policies', 'master-service-agreement', `
The Master Service Agreement (MSA) is the umbrella agreement governing the
overall relationship between Integrated Retail and a client, under which
individual statements of work (SOWs) or order forms are executed.

## Typical contents
- Scope of the overall engagement and general obligations of both parties.
- Confidentiality and data protection commitments.
- Intellectual property ownership.
- Liability, indemnification and insurance.
- Term, termination and renewal.

Each client's actual MSA is a bespoke, signed legal document — this page is
a plain-language summary of what an MSA typically covers.
`, { legal: true });

write('legal-policies', 'service-level-agreement-sla', `
The Service Level Agreement (SLA) defines the support and uptime
commitments for Integrated Retail's managed services.

## Typical structure
| Severity | Description | Target response time |
| --- | --- | --- |
| Critical | Production system down | Same business day |
| High | Major function impaired | 1 business day |
| Medium | Minor function impaired | 2-3 business days |
| Low | General question / minor issue | 5 business days |

Actual response and resolution targets, support hours and uptime
commitments are defined per client contract.
`, { legal: true });

write('legal-policies', 'warranty-terms', `
Integrated Retail provides a standard warranty period for supplied
hardware and software, covering defects in materials or workmanship under
normal use.

## What's typically covered
- Repair or replacement of defective hardware within the warranty period.
- Bug fixes for reported software defects.

## What's typically excluded
- Damage from misuse, unauthorized modification, or third-party
  integrations.
- Consumables and normal wear and tear.

Exact warranty duration and terms are specified in the product order form
or contract.
`, { legal: true });

write('legal-policies', 'return-refund-policy', `
## General approach
- Returns of defective hardware are handled under the applicable warranty
  terms.
- Software/subscription services are generally non-refundable once
  activated, except as required by law or agreed in writing.
- Refund requests are reviewed on a case-by-case basis in line with the
  signed order form or contract.

Please contact connect@integratedretail.com with your order details for
any return or refund request.
`, { legal: true });

write('legal-policies', 'data-retention-policy', `
Integrated Retail retains data only for as long as necessary to fulfil the
purpose it was collected for, meet contractual obligations, or comply with
legal requirements.

## Typical retention periods
- **Account/transaction data** — for the duration of the client
  relationship, plus a defined period after termination.
- **Support tickets and logs** — retained for a limited period for
  troubleshooting and audit purposes.
- **Backups** — retained on a rolling basis per the Backup Policy.

Specific retention periods per data category should be confirmed with the
Data Protection contact.
`, { legal: true });

write('legal-policies', 'backup-policy', `
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
`, { legal: true });

write('legal-policies', 'change-management-policy', `
## Purpose
To ensure changes to production systems (software releases, configuration
changes, infrastructure updates) are made in a controlled, low-risk manner.

## Typical process
1. Change is requested and documented (what, why, impact, rollback plan).
2. Change is reviewed and approved by the relevant technical owner.
3. Change is scheduled, ideally during a low-traffic window.
4. Change is implemented and verified.
5. Outcome is logged; incidents trigger a post-change review.
`, { legal: true });

write('legal-policies', 'password-policy', `
## Minimum requirements
- Minimum password length and complexity as enforced by the platform.
- Passwords must not be shared between users.
- Multi-factor authentication (MFA) is recommended, and required for
  administrative accounts where supported.
- Passwords should be changed immediately if compromise is suspected.

## Account lockout
Accounts are typically locked after a defined number of failed login
attempts, to prevent brute-force attacks.
`, { legal: true });

write('legal-policies', 'environment-protection-policy', `
Integrated Retail is mindful of the environmental impact of its operations
and encourages practices that reduce waste and resource consumption,
including:

- Favoring digital documentation and processes over paper where possible.
- Responsible disposal and recycling of retired hardware (e-waste).
- Encouraging energy-efficient practices in office operations.

A fuller environmental policy can be developed in consultation with
management as part of the company's sustainability initiatives.
`, { legal: true });

write('legal-policies', 'health-and-safety-policy', `
## Commitment
Integrated Retail is committed to providing a safe working environment for
employees, contractors and visitors, in line with applicable local
workplace safety regulations (e.g. Singapore's Workplace Safety and Health
Act).

## Typical elements
- Safe use of equipment during on-site installations (POS hardware,
  cameras, networking equipment).
- Clear incident reporting procedures.
- Regular review of workplace safety practices.
`, { legal: true });

write('legal-policies', 'vendor-assessment-policy', `
## Purpose
To ensure third-party vendors and partners meet Integrated Retail's
expectations for security, reliability and compliance before integration
into our solutions or supply chain.

## Typical assessment areas
- Data security and privacy practices.
- Financial stability and business continuity.
- Service level commitments and support responsiveness.
- Compliance with relevant regulations for the vendor's domain.

Vendors are typically re-assessed periodically or upon material changes to
the relationship.
`, { legal: true });

write('legal-policies', 'non-disclosure-agreement-nda', `
Integrated Retail routinely enters into Non-Disclosure Agreements (NDAs)
with clients and partners to protect confidential information shared
during evaluations, implementations and ongoing engagements.

## Typical scope
- Definition of what counts as "Confidential Information".
- Obligations to protect and not disclose that information to third
  parties.
- Exclusions (information already public, independently developed, etc.).
- Duration of the confidentiality obligation.

Please request a copy of our standard NDA template from
connect@integratedretail.com.
`, { legal: true });

write('legal-policies', 'disaster-recovery-plan', `
## Purpose
To minimize downtime and data loss in the event of a major incident
affecting Integrated Retail's systems or a client's deployment.

## Typical elements
- Recovery Time Objective (RTO) and Recovery Point Objective (RPO) targets
  per system criticality.
- Documented failover procedures for critical services.
- Regular testing of backup restoration (see Backup Policy).
- Defined roles and communication plan during an incident.

Specific RTO/RPO targets are agreed per client deployment.
`, { legal: true });

write('legal-policies', 'pilot-agreement', `
Pilot / proof-of-concept engagements are typically governed by a
lightweight agreement covering:

- **Scope** — what is being tested, and for how long.
- **Success criteria** — how the pilot will be evaluated.
- **Data handling** — how any data used during the pilot is treated.
- **Commercial terms** — whether the pilot is paid, and what happens at
  the end of the pilot period (convert to full contract, extend, or end).

Contact connect@integratedretail.com to discuss a pilot for your business.
`, { legal: true });

write('legal-policies', 'corporate-social-responsibility-statement', `
Integrated Retail supports the retailers and communities we work with
across Singapore, Indonesia and Thailand by helping local businesses grow
sustainably through better technology.

## Our focus areas
- **Enabling local retail growth** — helping fashion, lifestyle and CPG
  retailers across Asia Pacific scale and compete.
- **Responsible technology** — favoring solutions that reduce waste (e.g.
  digital processes over paper, efficient inventory management that
  reduces overstock).
- **Community** — supporting the retail ecosystem through knowledge
  sharing, events and partnerships.

This statement can be expanded with specific CSR programs and metrics as
they are formalized.
`, { legal: true });

// ---------------------------------------------------------------------
// Product Documentation (remaining pages)
// ---------------------------------------------------------------------

write('product-documentation', 'slide-pack', `
A presentation-ready overview of Integrated Retail's solutions is
available for internal use and client meetings, covering:

- Company overview and track record (3,000+ storefronts, 200+ clients).
- Solution areas: POS, e-commerce, CRM, inventory, reporting & analytics.
- Case studies and client success stories.

Contact your account manager or connect@integratedretail.com for the
latest version of the slide deck.
`);

write('product-documentation', 'system-requirements', `
Typical minimum requirements for deploying our POS and retail management
solutions. Exact requirements vary by module and deployment type (cloud vs
on-premise) — confirm with the technical team for a specific project.

## Typical POS terminal requirements
- Modern Windows or Android POS terminal/tablet.
- Stable internet connection (for cloud-connected features).
- Compatible barcode scanner, receipt printer and payment terminal.

## Typical server/cloud requirements
- For on-premise deployments: a dedicated server meeting the vendor's
  minimum specification for the specific POS platform in use.
- For cloud deployments: no on-site server required, subject to network
  requirements (see [Network Requirements](../user-guide/network-requirements)).
`);

// ---------------------------------------------------------------------
// User Guide
// ---------------------------------------------------------------------

write('user-guide', 'pre-deployment-checklist', `
A typical checklist before starting a deployment:

- [ ] Site survey completed (see [Site Survey](./site-survey)).
- [ ] Network requirements confirmed (see [Network Requirements](./network-requirements)).
- [ ] Store layout and camera positions planned, if applicable.
- [ ] Hardware (POS terminals, printers, scanners) delivered to site.
- [ ] Staff accounts and roles prepared (see [Account/User Management](./account-user-management)).
- [ ] Go-live date and rollback plan agreed with the client.
`);

write('user-guide', 'site-survey', `
A site survey is typically conducted before installation to confirm the
store is ready for deployment.

## What it typically covers
- Physical layout of the store and point-of-sale locations.
- Existing network infrastructure and Wi-Fi coverage.
- Power outlet availability at POS and camera locations.
- Any site-specific constraints (e.g. structural, connectivity).

Findings from the site survey feed directly into the
[Installation Guide](./installation-guide) and
[Camera Positioning](./camera-positioning) plan.
`);

write('user-guide', 'network-requirements', `
## Typical requirements
- Stable internet connection with sufficient bandwidth for POS and
  reporting traffic.
- A dedicated VLAN or network segment for POS/retail systems, where
  possible.
- Firewall rules allowing outbound access to required cloud endpoints.
- Redundant connectivity (e.g. backup 4G/5G) recommended for
  mission-critical, cloud-connected deployments.

Specific port/endpoint requirements depend on the solution modules in use
— confirm with the technical team.
`);

write('user-guide', 'installation-guide', `
## Typical installation steps
1. Confirm the [Pre-deployment Checklist](./pre-deployment-checklist) is
   complete.
2. Install and configure POS hardware at each till point.
3. Connect hardware to the store network per the
   [Network Requirements](./network-requirements).
4. Install and configure the POS/retail software.
5. Load initial product, pricing and staff data.
6. Run through [Acceptance Testing](./acceptance-testing) before go-live.
`);

write('user-guide', 'camera-positioning', `
For deployments that include traffic counting or in-store analytics
cameras:

## General guidance
- Mount cameras to capture entry/exit points without obstruction.
- Avoid direct backlighting (e.g. facing large windows or doors) which can
  reduce detection accuracy.
- Maintain the manufacturer's recommended mounting height and angle for
  the specific camera model in use.
- Confirm camera placement covers 100% of store entrances for accurate
  footfall counting.
`);

write('user-guide', 'store-layout-planning', `
## Typical considerations
- POS terminal placement relative to customer flow and queueing.
- Network cabling / Wi-Fi access point placement for reliable coverage.
- Camera placement for traffic counting (see [Camera Positioning](./camera-positioning)).
- Space for receipt printers, scanners and payment terminals at each till.

Store layout plans are typically reviewed jointly with the client during
the [Site Survey](./site-survey).
`);

write('user-guide', 'server-installation', `
For on-premise deployments requiring a local server:

## Typical steps
1. Confirm server hardware meets [System Requirements](../product-documentation/system-requirements).
2. Install the operating system and required runtime/database components.
3. Install the POS/retail management server software.
4. Configure backups per the Backup Policy.
5. Connect POS terminals to the server over the local network.
`);

write('user-guide', 'cloud-deployment', `
For cloud-hosted deployments:

## Typical steps
1. Provision the client's cloud environment/tenant.
2. Configure connectivity from store locations per
   [Network Requirements](./network-requirements).
3. Migrate or load initial data (products, pricing, staff).
4. Configure user accounts and roles.
5. Validate connectivity and performance from each store before go-live.
`);

write('user-guide', 'on-premise-deployment', `
For on-premise deployments:

## Typical steps
1. Complete [Server Installation](./server-installation) at the primary
   site.
2. Deploy POS terminals per the [Installation Guide](./installation-guide).
3. Configure local network and, if applicable, connectivity back to head
   office for consolidated reporting.
4. Establish a local backup routine per the Backup Policy.
`);

write('user-guide', 'acceptance-testing', `
Before go-live, a round of acceptance testing typically confirms the
deployment is working as expected.

## Typical test areas
- Sales transactions (cash, card, and any other supported payment types).
- Returns and refunds.
- Inventory updates after a sale.
- Reporting and dashboard data accuracy.
- Network resilience (e.g. behavior during a brief connectivity drop, if
  applicable).

Sign-off from the client is typically obtained before the store goes
live.
`);

write('user-guide', 'account-user-management', `
## Typical roles
- **Administrator** — full access, including user and configuration
  management.
- **Store manager** — store-level reporting and operational controls.
- **Cashier/staff** — POS transaction access only.

## Best practices
- Create individual accounts per staff member rather than sharing logins.
- Review and remove access promptly when staff leave.
- Apply the [Password Policy](../legal-policies/password-policy).
`);

write('user-guide', 'device-management', `
## Typical activities
- Registering new POS terminals, printers and scanners.
- Monitoring device health/connectivity status.
- Pushing software updates to devices.
- Decommissioning and wiping devices no longer in use.
`);

write('user-guide', 'site-management', `
For multi-store operators:

## Typical activities
- Adding and configuring new store locations.
- Managing per-store settings (pricing, tax, staff assignments).
- Monitoring store-level performance via
  [Reporting and Dashboard Configuration](./reporting-and-dashboard-configuration).
`);

write('user-guide', 'reporting-and-dashboard-configuration', `
## Typical configuration steps
1. Define which KPIs matter for the business (sales, footfall conversion,
   stock turnover, etc.).
2. Set up dashboards per role (store manager vs head office).
3. Schedule automated report delivery (daily/weekly/monthly) as needed.

See also the [Reporting](../product-documentation/reporting) solution
overview.
`);

write('user-guide', 'troubleshooting', `
## Common issues and first steps
- **POS terminal offline** — check network connectivity first (see
  [Network Requirements](./network-requirements)).
- **Transaction not syncing** — confirm internet connectivity and check
  for pending sync errors in the admin console.
- **Report data looks wrong** — confirm the reporting period/filters, and
  check for any pending data sync.

If the issue persists, contact support with the store name, device ID and
a description of the issue.
`);

write('user-guide', 'data-management', `
## Typical activities
- Importing/exporting product, pricing and customer data.
- Data cleanup (e.g. merging duplicate customer records).
- Coordinating data retention per the
  [Data Retention Policy](../legal-policies/data-retention-policy).
`);

// ---------------------------------------------------------------------
// Developer Portal — purpose-only placeholders (no fabricated specs)
// ---------------------------------------------------------------------

const DEV_NOTICE = (topic) => `
_This section will contain ${topic} once published by the engineering
team. It intentionally does not include fabricated technical details —
please contact connect@integratedretail.com for current integration
support._
`;

write('developer-portal', 'api-reference', `Reference documentation for available API endpoints, request/response formats and error codes.\n${DEV_NOTICE('the API reference')}`);
write('developer-portal', 'authentication', `How to authenticate API requests (e.g. API keys, OAuth), including how to obtain and rotate credentials.\n${DEV_NOTICE('authentication details')}`);
write('developer-portal', 'sdk', `Client libraries/SDKs for integrating with Integrated Retail platforms.\n${DEV_NOTICE('SDK documentation and downloads')}`);
write('developer-portal', 'sample-code', `Example code snippets and reference implementations for common integration tasks.\n${DEV_NOTICE('sample code')}`);
write('developer-portal', 'integration-guide', `Step-by-step guidance for integrating third-party systems with our platform.\n${DEV_NOTICE('the integration guide')}`);
write('developer-portal', 'power-bi-connector', `Connecting Power BI to Integrated Retail reporting data for custom dashboards.\n${DEV_NOTICE('Power BI connector setup instructions')}`);
write('developer-portal', 'erp-integration', `Guidance for integrating with common ERP systems (e.g. product, pricing and inventory sync).\n${DEV_NOTICE('ERP integration specifics')}`);
write('developer-portal', 'pos-integration', `Guidance for integrating third-party systems with the POS platform (e.g. payment gateways, loyalty systems).\n${DEV_NOTICE('POS integration specifics')}`);
write('developer-portal', 'database-schema', `Reference schema for reporting/data-warehouse integrations.\n${DEV_NOTICE('database schema documentation')}`);

console.log('Done filling standard content.');
