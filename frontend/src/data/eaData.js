/**
 * Enterprise Architecture Platform — Mock Dataset
 * Simulates real operational data from the canonical EA repository.
 * All charts in the dashboard derive from this data.
 */

// ─── APPLICATION INVENTORY (Canonical Store) ───
export const applications = [
  { id: 'APP-001', name: 'SAP S/4HANA Finance', domain: 'Finance', status: 'Active', source: 'SAP PPM', owner: 'Finance IT', techStack: 'SAP ABAP', version: '2023', eol: null, lastSync: '2026-08-13T22:14:00Z', latencyMin: 1420, capabilityMap: ['Financial Reporting', 'General Ledger'], costPerYear: 385000, users: 2800 },
  { id: 'APP-002', name: 'ServiceNow ITSM', domain: 'IT Operations', status: 'Active', source: 'ServiceNow CMDB', owner: 'Global IT Ops', techStack: 'ServiceNow', version: '2024.2', eol: null, lastSync: '2026-08-14T02:58:00Z', latencyMin: 4, capabilityMap: ['Incident Management', 'Change Management'], costPerYear: 290000, users: 5200 },
  { id: 'APP-003', name: 'Signavio Process Intelligence', domain: 'Process', status: 'Active', source: 'Signavio Hub', owner: 'Process COE', techStack: 'Signavio Cloud', version: '15.2', eol: null, lastSync: '2026-08-14T00:30:00Z', latencyMin: 180, capabilityMap: ['Process Mining', 'Process Modelling'], costPerYear: 125000, users: 340 },
  { id: 'APP-004', name: 'Apptio Cost Transparency', domain: 'Finance', status: 'Active', source: 'Apptio TBM', owner: 'IT Finance', techStack: 'Apptio SaaS', version: '2024.1', eol: null, lastSync: '2026-08-13T18:00:00Z', latencyMin: 720, capabilityMap: ['IT Cost Allocation', 'Showback'], costPerYear: 178000, users: 120 },
  { id: 'APP-005', name: 'Workday HCM', domain: 'HR', status: 'Active', source: 'ServiceNow CMDB', owner: 'HR Technology', techStack: 'Workday SaaS', version: '2024R2', eol: null, lastSync: '2026-08-14T01:12:00Z', latencyMin: 28, capabilityMap: ['Core HR', 'Payroll', 'Talent Management'], costPerYear: 420000, users: 8400 },
  { id: 'APP-006', name: 'Salesforce Sales Cloud', domain: 'Customer', status: 'Active', source: 'ServiceNow CMDB', owner: 'Commercial IT', techStack: 'Salesforce', version: 'Spring 24', eol: null, lastSync: '2026-08-14T02:45:00Z', latencyMin: 8, capabilityMap: ['CRM', 'Opportunity Management'], costPerYear: 340000, users: 3100 },
  { id: 'APP-007', name: 'Oracle E-Business Suite 12.1', domain: 'Supply Chain', status: 'End-of-Life', source: 'SAP PPM', owner: 'Supply Chain IT', techStack: 'Oracle DB 12c', version: '12.1.3', eol: '2025-12-31', lastSync: '2026-08-07T06:00:00Z', latencyMin: 10080, capabilityMap: ['Procurement', 'Inventory'], costPerYear: 520000, users: 1200 },
  { id: 'APP-008', name: 'Legacy ERP Gateway', domain: 'Finance', status: 'End-of-Life', source: 'Apptio TBM', owner: 'Legacy Ops', techStack: 'Mainframe COBOL', version: '6.4', eol: '2024-06-30', lastSync: '2026-07-15T12:00:00Z', latencyMin: 43200, capabilityMap: ['Accounts Payable'], costPerYear: 280000, users: 45 },
  { id: 'APP-009', name: 'Snowflake Enterprise DW', domain: 'Data & Analytics', status: 'Active', source: 'ServiceNow CMDB', owner: 'Data Platform Team', techStack: 'Snowflake', version: '8.x', eol: null, lastSync: '2026-08-14T03:01:00Z', latencyMin: 2, capabilityMap: ['Data Warehousing', 'Analytics'], costPerYear: 195000, users: 680 },
  { id: 'APP-010', name: 'SAP SuccessFactors', domain: 'HR', status: 'Active', source: 'SAP PPM', owner: 'Enterprise HR', techStack: 'SAP Cloud', version: '2H 2024', eol: null, lastSync: '2026-08-13T20:00:00Z', latencyMin: 1440, capabilityMap: ['Recruitment', 'Learning'], costPerYear: 210000, users: 4600 },
  { id: 'APP-011', name: 'Jira Enterprise Hub', domain: 'Engineering', status: 'Active', source: 'ServiceNow CMDB', owner: 'DevOps COE', techStack: 'Atlassian Cloud', version: '9.12', eol: null, lastSync: '2026-08-14T03:02:00Z', latencyMin: 3, capabilityMap: ['Project Tracking', 'Agile Management'], costPerYear: 62000, users: 2400 },
  { id: 'APP-012', name: 'Signavio Process Manager', domain: 'Process', status: 'Active', source: 'Signavio Hub', owner: 'EA Board', techStack: 'Signavio Cloud', version: '15.2', eol: null, lastSync: '2026-08-14T00:30:00Z', latencyMin: 240, capabilityMap: ['BPMN Modelling'], costPerYear: 85000, users: 180 },
  { id: 'APP-013', name: 'Concur Expense Portal', domain: 'Finance', status: 'Under Review', source: 'Apptio TBM', owner: 'Travel & Expense', techStack: 'SAP Concur', version: '2023', eol: null, lastSync: '2026-08-12T14:00:00Z', latencyMin: 2880, capabilityMap: ['Expense Management'], costPerYear: 92000, users: 6100 },
  { id: 'APP-014', name: 'SAP Ariba Procurement', domain: 'Supply Chain', status: 'Active', source: 'SAP PPM', owner: 'Procurement IT', techStack: 'SAP Ariba', version: '2024', eol: null, lastSync: '2026-08-13T18:00:00Z', latencyMin: 720, capabilityMap: ['Procurement', 'Supplier Management'], costPerYear: 165000, users: 890 },
  { id: 'APP-015', name: 'ServiceNow SecOps', domain: 'Security', status: 'Planned', source: 'ServiceNow CMDB', owner: 'InfoSec Team', techStack: 'ServiceNow', version: '2024.2', eol: null, lastSync: null, latencyMin: null, capabilityMap: ['Vulnerability Response', 'Threat Intelligence'], costPerYear: 145000, users: 0 },
  { id: 'APP-016', name: 'Tableau Analytics Server', domain: 'Data & Analytics', status: 'Under Review', source: 'Apptio TBM', owner: 'BI Centre', techStack: 'Tableau Server', version: '2023.3', eol: '2026-12-31', lastSync: '2026-08-13T06:00:00Z', latencyMin: 1440, capabilityMap: ['Dashboarding', 'Reporting'], costPerYear: 155000, users: 920 },
  { id: 'APP-017', name: 'Legacy Warehouse System', domain: 'Supply Chain', status: 'End-of-Life', source: 'SAP PPM', owner: 'Logistics Ops', techStack: 'Custom .NET 4.5', version: '3.1', eol: '2025-03-31', lastSync: '2026-07-28T12:00:00Z', latencyMin: 20160, capabilityMap: ['Warehouse Mgmt'], costPerYear: 310000, users: 180 },
  { id: 'APP-018', name: 'Apptio Cloudability', domain: 'Finance', status: 'Active', source: 'Apptio TBM', owner: 'Cloud FinOps', techStack: 'Apptio SaaS', version: '2024', eol: null, lastSync: '2026-08-14T01:00:00Z', latencyMin: 180, capabilityMap: ['Cloud Cost Mgmt', 'FinOps'], costPerYear: 110000, users: 85 },
  { id: 'APP-019', name: 'Customer Portal v1', domain: 'Customer', status: 'End-of-Life', source: 'ServiceNow CMDB', owner: 'Digital Channels', techStack: 'PHP 5.6 / MySQL 5.5', version: '1.8', eol: '2024-01-31', lastSync: '2026-06-10T00:00:00Z', latencyMin: 86400, capabilityMap: ['Self-Service Portal'], costPerYear: 75000, users: 12 },
  { id: 'APP-020', name: 'SAP IBP Planning', domain: 'Supply Chain', status: 'Planned', source: 'SAP PPM', owner: 'Supply Chain COE', techStack: 'SAP Cloud', version: '2024', eol: null, lastSync: null, latencyMin: null, capabilityMap: ['Demand Planning', 'S&OP'], costPerYear: 230000, users: 0 },
  { id: 'APP-021', name: 'ServiceNow HRSD', domain: 'HR', status: 'Under Review', source: 'ServiceNow CMDB', owner: 'HR Operations', techStack: 'ServiceNow', version: '2024.1', eol: null, lastSync: '2026-08-14T02:00:00Z', latencyMin: 15, capabilityMap: ['Employee Case Mgmt'], costPerYear: 98000, users: 3200 },
  { id: 'APP-022', name: 'Contract Lifecycle Mgmt', domain: 'Legal', status: 'Active', source: 'Signavio Hub', owner: 'Legal Tech Team', techStack: 'Icertis Cloud', version: '8.2', eol: null, lastSync: '2026-08-13T22:00:00Z', latencyMin: 360, capabilityMap: ['Contract Mgmt'], costPerYear: 88000, users: 210 },
  { id: 'APP-023', name: 'Power BI Enterprise', domain: 'Data & Analytics', status: 'Active', source: 'ServiceNow CMDB', owner: 'BI Centre', techStack: 'Microsoft PBI', version: '2024', eol: null, lastSync: '2026-08-14T02:30:00Z', latencyMin: 10, capabilityMap: ['Self-Service BI'], costPerYear: 45000, users: 1450 },
  { id: 'APP-024', name: 'Azure DevOps', domain: 'Engineering', status: 'Active', source: 'ServiceNow CMDB', owner: 'Platform Eng', techStack: 'Azure', version: '2024', eol: null, lastSync: '2026-08-14T03:00:00Z', latencyMin: 5, capabilityMap: ['CI/CD', 'Source Control'], costPerYear: 72000, users: 1800 },
  { id: 'APP-025', name: 'Mulesoft Integration', domain: 'Integration', status: 'Active', source: 'ServiceNow CMDB', owner: 'Integration COE', techStack: 'Mulesoft Anypoint', version: '4.6', eol: null, lastSync: '2026-08-14T02:55:00Z', latencyMin: 6, capabilityMap: ['API Management', 'ESB'], costPerYear: 215000, users: 320 },
  { id: 'APP-026', name: 'Adobe Creative Cloud', domain: 'Customer', status: 'Active', source: 'ServiceNow CMDB', owner: 'Digital Channels', techStack: 'Adobe SaaS', version: '2024', eol: null, lastSync: '2026-08-14T01:00:00Z', latencyMin: 60, capabilityMap: ['Design', 'Content'], costPerYear: 185000, users: 450 },
  { id: 'APP-027', name: 'KPMG Tax Portal', domain: 'Finance', status: 'Under Review', source: 'Apptio TBM', owner: 'Tax Team', techStack: 'Custom Java', version: '4.2', eol: null, lastSync: '2026-08-10T12:00:00Z', latencyMin: 1440, capabilityMap: ['Tax Reporting'], costPerYear: 65000, users: 40 },
  { id: 'APP-028', name: 'Zendesk Support', domain: 'Customer', status: 'Active', source: 'ServiceNow CMDB', owner: 'Customer Support', techStack: 'Zendesk', version: 'Cloud', eol: null, lastSync: '2026-08-14T03:00:00Z', latencyMin: 10, capabilityMap: ['Ticketing', 'Support'], costPerYear: 210000, users: 1800 },
  { id: 'APP-029', name: 'Legacy HR Gateway', domain: 'HR', status: 'End-of-Life', source: 'SAP PPM', owner: 'HR Operations', techStack: 'Lotus Notes', version: '8.5', eol: '2024-12-31', lastSync: '2026-08-01T00:00:00Z', latencyMin: 10080, capabilityMap: ['Employee Records'], costPerYear: 110000, users: 20 },
  { id: 'APP-030', name: 'CrowdStrike Falcon', domain: 'Security', status: 'Active', source: 'ServiceNow CMDB', owner: 'InfoSec Team', techStack: 'CrowdStrike', version: '2024', eol: null, lastSync: '2026-08-14T03:30:00Z', latencyMin: 1, capabilityMap: ['Endpoint Protection'], costPerYear: 420000, users: 12000 },
  { id: 'APP-031', name: 'Okta Identity', domain: 'Security', status: 'Active', source: 'ServiceNow CMDB', owner: 'IAM Team', techStack: 'Okta', version: 'Cloud', eol: null, lastSync: '2026-08-14T03:30:00Z', latencyMin: 2, capabilityMap: ['SSO', 'IAM'], costPerYear: 380000, users: 12500 },
  { id: 'APP-032', name: 'Coupa Spend Management', domain: 'Finance', status: 'Active', source: 'SAP PPM', owner: 'Procurement IT', techStack: 'Coupa Cloud', version: '2024', eol: null, lastSync: '2026-08-13T20:00:00Z', latencyMin: 1440, capabilityMap: ['Procurement', 'Invoicing'], costPerYear: 260000, users: 1400 },
  { id: 'APP-033', name: 'Datadog APM', domain: 'IT Operations', status: 'Active', source: 'ServiceNow CMDB', owner: 'Platform Eng', techStack: 'Datadog', version: 'Cloud', eol: null, lastSync: '2026-08-14T03:15:00Z', latencyMin: 1, capabilityMap: ['Monitoring', 'APM'], costPerYear: 510000, users: 650 },
  { id: 'APP-034', name: 'Splunk Enterprise', domain: 'IT Operations', status: 'Active', source: 'ServiceNow CMDB', owner: 'InfoSec Team', techStack: 'Splunk', version: '9.1', eol: null, lastSync: '2026-08-14T03:00:00Z', latencyMin: 5, capabilityMap: ['Log Management', 'SIEM'], costPerYear: 650000, users: 400 },
  { id: 'APP-035', name: 'Qualtrics CoreXM', domain: 'Customer', status: 'Active', source: 'Apptio TBM', owner: 'Marketing Tech', techStack: 'Qualtrics', version: 'Cloud', eol: null, lastSync: '2026-08-13T12:00:00Z', latencyMin: 2880, capabilityMap: ['Survey', 'Experience Mgmt'], costPerYear: 175000, users: 300 },
  { id: 'APP-036', name: 'BlackLine', domain: 'Finance', status: 'Active', source: 'SAP PPM', owner: 'Finance IT', techStack: 'BlackLine Cloud', version: '2024', eol: null, lastSync: '2026-08-13T23:00:00Z', latencyMin: 1440, capabilityMap: ['Financial Close'], costPerYear: 145000, users: 250 },
  { id: 'APP-037', name: 'Oracle Hyperion', domain: 'Finance', status: 'Under Review', source: 'SAP PPM', owner: 'FP&A Team', techStack: 'Oracle EPM', version: '11.2', eol: '2027-12-31', lastSync: '2026-08-13T18:00:00Z', latencyMin: 1440, capabilityMap: ['Financial Planning'], costPerYear: 280000, users: 180 },
  { id: 'APP-038', name: 'Jenkins CI', domain: 'Engineering', status: 'Under Review', source: 'ServiceNow CMDB', owner: 'DevOps COE', techStack: 'Jenkins', version: '2.401', eol: null, lastSync: '2026-08-14T02:00:00Z', latencyMin: 60, capabilityMap: ['CI/CD'], costPerYear: 25000, users: 1200 },
  { id: 'APP-039', name: 'GitLab Enterprise', domain: 'Engineering', status: 'Planned', source: 'ServiceNow CMDB', owner: 'DevOps COE', techStack: 'GitLab', version: '16.x', eol: null, lastSync: null, latencyMin: null, capabilityMap: ['Source Control', 'CI/CD'], costPerYear: 180000, users: 0 },
  { id: 'APP-040', name: 'Informatica MDM', domain: 'Data & Analytics', status: 'Active', source: 'SAP PPM', owner: 'Data Platform Team', techStack: 'Informatica', version: '10.4', eol: null, lastSync: '2026-08-13T22:00:00Z', latencyMin: 1440, capabilityMap: ['Master Data Management'], costPerYear: 320000, users: 90 },
  { id: 'APP-041', name: 'Alteryx Designer', domain: 'Data & Analytics', status: 'Active', source: 'Apptio TBM', owner: 'BI Centre', techStack: 'Alteryx', version: '2023.2', eol: null, lastSync: '2026-08-12T12:00:00Z', latencyMin: 4320, capabilityMap: ['Data Prep', 'Analytics'], costPerYear: 110000, users: 150 },
  { id: 'APP-042', name: 'Kinexus Warehouse', domain: 'Supply Chain', status: 'End-of-Life', source: 'SAP PPM', owner: 'Logistics Ops', techStack: 'Legacy C++', version: '2.0', eol: '2024-03-31', lastSync: '2026-07-01T00:00:00Z', latencyMin: 86400, capabilityMap: ['Warehouse Mgmt'], costPerYear: 185000, users: 65 },
  { id: 'APP-043', name: 'Manhattan Active WM', domain: 'Supply Chain', status: 'Planned', source: 'SAP PPM', owner: 'Logistics Ops', techStack: 'Manhattan Cloud', version: '2024', eol: null, lastSync: null, latencyMin: null, capabilityMap: ['Warehouse Mgmt'], costPerYear: 420000, users: 0 },
  { id: 'APP-044', name: 'Workday Adaptive Planning', domain: 'Finance', status: 'Planned', source: 'Apptio TBM', owner: 'FP&A Team', techStack: 'Workday Cloud', version: '2024', eol: null, lastSync: null, latencyMin: null, capabilityMap: ['Financial Planning'], costPerYear: 210000, users: 0 },
  { id: 'APP-045', name: 'DocuSign Enterprise', domain: 'Legal', status: 'Active', source: 'Signavio Hub', owner: 'Legal Tech Team', techStack: 'DocuSign SaaS', version: 'Cloud', eol: null, lastSync: '2026-08-14T01:00:00Z', latencyMin: 120, capabilityMap: ['E-Signature'], costPerYear: 145000, users: 3800 },
  { id: 'APP-046', name: 'Palo Alto Panorama', domain: 'Security', status: 'Active', source: 'ServiceNow CMDB', owner: 'Network Sec', techStack: 'Palo Alto Networks', version: '11.0', eol: null, lastSync: '2026-08-14T03:15:00Z', latencyMin: 2, capabilityMap: ['Firewall Management'], costPerYear: 285000, users: 45 },
  { id: 'APP-047', name: 'Cisco Webex', domain: 'IT Operations', status: 'Under Review', source: 'ServiceNow CMDB', owner: 'Digital Workplace', techStack: 'Cisco Cloud', version: '43.x', eol: null, lastSync: '2026-08-13T20:00:00Z', latencyMin: 1440, capabilityMap: ['Collaboration'], costPerYear: 320000, users: 8500 },
  { id: 'APP-048', name: 'Microsoft Teams', domain: 'IT Operations', status: 'Active', source: 'ServiceNow CMDB', owner: 'Digital Workplace', techStack: 'M365', version: 'Cloud', eol: null, lastSync: '2026-08-14T03:00:00Z', latencyMin: 5, capabilityMap: ['Collaboration'], costPerYear: 850000, users: 12000 },
  { id: 'APP-049', name: 'Miro Enterprise', domain: 'IT Operations', status: 'Active', source: 'Apptio TBM', owner: 'Agile COE', techStack: 'Miro Cloud', version: 'Cloud', eol: null, lastSync: '2026-08-13T10:00:00Z', latencyMin: 2880, capabilityMap: ['Whiteboarding'], costPerYear: 115000, users: 3200 },
  { id: 'APP-050', name: 'Trellis Custom CRM', domain: 'Customer', status: 'End-of-Life', source: 'SAP PPM', owner: 'Commercial IT', techStack: 'PHP 7.4', version: '4.1', eol: '2025-06-30', lastSync: '2026-08-01T00:00:00Z', latencyMin: 10080, capabilityMap: ['CRM'], costPerYear: 95000, users: 150 },
];

