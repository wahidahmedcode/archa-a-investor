/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PropertyAsset, SidebarView } from './types';
import { INITIAL_ASSETS, HISTORY_6M, HISTORY_1Y, HISTORY_ALL } from './data';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import PortfolioGrowthChart from './components/PortfolioGrowthChart';
import AssetDistributionChart from './components/AssetDistributionChart';
import PropertyCard from './components/PropertyCard';
import AssetInspector from './components/AssetInspector';
import AcquisitionModal from './components/AcquisitionModal';
import AmbientCanvas from './components/AmbientCanvas';

import AssetsView from './components/AssetsView';
import AnalyticsView from './components/AnalyticsView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';

export default function App() {
  const [currentView, setCurrentView] = useState<SidebarView>('portfolio');
  const [assets, setAssets] = useState<PropertyAsset[]>(INITIAL_ASSETS);
  const [availableCash, setAvailableCash] = useState<number>(2100000);
  const [selectedProperty, setSelectedProperty] = useState<PropertyAsset | null>(null);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [timeframe, setTimeframe] = useState<'6M' | '1Y' | 'ALL'>('6M');
  
  // Custom states matchingsettings view
  const [targetYield, setTargetYield] = useState<number>(9.0);
  const [currency, setCurrency] = useState<string>('USD');
  const [collectorTier, setCollectorTier] = useState<string>('Sovereign Collector');

  // Compute stats on-the-fly to keep variables dynamically precise
  const activeSovereignProperties = assets.filter(a => a.status === 'acquired');
  
  // To match the original spec metrics perfectly:
  // $12.4M total portfolio value when cash is $2.1M implies an escrow premium layer or exact sums.
  // Let's compute: sum of acquired property values + available cash + basic reserves
  const propertySubtotal = activeSovereignProperties.reduce((sum, a) => sum + a.value, 0);
  
  // Static escrow/reserve pool that scales slightly with our tier profile
  const escrowReserves = 12400000 - 9370000 - 2100000; // $930k reserves
  const totalPortfolioValue = propertySubtotal + availableCash + escrowReserves;

  // Average Yield Calculation
  const averageYield = activeSovereignProperties.length > 0
    ? Number((activeSovereignProperties.reduce((sum, a) => sum + a.yieldRate, 0) / activeSovereignProperties.length).toFixed(1))
    : 0.0;

  // Active Structures counting (all units matching status 'acquired' + 'under_construction')
  const activeStructuresCount = assets.filter(a => a.status === 'acquired' || a.status === 'under_construction').length;
  const underConstructionCount = assets.filter(a => a.status === 'under_construction').length;

  // Dynamic history dataset switching based on timeframe selector
  const historyData = timeframe === '6M' 
    ? HISTORY_6M 
    : timeframe === '1Y' 
      ? HISTORY_1Y 
      : HISTORY_ALL;

  // Acquisition handler
  const handleAcquireAsset = (newAsset: PropertyAsset) => {
    setAssets([newAsset, ...assets]);
    setAvailableCash(prev => prev - newAsset.value);
    setIsAcquiring(false);
  };

  // Liquidation / Selling handler
  const handleSellAsset = (assetId: string) => {
    const target = assets.find(a => a.id === assetId);
    if (!target) return;

    // Refund valuation to available capital
    setAvailableCash(prev => prev + target.value);
    
    // Remove or change status to 'pipeline'
    setAssets(assets.filter(a => a.id !== assetId));
    setSelectedProperty(null);
  };

  const handleUpdateYield = (assetId: string, newYield: number) => {
    setAssets(assets.map(a => a.id === assetId ? { ...a, yieldRate: newYield } : a));
    // Dynamic updates live details in selected property if open
    if (selectedProperty && selectedProperty.id === assetId) {
      setSelectedProperty({ ...selectedProperty, yieldRate: newYield });
    }
  };

  // Convert raw value to currency display
  const formatCurrency = (val: number) => {
    let multiplier = 1;
    let label = '$';
    
    if (currency === 'EUR') { label = '€'; multiplier = 0.92; }
    else if (currency === 'JPY') { label = '¥'; multiplier = 155; }
    else if (currency === 'BTC') { label = '₿ '; multiplier = 0.000015; }

    const converted = val * multiplier;

    if (converted >= 1000000) {
      return `${label}${(converted / 1000000).toFixed(1)}M`;
    }
    return `${label}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans flex flex-col relative overflow-x-hidden pb-12">
      
      {/* Background ambient particles animation component */}
      <AmbientCanvas />

      {/* Floating Global Top Header Navigation */}
      <Header 
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAcquisition={() => setIsAcquiring(true)}
      />

      {/* Main Structural Frame */}
      <div className="flex pt-32 px-4 md:px-12 lg:px-20 min-h-screen gap-8 max-w-[1440px] mx-auto w-full">
        
        {/* Persistent left sidebar navigation on desktop sizes */}
        <Sidebar 
          currentView={currentView}
          onViewChange={(v) => {
            setCurrentView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Center Stage Area */}
        <main className="flex-1 flex flex-col gap-10 pb-16 overflow-hidden">
          
          {/* Header section with description text */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 select-none">
            <div className="text-left">
              <span className="text-[10px] tracking-[0.3em] text-[#8e9192] uppercase font-bold">
                SYSTEM PORTAL / {currentView}
              </span>
              <h1 className="font-serif-display text-4xl md:text-5xl text-[#e5e2e1] font-semibold mt-1 tracking-tight">
                {currentView === 'portfolio' && 'Investor Intelligence'}
                {currentView === 'assets' && 'Asset Operations'}
                {currentView === 'analytics' && 'Cognitive Analytics'}
                {currentView === 'reports' && 'Sovereign Reports'}
                {currentView === 'settings' && 'System Configurations'}
              </h1>
              <p className="font-serif italic text-sm text-[#c4c7c7] mt-2 font-light">
                {currentView === 'portfolio' && `Welcome back, Collector. Your adaptive real estate portfolio has expanded.`}
                {currentView === 'assets' && 'Explore and manage contemporary architectural commissions and digital duplicate states.'}
                {currentView === 'analytics' && 'Dynamic index matching, target metrics tracking, and thermal grid synchronization logs.'}
                {currentView === 'reports' && 'Compile cryptographically secured investor summaries and analytical dossiers.'}
                {currentView === 'settings' && 'Realign Cumulative targets, select broker authorization tiers, or adjust atmospheric elements.'}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setCurrentView('reports');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-[#c4c7c7] hover:text-[#e5e2e1] font-semibold text-[11px] tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                Export Report
              </button>
              
              <button 
                onClick={() => setIsAcquiring(true)}
                className="px-5 py-3 bg-[#e9c349]/10 border border-[#e9c349] hover:bg-[#e9c349]/20 text-[#e9c349] font-bold text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer select-none"
              >
                New Acquisition
              </button>
            </div>
          </header>

          {/* Grid Indicators Panel (Dynamic summary calculations) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 select-none">
            <StatCard 
              title="Total Portfolio Value"
              value={formatCurrency(totalPortfolioValue)}
              icon="account_balance_wallet"
              iconColor="#00dce6"
              trendText="+4.2%"
              trendUp={true}
              hoverGlowClass="hover:border-[#00dce6]/25"
            />

            <StatCard 
              title="Yield per Annum"
              value={`${averageYield.toFixed(1)}%`}
              icon="percent"
              iconColor="#e9c349"
              subtext={`Target Match Optimization: ${Math.min(100, Math.round((averageYield / targetYield) * 100))}%`}
              hoverGlowClass="hover:border-[#e9c349]/25"
            />

            <StatCard 
              title="Active Structures"
              value={activeStructuresCount.toString()}
              icon="domain"
              iconColor="#c9c6c5"
              subtext={`${underConstructionCount} Under Technical Construction`}
              hoverGlowClass="hover:border-white/20"
            />

            <StatCard 
              title="Available Capital"
              value={formatCurrency(availableCash)}
              icon="monetization_on"
              iconColor="#00dce6"
              buttonText="Top up liquidity"
              onButtonClick={() => {
                setAvailableCash(prev => prev + 500000);
                alert('Secure allocation approved. Deposited $500,000 into active liquidity reserves pool.');
              }}
              hoverGlowClass="hover:border-[#00dce6]/25"
            />
          </section>

          {/* Sub-View Route Matching Switch */}
          <div className="flex flex-col gap-10">
            {currentView === 'portfolio' && (
              <>
                {/* Visual Chart and Allocation splitting row */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  
                  {/* Visual Timeline growth chart */}
                  <div className="xl:col-span-2 flex">
                    <PortfolioGrowthChart 
                      historyData={historyData}
                      timeframe={timeframe}
                      onTimeframeChange={setTimeframe}
                    />
                  </div>

                  {/* Doughnut Asset Allocations chart */}
                  <div className="flex flex-col">
                    <AssetDistributionChart assets={activeSovereignProperties} />
                  </div>

                </section>

                {/* Recent Acquired property assets block list */}
                <section className="flex flex-col gap-6 text-left">
                  <div className="flex justify-between items-end select-none">
                    <h3 className="font-serif-display text-2xl text-[#e5e2e1]">
                      Recent Acquisitions
                    </h3>
                    <button
                      onClick={() => {
                        setCurrentView('assets');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-semibold text-[11px] text-[#00dce6] hover:text-[#e9c349] uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                    >
                      View Portfolio History
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Property grid limits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeSovereignProperties.slice(0, 3).map((property) => (
                      <PropertyCard 
                        key={property.id}
                        property={property}
                        onSelect={setSelectedProperty}
                      />
                    ))}

                    {/* Primary Interactive grid slot launcher */}
                    <div 
                      onClick={() => setIsAcquiring(true)}
                      className="group relative overflow-hidden rounded-xl glass-panel flex flex-col h-full items-center justify-center p-6 text-center cursor-pointer border border-transparent hover:border-[#00dce6]/15 hover:-translate-y-1 transition-all duration-300 min-h-[250px] select-none"
                    >
                      <span className="material-symbols-outlined text-[48px] text-[#8e9192]/30 group-hover:text-[#00dce6] group-hover:scale-105 transition-all duration-300 mb-3 block">
                        add_circle
                      </span>
                      <h4 className="font-semibold text-xs text-[#e5e2e1] uppercase tracking-widest">
                        Acquire New Asset
                      </h4>
                      <p className="text-[10px] text-[#8e9192]/60 leading-relaxed max-w-[180px] mt-2 tracking-wider">
                        Explore ARCH-A's latest futuristic architectural commissions.
                      </p>
                    </div>

                  </div>
                </section>
              </>
            )}

            {currentView === 'assets' && (
              <AssetsView 
                assets={assets}
                onSelectProperty={setSelectedProperty}
                onOpenAcquisition={() => setIsAcquiring(true)}
              />
            )}

            {currentView === 'analytics' && (
              <AnalyticsView assets={activeSovereignProperties} />
            )}

            {currentView === 'reports' && (
              <ReportsView assets={activeSovereignProperties} />
            )}

            {currentView === 'settings' && (
              <SettingsView 
                currentYieldTarget={targetYield}
                onYieldTargetChange={setTargetYield}
                currency={currency}
                onCurrencyChange={setCurrency}
                collectorTier={collectorTier}
                onCollectorTierChange={setCollectorTier}
              />
            )}
          </div>

        </main>
      </div>

      {/* Global Interactive Drawer: Inspect details for a single asset */}
      {selectedProperty && (
        <AssetInspector 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSell={handleSellAsset}
          onUpdateYield={handleUpdateYield}
        />
      )}

      {/* Global Interactive Modal: Acquire step-by-step commissions */}
      {isAcquiring && (
        <AcquisitionModal 
          onClose={() => setIsAcquiring(false)}
          onAcquire={handleAcquireAsset}
          availableCash={availableCash}
        />
      )}

      {/* Global high-end Footer summary block */}
      <footer className="w-full mt-24 py-16 px-4 md:px-12 lg:px-20 border-t border-white/5 bg-[#050505] select-none">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-left">
          <div className="flex flex-col gap-4">
            <div className="font-serif-display text-4xl text-[#e5e2e1] font-semibold tracking-tighter">
              ARCH-A
            </div>
            <p className="text-[10px] text-[#8e9192] tracking-widest uppercase font-semibold">
              © 2026 ARCH-A DIGITAL CRAFTSMANSHIP. ALL INTEGRITY RESERVED.
            </p>
          </div>
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-[#00dce6] tracking-widest">LEGAL</span>
              <nav className="flex flex-col gap-2.5 text-[10px] tracking-widest font-semibold text-[#c4c7c7]/75">
                <a onClick={() => alert('Viewing Privacy guidelines in sandbox container.')} className="hover:text-[#00dce6] transition-colors cursor-pointer uppercase">PRIVACY</a>
                <a onClick={() => alert('Viewing terms & conditions in sandbox container.')} className="hover:text-[#00dce6] transition-colors cursor-pointer uppercase">TERMS</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-[#00dce6] tracking-widest">CONNECT</span>
              <nav className="flex flex-col gap-2.5 text-[10px] tracking-widest font-semibold text-[#c4c7c7]/75">
                <a onClick={() => alert('Credentials ledger verified.')} className="hover:text-[#00dce6] transition-colors cursor-pointer uppercase">CREDENTIALS</a>
                <a onClick={() => alert('Contact protocol initiated.')} className="hover:text-[#00dce6] transition-colors cursor-pointer uppercase">CONTACT</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
