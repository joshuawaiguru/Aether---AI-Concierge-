import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ShaderPreset } from '../types';
import { ASSETS, SHADER_PRESETS } from '../data/mockData';

interface ChatViewProps {
  onTransmitToHUD: (preset: ShaderPreset) => void;
  onOpenFlightManifest: () => void;
  onOpenWineSafe: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  onTransmitToHUD,
  onOpenFlightManifest,
  onOpenWineSafe,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'aether',
      text: 'Good evening, Julian. All clearances for the ACH160 and Courchevel altisurface are authenticated. How may Aether attend to your evening?',
      timestamp: '19:15',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedItem, setScannedItem] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.onstart = () => setSpeechActive(true);
      utterance.onend = () => setSpeechActive(false);
      utterance.onerror = () => setSpeechActive(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const replyText =
        data.reply ||
        'Telemetry locked, Julian. Your concierge directive has been logged into the encrypted ledger.';

      const aetherMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'aether',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aetherMsg]);
      speakText(replyText);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'aether',
        text: 'Directive synchronized to your private flight and residence ledger. Aether stands by for subsequent instructions.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback mock voice prompt
      setIsListening(!isListening);
      if (!isListening) {
        setInputText('Confirm helicopter pre-flight and dispatch sommelier notes.');
      }
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSend(transcript);
        }
      };

      if (!isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } catch {
      setIsListening(!isListening);
    }
  };

  const triggerScanner = () => {
    setScannerActive(true);
    setTimeout(() => {
      setScannedItem('Domaine de la Romanée-Conti 2015 [Serial: DRC-9921-VERIFIED]');
      setScannerActive(false);
      handleSend('Verify authenticity of scanned DRC 2015 Grand Cru serial DRC-9921-VERIFIED');
    }, 1500);
  };

  const suggestedIntents = [
    { label: 'Book Private Helicopter to Aspen', icon: 'helicopter', color: 'primary' },
    { label: "Reserve Chef's Table at Mirazur", icon: 'restaurant', color: 'secondary' },
    { label: 'Analyze Q3 Portfolio Liquidity', icon: 'finance_mode', color: 'primary' },
    { label: 'Schedule Hyperbaric Chamber', icon: 'spa', color: 'tertiary' },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-0 pb-36 pt-20">
      {/* Ambient Halos */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#a078ff]/15 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-96 -right-16 w-64 h-64 rounded-full bg-[#03b5d3]/15 blur-[80px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <header className="flex flex-col gap-1.5 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292a2e]/70 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.9)]" />
            <span className="text-[10px] tracking-widest text-[#4cd7f6] font-bold uppercase">
              ONLINE • NEURAL GLASS V2.4
            </span>
          </span>
          <span className="text-[10px] text-[#958ea0] font-medium tracking-wider">
            LATENCY 14MS
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          Good evening, Julian. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] via-[#e9ddff] to-[#4cd7f6] drop-shadow-[0_2px_14px_rgba(208,188,255,0.4)]">
            Aether is ready.
          </span>
        </h1>
        <p className="text-xs text-[#cbc3d7] max-w-md">
          Private aviation clearance active. 3 autonomous concierge threads synchronized to your biometrics.
        </p>
      </header>

      {/* Refraction Soundwave & Holographic Core Orb Card */}
      <section className="relative w-full rounded-3xl p-6 overflow-hidden bg-[#1f1f24]/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-[#a078ff]/5 to-[#03b5d3]/10 pointer-events-none" />
        <div className="absolute -top-24 -right-16 w-52 h-52 rounded-full bg-[#d0bcff]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 py-2">
          {/* Holographic Voice Core Orb */}
          <button
            onClick={() => handleSend('Aether, summarize active mission telemetry and departure clearances.')}
            className="group relative w-36 h-36 flex items-center justify-center focus:outline-none"
            title="Tap to query Aether"
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#a078ff]/40 via-[#03b5d3]/30 to-[#f751a1]/30 blur-md ${
                speechActive ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '10s' }}
            />
            <div className="absolute inset-2 rounded-full bg-[#0d0e12]/80 backdrop-blur-2xl shadow-[inset_0_0_24px_rgba(76,215,246,0.35),0_0_30px_rgba(208,188,255,0.3)] border border-white/10" />

            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-b from-[#d0bcff]/30 to-[#4cd7f6]/20 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_8px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[36px] text-[#d0bcff] drop-shadow-[0_0_12px_rgba(208,188,255,0.8)]">
                {speechActive ? 'graphic_eq' : 'blur_on'}
              </span>
            </div>

            <div className="absolute top-4 left-7 w-5 h-2.5 rounded-full bg-white/70 blur-[1px] rotate-[-28deg] pointer-events-none" />
          </button>

          {/* Waveform Capsule */}
          <div className="w-full max-w-[260px] h-10 px-4 rounded-full bg-[#292a2e]/80 backdrop-blur-2xl flex items-center justify-center gap-1.5 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <span className="w-1 h-3 rounded-full bg-[#4cd7f6]/80 animate-pulse" />
            <span className="w-1 h-5 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span className="w-1 h-7 rounded-full bg-[#d0bcff] animate-pulse" />
            <span className="w-1 h-4 rounded-full bg-[#a078ff] animate-pulse" />
            <span className="w-1 h-6 rounded-full bg-[#e9ddff] animate-pulse" />
            <span className="w-1 h-8 rounded-full bg-[#acedff] animate-pulse" />
            <span className="w-1 h-5 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span className="w-1 h-3 rounded-full bg-[#d0bcff]/70 animate-pulse" />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-white font-bold tracking-wide">
              {speechActive ? '"Aether speaking..."' : '"Listening for intent..."'}
            </p>
            <span className="text-[11px] text-[#cbc3d7]">
              Awaiting whisper, gaze anchor, or quick directive
            </span>
          </div>
        </div>
      </section>

      {/* Suggested Intents Chips */}
      <section className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#958ea0]">
            SUGGESTED INTENTS
          </span>
          <span className="text-[10px] text-[#4cd7f6] font-bold flex items-center gap-1">
            <span>CURATED</span>
            <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestedIntents.map((intent, i) => (
            <button
              key={i}
              onClick={() => handleSend(intent.label)}
              className="px-3.5 py-2 rounded-full bg-[#292a2e]/70 hover:bg-[#343439] backdrop-blur-xl text-white text-xs font-medium border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center gap-2 active:scale-95 transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-[#a078ff]/20 flex items-center justify-center text-[#d0bcff]">
                <span className="material-symbols-outlined text-[15px]">{intent.icon}</span>
              </span>
              <span>{intent.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Active Dispatch & Concierge Cards */}
      <section className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#958ea0]">
            ACTIVE DISPATCH & CONCIERGE CARDS
          </span>
          <span className="text-xs text-[#4cd7f6] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
            2 Live Threads
          </span>
        </div>

        {/* Card 1: Gulfstream G650ER Telemetry */}
        <article className="relative w-full rounded-3xl p-5 bg-[#1f1f24]/75 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.55)] flex flex-col gap-3.5 overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#a078ff]/30 border border-[#d0bcff]/40 flex items-center justify-center text-[#e9ddff]">
                <span className="material-symbols-outlined text-[22px]">flight_takeoff</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">Gulfstream G650ER</span>
                <span className="text-xs text-[#cbc3d7]">Teterboro (TEB) → Aspen Pitkin (ASE)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#03b5d3]/20 text-[#acedff] text-[10px] font-bold uppercase tracking-wider border border-[#4cd7f6]/30">
              T-MINUS 2H 15M
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs text-[#cbc3d7]">
              <span>Cabin Pre-Conditioned: 68°F</span>
              <span className="text-[#4cd7f6] font-semibold">Clearance Granted #AET-992</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#343439] overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#d0bcff] via-[#4cd7f6] to-[#d0bcff] shadow-[0_0_10px_#4cd7f6]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center -space-x-2">
              <img
                src={ASSETS.pilot}
                alt="Pilot"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#1f1f24]"
              />
              <img
                src={ASSETS.attendant}
                alt="Attendant"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#1f1f24]"
              />
              <span className="w-7 h-7 rounded-full bg-[#292a2e] flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-[#1f1f24]">
                +1
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenFlightManifest}
                className="h-9 px-4 rounded-full bg-[#292a2e] hover:bg-[#343439] text-white hover:text-[#d0bcff] text-xs font-semibold flex items-center gap-1 border border-white/10"
              >
                <span>Manifest</span>
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
              <button
                onClick={() => onTransmitToHUD(SHADER_PRESETS.apple)}
                className="h-9 px-4 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white text-xs font-bold shadow-[0_4px_16px_rgba(160,120,255,0.4)] active:scale-95 transition-transform"
              >
                Handoff to Glass
              </button>
            </div>
          </div>
        </article>

        {/* Card 2: DRC Vault Card */}
        <article className="relative w-full rounded-3xl p-5 bg-[#1f1f24]/75 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.55)] flex flex-col gap-3.5 overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#f751a1]/30 border border-[#ffb0cd]/40 flex items-center justify-center text-[#ffd9e4]">
                <span className="material-symbols-outlined text-[22px]">wine_bar</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">Domaine de la Romanée-Conti</span>
                <span className="text-xs text-[#cbc3d7]">Acquisition Secured • Cellar Vintage 2015</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#f751a1]/20 text-[#ffd9e4] text-[10px] font-bold uppercase tracking-wider border border-[#ffb0cd]/30">
              VAULT DISPATCH
            </span>
          </div>

          <div
            onClick={onOpenWineSafe}
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#292a2e]/60 hover:bg-[#292a2e] cursor-pointer transition-colors border border-white/5"
          >
            <img
              src={ASSETS.wineSafe}
              alt="Wine Safe"
              className="w-12 h-12 rounded-xl object-cover shadow-md"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate">
                Curated for St. Moritz Chalet Reception
              </span>
              <span className="text-[11px] text-[#cbc3d7]">
                Courier thermal lock armed • ETA 19:45 CET
              </span>
            </div>
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">verified</span>
          </div>
        </article>
      </section>

      {/* Live Conversation Stream */}
      <section className="flex flex-col gap-3 mb-6">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#958ea0] px-1">
          CONCIERGE DIALOGUE
        </span>
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#a078ff] text-white shadow-[0_4px_16px_rgba(160,120,255,0.3)]'
                    : 'bg-[#1f1f24]/90 text-[#e3e2e8] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                {m.sender === 'aether' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#4cd7f6]">
                      Aether Neural Concierge
                    </span>
                  </div>
                )}
                <p>{m.text}</p>
              </div>
              <span className="text-[9px] text-[#958ea0] mt-1 px-2 font-mono">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1f1f24]/70 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
              <span className="text-xs text-[#cbc3d7]">Aether formulating bespoke directive...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </section>

      {/* Docked Liquid Glass Input Console */}
      <div className="fixed bottom-20 inset-x-4 max-w-2xl mx-auto z-40">
        <div className="w-full p-2 rounded-full bg-[#292a2e]/90 backdrop-blur-3xl border border-white/15 shadow-[0_16px_40px_-5px_rgba(0,0,0,0.9),0_0_25px_0_rgba(160,120,255,0.3)] flex items-center gap-2">
          {/* Mic Button */}
          <button
            onClick={toggleMic}
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
              isListening
                ? 'bg-gradient-to-tr from-[#f751a1] to-[#6d3bd7] ring-4 ring-[#4cd7f6]/60 animate-pulse'
                : 'bg-gradient-to-tr from-[#a078ff] to-[#03b5d3] hover:scale-105 active:scale-95'
            }`}
            title="Voice input"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isListening ? 'mic' : 'mic'}
            </span>
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Speak to Aether or enter request..."
            className="flex-1 bg-transparent text-white placeholder-[#958ea0] text-xs focus:outline-none px-2 font-medium"
          />

          {/* Vision Scanner Button */}
          <button
            onClick={triggerScanner}
            className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/10 transition-colors ${
              scannerActive
                ? 'bg-[#4cd7f6] text-[#003640] animate-pulse'
                : 'bg-white/5 text-[#cbc3d7] hover:text-[#4cd7f6] hover:bg-white/10'
            }`}
            title="Scan Luxury Asset / Provenance"
          >
            <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
          </button>

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] flex items-center justify-center shadow-[0_4px_16px_rgba(208,188,255,0.4)] active:scale-95 transition-all"
            title="Send directive"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
