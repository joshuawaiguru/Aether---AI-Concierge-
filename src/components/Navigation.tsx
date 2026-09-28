import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'chat', label: 'Chat', icon: 'chat_bubble' },
    { id: 'itinerary', label: 'Itinerary', icon: 'flight_takeoff' },
    { id: 'lounge', label: 'Lounge', icon: 'view_in_ar' },
    { id: 'services', label: 'Services', icon: 'diamond' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom,0px)] pointer-events-none flex justify-center px-4 pb-4">
      <div className="pointer-events-auto h-16 w-full max-w-md px-1.5 rounded-full bg-[#292a2e]/75 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85),0_0_24px_0_rgba(139,92,246,0.25)] flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-3 rounded-full transition-all duration-300 gap-0.5 ${
                isActive
                  ? 'text-[#e9ddff] bg-[#a078ff]/30 border border-[#d0bcff]/30 shadow-[0_0_24px_rgba(208,188,255,0.4)]'
                  : 'text-[#cbc3d7]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'scale-110 text-[#acedff]' : ''} transition-transform`}>
                {tab.icon}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
