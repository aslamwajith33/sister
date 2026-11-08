import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  Edit,
  Sparkles,
  CheckCircle,
  FileText,
  AlertCircle,
  Plus,
  Share2
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ExamTimetable({ exams, onOpenEdit }) {
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter exams
  const filteredExams = exams.filter((exam) => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Language') return exam.category === 'Language';
    if (filterCategory === 'Core') return exam.category === 'Core';
    return true;
  });

  // Helper to compute days left
  const getDaysLeft = (dateStr) => {
    const examDate = new Date(`${dateStr}T10:30:00`);
    const diff = examDate.getTime() - Date.now();
    if (diff <= 0) return 'Completed';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days to go`;
  };

  // Status color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Exam Ready! ✨':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Well Revised':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <section id="timetable" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" /> CBSE Class 10 Timetable
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
              Your Examination Schedule 🌸
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Configurable board timetable with Tamil (replacing Hindi), Science, Mathematics, Social Science, English, and IT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                sound.playPop();
                onOpenEdit();
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-pink-200 hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit / Update Timetable</span>
            </button>
          </div>
        </div>

        {/* Notice Card on Configurable Timetable */}
        <div className="mb-6 p-4 rounded-2xl bg-pink-50/80 border border-pink-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-pink-900">Personalized & Fully Configurable: </span>
            The dates below represent the standard CBSE Class 10 examination slot (10:30 AM – 01:30 PM). As soon as your school issues your official admit card / hall ticket, you can click <span className="font-semibold text-pink-600">"Edit / Update Timetable"</span> to fine-tune dates, subject codes, and room numbers!
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Filter:</span>
          {['All', 'Language', 'Core'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-pink-50 border border-pink-200'
              }`}
            >
              {cat} Subjects
            </button>
          ))}
        </div>

        {/* Timetable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam, index) => {
            const daysLeft = getDaysLeft(exam.date);
            const isCompleted = daysLeft === 'Completed';

            return (
              <div
                key={exam.id}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Accent top stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${exam.color || 'from-pink-400 to-rose-400'}`}
                />

                <div>
                  {/* Subject Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
                      Code: {exam.code}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                        exam.syllabusStatus
                      )}`}
                    >
                      {exam.syllabusStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-cute text-slate-800 group-hover:text-pink-600 transition-colors">
                    {exam.subject}
                  </h3>

                  {/* Date & Day Pill */}
                  <div className="mt-3 p-3 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>{exam.day}, {exam.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{exam.time}</span>
                    </div>
                  </div>

                  {/* Notes / Tips */}
                  {exam.notes && (
                    <div className="mt-3 text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-pink-100/60">
                      💡 {exam.notes}
                    </div>
                  )}
                </div>

                {/* Footer Pill: Countdown to this exam */}
                <div className="mt-5 pt-4 border-t border-pink-50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Countdown
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                    }`}
                  >
                    {isCompleted ? '✓ Exam Over' : `⏳ ${daysLeft}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

