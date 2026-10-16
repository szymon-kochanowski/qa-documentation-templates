/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Download, 
  Trash2, 
  Edit3, 
  Search, 
  RotateCcw, 
  FileSpreadsheet, 
  FileCode, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  ShieldAlert,
  Layers
} from 'lucide-react';
import { INITIAL_TEST_CASES } from '../data/initialTestCases';
import { TestCaseItem, Language } from '../types';
import { formatTestCasesToCSV, downloadFile } from '../utils/formatters';

interface TestCaseGeneratorProps {
  lang: Language;
}

export const TestCaseGenerator: React.FC<TestCaseGeneratorProps> = ({ lang }) => {
  const [testCases, setTestCases] = useState<TestCaseItem[]>(INITIAL_TEST_CASES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCase, setEditingCase] = useState<TestCaseItem | null>(null);
  const [formData, setFormData] = useState<TestCaseItem>({
    id: `TC-${String(INITIAL_TEST_CASES.length + 1).padStart(3, '0')}`,
    title: '',
    section: 'Game FQA / Gameplay',
    priority: 'High',
    type: 'Functional',
    preconditions: '',
    steps: '1. \n2. \n3. ',
    expectedResult: '',
    platform: 'PlayStation 5 / PC'
  });

  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  const filteredCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchesPriority = priorityFilter === 'all' || tc.priority === priorityFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesPriority;

      const titleMatch = tc.title.toLowerCase().includes(q);
      const sectionMatch = tc.section.toLowerCase().includes(q);
      const idMatch = tc.id.toLowerCase().includes(q);
      const platformMatch = tc.platform.toLowerCase().includes(q);

      return matchesPriority && (titleMatch || sectionMatch || idMatch || platformMatch);
    });
  }, [testCases, searchQuery, priorityFilter]);

  // Metrics
  const metrics = useMemo(() => {
    return {
      total: testCases.length,
      critical: testCases.filter((c) => c.priority === 'Critical').length,
      high: testCases.filter((c) => c.priority === 'High').length,
      medium: testCases.filter((c) => c.priority === 'Medium').length,
      low: testCases.filter((c) => c.priority === 'Low').length
    };
  }, [testCases]);

  const handleOpenAddModal = () => {
    const nextNum = testCases.length + 1;
    setEditingCase(null);
    setFormData({
      id: `TC-${String(nextNum).padStart(3, '0')}`,
      title: '',
      section: 'Game FQA / Combat Loop',
      priority: 'High',
      type: 'Functional',
      preconditions: '',
      steps: '1. Boot build and enter test scenario.\n2. Execute action.\n3. Verify response.',
      expectedResult: '',
      platform: 'Multiplatform'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tc: TestCaseItem) => {
    setEditingCase(tc);
    setFormData({ ...tc });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingCase) {
      setTestCases((prev) => prev.map((item) => (item.id === editingCase.id ? { ...formData } : item)));
    } else {
      setTestCases((prev) => [...prev, { ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const handleResetToDefault = () => {
    setTestCases(INITIAL_TEST_CASES);
  };

  const handleExportCsv = () => {
    const csv = formatTestCasesToCSV(testCases);
    downloadFile(csv, `testmo-test-cases_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8');
  };

  const handleCopyCsv = async () => {
    const csv = formatTestCasesToCSV(testCases);
    await navigator.clipboard.writeText(csv);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(testCases, null, 2);
    downloadFile(jsonStr, `test-cases_${new Date().toISOString().slice(0, 10)}.json`, 'application/json');
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header and Summary stats */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-[#110f1e] border border-purple-900/30 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-[11px] font-semibold text-purple-300 border border-purple-800/40 mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'TestMo / TestRail / Xray Dataset' : 'Zbiór TestMo / TestRail / Xray'}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {lang === 'en' ? 'Test Case & CSV Export Studio' : 'Generator Przypadków Testowych & Eksport CSV'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Manage test cases interactively and export valid CSV with UTF-8 BOM ready for direct import.'
              : 'Zarządzaj przypadkami testowymi i eksportuj plik CSV ze znacznikiem BOM do bezpośredniego importu.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'en' ? 'Add Test Case' : 'Dodaj Przypadek'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Download CSV file' : 'Pobierz CSV'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Export CSV' : 'Eksportuj CSV'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Download JSON dataset' : 'Pobierz JSON'}
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Reset to default 15 cases' : 'Przywróć domyślne 15 przypadków'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#110f1e] border border-purple-900/30 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400">{lang === 'en' ? 'Total Cases' : 'Wszystkie'}</div>
          <div className="text-xl font-bold text-white mt-1">{metrics.total}</div>
        </div>
        <div className="bg-[#110f1e] border border-rose-950/50 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-rose-400">Critical</div>
          <div className="text-xl font-bold text-rose-300 mt-1">{metrics.critical}</div>
        </div>
        <div className="bg-[#110f1e] border border-amber-950/50 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-amber-400">High</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{metrics.high}</div>
        </div>
        <div className="bg-[#110f1e] border border-blue-950/50 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-blue-400">Medium</div>
          <div className="text-xl font-bold text-blue-300 mt-1">{metrics.medium}</div>
        </div>
        <div className="bg-[#110f1e] border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] font-medium text-slate-400">Low</div>
          <div className="text-xl font-bold text-slate-300 mt-1">{metrics.low}</div>
        </div>
      </div>

      {/* Search and Priority Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Filter by title, section, ID or platform...' : 'Filtruj po tytule, sekcji, ID lub platformie...'}
            className="w-full bg-[#110f1e] text-xs text-slate-200 pl-9 pr-4 py-2 rounded-xl border border-purple-900/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">{lang === 'en' ? 'Priority:' : 'Priorytet:'}</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#110f1e] text-xs text-slate-200 px-3 py-2 rounded-xl border border-purple-900/30 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">{lang === 'en' ? 'All Priorities' : 'Wszystkie'}</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={handleCopyCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title={lang === 'en' ? 'Copy CSV to clipboard' : 'Kopiuj CSV do schowka'}
          >
            {copiedCsv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
            <span className="hidden sm:inline">{copiedCsv ? 'Copied' : 'Copy CSV'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="bg-[#110f1e] border border-purple-900/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-purple-950/60 bg-[#151226]/80 text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Title &amp; Scenario</th>
                <th className="py-3 px-4 w-44">Section</th>
                <th className="py-3 px-4 w-28">Priority</th>
                <th className="py-3 px-4 w-28">Type</th>
                <th className="py-3 px-4 w-40">Platform</th>
                <th className="py-3 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/40 text-slate-300">
              {filteredCases.map((tc) => {
                const isExpanded = expandedId === tc.id;
                const priorityBadge =
                  tc.priority === 'Critical'
                    ? 'bg-rose-950/80 text-rose-300 border-rose-800/50'
                    : tc.priority === 'High'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800/50'
                    : tc.priority === 'Medium'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-800/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700';

                return (
                  <React.Fragment key={tc.id}>
                    <tr
                      className={`hover:bg-purple-950/20 transition-colors ${
                        isExpanded ? 'bg-purple-950/30' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-purple-400">
                        {tc.id}
                      </td>
                      <td className="py-3 px-4">
                        <div
                          onClick={() => toggleExpand(tc.id)}
                          className="font-medium text-slate-100 hover:text-purple-300 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{tc.title}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {tc.section}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityBadge}`}>
                          {tc.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {tc.type}
                      </td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-[160px]">
                        {tc.platform}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(tc)}
                            className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title={lang === 'en' ? 'Edit case' : 'Edytuj przypadek'}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCase(tc.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title={lang === 'en' ? 'Delete case' : 'Usuń przypadek'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded details row */}
                    {isExpanded && (
                      <tr className="bg-[#0b0914] border-b border-purple-950/60">
                        <td colSpan={7} className="p-4 sm:p-5">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-[#110f1e] p-3.5 rounded-xl border border-purple-950/60">
                              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                                Preconditions
                              </span>
                              <p className="text-slate-300 leading-relaxed font-mono">
                                {tc.preconditions || 'None specified.'}
                              </p>
                            </div>

                            <div className="bg-[#110f1e] p-3.5 rounded-xl border border-purple-950/60">
                              <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                                Execution Steps
                              </span>
                              <pre className="whitespace-pre-wrap font-mono text-purple-200 leading-relaxed">
                                {tc.steps}
                              </pre>
                            </div>

                            <div className="bg-[#110f1e] p-3.5 rounded-xl border border-purple-950/60">
                              <span className="font-semibold text-emerald-400 uppercase text-[10px] tracking-wider block mb-1">
                                Expected Result
                              </span>
                              <p className="text-emerald-300 leading-relaxed font-mono">
                                {tc.expectedResult}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#110f1e] border border-purple-900/50 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-950 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight">
                {editingCase
                  ? (lang === 'en' ? `Edit Test Case (${formData.id})` : `Edytuj Przypadek (${formData.id})`)
                  : (lang === 'en' ? 'Add New Test Case' : 'Nowy Przypadek Testowy')}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-[#0d0b18] text-purple-300 px-3 py-1.5 rounded-lg border border-purple-950 font-mono font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Section</label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950"
                  >
                    <option value="Functional">Functional</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Compatibility">Compatibility</option>
                    <option value="Visual">Visual</option>
                    <option value="Security">Security</option>
                    <option value="Performance">Performance</option>
                    <option value="Reliability">Reliability</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Platform</label>
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preconditions</label>
                <input
                  type="text"
                  value={formData.preconditions}
                  onChange={(e) => setFormData({ ...formData, preconditions: e.target.value })}
                  className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Steps</label>
                <textarea
                  rows={3}
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-1">Expected Result</label>
                <textarea
                  rows={2}
                  required
                  value={formData.expectedResult}
                  onChange={(e) => setFormData({ ...formData, expectedResult: e.target.value })}
                  className="w-full bg-[#0d0b18] text-slate-200 px-3 py-1.5 rounded-lg border border-purple-950 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-950">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Cancel' : 'Anuluj'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white font-semibold bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-900/50 transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Save Test Case' : 'Zapisz Przypadek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
