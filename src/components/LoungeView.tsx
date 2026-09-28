import React, { useState } from 'react';
import { ShaderPreset } from '../types';
import { SHADER_PRESETS, ASSETS } from '../data/mockData';

interface LoungeViewProps {
  onTransmitToHUD: (preset: ShaderPreset) => void;
}

export const LoungeView: React.FC<LoungeViewProps> = ({ onTransmitToHUD }) => {
  const [activePresetKey, setActivePresetKey] = useState<string>('apple');
  const [shape, setShape] = useState<'rounded-rect' | 'pill' | 'circle'>('rounded-rect');

  // Slider values
  const [edge, setEdge] = useState(0.04);
  const [rim, setRim] = useState(0.12);
  const [distort, setDistort] = useState(0.02);
  const [ripple, setRipple] = useState(0.18);
  const [blur, setBlur] = useState(8.5);
  const [tint, setTint] = useState(0.35);

  const [copied, setCopied] = useState(false);

  const selectPreset = (key: string) => {
    setActivePresetKey(key);
    const p = SHADER_PRESETS[key];
    if (p) {
      setEdge(p.edge);
      setRim(p.rim);
      setDistort(p.distort);
      setRipple(p.ripple);
      setBlur(p.blur);
      setTint(p.tint);
      if (p.shape) setShape(p.shape);
    }
  };

  const restoreDefaults = () => {
    selectPreset('apple');
  };

  const getShapeClasses = () => {
    switch (shape) {
      case 'pill':
        return 'w-5/6 max-w-xs rounded-full';
      case 'circle':
        return 'w-48 h-48 rounded-full';
      default:
        return 'w-5/6 max-w-xs rounded-2xl';
    }
  };

  const codeSnippet = `import { Container } from 'liquid-glass-js';

const glassCard = new Container({
  shape: '${shape}',
  edgeIntensity: ${edge.toFixed(3)},
  rimDistance: ${rim.toFixed(2)},
  distortion: ${distort.toFixed(3)},
  surfaceTexture: ${ripple.toFixed(2)},
  blurRadius: ${blur.toFixed(1)},
  tintOpacity: ${tint.toFixed(2)},
  chromaticDispersion: true
});

glassCard.attach('#preview-anchor');`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentPreset: ShaderPreset = {
    id: activePresetKey,
    name: SHADER_PRESETS[activePresetKey]?.name || 'Custom Glass',
    edge,
    rim,
    distort,
    ripple,
    blur,
    tint,
    shape,
  };

  const feTurbFreq = (distort + ripple * 0.05).toFixed(3);
  const feDispScale = (distort * 500 + rim * 30).toFixed(1);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-0 pb-28 pt-20">
      {/* SVG Liquid Refraction Filter */}
      <svg aria-hidden="true" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="liquidGlassFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={feTurbFreq}
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={feDispScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top Engine Banner */}
      <div className="relative w-full mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_rgba(76,215,246,0.8)] animate-pulse" />
            <span className="text-[10px] text-[#4cd7f6] uppercase tracking-widest font-bold">
              Optic Shader Engine v2.4
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292a2e]/80 text-[#cbc3d7] text-[10px] font-semibold border border-white/5">
            <span className="material-symbols-outlined text-[13px] text-[#4cd7f6]">memory</span>
            <span>60 FPS WebGL</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          Liquid Glass Lounge
        </h1>
        <p className="text-xs text-[#cbc3d7] mt-1">
          Sculpt physical optics, surface refractance, and caustic chromatic dispersion in real time.
        </p>
      </div>

      {/* Shader Presets Horizontal Pill Scroll */}
      <div className="w-full mb-6 overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar">
        {Object.entries(SHADER_PRESETS).map(([key, p]) => {
          const isActive = activePresetKey === key;
          return (
            <button
              key={key}
              onClick={() => selectPreset(key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all duration-300 ${
                isActive
                  ? 'bg-[#a078ff] text-white shadow-[0_0_20px_rgba(160,120,255,0.5)] border border-[#d0bcff]/40'
                  : 'bg-[#292a2e]/90 text-[#cbc3d7] hover:text-white border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {key === 'apple'
                  ? 'auto_awesome'
                  : key === 'frosted'
                  ? 'grain'
                  : key === 'mercury'
                  ? 'water_drop'
                  : 'flare'}
              </span>
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Live Preview Canvas Card */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#0d0e12] p-4 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.9)] mb-6 border border-white/10">
        <div className="relative w-full h-80 rounded-2xl overflow-hidden flex items-center justify-center p-4 select-none bg-gradient-to-tr from-[#121317] via-[#0d0e12] to-[#121317]">
          {/* Kinetic Ambient Orbs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#a078ff]/35 blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-full bg-[#03b5d3]/30 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#f751a1]/20 blur-2xl" />

          {/* Refraction Backing Penthouse Photo */}
          <div
            className="absolute inset-0 opacity-45 mix-blend-screen bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url('${ASSETS.atrium}')` }}
          />

          {/* Live Floating Liquid Glass Object */}
          <div
            id="glassObject"
            className={`relative z-10 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center shadow-2xl border border-white/30 ${getShapeClasses()}`}
            style={{
              filter: 'url(#liquidGlassFilter)',
              backdropFilter: `blur(${blur}px) saturate(180%)`,
              WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
              backgroundColor: `rgba(41, 42, 46, ${tint})`,
              boxShadow: `inset 0 ${(rim * 15).toFixed(0)}px ${(rim * 30).toFixed(
                0
              )}px 0 rgba(208, 188, 255, ${edge * 8}), 0 16px 40px rgba(0, 0, 0, 0.8)`,
            }}
          >
            {/* Top Prismatic Edge Highlight */}
            <div className="w-12 h-1 rounded-full bg-[#d0bcff]/70 mb-3 shadow-[0_0_8px_rgba(208,188,255,0.7)]" />

            {/* Micro Floating Pills */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="px-2.5 py-1 rounded-full bg-[#38393e]/60 backdrop-blur-md text-[#4cd7f6] text-[10px] font-bold flex items-center gap-1 border border-white/10">
                <span className="material-symbols-outlined text-[12px]">view_in_ar</span>
                <span>Refractive Mesh</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#d0bcff]/20 flex items-center justify-center text-[#d0bcff] text-[10px] font-bold">
                {rim.toFixed(2)}
              </div>
            </div>

            <span className="text-base font-bold text-white tracking-tight">Crystalline Core</span>
            <span className="text-[11px] text-[#cbc3d7] mt-0.5">Physical displacement active</span>

            {/* Tactile Nested Disc Indicator */}
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.4)]">
                <span className="material-symbols-outlined text-[16px]">touch_app</span>
              </div>
              <div className="h-2 w-24 rounded-full bg-[#343439]/80 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] transition-all duration-150"
                  style={{ width: `${Math.min(100, Math.max(15, rim * 500))}%` }}
                />
              </div>
            </div>
          </div>

          {/* HUD Overlays */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d0e12]/85 text-[#cbc3d7] text-[10px] font-mono backdrop-blur-md border border-white/10">
            <span className="material-symbols-outlined text-[13px] text-[#d0bcff]">blur_on</span>
            <span>Blur {blur.toFixed(1)}px</span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d0e12]/85 text-[#4cd7f6] text-[10px] font-bold backdrop-blur-md border border-white/10">
            <span className="material-symbols-outlined text-[13px]">tune</span>
            <span>{SHADER_PRESETS[activePresetKey]?.name || 'Custom'}</span>
          </div>
        </div>

        {/* Geometry Target Switcher */}
        <div className="mt-4 pt-1 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#958ea0]">
            Geometry Target
          </span>
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#292a2e] border border-white/5">
            <button
              onClick={() => setShape('rounded-rect')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                shape === 'rounded-rect'
                  ? 'bg-[#d0bcff] text-[#3c0091] shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">rounded_corner</span>
              <span>Box</span>
            </button>
            <button
              onClick={() => setShape('pill')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                shape === 'pill'
                  ? 'bg-[#d0bcff] text-[#3c0091] shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">stadium</span>
              <span>Pill</span>
            </button>
            <button
              onClick={() => setShape('circle')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                shape === 'circle'
                  ? 'bg-[#d0bcff] text-[#3c0091] shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">circle</span>
              <span>Disc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Parameter Sliders */}
      <div className="w-full flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Shader Parameters</h2>
          <button
            onClick={restoreDefaults}
            className="text-[10px] font-bold uppercase tracking-wider text-[#4cd7f6] hover:text-[#d0bcff] flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            <span>Restore Defaults</span>
          </button>
        </div>

        {/* Slider 1: Edge Intensity */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">contrast</span>
              <span className="text-xs font-semibold text-white">Edge Intensity</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#d0bcff]">{edge.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="0.10"
            step="0.005"
            value={edge}
            onChange={(e) => setEdge(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#d0bcff] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>0.00 (Soft)</span>
            <span>Specular Rim Glint</span>
            <span>0.10 (Sharp)</span>
          </div>
        </div>

        {/* Slider 2: Rim Intensity & Distance */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">adjust</span>
              <span className="text-xs font-semibold text-white">Rim Intensity & Distance</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#4cd7f6]">{rim.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="0.20"
            step="0.01"
            value={rim}
            onChange={(e) => setRim(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#4cd7f6] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>0.00 (Flat)</span>
            <span>Prismatic Caustics</span>
            <span>0.20 (Deep)</span>
          </div>
        </div>

        {/* Slider 3: Base Distortion */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">waves</span>
              <span className="text-xs font-semibold text-white">Base Distortion</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#d0bcff]">{distort.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="0.05"
            step="0.002"
            value={distort}
            onChange={(e) => setDistort(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#a078ff] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>0.00 (Optic Clear)</span>
            <span>Vector Displacement</span>
            <span>0.05 (Turbulent)</span>
          </div>
        </div>

        {/* Slider 4: Ripple Surface Texture */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#ffb0cd]">water</span>
              <span className="text-xs font-semibold text-white">Ripple Surface Texture</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#ffb0cd]">{ripple.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="0.50"
            step="0.02"
            value={ripple}
            onChange={(e) => setRipple(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#f751a1] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>Smooth</span>
            <span>Micro Bump Relief</span>
            <span>High Ripple</span>
          </div>
        </div>

        {/* Slider 5: Gaussian Blur Radius */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#acedff]">blur_linear</span>
              <span className="text-xs font-semibold text-white">Gaussian Blur Radius</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#acedff]">{blur.toFixed(1)}px</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.5"
            value={blur}
            onChange={(e) => setBlur(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#4cd7f6] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>1.0px (Crisp)</span>
            <span>Backdrop Saturation</span>
            <span>15.0px (Heavy Milk)</span>
          </div>
        </div>

        {/* Slider 6: Tint Opacity */}
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#e9ddff]">opacity</span>
              <span className="text-xs font-semibold text-white">Tint Opacity</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#e9ddff]">{tint.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="1.00"
            step="0.05"
            value={tint}
            onChange={(e) => setTint(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-[#343439] cursor-pointer accent-[#d0bcff] focus:outline-none my-1"
          />
          <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#958ea0]">
            <span>0.00 (Transparent)</span>
            <span>Liquid Chromatic Substrate</span>
            <span>1.00 (Solid)</span>
          </div>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="w-full rounded-2xl bg-[#0d0e12] p-4 border border-white/10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">code</span>
            <span className="text-xs font-semibold text-white">Instance Configuration</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-3 py-1 rounded-full bg-[#292a2e] text-[#d0bcff] hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
          </button>
        </div>
        <div className="p-3 rounded-xl bg-[#1a1b20]/60 font-mono text-[11px] leading-relaxed text-[#cbc3d7] overflow-x-auto">
          <pre>{codeSnippet}</pre>
        </div>
      </div>

      {/* Concierge Direct Action CTA */}
      <div className="w-full p-4 md:p-5 rounded-2xl bg-[#292a2e]/80 backdrop-blur-xl border border-[#a078ff]/30 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Deploy Preset to Glass</span>
          <span className="text-xs text-[#cbc3d7]">Sync active optic parameters to your HUD eyewear</span>
        </div>
        <button
          onClick={() => onTransmitToHUD(currentPreset)}
          className="h-12 px-6 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-xs shadow-[0_4px_20px_rgba(160,120,255,0.4)] flex items-center gap-2 shrink-0 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">sync</span>
          <span>Transmit</span>
        </button>
      </div>
    </div>
  );
};
