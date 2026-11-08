import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  Filter,
  Check
} from 'lucide-react';
import { triggerPinkConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const DEFAULT_MILESTONES = [
  {
    id: 'm-1',
    title: 'First Chapter Revised & Mastered',
    description: 'Finished your first full chapter with notes and confidence!',
    icon: '🌸',
    category: 'Revision',
    completed: true,
    completedDate: 'Completed recently'
  },
  {
    id: 'm-2',
    title: 'Mathematics Formula Book Ready',
    description: 'Wrote and memorized core formulas for Quadratic, AP, Circles & Trig',
    icon: '📐',
    category: 'Maths',
    completed: true,
    completedDate: 'Completed recently'
  },
  {
    id: 'm-3',
    title: '5 Chapters Mastered Across Subjects',
    description: 'Solid revision of 5 core chapters with NCERT exercises',
    icon: '📚',
    category: 'Revision',
    completed: true,
    completedDate: 'Completed recently'
  },
  {
    id: 'm-4',
    title: 'Science Ray Diagrams & Reactions Mastered',
    description: 'Practiced mirror/lens diagrams and chemical reaction balancing',
    icon: '🔬',
    category: 'Science',
    completed: false,
    completedDate: null
  },
  {
    id: 'm-5',
    title: 'SST History & Geography Map Work Done',
    description: 'Marked all important dams, soil regions & Congress session centers',
    icon: '🗺️',
    category: 'SST',
    completed: false,
    completedDate: null
  },
  {
    id: 'm-6',
    title: 'English & Tamil Creative Writing Formats',
    description: 'Mastered formal letter formats, paragraph writing & Tamil essays',
    icon: '✍️',
    category: 'Languages',
    completed: false,
    completedDate: null
  },
  {
    id: 'm-7',
    title: 'First Full 3-Hour Timed Mock Paper',
    description: 'Solved an entire 80-mark board paper strictly from 10:30 AM to 1:30 PM',
    icon: '⏱️',
    category: 'Exam Prep',
    completed: false,
    completedDate: null
  },
  {
    id: 'm-8',
    title: '10 Chapters Conquered with PYQs',
    description: 'Practiced 5 years of Previous Year Questions across 10 chapters',
    icon: '🏆',
    category: 'Milestone',
    completed: false,
    completedDate: null
  }
];

const EMOJI_OPTIONS = ['🏆', '🌸', '📚', '📐', '🔬', '⭐', '✍️', '💯', '🎯', '✨'];

export default function AchievementTracker({
  sisterName = 'Afra Shahnaas'
}) {
  const [milestones, setMilestones] = useState(() =>
    loadFromStorage('hsj_manual_milestones_v2', DEFAULT_MILESTONES)
  );

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'completed' | 'pending'
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newEmoji, setNewEmoji] = useState('🏆');

  // Save changes to localStorage
  useEffect(() => {
    saveToStorage('hsj_manual_milestones_v2', milestones);
  }, [milestones]);

  const completedCount = milestones.filter((m) => m.completed).length;
  const totalCount = milestones.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Toggle milestone completion manually
  const handleToggle = (id) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const willBeCompleted = !m.completed;
          if (willBeCompleted) {
            sound.playSuccessChime();
            triggerPinkConfetti();
          } else {
            sound.playPop();
          }
          const todayStr = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          return {
            ...m,
            completed: willBeCompleted,
            completedDate: willBeCompleted ? `Finished on ${todayStr} 🌸` : null
          };
        }
        return m;
      })
    );
  };

  // Add a new custom milestone
  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.playSuccessChime();
    triggerPinkConfetti();

    const newMilestone = {
      id: `m-custom-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Personal study goal achieved by Afra!',
      icon: newEmoji,
      category: 'Personal Goal',
      completed: true, // Marked finished when entered!
      completedDate: `Finished on ${new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} 🌸`,
      isCustom: true
    };

    setMilestones((prev) => [newMilestone, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  // Delete custom milestone
  const handleDelete = (id, e) => {
    e.stopPropagation();
    sound.playPop();
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  // Filtered milestones
  const filteredMilestones = milestones.filter((m) => {
    if (activeFilter === 'completed') return m.completed;
    if (activeFilter === 'pending') return !m.completed;
    return true;
  });

  return (
    <section id="achievements" className="py-10 sm:py-14 relative px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Milestone Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cute text-slate-800">
            {sisterName}'s Milestone Journey 🏆
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Mark milestones as you finish them, or record your own personal victories!
          </p>
        </div>

        {/* Clean Progress Summary Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-2 border-pink-200 shadow-md shadow-pink-100/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-cute text-pink-600">
                  {completedCount} of {totalCount}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  {percent}% Achieved
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {percent === 100
                  ? '🎉 Outstanding! You have finished all milestones!'
                  : 'Tap any milestone to mark it completed as soon as you finish it!'}
              </p>
            </div>

            {/* "+ Add Milestone" Action Button */}
            <button
              onClick={() => {
                sound.playPop();
                setIsAdding(!isAdding);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-pink-200 transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Close Form' : 'Add My Milestone'}</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-xs"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto text-xs font-bold">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <button
              onClick={() => {
                sound.playPop();
                setActiveFilter('all');
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                activeFilter === 'all'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setActiveFilter('completed');
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                activeFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setActiveFilter('pending');
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                activeFilter === 'pending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              To-Do ({totalCount - completedCount})
            </button>
          </div>
        </div>

        {/* Add Milestone Form (Collapsible) */}
        {isAdding && (
          <form
            onSubmit={handleAddMilestone}
            className="bg-gradient-to-r from-pink-50 via-rose-50/60 to-pink-50 rounded-3xl p-5 sm:p-6 border-2 border-pink-300 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-cute text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                Record a Finished Milestone or Study Achievement
              </h3>
              <span className="text-[11px] text-pink-700 font-medium">
                Entered manually by {sisterName} ❤️
              </span>
            </div>

            {/* Emoji Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Choose an Icon:
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {EMOJI_OPTIONS.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setNewEmoji(em)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                      newEmoji === em
                        ? 'bg-pink-200 border-2 border-pink-500 scale-110'
                        : 'bg-white border border-pink-200 hover:bg-pink-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Milestone Title */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Milestone Title *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Scored 75/80 in Maths Pre-Board or Finished Full SST Revision"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-pink-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-slate-400"
                required
              />
            </div>

            {/* Optional Description */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Details or Notes (Optional)
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. Solved all NCERT exemplars & reviewed mistake notebook"
                className="w-full px-3.5 py-2 rounded-2xl bg-white border border-pink-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-slate-400"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md shadow-pink-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Mark Completed ✨</span>
              </button>
            </div>
          </form>
        )}

        {/* Milestones Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredMilestones.map((m) => {
            const isDone = m.completed;
            return (
              <div
                key={m.id}
                onClick={() => handleToggle(m.id)}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer select-none relative group flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-white/95 border-emerald-200/90 shadow-sm hover:border-emerald-300'
                    : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-white shadow-2xs'
                }`}
              >
                {/* Milestone Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-105 ${
                    isDone
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-pink-50 border border-pink-200/80'
                  }`}
                >
                  {m.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {m.category || 'CBSE 10th'}
                    </span>
                    {isDone ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                        Tap when finished
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-sm font-bold font-cute leading-snug ${
                      isDone
                        ? 'text-slate-800 line-through decoration-emerald-500/70'
                        : 'text-slate-800'
                    }`}
                  >
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Completion Date or Action Prompt */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    {isDone ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {m.completedDate || 'Completed! 🎉'}
                      </span>
                    ) : (
                      <span className="text-pink-600 font-semibold group-hover:underline flex items-center gap-1">
                        <Circle className="w-3 h-3 text-pink-400" />
                        Click to mark finished
                      </span>
                    )}

                    {m.isCustom && (
                      <button
                        onClick={(e) => handleDelete(m.id, e)}
                        title="Delete this custom milestone"
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Friendly note */}
        <div className="text-center py-2">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <span>✨</span>
            <span>All marked milestones are saved automatically on your phone and laptop!</span>
          </p>
        </div>

      </div>
    </section>
  );
}
