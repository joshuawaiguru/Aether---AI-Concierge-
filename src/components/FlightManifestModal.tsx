import React from 'react';
import { ASSETS } from '../data/mockData';

interface FlightManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlightManifestModal: React.FC<FlightManifestModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#1f1f24]/95 border border-[#4cd7f6]/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">flight</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4cd7f6]">
            Flight Clearance #AET-992
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Gulfstream G650ER Manifest</h3>
        <p className="text-xs text-[#cbc3d7] mb-4">
          Airborne private corridor authorized by FAA & EASA. Transcontinental high-altitude profile.
        </p>

        {/* Route Card */}
        <div className="p-3.5 rounded-2xl bg-[#121317] border border-white/5 mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#958ea0]">Departure</span>
            <span className="text-sm font-bold text-white">Teterboro (TEB)</span>
            <span className="text-[10px] text-[#4cd7f6]">Private Terminal Ramp A</span>
          </div>
          <span className="material-symbols-outlined text-[#d0bcff]">arrow_forward</span>
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-[#958ea0]">Arrival</span>
            <span className="text-sm font-bold text-white">Aspen Pitkin (ASE)</span>
            <span className="text-[10px] text-[#4cd7f6]">VIP Hangar 4</span>
          </div>
        </div>

        {/* Flight Crew */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#958ea0]">
            Assigned Crew & Purser
          </span>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <img
              src={ASSETS.pilot}
              alt="Captain"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold text-white">Capt. Henri De Vries</span>
              <span className="text-[10px] text-[#cbc3d7]">Chief Pilot • 14,200 Flight Hours</span>
            </div>
            <span className="text-[10px] text-[#4cd7f6] font-semibold">Cleared</span>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <img
              src={ASSETS.attendant}
              alt="Purser"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold text-white">Elena Rostova</span>
              <span className="text-[10px] text-[#cbc3d7]">Lead Flight Purser & Sommelier</span>
            </div>
            <span className="text-[10px] text-[#4cd7f6] font-semibold">Cleared</span>
          </div>
        </div>

        {/* Cabin Pre-Conditioning */}
        <div className="p-3 rounded-2xl bg-[#121317] border border-white/5 flex items-center justify-between text-xs mb-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">ac_unit</span>
            <span className="text-[#cbc3d7]">Cabin Temp: <strong className="text-white">68°F</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">shield</span>
            <span className="text-[#cbc3d7]">Security: <strong className="text-[#acedff]">Diplomatic Safe</strong></span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
        >
          Close Manifest
        </button>
      </div>
    </div>
  );
};
