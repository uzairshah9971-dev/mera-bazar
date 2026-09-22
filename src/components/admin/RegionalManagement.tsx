import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Plus,
  ChevronRight,
  Globe,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { RegionNode } from '../../types';

interface RegionalManagementProps {
  regionTree: RegionNode[];
  onBack: () => void;
  onAddCity: (divisionId: string, cityName: string) => void;
}

export const RegionalManagement: React.FC<RegionalManagementProps> = ({
  regionTree,
  onBack,
  onAddCity,
}) => {
  const [newCityName, setNewCityName] = useState('');
  const [selectedDivisionId, setSelectedDivisionId] = useState('kpk-malakand');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    onAddCity(selectedDivisionId, newCityName.trim());
    setNewCityName('');
  };

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">
              Regional Expansion Hierarchy
            </h2>
            <p className="text-[10px] text-slate-400">
              Pakistan ➔ Provinces ➔ Divisions ➔ Cities
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Hierarchy Explanation Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-850 to-slate-900 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Regional Scalability Architecture</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mera Bazaar is built so customers only see shops and products within their active city
            or division, preventing cross-country noise while enabling physical storefront connections.
          </p>
        </div>

        {/* Tree Display */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Geographical Hierarchy
          </h3>

          {regionTree.map((country) => (
            <div
              key={country.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>{country.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Country Level
                </span>
              </div>

              <div className="pl-4 space-y-3 border-l-2 border-slate-700">
                {country.children?.map((province) => (
                  <div key={province.id} className="space-y-2">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span>• {province.name}</span>
                      <span className="text-[10px] text-slate-400">(Province)</span>
                    </div>

                    <div className="pl-4 space-y-2 border-l border-slate-700/60">
                      {province.children?.map((division) => (
                        <div
                          key={division.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-400">
                              {division.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {division.children?.length || 0} Cities Active
                            </span>
                          </div>

                          {/* Cities Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {division.children?.map((city) => (
                              <span
                                key={city.id}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white font-medium flex items-center gap-1"
                              >
                                <MapPin className="w-3 h-3 text-emerald-400" />
                                <span>{city.name}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add City Form */}
        <form
          onSubmit={handleAdd}
          className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add New City to Marketplace
          </h3>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Target Division</label>
            <select
              value={selectedDivisionId}
              onChange={(e) => setSelectedDivisionId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="kpk-malakand">Malakand Division (KPK)</option>
              <option value="kpk-peshawar">Peshawar Division (KPK)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">City Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="e.g. Swat, Buner, Dir..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                + Add City
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
