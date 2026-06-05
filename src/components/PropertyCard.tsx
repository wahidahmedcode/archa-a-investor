/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PropertyAsset } from '../types';

interface PropertyCardProps {
  property: PropertyAsset;
  onSelect: (property: PropertyAsset) => void;
  key?: string;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const isDigital = property.type === 'digital_twin';
  const typeAccent = isDigital ? '#00dce6' : '#e9c349';

  return (
    <div 
      onClick={() => onSelect(property)}
      className="group relative overflow-hidden rounded-xl glass-panel flex flex-col h-full cursor-pointer border border-transparent hover:border-[#00dce6]/20 transition-all duration-300 md:duration-500 hover:-translate-y-1 select-none flex-shrink-0"
    >
      {/* Absolute Badge detailing Type of Asset */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase bg-[#131313]/90 backdrop-blur-md rounded border border-white/5 select-none text-[#e5e2e1]">
        <div 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ backgroundColor: typeAccent }}
        />
        {property.type.replace('_', ' ')}
      </div>

      {/* Image container */}
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out select-none"
          src={property.imageUrl}
          alt={property.name}
          referrerPolicy="no-referrer"
        />
        {/* Subtle glass grid grid lines overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Descriptive Metadata section */}
      <div className="p-6 flex flex-col gap-3 justify-between flex-grow">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-semibold text-[13px] text-[#e5e2e1] uppercase tracking-wider font-sans group-hover:text-[#00dce6] transition-colors duration-300">
              {property.name}
            </h4>
            <p className="text-[10px] text-[#8e9192] uppercase tracking-[0.15em] font-sans mt-0.5">
              {property.location}
            </p>
          </div>
          <span 
            className="text-[12px] font-bold tracking-widest text-[#00dce6]"
            style={{ color: typeAccent }}
          >
            +{property.growthRate}%
          </span>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
          <span className="font-semibold text-[13px] text-[#c4c7c7] tracking-wider">
            ${property.value.toLocaleString()}
          </span>
          <span className="material-symbols-outlined text-[#8e9192] group-hover:text-[#00dce6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
            arrow_outward
          </span>
        </div>
      </div>
    </div>
  );
}
