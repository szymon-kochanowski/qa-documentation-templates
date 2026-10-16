/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  Server, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles,
  AlertTriangle,
  Code2,
  FileText,
  MessageSquare
} from 'lucide-react';
import { 
  BugProfileType, 
  BugSeverity, 
  BugPriority, 
  GameBugData, 
  WebApiBugData, 
  ExportFormat, 
  Language 
} from '../types';
import { 
  formatGameBugJira, 
  formatGameBugMarkdown, 
  formatGameBugSlack, 
  formatWebApiBugJira, 
  formatWebApiBugMarkdown, 
  formatWebApiBugSlack, 
  downloadFile 
} from '../utils/formatters';

interface BugReportBuilderProps {
  lang: Language;
}

export const BugReportBuilder: React.FC<BugReportBuilderProps> = ({ lang }) => {
  const [profile, setProfile] = useState<BugProfileType>('game-fqa');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  // Game FQA Form State
  const [gameBug, setGameBug] = useState<GameBugData>({
    component: 'UI/HUD',
    platform: 'PlayStation 5',
    environmentType: 'DevKit (Target Manager)',
    buildVersion: 'v1.2.0-rc4 (Build 89412)',
    branch: 'release/v1.2.0',
    title: 'Health bar HUD collapses permanently after rapid radial menu dismissal',
    reproRate: '5/5 (100% reproducible)',
    severity: 'Major',
    priority: 'P2 - High',
    displayMode: 'Performance Mode (60 FPS / Dynamic 1440p)',
    inputDevice: 'DualSense Wireless Controller',
    systemLanguage: 'English (US)',
    preconditions: '1. Load Save Slot 1 (Chapter 03 - Combat Area).\n2. Equip primary shotgun and secondary pistol.\n3. Verify health HUD is visible at 100% HP.',
    steps: [
      'Enter Combat Zone 03 to engage enemy squad.',
      'Hold L1 to open the radial weapon selection wheel.',
      'Flick right analog stick to weapon slot 2.',
      'Release L1 rapidly while taking damage from enemy projectile.',
      'Observe top-left viewport corner where player health HUD is anchored.'
    ],
    expectedResult: 'Radial menu dismisses smoothly and health HUD remains permanently anchored at top-left with updated health points.',
    actualResult: 'Radial menu fades out, but health HUD widget visibility state collapses and fails to re-render until pausing and unpausing the game.',
    logsCallstack: '[LogSlate] Warning: SWidget[UPlayerHealthBarWidget] visibility forced to Collapsed by ParentCanvas slot.\n[LogScript] Error: OnRadialMenuDismissed -> Null pointer reading SlateCanvasSlot.',
    regressionInfo: 'Passed on v1.1.8. Regression introduced in commit f9104c8 ("Refactored Slate UI layer ordering").',
    workaround: 'Open Options pause menu and resume gameplay; HUD re-initializes.',
    attachmentsNote: 'Attached 60fps MP4 capture (PS5_HUD_Desync.mp4) and DevKit console log.'
  });

  // Web / API Form State
  const [webBug, setWebBug] = useState<WebApiBugData>({
    service: 'AUTH-GATEWAY',
    endpointUrl: 'https://api.staging.example.com/v1/tokens/refresh',
    httpMethod: 'POST',
    expectedStatus: '200 OK',
    actualStatus: '500 Internal Server Error',
    environment: 'Staging-EU (K8s Cluster)',
    browserOs: 'Chrome 129.0.6668 / macOS 15.0',
    severity: 'Critical',
    priority: 'P1 - Urgent',
    title: 'Refresh token endpoint returns unhandled 500 when client clock drifts by >= 30s',
    preconditions: '1. User qa_tester@example.com is logged in.\n2. Access token is expired (TTL = 120s).\n3. Client machine clock set +35s ahead of NTP time.',
    steps: [
      'Log into staging application using valid test credentials.',
      'Wait 2 minutes for access token expiration.',
      'Trigger token refresh call by dispatching POST /v1/tokens/refresh with local clock offset.',
      'Inspect HTTP status code and response payload body.'
    ],
    curlCommand: `curl -X POST "https://api.staging.example.com/v1/tokens/refresh" \\
  -H "Content-Type: application/json" \\
  -H "X-Correlation-ID: qa-bug-20261016-1" \\
  -d '{"refreshToken": "eyJhbGciOiJSUzI1NiIsIn...", "deviceId": "dev_0019"}'`,
    requestPayload: `{\n  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "deviceId": "dev_0019"\n}`,
    responsePayload: `{\n  "error": {\n    "code": "INTERNAL_SERVER_ERROR",\n    "message": "An unexpected error occurred while verifying token claims.",\n    "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-01"\n  }\n}`,
    serverLogs: '2026-10-16T10:18:04Z [ERROR] [idp-core]: jsonwebtoken.NotBeforeError: jwt not active\nMissing clockTolerance leeway in token.service.ts:88:24.',
    impact: 'Users with minor local device clock differences are blocked from automatic token renewal and abruptly signed out.',
    workaround: 'User must manually sync device clock to NTP and re-enter credentials.'
  });

  // Steps Handlers for Game Bug
  const handleAddGameStep = () => {
    setGameBug((prev) => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const handleUpdateGameStep = (index: number, value: string) => {
    setGameBug((prev) => {
      const updated = [...prev.steps];
      updated[index] = value;
      return { ...prev, steps: updated };
    });
  };

  const handleRemoveGameStep = (index: number) => {
    setGameBug((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  // Steps Handlers for Web Bug
  const handleAddWebStep = () => {
    setWebBug((prev) => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const handleUpdateWebStep = (index: number, value: string) => {
    setWebBug((prev) => {
      const updated = [...prev.steps];
      updated[index] = value;
      return { ...prev, steps: updated };
    });
  };

  const handleRemoveWebStep = (index: number) => {
    setWebBug((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  // Generate formatted text based on current format selection
  const generatedReport = React.useMemo(() => {
    if (profile === 'game-fqa') {
      if (exportFormat === 'jira') return formatGameBugJira(gameBug);
      if (exportFormat === 'markdown') return formatGameBugMarkdown(gameBug);
      return formatGameBugSlack(gameBug);
    } else {
      if (exportFormat === 'jira') return formatWebApiBugJira(webBug);
      if (exportFormat === 'markdown') return formatWebApiBugMarkdown(webBug);
      return formatWebApiBugSlack(webBug);
    }
  }, [profile, exportFormat, gameBug, webBug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const filename = profile === 'game-fqa'
      ? `GAME-BUG_${gameBug.component.replace(/\//g, '-')}_${new Date().toISOString().slice(0, 10)}.md`
      : `API-BUG_${webBug.service}_${new Date().toISOString().slice(0, 10)}.md`;
    downloadFile(generatedReport, filename, 'text/markdown;charset=utf-8');
  };

  const handleLoadDemo = () => {
    if (profile === 'game-fqa') {
      setGameBug({
        component: 'TRC/Compliance',
        platform: 'PlayStation 5',
        environmentType: 'DevKit (Retail Mode)',
        buildVersion: 'v1.2.0-rc5 (Build 90114)',
        branch: 'release/v1.2.0',
        title: 'Title fails to pause and display TRC-compliant prompt on controller battery depletion',
        reproRate: '5/5 (100% reproducible)',
        severity: 'Critical',
        priority: 'P1 - Urgent',
        displayMode: '4K HDR 60fps',
        inputDevice: 'DualSense Wireless Controller',
        systemLanguage: 'Polish (PL)',
        preconditions: '1. Active combat encounter loaded.\n2. DualSense wireless battery depleted or USB connection severed.',
        steps: [
          'Boot game and continue campaign into Chapter 04 boss fight.',
          'Sever controller connection during live combat.',
          'Observe screen pause state and audio ducking behavior.'
        ],
        expectedResult: 'Game immediately enters system pause state and renders official first-party reconnection dialog. Background audio ducks.',
        actualResult: 'Game continues simulating combat in real time; player character dies without receiving controller input. Violates Sony TRC R4052.',
        logsCallstack: '[LogPad] Error: DualSense disconnect event ignored by CombatStateManager; input state frozen at last stick position.',
        regressionInfo: 'New regression in build 90114 after input manager decoupling.',
        workaround: 'No workaround available in retail build.',
        attachmentsNote: 'Attached video PS5_TRC_Disconnect_Fail.mp4.'
      });
    } else {
      setWebBug({
        service: 'BILLING-API',
        endpointUrl: 'https://api.staging.example.com/v1/checkout/sessions',
        httpMethod: 'POST',
        expectedStatus: '200 OK / 409 Conflict',
        actualStatus: '500 Internal Server Error',
        environment: 'Staging-US (AWS EKS)',
        browserOs: 'Firefox 130 / Windows 11',
        severity: 'Critical',
        priority: 'P1 - Urgent',
        title: 'Concurrent checkout request with identical Idempotency-Key triggers DB unique constraint violation',
        preconditions: '1. Valid cart with 2 line items.\n2. Idempotency-Key header provided in request.',
        steps: [
          'Send two simultaneous POST /v1/checkout/sessions requests with identical Idempotency-Key header.',
          'Inspect response headers and database error logs.'
        ],
        curlCommand: `curl -X POST "https://api.staging.example.com/v1/checkout/sessions" \\\n  -H "Idempotency-Key: idemp-valk-99120" \\\n  -H "Content-Type: application/json" \\\n  -d '{"cartId": "cart_8812"}'`,
        requestPayload: `{\n  "cartId": "cart_8812",\n  "amount": 4999\n}`,
        responsePayload: `{\n  "error": "InternalServerError: duplicate key value violates unique constraint 'idx_idempotency_key'"\n}`,
        serverLogs: 'ERROR [TypeORM] duplicate key error: idx_idempotency_key on payments table. Transaction aborted.',
        impact: 'Users clicking checkout button multiple times receive 500 error and duplicate pending authorization holds.',
        workaround: 'Debounce checkout button in web client.'
      });
    }
  };

  const quickGameComponents = ['UI/HUD', 'Gameplay', 'Save/Load', 'Audio', 'TRC/Compliance', 'Physics/Collision', 'Network'];
  const quickWebServices = ['AUTH-GATEWAY', 'BILLING-API', 'SEARCH-SERVICE', 'USERS-API', 'INVENTORY-SVC', 'WEBHOOK-HANDLER'];

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#110f1e] border border-purple-900/30 p-5 rounded-2xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-[11px] font-semibold text-purple-300 border border-purple-800/40 mb-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>{lang === 'en' ? 'Interactive Generator' : 'Interaktywny Kreator'}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {lang === 'en' ? 'Bug Report Builder & Multi-Format Studio' : 'Kreator Zgłoszeń Błędów & Studio Wielu Formatów'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Fill in standardized engineering fields; export live to Jira Wiki, GitHub Markdown, or Slack.'
              : 'Wypełnij pola inżynierskie; raport generuje się na żywo w formatach Jira Wiki, GitHub Markdown oraz Slack.'}
          </p>
        </div>

        {/* Profile Switcher Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-800 p-1">
            <button
              onClick={() => setProfile('game-fqa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                profile === 'game-fqa'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Game FQA</span>
            </button>
            <button
              onClick={() => setProfile('web-api')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                profile === 'web-api'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Web &amp; REST API</span>
            </button>
          </div>

          <button
            onClick={handleLoadDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-950/50 hover:bg-purple-900/50 text-purple-300 border border-purple-800/40 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Load sample bug data' : 'Załaduj przykładowe dane błędu'}
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{lang === 'en' ? 'Load Demo' : 'Załaduj Demo'}</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Layout: Form (Left) & Live Formatted Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Interactive Form */}
        <div className="lg:col-span-6 bg-[#110f1e] border border-purple-900/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-purple-950/60 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {lang === 'en' ? 'Defect Parameters' : 'Parametry Błędu'}
            </span>
            <span className="text-[11px] text-slate-500">
              {profile === 'game-fqa' ? 'Sony TRC / MS TCR / FQA' : 'RFC 9110 / REST Standard'}
            </span>
          </div>

          {profile === 'game-fqa' ? (
            /* ================= GAME FQA FORM ================= */
            <div className="space-y-4">
              {/* Component & Quick Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Component / Module' : 'Komponent / Moduł'}
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {quickGameComponents.map((comp) => (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => setGameBug((p) => ({ ...p, component: comp }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                        gameBug.component === comp
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      [{comp}]
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={gameBug.component}
                  onChange={(e) => setGameBug({ ...gameBug, component: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g. UI/HUD or Combat System"
                />
              </div>

              {/* Title / Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Issue Title (Concise Summary)' : 'Tytuł Zgłoszenia (Zwięzłe Podsumowanie)'}
                </label>
                <input
                  type="text"
                  value={gameBug.title}
                  onChange={(e) => setGameBug({ ...gameBug, title: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-medium"
                />
              </div>

              {/* Platform, Environment, and Build */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'en' ? 'Platform' : 'Platforma'}
                  </label>
                  <select
                    value={gameBug.platform}
                    onChange={(e) => setGameBug({ ...gameBug, platform: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox Series X">Xbox Series X</option>
                    <option value="Nintendo Switch 2">Nintendo Switch 2</option>
                    <option value="PC (Steam / Windows 11)">PC (Steam / Win 11)</option>
                    <option value="PC (Epic Games Store)">PC (Epic Games)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'en' ? 'Build Version' : 'Wersja Buildu'}
                  </label>
                  <input
                    type="text"
                    value={gameBug.buildVersion}
                    onChange={(e) => setGameBug({ ...gameBug, buildVersion: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'en' ? 'Repro Rate' : 'Powtarzalność'}
                  </label>
                  <select
                    value={gameBug.reproRate}
                    onChange={(e) => setGameBug({ ...gameBug, reproRate: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-purple-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-bold"
                  >
                    <option value="5/5 (100% reproducible)">5/5 (100% reproducible)</option>
                    <option value="4/5 (80% reproducible)">4/5 (80% reproducible)</option>
                    <option value="3/5 (60% reproducible)">3/5 (60% reproducible)</option>
                    <option value="2/5 (40% reproducible)">2/5 (40% reproducible)</option>
                    <option value="1/5 (20% intermittent)">1/5 (20% intermittent)</option>
                  </select>
                </div>
              </div>

              {/* Severity & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'en' ? 'Severity' : 'Waga (Severity)'}
                  </label>
                  <select
                    value={gameBug.severity}
                    onChange={(e) => setGameBug({ ...gameBug, severity: e.target.value as BugSeverity })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-semibold"
                  >
                    <option value="Blocker">Blocker</option>
                    <option value="Critical">Critical</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="Trivial">Trivial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {lang === 'en' ? 'Priority' : 'Priorytet (Priority)'}
                  </label>
                  <select
                    value={gameBug.priority}
                    onChange={(e) => setGameBug({ ...gameBug, priority: e.target.value as BugPriority })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-semibold"
                  >
                    <option value="P1 - Urgent">P1 - Urgent</option>
                    <option value="P2 - High">P2 - High</option>
                    <option value="P3 - Medium">P3 - Medium</option>
                    <option value="P4 - Low">P4 - Low</option>
                  </select>
                </div>
              </div>

              {/* Preconditions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Preconditions' : 'Warunki Wstępne (Preconditions)'}
                </label>
                <textarea
                  rows={2}
                  value={gameBug.preconditions}
                  onChange={(e) => setGameBug({ ...gameBug, preconditions: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Steps to Reproduce */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {lang === 'en' ? 'Steps to Reproduce' : 'Kroki Reprodukcji'} ({gameBug.steps.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddGameStep}
                    className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Add Step' : 'Dodaj krok'}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {gameBug.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-center text-xs font-mono font-bold text-slate-500">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleUpdateGameStep(idx, e.target.value)}
                        className="flex-1 bg-[#0d0b18] text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                        placeholder={`Step ${idx + 1}...`}
                      />
                      {gameBug.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveGameStep(idx)}
                          className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected vs Actual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-emerald-400 mb-1">
                    {lang === 'en' ? 'Expected Result' : 'Oczekiwany Rezultat'}
                  </label>
                  <textarea
                    rows={3}
                    value={gameBug.expectedResult}
                    onChange={(e) => setGameBug({ ...gameBug, expectedResult: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-400 mb-1">
                    {lang === 'en' ? 'Actual Result' : 'Faktyczny Rezultat (Błąd)'}
                  </label>
                  <textarea
                    rows={3}
                    value={gameBug.actualResult}
                    onChange={(e) => setGameBug({ ...gameBug, actualResult: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Logs & Callstack */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Engine Logs / Crash Stack (Optional)' : 'Logi Silnika / Zrzut Błędu (Opcjonalnie)'}
                </label>
                <textarea
                  rows={2}
                  value={gameBug.logsCallstack}
                  onChange={(e) => setGameBug({ ...gameBug, logsCallstack: e.target.value })}
                  className="w-full bg-[#0d0b18] font-mono text-xs text-slate-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            /* ================= WEB & REST API FORM ================= */
            <div className="space-y-4">
              {/* Service & Quick Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Microservice / API Service' : 'Mikrousługa / Moduł API'}
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {quickWebServices.map((svc) => (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => setWebBug((p) => ({ ...p, service: svc }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                        webBug.service === svc
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      [{svc}]
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={webBug.service}
                  onChange={(e) => setWebBug({ ...webBug, service: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Defect Summary' : 'Tytuł / Podsumowanie Awarii'}
                </label>
                <input
                  type="text"
                  value={webBug.title}
                  onChange={(e) => setWebBug({ ...webBug, title: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-medium"
                />
              </div>

              {/* HTTP Method, URL, Expected & Actual Status */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Method
                  </label>
                  <select
                    value={webBug.httpMethod}
                    onChange={(e) => setWebBug({ ...webBug, httpMethod: e.target.value as any })}
                    className="w-full bg-[#0d0b18] text-xs text-purple-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-bold"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={webBug.endpointUrl}
                    onChange={(e) => setWebBug({ ...webBug, endpointUrl: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-emerald-400 mb-1">
                    Expected Status
                  </label>
                  <input
                    type="text"
                    value={webBug.expectedStatus}
                    onChange={(e) => setWebBug({ ...webBug, expectedStatus: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-emerald-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-400 mb-1">
                    Actual Status
                  </label>
                  <input
                    type="text"
                    value={webBug.actualStatus}
                    onChange={(e) => setWebBug({ ...webBug, actualStatus: e.target.value })}
                    className="w-full bg-[#0d0b18] text-xs text-rose-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-rose-500 focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Severity
                  </label>
                  <select
                    value={webBug.severity}
                    onChange={(e) => setWebBug({ ...webBug, severity: e.target.value as BugSeverity })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-semibold"
                  >
                    <option value="Blocker">Blocker</option>
                    <option value="Critical">Critical</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={webBug.priority}
                    onChange={(e) => setWebBug({ ...webBug, priority: e.target.value as BugPriority })}
                    className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none font-semibold"
                  >
                    <option value="P1 - Urgent">P1 - Urgent</option>
                    <option value="P2 - High">P2 - High</option>
                    <option value="P3 - Medium">P3 - Medium</option>
                  </select>
                </div>
              </div>

              {/* cURL Command */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Reproduction cURL Command
                </label>
                <textarea
                  rows={3}
                  value={webBug.curlCommand}
                  onChange={(e) => setWebBug({ ...webBug, curlCommand: e.target.value })}
                  className="w-full bg-[#0d0b18] font-mono text-xs text-purple-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Response Payload */}
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Actual Response Payload (JSON)
                </label>
                <textarea
                  rows={3}
                  value={webBug.responsePayload}
                  onChange={(e) => setWebBug({ ...webBug, responsePayload: e.target.value })}
                  className="w-full bg-[#0d0b18] font-mono text-xs text-rose-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-rose-500 focus:outline-none"
                />
              </div>

              {/* Business Impact */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Business Impact & Workaround' : 'Wpływ Biznesowy i Obejście'}
                </label>
                <textarea
                  rows={2}
                  value={webBug.impact}
                  onChange={(e) => setWebBug({ ...webBug, impact: e.target.value })}
                  className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Live Dual-Pane Output Viewer */}
        <div className="lg:col-span-6 bg-[#110f1e] border border-purple-900/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* Format Tabs & Action Buttons */}
          <div className="p-4 border-b border-purple-900/30 bg-[#151226]/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
                {lang === 'en' ? 'Format:' : 'Format:'}
              </span>
              <button
                onClick={() => setExportFormat('jira')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  exportFormat === 'jira'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Jira Markup</span>
              </button>

              <button
                onClick={() => setExportFormat('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  exportFormat === 'markdown'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>GitHub MD</span>
              </button>

              <button
                onClick={() => setExportFormat('slack')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  exportFormat === 'slack'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Slack</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Copy to clipboard' : 'Kopiuj do schowka'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copied ? (lang === 'en' ? 'Copied!' : 'Skopiowano!') : (lang === 'en' ? 'Copy' : 'Kopiuj')}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Download Markdown file' : 'Pobierz plik'}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Save .md' : 'Zapisz'}</span>
              </button>
            </div>
          </div>

          {/* Formatted Code Display */}
          <div className="p-4 sm:p-5 max-h-[720px] overflow-y-auto font-mono text-xs text-slate-200 bg-[#090810] leading-relaxed scrollbar-thin">
            <pre className="whitespace-pre-wrap break-words font-mono text-xs text-purple-100">
              {generatedReport}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
