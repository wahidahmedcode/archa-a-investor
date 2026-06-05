/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface SettingsViewProps {
  currentYieldTarget: number;
  onYieldTargetChange: (val: number) => void;
  currency: string;
  onCurrencyChange: (val: string) => void;
  collectorTier: string;
  onCollectorTierChange: (val: string) => void;
}

export default function SettingsView({
  currentYieldTarget,
  onYieldTargetChange,
  currency,
  onCurrencyChange,
  collectorTier,
  onCollectorTierChange
}: SettingsViewProps) {
  const [particleDensity, setParticleDensity] = useState(50);
  const [notifSound, setNotifSound] = useState(true);

  const tiers = [
    { name: 'Sovereign Collector', desc: 'Elite single curator representing primary liquidity vaults.' },
    { name: 'Syndicate Director', desc: 'Curator commanding shared financial real estate nodes.' },
    { name: 'Algorithmic Arbitrageur', desc: 'High-frequency digital twin yield optimizer.' }
  ];

  return (
    <div className="flex flex-col gap-8 text-left select-none max-w-3xl">
      
      {/* Parameter Split Block */}
      <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6">
        <div>
          <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
            Curator Alignment
          </span>
          <h3 className="font-serif-display text-xl text-[#e5e2e1] font-medium mt-1">
            Investor Identification Profile
          </h3>
        </div>

        {/* Collector Tiers block list */}
        <div className="flex flex-col gap-3">
          {tiers.map((opt) => {
            const isSelected = collectorTier === opt.name;
            return (
              <div
                key={opt.name}
                onClick={() => onCollectorTierChange(opt.name)}
                className={`p-4 border text-left cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#00dce6] bg-[#00dce6]/5 shadow-[0_0_12px_rgba(0,220,230,0.05)]' 
                    : 'border-white/5 bg-[#131313]/20 hover:border-white/15'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-semibold uppercase">
                  <span className={isSelected ? 'text-[#00dce6] font-bold' : 'text-[#e5e2e1]'}>
                    {opt.name}
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[18px] text-[#00dce6]">
                      verified_user
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#8e9192] mt-1 tracking-wider leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Numerical values controllers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box index A: Yield limits */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6 justify-between">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase font-sans">
              Investment Anchor
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium mt-0.5 font-serif">
              Cumulative Yield Target
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#8e9192]">BENCHMARK LIMITS</span>
              <span className="text-[#e9c349] font-mono">{currentYieldTarget.toFixed(1)}% p.a.</span>
            </div>
            
            <input
              type="range"
              min="5.0"
              max="15.0"
              step="0.1"
              value={currentYieldTarget}
              onChange={(e) => onYieldTargetChange(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1c1b1b] rounded-lg appearance-none cursor-pointer accent-[#e9c349] mt-3"
            />
            
            <span className="text-[9.5px] text-[#8e9192] leading-relaxed mt-2 tracking-wider">
              Optimal baseline target for alerting algorithmic twin simulation clusters.
            </span>
          </div>
        </div>

        {/* Box index B: Currency tracker settings */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6 justify-between">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase font-sans">
              Base Ledger
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium mt-0.5 font-serif">
              Accounting Valuation Currency
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {['USD', 'EUR', 'JPY', 'BTC'].map((cur) => {
              const isSelected = currency === cur;
              return (
                <button
                  key={cur}
                  onClick={() => onCurrencyChange(cur)}
                  className={`py-3 text-[10px] tracking-wider font-semibold uppercase border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#00dce6] text-[#00dce6] bg-[#00dce6]/5' 
                      : 'border-white/5 text-[#c4c7c7]/65 hover:border-white/15'
                  }`}
                >
                  {cur}
                </button>
              );
            })}
          </div>
          
          <span className="text-[9.5px] text-[#8e9192] leading-relaxed tracking-wider">
            Alters primary summary currency labels dynamically over dashboards and catalog sheets.
          </span>
        </div>

      </div>

      {/* Atmospheric UI effects configuration (micro interactions) */}
      <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-5">
        <div>
          <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
            Aesthetic Matrix
          </span>
          <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium mt-0.5">
            Atmospheric Interface Effects
          </h3>
        </div>

        <div className="flex flex-col gap-4 mt-1">
          {/* Slider for ambient particles flow */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#c4c7c7] tracking-wider">AMBIENT PARTICLE COUNT</span>
              <span className="font-mono text-[#00dce6]">{particleDensity} Nodes</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={particleDensity}
              onChange={(e) => {
                setParticleDensity(Number(e.target.value));
                // Dispatches a custom event to dynamically update particle canvas if listening
                window.dispatchEvent(new CustomEvent('update-particles-density', { detail: Number(e.target.value) }));
              }}
              className="w-full h-1.5 bg-[#1c1b1b] rounded-lg appearance-none cursor-pointer accent-[#00dce6] mt-1.5"
            />
          </div>

          {/* Slider for cryptographically alerting sounds */}
          <div className="flex justify-between items-center p-3 border border-white/5 bg-[#131313]/25 mt-1">
            <div>
              <span className="text-xs text-[#e5e2e1] font-semibold uppercase tracking-wider block">Cryptographic Feedback Sounds</span>
              <span className="text-[10px] text-[#8e9192] tracking-wide mt-0.5 block">Trigger low sine-wave signals on successful acquisitions</span>
            </div>
            <div 
              onClick={() => setNotifSound(!notifSound)}
              className={`w-12 h-6 flex items-center p-1 rounded-full cursor-pointer transition-all duration-300 ${
                notifSound ? 'bg-[#00dce6]' : 'bg-[#1c1b1b]'
              }`}
            >
              <div className={`bg-[#050505] w-4 h-4 rounded-full shadow transition-all duration-300 ${notifSound ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
