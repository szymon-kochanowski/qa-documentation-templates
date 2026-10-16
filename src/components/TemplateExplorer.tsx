/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Eye, 
  FolderGit2, 
  ExternalLink,
  ShieldCheck,
  Tag,
  Sparkles
} from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templatesData';
import { QATemplate, Language, TemplateCategory } from '../types';
import { downloadFile } from '../utils/formatters';

interface TemplateExplorerProps {
  lang: Language;
}

export const TemplateExplorer: React.FC<TemplateExplorerProps> = ({ lang }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATES_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  const categories: { id: TemplateCategory; label: { en: string; pl: string } }[] = [
    { id: 'all', label: { en: 'All Templates', pl: 'Wszystkie Szablony' } },
    { id: 'game-fqa', label: { en: 'Game FQA', pl: 'Game FQA (Gry)' } },
    { id: 'web-api', label: { en: 'Web & REST API', pl: 'Web & REST API' } },
    { id: 'test-cases', label: { en: 'Test Cases & CSV', pl: 'Zbiory Przypadków Testowych' } },
    { id: 'test-plans', label: { en: 'Master Test Plans', pl: 'Główne Plany Testów' } },
    { id: 'checklists', label: { en: 'Smoke & Cert Checklists', pl: 'Checklisty Smoke i Certyfikacji' } },
    { id: 'reports', label: { en: 'Sign-Off & EoD Reports', pl: 'Raporty Dzienne & Sign-off' } },
  ];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((tmpl) => {
      const matchesCategory = activeCategory === 'all' || tmpl.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMatch = tmpl.title[lang].toLowerCase().includes(query);
      const descMatch = tmpl.description[lang].toLowerCase().includes(query);
      const tagMatch = tmpl.tags.some((t) => t.toLowerCase().includes(query));
      const fileMatch = tmpl.filePath.toLowerCase().includes(query);

      return matchesCategory && (titleMatch || descMatch || tagMatch || fileMatch);
    });
  }, [activeCategory, searchQuery, lang]);

  const activeTemplate = useMemo(() => {
    return TEMPLATES_DATA.find((t) => t.id === selectedTemplateId) || TEMPLATES_DATA[0];
  }, [selectedTemplateId]);

  const handleCopyRaw = async () => {
    if (!activeTemplate) return;
    try {
      await navigator.clipboard.writeText(activeTemplate.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!activeTemplate) return;
    const mime = activeTemplate.format === 'csv' ? 'text/csv;charset=utf-8' : 'text/markdown;charset=utf-8';
    downloadFile(activeTemplate.content, activeTemplate.fileName, mime);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#151226] to-[#0f0d1b] border border-purple-900/40 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/50 text-xs text-purple-300 font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Physical Repository Catalog' : 'Katalog Fizycznych Szablonów w Repo'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'en' 
              ? 'Standardized QA Engineering Documentation Templates' 
              : 'Ustandaryzowane Szablony Dokumentacji Inżynierskiej QA'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'Ready-to-use, compliant documentation files located in /templates/. Strictly authored to ISTQB, IEEE 829, RFC 9110, and Console TRC/TCR certification standards.'
              : 'Gotowe do użycia pliki dokumentacji zlokalizowane w katalogu /templates/. Opracowane ściśle według standardów ISTQB, IEEE 829, RFC 9110 oraz konsolowych wytycznych TRC/TCR.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search templates...' : 'Szukaj w szablonach...'}
            className="w-full bg-[#110f1e] text-xs text-slate-200 pl-9 pr-4 py-2 rounded-xl border border-purple-900/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Two Column Layout: Template Selector List & Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Template Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            {lang === 'en' ? `Templates (${filteredTemplates.length})` : `Dostępne Szablony (${filteredTemplates.length})`}
          </div>

          <div className="space-y-2">
            {filteredTemplates.map((tmpl) => {
              const isSelected = tmpl.id === activeTemplate.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-600/80 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/50'
                      : 'bg-[#12101e] hover:bg-[#181528] border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-100 leading-snug">
                      {tmpl.title[lang]}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-purple-300 uppercase shrink-0">
                      .{tmpl.format}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {tmpl.description[lang]}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-purple-400/90 truncate max-w-[200px]">
                      {tmpl.filePath}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {tmpl.standard.split('/')[0].trim()}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredTemplates.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs bg-[#110f1e] rounded-xl border border-dashed border-slate-800">
                {lang === 'en' ? 'No templates match your query.' : 'Brak szablonów spełniających kryteria.'}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Active Template Viewer */}
        <div className="lg:col-span-8 bg-[#110f1e] border border-purple-900/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* Header bar of preview */}
          <div className="p-4 sm:p-5 border-b border-purple-900/30 bg-[#151226]/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeTemplate.title[lang]}
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-purple-900/60 text-purple-300 border border-purple-700/50">
                  {activeTemplate.fileName}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="font-mono text-slate-300">{activeTemplate.filePath}</span>
                <span>•</span>
                <span className="text-purple-300 font-medium">{activeTemplate.standard}</span>
              </div>
            </div>

            {/* View Mode & Actions */}
            <div className="flex items-center gap-2">
              {/* Toggle Preview / Raw */}
              <div className="flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    viewMode === 'preview' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Rendered' : 'Podgląd'}</span>
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    viewMode === 'raw' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Raw Code' : 'Kod źródłowy'}</span>
                </button>
              </div>

              {/* Copy Raw Button */}
              <button
                onClick={handleCopyRaw}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Copy template to clipboard' : 'Kopiuj treść szablonu'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copied ? (lang === 'en' ? 'Copied!' : 'Skopiowano!') : (lang === 'en' ? 'Copy Raw' : 'Kopiuj')}</span>
              </button>

              {/* Download File Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Download physical file' : 'Pobierz plik'}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Download' : 'Pobierz'}</span>
              </button>
            </div>
          </div>

          {/* Tags bar */}
          <div className="px-5 py-2.5 bg-[#0e0c19] border-b border-purple-950/40 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {lang === 'en' ? 'Tags:' : 'Tagi:'}
            </span>
            {activeTemplate.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 text-purple-300 border border-purple-950"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Template Content Area */}
          <div className="p-5 sm:p-6 max-h-[640px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
            {viewMode === 'raw' ? (
              <pre className="whitespace-pre-wrap break-words font-mono text-xs text-purple-200 bg-[#090810] p-4 rounded-xl border border-purple-950">
                {activeTemplate.content}
              </pre>
            ) : (
              <div className="space-y-4 font-sans text-slate-300">
                {/* Clean formatted representation */}
                <div className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-a:text-purple-400 prose-pre:bg-[#090810] prose-pre:border prose-pre:border-purple-950/60 text-sm">
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs text-slate-200 bg-[#0c0a14] p-5 rounded-xl border border-purple-950 leading-relaxed">
                    {activeTemplate.content}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
