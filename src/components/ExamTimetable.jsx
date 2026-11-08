import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Calculator,
  FlaskConical,
  Globe,
  BookOpen,
  Feather,
  Laptop,
  Trophy,
  Check,
  ChevronDown,
  ChevronUp,
  Printer,
  Edit3
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ExamTimetable({ exams, onOpenEdit }) {
  // Current time state for small live timers
  const [now, setNow] = useState(Date.now());
  const [showOfficialDates, setShowOfficialDates] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 100-Day Study Plan Definition
  // 25 days Maths, 25 days Science, 10 days each for remaining 4 subjects (SST, English, Tamil, IT), last 10 days Revision = 100 Days!
  const studyPlanPhases = [
    {
      id: 'p1-maths',
      subject: 'Mathematics (Standard / Basic)',
      code: '041 / 241',
      allocatedDays: 25,
      dayRange: 'Days 1 – 25',
      endDate: '2026-12-03T23:59:59',
      color: 'from-blue-500 to-indigo-600',
      softBg: 'bg-blue-50/70 border-blue-200',
      icon: Calculator,
      emoji: '📐',
      priority: 'First Exam Priority',
      topics: 'Quadratic Equations, AP, Trigonometry, Triangles, Coordinate Geometry, Surface Areas & Volumes, Circles, Statistics.'
    },
    {
      id: 'p2-science',
      subject: 'Science',
      code: '086',
      allocatedDays: 25,
      dayRange: 'Days 26 – 50',
      endDate: '2026-12-28T23:59:59',
      color: 'from-emerald-500 to-teal-600',
      softBg: 'bg-emerald-50/70 border-emerald-200',
      icon: FlaskConical,
      emoji: '🔬',
      priority: 'Core Concept Mastery',
      topics: 'Physics Ray Diagrams & Formulas, Chemistry Reaction Balancing & Carbon, Biology Life Processes & Heredity.'
    },
    {
      id: 'p3-sst',
      subject: 'Social Science',
      code: '087',
      allocatedDays: 10,
      dayRange: 'Days 51 – 60',
      endDate: '2027-01-07T23:59:59',
      color: 'from-amber-500 to-orange-600',
      softBg: 'bg-amber-50/70 border-amber-200',
      icon: Globe,
      emoji: '🌍',
      priority: 'High-Yield Sprint',
      topics: 'Nationalism in India timeline, Geography maps, Civics power sharing, Economics key terms.'
    },
    {
      id: 'p4-english',
      subject: 'English (Language & Literature)',
      code: '184',
      allocatedDays: 10,
      dayRange: 'Days 61 – 70',
      endDate: '2027-01-17T23:59:59',
      color: 'from-purple-500 to-indigo-600',
      softBg: 'bg-purple-50/70 border-purple-200',
      icon: Feather,
      emoji: '📖',
      priority: 'Writing & Comprehension Sprint',
      topics: 'Analytical Paragraph formats, Formal Letters, First Flight character sketches, Footprints without Feet.'
    },
    {
      id: 'p5-tamil',
      subject: 'Tamil (Language & Literature)',
      code: '006',
      allocatedDays: 10,
      dayRange: 'Days 71 – 80',
      endDate: '2027-01-27T23:59:59',
      color: 'from-pink-500 to-rose-600',
      softBg: 'bg-pink-50/70 border-pink-200',
      icon: BookOpen,
      emoji: '🌸',
      priority: 'Language Mastery Sprint',
      topics: 'செய்யுள் மனப்பாடப் பாடல் பயிற்சி, தொகைநிலை & தொகாநிலை இலக்கணம், கடிதம் மற்றும் கட்டுரை வரைவு.'
    },
    {
      id: 'p6-it',
      subject: 'Information Technology',
      code: '402',
      allocatedDays: 10,
      dayRange: 'Days 81 – 90',
      endDate: '2027-02-06T23:59:59',
      color: 'from-rose-500 to-pink-600',
      softBg: 'bg-rose-50/70 border-rose-200',
      icon: Laptop,
      emoji: '💻',
      priority: 'Skills & Queries Sprint',
      topics: 'Digital Documentation (Writer), Electronic Spreadsheet (Calc) Scenarios, DBMS SQL queries, Cyber Safety.'
    },
    {
      id: 'p7-revision',
      subject: 'Grand Final Revision & Mock Papers',
      code: 'All Subjects',
      allocatedDays: 10,
      dayRange: 'Days 91 – 100',
      endDate: '2027-02-16T23:59:59',
      color: 'from-amber-500 via-rose-500 to-pink-600',
      softBg: 'bg-amber-50/80 border-amber-300',
      icon: Trophy,
      emoji: '🏆',
      priority: 'Final Board Readiness',
      topics: '3-Hour timed mock papers (10:30 AM – 1:30 PM), full formula revision, exam hall composure building!'
    }
  ];

  // Helper to compute small live countdown for each phase
  const getSmallTimer = (targetDateStr) => {
    const target = new Date(targetDateStr).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, completed: false };
  };

  // Hall ticket bag checklist state
  const [hallChecklist, setHallChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('hsj_hall_checklist');
      return saved
        ? JSON.parse(saved)
        : [
            { id: 'item-1', label: 'CBSE Official Admit Card (Signed by School Principal & Parent)', checked: true },
            { id: 'item-2', label: 'School Identity Card (ID Card)', checked: true },
            { id: 'item-3', label: 'Transparent Stationery Pouch (No opaque pouches allowed)', checked: true },
            { id: 'item-4', label: '2 Blue / Royal Blue Ballpoint Pens (Tested & smooth)', checked: true },
            { id: 'item-5', label: 'Pencils (HB), Sharpener, Eraser & Transparent Ruler (for diagrams & margins)', checked: false },
            { id: 'item-6', label: 'Analog Wristwatch (Smartwatches are strictly prohibited in the exam hall)', checked: false },
            { id: 'item-7', label: 'Clear Transparent Water Bottle (No labels)', checked: true },
            { id: 'item-8', label: 'School Uniform & Comfortable Shoes (CBSE exam hall protocol)', checked: true }
          ];
    } catch {
      return [];
    }
  });

  const toggleChecklistItem = (id) => {
    const updated = hallChecklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setHallChecklist(updated);
    try {
      localStorage.setItem('hsj_hall_checklist', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    sound.playSuccessChime();
  };

  return (
    <section id="timetable" className="py-10 sm:py-14 relative px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-pink-500" /> 100-Day Master Study Plan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cute text-slate-800">
            Afra's 100-Day Roadmap to 95%+ 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            <span className="font-bold text-pink-700">25 Days</span> for Maths •{' '}
            <span className="font-bold text-emerald-700">25 Days</span> for Science •{' '}
            <span className="font-bold text-slate-700">10 Days each</span> for SST, English, Tamil & IT •{' '}
            <span className="font-bold text-amber-700">Last 10 Days</span> for Final Grand Revision!
          </p>
        </div>

        {/* 100-Day Visual Schedule Bar (Handmade feel) */}
        <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span>🎯 Total Timeline:</span>
              <span className="text-pink-600 font-extrabold">100 Days To First Board Exam</span>
            </span>
            <span className="text-slate-500">25d + 25d + 10d + 10d + 10d + 10d + 10d</span>
          </div>

          {/* Segmented Timeline Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 p-0.5 gap-0.5">
            <div style={{ width: '25%' }} className="bg-blue-500 rounded-l-full" title="Maths: 25 Days" />
            <div style={{ width: '25%' }} className="bg-emerald-500" title="Science: 25 Days" />
            <div style={{ width: '10%' }} className="bg-amber-500" title="Social Science: 10 Days" />
            <div style={{ width: '10%' }} className="bg-purple-500" title="English: 10 Days" />
            <div style={{ width: '10%' }} className="bg-pink-500" title="Tamil: 10 Days" />
            <div style={{ width: '10%' }} className="bg-rose-500" title="IT: 10 Days" />
            <div style={{ width: '10%' }} className="bg-gradient-to-r from-amber-400 to-rose-500 rounded-r-full" title="Final Revision: 10 Days" />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 font-semibold gap-1">
            <span className="text-blue-600">📐 Maths (25d)</span>
            <span className="text-emerald-600">🔬 Science (25d)</span>
            <span className="text-amber-600">🌍 SST (10d)</span>
            <span className="text-purple-600">📖 English (10d)</span>
            <span className="text-pink-600">🌸 Tamil (10d)</span>
            <span className="text-rose-600">💻 IT (10d)</span>
            <span className="text-amber-700">🏆 Revision (10d)</span>
          </div>
        </div>

        {/* 100-DAY STUDY PLAN CARDS WITH SMALL TIMERS */}
        <div className="space-y-4">
          {studyPlanPhases.map((phase, idx) => {
            const Icon = phase.icon;
            const timer = getSmallTimer(phase.endDate);

            return (
              <div
                key={phase.id}
                className={`bg-white/95 rounded-3xl p-4 sm:p-5 border-2 transition-all duration-200 hover:shadow-md ${
                  idx === 0
                    ? 'border-blue-300 ring-2 ring-blue-100'
                    : 'border-pink-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Phase Title & Allocated Days */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-200/80 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                      {phase.emoji}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800">
                          {phase.dayRange}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-blue-100 text-blue-800">
                          {phase.allocatedDays} Days Block
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Code: {phase.code}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-cute text-slate-800 mt-0.5">
                        {phase.subject}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        <span className="font-semibold text-pink-700">Target: </span>
                        {phase.topics}
                      </p>
                    </div>
                  </div>

                  {/* Right: Small Real-Time Timer for this Phase */}
                  <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl p-2.5 px-3.5 flex items-center justify-between sm:justify-center gap-3 shrink-0 self-stretch sm:self-center">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Phase Timer ⏳
                      </span>
                      <span className="text-[11px] font-semibold text-pink-700">
                        {timer.completed ? 'Finished' : 'Target Window'}
                      </span>
                    </div>

                    {/* Timer Digits */}
                    <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-black text-slate-800 bg-white px-2.5 py-1 rounded-xl border border-pink-200 shadow-2xs">
                      <span className="text-pink-600">{String(timer.days).padStart(2, '0')}d</span>
                      <span className="text-slate-300">:</span>
                      <span>{String(timer.hours).padStart(2, '0')}h</span>
                      <span className="text-slate-300">:</span>
                      <span>{String(timer.minutes).padStart(2, '0')}m</span>
                      <span className="text-slate-300">:</span>
                      <span className="text-rose-500 font-bold">{String(timer.seconds).padStart(2, '0')}s</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EXPANDABLE SECTION: Official CBSE Exam Day Dates & Hall Bag Checklist */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                setShowOfficialDates(!showOfficialDates);
                sound.playPop();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white border border-pink-200 hover:bg-pink-50 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>{showOfficialDates ? 'Hide' : 'View'} Official CBSE Exam Day Timetable</span>
              {showOfficialDates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                setShowChecklist(!showChecklist);
                sound.playPop();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white border border-pink-200 hover:bg-pink-50 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <span>🎒 Exam Hall Bag Checklist</span>
              <span className="text-[11px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-extrabold">
                {hallChecklist.filter((i) => i.checked).length}/{hallChecklist.length}
              </span>
            </button>
          </div>

          {/* Official Exam Dates Collapsible Card */}
          {showOfficialDates && (
            <div className="bg-white/95 rounded-3xl p-5 border-2 border-pink-200 shadow-sm space-y-3 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-pink-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Official CBSE Class 10 Hall Ticket Dates (10:30 AM – 01:30 PM):
                </span>
                <button
                  onClick={onOpenEdit}
                  className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit Dates
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {exams.map((ex) => (
                  <div key={ex.id} className="p-2.5 rounded-xl bg-pink-50/50 border border-pink-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{ex.subject.split('(')[0]}</span>
                      <span className="text-[11px] text-slate-400 block">{ex.code} • {ex.day}</span>
                    </div>
                    <span className="font-bold text-pink-700 bg-white px-2 py-1 rounded-lg border border-pink-200">
                      {ex.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hall Bag Checklist Collapsible Card */}
          {showChecklist && (
            <div className="bg-white/95 rounded-3xl p-5 border-2 border-pink-200 shadow-sm space-y-3 animate-fade-in">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Pack Your Exam Bag The Night Before:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {hallChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 cursor-pointer transition-all ${
                      item.checked
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                        : 'bg-white border-pink-100 hover:border-pink-300 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        item.checked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={item.checked ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
