import React, { useState } from 'react';
import { LuxuryService } from '../types';

interface ServicesViewProps {
  services: LuxuryService[];
  onSelectService: (service: LuxuryService) => void;
  onContactDirector: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  onSelectService,
  onContactDirector,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'aviation', label: 'Private Aviation' },
    { id: 'travel', label: 'Bespoke Travel' },
    { id: 'horology', label: 'Haute Horlogerie' },
    { id: 'wellness', label: 'Wellness & Longevity' },
    { id: 'art', label: 'Fine Art Acquisition' },
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.location && s.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 md:px-0 pb-28 pt-20">
      {/* Ambient Lighting Orbs */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#a078ff]/15 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-24 right-0 w-64 h-64 rounded-full bg-[#03b5d3]/10 blur-3xl pointer-events-none -z-10" />

      {/* Top Banner & Allocation */}
      <section className="flex flex-col gap-1.5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4cd7f6] shadow-[0_0_10px_#4cd7f6] animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-[#4cd7f6] tracking-widest">
              Global Portfolio • Q1 Allocation
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292a2e]/80 text-white text-xs border border-white/5">
            <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">verified</span>
            <span>4 Curations Reserved</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <h2 className="text-2xl md:text-3xl text-white tracking-tight font-bold">
            Privé Catalog
          </h2>
          <span className="text-xs font-semibold text-[#4cd7f6]">Tier Platinum</span>
        </div>
      </section>

      {/* Search & Filter Console */}
      <section className="flex flex-col gap-3 mb-6">
        <div className="relative w-full h-13 rounded-full bg-[#292a2e]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center px-4 gap-3">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search charter, estates, timepieces..."
            className="w-full bg-transparent text-xs text-white placeholder-[#958ea0] focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#958ea0] hover:text-white">
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#a078ff] text-white shadow-[0_0_18px_rgba(160,120,255,0.4)] border border-[#d0bcff]/40'
                    : 'bg-[#1f1f24]/80 text-[#cbc3d7] hover:text-white hover:bg-[#292a2e] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Luxury Cards List */}
      <section className="flex flex-col gap-6 mb-6">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="group relative w-full rounded-3xl bg-[#1f1f24]/80 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#d0bcff]/30"
          >
            {/* Visual Media Vessel */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f24] via-[#1f1f24]/30 to-transparent" />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121317]/80 backdrop-blur-md border border-white/10 shadow-sm">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[14px]">verified</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white">
                    {service.statusBadge}
                  </span>
                </div>
                {service.subBadge && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#03b5d3]/30 backdrop-blur-md text-[#acedff] border border-[#4cd7f6]/30">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
                    <span className="text-[10px] font-bold">{service.subBadge}</span>
                  </div>
                )}
              </div>

              {/* Floating Quick Action Button */}
              <button
                onClick={() => onSelectService(service)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#343439]/80 backdrop-blur-md flex items-center justify-center text-[#d0bcff] shadow-[0_0_20px_rgba(208,188,255,0.35)] hover:bg-[#a078ff] hover:text-white transition-all border border-white/10"
                title={`Inquire about ${service.title}`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {service.category === 'aviation'
                    ? 'flight'
                    : service.category === 'travel'
                    ? 'key'
                    : service.category === 'horology'
                    ? 'verified'
                    : 'medical_services'}
                </span>
              </button>

              {/* Availability Sub-strip */}
              {service.location && (
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs">
                  <span className="text-[10px] font-bold text-[#958ea0] uppercase tracking-widest">
                    {service.location}
                  </span>
                  {service.subLocation && (
                    <>
                      <span className="text-[#958ea0]">•</span>
                      <span className="text-xs text-[#4cd7f6] font-medium">
                        {service.subLocation}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Card Content & Pricing */}
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <span className="material-symbols-outlined text-[#958ea0] text-[20px]">
                    {service.category === 'aviation'
                      ? 'flight'
                      : service.category === 'travel'
                      ? 'spa'
                      : service.category === 'horology'
                      ? 'watch'
                      : 'health_and_safety'}
                  </span>
                </div>
                <p className="text-xs text-[#cbc3d7] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Specs Bento Bar */}
              {service.specs && (
                <div className="grid grid-cols-3 gap-2 py-1">
                  {service.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1a1b20]/80 border border-white/5"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">
                        {spec.label}
                      </span>
                      <span className="text-xs font-semibold text-white mt-0.5">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Feature Tags */}
              {service.tags && (
                <div className="flex items-center gap-2 flex-wrap">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#1a1b20] text-[#cbc3d7] text-[11px] font-medium border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Price & Direct Action Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#958ea0]">
                    Direct Acquisition / Flight Rate
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#d0bcff]">{service.price}</span>
                    <span className="text-xs text-[#cbc3d7]">{service.pricePeriod}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white text-xs font-bold shadow-[0_0_24px_rgba(208,188,255,0.4)] flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>{service.actionLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {service.actionIcon}
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Unlisted Bespoke Concierge Assistance Banner */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-[#a078ff]/20 via-[#1f1f24] to-[#03b5d3]/15 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 max-w-[80%]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#4cd7f6]">
              Aether Glass Desk
            </span>
            <h4 className="text-lg font-bold text-white">Unlisted Request?</h4>
            <p className="text-xs text-[#cbc3d7] leading-relaxed">
              Superyacht charters, off-market estates, or private security details arranged within 20 minutes worldwide.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#a078ff]/30 border border-[#d0bcff]/40 flex items-center justify-center text-[#d0bcff] shadow-[0_0_16px_rgba(160,120,255,0.5)]">
            <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
          </div>
        </div>

        <button
          onClick={onContactDirector}
          className="w-full h-12 rounded-full bg-[#292a2e] hover:bg-[#a078ff] hover:text-white text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-98"
        >
          <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
          <span>Speak to Managing Director</span>
        </button>
      </section>
    </div>
  );
};
