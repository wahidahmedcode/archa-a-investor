/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PropertyAsset, AssetType, AssetStatus } from '../types';
import { AVAILABLE_LOCATIONS, PRESET_IMAGES } from '../data';

interface AcquisitionModalProps {
  onClose: () => void;
  onAcquire: (asset: PropertyAsset) => void;
  availableCash: number;
}

export default function AcquisitionModal({ onClose, onAcquire, availableCash }: AcquisitionModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState<AssetType>('residential');
  const [location, setLocation] = useState(AVAILABLE_LOCATIONS[0]);
  const [value, setValue] = useState<number>(1500000);
  const [yieldRate, setYieldRate] = useState<number>(8.5);
  const [growthRate, setGrowthRate] = useState<number>(2.4);
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[2]);
  const [coordinates, setCoordinates] = useState('35.6762° N, 139.6503° E');
  
  // Custom materials selection
  const presetMaterials = [
    'Polycrystalline Smart Glass',
    'Sintered Volcano Obsidian',
    'Gilded Titanium Compound',
    'Treated Bio-Timber',
    'Unreal Core Matrix V2',
    'Reinforced Carbon Fiber composite',
    'Refractive Crystalline Shaders'
  ];
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([presetMaterials[0], presetMaterials[1]]);

  const handleToggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      if (step === 1 && !name.trim()) {
        alert('Please specify a structural name for this commission.');
        return;
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const isDigital = type === 'digital_twin';
    const code = `ARCH-${type.substring(0,2).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const twinNode = isDigital ? `META-${name.substring(0,4).toUpperCase()}-NODE` : undefined;
    const carbonIndex = type === 'digital_twin' 
      ? 'Zero Virtual Carbon' 
      : selectedMaterials.includes('Treated Bio-Timber') ? 'A+++ (Net Active Emission Absorber)' : 'A+ (Negative Emissions)';

    const newAsset: PropertyAsset = {
      id: Date.now().toString(),
      name,
      code,
      type,
      location,
      value,
      yieldRate,
      growthRate,
      imageUrl: selectedImage,
      description: `Contemporary futuristic commissioning representing the next frontier of ARCH-A digital craftsmanship in ${location}. Built with dynamic high-contrast geometries.`,
      coordinates: isDigital ? `${name.toLowerCase()}.metaverse.arch` : coordinates,
      status: 'acquired',
      materials: selectedMaterials.length ? selectedMaterials : ['Standard Titanium Composite'],
      twinNode,
      carbonIndex,
      completionYear: 2026
    };

    onAcquire(newAsset);
  };

  // Check if cost fits budget
  const isAffordable = value <= availableCash;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Container */}
      <div className="glass-panel-heavy w-full max-w-2xl text-left rounded-none border border-white/10 relative z-10 flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header bar */}
        <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#131313]/55">
          <div>
            <span className="font-semibold text-[10px] tracking-[0.3em] text-[#8e9192] uppercase">
              Step {step} of 3
            </span>
            <h3 className="font-serif-display text-xl text-[#e5e2e1] font-medium mt-0.5">
              Acquisition Blueprint
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-[#8e9192] hover:text-[#00dce6] transition-colors cursor-pointer"
          >
            close
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-8 overflow-y-auto flex-1 flex flex-col gap-6">
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                  Structural Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elysian Pavilion"
                  className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] px-1 py-1 px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none placeholder:text-white/20 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold mb-1">
                  Asset Classification
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['residential', 'digital_twin', 'commercial'] as AssetType[]).map((t) => {
                    const isSelected = type === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`py-4 text-[10px] tracking-[0.15em] font-semibold uppercase border transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#00dce6] text-[#00dce6] bg-[#00dce6]/5' 
                            : 'border-white/5 text-[#c4c7c7]/60 hover:border-white/20'
                        }`}
                      >
                        {t.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                    Global Location / Node
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] py-3 px-2 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none text-sm cursor-pointer"
                  >
                    {AVAILABLE_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#131313]">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                    Physical Coordinates
                  </label>
                  <input 
                    type="text" 
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    disabled={type === 'digital_twin'}
                    placeholder="e.g. 64.1466° N, 21.9426° W"
                    className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none text-sm placeholder:text-white/20 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              {/* Financial metric inputs */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                    Capital Budget Allocation
                  </label>
                  <span className={`text-[12px] font-semibold tracking-wider ${isAffordable ? 'text-[#00dce6]' : 'text-red-400'}`}>
                    Wallet Pool: ${availableCash.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-[#e5e2e1] font-semibold text-sm">$</span>
                  <input 
                    type="number" 
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    max={availableCash}
                    className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] pl-8 pr-3 py-3 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none text-sm font-semibold"
                  />
                </div>
                {!isAffordable && (
                  <p className="text-[11px] text-red-400">
                    ⚠ Cost exceeds your modern available liquidity pool. Reduce allocation.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                    Optimized Yield per Annum (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={yieldRate}
                    onChange={(e) => setYieldRate(Number(e.target.value))}
                    className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                    Projected Month-over-Month Growth (%)
                  </label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                    className="bg-[#050505] border-b border-white/10 text-[#e5e2e1] px-3 py-3 w-full focus:outline-none focus:border-[#00dce6] transition-colors rounded-none text-sm"
                  />
                </div>
              </div>

              {/* Preset Visual Selector */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                  Architectural Imagery Preset
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_IMAGES.map((img, idx) => {
                    const isSelected = selectedImage === img;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`h-12 border-2 overflow-hidden transition-all relative cursor-pointer ${
                          isSelected ? 'border-[#00dce6] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="Preset option" 
                          className="w-full h-full object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              {/* Materials grid checklist */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold">
                  Structural Material Inventory
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 select-none">
                  {presetMaterials.map((mat) => {
                    const isChecked = selectedMaterials.includes(mat);
                    return (
                      <div 
                        key={mat}
                        onClick={() => handleToggleMaterial(mat)}
                        className={`flex items-center gap-3 p-3.5 border text-xs tracking-wider font-semibold cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-[#00dce6]/60 text-[#e5e2e1] bg-[#00dce6]/5' 
                            : 'border-white/5 text-[#c4c7c7]/50 hover:border-white/15'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span>{mat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review summary preview */}
              <div className="p-5 border border-white/5 bg-white/[0.02] flex flex-col gap-2 select-none">
                <span className="text-[9px] tracking-[0.2em] uppercase bg-[#00dce6]/10 text-[#00dce6] font-bold px-2 py-0.5 self-start rounded">
                  Blueprint Verified
                </span>
                <p className="text-sm font-semibold text-[#e5e2e1] mt-1.5">{name}</p>
                <p className="text-xs text-[#c4c7c7]/75">
                  A high-contrast {type.replace('_', ' ')} unit built in {location} featuring {selectedMaterials.join(', ')}.
                </p>
                <p className="text-xs text-[#8e9192] font-mono mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                  Estimated carbon rating: {type === 'digital_twin' ? 'Zero Virtual Emissions' : selectedMaterials.includes('Treated Bio-Timber') ? 'Negative-Emissions (A+++ Award)' : 'Net-Zero Carbon (A+)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-5 border-t border-white/5 flex justify-between bg-[#131313]/55 select-none">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 py-2.5 border border-white/10 text-[#c4c7c7]/70 font-semibold text-xs tracking-widest uppercase hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            BACK
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 border border-[#00dce6] text-[#00dce6] hover:bg-[#00dce6]/5 hover:neon-glow font-semibold text-xs tracking-widest uppercase transition-all cursor-pointer"
            >
              NEXT
            </button>
          ) : (
            <button
              type="button"
              disabled={!isAffordable || !name.trim()}
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#e9c349] text-[#131102] font-bold text-xs tracking-widest uppercase hover:bg-[#ffe088] transition-all disabled:opacity-30 disabled:pointer-events-none shadow-[0_0_20px_rgba(233,195,73,0.15)] cursor-pointer"
            >
              COMMISSION ASSET
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
