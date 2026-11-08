import React, { useState } from 'react';
import { X, Sparkles, Heart, User, Award } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerPinkConfetti } from '../utils/confetti';

export default function EditSisterModal({ isOpen, onClose, config, onSave }) {
  const [sisterName, setSisterName] = useState(config?.sisterName || 'Afra Shahnaas');
  const [brotherName, setBrotherName] = useState(config?.brotherName || 'Bhaiya');
  const [boardTarget, setBoardTarget] = useState(config?.boardTarget || '95%+');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sisterName.trim()) return;
    onSave({
      ...config,
      sisterName: sisterName.trim(),
      brotherName: brotherName.trim() || 'Bhaiya',
      boardTarget: boardTarget.trim() || '95%+'
    });
    sound.playSuccessChime();
    triggerPinkConfetti();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/30 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-cute text-slate-800">Personalize Your Journey 🌸</h3>
            <p className="text-xs text-pink-600 font-medium">Made especially for you with endless love</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-500" /> Sister's Name
            </label>
            <input
              type="text"
              value={sisterName}
              onChange={(e) => setSisterName(e.target.value)}
              placeholder="e.g. Ananya, Diya, Priya"
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 text-slate-800 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> Brother's Nickname / Title
            </label>
            <input
              type="text"
              value={brotherName}
              onChange={(e) => setBrotherName(e.target.value)}
              placeholder="e.g. Bhaiya, Anna, Bro"
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Board Target Goal
            </label>
            <input
              type="text"
              value={boardTarget}
              onChange={(e) => setBoardTarget(e.target.value)}
              placeholder="e.g. 95%+, 98%, Full A1 Grade"
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 text-slate-800 font-medium"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 transition-all text-sm flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

