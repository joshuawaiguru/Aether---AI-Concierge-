import React, { useState } from 'react';
import { LuxuryService } from '../types';

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: LuxuryService | null;
  onConfirmAction: (service: LuxuryService, confirmationNote: string) => void;
}

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  isOpen,
  onClose,
  service,
  onConfirmAction,
}) => {
  const [guestCount, setGuestCount] = useState('2');
  const [specialNote, setSpecialNote] = useState('Ensure direct ramp transfer and discretion.');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !service) return null;

  const handleAction = () => {
    setConfirmed(true);
    setTimeout(() => {
      onConfirmAction(service, `Reserved for ${guestCount} guests. Note: ${specialNote}`);
      setConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#1f1f24]/95 border border-[#d0bcff]/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col text-left overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Thumbnail Preview */}
        <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#4cd7f6]/20 text-[#acedff] border border-[#4cd7f6]/30">
              {service.statusBadge}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-xl font-bold text-[#d0bcff]">{service.price}</span>
          <span className="text-xs text-[#cbc3d7]">{service.pricePeriod}</span>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Party / Passenger Count
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            >
              <option value="1">1 Principal Guest</option>
              <option value="2">2 Guests (Principal + Companion)</option>
              <option value="4">4 Guests (Private Delegation)</option>
              <option value="8">8 Guests (Full Party)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#958ea0] block mb-1">
              Discretion & Concierge Instructions
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full bg-[#121317] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a078ff]"
            />
          </div>
        </div>

        <button
          onClick={handleAction}
          disabled={confirmed}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(160,120,255,0.4)] active:scale-95 transition-all"
        >
          {confirmed ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Encrypted Settlement Locked...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">{service.actionIcon}</span>
              <span>Confirm {service.actionLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
