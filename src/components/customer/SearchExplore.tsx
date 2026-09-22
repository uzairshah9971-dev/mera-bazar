import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  MapPin,
  Clock,
  Sparkles,
  Truck,
  Layers,
  Map,
  List,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { Shop, Product } from '../../types';

interface SearchExploreProps {
  shops: Shop[];
  products: Product[];
  onSelectShop: (shop: Shop) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchExplore: React.FC<SearchExploreProps> = ({
  shops,
  products,
  onSelectShop,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [filterInStockOnly, setFilterInStockOnly] = useState(false);
  const [filterDeliveryOnly, setFilterDeliveryOnly] = useState(false);
  const [filterNearMe, setFilterNearMe] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const popularSearches = [
    'Charsadda Chappal',
    'Badayuni Barfi',
    'Swati Shawl',
    'Fast Charger 65W',
    'Desi Atta Chakki',
    'Bank Road',
    'Khwaja Ganj',
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesQuery =
        !query ||
        prod.name.toLowerCase().includes(query.toLowerCase()) ||
        prod.shopName.toLowerCase().includes(query.toLowerCase()) ||
        prod.shopLocation.toLowerCase().includes(query.toLowerCase()) ||
        prod.category.toLowerCase().includes(query.toLowerCase());

      const matchesStock = !filterInStockOnly || prod.isAvailable;
      return matchesQuery && matchesStock;
    });
  }, [products, query, filterInStockOnly]);

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesQuery =
        !query ||
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.shopkeeperName.toLowerCase().includes(query.toLowerCase()) ||
        shop.address.toLowerCase().includes(query.toLowerCase()) ||
        shop.category.toLowerCase().includes(query.toLowerCase());

      const matchesDelivery = !filterDeliveryOnly || shop.deliveryAvailable;
      const matchesNear = !filterNearMe || shop.distanceKm <= 2.0;

      return matchesQuery && matchesDelivery && matchesNear;
    });
  }, [shops, query, filterDeliveryOnly, filterNearMe]);

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5" />
          <input
            id="search-input-field"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shops, products or bazaars in Mardan..."
            className="w-full bg-slate-800 border border-slate-700/90 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto mt-3 no-scrollbar">
          <button
            onClick={() => setFilterInStockOnly(!filterInStockOnly)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium shrink-0 border transition ${
              filterInStockOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            In Stock Only
          </button>
          <button
            onClick={() => setFilterDeliveryOnly(!filterDeliveryOnly)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium shrink-0 border transition ${
              filterDeliveryOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            Delivery Available
          </button>
          <button
            onClick={() => setFilterNearMe(!filterNearMe)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium shrink-0 border transition ${
              filterNearMe
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            Near Me (&lt; 2 km)
          </button>

          {/* List vs Map Toggle */}
          <div className="ml-auto flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs ${
                viewMode === 'list' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs ${
                viewMode === 'map' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
              title="Bazaar Map View"
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Quick Searches when query is empty */}
      {!query && (
        <div className="p-4 border-b border-slate-800/80">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Popular in Mardan
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition active:scale-95"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Map View Simulation */}
      {viewMode === 'map' ? (
        <div className="p-4">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 flex flex-col justify-between p-3">
            {/* Simulated stylized street map of Mardan */}
            <div className="absolute inset-0 bg-slate-900 opacity-90">
              <svg className="w-full h-full stroke-slate-800 fill-none" strokeWidth="1.5">
                <path d="M0,40 Q150,60 300,30 T600,80" stroke="#334155" strokeWidth="6" />
                <path d="M80,0 L120,300" stroke="#334155" strokeWidth="4" />
                <path d="M220,0 L180,300" stroke="#334155" strokeWidth="5" />
                <path d="M0,180 Q160,170 350,220" stroke="#334155" strokeWidth="3" />
              </svg>
            </div>

            {/* Pins */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-900/80 backdrop-blur border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  <Navigation className="w-3 h-3" /> Mardan Commercial Hub
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded font-mono">
                  {filteredShops.length} Physical Stores
                </span>
              </div>

              {/* Sample Interactive Pins on Map */}
              <div className="flex items-center justify-around my-auto">
                {filteredShops.slice(0, 3).map((shop, i) => (
                  <button
                    key={shop.id}
                    onClick={() => onSelectShop(shop)}
                    className="group flex flex-col items-center animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-emerald-500 text-[9px] font-bold text-emerald-300 shadow-lg">
                      {shop.name.split(' ')[0]}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs mt-0.5">
                      📍
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 backdrop-blur border border-slate-800 text-[11px] text-slate-300">
                Tap any store pin to open direct physical shop profile & location.
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Matching Physical Shops */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Physical Shops ({filteredShops.length})
          </h3>
        </div>

        {filteredShops.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-center text-xs text-slate-400">
            No matching physical shops found.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => onSelectShop(shop)}
                className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 cursor-pointer flex items-center gap-3 transition hover:border-emerald-500/50"
              >
                <img
                  src={shop.logoImage}
                  alt={shop.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate">{shop.name}</h4>
                    {shop.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                    <span className="truncate">{shop.address}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-400 font-medium">{shop.distanceKm} km away</span>
                    <span>•</span>
                    <span className="text-slate-400">{shop.openingHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Matching Products */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Matching Products ({filteredProducts.length})
          </h3>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-center text-xs text-slate-400">
            No products matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition group"
              >
                <div className="relative h-28 w-full bg-slate-900">
                  <img
                    src={prod.photos[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-emerald-400 font-mono">
                    Rs. {prod.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-2.5">
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{prod.shopName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
