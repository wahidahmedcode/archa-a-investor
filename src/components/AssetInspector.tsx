/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PropertyAsset } from '../types';

interface AssetInspectorProps {
  property: PropertyAsset;
  onClose: () => void;
  onSell: (assetId: string) => void;
  onUpdateYield: (assetId: string, newYield: number) => void;
}

export default function AssetInspector({ property, onClose, onSell, onUpdateYield }: AssetInspectorProps) {
  const [twinSyncStatus, setTwinSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');
  const [editableYield, setEditableYield] = useState(property.yieldRate);
  const [isEditingYield, setIsEditingYield] = useState(false);

  const isDigital = property.type === 'digital_twin';
  const accentColor = isDigital ? '#00dce6' : '#e9c349';

  const triggerSimulationSync = () => {
    setTwinSyncStatus('syncing');
    setTimeout(() => {
      setTwinSyncStatus('completed');
    }, 2000);
  };

  const handleUpdateYield = () => {
    onUpdateYield(property.id, editableYield);
    setIsEditingYield(false);
  };

  // Generate mock projected values for 5 years
  const projectedYears = Array.from({ length: 5 }, (_, i) => 2026 + i);
  const projectedValues = projectedYears.map((year, i) => {
    const compoundingFactor = Math.pow(1 + property.growthRate / 100, i + 1);
    return Math.round(property.value * compoundingFactor);
  });

  return (
    <div className="fixed inset-0 z-55 flex justify-end select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Slide-out side panel */}
      <div className="glass-panel-heavy w-full max-w-lg h-screen relative z-10 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.8)] border-l border-white/10">
        
        {/* Dynamic Header */}
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-start bg-[#131313]/40">
          <div>
            <span className="font-semibold text-[9px] tracking-[0.25em] text-[#8e9192] uppercase">
              {property.code}
            </span>
            <h3 className="font-serif-display text-2xl text-[#e5e2e1] font-semibold mt-1">
              {property.name}
            </h3>
            <p className="text-[11px] text-[#c4c7c7]/80 uppercase tracking-widest font-sans mt-0.5">
              {property.location}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-[#8e9192] hover:text-[#00dce6] transition-colors p-1.5 hover:bg-white/5 roundedcursor-pointer"
          >
            close
          </button>
        </div>

        {/* Scrollable inspection stats */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col gap-6 scrollbar-thin">
          
          {/* Header desaturated preview card with high-fashion hover effect */}
          <div className="h-44 w-full relative overflow-hidden rounded border border-white/5 bg-[#050505] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <img 
              src={property.imageUrl} 
              alt={property.name} 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 pointer-events-auto"
              referrerPolicy="no-referrer"
            />
            {/* Coordinates corner badge */}
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2.5 py-1 text-[9px] font-mono tracking-wider text-[#00dce6] rounded">
              {property.coordinates}
            </div>
          </div>

          {/* Description Block */}
          <div className="flex flex-col gap-1.5 text-left border-b border-white/5 pb-5">
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Architectural Concept Summary
            </span>
            <p className="text-xs text-[#c4c7c7]/95 leading-relaxed tracking-wider">
              {property.description}
            </p>
          </div>

          {/* Financial Performance parameters */}
          <div className="flex flex-col gap-4 text-left border-b border-white/5 pb-5">
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Yield telemetry
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded">
                <span className="text-[9px] text-[#8e9192] tracking-wider uppercase font-semibold block">Value</span>
                <span className="text-lg font-semibold tracking-wide text-[#e5e2e1] block mt-1">
                  ${property.value.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#00dce6] font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">trending_up</span>
                  +{property.growthRate}% Month Growth
                </span>
              </div>

              <div className="p-4 bg-white/[0.01] border border-white/5 rounded relative group">
                <span className="text-[9px] text-[#8e9192] tracking-wider uppercase font-semibold block">Yield per annum</span>
                {isEditingYield ? (
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="number"
                      step="0.1"
                      value={editableYield}
                      onChange={(e) => setEditableYield(Number(e.target.value))}
                      className="bg-[#050505] border-b border-[#00dce6] text-sm text-white font-semibold w-16 focus:outline-none"
                    />
                    <button
                      onClick={handleUpdateYield}
                      className="material-symbols-outlined text-sm text-[#00dce6] hover:scale-115 transition-transform"
                    >
                      check
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-lg font-semibold tracking-wide text-[#e5e2e1]">
                      {property.yieldRate}%
                    </span>
                    <button
                      onClick={() => setIsEditingYield(true)}
                      className="material-symbols-outlined text-xs text-[#8e9192] hover:text-[#00dce6] cursor-pointer"
                    >
                      edit
                    </button>
                  </div>
                )}
                <span className="text-[10px] text-[#c4c7c7]/50 block mt-1">
                  Syndicate return target
                </span>
              </div>
            </div>
          </div>

          {/* Environmental telemetry */}
          <div className="flex flex-col gap-3 text-left border-b border-white/5 pb-5">
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Materials & Sustainability Footprint
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {property.materials.map((m) => (
                <span 
                  key={m} 
                  className="px-2.5 py-1 text-[10px] tracking-wider font-medium text-[#c4c7c7]/80 bg-white/[0.03] border border-white/5 uppercase"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="p-3 bg-[#00dce6]/5 border border-[#00dce6]/25 rounded flex items-center gap-3 mt-1.5">
              <span className="material-symbols-outlined text-[#00dce6] text-xl">energy_savings_leaf</span>
              <div>
                <span className="text-[9px] text-[#c4c7c7]/60 uppercase tracking-widest block font-semibold">Carbon Emissions Matrix</span>
                <span className="text-xs font-semibold text-[#00dce6] mt-0.5 block">{property.carbonIndex}</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation: Digital Twin Synchronization */}
          <div className="flex flex-col gap-3 text-left">
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Digital Twin Connectivity Controls
            </span>
            <div className="p-4 border border-white/5 bg-white/[0.01]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#c4c7c7] font-semibold tracking-wide uppercase">Crystalline Node Connection</span>
                <span 
                  className={`px-2 py-0.5 text-[9px] tracking-widest uppercase font-bold rounded ${
                    property.twinNode ? 'bg-[#00dce6]/10 text-[#00dce6]' : 'bg-red-400/10 text-red-400'
                  }`}
                >
                  {property.twinNode ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
              <p className="text-[11px] text-[#8e9192] leading-relaxed tracking-wider mt-2">
                {property.twinNode 
                  ? `Securely bounded via state twin pipeline ID: ${property.twinNode}. Continuous environmental simulation loop is currently active.` 
                  : 'This asset is primary physical; virtual twin grid bindings are available upon demand.'}
              </p>
              
              {property.twinNode && (
                <button
                  type="button"
                  onClick={triggerSimulationSync}
                  disabled={twinSyncStatus === 'syncing'}
                  className="w-full mt-4 py-2 border border-[#00dce6] text-[#00dce6] text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-[#00dce6]/10 hover:neon-glow transition-all duration-300 disabled:opacity-40 select-none cursor-pointer"
                >
                  {twinSyncStatus === 'idle' && 'TRIGGER CRYSTALLINE SYNCHRONIZATION'}
                  {twinSyncStatus === 'syncing' && 'SYNCHRONIZING EMBEDDED TWIN CLOUD...'}
                  {twinSyncStatus === 'completed' && 'STATE SUCCESSFULLY STABILIZED ✓'}
                </button>
              )}
            </div>
          </div>

          {/* Projected compounding chart */}
          <div className="flex flex-col gap-3 text-left pt-2 border-t border-white/5">
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              5-Year Value Compound Projections
            </span>
            <div className="flex items-end justify-between gap-1 h-24 pt-4 border-b border-white/5 select-none">
              {projectedValues.map((val, idx) => {
                const maxVal = Math.max(...projectedValues);
                const heightPercentage = Math.round((val / maxVal) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group/bar">
                    <div className="text-[9px] text-[#00dce6] font-semibold font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity mb-1 bg-black/90 px-1 py-0.5 rounded absolute -translate-y-5">
                      ${(val / 1000000).toFixed(2)}M
                    </div>
                    {/* Bar graphic */}
                    <div 
                      className={`w-full transition-all duration-500 ease-out`}
                      style={{ 
                        height: `${heightPercentage * 0.6}px`,
                        backgroundColor: idx === projectedYears.length - 1 ? '#00dce6' : '#252525'
                      }}
                    />
                    <span className="text-[9px] font-mono text-[#8e9192] mt-1.5">{projectedYears[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sell / Terminate actions bottom footer */}
        <div className="p-6 md:p-8 border-t border-white/5 bg-[#131313]/60 flex gap-4 select-none">
          <button
            type="button"
            onClick={() => onSell(property.id)}
            className="flex-1 py-3 bg-red-950/20 border border-red-500/20 hover:border-red-500 hover:bg-red-500/15 text-red-400 font-semibold text-xs tracking-widest uppercase transition-all cursor-pointer"
          >
            LIQUIDATE ASSET
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-white/10 text-[#c4c7c7] font-semibold text-xs tracking-widest uppercase hover:text-white transition-all cursor-pointer"
          >
            DONE
          </button>
        </div>

      </div>
    </div>
  );
}
