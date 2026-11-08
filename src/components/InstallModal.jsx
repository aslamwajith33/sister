import React, { useState } from 'react';
import { X, Smartphone, Download, Check, Sparkles, Share, MoreVertical } from 'lucide-react';
import { sound } from '../utils/sound';

export default function InstallModal({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallSuccess,
  sisterName = 'Afra Shahnaas'
}) {
  const [activeTab, setActiveTab] = useState('android'); // 'android' | 'ios' | 'pc'
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          sound.playSuccessChime();
          onInstallSuccess();
          onClose();
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      } finally {
        setIsInstalling(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-pink-200 relative overflow-hidden space-y-5">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-amber-300" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center text-3xl mx-auto shadow-md shadow-pink-200 mb-2">
            🌸
          </div>
          <h3 className="text-xl font-black font-cute text-slate-800">
            Install {sisterName}'s App 📲
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Use this study companion as an actual app on your phone with instant access and full screen!
          </p>
        </div>

        {/* Direct One-Click Install Button if supported */}
        {deferredPrompt && (
          <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200 text-center space-y-2">
            <button
              onClick={handleNativeInstall}
              disabled={isInstalling}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>{isInstalling ? 'Installing...' : 'Install App to Home Screen ✨'}</span>
            </button>
            <p className="text-[11px] text-pink-700 font-semibold">
              Instant 1-Click Install for Android & Chrome!
            </p>
          </div>
        )}

        {/* Platform Selector Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('android');
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'android'
                ? 'bg-white text-pink-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🤖 Android Phone
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('ios');
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'ios'
                ? 'bg-white text-pink-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🍎 iPhone / iPad
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('pc');
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'pc'
                ? 'bg-white text-pink-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            💻 Laptop / PC
          </button>
        </div>

        {/* Platform Step-by-Step Instructions */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2.5">
          {activeTab === 'android' && (
            <>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>
                  In Chrome on your Android phone, tap the <strong>three dots (⋮)</strong> menu in the top right.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>
                  Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>
                  Tap <strong>Install</strong>. The app icon 🌸 will appear on your home screen like any Play Store app!
                </p>
              </div>
            </>
          )}

          {activeTab === 'ios' && (
            <>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>
                  Open this link in <strong>Safari</strong> on your iPhone or iPad.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>
                  Tap the <strong>Share button</strong> <Share className="w-3.5 h-3.5 inline text-blue-500" /> at the bottom of the screen.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>
                  Scroll down and tap <strong>"Add to Home Screen"</strong> ➕, then tap <strong>Add</strong>!
                </p>
              </div>
            </>
          )}

          {activeTab === 'pc' && (
            <>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>
                  In Chrome or Edge, look at the right side of the address bar at the top.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>
                  Click the <strong>Install app</strong> icon <strong>(⊕)</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>
                  Click <strong>Install</strong> to run as a clean desktop window without browser tabs!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Benefits footer */}
        <div className="flex items-center justify-around text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1">⚡ Fast & Offline</span>
          <span className="flex items-center gap-1">📱 Fullscreen App</span>
          <span className="flex items-center gap-1">🔒 100% Private</span>
        </div>
      </div>
    </div>
  );
}
