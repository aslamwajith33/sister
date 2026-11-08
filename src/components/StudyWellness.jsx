import React, { useState, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Droplets,
  Moon,
  Eye,
  Activity,
  Sparkles,
  Settings,
  Bell
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function StudyWellness({
  onSessionComplete,
  pomodoroSessionsCount = 2
}) {
  const [mode, setMode] = useState('study'); // 'study' | 'shortBreak' | 'longBreak'
  const [studyMins, setStudyMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [longBreakMins, setLongBreakMins] = useState(15);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Sync timeLeft when switching modes or settings
  const getDurationForMode = (targetMode) => {
    if (targetMode === 'study') return studyMins * 60;
    if (targetMode === 'shortBreak') return breakMins * 60;
    return longBreakMins * 60;
  };

  const handleModeChange = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
    sound.playPop();
  };

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Completed!
      sound.playPomodoroAlert();
      setIsActive(false);
      if (mode === 'study') {
        triggerPinkConfetti();
        if (onSessionComplete) onSessionComplete();
        // Prompt for break
        handleModeChange('shortBreak');
      } else {
        handleModeChange('study');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    sound.playPop();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDurationForMode(mode));
    sound.playPop();
  };

  // Format time MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = getDurationForMode(mode);
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  // Wellness reminder cards
  const wellnessTips = [
    {
      title: 'Hydration Station 💧',
      description: 'Keep a cute water bottle at your desk. Sip a few mouthfuls every 20 minutes to keep your brain energized and sharp.',
      icon: Droplets,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: '20-20-20 Eye Rest 👀',
      description: 'Every 20 minutes of reading, look at an object 20 feet away for 20 seconds to prevent digital & textbook eye strain.',
      icon: Eye,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Shoulder & Neck Stretch 🧘‍♀️',
      description: 'Roll your shoulders backwards 5 times and gently tilt your neck side to side to release study tension.',
      icon: Activity,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: '7-8 Hours Restful Sleep 🌙',
      description: 'Never sacrifice sleep for late-night cramming. Your brain consolidates and stores memories during deep REM sleep!',
      icon: Moon,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  return (
    <section id="wellness" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Coffee className="w-3.5 h-3.5" /> Study Breaks & Wellness
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            Smart Focus & Mindful Resting 🌸
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A healthy mind achieves the highest results. Use the Pomodoro timer to study with calm clarity and take refreshing breaks.
          </p>
        </div>

        {/* 2-Column Grid: Pomodoro on Left, Wellness on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Pomodoro Timer Card */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl shadow-pink-100/50 space-y-6 text-center">
            {/* Mode Selector Tabs */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-pink-50 rounded-2xl border border-pink-200 max-w-xs mx-auto">
              <button
                onClick={() => handleModeChange('study')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'study'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Study ({studyMins}m)
              </button>
              <button
                onClick={() => handleModeChange('shortBreak')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'shortBreak'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Break ({breakMins}m)
              </button>
              <button
                onClick={() => handleModeChange('longBreak')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'longBreak'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                Long ({longBreakMins}m)
              </button>
            </div>

            {/* Circular Timer Visualizer */}
            <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#FCE7F3"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={mode === 'study' ? '#EC4899' : '#10B981'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  fill="none"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              {/* Digital Time Center */}
              <div className="absolute text-center space-y-1">
                <span className="text-4xl sm:text-5xl font-black font-cute text-slate-800 tracking-tight block">
                  {timeFormatted}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                  {mode === 'study' ? '📖 Deep Focus Session' : '☕ Relax & Recharge'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-200'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isActive ? 'Pause' : 'Start Focus'}</span>
              </button>

              <button
                onClick={resetTimer}
                className="p-2.5 rounded-2xl bg-white hover:bg-pink-50 text-slate-500 hover:text-pink-600 border border-pink-200 shadow-2xs transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2.5 rounded-2xl border transition-colors shadow-2xs ${
                  showSettings
                    ? 'bg-pink-100 text-pink-700 border-pink-300'
                    : 'bg-white hover:bg-pink-50 text-slate-500 hover:text-pink-600 border-pink-200'
                }`}
                title="Timer Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Settings Accordion */}
            {showSettings && (
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 text-left space-y-3 text-xs animate-fade-in">
                <span className="font-bold text-slate-700 block">Customize Timer Durations:</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-500 font-semibold block mb-1">Study (min)</label>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={studyMins}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 25;
                        setStudyMins(val);
                        if (mode === 'study' && !isActive) setTimeLeft(val * 60);
                      }}
                      className="w-full px-2 py-1 bg-white rounded border border-pink-200 text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold block mb-1">Break (min)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={breakMins}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 5;
                        setBreakMins(val);
                        if (mode === 'shortBreak' && !isActive) setTimeLeft(val * 60);
                      }}
                      className="w-full px-2 py-1 bg-white rounded border border-pink-200 text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold block mb-1">Long Break</label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={longBreakMins}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 15;
                        setLongBreakMins(val);
                        if (mode === 'longBreak' && !isActive) setTimeLeft(val * 60);
                      }}
                      className="w-full px-2 py-1 bg-white rounded border border-pink-200 text-center font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Counter */}
            <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Today's Focus Blocks:</span>
              <span className="font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                🍅 {pomodoroSessionsCount} Blocks Completed
              </span>
            </div>
          </div>

          {/* Gentle Break & Wellness Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            <h4 className="text-lg font-bold font-cute text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              Gentle Reminders From Your Brother
            </h4>

            {wellnessTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${tip.color}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/70 shadow-2xs shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold">{tip.title}</h5>
                      <p className="text-[11px] sm:text-xs mt-0.5 leading-relaxed opacity-90">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

