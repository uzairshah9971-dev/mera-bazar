import React, { useState } from 'react';
import {
  MapPin,
  X,
  ChevronRight,
  Check,
  Globe,
  Navigation,
} from 'lucide-react';
import { RegionNode } from '../../types';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionTree: RegionNode[];
  selectedCity: string;
  onSelectCity: (cityName: string) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  regionTree,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  // Flatten available cities from KPK -> Malakand Division for easy selection
  const kpkNode = regionTree[0]?.children?.[0]; // Khyber Pakhtunkhwa
  const divisions = kpkNode?.children || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Choose Your Local Region</h3>
              <p className="text-[11px] text-slate-400">Discover real shops within walking / driving distance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Location GPS Simulator */}
        <div className="p-3 mx-4 mt-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-xs">
              <span className="font-bold text-white">GPS Detected Region:</span>
              <p className="text-[10px] text-emerald-300">Baghdada, Mardan (Malakand Division)</p>
            </div>
          </div>
          <button
            onClick={() => {
              onSelectCity('Mardan');
              onClose();
            }}
            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
          >
            Use GPS
          </button>
        </div>

        {/* Region Tree */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Pakistan ➔ Khyber Pakhtunkhwa
          </div>

          {divisions.map((div) => (
            <div key={div.id} className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span>{div.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({div.children?.length} cities)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {div.children?.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                  return (
                    <button
                      key={city.id}
                      onClick={() => {
                        onSelectCity(city.name);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold">{city.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Showing real verified physical shops in selected region
        </div>
      </div>
    </div>
  );
};