// ─── PROJECTS (from SAP PPM) ───
export const projects = [
  { id: 'PRJ-001', name: 'Cloud Migration Wave 1', status: 'In Progress', phase: 'Execution', startDate: '2025-10-01', endDate: '2026-06-30', budget: 1200000, spent: 840000, appsImpacted: ['APP-007', 'APP-008', 'APP-017'], riskLevel: 'High', owner: 'Cloud COE' },
  { id: 'PRJ-002', name: 'ServiceNow HRSD Rollout', status: 'In Progress', phase: 'Build', startDate: '2026-01-15', endDate: '2026-09-30', budget: 450000, spent: 180000, appsImpacted: ['APP-021', 'APP-005'], riskLevel: 'Medium', owner: 'HR Technology' },
  { id: 'PRJ-003', name: 'Oracle DB 12c Retirement', status: 'Planning', phase: 'Architecture', startDate: '2026-04-01', endDate: '2027-03-31', budget: 890000, spent: 45000, appsImpacted: ['APP-007', 'APP-016'], riskLevel: 'High', owner: 'Data Platform' },
  { id: 'PRJ-004', name: 'Data Mesh Platform Build', status: 'In Progress', phase: 'Execution', startDate: '2025-07-01', endDate: '2026-12-31', budget: 680000, spent: 520000, appsImpacted: ['APP-009', 'APP-023', 'APP-025'], riskLevel: 'Low', owner: 'Data Platform' },
  { id: 'PRJ-005', name: 'SecOps Implementation', status: 'Planning', phase: 'Requirements', startDate: '2026-07-01', endDate: '2027-06-30', budget: 320000, spent: 12000, appsImpacted: ['APP-015', 'APP-002'], riskLevel: 'Medium', owner: 'InfoSec' },
  { id: 'PRJ-006', name: 'SAP IBP Deployment', status: 'Planning', phase: 'Design', startDate: '2026-09-01', endDate: '2027-08-31', budget: 560000, spent: 0, appsImpacted: ['APP-020', 'APP-014'], riskLevel: 'Medium', owner: 'Supply Chain COE' },
  { id: 'PRJ-007', name: 'Legacy ERP Decommission', status: 'In Progress', phase: 'Migration', startDate: '2025-04-01', endDate: '2026-09-30', budget: 340000, spent: 290000, appsImpacted: ['APP-008'], riskLevel: 'High', owner: 'Legacy Ops' },
  { id: 'PRJ-008', name: 'Customer Portal v2', status: 'In Progress', phase: 'Build', startDate: '2026-02-01', endDate: '2026-11-30', budget: 275000, spent: 110000, appsImpacted: ['APP-019', 'APP-006'], riskLevel: 'Low', owner: 'Digital Channels' },
  { id: 'PRJ-009', name: 'FinOps Maturity Programme', status: 'Completed', phase: 'Closed', startDate: '2025-01-01', endDate: '2026-03-31', budget: 180000, spent: 165000, appsImpacted: ['APP-018', 'APP-004'], riskLevel: 'Low', owner: 'Cloud FinOps' },
  { id: 'PRJ-010', name: 'Tableau to Power BI Migration', status: 'In Progress', phase: 'Execution', startDate: '2026-03-01', endDate: '2026-12-31', budget: 195000, spent: 85000, appsImpacted: ['APP-016', 'APP-023'], riskLevel: 'Medium', owner: 'BI Centre' },
  { id: 'PRJ-011', name: 'Zero Trust Network Redesign', status: 'In Progress', phase: 'Execution', startDate: '2025-11-01', endDate: '2026-10-31', budget: 750000, spent: 480000, appsImpacted: ['APP-002', 'APP-025', 'APP-024'], riskLevel: 'High', owner: 'InfoSec' },
  { id: 'PRJ-012', name: 'Concur Expense Review', status: 'Planning', phase: 'Assessment', startDate: '2026-08-01', endDate: '2026-11-30', budget: 45000, spent: 5000, appsImpacted: ['APP-013'], riskLevel: 'Low', owner: 'Travel & Expense' },
];

