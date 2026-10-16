/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React from 'react';
import { ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="mt-16 border-t border-purple-950/60 bg-[#0a0814] text-xs text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center border border-purple-800/40">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-slate-200">
                qa-documentation-templates
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'en'
                  ? 'Standardized QA Engineering Repository & Interactive Report Studio'
                  : 'Inżynierskie Szablony Dokumentacji QA & Interaktywne Studio Raportowania'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://github.com/SzymonKochanowski/qa-documentation-templates"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
            <span>•</span>
            <span className="text-purple-300 font-semibold">MIT License</span>
            <span>•</span>
            <span className="text-slate-400">Copyright (c) 2026 Szymon Kochanowski</span>
          </div>
        </div>

        <div className="pt-4 border-t border-purple-950/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            {lang === 'en'
              ? 'Compliant with ISTQB Advanced, IEEE 829-2008, RFC 9110 HTTP Semantics, Sony TRC, Microsoft TCR & Nintendo Lotcheck standards.'
              : 'Zgodne ze standardami ISTQB Advanced, IEEE 829-2008, RFC 9110 HTTP Semantics, Sony TRC, Microsoft TCR i Nintendo Lotcheck.'}
          </div>
          <div>
            {lang === 'en' ? 'Crafted with precision by' : 'Stworzone z dbałością o detale przez'}{' '}
            <span className="font-semibold text-slate-200">Szymon Kochanowski</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
