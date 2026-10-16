/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  MinusCircle, 
  HelpCircle, 
  Download, 
  Copy, 
  Check, 
  Plus, 
  RotateCcw, 
  FileText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { INITIAL_SMOKE_CHECKLIST } from '../data/smokeChecklistData';
import { SmokeChecklistItem, ChecklistItemStatus, Language } from '../types';
import { formatSmokeChecklistAudit, downloadFile } from '../utils/formatters';

interface SmokeChecklistStudioProps {
  lang: Language;
}

export const SmokeChecklistStudio: React.FC<SmokeChecklistStudioProps> = ({ lang }) => {
  const [items, setItems] = useState<SmokeChecklistItem[]>(INITIAL_SMOKE_CHECKLIST);
  const [targetBuild, setTargetBuild] = useState<string>('v1.2.0-rc5 (Build 90412)');
  const [auditorName, setAuditorName] = useState<string>('Szymon Kochanowski');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Status handler
  const handleSetStatus = (id: string, status: ChecklistItemStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const handleMarkAllPass = () => {
    setItems((prev) => prev.map((item) => ({ ...item, status: 'PASS' })));
  };

  const handleResetChecklist = () => {
    setItems(INITIAL_SMOKE_CHECKLIST);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = items.length;
    const passed = items.filter((i) => i.status === 'PASS').length;
    const failed = items.filter((i) => i.status === 'FAIL').length;
    const blocked = items.filter((i) => i.status === 'BLOCKED').length;
    const na = items.filter((i) => i.status === 'NA').length;
    const untested = items.filter((i) => i.status === 'UNTESTED').length;
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

    return { total, passed, failed, blocked, na, untested, passRate };
  }, [items]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: SmokeChecklistItem[] } = {};
    items.forEach((item) => {
      const catKey = item.category;
      if (!groups[catKey]) groups[catKey] = [];
      groups[catKey].push(item);
    });
    return groups;
  }, [items]);

  const auditReport = useMemo(() => {
    return formatSmokeChecklistAudit(items, targetBuild, auditorName);
  }, [items, targetBuild, auditorName]);

  const handleCopyReport = async () => {
    await navigator.clipboard.writeText(auditReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    downloadFile(auditReport, `SMOKE_AUDIT_${targetBuild.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`, 'text/markdown;charset=utf-8');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-[#110f1e] border border-purple-900/30 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-[11px] font-semibold text-purple-300 border border-purple-800/40 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'Console Pre-Certification & Smoke' : 'Weryfikacja Smoke & Pre-Certyfikacja'}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {lang === 'en' ? 'Interactive Release Smoke Checklist' : 'Interaktywna Checklista Weryfikacyjna Smoke'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Click to evaluate Pass, Fail, Blocked, or N/A with live progress calculation and report export.'
              : 'Klikaj statusy Pass, Fail, Blocked lub N/A z kalkulacją wskaźnika zdawalności na żywo.'}
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleMarkAllPass}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white shadow-md shadow-emerald-950/40 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Mark All Pass' : 'Zalicz Wszystkie'}</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Export Summary' : 'Eksportuj Raport'}</span>
          </button>

          <button
            onClick={handleResetChecklist}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Reset checklist' : 'Zresetuj'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Audit Target Inputs & Progress Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Metadata inputs */}
        <div className="lg:col-span-5 bg-[#110f1e] border border-purple-900/30 p-5 rounded-2xl space-y-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
            {lang === 'en' ? 'Audit Session Metadata' : 'Metadane Sesji Audytowej'}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {lang === 'en' ? 'Target Build / Version' : 'Testowany Build / Wersja'}
            </label>
            <input
              type="text"
              value={targetBuild}
              onChange={(e) => setTargetBuild(e.target.value)}
              className="w-full bg-[#0d0b18] text-xs font-mono text-purple-300 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {lang === 'en' ? 'Lead Auditor Name' : 'Audytor / QA Lead'}
            </label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-2 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Real-time progress bar & gauge */}
        <div className="lg:col-span-7 bg-[#110f1e] border border-purple-900/30 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              {lang === 'en' ? 'Live Pass Rate Gauge' : 'Wskaźnik Zdawalności na Żywo'}
            </span>
            <span className="text-2xl font-black text-purple-300">
              {metrics.passRate}%
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${(metrics.passed / metrics.total) * 100}%` }}
              className="bg-emerald-500 transition-all duration-300"
              title={`Passed: ${metrics.passed}`}
            />
            <div
              style={{ width: `${(metrics.failed / metrics.total) * 100}%` }}
              className="bg-rose-500 transition-all duration-300"
              title={`Failed: ${metrics.failed}`}
            />
            <div
              style={{ width: `${(metrics.blocked / metrics.total) * 100}%` }}
              className="bg-amber-500 transition-all duration-300"
              title={`Blocked: ${metrics.blocked}`}
            />
            <div
              style={{ width: `${(metrics.na / metrics.total) * 100}%` }}
              className="bg-slate-600 transition-all duration-300"
              title={`N/A: ${metrics.na}`}
            />
          </div>

          {/* Detailed Counter Badges */}
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-[#0e0c19] p-2 rounded-lg border border-purple-950/60">
              <span className="text-[10px] text-slate-400 block">{lang === 'en' ? 'Total' : 'Razem'}</span>
              <span className="font-bold text-white text-sm">{metrics.total}</span>
            </div>
            <div className="bg-[#0e0c19] p-2 rounded-lg border border-emerald-950/60">
              <span className="text-[10px] text-emerald-400 block">Pass</span>
              <span className="font-bold text-emerald-300 text-sm">{metrics.passed}</span>
            </div>
            <div className="bg-[#0e0c19] p-2 rounded-lg border border-rose-950/60">
              <span className="text-[10px] text-rose-400 block">Fail</span>
              <span className="font-bold text-rose-300 text-sm">{metrics.failed}</span>
            </div>
            <div className="bg-[#0e0c19] p-2 rounded-lg border border-amber-950/60">
              <span className="text-[10px] text-amber-400 block">Blocked</span>
              <span className="font-bold text-amber-300 text-sm">{metrics.blocked}</span>
            </div>
            <div className="bg-[#0e0c19] p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">N/A</span>
              <span className="font-bold text-slate-300 text-sm">{metrics.na}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([categoryKey, catItems]) => {
          const catTitle = catItems[0].categoryTitle[lang];
          return (
            <div
              key={categoryKey}
              className="bg-[#110f1e] border border-purple-900/30 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Category Header */}
              <div className="p-4 bg-[#151226]/80 border-b border-purple-950/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {catTitle}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    ({catItems.length} {lang === 'en' ? 'checks' : 'punktów'})
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-purple-950/40">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 hover:bg-purple-950/10 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                  >
                    {/* ID & Check Item description */}
                    <div className="lg:col-span-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-purple-400">
                          {item.id}
                        </span>
                        <span className="font-semibold text-xs text-slate-100">
                          {item.checkItem[lang]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {item.verificationSteps[lang]}
                      </p>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Target: {item.targetPlatform}
                      </div>
                    </div>

                    {/* Status Pill Buttons */}
                    <div className="lg:col-span-3 flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleSetStatus(item.id, 'PASS')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          item.status === 'PASS'
                            ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-emerald-300 border border-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pass</span>
                      </button>

                      <button
                        onClick={() => handleSetStatus(item.id, 'FAIL')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          item.status === 'FAIL'
                            ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-rose-300 border border-slate-800'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Fail</span>
                      </button>

                      <button
                        onClick={() => handleSetStatus(item.id, 'BLOCKED')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          item.status === 'BLOCKED'
                            ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-amber-300 border border-slate-800'
                        }`}
                      >
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>Blocked</span>
                      </button>

                      <button
                        onClick={() => handleSetStatus(item.id, 'NA')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          item.status === 'NA'
                            ? 'bg-slate-600 text-white shadow-sm ring-1 ring-slate-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        <MinusCircle className="w-3.5 h-3.5" />
                        <span>N/A</span>
                      </button>
                    </div>

                    {/* Notes & Ticket reference input */}
                    <div className="lg:col-span-3">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleUpdateNotes(item.id, e.target.value)}
                        placeholder={lang === 'en' ? 'Notes or bug ticket...' : 'Notatki lub numer błędu...'}
                        className="w-full bg-[#0d0b18] text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 focus:border-purple-500 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Summary Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#110f1e] border border-purple-900/50 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-purple-950 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight">
                {lang === 'en' ? 'Smoke & Platform Audit Summary' : 'Podsumowanie Audytu Smoke & Certyfikacji'}
              </h3>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#090810] p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-100 leading-relaxed scrollbar-thin">
              <pre className="whitespace-pre-wrap break-words">
                {auditReport}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-950">
              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copied ? (lang === 'en' ? 'Copied!' : 'Skopiowano!') : (lang === 'en' ? 'Copy Markdown' : 'Kopiuj')}</span>
              </button>

              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Download .md' : 'Pobierz .md'}</span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Close' : 'Zamknij'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
