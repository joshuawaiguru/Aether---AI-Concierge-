import React, { useState } from 'react';
import { Mission } from '../types';
import { ASSETS } from '../data/mockData';

interface ItineraryViewProps {
  missions: Mission[];
  onRequestNewMission: () => void;
  onExportLedger: () => void;
  onModifyPreferences: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  missions,
  onRequestNewMission,
  onExportLedger,
  onModifyPreferences,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(26);

  // Penthouse Ambient Sanctuary states
  const [climate, setClimate] = useState(21.5);
  const [luminescence, setLuminescence] = useState(12);
  const [acoustics, setAcoustics] = useState('Starlight');

  const days = [
    { name: 'Thu', day: 24, dot: false },
    { name: 'Fri', day: 25, dot: true },
    { name: 'Today', day: 26, isToday: true },
    { name: 'Sun', day: 27, dot: true },
    { name: 'Mon', day: 28, dot: false },
    { name: 'Tue', day: 29, dot: false },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-0 pb-28 pt-20">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#d0bcff]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-widest">
            Bespoke Protocol
          </span>
          <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight">
            Today's Itinerary
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(76,215,246,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd7f6]" />
          </span>
          <span className="text-xs text-[#4cd7f6] font-semibold">
            {missions.length} Missions Active
          </span>
        </div>
      </div>

      {/* Date Picker Strip */}
      <div className="relative w-full mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
          {days.map((d) => {
            const isSelected = selectedDay === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`flex-shrink-0 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                  d.isToday
                    ? 'w-16 h-20 bg-gradient-to-b from-[#d0bcff]/30 to-[#a078ff]/40 text-white border border-[#a078ff]/50 shadow-[0_8px_24px_rgba(160,120,255,0.35)]'
                    : isSelected
                    ? 'w-14 h-20 bg-[#292a2e] text-white border border-[#4cd7f6]/40 shadow-md'
                    : 'w-14 h-20 bg-[#1f1f24]/70 text-[#958ea0] hover:text-white border border-white/5'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#958ea0]">
                  {d.name}
                </span>
                <span className="text-lg font-bold mt-0.5">{d.day}</span>
                {d.isToday ? (
                  <div className="w-2 h-2 rounded-full bg-[#4cd7f6] mt-1 shadow-[0_0_8px_#4cd7f6] animate-pulse" />
                ) : d.dot ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]/60 mt-1" />
                ) : (
                  <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Flight Radar Telemetry Widget */}
      <div className="relative w-full rounded-3xl bg-[#1a1b20]/80 backdrop-blur-2xl p-4 md:p-5 overflow-hidden border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#a078ff]/20 border border-[#d0bcff]/30 flex items-center justify-center text-[#d0bcff] shadow-[0_0_12px_rgba(208,188,255,0.25)]">
              <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Telemetry Feed</h3>
              <span className="text-xs text-[#cbc3d7]">Airbus ACH160 • Inbound Alpha-4</span>
            </div>
          </div>
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#292a2e] text-[#4cd7f6] tracking-widest font-bold uppercase border border-[#4cd7f6]/30">
            LIVE 284 KT
          </span>
        </div>

        {/* Vector Radar Viewport */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0d0e12] via-[#1a1b20] to-[#121317] border border-white/5">
          {/* Subtle Map Graticule Grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4cd7f6_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Flight Path SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 340 176">
            <path
              d="M 30 140 Q 170 30 300 65"
              stroke="rgba(208, 188, 255, 0.4)"
              strokeDasharray="4 4"
              strokeWidth="2"
            />
            <path
              d="M 30 140 Q 110 80 185 82"
              stroke="url(#cyanGlow)"
              strokeLinecap="round"
              strokeWidth="3.5"
            />
            <circle cx="185" cy="82" r="6" fill="#4cd7f6" className="shadow-[0_0_12px_#4cd7f6]">
              <animate attributeName="r" dur="2s" repeatCount="indefinite" values="5;7;5" />
            </circle>
            <defs>
              <linearGradient id="cyanGlow" x1="30" y1="140" x2="185" y2="82" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a078ff" />
                <stop offset="1" stopColor="#4cd7f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Radar HUD Badges */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between bg-[#0d0e12]/85 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">navigation</span>
              <span className="text-xs text-white font-medium">ETA Heliport: 19:18</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#d0bcff] text-[16px]">flight_takeoff</span>
              <span className="text-xs text-white font-mono font-medium">Alt 1,450 ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">calendar_today</span>
          <span className="text-base font-bold text-white tracking-tight">Mission Telemetry</span>
        </div>
        <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-semibold">
          CEST UTC+2
        </span>
      </div>

      {/* Mission Timeline Cards */}
      <div className="relative w-full space-y-4 mb-6">
        {/* Continuous Atmospheric Connector Line */}
        <div className="absolute left-[23px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[#4cd7f6] via-[#d0bcff] to-transparent opacity-30 pointer-events-none" />

        {missions.map((mission) => (
          <div key={mission.id} className="relative z-10 flex gap-3 md:gap-4">
            {/* Time Indicator Jewel */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
              <div className="w-12 h-12 rounded-full bg-[#292a2e]/90 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 shadow-[0_0_16px_rgba(76,215,246,0.25)]">
                <span className="text-[11px] font-mono font-bold text-[#acedff]">{mission.time}</span>
              </div>
            </div>

            {/* Mission Card Content */}
            <div className="flex-1 rounded-2xl bg-[#1f1f24]/80 backdrop-blur-xl p-4 border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#4cd7f6] font-bold">
                  {mission.category}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#03b5d3]/20 text-[#acedff] border border-[#4cd7f6]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
                  <span className="text-[10px] font-semibold">{mission.status}</span>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{mission.title}</h4>
                <p className="text-xs text-[#cbc3d7] mt-0.5">{mission.subtitle}</p>
              </div>

              {/* Photo Vessel if applicable */}
              {mission.image && (
                <div className="relative h-32 w-full rounded-xl overflow-hidden shadow-md border border-white/5">
                  <img
                    className="w-full h-full object-cover"
                    src={mission.image}
                    alt={mission.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/90 via-transparent to-transparent" />
                  {mission.badgeDetail && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#1f1f24]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">
                        {mission.id === 'm1' ? 'flight' : 'dinner_dining'}
                      </span>
                      <span className="text-xs text-white">{mission.badgeDetail}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Sommelier Pairing Note */}
              {mission.sommelierPairing && (
                <div className="rounded-xl bg-[#292a2e]/60 backdrop-blur-md p-3 flex items-start gap-2.5 border border-white/5">
                  <div className="w-7 h-7 rounded-full bg-[#f751a1]/30 flex items-center justify-center text-[#ffb0cd] flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[15px]">wine_bar</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#ffd9e4] font-bold">
                      Sommelier Pairing
                    </span>
                    <p className="text-xs text-[#cbc3d7] mt-0.5">
                      {mission.sommelierPairing.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Preferences Button */}
              {mission.id === 'm2' && (
                <button
                  onClick={onModifyPreferences}
                  className="w-full h-10 rounded-full bg-[#38393e]/60 hover:bg-[#38393e] border border-white/10 flex items-center justify-center gap-2 text-white hover:text-[#d0bcff] transition-all text-xs font-semibold active:scale-98"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Modify Request & Preferences</span>
                </button>
              )}

              {/* Bento Remote Bar for Penthouse Sanctuary */}
              {mission.id === 'm3' && (
                <div className="flex flex-col gap-2 pt-1">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Climate */}
                    <div className="rounded-xl bg-[#292a2e]/70 p-2.5 flex flex-col items-center justify-center text-center border border-white/5">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">
                        thermostat
                      </span>
                      <span className="text-xs font-mono font-bold text-white mt-1">
                        {climate.toFixed(1)}°C
                      </span>
                      <span className="text-[9px] uppercase text-[#958ea0]">Climate</span>
                    </div>

                    {/* Luminescence */}
                    <div className="rounded-xl bg-[#292a2e]/70 p-2.5 flex flex-col items-center justify-center text-center border border-white/5">
                      <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
                        flare
                      </span>
                      <span className="text-xs font-mono font-bold text-white mt-1">
                        {luminescence}% Violet
                      </span>
                      <span className="text-[9px] uppercase text-[#958ea0]">Luminescence</span>
                    </div>

                    {/* Acoustics */}
                    <div className="rounded-xl bg-[#292a2e]/70 p-2.5 flex flex-col items-center justify-center text-center border border-white/5">
                      <span className="material-symbols-outlined text-[#ffb0cd] text-[18px]">
                        graphic_eq
                      </span>
                      <span className="text-xs font-semibold text-white mt-1">{acoustics}</span>
                      <span className="text-[9px] uppercase text-[#958ea0]">Acoustics</span>
                    </div>
                  </div>

                  {/* Interactive Quick Sliders */}
                  <div className="p-3 rounded-xl bg-[#121317]/60 border border-white/5 flex flex-col gap-2 mt-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#958ea0]">Temp Calibration</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setClimate((c) => Math.max(18, c - 0.5))}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white"
                        >
                          -
                        </button>
                        <span className="text-white font-mono">{climate.toFixed(1)}°C</span>
                        <button
                          onClick={() => setClimate((c) => Math.min(26, c + 0.5))}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#958ea0]">Violet Luminescence</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLuminescence((l) => Math.max(0, l - 5))}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white"
                        >
                          -
                        </button>
                        <span className="text-white font-mono">{luminescence}%</span>
                        <button
                          onClick={() => setLuminescence((l) => Math.min(100, l + 5))}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#958ea0]">Acoustic Theme</span>
                      <div className="flex gap-1">
                        {['Starlight', 'Rain', 'Zen'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setAcoustics(theme)}
                            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              acoustics === theme
                                ? 'bg-[#ffb0cd] text-[#3e0022]'
                                : 'bg-white/5 text-[#cbc3d7]'
                            }`}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onRequestNewMission}
          className="w-full h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(160,120,255,0.4)] active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Request New Mission or Task</span>
        </button>

        <button
          onClick={onExportLedger}
          className="w-full h-13 py-3.5 px-6 rounded-full bg-[#292a2e]/80 hover:bg-[#343439] text-white hover:text-[#4cd7f6] font-bold text-sm flex items-center justify-center gap-2 border border-white/10 shadow-md active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">encrypted</span>
          <span>Export Encrypted Ledger (.aeth)</span>
        </button>
      </div>
    </div>
  );
};
