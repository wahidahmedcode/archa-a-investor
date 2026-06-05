/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SidebarView } from '../types';

interface HeaderProps {
  currentView: SidebarView;
  onViewChange: (view: SidebarView) => void;
  onOpenAcquisition: () => void;
}

export default function Header({ currentView, onViewChange, onOpenAcquisition }: HeaderProps) {
  const navLinks = [
    { label: 'PORTFOLIO', view: 'portfolio' as SidebarView },
    { label: 'ASSETS', view: 'assets' as SidebarView },
    { label: 'ANALYTICS', view: 'analytics' as SidebarView },
    { label: 'REPORTS', view: 'reports' as SidebarView },
    { label: 'SETTINGS', view: 'settings' as SidebarView }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1440px] rounded-full bg-[#131313]/55 backdrop-blur-xl border-t border-l border-white/10 shadow-[0_0_45px_rgba(0,0,0,0.65)] flex justify-between items-center px-6 md:px-10 py-3.5 z-40 transition-all duration-300">
      <div 
        onClick={() => onViewChange('portfolio')} 
        className="font-serif-display text-2xl md:text-3xl text-[#c9c6c5] tracking-tighter cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none"
      >
        ARCH-A
      </div>
      
      <div className="hidden md:flex gap-6 lg:gap-10 font-sans text-[11px] lg:text-[12px] font-semibold tracking-[0.2em] uppercase select-none">
        {navLinks.map((link) => {
          const isActive = currentView === link.view;
          return (
            <button
              key={link.label}
              onClick={() => onViewChange(link.view)}
              className={`transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#00dce6] font-bold border-b border-[#00dce6] pb-1'
                  : 'text-[#c4c7c7]/70 hover:text-[#e5e2e1]'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={onOpenAcquisition}
        className="font-sans text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 border border-[#e9c349] text-[#e9c349] hover:bg-[#e9c349]/10 active:scale-95 transition-all cursor-pointer select-none"
      >
        ACQUIRE
      </button>
    </nav>
  );
}
