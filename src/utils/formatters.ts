/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import { GameBugData, WebApiBugData, TestCaseItem, SmokeChecklistItem } from '../types';

/**
 * Format Game QA Bug Report into Jira Wiki Markup syntax
 */
export function formatGameBugJira(data: GameBugData): string {
  const fullTitle = `[${data.component.trim()}][${data.platform.trim()}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s, idx) => `# ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `h1. ${fullTitle}

h2. 1. Environment & Test Context
|| Parameter || Tested Value ||
| Platform | ${data.platform} |
| Build / Commit | ${data.buildVersion} (${data.branch}) |
| Environment Type | ${data.environmentType} |
| Severity / Priority | {color:red}*${data.severity}*{color} / *${data.priority}* |
| Display Configuration | ${data.displayMode} |
| Input Device | ${data.inputDevice} |
| System Language | ${data.systemLanguage} |
| *Reproduction Rate* | *${data.reproRate}* |

h2. 2. Preconditions
${data.preconditions}

h2. 3. Steps to Reproduce
${stepsList || '# Open game\n# Trigger issue'}

h2. 4. Expected vs. Actual Result
*Expected Result:*
${data.expectedResult}

*Actual Result:*
{color:red}${data.actualResult}{color}

${data.logsCallstack ? `h2. 5. Engine Crash Logs / Callstack
{code:title=Engine Output}
${data.logsCallstack}
{code}` : ''}

${data.regressionInfo ? `h2. 6. Regression Information
${data.regressionInfo}` : ''}

${data.workaround ? `h2. 7. Workaround
${data.workaround}` : ''}

${data.attachmentsNote ? `h2. 8. Attachments & Telemetry
${data.attachmentsNote}` : ''}
`;
}

/**
 * Format Game QA Bug Report into standard GitHub Markdown syntax
 */
export function formatGameBugMarkdown(data: GameBugData): string {
  const fullTitle = `[${data.component.trim()}][${data.platform.trim()}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s, idx) => `${idx + 1}. ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `# ${fullTitle}

**Reporter:** QA Engineer  
**Date:** ${new Date().toISOString().slice(0, 10)}  
**Standard:** Game Functional QA (FQA)

---

### Environment & Classification
| Parameter | Value |
| :--- | :--- |
| **Platform** | ${data.platform} |
| **Build / Commit** | \`${data.buildVersion}\` (\`${data.branch}\`) |
| **Environment Type** | ${data.environmentType} |
| **Severity / Priority** | **${data.severity}** / **${data.priority}** |
| **Display Mode** | ${data.displayMode} |
| **Input Device** | ${data.inputDevice} |
| **Language** | ${data.systemLanguage} |
| **Reproduction Rate** | **${data.reproRate}** |

---

### Preconditions
${data.preconditions}

---

### Steps to Reproduce
${stepsList || '1. Open game\n2. Trigger issue'}

---

### Expected vs. Actual Result

#### Expected Result
${data.expectedResult}

#### Actual Result
${data.actualResult}

${data.logsCallstack ? `---

### Engine Logs & Callstack
\`\`\`text
${data.logsCallstack}
\`\`\`
` : ''}

${data.regressionInfo ? `---

### Regression Information
${data.regressionInfo}
` : ''}

${data.workaround ? `---

### Workaround
${data.workaround}
` : ''}

