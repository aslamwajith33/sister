import React, { useState } from 'react';
import { Heart, Sparkles, Send, Mail, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerHeartConfetti, triggerPinkConfetti } from '../utils/confetti';

export default function BrothersMessage({
  config,
  onSendHug,
  hugsCount = 12
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [justHugged, setJustHugged] = useState(false);

  const handleHugClick = () => {
    onSendHug();
    sound.playSuccessChime();
    triggerHeartConfetti();
    setJustHugged(true);
    setTimeout(() => setJustHugged(false), 2000);
  };

  return (
    <section id="brother" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative floating hearts background */}
      <div className="absolute top-10 left-10 text-rose-300/40 text-4xl animate-float-slow pointer-events-none select-none">
        💖
      </div>
      <div className="absolute bottom-10 right-12 text-pink-300/50 text-5xl animate-float-slow [animation-delay:2s] pointer-events-none select-none">
        🌸
      </div>
      <div className="absolute top-1/2 left-4 text-pink-200/40 text-3xl animate-pulse-soft pointer-events-none select-none">
        ✨
      </div>
      <div className="absolute top-20 right-1/4 text-rose-200/50 text-2xl animate-float-slow [animation-delay:1s] pointer-events-none select-none">
        💕
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header as requested */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Special Note
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cute text-slate-800">
            A Little Message From Your Brother ❤️
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Written with all my heart for my favorite sister.
          </p>
        </div>

        {/* Emotionally Beautiful Letter Card */}
        <div className="bg-gradient-to-br from-pink-50/90 via-rose-50/80 to-pink-100/70 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border-2 border-pink-200/80 shadow-2xl shadow-rose-200/50 relative overflow-hidden text-center space-y-6">
          {/* Floral & Golden Corner Accents */}
          <div className="absolute top-3 left-4 text-pink-400 text-xl select-none">🌸</div>
          <div className="absolute top-3 right-4 text-pink-400 text-xl select-none">🌸</div>
          <div className="absolute bottom-3 left-4 text-rose-400 text-xl select-none">💖</div>
          <div className="absolute bottom-3 right-4 text-rose-400 text-xl select-none">💖</div>

          {/* Letter Envelope Graphic / Wax Seal */}
          <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-300/50 group cursor-pointer hover:scale-105 transition-transform"
               onClick={() => {
                 sound.playPop();
                 triggerHeartConfetti();
               }}>
            <Heart className="w-10 h-10 fill-white text-white animate-pulse" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center text-xs shadow">
              ✨
            </span>
          </div>

          {/* EXACT REQUIRED MESSAGE AS PER SPECIFICATION */}
          <div className="py-4 space-y-3 max-w-2xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-pink-200/80 shadow-inner space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold font-cute text-rose-600 tracking-tight leading-snug">
                "Dear sister, I believe in you. Give your best! ❤️"
              </h3>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto my-3" />

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Whenever you feel tired or stressed about the syllabus, take a gentle breath. Remember that no marksheet or exam hall can ever measure how smart, kind, and capable you are. Your brother is standing right beside you, cheering for every small step. You are destined for great things!
              </p>
            </div>
          </div>

          {/* Interactive Hug Counter Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleHugClick}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-sm hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl transition-all flex items-center gap-2 group active:scale-95"
            >
              <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              <span>Send Brother a Virtual Hug 🤗</span>
            </button>

            <div className="text-xs font-semibold text-rose-700 bg-rose-100/80 px-4 py-2.5 rounded-2xl border border-rose-200/80 flex items-center gap-1.5">
              <span>Hugs Exchanged: </span>
              <span className="font-black text-rose-900 font-cute text-sm">{hugsCount}</span>
              <span>💕</span>
            </div>
          </div>

          {justHugged && (
            <p className="text-xs font-bold text-rose-600 animate-bounce">
              Warmest bear hug delivered to your brother! 🤗✨
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

