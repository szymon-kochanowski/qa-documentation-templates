/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TemplateExplorer } from './components/TemplateExplorer';
import { BugReportBuilder } from './components/BugReportBuilder';
import { TestCaseGenerator } from './components/TestCaseGenerator';
import { SmokeChecklistStudio } from './components/SmokeChecklistStudio';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'explorer' | 'bug-builder' | 'test-cases' | 'smoke-checklist'>('explorer');
  const [lang, setLang] = useState<Language>('pl');

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0a14] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Ambient background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-900/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-800/10 rounded-full blur-[128px]" />
      </div>

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {currentTab === 'explorer' && <TemplateExplorer lang={lang} />}
        {currentTab === 'bug-builder' && <BugReportBuilder lang={lang} />}
        {currentTab === 'test-cases' && <TestCaseGenerator lang={lang} />}
        {currentTab === 'smoke-checklist' && <SmokeChecklistStudio lang={lang} />}
      </main>

      {/* Global Footer */}
      <Footer lang={lang} />
    </div>
  );
}
