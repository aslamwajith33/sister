import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  Check,
  Star,
  Award,
  Flame,
  Download,
  Smartphone
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function HomeHero({
  config,
  onOpenEditSister,
  onOpenInstall,
  isInstalled = false,
  nextExam,
  countdown,
  tasks
}) {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const hour = today.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Target task calculations
  const todayTargets = tasks.filter((t) => t.isTarget);
  const completedTargets = todayTargets.filter((t) => t.completed).length;

  // Track crossed-off days ("after everyday crash/cross everything")
  const todayKey = today.toISOString().split('T')[0];
  const [crossedDays, setCrossedDays] = useState(() =>
    loadFromStorage('hsj_crossed_days_v2', {
      [todayKey]: false,
      count: 1
    })
  );

  useEffect(() => {
    saveToStorage('hsj_crossed_days_v2', crossedDays);
  }, [crossedDays]);

  const isTodayCrossed = Boolean(crossedDays[todayKey]);

  const handleToggleTodayCross = () => {
    if (!isTodayCrossed) {
      sound.playSuccessChime();
      triggerPinkConfetti();
      setCrossedDays((prev) => ({
        ...prev,
        [todayKey]: true,
        count: (prev.count || 0) + 1
      }));
    } else {
      sound.playPop();
      setCrossedDays((prev) => ({
        ...prev,
        [todayKey]: false,
        count: Math.max(0, (prev.count || 1) - 1)
      }));
    }
  };

  // Generate a 7-day rolling window for the calendar page cross-off view
  const recentDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    const key = d.toISOString().split('T')[0];
    const isPast = key < todayKey;
    const isCurrent = key === todayKey;
    const isCrossed = isPast || (isCurrent && isTodayCrossed);
    return {
      date: d,
      key,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      isCurrent,
      isCrossed
    };
  });

  return (
    <section id="home" className="pt-20 sm:pt-24 pb-8 sm:pb-12 relative overflow-hidden px-3 sm:px-6">
      {/* Soft Ambient Pastel Glows */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 sm:w-[550px] h-60 bg-gradient-to-tr from-pink-200/50 via-rose-100/40 to-pink-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-5">
        {/* Top Greeting & Date Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-pink-200/80 text-pink-700 text-xs font-semibold shadow-2xs">
            <span className="text-sm">🌸</span>
            <span>{dateFormatted}</span>
            <span className="text-pink-300">•</span>
            <span>{greeting}, {config.sisterName}!</span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onOpenEditSister();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 text-pink-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Edit2 className="w-3 h-3 text-pink-600" />
            <span>Edit Name ({config.sisterName})</span>
          </button>
        </div>

        {/* Main Handmade Card with Love */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-100/50 relative overflow-hidden">
          {/* Cute Sticker in corner */}
          <div className="absolute top-3 right-4 sm:top-5 sm:right-6 flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-700 shadow-2xs">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>Goal: {config.boardTarget || '95%+'}</span>
          </div>

          <div className="space-y-4">
            {/* Header Titles */}
            <div className="space-y-1.5 pr-20 sm:pr-0">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-cute text-slate-800 tracking-tight leading-tight">
                Hey, <span className="text-pink-600 underline decoration-pink-300 decoration-wavy decoration-2">{config.sisterName || 'Afra Shahnaas'}!</span> ✨
              </h1>
              <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed">
                Welcome to your success journey. Every small step takes you closer to your dreams!
              </p>
            </div>

            {/* Daily Affirmation Note */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50/70 to-pink-50 border border-pink-200/80 flex items-start gap-3">
              <span className="text-xl sm:text-2xl shrink-0 mt-0.5">🌸</span>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-pink-700">Daily Affirmation: </span>
                <span className="italic font-medium">
                  "Believe in yourself, Afra! Every day you study brings you one step closer to your dream score. You've got this!" ✨
                </span>
              </div>
            </div>

            {/* PWA One-Click Install Banner */}
            {!isInstalled && (
              <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl sm:text-3xl shrink-0 animate-bounce">📲</span>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5 flex-wrap">
                      <span>Download as an App on Your Phone!</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-black uppercase">
                        App
                      </span>
                    </div>
                    <div className="text-[11px] text-pink-100 truncate">
                      Tap once to install directly to home screen for fast fullscreen access!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    onOpenInstall();
                  }}
                  className="py-2 px-3.5 sm:px-4 rounded-xl bg-white hover:bg-pink-50 text-pink-700 font-black text-xs shadow-sm transition-all active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-pink-600" />
                  <span>Install App ✨</span>
                </button>
              </div>
            )}

            {/* FIRST EXAM COUNTDOWN HERO: CALENDAR PAGE WITH SMALL RUNNING TIMER ABOVE */}
            <div className="rounded-3xl border-2 border-pink-300/80 bg-gradient-to-b from-rose-50/60 to-white shadow-lg shadow-pink-100/50 p-4 sm:p-6 space-y-4">

              {/* 1. Timer Running in Above in Small */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-pink-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-600" />
                    Maths Live Timer:
                  </span>
                </div>

                {/* Running in Small */}
                <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-black text-slate-800">
                  <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800">
                    {String(countdown.days).padStart(2, '0')} Days
                  </span>
                  <span className="text-pink-300 font-bold">:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800">
                    {String(countdown.hours).padStart(2, '0')}h
                  </span>
                  <span className="text-pink-300 font-bold">:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800">
                    {String(countdown.minutes).padStart(2, '0')}m
                  </span>
                  <span className="text-pink-300 font-bold">:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-rose-500 text-white animate-pulse">
                    {String(countdown.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* 2. Calendar Type Page */}
              <div className="bg-white rounded-2xl border-2 border-rose-300 shadow-md overflow-hidden max-w-lg mx-auto">
                {/* Spiral binder rings at top */}
                <div className="bg-slate-100 py-1.5 px-4 flex justify-around border-b border-slate-200">
                  {[1, 2, 3, 4, 5, 6].map((ring) => (
                    <div key={ring} className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-inner" />
                      <div className="w-1 h-2 bg-slate-400 rounded-full -mt-0.5" />
                    </div>
                  ))}
                </div>

                {/* Crimson Calendar Header Bar */}
                <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 text-white py-2.5 px-4 flex items-center justify-between text-xs sm:text-sm font-bold tracking-wider">
                  <span className="flex items-center gap-1">🌸 CBSE 10th</span>
                  <span className="font-extrabold uppercase">FEBRUARY 2027</span>
                  <span className="text-amber-200 font-extrabold">WEDNESDAY</span>
                </div>

                {/* Calendar Body Page */}
                <div className="p-5 sm:p-6 text-center space-y-3 bg-gradient-to-b from-white via-rose-50/20 to-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
                    First Board Examination
                  </div>

                  {/* Big Calendar Date Number */}
                  <div className="relative inline-block">
                    <span className="text-6xl sm:text-7xl font-black font-cute text-slate-800 tracking-tight block">
                      17
                    </span>
                    <span className="text-xs font-bold text-slate-500 block uppercase tracking-widest -mt-1">
                      February 2027
                    </span>
                  </div>

                  {/* Subject Title */}
                  <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-200/80 max-w-sm mx-auto">
                    <div className="text-sm font-extrabold text-pink-700 flex items-center justify-center gap-1.5">
                      <span>📐</span>
                      <span>Mathematics (Standard / Basic)</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                      Subject Code: 041 / 241 • 10:30 AM – 01:30 PM (3 Hours)
                    </div>
                  </div>

                  {/* 3. Daily Cross-Off / Crash Tracker ("after everyday crash everything") */}
                  <div className="pt-3 border-t border-pink-100 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        <span>Daily Study Cross-Off Tracker:</span>
                      </span>
                      <span className="text-pink-600">
                        {crossedDays.count || 1} Days Conquered ❌
                      </span>
                    </div>

                    {/* Rolling Week Days (Past days crossed out / crashed) */}
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {recentDays.map((d) => (
                        <div
                          key={d.key}
                          className={`p-1.5 rounded-xl border transition-all text-xs ${
                            d.isCurrent
                              ? 'bg-pink-100 border-pink-400 font-bold ring-2 ring-pink-300'
                              : d.isCrossed
                              ? 'bg-rose-50/60 border-rose-200 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">
                            {d.dayName}
                          </div>
                          <div
                            className={`text-sm font-black relative inline-block ${
                              d.isCrossed
                                ? 'line-through decoration-rose-500 decoration-2 text-rose-400'
                                : 'text-slate-700'
                            }`}
                          >
                            {d.dayNum}
                          </div>
                          <div className="text-[9px] mt-0.5">
                            {d.isCrossed ? (
                              <span className="text-rose-500 font-bold">❌</span>
                            ) : d.isCurrent ? (
                              <span className="text-pink-600 font-bold">Today</span>
                            ) : (
                              <span>⏳</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive "Cross Off Today" Action Button */}
                    <div className="pt-1">
                      <button
                        onClick={handleToggleTodayCross}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                          isTodayCrossed
                            ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-300'
                            : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md shadow-pink-200'
                        }`}
                      >
                        {isTodayCrossed ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>Today's Study Conquered & Crossed Off! ❌ (Tap to undo)</span>
                          </>
                        ) : (
                          <>
                            <span>✏️</span>
                            <span>Cross Off Today's Study Day ({dateFormatted})</span>
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Every day crossed off brings you one day closer to board exam glory! 🌸
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Quick Action Thumb-Friendly Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <a
                href="#planner"
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Today's Study Checklist ({completedTargets}/{todayTargets.length})</span>
              </a>

              <a
                href="#timetable"
                className="py-3 px-4 rounded-2xl bg-white hover:bg-pink-50 text-slate-700 font-bold text-xs sm:text-sm border border-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xs"
              >
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>100-Day Plan & Timetable</span>
              </a>

              <a
                href="#wellness"
                className="py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Focus Timer & Wellness ⏱️</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
