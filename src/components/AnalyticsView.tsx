/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PropertyAsset } from '../types';

interface AnalyticsViewProps {
  assets: PropertyAsset[];
}

export default function AnalyticsView({ assets }: AnalyticsViewProps) {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Calculate dynamic stats
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const averageYield = assets.length > 0 
    ? Number((assets.reduce((sum, a) => sum + a.yieldRate, 0) / assets.length).toFixed(2))
    : 0;

  const targetYield = 9.0;
  const yieldOptimizationPercentage = Math.min(100, Math.round((averageYield / targetYield) * 100));

  // Environmental impact stats
  const carbonStatus = assets.some(a => a.materials.includes('Treated Bio-Timber'))
    ? 'CARBON NEGATIVE (ACTIVE RECOVERY)'
    : 'CARBON NEUTRAL';
  
  // Set up procedural telemetry feed for futuristic blueprint feeling
  useEffect(() => {
    const systems = [
      '[SYS-TWIN-GRID]: Dynamic synchronization with Kyoto Node 09: Status Ok.',
      '[SYS-COMPUTE]: Virtual core thread allocated for Azure Monolith Dubai.',
      '[ENVIRONMENT]: Sintered Volcano Obsidian solar reflection metrics computed: Absorption index 98.4%.',
      '[SYS-LEDGER]: Allocating dynamic yield indices over residential monoliths.',
      '[SYS-TWIN-STATE]: Metaverse Node 4 telemetry synced with core physical structures.',
      '[SECURITY]: Holographic mesh encryption verified for all cloud assets.'
    ];

    setTerminalLogs(systems.slice(0, 3));

    const interval = setInterval(() => {
      const randomMsg = systems[Math.floor(Math.random() * systems.length)];
      setTerminalLogs(prev => [randomMsg, ...prev.slice(0, 3)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Circular Progress of Yield Target alignment */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6 justify-between select-none">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Syndicate Benchmark
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight mt-1">
              Yield Optimization
            </h3>
          </div>

          <div className="flex flex-col items-center gap-4 my-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Ring */}
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform overflow-visible">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#353535" 
                  strokeWidth="8" 
                  className="opacity-25"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e9c349" 
                  strokeWidth="8" 
                  strokeDasharray={`${(yieldOptimizationPercentage / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Inner details */}
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-semibold text-[#e5e2e1] font-mono">{averageYield}%</span>
                <span className="text-[8px] tracking-widest text-[#8e9192] uppercase mt-0.5">CURRENT AVG</span>
              </div>
            </div>
            
            <p className="text-[11px] text-[#c4c7c7]/80 text-center leading-relaxed tracking-wider">
              Cumulative yield represents <span className="text-[#e9c349] font-bold">{yieldOptimizationPercentage}%</span> alignment toward the Sovereign target index of {targetYield}%.
            </p>
          </div>
        </div>

        {/* Column 2: Advanced Asset allocations metrics */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col justify-between gap-6 select-none">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Financial Breakdown
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight mt-1">
              Class Yield Spread
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#c4c7c7]/80 uppercase tracking-widest">RESIDENTIAL</span>
                <span className="font-mono text-[#00dce6]">
                  {assets.length > 0 ? (assets.filter(a => a.type === 'residential').reduce((sum, a) => sum + a.yieldRate, 0) / (assets.filter(a => a.type === 'residential').length || 1)).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-[#1c1b1b] h-1.5 rounded">
                <div className="bg-[#00dce6] h-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#c4c7c7]/80 uppercase tracking-widest">DIGITAL TWINS</span>
                <span className="font-mono text-[#e9c349]">
                  {assets.length > 0 ? (assets.filter(a => a.type === 'digital_twin').reduce((sum, a) => sum + a.yieldRate, 0) / (assets.filter(a => a.type === 'digital_twin').length || 1)).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-[#1c1b1b] h-1.5 rounded">
                <div className="bg-[#e9c349] h-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#c4c7c7]/80 uppercase tracking-widest">COMMERCIAL</span>
                <span className="font-mono text-[#8e9192]">
                  {assets.length > 0 ? (assets.filter(a => a.type === 'commercial').reduce((sum, a) => sum + a.yieldRate, 0) / (assets.filter(a => a.type === 'commercial').length || 1)).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-[#1c1b1b] h-1.5 rounded">
                <div className="bg-[#8e9192] h-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Environmental Sustainability Offsets */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col justify-between gap-6 select-none">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Ecological Data
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight mt-1">
              Sustainability Rating
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-[#8e9192] uppercase tracking-widest block font-bold">
              Carbon Index Target
            </span>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-[#00dce6]">eco</span>
              <div>
                <span className="text-sm font-semibold text-[#e5e2e1] block uppercase">{carbonStatus}</span>
                <span className="text-[11px] text-[#c4c7c7]/50 block mt-0.5">Compliant with Paris Accord 2030</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#c4c7c7]/70 leading-relaxed mt-2 tracking-wider">
            All physical blueprints enforce active pre-cast carbon containment matrices. Virtual computing twin servers are fully coupled to zero-emission hydro cooling stations.
          </p>
        </div>

      </div>

      {/* Embedded Live Simulation Telemetry terminal logs */}
      <section className="flex flex-col gap-4">
        <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight">
          Crystalline Twin Grid Server Feed
        </h3>
        
        <div className="bg-[#050505] border border-white/5 p-6 rounded-lg font-mono text-[11px] tracking-wider leading-relaxed text-[#00dce6]/95 max-h-56 overflow-y-auto shadow-inner flex flex-col gap-1.5 select-all">
          <div className="flex items-center justify-between text-[#8e9192]/60 select-none border-b border-white/5 pb-2 mb-2 font-sans font-semibold text-[9px] uppercase tracking-widest">
            <span>Terminal: active</span>
            <span>Ref: {Date.now().toString().slice(-6)}</span>
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className={index === 0 ? 'text-[#00dce6] neon-text-glow font-semibold animate-pulse' : 'text-[#8e9192]/80'}>
              {log}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