${data.attachmentsNote ? `---

### Attachments & Evidence
${data.attachmentsNote}
` : ''}
`;
}

/**
 * Format Game QA Bug Report into Slack / Discord message syntax
 */
export function formatGameBugSlack(data: GameBugData): string {
  const fullTitle = `[${data.component.trim()}][${data.platform.trim()}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s, idx) => `${idx + 1}. ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `🚨 *BUG REPORT:* \`${fullTitle}\`
• *Platform:* ${data.platform} (${data.environmentType})
• *Build:* \`${data.buildVersion}\` | *Repro Rate:* \`${data.reproRate}\`
• *Severity / Priority:* *${data.severity}* / *${data.priority}*

*Steps to Reproduce:*
${stepsList}

*Expected Result:*
${data.expectedResult}

*Actual Result:*
${data.actualResult}

${data.logsCallstack ? `*Callstack snippet:*
\`\`\`
${data.logsCallstack.slice(0, 300)}...
\`\`\`
` : ''}${data.workaround ? `*Workaround:* ${data.workaround}` : ''}`;
}

/**
 * Format Web & REST API Bug Report into Jira Wiki Markup syntax
 */
export function formatWebApiBugJira(data: WebApiBugData): string {
  const fullTitle = `[${data.service.trim()}][${data.httpMethod} ${data.expectedStatus}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s) => `# ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `h1. ${fullTitle}

h2. 1. Endpoint & Target Environment
|| Parameter || Tested Value ||
| Target URL | \`${data.endpointUrl}\` |
| HTTP Method | *${data.httpMethod}* |
| Expected Status | *${data.expectedStatus}* |
| Actual Status | {color:red}*${data.actualStatus}*{color} |
| Environment | ${data.environment} |
| Client / OS | ${data.browserOs} |
| Severity / Priority | {color:red}*${data.severity}*{color} / *${data.priority}* |

h2. 2. Preconditions
${data.preconditions}

h2. 3. Steps to Reproduce
${stepsList}

h2. 4. cURL Reproduction Command
{code:bash}
${data.curlCommand}
{code}

${data.requestPayload ? `h2. 5. Request Payload
{code:json}
${data.requestPayload}
{code}` : ''}

${data.responsePayload ? `h2. 6. Actual Response Payload
{code:json}
${data.responsePayload}
{code}` : ''}

${data.serverLogs ? `h2. 7. Server Telemetry & Stack Trace
{code:text}
${data.serverLogs}
{code}` : ''}

h2. 8. Business Impact & Workaround
*Impact:* ${data.impact}
*Workaround:* ${data.workaround || 'None available.'}
`;
}

/**
 * Format Web & REST API Bug Report into GitHub Markdown syntax
 */
export function formatWebApiBugMarkdown(data: WebApiBugData): string {
  const fullTitle = `[${data.service.trim()}][${data.httpMethod}][${data.actualStatus}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s, idx) => `${idx + 1}. ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `# ${fullTitle}

**Standard:** RFC 9110 HTTP Semantics & REST API QA  
**Date:** ${new Date().toISOString().slice(0, 10)}

---

### Endpoint & Environment
| Parameter | Value |
| :--- | :--- |
| **Endpoint** | \`${data.httpMethod} ${data.endpointUrl}\` |
| **Expected Status** | \`${data.expectedStatus}\` |
| **Actual Status** | \`${data.actualStatus}\` |
| **Environment** | ${data.environment} |
| **Client / User Agent**| ${data.browserOs} |
| **Severity / Priority**| **${data.severity}** / **${data.priority}** |

---

### Preconditions
${data.preconditions}

---

### Steps to Reproduce
${stepsList}

---

### Reproduction Command (cURL)
\`\`\`bash
${data.curlCommand}
\`\`\`

${data.requestPayload ? `---

### Request Payload (JSON)
\`\`\`json
${data.requestPayload}
\`\`\`
` : ''}

${data.responsePayload ? `---

### Actual Response Payload
\`\`\`json
${data.responsePayload}
\`\`\`
` : ''}

${data.serverLogs ? `---

### Server Logs & Trace ID
\`\`\`text
${data.serverLogs}
\`\`\`
` : ''}

---

