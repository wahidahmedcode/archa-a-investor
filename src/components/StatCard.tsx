/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  trendText?: string;
  trendUp?: boolean;
  subtext?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  hoverGlowClass?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  iconColor,
  trendText,
  trendUp = true,
  subtext,
  buttonText,
  onButtonClick,
  hoverGlowClass = 'hover:border-[#00dce6]/30'
}: StatCardProps) {
  return (
    <div 
      className={`glass-panel p-8 rounded-xl flex flex-col gap-4 group transition-all duration-300 transform hover:-translate-y-1 border border-transparent ${hoverGlowClass} relative overflow-hidden`}
    >
      {/* Background radial accent flare */}
      <div 
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-5 blur-xl pointer-events-none group-hover:opacity-10 transition-all duration-500"
        style={{ backgroundColor: iconColor }}
      />
      
      <div className="flex justify-between items-start select-none">
        <span className="font-semibold text-[11px] tracking-[0.2em] text-[#8e9192] uppercase">
          {title}
        </span>
        <span 
          className="material-symbols-outlined transition-transform duration-500 group-hover:scale-110" 
          style={{ color: iconColor }}
        >
          {icon}
        </span>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <span className="font-serif-display text-3xl md:text-4xl text-[#e5e2e1] font-medium tracking-tight">
          {value}
        </span>
        
        {trendText && (
          <span className="text-[12px] font-semibold tracking-wider flex items-center gap-1">
            <span 
              className={`material-symbols-outlined text-[15px] ${
                trendUp ? 'text-[#00dce6]' : 'text-red-400'
              }`}
            >
              {trendUp ? 'trending_up' : 'trending_down'}
            </span>
            <span style={{ color: trendUp ? '#00dce6' : '#f87171' }}>{trendText}</span>
            <span className="text-[#c4c7c7]/55 ml-1 font-normal">v Last Month</span>
          </span>
        )}
        
        {subtext && !trendText && (
          <span className="text-[12px] text-[#c4c7c7]/65 tracking-wider font-normal">
            {subtext}
          </span>
        )}

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="text-[12px] font-semibold text-[#8e9192] hover:text-[#e5e2e1] transition-colors cursor-pointer text-left underline underline-offset-4 decoration-1 tracking-wider mt-0.5"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
