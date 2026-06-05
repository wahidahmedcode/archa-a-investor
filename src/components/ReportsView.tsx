/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PropertyAsset } from '../types';

interface ReportsViewProps {
  assets: PropertyAsset[];
}

export default function ReportsView({ assets }: ReportsViewProps) {
  const [reportTitle, setReportTitle] = useState('ARCH-A EXECUTIVE PORTFOLIO SUMMARY');
  const [recipient, setRecipient] = useState('GENEVA SOVEREIGN INVESTORS');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [compiledDossiers, setCompiledDossiers] = useState<Array<{
    id: string;
    title: string;
    recipient: string;
    date: string;
    hash: string;
    totalUnits: number;
    value: string;
  }>>([
    {
      id: 'DOS-2026-03-01',
      title: 'ARCH-A SYNDICATE QUARTERLY REPORT',
      recipient: 'GENEVA SOVEREIGN INVESTORS',
      date: '2026-03-01',
      hash: '0x3FB2...68ED',
      totalUnits: 3,
      value: '$9.4M'
    }
  ]);

  const handleCompile = () => {
    setIsCompiling(true);
    setCompileLogs([]);
    
    const logs = [
      'Initialising cryptographic ledger bounds...',
      'Mapping physical geo-coordinates for all residential assets...',
      'Resolving Unreal Core twin-node telemetry channels...',
      'Computing compound MoM growth over the 6M forecast...',
      'Verifying A+++ negative-carbon sustainability records...',
      'Formulating digital asset dossier and locking state hash...',
      'Dossier successfully compiled and verified!'
    ];

    logs.forEach((logMsg, idx) => {
      setTimeout(() => {
        setCompileLogs(prev => [...prev, `[COMPILER] ${logMsg}`]);
        if (idx === logs.length - 1) {
          setIsCompiling(false);
          const totalVal = assets.reduce((sum, a) => sum + a.value, 0);
          setCompiledDossiers(prev => [
            {
              id: `DOS-2026-06-0${prev.length + 1}`,
              title: reportTitle.toUpperCase(),
              recipient: recipient.toUpperCase(),
              date: new Date().toISOString().split('T')[0],
              hash: `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
              totalUnits: assets.length,
              value: `$${(totalVal / 1000000).toFixed(1)}M`
            },
            ...prev
          ]);
        }
      }, (idx + 1) * 800);
    });
  };

  return (
    <div className="flex flex-col gap-8 text-left select-none">
      
      {/* 2-Column Split: Config on left, Compiler on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left column: Parameters selection */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col justify-between gap-6">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Compilation Controls
            </span>
            <h3 className="font-serif-display text-xl text-[#e5e2e1] font-medium mt-1">
              Dossier Configuration
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                Dossier Classification
              </label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="bg-[#050505] border-b border-white/10 text-xs px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] tracking-wider transition-colors placeholder:text-white/20 select-text"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                Recipient Syndicate Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-[#050505] border-b border-white/10 text-xs px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] tracking-wider transition-colors placeholder:text-white/20 select-text"
              />
            </div>
          </div>

          <button
            onClick={handleCompile}
            disabled={isCompiling || !reportTitle.trim()}
            className="w-full mt-2 py-3 bg-[#e9c349] hover:bg-[#ffe088] text-[#131102] text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(233,195,73,0.15)] disabled:opacity-30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">build</span>
            {isCompiling ? 'COMPILING DOSSIER...' : 'GENERATE DOSSIER'}
          </button>
        </div>

        {/* Right column: live compiler simulator feedback */}
        <div className="glass-panel p-6 md:p-8 rounded-xl flex flex-col justify-between gap-6">
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#8e9192] font-semibold uppercase">
              Digital Compiler Logs
            </span>
            <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium tracking-tight mt-1">
              Active Stream
            </h3>
          </div>

          <div className="bg-[#050505] border border-white/5 p-5 h-44 rounded overflow-y-auto flex flex-col gap-1.5 font-mono text-[10px] tracking-wider text-[#e9c349]">
            {compileLogs.length === 0 ? (
              <span className="text-[#8e9192]/50 italic">Compiler idle. Set parameters on left and click compile.</span>
            ) : (
              compileLogs.map((log, index) => (
                <div key={index} className={index === compileLogs.length - 1 ? 'text-[#00dce6] animate-pulse font-bold' : 'text-[#8e9192]/70'}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* History log ledger */}
      <section className="flex flex-col gap-4 mt-2">
        <h3 className="font-serif-display text-lg text-[#e5e2e1] font-medium">
          Compiled Dossiers Ledger
        </h3>
        
        <div className="overflow-x-auto text-[11px] font-sans tracking-widest uppercase">
          <table className="w-full text-left border-collapse border border-white/5 whitespace-nowrap">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[#8e9192] font-semibold">
                <th className="px-5 py-3.5">Dossier ID</th>
                <th className="px-5 py-3.5">Classification</th>
                <th className="px-5 py-3.5">Recipient</th>
                <th className="px-5 py-3.5">Sovereign Date</th>
                <th className="px-5 py-3.5">State Value</th>
                <th className="px-5 py-3.5">Ledger Hash</th>
                <th className="px-5 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {compiledDossiers.map((doc) => (
                <tr key={doc.id} className="border-b border-white/5 bg-[#131313]/25 hover:bg-white/[0.01] transition-all">
                  <td className="px-5 py-4 font-mono font-bold text-[#e5e2e1]">{doc.id}</td>
                  <td className="px-5 py-4 text-white font-semibold">{doc.title}</td>
                  <td className="px-5 py-4 text-[#c4c7c7]/85">{doc.recipient}</td>
                  <td className="px-5 py-4 font-mono">{doc.date}</td>
                  <td className="px-5 py-4 font-semibold text-[#00dce6]">{doc.value}</td>
                  <td className="px-5 py-4 font-mono text-[#8e9192]">{doc.hash}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => alert(`Initiating secure local container stream for ${doc.id}... Download Completed.`)}
                      className="px-3 py-1 bg-white/[0.04] border border-white/5 hover:border-[#00dce6] text-[#00dce6] font-semibold hover:bg-[#00dce6]/5 text-[9px] tracking-wider transition-all cursor-pointer"
                    >
                      DOWNLOAD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
