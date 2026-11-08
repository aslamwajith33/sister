import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Sparkles, ChevronRight, AlertCircle, Heart } from 'lucide-react';
import { triggerPinkConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';

export default function ExamCountdown({
  exams,
  nextExam,
  countdown,
  allCompleted,
  onOpenTimetableEdit
}) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  // If a specific subject is selected by user, compute its countdown
  const activeExam = selectedSubjectId
    ? exams.find((e) => e.id === selectedSubjectId) || nextExam
    : nextExam;

  // Calculate countdown for the activeExam
  const calculateSpecificCountdown = (exam) => {
    if (!exam) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    const examDateTime = new Date(`${exam.date}T10:30:00`);
    const diff = examDateTime.getTime() - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, passed: false };
  };

  const currentCount =
    activeExam?.id === nextExam?.id
      ? countdown
      : calculateSpecificCountdown(activeExam);

  // Motivational countdown advice
  const getMotivationalTip = (days) => {
    if (days > 45) {
      return "🌸 You have plenty of time! Build consistent study habits, master the concepts, and keep your notes tidy.";
    } else if (days > 15) {
      return "📚 Solid revision phase! Solve chapter-end NCERT questions, practice formulas daily, and review your mistakes.";
    } else if (days > 3) {
      return "⭐ Final sprint! Solve past CBSE sample papers under 3-hour exam conditions and stay well-rested.";
    } else {
      return "💖 You are ready, superstar! Trust your preparation, sleep peacefully, and walk into that hall with confidence!";
    }
  };

  return (
    <section id="countdown" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" /> Real-Time Exam Countdown
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            Every Second Takes You Closer To Glory ✨
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Track exact days, hours, minutes, and seconds until your CBSE board examinations.
          </p>
        </div>

        {allCompleted ? (
          // All Exams Completed Celebratory Card
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl shadow-pink-300/50 space-y-5 animate-pulse-soft">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner">
              🎓
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-cute">
              🎉 Congratulations, Superstar!
            </h3>
            <p className="text-base sm:text-lg text-pink-100 leading-relaxed font-medium">
              You have completed all your CBSE Class 10 Board Examinations! We are incredibly proud of your hard work, dedication, and heart.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playCelebration();
                  triggerPinkConfetti();
                }}
                className="px-6 py-3 rounded-2xl bg-white text-rose-600 font-bold hover:bg-rose-50 shadow-md transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-pink-500" />
                Celebrate Your Victory! 🌸
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Subject Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedSubjectId(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !selectedSubjectId || selectedSubjectId === nextExam?.id
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                    : 'bg-white text-slate-600 hover:bg-pink-50 border border-pink-200'
                }`}
              >
                ⚡ Next Upcoming: {nextExam?.subject}
              </button>
              {exams.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedSubjectId(ex.id);
                    sound.playPop();
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedSubjectId === ex.id
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                      : 'bg-white text-slate-600 hover:bg-pink-50 border border-pink-200'
                  }`}
                >
                  {ex.subject.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Main Countdown Giant Card */}
            {activeExam && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-200 shadow-xl shadow-pink-100/50 space-y-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500" />

                {/* Exam Title & Details */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold uppercase tracking-wider">
                    <span>Subject Code: {activeExam.code}</span>
                    <span>•</span>
                    <span>{activeExam.category || 'Board Subject'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold font-cute text-slate-800">
                    {activeExam.subject}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-pink-500" />
                      {activeExam.day}, {activeExam.date}
                    </span>
                    <span className="text-pink-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-pink-500" />
                      {activeExam.time}
                    </span>
                    <span className="text-pink-300">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 text-xs font-bold">
                      {activeExam.syllabusStatus}
                    </span>
                  </div>
                </div>

                {/* Big 4-Digit Clock Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
                  {/* Days */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/80 rounded-3xl p-4 sm:p-6 shadow-sm hover:scale-105 transition-transform">
                    <span className="block text-4xl sm:text-6xl font-black font-cute text-pink-600">
                      {String(currentCount.days).padStart(2, '0')}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      Days Remaining
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/80 rounded-3xl p-4 sm:p-6 shadow-sm hover:scale-105 transition-transform">
                    <span className="block text-4xl sm:text-6xl font-black font-cute text-pink-600">
                      {String(currentCount.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      Hours
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/80 rounded-3xl p-4 sm:p-6 shadow-sm hover:scale-105 transition-transform">
                    <span className="block text-4xl sm:text-6xl font-black font-cute text-pink-600">
                      {String(currentCount.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      Minutes
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/80 rounded-3xl p-4 sm:p-6 shadow-sm hover:scale-105 transition-transform">
                    <span className="block text-4xl sm:text-6xl font-black font-cute text-rose-500 animate-pulse">
                      {String(currentCount.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      Seconds
                    </span>
                  </div>
                </div>

                {/* Motivational Advice Banner */}
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200/70 text-slate-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                  <span>{getMotivationalTip(currentCount.days)}</span>
                </div>

                {/* Notes & Quick Config Hint */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 border-t border-pink-100">
                  <div className="flex items-center gap-1.5 text-left">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Focus Note: {activeExam.notes}</span>
                  </div>
                  <button
                    onClick={onOpenTimetableEdit}
                    className="text-pink-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Update Dates Sheet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

