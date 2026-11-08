import React from 'react';
import {
  Sparkles,
  Heart,
  Calendar,
  CheckCircle,
  BookOpen,
  Flame,
  ArrowRight,
  Clock,
  Edit2,
  Compass,
  Star
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
  // Format today's date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Time of day greeting
  const hour = today.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Tasks statistics for today
  const todayTargets = tasks.filter((t) => t.isTarget);
  const completedTargets = todayTargets.filter((t) => t.completed).length;
  const targetCompletionPercent =
    todayTargets.length > 0
      ? Math.round((completedTargets / todayTargets.length) * 100)
      : 100;

  return (
    <section id="home" className="pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-purple-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-24 right-5 sm:right-20 text-pink-200/80 text-4xl sm:text-6xl animate-float-slow pointer-events-none select-none">
        🌸
      </div>
      <div className="absolute top-40 left-5 sm:left-14 text-pink-300/60 text-2xl sm:text-4xl animate-pulse-soft pointer-events-none select-none">
        ✨
      </div>
      <div className="absolute bottom-10 right-10 text-rose-200/70 text-3xl animate-float-slow pointer-events-none select-none">
        💖
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top greeting pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 border border-pink-200 text-pink-800 text-xs sm:text-sm font-semibold shadow-2xs">
            <span className="animate-spin text-sm">✨</span>
            <span>{dateFormatted}</span>
            <span className="text-pink-300">•</span>
            <span className="text-pink-700">{greeting}, {config.sisterName}! 🌷</span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onOpenEditSister();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-pink-50 border border-pink-200 text-slate-600 hover:text-pink-600 text-xs font-medium shadow-2xs transition-all"
          >
            <Edit2 className="w-3 h-3 text-pink-500" />
            <span>Customize Name ({config.sisterName})</span>
          </button>
        </div>

        {/* Hero Card Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border border-pink-100 shadow-xl shadow-pink-100/40 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-rose-700 text-xs font-bold border border-rose-200/60 uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
                  Target Goal: {config.boardTarget || '95%+'} in CBSE Class 10
                </div>

                {/* Main Heading requested by user */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-cute text-slate-800 tracking-tight leading-tight">
                  Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 underline decoration-pink-300 decoration-wavy decoration-2">Superstar!</span> ✨
                </h1>

                {/* Subtitle requested by user */}
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                  Welcome to your success journey. Every small step takes you closer to your dreams!
                </p>
              </div>

              {/* Sister Encouragement Quote Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50/50 to-pink-50 border border-pink-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink-200/80 text-pink-700 flex items-center justify-center shrink-0 text-base shadow-2xs">
                  🌸
                </div>
                <div className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-pink-800">Brother's Daily Note: </span>
                  <span className="italic">"You don't need to stress about the whole mountain. Just focus on today's little steps. I believe in you 100%!"</span>
                </div>
              </div>

              {/* Prominent Next Exam Countdown Card */}
              {nextExam ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-300/40 relative overflow-hidden group">
                  {/* Subtle sparkle overlay */}
                  <div className="absolute top-2 right-3 text-pink-200 text-xs font-semibold flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    <Clock className="w-3 h-3" /> Next Board Exam
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-pink-100">
                        Subject Code: {nextExam.code}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-cute mt-0.5">
                        {nextExam.subject}
                      </h4>
                      <p className="text-xs text-pink-100 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{nextExam.day}, {nextExam.date} • {nextExam.time}</span>
                      </p>
                    </div>

                    {/* Countdown Digits Pill */}
                    <div className="flex items-center gap-2 self-start sm:self-center bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
                      <div className="text-center">
                        <span className="block text-xl sm:text-2xl font-black font-cute">{countdown.days}</span>
                        <span className="text-[10px] text-pink-100 uppercase font-semibold">Days</span>
                      </div>
                      <span className="text-pink-200 font-bold">:</span>
                      <div className="text-center">
                        <span className="block text-xl sm:text-2xl font-black font-cute">{countdown.hours}</span>
                        <span className="text-[10px] text-pink-100 uppercase font-semibold">Hours</span>
                      </div>
                      <span className="text-pink-200 font-bold">:</span>
                      <div className="text-center">
                        <span className="block text-xl sm:text-2xl font-black font-cute">{countdown.minutes}</span>
                        <span className="text-[10px] text-pink-100 uppercase font-semibold">Mins</span>
                      </div>
                      <span className="text-pink-200 font-bold">:</span>
                      <div className="text-center">
                        <span className="block text-xl sm:text-2xl font-black font-cute">{countdown.seconds}</span>
                        <span className="text-[10px] text-pink-100 uppercase font-semibold">Secs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-pink-100/60 border border-pink-200 text-pink-800 text-sm font-semibold flex items-center gap-2">
                  <span>🎉</span> All examinations are successfully completed! Outstanding work, superstar!
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#planner"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>Plan Today's Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#timetable"
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-700 font-semibold text-sm border border-pink-200 transition-all flex items-center gap-2 shadow-2xs"
                >
                  <Calendar className="w-4 h-4 text-pink-500" />
                  <span>View Timetable</span>
                </a>

                <a
                  href="#brother"
                  className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-sm border border-rose-200 transition-all flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                  <span>Brother's Note</span>
                </a>
              </div>
            </div>

            {/* Right Cute Aesthetic Illustration & Interactive Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Floating cute badge 1 */}
                <div className="absolute -top-3 -left-4 z-20 px-3 py-1.5 bg-white rounded-2xl shadow-md border border-pink-100 flex items-center gap-1.5 animate-float-slow">
                  <span className="text-base">🌸</span>
                  <span className="text-xs font-bold text-pink-700">Believe in yourself</span>
                </div>

                {/* Floating cute badge 2 */}
                <div className="absolute -bottom-3 -right-2 z-20 px-3 py-1.5 bg-white rounded-2xl shadow-md border border-pink-100 flex items-center gap-1.5 animate-float-slow [animation-delay:2s]">
                  <span className="text-base">⭐</span>
                  <span className="text-xs font-bold text-amber-600">{streak} Day Study Streak</span>
                </div>

                {/* Aesthetic Study Room / Desk SVG Illustration */}
                <div className="w-full aspect-square rounded-3xl bg-gradient-to-tr from-pink-100/90 via-rose-50 to-pink-50 p-6 sm:p-8 flex items-center justify-center border-2 border-pink-200/60 shadow-inner relative overflow-hidden group">
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full max-w-[320px] transition-transform duration-500 group-hover:scale-105"
                  >
                    {/* Background Pastel Wall Arc */}
                    <circle cx="200" cy="200" r="160" fill="#FFE4E6" fillOpacity="0.6" />
                    <circle cx="200" cy="200" r="130" fill="#FFF1F2" fillOpacity="0.8" />

                    {/* Window with Stars & Moon */}
                    <rect x="70" y="80" width="80" height="90" rx="40" fill="#E0E7FF" fillOpacity="0.8" stroke="#FDA4AF" strokeWidth="4" />
                    <path d="M110 80 V170 M70 125 H150" stroke="#FDA4AF" strokeWidth="3" />
                    <circle cx="100" cy="105" r="8" fill="#FDE047" />
                    <circle cx="130" cy="140" r="3" fill="#F472B6" />

                    {/* Study Desk Table */}
                    <rect x="50" y="260" width="300" height="16" rx="8" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" />
                    <rect x="80" y="276" width="14" height="60" rx="7" fill="#F472B6" />
                    <rect x="306" y="276" width="14" height="60" rx="7" fill="#F472B6" />

                    {/* Books Stack */}
                    <rect x="80" y="235" width="65" height="13" rx="4" fill="#F43F5E" />
                    <rect x="85" y="220" width="58" height="13" rx="4" fill="#3B82F6" />
                    <rect x="82" y="205" width="62" height="13" rx="4" fill="#10B981" />
                    <text x="92" y="215" fill="#FFF" fontSize="8" fontWeight="bold">MATH</text>
                    <text x="95" y="230" fill="#FFF" fontSize="8" fontWeight="bold">SCI</text>
                    <text x="90" y="245" fill="#FFF" fontSize="8" fontWeight="bold">TAMIL</text>

                    {/* Open Laptop on Desk */}
                    <rect x="165" y="200" width="90" height="55" rx="6" fill="#475569" stroke="#E2E8F0" strokeWidth="2" />
                    <rect x="170" y="205" width="80" height="45" rx="4" fill="#FDF2F8" />
                    <path d="M150 255 L270 255 L260 260 L160 260 Z" fill="#94A3B8" />
                    {/* Screen Content: Cherry Blossom & Study Target */}
                    <circle cx="210" cy="225" r="10" fill="#FDA4AF" />
                    <path d="M210 212 C210 212 215 220 222 220 C229 220 225 228 225 228 C225 228 232 234 227 239 C222 244 214 240 210 240 C206 240 198 244 193 239 C188 234 195 228 195 228 C195 228 191 220 198 220 C205 220 210 212 210 212 Z" fill="#FB7185" />

                    {/* Cute Steaming Mug */}
                    <rect x="275" y="230" width="22" height="26" rx="6" fill="#F472B6" />
                    <path d="M297 236 C304 236 304 246 297 248" stroke="#F472B6" strokeWidth="3" fill="none" />
                    {/* Steam */}
                    <path d="M282 222 Q285 214 282 208" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M288 224 Q291 216 288 210" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Desk Plant with Flower */}
                    <path d="M312 240 L332 240 L328 258 L316 258 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
                    <path d="M322 240 Q315 225 310 220" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M322 240 Q330 225 334 222" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <circle cx="322" cy="216" r="6" fill="#EC4899" />
                    <circle cx="322" cy="216" r="2.5" fill="#FEF08A" />

                    {/* Floating Hearts & Stars */}
                    <path d="M120 60 C120 55 125 50 130 54 C135 50 140 55 140 60 C140 70 130 76 130 76 C130 76 120 70 120 60 Z" fill="#F43F5E" />
                    <path d="M280 120 C280 115 285 110 290 114 C295 110 300 115 300 120 C300 130 290 136 290 136 C290 136 280 130 280 120 Z" fill="#FB7185" />
                    <polygon points="190,70 193,78 201,78 195,83 197,91 190,86 183,91 185,83 179,78 187,78" fill="#FBBF24" />
                    <polygon points="320,80 322,86 328,86 323,90 325,96 320,92 315,96 317,90 312,86 318,86" fill="#FBBF24" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Dashboard Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-pink-100">
            {/* Metric 1: Next Exam */}
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100/80 hover:bg-pink-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Exam</span>
                <Clock className="w-4 h-4 text-pink-500" />
              </div>
              <div className="text-xl sm:text-2xl font-black font-cute text-slate-800">
                {nextExam ? `${countdown.days}d ${countdown.hours}h` : 'Completed'}
              </div>
              <p className="text-[11px] text-pink-600 font-semibold truncate mt-0.5">
                {nextExam ? nextExam.subject : 'All Done! 🎉'}
              </p>
            </div>

            {/* Metric 2: Today's Tasks */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 hover:bg-rose-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Goals</span>
                <CheckCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-xl sm:text-2xl font-black font-cute text-slate-800">
                {completedTargets}/{todayTargets.length} Done
              </div>
              <div className="w-full bg-rose-200/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${targetCompletionPercent}%` }}
                />
              </div>
            </div>

            {/* Metric 3: Chapters Revised */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/80 hover:bg-purple-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chapters Mastered</span>
                <BookOpen className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-black font-cute text-slate-800">
                {chaptersCompletedCount}/{totalChaptersCount}
              </div>
              <p className="text-[11px] text-purple-600 font-semibold mt-0.5">
                {Math.round((chaptersCompletedCount / (totalChaptersCount || 1)) * 100)}% Syllabus Mastered
              </p>
            </div>

            {/* Metric 4: Study Streak */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 hover:bg-amber-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Study Streak</span>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-xl sm:text-2xl font-black font-cute text-slate-800">
                {streak} Days 🔥
              </div>
              <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                Unstoppable momentum!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