// ─── PIPELINE SYNC HISTORY (weekly snapshots) ───
export const pipelineHistory = [
  { week: 'W1 Jul', servicenow: { latency: 52, errors: 12, records: 8200 }, sap: { latency: 1440, errors: 45, records: 3100 }, signavio: { latency: 420, errors: 8, records: 1480 }, apptio: { latency: 1440, errors: 22, records: 1050 } },
  { week: 'W2 Jul', servicenow: { latency: 38, errors: 9, records: 8350 }, sap: { latency: 1380, errors: 38, records: 3150 }, signavio: { latency: 380, errors: 6, records: 1490 }, apptio: { latency: 1380, errors: 18, records: 1060 } },
  { week: 'W3 Jul', servicenow: { latency: 22, errors: 6, records: 8400 }, sap: { latency: 1320, errors: 28, records: 3180 }, signavio: { latency: 300, errors: 4, records: 1500 }, apptio: { latency: 1200, errors: 14, records: 1080 } },
  { week: 'W4 Jul', servicenow: { latency: 14, errors: 4, records: 8420 }, sap: { latency: 960, errors: 18, records: 3200 }, signavio: { latency: 260, errors: 3, records: 1500 }, apptio: { latency: 960, errors: 10, records: 1095 } },
  { week: 'W1 Aug', servicenow: { latency: 8, errors: 2, records: 8450 }, sap: { latency: 720, errors: 12, records: 3210 }, signavio: { latency: 200, errors: 2, records: 1510 }, apptio: { latency: 780, errors: 8, records: 1100 } },
  { week: 'W2 Aug', servicenow: { latency: 5, errors: 1, records: 8480 }, sap: { latency: 480, errors: 8, records: 3220 }, signavio: { latency: 160, errors: 1, records: 1520 }, apptio: { latency: 720, errors: 5, records: 1110 } },
];

