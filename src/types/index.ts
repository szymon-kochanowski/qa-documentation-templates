/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

export type Language = 'en' | 'pl';

export type TemplateCategory = 'all' | 'game-fqa' | 'web-api' | 'test-cases' | 'test-plans' | 'checklists' | 'reports';

export interface QATemplate {
  id: string;
  category: TemplateCategory;
  title: { en: string; pl: string };
  description: { en: string; pl: string };
  standard: string;
  filePath: string;
  fileName: string;
  format: 'md' | 'csv' | 'json';
  content: string;
  tags: string[];
}

export type BugProfileType = 'game-fqa' | 'web-api';

export type BugSeverity = 'Blocker' | 'Critical' | 'Major' | 'Minor' | 'Trivial';
export type BugPriority = 'P1 - Urgent' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';

export interface GameBugData {
  component: string;
  platform: string;
  environmentType: string;
  buildVersion: string;
  branch: string;
  title: string;
  reproRate: string;
  severity: BugSeverity;
  priority: BugPriority;
  displayMode: string;
  inputDevice: string;
  systemLanguage: string;
  preconditions: string;
  steps: string[];
  expectedResult: string;
  actualResult: string;
  logsCallstack: string;
  regressionInfo: string;
  workaround: string;
  attachmentsNote: string;
}

export interface WebApiBugData {
  service: string;
  endpointUrl: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  expectedStatus: string;
  actualStatus: string;
  environment: string;
  browserOs: string;
  severity: BugSeverity;
  priority: BugPriority;
  title: string;
  preconditions: string;
  steps: string[];
  curlCommand: string;
  requestPayload: string;
  responsePayload: string;
  serverLogs: string;
  impact: string;
  workaround: string;
}

export type ExportFormat = 'jira' | 'markdown' | 'slack';

export interface TestCaseItem {
  id: string;
  title: string;
  section: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'Functional' | 'Compliance' | 'Compatibility' | 'Visual' | 'Security' | 'Performance' | 'Reliability';
  preconditions: string;
  steps: string;
  expectedResult: string;
  platform: string;
}

export type ChecklistItemStatus = 'PASS' | 'FAIL' | 'BLOCKED' | 'NA' | 'UNTESTED';

export interface SmokeChecklistItem {
  id: string;
  category: 'boot' | 'cert' | 'save' | 'display' | 'perf';
  categoryTitle: { en: string; pl: string };
  checkItem: { en: string; pl: string };
  verificationSteps: { en: string; pl: string };
  targetPlatform: string;
  status: ChecklistItemStatus;
  notes: string;
}
