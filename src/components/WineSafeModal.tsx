import React from 'react';
import { ASSETS } from '../data/mockData';

interface WineSafeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WineSafeModal: React.FC<WineSafeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#1f1f24]/95 border border-[#ffb0cd]/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#ffb0cd] text-[20px]">wine_bar</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffb0cd]">
            Geneva Vault Thermal Lock #AET-W88
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Domaine de la Romanée-Conti 2015</h3>

        {/* Safe Photo */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-white/10">
          <img
            src={ASSETS.wineSafe}
            alt="Wine Safe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f751a1]/30 text-[#ffd9e4] border border-[#ffb0cd]/30">
              12.4°C Vault Locked
            </span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-[#cbc3d7] mb-5">
          <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[#958ea0]">Bottle Provenance</span>
            <span className="font-semibold text-white">Domaine Direct Allocataire #00412</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[#958ea0]">Thermal Transit Lock</span>
            <span className="font-mono text-[#4cd7f6] font-bold">ARMED • GPS Tracked</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[#958ea0]">Destination</span>
            <span className="font-semibold text-white">St. Moritz Chalet Reception (19:45 CET)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#f751a1] to-[#6d3bd7] text-white text-xs font-bold shadow-[0_4px_16px_rgba(247,81,161,0.4)]"
        >
          Verify Thermal Seal
        </button>
      </div>
    </div>
  );
};
