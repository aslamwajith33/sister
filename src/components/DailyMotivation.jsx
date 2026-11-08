import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Shuffle,
  Smile,
  ShieldCheck,
  Wind,
  Plus,
  Send,
  Star,
  Quote
} from 'lucide-react';
import { MOTIVATIONAL_QUOTES, DAILY_AFFIRMATIONS } from '../data/initialData';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function DailyMotivation({ sisterName = 'Superstar' }) {
  // Quote of the day logic: pick by day of the year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const initialIndex = dayOfYear % MOTIVATIONAL_QUOTES.length;
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(initialIndex);

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
            'Mastered the mirror and lens sign convention!',
            'Memorized all 6 types of தொகைநிலைத் தொடர்கள் in Tamil.',
            'Wrote a flawless Analytical Paragraph without looking at notes!'
          ];
    } catch {
      return ['Mastered the mirror and lens sign convention!'];
    }
  });
  const [newWin, setNewWin] = useState('');

  // Shuffle quote
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
    <section id="motivation" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> Daily Motivation Corner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            Inspiring Words For Your Journey 🌸
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Gentle reminders to reduce exam stress, protect your peace, and fuel your inner fire.
          </p>
        </div>

        {/* Hero Motivational Quote Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-pink-200/60 relative overflow-hidden mb-12">
          {/* Decorative quotes background watermark */}
          <div className="absolute top-4 left-6 text-white/10 text-9xl font-serif select-none pointer-events-none">
            “
          </div>
          <div className="absolute bottom-4 right-8 text-white/10 text-8xl font-serif select-none pointer-events-none">
            ”
          </div>

          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-pink-50 text-xs font-bold uppercase tracking-wider">
              <span>{currentQuote.icon}</span> Quote of the Day • {currentQuote.tag}
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-cute tracking-tight leading-snug max-w-3xl mx-auto text-pink-50 drop-shadow-xs">
              "{currentQuote.quote}"
            </h3>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-sm sm:text-base font-semibold text-pink-100 flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white text-white" />
                With love, {currentQuote.author}
              </span>
              <button
                onClick={handleShuffleQuote}
                className="px-4 py-2 rounded-xl bg-white/25 hover:bg-white text-white hover:text-rose-600 text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle New Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Calming Breath Zone & Small Wins Jar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Calming Breath Circle (4-7-8 Breathing Technique) */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md flex flex-col items-center text-center justify-between space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Wind className="w-3.5 h-3.5" /> Instant Stress-Reliever
              </div>
              <h4 className="text-xl font-bold font-cute text-slate-800">
                1-Minute Calming Breath 🧘‍♀️
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Whenever you feel anxious about board exam revisions, follow the gentle circle to calm your nervous system.
              </p>
            </div>

            {/* Interactive Breathing Circle */}
            <div className="relative w-44 h-44 flex items-center justify-center">
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
              <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex flex-col items-center justify-center shadow-md">
                {isBreathing ? (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-100">
                      {breathPhase}
                    </span>
                    <span className="text-3xl font-black font-cute mt-0.5">
                      {countdownNum}s
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🌸</span>
                    <span className="text-xs font-bold mt-1">Ready</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={toggleBreathing}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                isBreathing
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
              }`}
            >
              {isBreathing ? 'Stop Calming Breath' : 'Start 4-7-8 Breathing Guide'}
            </button>
          </div>

          {/* Sister's Confidence & Small Wins Jar */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> Confidence Jar
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {smallWins.length} Small Wins
                </span>
              </div>
              <h4 className="text-xl font-bold font-cute text-slate-800">
                {sisterName}'s Victory Jar 🍯
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Record every little victory. Small progress every single day turns into top board results!
              </p>

              {/* Input for adding new win */}
              <form onSubmit={handleAddWin} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newWin}
                  onChange={(e) => setNewWin(e.target.value)}
                  placeholder="e.g. Solved 10 math questions with zero errors!"
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-pink-50/40 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors shrink-0"
                  title="Add small win"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* List of small wins */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {smallWins.map((win, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="text-pink-500 text-sm shrink-0">✨</span>
                  <span className="font-medium">{win}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-pink-600 font-semibold text-center italic">
              "You don't need to be perfect. Just give your best." ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

