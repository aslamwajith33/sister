import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Clock,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Filter,
  Check,
  Star
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function DailyPlanner({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  sisterName = 'Afra Shahnaas'
}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [chapter, setChapter] = useState('');
  const [priority, setPriority] = useState('High');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [isTarget, setIsTarget] = useState(true);
  const [filterTab, setFilterTab] = useState('All'); // 'All' | 'Pending' | 'Completed' | 'Targets'
  const [subjectFilter, setSubjectFilter] = useState('All');

  const subjectOptions = [
    'Tamil',
    'Mathematics',
    'Science',
    'Social Science',
    'English',
    'Information Technology',
    'Other'
  ];

  // Quick preset templates
  const presets = [
    { title: 'Revise 1 Formula Sheet & write all identities', subject: 'Mathematics' },
    { title: 'Practice 2 Ray Diagrams & 3 circuit numericals', subject: 'Science' },
    { title: 'Tamil: திருக்குறள் அல்லது மனப்பாடப் பாடல் revision', subject: 'Tamil' },
    { title: 'Solve 5 Previous-Year Questions (PYQs)', subject: 'Social Science' },
    { title: '25-minute deep focus NCERT reading session', subject: 'English' }
  ];

  const handleApplyPreset = (preset) => {
    setTaskTitle(preset.title);
    setSubject(preset.subject);
    sound.playPop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddTask({
      id: `task-${Date.now()}`,
      title: taskTitle.trim(),
      subject,
      chapter: chapter.trim() || 'General Revision',
      priority,
      estimatedMinutes: Number(estimatedMinutes) || 30,
      isTarget,
      completed: false,
      createdAt: new Date().toISOString()
    });

    setTaskTitle('');
    setChapter('');
    sound.playSuccessChime();
  };

  // Compute metrics
  const targetTasks = tasks.filter((t) => t.isTarget);
  const completedTargetTasks = targetTasks.filter((t) => t.completed);
  const allDailyTargetsCompleted =
    targetTasks.length > 0 && completedTargetTasks.length === targetTasks.length;

  const totalCompleted = tasks.filter((t) => t.completed).length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0;

  // Filter tasks list
  const filteredTasks = tasks.filter((task) => {
    if (filterTab === 'Pending' && task.completed) return false;
    if (filterTab === 'Completed' && !task.completed) return false;
    if (filterTab === 'Targets' && !task.isTarget) return false;
    if (subjectFilter !== 'All' && task.subject !== subjectFilter) return false;
    return true;
  });

  const handleToggle = (id) => {
    onToggleTask(id);
    const toggled = tasks.find((t) => t.id === id);
    if (toggled && !toggled.completed) {
      sound.playSuccessChime();
      // Check if this was the last target
      const remainingTargets = targetTasks.filter((t) => !t.completed && t.id !== id);
      if (remainingTargets.length === 0 && targetTasks.length > 0) {
        sound.playCelebration();
        triggerPinkConfetti();
      }
    } else {
      sound.playPop();
    }
  };

  return (
    <section id="planner" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> Daily Study Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            Organize Today, Conquer Tomorrow 🌸
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Set daily targets, track chapters, and celebrate every small achievement.
          </p>
        </div>

        {/* Motivational Banner on completing 100% daily targets */}
        {allDailyTargetsCompleted && (
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-xl shadow-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse-soft">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0">
                🌟
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-cute">
                  Outstanding Work, {sisterName}!
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 mt-0.5 font-medium">
                  You achieved all your daily study targets today! Take a cozy rest now, you earned it! 🌸
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playCelebration();
                triggerPinkConfetti();
              }}
              className="px-5 py-2.5 rounded-2xl bg-white text-pink-700 font-bold hover:bg-pink-50 text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              Celebrate!
            </button>
          </div>
        )}

        {/* Grid: Left Task Creator / Right Task List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Add Task Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-xl shadow-pink-100/40 space-y-5">
              <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                <h3 className="text-lg font-bold font-cute text-slate-800 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-pink-500" /> Add New Study Goal
                </h3>
                <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                  Daily Habit
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Quick Idea Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presets.slice(0, 3).map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-pink-50/70 hover:bg-pink-100/80 text-pink-700 border border-pink-200/60 transition-colors text-left truncate max-w-full"
                    >
                      + {p.title.split('&')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    What are you studying today?
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g. Solve 5 NCERT exercises on Triangles"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 font-medium placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 font-medium text-slate-700"
                    >
                      {subjectOptions.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 font-medium text-slate-700"
                    >
                      <option value="High">🔥 High (Urgent)</option>
                      <option value="Medium">⚡ Medium</option>
                      <option value="Low">🌱 Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Chapter / Topic
                    </label>
                    <input
                      type="text"
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g. Life Processes"
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Est. Minutes
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="180"
                      step="5"
                      value={estimatedMinutes}
                      onChange={(e) => setEstimatedMinutes(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isTargetCheck"
                    checked={isTarget}
                    onChange={(e) => setIsTarget(e.target.checked)}
                    className="w-4 h-4 rounded text-pink-600 accent-pink-500 focus:ring-pink-400 border-pink-300"
                  />
                  <label
                    htmlFor="isTargetCheck"
                    className="text-xs font-semibold text-slate-700 cursor-pointer select-none flex items-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Mark as Daily Must-Do Target
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 transition-all text-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add to Today's Tasks
                </button>
              </form>
            </div>

            {/* Quick Completion Gauge Widget */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-pink-100 shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Today's Target Progress
                </span>
                <h4 className="text-xl font-bold font-cute text-slate-800">
                  {completedTargetTasks.length} of {targetTasks.length} Completed
                </h4>
                <p className="text-[11px] text-pink-600 font-semibold">
                  {targetTasks.length === 0
                    ? 'Add some targets to get started!'
                    : allDailyTargetsCompleted
                    ? '🎉 100% Achieved! Amazing!'
                    : `${targetTasks.length - completedTargetTasks.length} targets remaining`}
                </p>
              </div>

              {/* Circular gauge representation */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-pink-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-pink-500 transition-all duration-700 ease-out"
                    strokeDasharray={`${
                      targetTasks.length > 0
                        ? Math.round((completedTargetTasks.length / targetTasks.length) * 100)
                        : 0
                    }, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold font-cute text-slate-800">
                  {targetTasks.length > 0
                    ? `${Math.round((completedTargetTasks.length / targetTasks.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Tasks List & Filters */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter Tabs */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2.5 border border-pink-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                {['All', 'Targets', 'Pending', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setFilterTab(tab);
                      sound.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterTab === tab
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-pink-50'
                    }`}
                  >
                    {tab} ({
                      tab === 'All'
                        ? tasks.length
                        : tab === 'Targets'
                        ? targetTasks.length
                        : tab === 'Pending'
                        ? tasks.filter((t) => !t.completed).length
                        : totalCompleted
                    })
                  </button>
                ))}
              </div>

              {/* Subject dropdown filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="w-3.5 h-3.5 text-pink-500" />
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="bg-pink-50/60 border border-pink-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Subjects</option>
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="bg-white/80 rounded-3xl p-10 border border-pink-100 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-400 mx-auto flex items-center justify-center text-2xl">
                    🌸
                  </div>
                  <h4 className="text-base font-bold font-cute text-slate-700">
                    No tasks found in this view
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Add a study task from the left form to stay on top of your CBSE Class 10 goals!
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white/95 rounded-2xl p-4 border transition-all duration-300 flex items-start gap-3.5 group shadow-2xs hover:shadow-md ${
                      task.completed
                        ? 'border-emerald-100 bg-emerald-50/20 opacity-80'
                        : 'border-pink-100 hover:border-pink-300'
                    }`}
                  >
                    {/* Custom Checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggle(task.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                          : 'border-pink-300 hover:border-pink-500 bg-pink-50/40 text-transparent'
                      }`}
                      aria-label="Toggle task completion"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 border border-pink-200">
                          {task.subject}
                        </span>
                        {task.isTarget && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Must-Do
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            task.priority === 'High'
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-semibold transition-all ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </h4>

                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                        {task.chapter && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-pink-400" />
                            <span className="truncate max-w-[150px]">{task.chapter}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-400" />
                          <span>{task.estimatedMinutes} mins</span>
                        </span>
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteTask(task.id);
                        sound.playPop();
                      }}
                      className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

