/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PropertyAsset } from '../types';

interface AssetDistributionChartProps {
  assets: PropertyAsset[];
}

export default function AssetDistributionChart({ assets }: AssetDistributionChartProps) {
  // Recalculate totals dynamically based on current assets list
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

  const resVal = assets.filter(a => a.type === 'residential').reduce((sum, a) => sum + a.value, 0);
  const digVal = assets.filter(a => a.type === 'digital_twin').reduce((sum, a) => sum + a.value, 0);
  const comVal = assets.filter(a => a.type === 'commercial').reduce((sum, a) => sum + a.value, 0);

  const resPct = totalValue > 0 ? Math.round((resVal / totalValue) * 100) : 0;
  const digPct = totalValue > 0 ? Math.round((digVal / totalValue) * 100) : 0;
  const comPct = totalValue > 0 ? Math.round((comVal / totalValue) * 100) : 0;

  // Let's draw an SVG circular section
  // Circle circumferences = 2 * PI * r
  // For R = 60, C = 2 * 3.14159 * 60 = 376.99
  const r = 60;
  const c = 2 * Math.PI * r;

  // Compute stroke strokeDasharrays and cumulative offsets
  const resDash = (resPct / 100) * c;
  const digDash = (digPct / 100) * c;
  const comDash = (comPct / 100) * c;

  const resOffset = c; // Starts at 0
  const digOffset = c - resDash;
  const comOffset = c - resDash - digDash;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6 items-center justify-between select-none">
      <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium self-start tracking-tight">
        Asset Distribution
      </h3>

      <div className="relative w-44 h-44 rounded-full flex items-center justify-center mt-2 group select-none">
        
        {/* Dynamic SVG Double Wheel */}
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 transform overflow-visible scale-100 group-hover:scale-102 transition-transform duration-300">
          {/* Backdrop guide block */}
          <circle 
            cx="80" 
            cy="80" 
            r={r} 
            fill="none" 
            stroke="#353535" 
            strokeWidth="12" 
            className="opacity-20"
          />

          {/* Residential sector (Cyan) */}
          {resPct > 0 && (
            <circle 
              cx="80" 
              cy="80" 
              r={r} 
              fill="none" 
              stroke="#00dce6" 
              strokeWidth="12" 
              strokeDasharray={`${resDash} ${c - resDash}`}
              strokeDashoffset={resOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )}

          {/* Digital twin sector (Gold) */}
          {digPct > 0 && (
            <circle 
              cx="80" 
              cy="80" 
              r={r} 
              fill="none" 
              stroke="#e9c349" 
              strokeWidth="12" 
              strokeDasharray={`${digDash} ${c - digDash}`}
              strokeDashoffset={digOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )}

          {/* Commercial sector (Premium Charcoal/Silver) */}
          {comPct > 0 && (
            <circle 
              cx="80" 
              cy="80" 
              r={r} 
              fill="none" 
              stroke="#8e9192" 
              strokeWidth="12" 
              strokeDasharray={`${comDash} ${c - comDash}`}
              strokeDashoffset={comOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>

        {/* Core display overlay */}
        <div className="absolute flex flex-col items-center">
          <span className="font-serif-display text-xl text-[#e5e2e1] font-semibold tracking-tight">
            ${(totalValue / 1000000).toFixed(1)}M
          </span>
          <span className="font-semibold text-[9px] tracking-[0.25em] text-[#8e9192] uppercase mt-0.5">
            TOTAL
          </span>
        </div>
      </div>

      {/* Numerical Index Table */}
      <div className="flex flex-col gap-3.5 w-full mt-4 select-none">
        
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#00dce6] rounded-full shadow-[0_0_6px_rgba(0,220,230,0.3)]" />
            <span className="text-[#c4c7c7]/80 uppercase tracking-widest font-sans text-[10px]">
              Residential Monoliths
            </span>
          </div>
          <span className="text-[#e5e2e1] font-mono">{resPct}%</span>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#e9c349] rounded-full shadow-[0_0_6px_rgba(233,195,73,0.3)]" />
            <span className="text-[#c4c7c7]/80 uppercase tracking-widest font-sans text-[10px]">
              Digital Twin Assets
            </span>
          </div>
          <span className="text-[#e5e2e1] font-mono">{digPct}%</span>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#8e9192] rounded-full" />
            <span className="text-[#c4c7c7]/80 uppercase tracking-widest font-sans text-[10px]">
              Commercial Structures
            </span>
          </div>
          <span className="text-[#e5e2e1] font-mono">{comPct}%</span>
        </div>

      </div>
    </div>
  );
}
