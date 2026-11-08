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

export default function Navbar({ config, onOpenEditSister, onOpenPomodoro, streak = 5 }) {
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
    { label: 'Countdown', href: '#countdown', icon: Clock },
    { label: 'Timetable', href: '#timetable', icon: Calendar },
    { label: 'Planner', href: '#planner', icon: CheckSquare },
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-pink-100/60 border-b border-pink-100 py-2.5'
          : 'bg-white/60 backdrop-blur-sm border-b border-pink-100/40 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
            <span className="text-xl">🌸</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg font-cute text-slate-800 tracking-tight group-hover:text-pink-600 transition-colors">
                Her Success Journey
              </span>
              <span className="text-pink-500 text-sm">✨</span>
            </div>
            <p className="text-[10px] text-pink-600 font-semibold uppercase tracking-wider hidden sm:block">
              CBSE Class 10 Companion
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  link.highlight
                    ? 'bg-rose-100/80 text-rose-700 hover:bg-rose-200/90 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-rose-500 fill-rose-500' : 'text-pink-400'}`} />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Badges & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sister's Name pill with edit button */}
          <button
            onClick={onOpenEditSister}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-pink-800 border border-pink-200 hover:bg-pink-200/80 transition-all text-xs font-bold shadow-2xs group"
            title="Click to change Sister's Name"
          >
            <span>👑</span>
            <span className="max-w-[80px] sm:max-w-[120px] truncate">{config.sisterName}</span>
            <Edit3 className="w-3 h-3 text-pink-500 opacity-60 group-hover:opacity-100" />
          </button>

          {/* Study Streak Badge */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold shadow-2xs"
            title="Daily Study Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{streak}d</span>
          </div>

          {/* Pomodoro Quick Button */}
          <a
            href="#wellness"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors text-xs font-semibold"
            title="Open Pomodoro Timer"
          >
            <Timer className="w-3.5 h-3.5 text-rose-500" />
            <span>Timer</span>
          </a>

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

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 px-4 pt-3 pb-5 space-y-2 animate-fade-in shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-pink-50 px-2 text-xs text-slate-500">
            <span className="font-semibold">Quick Navigation</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500" /> {streak} Day Study Streak
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                    link.highlight
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
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
  );
}

