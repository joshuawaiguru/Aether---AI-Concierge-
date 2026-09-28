import React, { useState } from 'react';
import { Mission } from '../types';

interface LedgerExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: Mission[];
}

export const LedgerExportModal: React.FC<LedgerExportModalProps> = ({
  isOpen,
  onClose,
  missions,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const ledgerPayload = JSON.stringify(
    {
      protocol: 'AETHER-ENCRYPTED-LEDGER-V2.4',
      client_id: 'JULIAN-PLATINUM-009',
      cipher: 'AES-256-GCM',
      timestamp: new Date().toISOString(),
      escrow_hash: '0x8f2d4e8c1b9a76d3f0e1c2a3b4c5d6e7f8a9b0c1',
      active_telemetry: {
        flight_radar: 'ACH160-LIVE-284KT',
        altitude_ft: 1450,
        eta: '19:18 CEST',
      },
      missions: missions.map((m) => ({
        id: m.id,
        time: m.time,
        category: m.category,
        title: m.title,
        status: m.status,
      })),
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(ledgerPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ledgerPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aether_ledger_${Date.now()}.aeth`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1f1f24]/95 border border-[#4cd7f6]/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbc3d7]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">encrypted</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4cd7f6]">
            Cryptographic Private Ledger (.aeth)
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Export Encrypted Ledger</h3>
        <p className="text-xs text-[#cbc3d7] mb-4">
          All personal missions, airspace clearances, and escrow reservations signed with private zero-knowledge encryption key.
        </p>

        {/* Code / JSON Box */}
        <div className="p-3 rounded-xl bg-[#121317] border border-white/5 font-mono text-[11px] text-[#acedff] max-h-48 overflow-y-auto mb-4">
          <pre className="whitespace-pre-wrap">{ledgerPayload}</pre>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy Payload'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#03b5d3] to-[#4cd7f6] text-[#003640] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(76,215,246,0.4)]"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download .aeth</span>
          </button>
        </div>
      </div>
    </div>
  );
};