// ─── FINANCIAL DATA (18-month projection) ───
export const financials = {
  investmentTotal: 480000,
  roiPercent: 186,
  paybackMonth: 24,
  netValue3yr: 893000,
  quarterly: [
    { quarter: 'Q3 2025', costs: 95000, benefits: 0, cumulative: -95000 },
    { quarter: 'Q4 2025', costs: 88000, benefits: 12000, cumulative: -171000 },
    { quarter: 'Q1 2026', costs: 88000, benefits: 48000, cumulative: -211000 },
    { quarter: 'Q2 2026', costs: 72000, benefits: 125000, cumulative: -158000 },
    { quarter: 'Q3 2026', costs: 68000, benefits: 180000, cumulative: -46000 },
    { quarter: 'Q4 2026', costs: 69000, benefits: 239000, cumulative: 124000 },
    { quarter: 'Q1 2027', costs: 65000, benefits: 285000, cumulative: 344000 },
    { quarter: 'Q2 2027', costs: 65000, benefits: 310000, cumulative: 589000 },
  ],
  costBreakdown: [
    { category: 'Azure Infrastructure', value: 145000, color: '#3b82f6' },
    { category: 'FTE Labour (Internal)', value: 88000, color: '#f59e0b' },
    { category: 'Software Licensing', value: 42000, color: '#8b5cf6' },
    { category: 'External Consulting', value: 35000, color: '#ef4444' },
    { category: 'Training & Change Mgmt', value: 28000, color: '#22c55e' },
    { category: 'Contingency', value: 22000, color: '#6b7280' },
  ],
  duplicateSavings: [
    { tool: 'Tableau + Power BI overlap', annualWaste: 155000, action: 'Migrate to Power BI' },
    { tool: 'Legacy ERP + SAP S/4', annualWaste: 280000, action: 'Decommission Legacy ERP' },
    { tool: 'Concur + ServiceNow Expense', annualWaste: 45000, action: 'Under Review' },
  ],
  fteSavings: { hoursBeforePerYear: 2400, hoursAfterPerYear: 960, ratePerHour: 130 }
};

