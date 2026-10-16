/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import { TestCaseItem } from '../types';

export const INITIAL_TEST_CASES: TestCaseItem[] = [
  {
    id: 'TC-001',
    title: 'Verify save game auto-recovery after sudden power loss or process kill',
    section: 'Game FQA / Save System',
    priority: 'Critical',
    type: 'Functional',
    preconditions: "Player has initiated Chapter 02 and reached auto-save checkpoint 'Catacombs_Entrance'.",
    steps: "1. Trigger an in-game autosave checkpoint icon.\n2. Abruptly kill the application process (kill -9 or power plug pull) during active disk write.\n3. Relaunch the application.\n4. Select 'Continue' from Main Menu.",
    expectedResult: 'Game detects incomplete save, falls back to the previous intact checkpoint without crashing or corrupting user save profile.',
    platform: 'Multiplatform (PS5 / XSX / PC)'
  },
  {
    id: 'TC-002',
    title: 'Verify system pause and controller disconnect prompt when gamepad battery dies',
    section: 'Console Certification (TRC/TCR)',
    priority: 'High',
    type: 'Compliance',
    preconditions: 'Game is running in active gameplay (combat state). DualSense controller connected.',
    steps: '1. Enter combat encounter in Level 04.\n2. Disconnect gamepad (turn off controller or disconnect USB cable).\n3. Observe screen behavior and game audio.',
    expectedResult: "Gameplay immediately pauses. Official platform modal 'Please reconnect controller' is rendered. Audio volume ducks to ambient level.",
    platform: 'PlayStation 5 / Xbox Series X'
  },
  {
    id: 'TC-003',
    title: 'Verify seamless docked to handheld mode transition without asset reload',
    section: 'Console Certification (Lotcheck)',
    priority: 'High',
    type: 'Compatibility',
    preconditions: 'Nintendo Switch 2 in Docked TV Mode at 1440p resolution.',
    steps: '1. Run active gameplay in open-world area.\n2. Undock the console to Handheld Mode.\n3. Observe transition time, HUD scaling, and frame stability.',
    expectedResult: 'Screen seamlessly scales to 1080p handheld profile within < 1.0 second. No UI clipping, no asset reload stutter, touch input activates.',
    platform: 'Nintendo Switch 2'
  },
  {
    id: 'TC-004',
    title: 'Verify HUD scaling and anchor integrity on 32:9 Super Ultrawide resolution',
    section: 'Display & Rendering',
    priority: 'Medium',
    type: 'Visual',
    preconditions: 'PC build running on Samsung Odyssey G9 (5120x1440 32:9).',
    steps: '1. Set display resolution to 5120x1440 in Graphics Options.\n2. Enter active gameplay.\n3. Open inventory, mini-map, and quest tracker.',
    expectedResult: 'HUD elements anchor within the configurable 16:9 safe zone or correctly at viewport edges without stretching or aspect distortion.',
    platform: 'PC (Steam / Windows 11)'
  },
  {
    id: 'TC-005',
    title: 'Verify 3D audio occlusion behind closed soundproof vault door',
    section: 'Audio QA',
    priority: 'Medium',
    type: 'Functional',
    preconditions: 'Player has 7.1 surround sound or spatial binaural headphones enabled.',
    steps: '1. Position an active audio emitter (humming generator) inside Vault Room.\n2. Stand outside Vault Room with door open and verify loud volume.\n3. Close the heavy blast door.',
    expectedResult: 'Sound is muffled according to occlusion low-pass filter (>= 18dB attenuation). No audio popping or sudden phase cancellation.',
    platform: 'Multiplatform (PC / Console)'
  },
  {
    id: 'TC-006',
    title: 'Verify JWT Bearer token auto-refresh on 401 Unauthorized expiration',
    section: 'Web & API / Authentication',
    priority: 'Critical',
    type: 'Security',
    preconditions: 'User is logged in on Web Dashboard. Short-lived Access Token has expired.',
    steps: '1. Trigger an authenticated API request (e.g. GET /api/v1/user/profile).\n2. Intercept response returning 401 Token Expired.\n3. Observe HTTP client behavior and network tab.',
    expectedResult: 'Client interceptor transparently calls POST /api/v1/auth/refresh, acquires new access token, and retries original request without user logout.',
    platform: 'Web (Chrome / Firefox / Safari)'
  },
  {
    id: 'TC-007',
    title: 'Verify rate limiter responds with HTTP 429 and Retry-After header',
    section: 'Web & API / Security',
    priority: 'High',
    type: 'Performance',
    preconditions: 'Client has valid API key with 60 requests/minute tier.',
    steps: '1. Send 61 rapid GET /api/v1/products requests within 10 seconds using test runner.\n2. Inspect headers and status code of the 61st response.',
    expectedResult: "Server returns HTTP 429 Too Many Requests, valid JSON error body, and 'Retry-After: 50' header.",
    platform: 'REST API / Gateway'
  },
  {
    id: 'TC-008',
    title: 'Verify search query input sanitization against SQL and NoSQL injection payloads',
    section: 'Web & API / Security',
    priority: 'Critical',
    type: 'Security',
    preconditions: 'Search endpoint GET /api/v1/items?q= is active.',
    steps: "1. Dispatch search queries containing ' OR 1=1; --, <script>alert(1)</script>, and {$gt: ''}.\n2. Inspect HTTP response and backend database error logs.",
    expectedResult: 'Server responds with 200 OK or 400 Bad Request. All queries are treated as literal text. Zero unhandled SQL/ORM database exceptions.',
    platform: 'REST API / Backend'
  },
  {
    id: 'TC-009',
    title: 'Verify idempotency key prevents duplicate credit card charges on double-click',
    section: 'Web & API / Checkout',
    priority: 'Critical',
    type: 'Functional',
    preconditions: 'User is on checkout step with items in shopping cart. Network throttling set to 3G.',
    steps: "1. Generate unique Idempotency-Key header on checkout form.\n2. Double-click the 'Pay Now' button rapidly twice.\n3. Observe transactions created in payment gateway.",
    expectedResult: 'Only exactly ONE payment transaction is processed. Second request returns HTTP 200 with identical transaction ID from cache.',
    platform: 'Web / REST API'
  },
  {
    id: 'TC-010',
    title: 'Verify cursor-based pagination boundary behavior on empty and final page',
    section: 'Web & API / Catalog',
    priority: 'Medium',
    type: 'Functional',
    preconditions: 'Database contains exactly 25 item records. Page size configured to 10.',
    steps: '1. Request GET /api/v1/items?limit=10 (Page 1 - receives 10 items + next_cursor).\n2. Request Page 2 with next_cursor (receives 10 items).\n3. Request Page 3 with next_cursor (receives 5 items + next_cursor=null).\n4. Request beyond last cursor.',
    expectedResult: 'Final page correctly returns remaining 5 records with next_cursor null. Extra request returns empty array [] with HTTP 200 OK.',
    platform: 'REST API / Backend'
  },
  {
    id: 'TC-011',
    title: 'Verify state preservation when switching mobile app to background during form input',
    section: 'Mobile QA / Lifecycle',
    priority: 'High',
    type: 'Functional',
    preconditions: 'User is filling out a multi-step verification form (Step 3 of 4).',
    steps: '1. Fill in 6 input fields in verification form.\n2. Press Home button / swipe to switch app to background.\n3. Open Camera app, take 3 photos, then return to tested app after 60 seconds.',
    expectedResult: 'App restores state immediately without reloading form. All previously entered text and validation states remain intact.',
    platform: 'Mobile (iOS / Android)'
  },
  {
    id: 'TC-012',
    title: 'Verify offline data synchronization when network connection is restored',
    section: 'Mobile & Web / Offline',
    priority: 'High',
    type: 'Reliability',
    preconditions: 'Device is placed in Airplane Mode / Offline state.',
    steps: "1. Create 3 new offline task entries in the local app database.\n2. Verify UI shows 'Pending Sync' badges.\n3. Disable Airplane Mode to restore Wi-Fi connection.",
    expectedResult: "Background sync worker triggers automatically, flushes queued mutations to cloud backend, and updates items to 'Synced' status.",
    platform: 'Mobile / PWA'
  },
  {
    id: 'TC-013',
    title: 'Verify frame pacing stability under dense volumetric particle emitter',
    section: 'Performance & Optimization',
    priority: 'High',
    type: 'Performance',
    preconditions: 'Test scene loaded with 50,000 GPU particle sparks and heavy alpha blending.',
    steps: '1. Spawn particle emitter in camera view frustum.\n2. Record 1% low and 0.1% low FPS using hardware telemetry capture.\n3. Move camera around emitter for 60 seconds.',
    expectedResult: 'Frame rate does not drop below 58 FPS on PS5 / XSX (Performance Mode target 60 FPS). No micro-stuttering or thermal throttling.',
    platform: 'PlayStation 5 / Xbox Series X / PC'
  },
  {
    id: 'TC-014',
    title: 'Verify memory stability and absence of RAM leaks during 45-minute continuous play',
    section: 'Performance & Optimization',
    priority: 'Critical',
    type: 'Reliability',
    preconditions: 'Automated test loop running level transitions, menu toggles, and combat cycles.',
    steps: '1. Monitor process private working set / VRAM memory footprint via telemetry profiler.\n2. Run continuous test loop for 45 minutes across 10 level loads.\n3. Compare baseline RAM usage at minute 5 vs minute 45.',
    expectedResult: 'Total allocated RAM growth does not exceed 150 MB (within garbage collection threshold). Zero Out-of-Memory crashes.',
    platform: 'Multiplatform (PC / Console)'
  },
  {
    id: 'TC-015',
    title: 'Verify screen reader focus order and WCAG 2.2 AA accessibility on checkout dialog',
    section: 'Accessibility QA (A11y)',
    priority: 'Medium',
    type: 'Compliance',
    preconditions: 'Screen reader active (VoiceOver on macOS/iOS or NVDA on Windows).',
    steps: "1. Navigate to Checkout page using Tab key navigation only.\n2. Trigger the modal dialog 'Confirm Purchase'.\n3. Verify accessibility focus trap, label announcements, and Escape key dismissal.",
    expectedResult: 'Focus shifts automatically to first interactive element inside dialog. Background content is inert. Screen reader announces all labels clearly.',
    platform: 'Web / Desktop'
  }
];
