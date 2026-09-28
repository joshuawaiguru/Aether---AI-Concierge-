import React, { useState } from 'react';

interface ModifyPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences: (wine: string, note: string) => void;
}

export const ModifyPreferencesModal: React.FC<ModifyPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
}) => {
  const [wine, setWine] = useState('Domaine de la Romanée-Conti 2015');
  const [prep, setPrep] = useState('Rare white truffle prelude pre-decanted. Caviar service at 12°C.');
  const [dietary, setDietary] = useState('Strict zero gluten, wild white Alba truffles only.');

  if (!isOpen) return null;

  const handleSave = () => {
    onSavePreferences(wine, `${prep} Note: ${dietary}`);
    onClose();
  };

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
            Gastronomy Protocol
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Modify Salon Privé Preferences</h3>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Curated Grand Cru Pairing
            </label>
            <select
              value={wine}
              onChange={(e) => setWine(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
            >
              <option value="Domaine de la Romanée-Conti 2015">Domaine de la Romanée-Conti 2015</option>
              <option value="Château Cheval Blanc 2010">Château Cheval Blanc 2010</option>
              <option value="Pétrus 2005 Premier Cru">Pétrus 2005 Premier Cru</option>
              <option value="Dom Pérignon P2 Plénitude 2004">Dom Pérignon P2 Plénitude 2004</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Sommelier Cellar Protocol
            </label>
            <textarea
              rows={2}
              value={prep}
              onChange={(e) => setPrep(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Bespoke Culinary Directives
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffb0cd]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#cbc3d7]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 py-2.5 rounded-full bg-gradient-to-r from-[#f751a1] to-[#6d3bd7] text-white font-semibold text-xs shadow-[0_4px_16px_rgba(247,81,161,0.4)]"
          >
            Update Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
