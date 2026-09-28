import React from 'react';
import { TabType } from '../types';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  activeTab: TabType;
  onOpenAudioVisualizer: () => void;
  onOpenProfile: () => void;
  isAudioActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenAudioVisualizer,
  onOpenProfile,
  isAudioActive = false,
}) => {
  const getSubTitle = () => {
    switch (activeTab) {
      case 'chat':
        return 'Concierge Chat';
      case 'itinerary':
        return 'Requests & Itinerary';
      case 'lounge':
        return 'Glass Experience Lounge';
      case 'services':
        return 'Lifestyle Services';
      default:
        return 'Concierge Protocol';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top,0px)] bg-[#121317]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="h-16 px-4 md:px-8 max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <img
            alt="Aether Glass Concierge Logo"
            className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(208,188,255,0.4)]"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <span className="text-[19px] leading-tight font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] via-[#acedff] to-[#d0bcff] drop-shadow-[0_0_14px_rgba(208,188,255,0.45)]">
              Aether
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#4cd7f6]">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAudioVisualizer}
            title="Biometric Acoustic Stream"
            aria-label="Toggle Biometric Acoustic Stream"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAudioActive
                ? 'bg-[#a078ff]/30 text-[#acedff] shadow-[0_0_18px_rgba(76,215,246,0.6)] ring-1 ring-[#4cd7f6]'
                : 'bg-[#1f1f24]/70 text-[#4cd7f6] hover:text-[#d0bcff] shadow-[0_0_15px_rgba(76,215,246,0.15)] hover:bg-[#292a2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              graphic_eq
            </span>
          </button>

          <button
            onClick={onOpenProfile}
            title="Julian - Platinum Tier Member"
            aria-label="Open Julian Profile"
            className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#d0bcff]/60 to-[#4cd7f6]/60 shadow-[0_0_16px_rgba(160,120,255,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            <img
              alt="Julian Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.profile}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4cd7f6] ring-2 ring-[#121317]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