// ─── COMPLIANCE & SECURITY ───
export const compliance = {
  frameworks: [
    { name: 'DORA Art.5 (ICT Risk)', current: 95, baseline: 60 },
    { name: 'DORA Art.11 (Incident Reporting)', current: 100, baseline: 45 },
    { name: 'GDPR Art.25 (Data Protection)', current: 88, baseline: 70 },
    { name: 'Zero Trust Architecture', current: 92, baseline: 40 },
    { name: 'ISO 27001', current: 97, baseline: 80 },
    { name: 'SOC 2 Type II', current: 90, baseline: 55 },
  ],
  eolTechnologies: [
    { tech: 'Oracle DB 12c', category: 'Database', eolDate: '2025-12-31', appsAffected: 2, severity: 'Critical', remediation: 'Migrate to PostgreSQL 16' },
    { tech: 'MySQL 5.5', category: 'Database', eolDate: '2024-01-31', appsAffected: 1, severity: 'Critical', remediation: 'Upgrade to MySQL 8.0' },
    { tech: '.NET Framework 4.5', category: 'Framework', eolDate: '2025-03-31', appsAffected: 1, severity: 'High', remediation: 'Migrate to .NET 8' },
    { tech: 'PHP 5.6', category: 'Framework', eolDate: '2018-12-31', appsAffected: 1, severity: 'Critical', remediation: 'Rewrite in React/Node' },
    { tech: 'Windows Server 2012 R2', category: 'OS', eolDate: '2023-10-10', appsAffected: 3, severity: 'High', remediation: 'Upgrade to 2022' },
    { tech: 'COBOL Runtime 6.x', category: 'Runtime', eolDate: '2024-06-30', appsAffected: 1, severity: 'High', remediation: 'Decommission with ERP' },
    { tech: 'Java 8', category: 'Runtime', eolDate: '2025-03-31', appsAffected: 4, severity: 'Medium', remediation: 'Migrate to Java 21 LTS' },
    { tech: 'Apache Tomcat 8.5', category: 'Middleware', eolDate: '2024-03-31', appsAffected: 2, severity: 'Medium', remediation: 'Upgrade to Tomcat 10' },
  ],
  auditEvents: [
    { date: '2026-08-14', event: 'Automated DORA Art.11 audit completed', result: 'Pass', scope: 'All integrated apps' },
    { date: '2026-08-13', event: 'EOL scan detected PHP 5.6 in Customer Portal v1', result: 'Alert', scope: 'APP-019' },
    { date: '2026-08-12', event: 'Zero Trust policy review', result: 'Pass', scope: 'Network Layer' },
    { date: '2026-08-11', event: 'Data retention policy check', result: 'Warning', scope: '3 datasets exceed 90-day retention' },
    { date: '2026-08-10', event: 'Canonical schema version audit', result: 'Pass', scope: 'Schema v4.2' },
  ]
};

