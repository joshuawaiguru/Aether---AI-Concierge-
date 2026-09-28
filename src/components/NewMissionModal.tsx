import React, { useState } from 'react';
import { Mission } from '../types';

interface NewMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMission: (mission: Mission) => void;
}

export const NewMissionModal: React.FC<NewMissionModalProps> = ({
  isOpen,
  onClose,
  onAddMission,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [time, setTime] = useState('14:00');
  const [category, setCategory] = useState('Aviation Charter');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMission: Mission = {
      id: `m-${Date.now()}`,
      time,
      category,
      status: 'Confirmed',
      statusBadgeColor: category.includes('Aviation') ? 'secondary' : 'primary',
      title,
      subtitle: subtitle || 'Dispatched via Aether Neural Console',
      badgeDetail: 'Clearance Granted #AET-NEW',
    };

    onAddMission(newMission);
    setTitle('');
    setSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#1f1f24]/95 border border-[#a078ff]/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#4cd7f6] mb-1">
          Bespoke Dispatch
        </span>
        <h3 className="text-xl font-bold text-white mb-4">Request New Mission or Task</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            >
              <option value="Aviation Charter">Aviation Charter (Helicopter / Jet)</option>
              <option value="Gastronomy Protocol">Gastronomy & Chef Table</option>
              <option value="Autonomous Residence">Autonomous Residence / Villa</option>
              <option value="Horology Acquisition">Haute Horlogerie Acquisition</option>
              <option value="Clinical Longevity">Clinical Longevity & Spa</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Mission Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIP Helipad Transfer to St. Moritz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Route / Details
            </label>
            <input
              type="text"
              placeholder="e.g. Samedan Airport (SMV) → Badrutt's Palace Suite"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Scheduled Time (CEST)
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#cbc3d7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-semibold text-xs shadow-[0_4px_16px_rgba(160,120,255,0.4)]"
            >
              Dispatch Mission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
