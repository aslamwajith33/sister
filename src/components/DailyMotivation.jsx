import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Shuffle,
  Sun,
  Wind,
  Plus,
  Send,
  Star,
  Quote
} from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../data/initialData';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function DailyMotivation({ sisterName = 'Afra Shahnaas' }) {
  // Morning motivation logic: updates automatically every morning based on today's date!
  const today = new Date();
  const todayDateStr = today.toISOString().split('T')[0];
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  // Unique hash per calendar day so every morning at 12:00 AM it switches to a fresh quote!
  const dateHash = todayDateStr.split('-').reduce((acc, part) => acc * 31 + parseInt(part, 10), 0);
  const morningIndex = Math.abs(dateHash) % MOTIVATIONAL_QUOTES.length;

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(morningIndex);

  // Sync index if date changes
  useEffect(() => {
    setCurrentQuoteIndex(morningIndex);
  }, [morningIndex]);

  // Deep breathing interactive tool
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // 'Inhale' (4s) | 'Hold' (7s) | 'Exhale' (8s)
  const [countdownNum, setCountdownNum] = useState(4);

  // Confidence / Small wins jar
  const [smallWins, setSmallWins] = useState(() => {
    try {
      const saved = localStorage.getItem('hsj_small_wins');
      return saved
        ? JSON.parse(saved)
        : [
            'Mastered the mirror and lens sign convention in Science!',
            'Solved 10 Trigonometry identities with zero mistakes in Maths!',
            'Memorized all 6 types of தொகைநிலைத் தொடர்கள் in Tamil.',
            'Wrote a high-scoring Analytical Paragraph in English!'
          ];
    } catch {
      return ['Mastered the mirror and lens sign convention!'];
    }
  });
  const [newWin, setNewWin] = useState('');

  // Shuffle quote manually if user wants more
  const handleShuffleQuote = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    } while (nextIndex === currentQuoteIndex && MOTIVATIONAL_QUOTES.length > 1);
    setCurrentQuoteIndex(nextIndex);
    sound.playPop();
  };

  // Add small win
  const handleAddWin = (e) => {
    e.preventDefault();
    if (!newWin.trim()) return;
    const updated = [newWin.trim(), ...smallWins];
    setSmallWins(updated);
    try {
      localStorage.setItem('hsj_small_wins', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
    setNewWin('');
    sound.playSuccessChime();
    triggerPinkConfetti();
  };

  // Interactive 4-7-8 Breathing Loop
  useEffect(() => {
    let timer;
    if (isBreathing) {
      if (breathPhase === 'Inhale') {
        if (countdownNum > 1) {
          timer = setTimeout(() => setCountdownNum(countdownNum - 1), 1000);
        } else {
          setBreathPhase('Hold');
          setCountdownNum(7);
        }
      } else if (breathPhase === 'Hold') {
        if (countdownNum > 1) {
          timer = setTimeout(() => setCountdownNum(countdownNum - 1), 1000);
        } else {
          setBreathPhase('Exhale');
          setCountdownNum(8);
        }
      } else if (breathPhase === 'Exhale') {
        if (countdownNum > 1) {
          timer = setTimeout(() => setCountdownNum(countdownNum - 1), 1000);
        } else {
          setBreathPhase('Inhale');
          setCountdownNum(4);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isBreathing, breathPhase, countdownNum]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      setIsBreathing(true);
      setBreathPhase('Inhale');
      setCountdownNum(4);
      sound.playPop();
    } else {
      setIsBreathing(false);
    }
  };

  const currentQuote = MOTIVATIONAL_QUOTES[currentQuoteIndex];

  return (
    <section id="motivation" className="py-10 sm:py-14 relative px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-amber-500" /> Daily Morning Motivation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cute text-slate-800">
            Inspiring Words For {sisterName} 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            A brand new motivation quote automatically arrives each morning to start your day with power and peace!
          </p>
        </div>

        {/* Hero Motivational Quote Card */}
        <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-pink-200/60 relative overflow-hidden">
          <div className="relative z-10 text-center space-y-5">
            {/* Morning Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-pink-50 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Today's Morning Inspiration • {dateFormatted}</span>
            </div>

            {/* The Quote */}
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-cute tracking-tight leading-snug max-w-2xl mx-auto text-pink-50">
              "{currentQuote.quote}"
            </h3>

            {/* Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs sm:text-sm font-semibold text-pink-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Theme: {currentQuote.tag}</span>
              </span>
              <button
                onClick={handleShuffleQuote}
                className="px-4 py-2 rounded-xl bg-white/25 hover:bg-white text-white hover:text-rose-600 text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle Another Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column: Calming 1-Minute Breath & Confidence Wins Jar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Calming Breath Circle (4-7-8 Breathing Technique) */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col items-center text-center justify-between space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Wind className="w-3.5 h-3.5" /> Instant Exam Calm
              </div>
              <h4 className="text-lg font-bold font-cute text-slate-800">
                1-Minute Calming Breath 🧘‍♀️
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Before starting study or when feeling nervous, follow the gentle circle to calm your mind.
              </p>
            </div>

            {/* Interactive Breathing Circle */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  isBreathing
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 bg-pink-200/60 shadow-lg shadow-pink-200'
                      : breathPhase === 'Hold'
                      ? 'scale-110 bg-amber-200/50 shadow-lg shadow-amber-200'
                      : 'scale-90 bg-emerald-100/60'
                    : 'bg-pink-100/60 scale-100'
                }`}
              />
              <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex flex-col items-center justify-center shadow-md">
                {isBreathing ? (
                  <>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-100">
                      {breathPhase}
                    </span>
                    <span className="text-2xl font-black font-cute mt-0.5">
                      {countdownNum}s
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">🌸</span>
                    <span className="text-xs font-bold mt-0.5">Breathe</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={toggleBreathing}
              className={`w-full py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                isBreathing
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
              }`}
            >
              {isBreathing ? 'Stop Calming Breath' : 'Start 4-7-8 Breathing'}
            </button>
          </div>

          {/* Afra's Confidence & Small Wins Jar */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> Afra's Wins
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {smallWins.length} Saved Wins
                </span>
              </div>
              <h4 className="text-lg font-bold font-cute text-slate-800">
                Confidence Jar 🍯
              </h4>
              <p className="text-xs text-slate-500">
                Log every little chapter and formula you conquered today!
              </p>

              {/* Form */}
              <form onSubmit={handleAddWin} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newWin}
                  onChange={(e) => setNewWin(e.target.value)}
                  placeholder="e.g. Mastered Quadratic Equations formula!"
                  className="flex-1 px-3 py-2 text-xs bg-pink-50/50 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Wins list */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {smallWins.map((win, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-pink-50/50 border border-pink-100 text-xs text-slate-700 flex items-start gap-2"
                >
                  <span className="text-pink-500 text-xs shrink-0">✨</span>
                  <span className="font-medium">{win}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-pink-600 font-semibold text-center italic">
              "Small progress every day leads to big achievements." 🌸
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
