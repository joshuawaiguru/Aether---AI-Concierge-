import React, { useState, useEffect } from 'react';

interface AudioVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeakPrompt: (text: string) => void;
}

export const AudioVisualizerModal: React.FC<AudioVisualizerModalProps> = ({
  isOpen,
  onClose,
  onSpeakPrompt,
}) => {
  const [pulseLevel, setPulseLevel] = useState(1);
  const [bars, setBars] = useState<number[]>([40, 65, 85, 45, 70, 95, 60, 35, 75, 50, 80, 60]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPulseLevel(Math.random() * 0.4 + 0.8);
      setBars((prev) =>
        prev.map(() => Math.floor(Math.random() * 70 + 25))
      );
    }, 180);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1f1f24]/95 border border-[#a078ff]/30 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(160,120,255,0.25)] p-6 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Pulse Orb */}
        <div className="relative my-4 flex items-center justify-center">
          <div
            className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#a078ff]/30 via-[#03b5d3]/30 to-[#f751a1]/20 blur-xl transition-all duration-200"
            style={{ transform: `scale(${pulseLevel * 1.3})` }}
          />
          <div className="absolute w-20 h-20 rounded-full bg-[#121317]/90 border border-[#acedff]/40 shadow-[inset_0_0_20px_rgba(76,215,246,0.5),0_0_25px_rgba(208,188,255,0.4)] flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px] text-[#4cd7f6] animate-pulse">
              graphic_eq
            </span>
          </div>
        </div>

        <span className="text-[11px] uppercase font-bold tracking-widest text-[#4cd7f6] mb-1">
          Acoustic Resonance Active
        </span>
        <h3 className="text-xl font-bold text-white mb-2">Neural Audio Stream</h3>
        <p className="text-xs text-[#cbc3d7] mb-5 max-w-xs">
          Direct bidirectional voice synthesis tuned to 24kHz spatial optics. Whisper directives or tap an action below.
        </p>

        {/* Real-time Equalizer Waveform */}
        <div className="w-full h-16 flex items-end justify-center gap-1.5 px-4 mb-6 bg-[#121317]/60 rounded-xl border border-white/5 py-2">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-2 rounded-full transition-all duration-150"
              style={{
                height: `${height}%`,
                background:
                  i % 3 === 0
                    ? 'linear-gradient(to top, #03b5d3, #acedff)'
                    : i % 2 === 0
                    ? 'linear-gradient(to top, #a078ff, #d0bcff)'
                    : 'linear-gradient(to top, #f751a1, #ffd9e4)',
              }}
            />
          ))}
        </div>

        {/* Quick Voice Directives */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={() => {
              onSpeakPrompt('Pre-cool helicopter cabin and verify pilot flight plan.');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#a078ff]/20 text-xs text-[#e3e2e8] border border-white/10 flex items-center justify-between transition-colors"
          >
            <span>"Pre-cool helicopter cabin and verify pilot."</span>
            <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">send</span>
          </button>
          <button
            onClick={() => {
              onSpeakPrompt('Inquire allocation for AP Royal Oak Perpetual Calendar.');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#a078ff]/20 text-xs text-[#e3e2e8] border border-white/10 flex items-center justify-between transition-colors"
          >
            <span>"Inquire allocation for AP Royal Oak."</span>
            <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
