import React from 'react';
import { Heart, Sparkles, ArrowUp, Calendar, BookOpen, Clock, CheckSquare } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer({ config }) {
  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-white via-pink-50/60 to-pink-100/80 border-t border-pink-200/80 pt-12 pb-8 mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Sister Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-2xl">🌸</span>
              <h3 className="text-2xl font-black font-cute text-slate-800 tracking-tight">
                HER SUCCESS JOURNEY 🌸
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-bold text-rose-600">
              Little Steps. Big Dreams. Beautiful Success. ❤️
            </p>
            <p className="text-xs text-slate-500 max-w-md">
              A Personal CBSE Class 10 Exam Companion Website created with love by a brother for his younger sister {config.sisterName}.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <a href="#home" className="hover:text-pink-600 transition-colors">Home</a>
            <a href="#countdown" className="hover:text-pink-600 transition-colors">Countdown</a>
            <a href="#timetable" className="hover:text-pink-600 transition-colors">Timetable</a>
            <a href="#planner" className="hover:text-pink-600 transition-colors">Planner</a>
            <a href="#motivation" className="hover:text-pink-600 transition-colors">Motivation</a>
            <a href="#prep" className="hover:text-pink-600 transition-colors">CBSE Prep</a>
            <a href="#brother" className="hover:text-pink-600 transition-colors text-rose-600">Brother's Message ❤️</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-pink-200 shadow-md shadow-pink-100 transition-all flex items-center gap-2 text-xs font-bold"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4 text-pink-500" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Her Success Journey. Dedicated to {config.sisterName}'s CBSE Class 10 Success.</p>
          <p className="flex items-center gap-1 font-medium text-pink-600">
            Made with love, hugs & pride by {config.brotherName || 'Bhaiya'} <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}

