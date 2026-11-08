import React, { useState } from 'react';
import { Clock, Calendar, Sparkles, ChevronRight, Calculator } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ExamCountdown({
  exams,
  nextExam,
  countdown,
  allCompleted,
  onOpenTimetableEdit
}) {
  // Default to the first exam (Mathematics)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const activeExam = selectedSubjectId
    ? exams.find((e) => e.id === selectedSubjectId) || nextExam
    : nextExam;

  // Calculate countdown for the selected exam
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

  const getSubjectTip = (subj) => {
    if (subj?.includes('Math')) {
      return "📐 1st Board Exam: Practice 5 questions every morning. Write formulas clearly for full step marks!";
    } else if (subj?.includes('Science')) {
      return "🔬 Draw neat ray diagrams with scale & pencil. Don't forget arrowheads on rays!";
    } else if (subj?.includes('Social')) {
      return "🌍 Remember key dates and write in point-form with bold headings for 5-markers.";
    } else if (subj?.includes('English')) {
      return "📖 Mind the word limit in Analytical Paragraphs and keep formal letter layout crisp.";
    } else if (subj?.includes('Tamil')) {
      return "🌸 செய்யுள் மனப்பாடப் பகுதியை பிழையின்றி எழுதிப் பழகவும். நிறுத்தற்குறிகள் மிக முக்கியம்.";
    } else {
      return "💻 Review DBMS SQL queries and Calc scenarios for quick scoring.";
    }
  };

  return (
    <section id="countdown" className="py-8 sm:py-12 relative px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" /> Live Board Exam Countdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cute text-slate-800">
            Counting Down Every Second To Your Success ✨
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Your exams in exact chronological order. Tap any subject below to see its timer!
          </p>
        </div>

        {/* Subject Filter Pills: Order-wise (Maths first, Science, Social Science, English, Tamil, IT) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {exams.map((ex, idx) => {
            const isSelected = activeExam?.id === ex.id;
            const shortName = ex.subject.split('(')[0].trim();
            return (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedSubjectId(ex.id);
                  sound.playPop();
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-2xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200'
                    : 'bg-white text-slate-600 hover:bg-pink-50 border border-pink-200/80'
                }`}
              >
                <span>{idx === 0 ? '📐 1st' : idx === 1 ? '🔬 2nd' : idx === 2 ? '🌍 3rd' : idx === 3 ? '📖 4th' : idx === 4 ? '🌸 5th' : '💻 6th'}</span>
                <span>{shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Main Countdown Card */}
        {activeExam && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-100/40 text-center space-y-5 relative">
            {/* Subject Label */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                <span>Code: {activeExam.code}</span>
                <span>•</span>
                <span>{activeExam.date} ({activeExam.day})</span>
                <span>•</span>
                <span>{activeExam.time}</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold font-cute text-slate-800">
                {activeExam.subject}
              </h3>
            </div>

            {/* Countdown Grid (Large, thumb-friendly, gorgeous on Android) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-pink-200/80 shadow-2xs">
                <span className="block text-3xl sm:text-5xl font-black font-cute text-pink-600">
                  {String(currentCount.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Days
                </span>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-pink-200/80 shadow-2xs">
                <span className="block text-3xl sm:text-5xl font-black font-cute text-pink-600">
                  {String(currentCount.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Hours
                </span>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-pink-200/80 shadow-2xs">
                <span className="block text-3xl sm:text-5xl font-black font-cute text-pink-600">
                  {String(currentCount.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Mins
                </span>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-pink-200/80 shadow-2xs">
                <span className="block text-3xl sm:text-5xl font-black font-cute text-rose-500 animate-pulse">
                  {String(currentCount.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Secs
                </span>
              </div>
            </div>

            {/* Brother's Subject-Specific Tip */}
            <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200/70 text-xs sm:text-sm text-slate-700 font-medium max-w-xl mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
              <span>{getSubjectTip(activeExam.subject)}</span>
            </div>

            {/* Footer link to timetable */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>Need to change dates from your school circular?</span>
              <button
                onClick={onOpenTimetableEdit}
                className="text-pink-600 font-bold hover:underline"
              >
                Update Dates ✏️
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
