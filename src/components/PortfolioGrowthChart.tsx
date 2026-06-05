/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioHistoryItem } from '../types';

interface PortfolioGrowthChartProps {
  historyData: PortfolioHistoryItem[];
  timeframe: '6M' | '1Y' | 'ALL';
  onTimeframeChange: (tf: '6M' | '1Y' | 'ALL') => void;
}

export default function PortfolioGrowthChart({ 
  historyData, 
  timeframe, 
  onTimeframeChange 
}: PortfolioGrowthChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = historyData.map(d => d.value);
  const minVal = Math.min(...values) * 0.95; // some headroom at the bottom
  const maxVal = Math.max(...values) * 1.05; // some headroom at the top
  const range = maxVal - minVal;

  const width = 800;
  const height = 180;
  
  // Map index data point to coordinates
  const points = historyData.map((d, index) => {
    const x = (index / (historyData.length - 1)) * (width - 40) + 20;
    const y = height - ((d.value - minVal) / range) * (height - 40) - 20;
    return { x, y, data: d };
  });

  // SVG curved path construction
  let linePath = '';
  let areaPath = '';

  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      linePath += ` C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    }
    
    // Closed shape for area filled gradient
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
  }

  return (
    <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col gap-6 select-none flex-1">
      <div className="flex justify-between items-center select-none">
        <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight">
          Portfolio Growth History
        </h3>
        <div className="flex bg-[#1c1b1b] p-1 rounded border border-white/5">
          {(['6M', '1Y', 'ALL'] as const).map((tf) => {
            const isActive = timeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => onTimeframeChange(tf)}
                className={`px-4 py-1.5 font-semibold text-[10px] tracking-widest uppercase transition-all rounded-sm cursor-pointer select-none ${
                  isActive 
                    ? 'bg-[#00dce6] text-[#002022]' 
                    : 'text-[#c4c7c7]/65 hover:text-[#e5e2e1]'
                }`}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-2 flex flex-col justify-end w-full">
        {/* SVG container */}
        <div className="w-full overflow-hidden relative" style={{ height: `${height}px` }}>
          {/* Subtle background horizontal lines */}
          <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-40">
            <div className="border-b border-white/5 w-full h-px" />
            <div className="border-b border-white/5 w-full h-px" />
            <div className="border-b border-white/5 w-full h-px" />
            <div className="border-b border-white/5 w-full h-px" />
          </div>

          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Area fill gradient */}
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00dce6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00dce6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled area path */}
            {areaPath && (
              <path d={areaPath} fill="url(#areaGrad)" />
            )}

            {/* Glow backing path (Neon Cyan) */}
            {linePath && (
              <path 
                d={linePath} 
                fill="none" 
                stroke="#00dce6" 
                strokeWidth="2.5" 
                filter="url(#glow)"
                strokeLinecap="round"
              />
            )}

            {/* Render data nodes */}
            {points.map((p, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <g 
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                >
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={isHovered ? 7 : 4} 
                    fill="#00dce6" 
                    stroke="#050505" 
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive floating tooltip */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <div 
              className="absolute bg-[#131313] border border-[#00dce6]/45 p-3 rounded shadow-xl pointer-events-none flex flex-col gap-0.5 z-30 transition-all duration-200"
              style={{
                left: `${Math.min(
                  Math.max((hoveredIndex / (historyData.length - 1)) * 100 - 10, 2),
                  85
                )}%`,
                bottom: `${Math.min(
                  Math.max(100 - ((points[hoveredIndex].y / height) * 100) + 5, 10),
                  75
                )}%`
              }}
            >
              <span className="text-[9px] text-[#8e9192] uppercase font-bold tracking-widest font-sans">
                {points[hoveredIndex].data.month}
              </span>
              <span className="text-xs font-semibold text-[#e5e2e1] font-mono mt-0.5">
                Value: <span className="text-[#00dce6]">${points[hoveredIndex].data.value.toFixed(1)}M</span>
              </span>
              <span className="text-[10px] text-[#c4c7c7]/80">
                Avg Yield: {points[hoveredIndex].data.yieldRate.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* X-Axis Month Indicators */}
        <div className="flex justify-between w-full pt-4 font-semibold text-[10px] text-[#8e9192] uppercase tracking-[0.15em] border-t border-white/5 select-none mt-2 px-4">
          {historyData.map((d, index) => (
            <span key={index}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
