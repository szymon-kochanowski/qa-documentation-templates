/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React from 'react';
import { 
  FileText, 
  Bug, 
  Table, 
  CheckSquare, 
  Globe, 
  Github, 
  Layers,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: 'explorer' | 'bug-builder' | 'test-cases' | 'smoke-checklist';
  setCurrentTab: (tab: 'explorer' | 'bug-builder' | 'test-cases' | 'smoke-checklist') => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, lang, setLang }) => {
  const tabs = [
    {
      id: 'explorer' as const,
      label: lang === 'en' ? 'Template Explorer' : 'Przeglądarka Szablonów',
      icon: FileText,
      badge: '7 Files'
    },
    {
      id: 'bug-builder' as const,
      label: lang === 'en' ? 'Bug Report Builder' : 'Kreator Błędów',
      icon: Bug,
      badge: 'Dual-Pane'
    },
    {
      id: 'test-cases' as const,
      label: lang === 'en' ? 'Test Cases & CSV' : 'Przypadki & CSV',
      icon: Table,
      badge: 'TestMo'
    },
    {
      id: 'smoke-checklist' as const,
      label: lang === 'en' ? 'Smoke Checklist' : 'Checklista Smoke',
      icon: CheckSquare,
      badge: 'TRC/TCR'
    }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-purple-900/30 bg-[#0d0b18]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 p-0.5 shadow-lg shadow-purple-900/40 flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0b18] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight text-base sm:text-lg">
                  qa-documentation-templates
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/50">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'en'
                  ? 'QA Documentation Templates & Interactive Report Studio'
                  : 'Szablony Dokumentacji QA & Interaktywne Studio Raportowania'}
              </p>
            </div>
          </div>

          {/* Right actions: Author info, Language switcher & GitHub */}
          <div className="flex items-center gap-3">
            {/* Author tag */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">{lang === 'en' ? 'Author:' : 'Autor:'}</span>
              <span className="font-semibold text-purple-300">Szymon Kochanowski</span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'pl' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-800/40 transition-colors"
              title={lang === 'en' ? 'Przełącz na język polski' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* GitHub repo button */}
            <a
              href="https://github.com/SzymonKochanowski/qa-documentation-templates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-purple-950/40 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    isActive ? 'bg-purple-800/80 text-purple-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
