/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import { QATemplate } from '../types';

export const TEMPLATES_DATA: QATemplate[] = [
  {
    id: 'game-qa-bug-report',
    category: 'game-fqa',
    title: {
      en: 'Game FQA Defect Report Template',
      pl: 'Szablon Raportu Błędu Game FQA (Konsole / PC)'
    },
    description: {
      en: 'Standardized Functional QA bug report for PlayStation 5, Xbox Series X, Switch 2, and PC with Repro Rate (X/5), TRC/TCR compliance, engine logs, and regression notes.',
      pl: 'Ustandaryzowany raport błędu FQA pod PS5, Xbox Series X, Switch 2 i PC ze wskaźnikiem powtarzalności (X/5), certyfikacją TRC/TCR, logami silnika i historią regresji.'
    },
    standard: 'Game FQA / Sony TRC / MS TCR / Nintendo Lotcheck',
    filePath: 'templates/bug-reports/game-qa-bug-report.md',
    fileName: 'game-qa-bug-report.md',
    format: 'md',
    tags: ['FQA', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch 2', 'PC', 'Unreal Engine', 'TRC'],
    content: `# [FQA] Game Bug Report Template (PC / Console / Mobile)
**Author:** Szymon Kochanowski  
**Standard:** Game Functional QA (FQA) & Compliance Standards (TRC / TCR / Lotcheck)  
**File Reference:** \`templates/bug-reports/game-qa-bug-report.md\`

---

## 1. Issue Header & Identification
* **Issue Title:** \`[<COMPONENT/SYSTEM>][<PLATFORM>] Brief, concise summary of the defect\`  
  * *Example:* \`[UI][HUD][PS5] Health bar HUD disappears after opening and closing the radial weapon wheel in Combat Zone 03\`
* **Issue Key / ID:** \`GAME-XXXX\`
* **Reporter:** Szymon Kochanowski (QA Engineer / FQA Tester)
* **Date Observed:** YYYY-MM-DD
* **Branch / Stream:** \`main\` | \`staging/release-candidate\` | \`feature/inventory-v2\`
* **Build Number / Commit SHA:** \`v1.2.0-rc4 (Build 89412 - git@3f8a29b)\`

---

## 2. Environment & Platform Details
| Parameter | Tested Value | Notes / Allowed Variations |
| :--- | :--- | :--- |
| **Platform** | PlayStation 5 / Xbox Series X / Nintendo Switch 2 / PC | Specify exact platform |
| **Environment Type** | PS5 DevKit (Target Manager) / Retail Test Kit | Retail Mode / Development Mode |
| **OS / Firmware Version** | PS5 System Software 24.01-08.60.00 | Ensure latest SDK compliance |
| **Graphics Preset / Mode** | Performance Mode (60 FPS / Dynamic 1440p) | Fidelity (30 FPS 4K) / High Frame Rate (120 Hz) |
| **Display Configuration** | 4K HDR10, HDMI 2.1, VRR Enabled, 16:9 | Also test Ultrawide 21:9 / 32:9 for PC |
| **Input Device** | DualSense Wireless Controller (FW v0348) | Test wireless and wired USB-C mode |
| **System Language / Region** | English (US) / Polish (PL) / Japanese (JA) | Verify character encoding & text bounds |

---

## 3. Defect Classification & Reproduction Rate
* **Severity:** **Major** *(Blocker / Critical / Major / Minor / Trivial / Cosmetic)*
* **Priority:** **P2 - High** *(P1 - Urgent / P2 - High / P3 - Medium / P4 - Low)*
* **Component / Subsystem:** \`UI -> HUD Elements -> Radial Wheel\`
* **Defect Type:** Functional Defect / State Desynchronization / Visual Artifact / Crash / Memory Leak / Compliance TRC
* **Reproduction Rate:** \`5/5 (100% reproducible)\`
  * *Repro test runs:*
    * Run 1 (PS5 Performance): Repro (HUD missing)
    * Run 2 (PS5 Fidelity): Repro (HUD missing)
    * Run 3 (XSX Performance): Repro (HUD missing)
    * Run 4 (PC RTX 4080): Repro (HUD missing)
    * Run 5 (PS5 Clean Reboot): Repro (HUD missing)

---

## 4. Preconditions & Test State
1. Player has loaded Save Slot 1 (\`Level_03_IndustrialDistrict.sav\`).
2. Player character is in active combat stance with at least 2 weapons equipped.
3. Health bar HUD is currently visible at 100% HP.
4. Game is running in 60 FPS Performance Mode.

---

## 5. Steps to Reproduce
1. Launch the title and navigate to **Main Menu -> Campaign -> Continue**.
2. Fast-travel or walk into \`Combat Zone 03\` to trigger enemy aggro.
3. Confirm the Player Health Bar HUD widget is currently rendered in the top-left corner.
4. Press and hold \`L1\` (or \`LB\` on Xbox) to open the Radial Weapon Selection Wheel.
5. Move the Right Analog Stick to select Weapon Slot 2 (Shotgun).
6. Release \`L1\` rapidly to dismiss the Radial Wheel while taking damage from an active enemy.
7. Observe the top-left portion of the screen where the Player Health Bar is anchored.

---

## 6. Expected vs. Actual Result

### Expected Result
* The Radial Wheel fades out smoothly with the UI dismissal animation.
* The Player Health Bar remains visible or immediately re-anchors to the top-left viewport coordinates.
* Current health points and damage indicators update correctly.

### Actual Result
* The Radial Weapon Wheel closes, but the Player Health Bar widget fails to re-enable its visibility state (\`SetVisibility(ESlateVisibility::Visible)\` is not fired).
* The top-left HUD remains completely blank during active combat.
* The Health Bar only reappears after pausing to the Main Pause Menu (\`Options\` button) and resuming.

---

## 7. Crash Information / Engine Logs (If Applicable)
\`\`\`text
[2026.10.16-10:14:22:812][142]LogHUD: Warning: URadialWheelWidget::OnClosed() invoked while DamageAnimProxy was active.
[2026.10.16-10:14:22:813][142]LogSlate: Warning: SWidget[UPlayerHealthBarWidget] visibility forced to Collapsed by ParentCanvas slot index 4.
[2026.10.16-10:14:22:815][142]LogScript: Error: Script Call Stack:
  Function /Game/UI/HUD/WBP_MainHUD.WBP_MainHUD_C:ExecuteUbergraph_WBP_MainHUD
  Function /Game/UI/HUD/WBP_MainHUD.WBP_MainHUD_C:OnRadialMenuDismissed -> Null pointer exception reading SlateCanvasSlot.
\`\`\`

---

## 8. Regression & Historical Context
* **Did this issue reproduce in earlier builds?**
  * Tested on \`v1.1.8 (Build 88120)\`: **Did NOT reproduce (Passed)**.
  * Regression introduced in commit \`f9104c8\` (*"Refactored Slate UI layer ordering for 120Hz HUD caching"*).
* **Workaround available for players?**
  * Press \`Options\` to open the System Pause Menu, then press \`Circle\` to resume. The HUD canvas re-initializes.

---

## 9. Attachments & Evidence
* **Video Capture (60 FPS):** \`recordings/PS5_HUD_Desync_20261016.mp4\` *(1080p60 showing steps 3 through 7)*
* **Screenshot Comparison:**
  * \`screenshots/PS5_Expected_HUD_Active.png\`
  * \`screenshots/PS5_Actual_HUD_Collapsed.png\`
* **Saved Game State:** \`saves/ManualSave_03_CombatZone.bin\`
* **Target Manager Console Log:** \`logs/PS5_DevKit_TM_Session_20261016_1014.log\`
`
  },
  {
    id: 'web-api-bug-report',
    category: 'web-api',
    title: {
      en: 'Web & REST API Defect Report Template',
      pl: 'Szablon Zgłoszenia Błędu Web & REST API'
    },
    description: {
      en: 'Professional RFC 9110 HTTP defect template with reproduction cURL command, HTTP headers, request/response JSON bodies, server trace IDs, and impact analysis.',
      pl: 'Profesjonalny szablon błędu HTTP RFC 9110 z poleceniem cURL, nagłówkami, payloadami JSON żądania/odpowiedzi, identyfikatorami traceId i analizą wpływu.'
    },
    standard: 'RFC 9110 / OpenAPI 3.1 / OWASP Web Top 10',
    filePath: 'templates/bug-reports/web-api-bug-report.md',
    fileName: 'web-api-bug-report.md',
    format: 'md',
    tags: ['Web QA', 'REST API', 'cURL', 'HTTP 500', 'JWT', 'Security', 'Microservices'],
    content: `# [WEB / REST API] Standardized Defect & Incident Report Template
**Author:** Szymon Kochanowski  
**Standard:** RFC 9110 HTTP Semantics, OpenAPI 3.1 & Production Web QA Best Practices  
**File Reference:** \`templates/bug-reports/web-api-bug-report.md\`

---

## 1. Defect Header & Classification
* **Issue Title:** \`[<MICROSERVICE/MODULE>][<HTTP METHOD>][<STATUS CODE>] Brief summary of the defect\`  
  * *Example:* \`[AUTH-SERVICE][POST /v1/tokens/refresh][500] Refresh token endpoint returns unhandled 500 Internal Server Error when client clock drifts by >= 30 seconds\`
* **Issue Key / ID:** \`API-XXXX\`
* **Reporter:** Szymon Kochanowski (QA Engineer / SDET)
* **Date Reported:** YYYY-MM-DD
* **Environment:** \`Staging-EU\` / \`UAT\` / \`Production-Canary\` / \`Local Docker Compose\`
* **Severity:** **Critical** *(Blocker / Critical / Major / Minor / Trivial)*
* **Priority:** **P1 - Urgent** *(P1 / P2 / P3 / P4)*
* **Release / Tag:** \`v2.4.1-staging.3\`

---

## 2. API Endpoint & Infrastructure Target
| Parameter | Value |
| :--- | :--- |
| **Target URL** | \`https://api.staging.example.com/v1/tokens/refresh\` |
| **HTTP Method** | \`POST\` |
| **Expected Status Code** | \`200 OK\` (or \`401 Unauthorized\` with structured JSON if expired) |
| **Actual Status Code** | \`500 Internal Server Error\` |
| **Microservice / Component** | \`identity-provider-service\` (Pod: \`idp-core-7df6c99c95-h29w8\`) |
| **Database / Cache State** | Redis Cluster v7.2.4 (Session store), Postgres 16 (Users) |
| **Client / User Agent** | Chrome 129.0.6668.71 (macOS 15.0), Postman v11.14.0, cURL 8.7.1 |

---

## 3. Preconditions
1. User account \`qa_automator@example.com\` exists in the staging database.
2. User is authenticated and holds a valid Refresh Token in the \`refresh_token\` HTTP-Only Secure Cookie or Bearer payload.
3. System time on client machine is offset by +35 seconds relative to NTP time (simulating mobile / local client clock drift).

---

## 4. Steps to Reproduce
1. Obtain an active Refresh Token via \`POST /v1/auth/login\`.
2. Wait 2 minutes for the short-lived Access Token (TTL = 120s) to expire.
3. Dispatch the token refresh request to \`POST https://api.staging.example.com/v1/tokens/refresh\` with client timestamp set slightly ahead.
4. Inspect the HTTP Response status line and payload body.

---

## 5. Reproduction Command (cURL)
\`\`\`bash
curl -X POST "https://api.staging.example.com/v1/tokens/refresh" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "X-Correlation-ID: qa-test-7981b2-1016" \
  -H "User-Agent: QA-Automation-Suite/1.0.0" \
  -d '{
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMDE5MmUzODQiLCJleHAiOjE3Mjk0OTAwMDAsIm5iZiI6MTcyOTQ4OTk5MH0.dB9872c...",
    "deviceId": "dev_mac_arm64_00192a"
  }' \
  --compressed \
  --verbose
\`\`\`

---

## 6. Expected vs. Actual Response

### Expected Response
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Correlation-ID: qa-test-7981b2-1016

{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1Ni...",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "refreshToken": "eyJhbGciOiJSUzI1Ni..."
  }
}
\`\`\`

### Actual Response
\`\`\`http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
X-Correlation-ID: qa-test-7981b2-1016

{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while verifying token claims.",
    "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
  }
}
\`\`\`

---

## 7. Server Telemetry & Stack Trace (Log Excerpt)
\`\`\`text
2026-10-16T10:18:04.112Z [ERROR] [idp-core] [correlationId=qa-test-7981b2-1016]: Unhandled Exception in TokenVerificationHandler
jsonwebtoken.NotBeforeError: jwt not active
    at /app/node_modules/jsonwebtoken/verify.js:142:19
    at /app/src/services/token.service.ts:88:24
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RefreshTokenController.handle (/app/src/controllers/auth.controller.ts:42:15)
Note: Clock tolerance leeway (clockTolerance) is missing in verify options, causing strict unhandled rejection instead of RFC 6749 401 invalid_grant.
\`\`\`

---

## 8. Impact & Workaround
* **Business Impact:** Any mobile or desktop web user experiencing minor local clock skew is permanently logged out and blocked from re-authenticating, resulting in lost checkout sessions.
* **Suggested Fix:** Configure \`clockTolerance: 60\` (seconds) in JWT verification middleware and catch \`NotBeforeError\` to respond with HTTP \`401 Unauthorized\` rather than unhandled HTTP 500.
* **Temporary Workaround:** User must synchronize system clock via NTP and clear browser cookies to log in fresh.
`
  },
  {
    id: 'testmo-csv-cases',
    category: 'test-cases',
    title: {
      en: 'TestMo / Jira Xray 15-Test Case Import Dataset',
      pl: 'Gotowy Zestaw 15 Przypadków Testowych (TestMo / Jira Xray CSV)'
    },
    description: {
      en: 'Complete 15-test-case production suite formatted for direct 1-click import into TestMo, TestRail, and Jira Xray with all requisite columns.',
      pl: 'Kompletny zestaw 15 przypadków testowych przygotowany do bezpośredniego importu do TestMo, TestRail i Jira Xray ze wszystkimi wymaganymi kolumnami.'
    },
    standard: 'TestMo CSV Import / TestRail Standard / ISTQB Case Design',
    filePath: 'templates/test-cases/testmo-import-template.csv',
    fileName: 'testmo-import-template.csv',
    format: 'csv',
    tags: ['TestMo', 'Jira Xray', 'TestRail', 'CSV Import', 'Automation', 'Test Suite'],
    content: `ID,Title,Section,Priority,Type,Preconditions,Steps,Expected Result,Platform
TC-001,Verify save game auto-recovery after sudden power loss or process kill,Game FQA / Save System,Critical,Functional,"Player has initiated Chapter 02 and reached auto-save checkpoint 'Catacombs_Entrance'.","1. Trigger an in-game autosave checkpoint icon.
2. Abruptly kill the application process (kill -9 or power plug pull) during active disk write.
3. Relaunch the application.
4. Select 'Continue' from Main Menu.","Game detects incomplete save, falls back to the previous intact checkpoint without crashing or corrupting user save profile.",Multiplatform (PS5 / XSX / PC)
TC-002,Verify system pause and controller disconnect prompt when gamepad battery dies,Console Certification (TRC/TCR),High,Compliance,"Game is running in active gameplay (combat state). DualSense controller connected.","1. Enter combat encounter in Level 04.
2. Disconnect gamepad (turn off controller or disconnect USB cable).
3. Observe screen behavior and game audio.","Gameplay immediately pauses. Official platform modal 'Please reconnect controller' is rendered. Audio volume ducks to ambient level.",PlayStation 5 / Xbox Series X
TC-003,Verify seamless docked to handheld mode transition without asset reload,Console Certification (Lotcheck),High,Compatibility,"Nintendo Switch 2 in Docked TV Mode at 1440p resolution.","1. Run active gameplay in open-world area.
2. Undock the console to Handheld Mode.
3. Observe transition time, HUD scaling, and frame stability.","Screen seamlessly scales to 1080p handheld profile within < 1.0 second. No UI clipping, no asset reload stutter, touch input activates.",Nintendo Switch 2
TC-004,Verify HUD scaling and anchor integrity on 32:9 Super Ultrawide resolution,Display & Rendering,Medium,Visual,"PC build running on Samsung Odyssey G9 (5120x1440 32:9).","1. Set display resolution to 5120x1440 in Graphics Options.
2. Enter active gameplay.
3. Open inventory, mini-map, and quest tracker.","HUD elements anchor within the configurable 16:9 safe zone or correctly at viewport edges without stretching or aspect distortion.",PC (Steam / Windows 11)
TC-005,Verify 3D audio occlusion behind closed soundproof vault door,Audio QA,Medium,Functional,"Player has 7.1 surround sound or spatial binaural headphones enabled.","1. Position an active audio emitter (humming generator) inside Vault Room.
2. Stand outside Vault Room with door open and verify loud volume.
3. Close the heavy blast door.","Sound is muffled according to occlusion low-pass filter (>= 18dB attenuation). No audio popping or sudden phase cancellation.",Multiplatform (PC / Console)
TC-006,Verify JWT Bearer token auto-refresh on 401 Unauthorized expiration,Web & API / Authentication,Critical,Security,"User is logged in on Web Dashboard. Short-lived Access Token has expired.","1. Trigger an authenticated API request (e.g. GET /api/v1/user/profile).
2. Intercept response returning 401 Token Expired.
3. Observe HTTP client behavior and network tab.","Client interceptor transparently calls POST /api/v1/auth/refresh, acquires new access token, and retries original request without user logout.",Web (Chrome / Firefox / Safari)
TC-007,Verify rate limiter responds with HTTP 429 and Retry-After header,Web & API / Security,High,Performance,"Client has valid API key with 60 requests/minute tier.","1. Send 61 rapid GET /api/v1/products requests within 10 seconds using test runner.
2. Inspect headers and status code of the 61st response.","Server returns HTTP 429 Too Many Requests, valid JSON error body, and 'Retry-After: 50' header.",REST API / Gateway
TC-008,Verify search query input sanitization against SQL and NoSQL injection payloads,Web & API / Security,Critical,Security,"Search endpoint GET /api/v1/items?q= is active.","1. Dispatch search queries containing ' OR 1=1; --, <script>alert(1)</script>, and {$gt: ''}.
2. Inspect HTTP response and backend database error logs.","Server responds with 200 OK or 400 Bad Request. All queries are treated as literal text. Zero unhandled SQL/ORM database exceptions.",REST API / Backend
TC-009,Verify idempotency key prevents duplicate credit card charges on double-click,Web & API / Checkout,Critical,Functional,"User is on checkout step with items in shopping cart. Network throttling set to 3G.","1. Generate unique Idempotency-Key header on checkout form.
2. Double-click the 'Pay Now' button rapidly twice.
3. Observe transactions created in payment gateway.","Only exactly ONE payment transaction is processed. Second request returns HTTP 200 with identical transaction ID from cache.",Web / REST API
TC-010,Verify cursor-based pagination boundary behavior on empty and final page,Web & API / Catalog,Medium,Functional,"Database contains exactly 25 item records. Page size configured to 10.","1. Request GET /api/v1/items?limit=10 (Page 1 - receives 10 items + next_cursor).
2. Request Page 2 with next_cursor (receives 10 items).
3. Request Page 3 with next_cursor (receives 5 items + next_cursor=null).
4. Request beyond last cursor.","Final page correctly returns remaining 5 records with next_cursor null. Extra request returns empty array [] with HTTP 200 OK.",REST API / Backend
TC-011,Verify state preservation when switching mobile app to background during form input,Mobile QA / Lifecycle,High,Functional,"User is filling out a multi-step verification form (Step 3 of 4).","1. Fill in 6 input fields in verification form.
2. Press Home button / swipe to switch app to background.
3. Open Camera app, take 3 photos, then return to tested app after 60 seconds.","App restores state immediately without reloading form. All previously entered text and validation states remain intact.",Mobile (iOS / Android)
TC-012,Verify offline data synchronization when network connection is restored,Mobile & Web / Offline,High,Reliability,"Device is placed in Airplane Mode / Offline state.","1. Create 3 new offline task entries in the local app database.
2. Verify UI shows 'Pending Sync' badges.
3. Disable Airplane Mode to restore Wi-Fi connection.","Background sync worker triggers automatically, flushes queued mutations to cloud backend, and updates items to 'Synced' status.",Mobile / PWA
TC-013,Verify frame pacing stability under dense volumetric particle emitter,Performance & Optimization,High,Performance,"Test scene loaded with 50,000 GPU particle sparks and heavy alpha blending.","1. Spawn particle emitter in camera view frustum.
2. Record 1% low and 0.1% low FPS using hardware telemetry capture.
3. Move camera around emitter for 60 seconds.","Frame rate does not drop below 58 FPS on PS5 / XSX (Performance Mode target 60 FPS). No micro-stuttering or thermal throttling.",PlayStation 5 / Xbox Series X / PC
TC-014,Verify memory stability and absence of RAM leaks during 45-minute continuous play,Performance & Optimization,Critical,Reliability,"Automated test loop running level transitions, menu toggles, and combat cycles.","1. Monitor process private working set / VRAM memory footprint via telemetry profiler.
2. Run continuous test loop for 45 minutes across 10 level loads.
3. Compare baseline RAM usage at minute 5 vs minute 45.","Total allocated RAM growth does not exceed 150 MB (within garbage collection threshold). Zero Out-of-Memory crashes.",Multiplatform (PC / Console)
TC-015,Verify screen reader focus order and WCAG 2.2 AA accessibility on checkout dialog,Accessibility QA (A11y),Medium,Compliance,"Screen reader active (VoiceOver on macOS/iOS or NVDA on Windows).","1. Navigate to Checkout page using Tab key navigation only.
2. Trigger the modal dialog 'Confirm Purchase'.
3. Verify accessibility focus trap, label announcements, and Escape key dismissal.","Focus shifts automatically to first interactive element inside dialog. Background content is inert. Screen reader announces all labels clearly.",Web / Desktop`
  },
  {
    id: 'master-test-plan-ieee829',
    category: 'test-plans',
    title: {
      en: 'Master Test Plan (IEEE 829 / ISTQB)',
      pl: 'Główny Plan Testów (Standard IEEE 829 / ISTQB)'
    },
    description: {
      en: 'Production-ready Master Test Plan strictly aligned with IEEE 829-2008 and ISTQB Advanced Level, covering scope, entry/exit criteria, suspension rules, and risk matrix.',
      pl: 'Kompletny Master Test Plan zgodny ze standardem IEEE 829-2008 i ISTQB, obejmujący zakres, kryteria wejścia/wyjścia, reguły zawieszenia testów i macierz ryzyk.'
    },
    standard: 'IEEE 829-2008 / ISO/IEC/IEEE 29119 / ISTQB Advanced',
    filePath: 'templates/test-plans/master-test-plan-ieee829.md',
    fileName: 'master-test-plan-ieee829.md',
    format: 'md',
    tags: ['IEEE 829', 'ISTQB', 'Master Test Plan', 'Quality Governance', 'Risk Management', 'Milestones'],
    content: `# Master Test Plan (IEEE 829 / ISTQB Standard)
**Project Name:** Project Valkyrie (Cross-Platform RPG & Cloud Services)  
**Document Identifier:** \`MTP-VALKYRIE-2026-v1.0\`  
**Author / Test Lead:** Szymon Kochanowski  
**Standard Compliance:** IEEE 829-2008 / ISO/IEC/IEEE 29119 / ISTQB Advanced Level  
**File Reference:** \`templates/test-plans/master-test-plan-ieee829.md\`  

---

## Document Control & Revision History
| Version | Date | Author | Summary of Changes | Approval Status |
| :--- | :--- | :--- | :--- | :--- |
| **0.1** | 2026-09-01 | Szymon Kochanowski | Initial draft for Alpha Milestone | Reviewed |
| **0.9** | 2026-10-01 | Szymon Kochanowski | Integrated Console TRC/TCR & Security scope | Pending Sign-off |
| **1.0** | 2026-10-15 | Szymon Kochanowski | Final Release Candidate baseline approved | **APPROVED** |

---

## 1. Introduction & Objectives
The purpose of this Master Test Plan (MTP) is to define the overall testing strategy, verification objectives, test organization, execution cycles, and quality gates for **Project Valkyrie**. The primary objective is to validate that functional gameplay, cloud backend microservices, performance standards, and platform certification requirements (PlayStation TRC, Xbox TCR, Nintendo Lotcheck) meet release-grade quality criteria.

---

## 2. Scope of Testing

### 2.1 In-Scope (Features to be Tested)
* **Functional Gameplay & Mechanics (FQA):**
  * Core combat loop, inventory management, skill trees, and quest state progression.
  * Save/Load persistence, autosave checkpoints, cloud save conflict resolution.
  * AI behavior, collision detection, physics interactions, and cutscene triggers.
* **Console Platform Certification Compliance:**
  * Sony PlayStation 5 Technical Requirements Checklist (TRC).
  * Microsoft Xbox Series X/S Technical Certification Requirements (TCR).
  * Nintendo Switch 2 Lotcheck guidelines (Docked/Handheld mode transitions).
* **Cloud Backend & REST API Verification:**
  * Authentication, session lifecycle, OAuth 2.0 / JWT token refresh flows.
  * In-game store, microtransactions, payment gateway webhooks, and receipts validation.
  * Leaderboards, matchmaking services, rate-limiting, and error-handling resilience.
* **Non-Functional Testing:**
  * Performance & Frame Pacing (Target 60 FPS in Performance Mode, 30 FPS Fidelity 4K).
  * Memory leak profiling (45+ minute continuous endurance sessions).
  * Accessibility (WCAG 2.2 AA standards for UI, remappable inputs, high-contrast modes).

### 2.2 Out-of-Scope (Features Not to be Tested)
* Third-party payment gateway internal banking ledger reconciliation (handled by Stripe/Adyen vendor).
* Hardware manufacturing defects of commercial controllers.
* Legacy generation platforms (PS4, Xbox One, Nintendo Switch 1).
* Localization into Tier-3 unsupported languages (Arabic, Turkish scheduled for post-launch Patch 1.2).

---

## 3. Test Strategy & Quality Levels
The project adopts a multi-layered verification strategy combining automated CI pipelines and exploratory FQA.

---

## 4. Entry, Exit, Suspension & Resumption Criteria

### 4.1 Entry Criteria
* Build is compiled with clean CI green badge; zero fatal compiler warnings.
* Smoke test pass rate is 100% on reference target.
* Release notes and commit changelog provided to QA team by 09:00 CET.
* Backend staging environment deployed with matching API migration schema.

### 4.2 Exit Criteria (Sign-Off Readiness)
* **Zero Blocker (P1) or Critical (P2) defects** unresolved in active backlog.
* Overall test case execution rate >= 98%, with overall pass rate >= 95%.
* 100% compliance on Sony TRC, Microsoft TCR, and Nintendo Lotcheck core checklists.
* 45-minute continuous endurance run without memory exhaustion or crash on any platform.
* Formal sign-off memo endorsed by QA Lead (Szymon Kochanowski) and Engineering Director.

---

## 5. Test Deliverables
1. **Master Test Plan (this document)**
2. **Test Cases Repository (TestMo CSV / JSON)**
3. **Daily EoD QA Status Report**
4. **Defect Tracking in Jira / GitHub Issues**
5. **Final Release Sign-Off Memorandum**

---

## 6. Environmental Needs & Hardware Matrix
* 3x Sony PlayStation 5 DevKits (Target Manager connected, 1Gbps LAN).
* 3x Microsoft Xbox Series X DevKits (Xbox Manager connected).
* 2x Nintendo Switch 2 Development Systems.
* PC Reference Test Rigs (RTX 4080 Super / Ultrawide 32:9).
`
  },
  {
    id: 'multiplatform-smoke-checklist',
    category: 'checklists',
    title: {
      en: 'Multiplatform Smoke & Console Cert Checklist',
      pl: 'Multiplatformowa Checklista Smoke & Certyfikacja Konsolowa'
    },
    description: {
      en: 'Comprehensive verification checklist for builds prior to branch merging and first-party console certification (Sony TRC, MS TCR, Nintendo Lotcheck).',
      pl: 'Szczegółowa checklista weryfikacyjna wydań przed mergowaniem gałęzi i certyfikacją konsolową (Sony TRC, MS TCR, Nintendo Lotcheck).'
    },
    standard: 'Sony TRC / Microsoft TCR / Nintendo Lotcheck',
    filePath: 'templates/checklists/multiplatform-release-smoke-checklist.md',
    fileName: 'multiplatform-release-smoke-checklist.md',
    format: 'md',
    tags: ['Smoke Test', 'TRC', 'TCR', 'Lotcheck', 'Controller Disconnect', 'Save Integrity'],
    content: `# Multiplatform Release Smoke & Console Certification Checklist
**Author:** Szymon Kochanowski  
**Standard:** Platform Compliance Guidelines (Sony TRC, Microsoft TCR, Nintendo Lotcheck)  
**File Reference:** \`templates/checklists/multiplatform-release-smoke-checklist.md\`  

---

## 1. Boot Sequence & First-Time User Experience (FTUE)
* [x] **BOOT-01:** Cold boot from dashboard to interactive Start screen in <= 15s. (Avg 8.4s)
* [x] **BOOT-02:** Sony/Microsoft/Nintendo logos & Dolby/Unreal trademarks display without distortion.
* [x] **BOOT-03:** Launch with deleted or zero-byte \`user_settings.ini\` recreates defaults gracefully.
* [x] **BOOT-04:** Pressing Start / Cross / A advances from title screen; unassigned buttons ignored.

## 2. Console Certification & Technical Requirements (TRC / TCR / Lotcheck)
* [x] **CERT-01:** Gamepad disconnect: Gameplay immediately pauses; platform reconnect prompt shown.
* [x] **CERT-02:** User profile switching: Prompts user; saves to new profile partition without crash.
* [x] **CERT-03:** Network disconnect: Clean error dialog; no soft-lock or infinite spinner.
* [x] **CERT-04:** System sleep/resume: Instant wake within 2s; zero audio desync or loop.
* [x] **CERT-05:** Switch 2 Dock/Undock: Seamless swap < 0.8s between TV 1440p and Handheld 1080p.
* [x] **CERT-06:** System language change: Title reflects console OS language choice on boot.

## 3. Save / Load & Cloud Storage Integrity
* [x] **SAVE-01:** Manual save / load: Coordinates, HP, inventory matched 100%.
* [x] **SAVE-02:** Autosave checkpoint: Animated icon visible during disk write; dismisses cleanly.
* [x] **SAVE-03:** Storage quota limit: Platform-compliant out-of-space dialog rendered.
* [x] **SAVE-04:** Power cut resilience: Backup save restored cleanly; no corruption flag.

## 4. Audio, Video & Display Adaptation
* [x] **DISP-01:** Ultrawide 21:9 & 32:9 HUD: HUD anchored to safe margins; FOV correct.
* [x] **DISP-02:** HDR10 calibration: Zero color banding; specular highlights preserved.
* [x] **DISP-03:** 60/120Hz VRR: Smooth pacing; zero micro-stuttering.
* [x] **AUD-01:** Dynamic 3D audio occlusion: Low-pass filter >= 18dB attenuation behind obstacles.
* [x] **AUD-02:** System audio background: Game audio mutes immediately on OS dashboard.

## 5. Performance Baseline & Stability
* [x] **PERF-01:** 60 FPS Performance Mode: 99% percentile >= 59.4 FPS in stress area.
* [x] **PERF-02:** 45-minute continuous soak: RAM stable (+42 MB delta); 0 crash events.
* [x] **PERF-03:** Thermal & acoustic: Operates within quiet first-party thermal spec.
`
  },
  {
    id: 'daily-eod-qa-signoff',
    category: 'reports',
    title: {
      en: 'Daily EoD & Milestone Sign-off Report',
      pl: 'Raport Dzienny EoD i Protokół Milestone Sign-off'
    },
    description: {
      en: 'Executive QA report template featuring defect flow charts, execution pass rates, blocker triage, platform test coverage, and formal GO / NO-GO sign-off recommendation.',
      pl: 'Zarządczy raport QA z przepływem defektów, wskaźnikiem realizacji testów, triażem blockerów, pokryciem platformowym i formalną rekomendacją GO / NO-GO.'
    },
    standard: 'QA Leadership / Milestone Governance / ISTQB',
    filePath: 'templates/reports/daily-eod-qa-signoff-report.md',
    fileName: 'daily-eod-qa-signoff-report.md',
    format: 'md',
    tags: ['Daily EoD', 'Sign-Off', 'QA Lead', 'Defect Flow', 'Metrics', 'Milestone'],
    content: `# QA Daily End-of-Day (EoD) & Milestone Sign-off Report
**Author:** Szymon Kochanowski  
**Role:** Lead QA Engineer  
**File Reference:** \`templates/reports/daily-eod-qa-signoff-report.md\`  

---

## 1. Executive Summary & Build Health Status
* **Report Date:** 2026-10-16
* **Milestone Stage:** \`Release Candidate (RC-04)\`
* **Tested Build / Commit SHA:** \`v1.2.0-rc4 (Commit: 8f921a4)\`
* **Overall Build Health Indicator:** 🟢 **GREEN (Healthy / Release Ready)**
* **Target Platforms Covered Today:** PlayStation 5, Xbox Series X, Nintendo Switch 2, PC (Steam), Web/API Staging.

---

## 2. Test Execution Metrics (Daily Progress)
| Metric Category | Planned Today | Executed | Passed | Failed | Blocked | Pass Rate (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Sanity & Smoke Test Suite** | 20 | 20 | 20 | 0 | 0 | **100.0%** |
| **FQA Gameplay & Level Progression** | 65 | 65 | 62 | 3 | 0 | **95.4%** |
| **Console TRC / TCR Compliance** | 35 | 35 | 35 | 0 | 0 | **100.0%** |
| **Backend & REST API Regression** | 120 | 120 | 118 | 2 | 0 | **98.3%** |
| **Performance & Soak (45m)** | 8 | 8 | 8 | 0 | 0 | **100.0%** |
| **TOTALS** | **248** | **248** | **243** | **5** | **0** | **98.0%** |

---

## 3. Defect Flow & Bug Tracking Summary
| Severity Level | Open at Start of Day | New Logged Today | Resolved / Verified | Closed Today | Total Currently Active |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **P1 - Blocker** | 0 | 0 | 0 | 0 | **0** |
| **P2 - Critical** | 1 | 0 | 1 | 1 | **0** |
| **P3 - Major** | 6 | 3 | 2 | 2 | **7** |
| **P4 - Minor / Cosmetic**| 14 | 2 | 4 | 4 | **12** |
| **TOTAL ACTIVE DEFECTS** | **21** | **5** | **7** | **7** | **19** |

---

## 4. QA Lead Sign-off Recommendation
* **Decision:** 🟢 **PROCEED TO RELEASE CANDIDATE SUBMISSION (GO)**
* **QA Lead Name:** Szymon Kochanowski
* **Date & Timestamp:** 2026-10-16 18:00:00 CET
* **Signature:** \`Szymon Kochanowski [Lead QA Engineer]\`
`
  }
];
