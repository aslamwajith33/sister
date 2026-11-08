import React from 'react';
import {
  Award,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  BookOpen,
  Lock,
  Unlock,
  Star
} from 'lucide-react';
import { triggerPinkConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';

export default function AchievementTracker({
  badges,
  chaptersCompletedCount,
  totalChaptersCount,
  tasksCompletedCount,
  streak,
  sisterName = 'Superstar'
}) {
  const overallPercentage =
    totalChaptersCount > 0
      ? Math.round((chaptersCompletedCount / totalChaptersCount) * 100)
      : 0;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleCelebrateBadge = (badge) => {
    sound.playSuccessChime();
    if (badge.unlocked) {
      triggerPinkConfetti();
    }
  };

  return (
    <section id="achievements" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Milestone Tracker
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            {sisterName}'s Victory Badges 🏆
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every chapter finished, every practice paper solved, and every day of focus earns you a badge of honor!
          </p>
        </div>

        {/* Master Progress Overview Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl shadow-pink-100/40 mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Stat 1: Badges Unlocked */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Badges Unlocked
              </span>
              <div className="text-2xl sm:text-3xl font-black font-cute text-amber-600 mt-1">
                {unlockedCount} / {badges.length}
              </div>
              <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                Keep unlocking glory!
              </p>
            </div>

            {/* Stat 2: Chapters Revised */}
            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-200/60">
              <span className="text-xs font-bold text-pink-800 uppercase tracking-wider block">
                Chapters Revised
              </span>
              <div className="text-2xl sm:text-3xl font-black font-cute text-pink-600 mt-1">
                {chaptersCompletedCount} / {totalChaptersCount}
              </div>
              <p className="text-[11px] text-pink-700 font-medium mt-0.5">
                Across all subjects
              </p>
            </div>

            {/* Stat 3: Study Tasks Completed */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/60">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                Tasks Completed
              </span>
              <div className="text-2xl sm:text-3xl font-black font-cute text-rose-600 mt-1">
                {tasksCompletedCount}
              </div>
              <p className="text-[11px] text-rose-700 font-medium mt-0.5">
                Daily study goals met
              </p>
            </div>

            {/* Stat 4: Study Streak */}
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/60">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
                Current Streak
              </span>
              <div className="text-2xl sm:text-3xl font-black font-cute text-purple-600 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
                <span>{streak} Days</span>
              </div>
              <p className="text-[11px] text-purple-700 font-medium mt-0.5">
                Consistent dedication
              </p>
            </div>
          </div>

          {/* Overall Syllabus Completion Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                CBSE Board Overall Revision Progress
              </span>
              <span className="text-pink-600 font-cute text-base">
                {overallPercentage}% Completed
              </span>
            </div>
            <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => handleCelebrateBadge(badge)}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none relative group ${
                  badge.unlocked
                    ? 'bg-white/95 border-pink-200 shadow-md hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1'
                    : 'bg-slate-50/60 border-slate-200/80 opacity-70'
                }`}
              >
                {/* Unlocked / Locked Top Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-pink-50 border border-pink-100/80 inline-block group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      badge.unlocked
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {badge.unlocked ? (
                      <>
                        <Unlock className="w-2.5 h-2.5" /> Unlocked
                      </>
                    ) : (
                      <>
                        <Lock className="w-2.5 h-2.5" /> In Progress
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold font-cute text-slate-800 group-hover:text-pink-600 transition-colors">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Requirement:</span>
                  <span className="text-pink-600">
                    {badge.type === 'chapters'
                      ? `${chaptersCompletedCount}/${badge.reqCount} Chapters`
                      : badge.type === 'streak'
                      ? `${streak}/${badge.reqCount} Days`
                      : badge.type === 'dailyTarget'
                      ? 'All Daily Targets'
                      : '4 Focus Blocks'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

