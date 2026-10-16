# Master Test Plan (IEEE 829 / ISTQB Standard)
**Project Name:** Project Valkyrie (Cross-Platform RPG & Cloud Services)  
**Document Identifier:** `MTP-VALKYRIE-2026-v1.0`  
**Author / Test Lead:** Szymon Kochanowski  
**Standard Compliance:** IEEE 829-2008 / ISO/IEC/IEEE 29119 / ISTQB Advanced Level  
**File Reference:** `templates/test-plans/master-test-plan-ieee829.md`  

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
The project adopts a multi-layered verification strategy combining automated CI pipelines and exploratory FQA:

```text
+-------------------------------------------------------------+
|        Level 4: Platform Certification (TRC / TCR / Lotcheck) |
+-------------------------------------------------------------+
|        Level 3: End-to-End System FQA & Cross-Platform UI   |
+-------------------------------------------------------------+
|        Level 2: Integration & Contract Testing (Pact / API) |
+-------------------------------------------------------------+
|        Level 1: Automated Unit & Component Tests (Engine/CI)|
+-------------------------------------------------------------+
```

### 3.1 Test Types Applied
1. **Sanity / Smoke Testing:** Daily automated sanity build check (< 30 minutes) on all targets.
2. **Functional Testing (FQA):** Detailed verification against living test case repository in TestMo.
3. **Regression Testing:** Automated API regression suite triggered on every staging pull request.
4. **Performance & Stress Testing:** Automated telemetry capture on dedicated test rigs recording 1% and 0.1% frame time lows.
5. **Security & Boundary Testing:** OWASP Top 10 API testing, SQLi/XSS fuzzing on all public REST endpoints.

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

### 4.3 Suspension & Resumption Criteria
* **Suspension:** Testing is immediately suspended if a build crashes on boot sequence, prevents game save loading, or corrupts dev kit storage.
* **Resumption:** Testing resumes only after an engineering hotfix is verified by QA with clean smoke pass and root cause analysis.

---

## 5. Test Deliverables
1. **Master Test Plan (this document):** Living reference document updated per milestone.
2. **Test Cases Repository:** Exportable CSV dataset for TestMo / Jira Xray with bi-weekly updates.
3. **Daily EoD QA Status Report:** Distributed via Slack `#qa-announcements` and email every workday at 18:00 CET.
4. **Defect Tracking (Jira / GitHub Issues):** Standardized bug reports with repro rates, video captures, and log excerpts.
5. **Final Release Sign-Off Memorandum:** Formal quality assessment report prior to submission to first-party console cert.

---

## 6. Environmental Needs & Hardware Matrix
* **Console Test Bed:**
  * 3x Sony PlayStation 5 DevKits (Target Manager connected, 1Gbps LAN).
  * 3x Microsoft Xbox Series X DevKits (Xbox Manager connected).
  * 2x Nintendo Switch 2 Development Systems.
* **PC Test Rig Baseline:**
  * High Tier: AMD Ryzen 7 7800X3D / NVIDIA GeForce RTX 4080 Super / 32GB DDR5 / NVMe Gen4.
  * Minimum Spec: Intel Core i5-10400 / NVIDIA GTX 1660 Super / 16GB DDR4 / SSD.
  * Ultrawide Rigs: 21:9 (3440x1440) and 32:9 (5120x1440) displays.
* **API & Automation Tooling:**
  * TestMo (Test Case Management), Postman / Newman (API regression), Playwright (Web UI automation).

---

## 7. Roles & Responsibilities
| Role | Assignee | Primary Responsibilities |
| :--- | :--- | :--- |
| **QA Lead** | Szymon Kochanowski | Strategy formulation, resource allocation, sign-off authority, TRC audit |
| **Senior FQA Tester** | Assigned per squad | Core gameplay verification, exploratory testing, defect isolation |
| **SDET / QA Automator**| Assigned per squad | CI/CD test automation, API contract tests, load testing scripts |
| **Compliance Specialist**| Dedicated external/internal | Official Sony TRC, Xbox TCR, and Nintendo Lotcheck pre-cert passes |
| **Release Manager** | Engineering Ops | Build distribution, staging deployments, branch freezing |

---

## 8. Risks & Contingency Planning
| Identified Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **First-party TRC certification rejection** | Medium | High | Conduct 2 mock pre-cert passes 4 weeks before final submission. |
| **Unstable backend staging deployments** | High | Medium | Mock services via Prism / MSW for offline client FQA continuity. |
| **Severe memory leaks in late level builds** | Medium | High | Daily automated 60-min soak test with automated memory telemetry capture. |
| **Late scope creep in UI localization** | High | Low | Lock string IDs 3 weeks before submission; use pseudo-localization early. |

---

## 9. Approvals & Formal Sign-Off
* **Prepared by:** Szymon Kochanowski – Lead QA Engineer  
  * *Signature:* `Szymon Kochanowski` — *Date:* 2026-10-15
* **Approved by:** Project Technical Director  
  * *Signature:* `Approved` — *Date:* 2026-10-16
