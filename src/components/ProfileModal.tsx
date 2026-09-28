import React from 'react';
import { ASSETS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#1a1b20]/95 border border-[#d0bcff]/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(160,120,255,0.2)] flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Member Avatar */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#d0bcff] via-[#4cd7f6] to-[#f751a1] shadow-[0_0_24px_rgba(208,188,255,0.4)] mb-3">
          <img
            src={ASSETS.profile}
            alt="Julian"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-white">Julian Vance-Montague</h3>
        <div className="flex items-center gap-1.5 mt-1 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#acedff]">
            Aether Founder • Platinum Tier
          </span>
        </div>

        {/* Dossier Bento Details */}
        <div className="w-full space-y-2.5 text-left mb-5">
          <div className="p-3 rounded-2xl bg-[#121317]/80 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#958ea0]">Personal Clearance</span>
              <span className="text-xs font-semibold text-white">Class A-1 Diplomatic Air Corridor</span>
            </div>
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">verified_user</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#121317]/80 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#958ea0]">Geneva Escrow Account</span>
              <span className="text-xs font-mono font-semibold text-[#d0bcff]">$48,250,000 USD Liquid</span>
            </div>
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">account_balance</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#121317]/80 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#958ea0]">HUD Hardware Pairing</span>
              <span className="text-xs font-semibold text-white">Neural Optics Glass v2.4 (Synapse-Active)</span>
            </div>
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">glasses</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
        >
          Close Dossier
        </button>
      </div>
    </div>
  );
};
