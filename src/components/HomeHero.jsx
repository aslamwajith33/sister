import React from 'react';
import {
  Sparkles,
  Heart,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  ArrowRight,
  Flame,
  Star,
  BookOpen
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function HomeHero({
  config,
  onOpenEditSister,
  nextExam,
  countdown,
  tasks,
  chaptersCompletedCount,
  totalChaptersCount,
  streak
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 text-pink-800 text-xs font-bold transition-all shadow-2xs"
          >
            <Edit2 className="w-3 h-3 text-pink-600" />
            <span>Edit Name ({config.sisterName})</span>
          </button>
        </div>

        {/* Main Handmade Card with Love */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-100/50 relative overflow-hidden">
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
                  "Believe in yourself, Afra! Every chapter you conquer brings you one step closer to your dream score. You've got this!" ✨
                </span>
              </div>
            </div>

            {/* FIRST EXAM COUNTDOWN HERO: MATHEMATICS */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-300/50 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    📐 1st Board Exam
                  </span>
                  <span className="text-xs font-semibold text-pink-100">
                    Maths (Code: 041/241)
                  </span>
                </div>
                <div className="text-xs text-pink-100 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Wed, Feb 17, 2027 • 10:30 AM</span>
                </div>
              </div>

              {/* 4 Big Rounded Countdown Boxes */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 my-2">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center border border-white/25 shadow-inner">
                  <span className="block text-2xl sm:text-4xl font-black font-cute text-white">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-pink-100 uppercase font-bold tracking-wider">
                    Days
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center border border-white/25 shadow-inner">
                  <span className="block text-2xl sm:text-4xl font-black font-cute text-white">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-pink-100 uppercase font-bold tracking-wider">
                    Hours
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center border border-white/25 shadow-inner">
                  <span className="block text-2xl sm:text-4xl font-black font-cute text-white">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-pink-100 uppercase font-bold tracking-wider">
                    Mins
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center border border-white/25 shadow-inner">
                  <span className="block text-2xl sm:text-4xl font-black font-cute text-amber-200 animate-pulse">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-pink-100 uppercase font-bold tracking-wider">
                    Secs
                  </span>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-pink-100 font-medium text-center mt-2">
                ✨ Mathematics is your first paper! Review key formulas and solve step-by-step.
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
                <span>Exam Timetable (Order-wise)</span>
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

        {/* Clean, Simple Progress Bar (No Clumsy Clutter) */}
        <div className="bg-white/80 rounded-2xl p-4 border border-pink-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm shrink-0">
              📚
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Syllabus Mastered: {chaptersCompletedCount} of {totalChaptersCount} Chapters
              </span>
              <span className="text-[11px] text-pink-600 font-medium">
                {Math.round((chaptersCompletedCount / (totalChaptersCount || 1)) * 100)}% of Class 10 Syllabus Revised
              </span>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-pink-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((chaptersCompletedCount / (totalChaptersCount || 1)) * 100)}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
