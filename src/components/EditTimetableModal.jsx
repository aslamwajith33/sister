import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Clock, BookOpen, RotateCcw, Check } from 'lucide-react';
import { DEFAULT_EXAMS } from '../data/initialData';
import { sound } from '../utils/sound';

export default function EditTimetableModal({ isOpen, onClose, exams, onSave }) {
  const [examList, setExamList] = useState(() => exams ? JSON.parse(JSON.stringify(exams)) : []);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add'

  // New exam form state
  const [newSubject, setNewSubject] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDay, setNewDay] = useState('Monday');
  const [newTime, setNewTime] = useState('10:30 AM – 01:30 PM');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState('Not Started');

  if (!isOpen) return null;

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleUpdateExam = (id, field, value) => {
    setExamList(prev => prev.map(ex => {
      if (ex.id === id) {
        const updated = { ...ex, [field]: value };
        // Auto-update day name if date changed
        if (field === 'date' && value) {
          try {
            const dateObj = new Date(value + 'T00:00:00');
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            if (dayName) updated.day = dayName;
          } catch (e) {
            console.error(e);
          }
        }
        return updated;
      }
      return ex;
    }));
  };

  const handleDeleteExam = (id) => {
    if (examList.length <= 1) {
      alert("Please keep at least one subject in the timetable.");
      return;
    }
    setExamList(prev => prev.filter(ex => ex.id !== id));
    sound.playPop();
  };

  const handleAddNewExam = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDate) return;

    let dayName = newDay;
    try {
      const dateObj = new Date(newDate + 'T00:00:00');
      dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    } catch {
      // keep fallback
    }

    const newEntry = {
      id: `custom-${Date.now()}`,
      subject: newSubject.trim(),
      code: newCode.trim() || 'N/A',
      date: newDate,
      day: dayName,
      time: newTime || '10:30 AM – 01:30 PM',
      durationHours: 3,
      room: "Exam Hall A",
      status: "Upcoming",
      syllabusStatus: newStatus,
      category: "Core",
      color: "from-pink-400 to-rose-400",
      badgeBg: "bg-pink-100 text-pink-700 border-pink-200",
      notes: newNotes.trim() || "Review key formulas and notes.",
      icon: "BookOpen"
    };

    setExamList(prev => [...prev, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date)));
    sound.playSuccessChime();

    // Reset form
    setNewSubject('');
    setNewCode('');
    setNewDate('');
    setNewNotes('');
    setActiveTab('list');
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset timetable back to the standard CBSE Class 10 schedule (with Tamil)?")) {
      setExamList(JSON.parse(JSON.stringify(DEFAULT_EXAMS)));
      sound.playPop();
    }
  };

  const handleSaveAll = () => {
    // Sort chronologically by date
    const sorted = [...examList].sort((a, b) => new Date(a.date) - new Date(b.date));
    onSave(sorted);
    sound.playSuccessChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-pink-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-pink-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-cute text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-500" />
              Configure CBSE Examination Timetable
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize subject dates, times, and syllabus status as per your official CBSE schedule.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-pink-100 bg-pink-50/40 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'list'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Manage Subjects ({examList.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'list' ? (
            <div className="space-y-3">
              {examList.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-2xl border border-pink-100 bg-pink-50/20 hover:bg-pink-50/40 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Subject</label>
                        <input
                          type="text"
                          value={exam.subject}
                          onChange={(e) => handleUpdateExam(exam.id, 'subject', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-sm bg-white rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-400 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Code</label>
                        <input
                          type="text"
                          value={exam.code}
                          onChange={(e) => handleUpdateExam(exam.id, 'code', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-sm bg-white rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Exam Date</label>
                        <input
                          type="date"
                          value={exam.date}
                          onChange={(e) => handleUpdateExam(exam.id, 'date', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-sm bg-white rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Syllabus Status</label>
                        <select
                          value={exam.syllabusStatus}
                          onChange={(e) => handleUpdateExam(exam.id, 'syllabusStatus', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-sm bg-white rounded-lg border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-400 font-medium text-pink-700"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Well Revised">Well Revised</option>
                          <option value="Exam Ready! ✨">Exam Ready! ✨</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteExam(exam.id)}
                      className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors self-end sm:self-center"
                      title="Remove subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">Day & Time: </span>
                      <span className="text-slate-700">{exam.day} • {exam.time}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Notes: </span>
                      <input
                        type="text"
                        value={exam.notes}
                        onChange={(e) => handleUpdateExam(exam.id, 'notes', e.target.value)}
                        placeholder="Add quick revision notes..."
                        className="w-full px-2 py-1 mt-0.5 text-xs bg-white rounded border border-pink-100 focus:outline-none text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddNewExam} className="space-y-4 max-w-lg mx-auto py-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subject Name</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Artificial Intelligence, French, Sanskrit"
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject Code</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. 417"
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Exam Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Day of Week</label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:30 AM – 01:30 PM"
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Syllabus Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Well Revised">Well Revised</option>
                  <option value="Exam Ready! ✨">Exam Ready! ✨</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Important Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key chapters, formulas to memorize..."
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 transition-all text-sm flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add to Timetable
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-pink-100 bg-pink-50/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Default CBSE Schedule (with Tamil)
          </button>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 text-sm flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Timetable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

