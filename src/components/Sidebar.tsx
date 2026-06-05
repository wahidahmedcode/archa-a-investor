/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SidebarView } from '../types';

interface SidebarProps {
  currentView: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const dashLinks = [
    { label: 'Portfolio', view: 'portfolio' as SidebarView, icon: 'grid_view' },
    { label: 'Assets', view: 'assets' as SidebarView, icon: 'apartment' },
    { label: 'Analytics', view: 'analytics' as SidebarView, icon: 'analytics' },
    { label: 'Reports', view: 'reports' as SidebarView, icon: 'description' }
  ];

  const sysLinks = [
    { label: 'Settings', view: 'settings' as SidebarView, icon: 'settings' }
  ];

  const LinkRow = ({ label, view, icon }: { label: string; view: SidebarView; icon: string; key?: SidebarView }) => {
    const isActive = currentView === view;

    return (
      <button
        onClick={() => onViewChange(view)}
        className={`w-full text-left flex items-center gap-4 py-2 px-1 font-semibold text-[13px] tracking-widest uppercase transition-all duration-300 select-none cursor-pointer ${
          isActive
            ? 'text-[#00dce6] border-r-2 border-[#00dce6] font-bold shadow-[2px_0_12px_rgba(0,220,230,0.05)]'
            : 'text-[#c4c7c7]/70 hover:text-[#e5e2e1] hover:translate-x-1'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 hidden lg:flex flex-col gap-10 sticky top-32 h-[calc(100vh-160px)] select-none">
      <div className="flex flex-col gap-8 h-full">
        <div className="flex flex-col gap-5">
          <span className="font-semibold text-[11px] tracking-[0.25em] text-[#8e9192] uppercase">
            Dashboard
          </span>
          <nav className="flex flex-col gap-4">
            {dashLinks.map((item) => (
              <LinkRow key={item.view} label={item.label} view={item.view} icon={item.icon} />
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 mt-auto">
          <span className="font-semibold text-[11px] tracking-[0.25em] text-[#8e9192] uppercase">
            System
          </span>
          <nav className="flex flex-col gap-4">
            {sysLinks.map((item) => (
              <LinkRow key={item.view} label={item.label} view={item.view} icon={item.icon} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
