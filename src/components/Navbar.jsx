import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Calendar,
  Clock,
  CheckSquare,
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  Menu,
  X,
  Flame,
  Timer,
  Edit3
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ config, onOpenEditSister, streak = 5 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playPop();
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', icon: Sparkles },
    { label: 'Maths Countdown', href: '#countdown', icon: Clock },
    { label: 'Timetable', href: '#timetable', icon: Calendar },
    { label: 'Daily Planner', href: '#planner', icon: CheckSquare },
    { label: 'Motivation', href: '#motivation', icon: Heart },
    { label: 'CBSE Prep', href: '#prep', icon: BookOpen },
    { label: 'Achievements', href: '#achievements', icon: Award },
    { label: "Brother's Note", href: '#brother', icon: Heart, highlight: true },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    sound.playPop();
  };

  return (
    <>
      {/* Top Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-pink-100/60 border-b border-pink-200/80 py-2.5'
            : 'bg-white/85 backdrop-blur-sm border-b border-pink-100 py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform text-lg">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-base sm:text-lg font-cute text-slate-800 tracking-tight">
                  Her Success Journey
                </span>
                <span className="text-pink-500 text-xs">✨</span>
              </div>
              <p className="text-[10px] text-pink-600 font-bold uppercase tracking-wider hidden sm:block">
                CBSE Class 10 Board Companion
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    link.highlight
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200 shadow-2xs'
                      : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-rose-500 fill-rose-500' : 'text-pink-500'}`} />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Badges */}
          <div className="flex items-center gap-2">
            {/* Sister Name Pill */}
            <button
              onClick={onOpenEditSister}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200 hover:bg-pink-200 transition-all text-xs font-bold shadow-2xs"
              title="Click to change Sister's Name"
            >
              <span>👑</span>
              <span className="max-w-[85px] truncate">{config.sisterName}</span>
              <Edit3 className="w-3 h-3 text-pink-500" />
            </button>

            {/* Streak Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streak}d</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-full border transition-all ${
                isMuted
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100'
              }`}
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Desktop / Tablet menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Dropdown Drawer for Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-200 px-4 pt-3 pb-5 space-y-2 animate-fade-in shadow-xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1">
              Quick Menu:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                      link.highlight
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-pink-50/60 text-slate-700 hover:bg-pink-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-pink-500" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* ANDROID-OPTIMIZED BOTTOM THUMB NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-200/90 px-3 py-1.5 flex items-center justify-around shadow-2xl shadow-pink-900/10">
        <a
          href="#home"
          onClick={() => sound.playPop()}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-slate-600 hover:text-pink-600 active:scale-95 transition-all"
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </a>

        <a
          href="#countdown"
          onClick={() => sound.playPop()}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-slate-600 hover:text-pink-600 active:scale-95 transition-all"
        >
          <span className="text-lg">📐</span>
          <span className="text-[10px] font-bold mt-0.5">Maths</span>
        </a>

        <a
          href="#timetable"
          onClick={() => sound.playPop()}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-slate-600 hover:text-pink-600 active:scale-95 transition-all"
        >
          <span className="text-lg">📅</span>
          <span className="text-[10px] font-bold mt-0.5">Exams</span>
        </a>

        <a
          href="#planner"
          onClick={() => sound.playPop()}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-slate-600 hover:text-pink-600 active:scale-95 transition-all"
        >
          <span className="text-lg">✅</span>
          <span className="text-[10px] font-bold mt-0.5">Tasks</span>
        </a>

        <a
          href="#brother"
          onClick={() => sound.playPop()}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-rose-600 active:scale-95 transition-all"
        >
          <span className="text-lg animate-pulse">❤️</span>
          <span className="text-[10px] font-bold text-rose-700 mt-0.5">Bhaiya</span>
        </a>
      </nav>
    </>
  );
}
