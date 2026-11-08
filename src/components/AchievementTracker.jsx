import React from 'react';
import { Sparkles, Lock, Flame } from 'lucide-react';
import { triggerPinkConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';

export default function AchievementTracker({
  badges,
  chaptersCompletedCount,
  totalChaptersCount,
  tasksCompletedCount,
  streak,
  sisterName = 'Afra Shahnaas'
}) {
  const overallPercentage =
    totalChaptersCount > 0
      ? Math.round((chaptersCompletedCount / totalChaptersCount) * 100)
      : 0;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleCelebrateBadge = (badge) => {
    if (badge.unlocked) {
      sound.playSuccessChime();
      triggerPinkConfetti();
    }
  };

  // Progress hint for each badge
  const getProgressHint = (badge) => {
    if (badge.unlocked) return '✅ Unlocked!';
    if (badge.type === 'chapters')
      return `${chaptersCompletedCount} / ${badge.reqCount} chapters done`;
    if (badge.type === 'streak')
      return `${streak} / ${badge.reqCount} day streak`;
    if (badge.type === 'dailyTarget')
      return 'Complete all daily tasks';
    if (badge.type === 'pomodoro')
      return 'Finish 4 focus sessions';
    return '';
  };

  return (
    <section id="achievements" className="py-10 sm:py-14 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Milestones
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cute text-slate-800">
            {sisterName}'s Badges 🏆
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Earned automatically as you study — no entry needed!
          </p>
        </div>

        {/* Summary strip */}
        <div className="bg-white/90 rounded-2xl border border-pink-100 shadow-sm p-5 mb-7 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Progress bar */}
          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
              <span>Overall Revision Progress</span>
              <span className="text-pink-600 font-bold">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {chaptersCompletedCount} of {totalChaptersCount} chapters marked done in Prep Corner
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 shrink-0 text-center">
            <div>
              <div className="text-2xl font-black font-cute text-pink-600">{unlockedCount}/{badges.length}</div>
              <div className="text-[11px] text-slate-500 font-medium">Badges</div>
            </div>
            <div>
              <div className="text-2xl font-black font-cute text-rose-500 flex items-center gap-0.5">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-400" />{streak}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-black font-cute text-indigo-500">{tasksCompletedCount}</div>
              <div className="text-[11px] text-slate-500 font-medium">Tasks Done</div>
            </div>
          </div>
        </div>

        {/* Badges grid — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => handleCelebrateBadge(badge)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 w-full ${
                badge.unlocked
                  ? 'bg-white border-pink-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-slate-50/70 border-slate-200 opacity-60 cursor-default'
              }`}
            >
              {/* Icon */}
              <div className="text-3xl mb-2">{badge.icon}</div>

              {/* Title */}
              <h4 className={`text-sm font-bold font-cute leading-tight ${
                badge.unlocked ? 'text-slate-800' : 'text-slate-500'
              }`}>
                {badge.title}
              </h4>

              {/* Progress / status */}
              <p className={`text-[11px] mt-1.5 font-semibold ${
                badge.unlocked ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                {badge.unlocked ? (
                  <span className="inline-flex items-center gap-1">✅ Unlocked!</span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> {getProgressHint(badge)}
                  </span>
                )}
              </p>
            </button>
          ))}
        </div>

        {/* Empty / all unlocked message */}
        {unlockedCount === badges.length && badges.length > 0 && (
          <div className="mt-8 text-center py-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200">
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-bold text-pink-700 font-cute">All badges unlocked, {sisterName}!</p>
            <p className="text-sm text-slate-500 mt-0.5">You're absolutely amazing! ❤️</p>
          </div>
        )}
      </div>
    </section>
  );
}
