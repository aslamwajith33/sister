import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Award,
  Sparkles,
  Calculator,
  FlaskConical,
  Globe,
  Feather,
  Laptop,
  Clock,
  Target,
  FileCheck,
  ChevronDown,
  Check
} from 'lucide-react';
import {
  SUBJECT_REVISION_GUIDES,
  GENERAL_EXAM_STRATEGIES
} from '../data/initialData';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function PrepCorner({
  chapterProgress,
  onToggleChapter,
  sisterName = 'Afra Shahnaas'
}) {
  const [activeSubject, setActiveSubject] = useState('Mathematics');
  const [activeSubTab, setActiveSubTab] = useState('checklist'); // 'checklist' | 'formulas' | 'strategies'

  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: 'text-blue-500' },
    { name: 'Science', icon: FlaskConical, color: 'text-emerald-500' },
    { name: 'Social Science', icon: Globe, color: 'text-amber-500' },
    { name: 'Tamil', icon: BookOpen, color: 'text-pink-500' },
    { name: 'English', icon: Feather, color: 'text-purple-500' },
    { name: 'Information Technology', icon: Laptop, color: 'text-rose-500' }
  ];

  const currentGuide = SUBJECT_REVISION_GUIDES[activeSubject] || SUBJECT_REVISION_GUIDES['Mathematics'];
  const chaptersForSubject = chapterProgress[activeSubject] || [];

  const completedCount = chaptersForSubject.filter((c) => c.completed).length;
  const totalCount = chaptersForSubject.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (chapId) => {
    onToggleChapter(activeSubject, chapId);
    const item = chaptersForSubject.find((c) => c.id === chapId);
    if (item && !item.completed) {
      sound.playSuccessChime();
    } else {
      sound.playPop();
    }
  };

  return (
    <section id="prep" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" /> CBSE Class 10 Prep Corner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            Subject-Wise Revision Toolkit 🌸
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Formulas, chapter checklists, step-marking tips, and Tamil Class 10 revision notes curated for your board exam excellence.
          </p>
        </div>

        {/* Subject Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {subjects.map((sub) => {
            const Icon = sub.icon;
            const isSelected = activeSubject === sub.name;
            return (
              <button
                key={sub.name}
                onClick={() => {
                  setActiveSubject(sub.name);
                  sound.playPop();
                }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-2xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                    : 'bg-white text-slate-600 hover:bg-pink-50 border border-pink-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : sub.color}`} />
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Subject Main Hub Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl shadow-pink-100/40 space-y-6">
          {/* Header of Subject */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold font-cute text-slate-800">
                  {activeSubject}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200">
                  {currentGuide.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {currentGuide.tagline}
              </p>
            </div>

            {/* Subject Mastery Progress Indicator */}
            <div className="bg-pink-50/70 border border-pink-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div>
                <div className="text-xs font-bold text-slate-600">
                  Syllabus Mastered: {completedCount}/{totalCount} Chapters
                </div>
                <div className="w-32 bg-pink-200/60 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>
              <span className="text-lg font-black font-cute text-pink-700">
                {percentComplete}%
              </span>
            </div>
          </div>

          {/* Sub-tab Navigation within subject */}
          <div className="flex border-b border-pink-100 gap-3">
            <button
              onClick={() => setActiveSubTab('checklist')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeSubTab === 'checklist'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileCheck className="w-4 h-4" /> Interactive Chapter Checklist
            </button>
            <button
              onClick={() => setActiveSubTab('formulas')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeSubTab === 'formulas'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4" /> Key Formulas & Core Concepts
            </button>
            <button
              onClick={() => setActiveSubTab('strategies')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeSubTab === 'strategies'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Step-Marking & Answer Tips
            </button>
          </div>

          {/* Sub-tab 1: Interactive Chapter Checklist */}
          {activeSubTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Check off chapters as you revise them to update your achievement score!</span>
                <span className="font-semibold text-pink-600">{totalCount - completedCount} chapters to go</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chaptersForSubject.map((chap) => (
                  <div
                    key={chap.id}
                    onClick={() => handleToggle(chap.id)}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 group select-none ${
                      chap.completed
                        ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
                        : 'bg-white border-pink-100 hover:border-pink-300 hover:bg-pink-50/30'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        chap.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 group-hover:border-pink-400 bg-white'
                      }`}
                    >
                      {chap.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-xs sm:text-sm font-bold transition-colors ${
                          chap.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                        }`}
                      >
                        {chap.name}
                      </h4>
                      {chap.important && (
                        <p className="text-[11px] text-pink-600 mt-0.5 font-medium line-clamp-1">
                          Key: {chap.important}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-tab 2: Key Formulas & Concepts */}
          {activeSubTab === 'formulas' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentGuide.keyFormulas.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-pink-50/30 border border-pink-100 space-y-2 hover:bg-pink-50/50 transition-colors"
                  >
                    <span className="text-xs font-bold text-pink-700 uppercase tracking-wider block">
                      {item.name}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white border border-pink-200/70 font-mono text-xs sm:text-sm text-slate-800 shadow-2xs overflow-x-auto">
                      <code>{item.formula}</code>
                    </div>
                    {item.note && (
                      <p className="text-xs text-slate-600 italic">
                        💡 {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-tab 3: Step-Marking & Answer Tips */}
          {activeSubTab === 'strategies' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {currentGuide.strategyTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-pink-200/80 text-pink-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* General CBSE Exam Day Strategies Grid */}
        <div className="mt-12 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold font-cute text-slate-800">
              CBSE Board Hall Master Strategies 🎯
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Proven presentation blueprints and time-management techniques for maximum scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GENERAL_EXAM_STRATEGIES.map((strat, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold font-cute text-slate-800 flex items-center gap-2">
                    {strat.title}
                  </h4>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600 font-medium">
                    {strat.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-pink-500 font-bold shrink-0">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-pink-600 font-semibold border-t border-pink-50">
                  Golden Secret: Stay calm and write step-by-step! ✨
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

