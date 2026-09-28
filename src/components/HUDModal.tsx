import React, { useState, useEffect } from 'react';
import { ShaderPreset } from '../types';

interface HUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: ShaderPreset;
}

export const HUDModal: React.FC<HUDModalProps> = ({ isOpen, onClose, preset }) => {
  const [progress, setProgress] = useState(0);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setSynced(false);
      return;
    }
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setSynced(true);
          return 100;
        }
        return p + 20;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#121317]/95 border border-[#4cd7f6]/40 p-6 shadow-[0_0_50px_rgba(76,215,246,0.3)] flex flex-col items-center text-center overflow-hidden">
        {/* Prismatic Top Highlight */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#4cd7f6] to-transparent shadow-[0_0_12px_#4cd7f6]" />

        <div className="w-16 h-16 rounded-full bg-[#1f1f24] border border-[#acedff]/30 shadow-[0_0_20px_rgba(76,215,246,0.4)] flex items-center justify-center mb-4">
          <span className={`material-symbols-outlined text-[32px] text-[#4cd7f6] ${!synced ? 'animate-spin' : ''}`}>
            {synced ? 'check_circle' : 'sync'}
          </span>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#acedff] mb-1">
          {synced ? 'Sync Complete • 120Hz' : 'Transmitting Optic Shader'}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">
          {preset.name} → Eyewear
        </h3>
        <p className="text-xs text-[#cbc3d7] mb-6">
          {synced
            ? 'Physical surface refractance and edge caustics calibrated to your retinal focal matrix.'
            : 'Beam-forming calibrated wavefront to HUD display profile (ID: AET-HUD-09)...'}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-[#a078ff] via-[#4cd7f6] to-[#d0bcff] transition-all duration-300 shadow-[0_0_10px_#4cd7f6]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Calibrated Telemetry Matrix */}
        <div className="grid grid-cols-2 gap-2 w-full mb-6 text-left">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">Edge Specular</span>
            <div className="text-xs font-mono font-bold text-[#d0bcff]">{preset.edge.toFixed(3)}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">Rim Caustics</span>
            <div className="text-xs font-mono font-bold text-[#4cd7f6]">{preset.rim.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">Turbulence</span>
            <div className="text-xs font-mono font-bold text-[#d0bcff]">{preset.distort.toFixed(3)}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">Gaussian Blur</span>
            <div className="text-xs font-mono font-bold text-[#4cd7f6]">{preset.blur.toFixed(1)}px</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-semibold text-xs shadow-[0_0_20px_rgba(160,120,255,0.4)] active:scale-95 transition-transform"
        >
          {synced ? 'Dismiss Telemetry' : 'Cancel Sync'}
        </button>
      </div>
    </div>
  );
};
