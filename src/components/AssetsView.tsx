/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PropertyAsset, AssetType } from '../types';
import PropertyCard from './PropertyCard';

interface AssetsViewProps {
  assets: PropertyAsset[];
  onSelectProperty: (asset: PropertyAsset) => void;
  onOpenAcquisition: () => void;
}

export default function AssetsView({ assets, onSelectProperty, onOpenAcquisition }: AssetsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<AssetType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'value' | 'yield' | 'growth'>('value');

  // Filter properties
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort properties
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === 'value') return b.value - a.value;
    if (sortBy === 'yield') return b.yieldRate - a.yieldRate;
    if (sortBy === 'growth') return b.growthRate - a.growthRate;
    return 0;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Filters Strip */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white/[0.01] p-4 border border-white/5">
        
        {/* Search input only-bottom-border */}
        <div className="flex-1 max-w-md relative flex items-center">
          <span className="material-symbols-outlined absolute left-2 text-[#8e9192] text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="SEARCH BY STRUCTURE, CODE, OR LOCATION..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 text-[#e5e2e1] pl-10 pr-4 py-2 focus:outline-none focus:border-[#00dce6] transition-colors font-sans text-xs tracking-widest placeholder:text-white/20"
          />
        </div>

        {/* Categories toggles and sort selection */}
        <div className="flex flex-wrap items-center gap-4 select-none">
          
          {/* Classification type selector */}
          <div className="flex bg-[#1c1b1b] p-1 rounded border border-white/5">
            {([
              { label: 'ALL', value: 'all' },
              { label: 'RESIDENTIAL', value: 'residential' },
              { label: 'DIGITAL TWINS', value: 'digital_twin' },
              { label: 'COMMERCIAL', value: 'commercial' }
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterType(opt.value)}
                className={`px-3 py-1.5 font-semibold text-[9px] tracking-wider uppercase transition-all rounded-sm cursor-pointer ${
                  filterType === opt.value
                    ? 'bg-[#00dce6] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,220,230,0.15)]'
                    : 'text-[#c4c7c7]/60 hover:text-[#e5e2e1]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sorting selection drop-down */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8e9192]">SORT OVER:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1c1b1b] border border-white/5 text-[#c4c7c7] text-[10px] font-semibold tracking-widest uppercase py-1.5 px-3 focus:outline-none focus:border-[#00dce6] cursor-pointer rounded-sm"
            >
              <option value="value">CAPITAL VALUE</option>
              <option value="yield">YIELD RATE</option>
              <option value="growth">MONTH GROWTH</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid display */}
      <h3 className="font-serif-display text-2xl text-left text-[#e5e2e1]">
        ARCH-A Active Commissions ({sortedAssets.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 select-none">
        {/* Dynamic Items rendered */}
        {sortedAssets.map((asset) => (
          <PropertyCard
            key={asset.id}
            property={asset}
            onSelect={onSelectProperty}
          />
        ))}

        {/* Primary Interactive Acquire slot */}
        <div 
          onClick={onOpenAcquisition}
          className="group relative overflow-hidden rounded-xl glass-panel flex flex-col h-full items-center justify-center p-6 text-center cursor-pointer border border-transparent hover:border-[#e9c349]/35 hover:-translate-y-1 transition-all duration-300 min-h-[300px]"
        >
          {/* Subtle backing golden radial glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#e9c349] opacity-0 blur-xl pointer-events-none group-hover:opacity-5 transition-all duration-500" />
          
          <span className="material-symbols-outlined text-[54px] text-[#8e9192]/40 group-hover:text-[#e9c349] group-hover:scale-110 transition-all duration-500 mb-4 select-none">
            add_circle
          </span>
          <h4 className="font-semibold text-sm text-[#e5e2e1] uppercase tracking-[0.2em]">
            Commission Asset
          </h4>
          <p className="text-[11px] text-[#8e9192]/80 leading-relaxed max-w-[200px] mt-2 tracking-wider">
            Draft dynamic floor plans, set carbon footprint specs, and deploy real-time twin models immediately.
          </p>
        </div>
      </div>

      {/* Empty visual state if search brings 0 results */}
      {sortedAssets.length === 0 && (
        <div className="p-16 border border-dashed border-white/5 text-center flex flex-col items-center gap-2 mt-4 select-none">
          <span className="material-symbols-outlined text-4xl text-[#8e9192]/50">
            inventory_2
          </span>
          <p className="text-sm font-semibold text-[#c4c7c7] uppercase tracking-widest mt-2">No Matching Structural Units Found</p>
          <p className="text-xs text-[#8e9192]">Try modifying your class classification toggle or clearing the search bar.</p>
        </div>
      )}
    </div>
  );
}