// ─── EAIMM MATURITY (monthly tracking) ───
export const maturityHistory = [
  { month: 'Jan 2026', dataFreshness: 1, integrationCoverage: 2, governance: 2, traceability: 2, automation: 2, score: 9 },
  { month: 'Mar 2026', dataFreshness: 2, integrationCoverage: 2, governance: 3, traceability: 2, automation: 2, score: 11 },
  { month: 'May 2026', dataFreshness: 3, integrationCoverage: 3, governance: 3, traceability: 3, automation: 3, score: 15 },
  { month: 'Jul 2026', dataFreshness: 4, integrationCoverage: 4, governance: 4, traceability: 3, automation: 3, score: 18 },
  { month: 'Aug 2026', dataFreshness: 5, integrationCoverage: 4, governance: 5, traceability: 4, automation: 4, score: 22 },
];

// ─── HELPER FUNCTIONS ───
export function getAppsByStatus() {
  const counts = {};
  applications.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1; });
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}

export function getAppsByDomain() {
  const counts = {};
  applications.forEach(a => { counts[a.domain] = (counts[a.domain] || 0) + 1; });
  return Object.entries(counts).map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count);
}

export function getAppsBySource() {
  const counts = {};
  applications.forEach(a => { counts[a.source] = (counts[a.source] || 0) + 1; });
  return Object.entries(counts).map(([source, count]) => ({ source, count }));
}

export function getCostByDomain() {
  const costs = {};
  applications.forEach(a => { costs[a.domain] = (costs[a.domain] || 0) + a.costPerYear; });
  return Object.entries(costs).map(([domain, cost]) => ({ domain, cost })).sort((a, b) => b.cost - a.cost);
}

export function getEolByCategory() {
  const counts = {};
  compliance.eolTechnologies.forEach(t => { counts[t.category] = (counts[t.category] || 0) + t.appsAffected; });
  return Object.entries(counts).map(([category, count]) => ({ category, count }));
}

export function getProjectsByRisk() {
  const counts = {};
  projects.forEach(p => { counts[p.riskLevel] = (counts[p.riskLevel] || 0) + 1; });
  return Object.entries(counts).map(([risk, count]) => ({ risk, count }));
}

export function getTotalITSpend() {
  return applications.reduce((sum, a) => sum + a.costPerYear, 0);
}