### Impact & Suggested Mitigation
* **Business Impact:** ${data.impact}
* **Workaround:** ${data.workaround || 'None available.'}
`;
}

/**
 * Format Web & REST API Bug Report into Slack / Discord syntax
 */
export function formatWebApiBugSlack(data: WebApiBugData): string {
  const fullTitle = `[${data.service.trim()}][${data.httpMethod}][${data.actualStatus}] ${data.title.trim()}`;
  const stepsList = data.steps
    .filter(s => s.trim().length > 0)
    .map((s, idx) => `${idx + 1}. ${s.replace(/^\d+\.\s*/, '')}`)
    .join('\n');

  return `🔥 *API DEFECT:* \`${fullTitle}\`
• *Endpoint:* \`${data.httpMethod} ${data.endpointUrl}\`
• *Expected:* \`${data.expectedStatus}\` ➔ *Actual:* \`${data.actualStatus}\`
• *Env:* ${data.environment} | *Severity:* *${data.severity}* (*${data.priority}*)

*Steps to Reproduce:*
${stepsList}

*cURL Snippet:*
\`\`\`bash
${data.curlCommand.slice(0, 250)}...
\`\`\`

*Impact:* ${data.impact}`;
}

/**
 * Format Test Cases into valid CSV string compatible with TestMo, TestRail, and Jira Xray
 */
export function formatTestCasesToCSV(testCases: TestCaseItem[]): string {
  const headers = ['ID', 'Title', 'Section', 'Priority', 'Type', 'Preconditions', 'Steps', 'Expected Result', 'Platform'];
  
  const escapeCsv = (val: string): string => {
    if (!val) return '""';
    const clean = val.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = testCases.map(tc => {
    return [
      escapeCsv(tc.id),
      escapeCsv(tc.title),
      escapeCsv(tc.section),
      escapeCsv(tc.priority),
      escapeCsv(tc.type),
      escapeCsv(tc.preconditions),
      escapeCsv(tc.steps),
      escapeCsv(tc.expectedResult),
      escapeCsv(tc.platform)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Format Smoke Checklist Audit into a clean markdown summary report
 */
export function formatSmokeChecklistAudit(items: SmokeChecklistItem[], targetBuild: string, auditor: string): string {
  const passed = items.filter(i => i.status === 'PASS').length;
  const failed = items.filter(i => i.status === 'FAIL').length;
  const blocked = items.filter(i => i.status === 'BLOCKED').length;
  const na = items.filter(i => i.status === 'NA').length;
  const total = items.length;
  const rate = total > 0 ? Math.round((passed / total) * 100) : 0;

  const statusLabel = failed === 0 && blocked === 0 ? '🟢 PASSED / GO FOR RELEASE' : '🔴 CONDITIONAL / ISSUES FOUND';

  const rows = items.map(item => {
    const icon = item.status === 'PASS' ? '✅ PASS' : item.status === 'FAIL' ? '❌ FAIL' : item.status === 'BLOCKED' ? '⚠️ BLOCKED' : item.status === 'NA' ? '⚪ N/A' : '⏳ UNTESTED';
    return `| **${item.id}** | ${item.checkItem.en} | ${item.targetPlatform} | ${icon} | ${item.notes || '-'} |`;
  }).join('\n');

  return `# Smoke & Platform Certification Audit Report
**Target Build:** \`${targetBuild}\`  
**Auditor:** ${auditor}  
**Date:** ${new Date().toISOString().slice(0, 10)}  
**Overall Verdict:** ${statusLabel} (${rate}% Pass Rate)

### Summary Metrics
* **Total Checks:** ${total}
* **Passed:** ${passed}
* **Failed:** ${failed}
* **Blocked:** ${blocked}
* **Not Applicable:** ${na}

---

### Detailed Verification Matrix
| ID | Check Item | Platform | Status | Notes / Bugs |
| :--- | :--- | :--- | :---: | :--- |
${rows}

---
*Report generated via QA Documentation Studio by Szymon Kochanowski*
`;
}

/**
 * Utility to download string content as a local file in browser
 */
export function downloadFile(content: string, filename: string, mimeType = 'text/plain;charset=utf-8'): void {
  // Add UTF-8 BOM if CSV for Excel compatibility
  const blobData = filename.endsWith('.csv') ? ['\uFEFF', content] : [content];
  const blob = new Blob(blobData, { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
