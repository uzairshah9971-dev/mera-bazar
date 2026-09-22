import React from 'react';
import {
  MapPin,
  Search,
  Clock,
  CheckCircle2,
  ChevronRight,
  Flame,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  Video,
} from 'lucide-react';
import { Shop, Product, CategoryInfo } from '../../types';

interface CustomerHomeProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  onSearchClick: () => void;
  categories: CategoryInfo[];
  onSelectCategory: (categoryId: string) => void;
  shops: Shop[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectShop: (shop: Shop) => void;
  onViewAllNewStock: () => void;
  onViewAllShops: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  currentCity,
  onOpenCitySelector,
  onSearchClick,
  categories,
  onSelectCategory,
  shops,
  products,
  onSelectProduct,
  onSelectShop,
  onViewAllNewStock,
  onViewAllShops,
}) => {
  const newStockProducts = products.filter((p) => p.isNewStock && p.isAvailable);
  const popularShops = shops.filter((s) => s.isPopular);
  const recentShops = shops.filter((s) => s.isRecent || !s.isPopular);

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100 selection:bg-emerald-500">
      {/* 1. Header with Location Selector */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 pt-3 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 text-white font-bold text-base font-serif">
              م
            </div>
            <div>
              <div className="text-[10px] font-medium tracking-wide text-emerald-400 uppercase">
                Real Physical Market
              </div>
              <button
                id="location-selector-btn"
                onClick={onOpenCitySelector}
                className="flex items-center gap-1.5 text-left group hover:opacity-90 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1">
                  {currentCity}, Khyber Pakhtunkhwa
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Live Bazaars
            </span>
          </div>
        </div>

        {/* 2. Search Bar */}
        <div className="mt-3">
          <div
            id="home-search-bar"
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 cursor-pointer shadow-inner transition group"
          >
            <Search className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition shrink-0" />
            <span className="text-xs text-slate-400 truncate">
              Search real shops or products in Mardan...
            </span>
            <span className="ml-auto text-[10px] bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded-md font-mono">
              Local
            </span>
          </div>
        </div>
      </div>

      {/* Hero Notice: The Real Physical Shop Guarantee */}
      <div className="mx-4 mt-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-800/60 to-teal-950/40 border border-emerald-800/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-300">100% Real Physical Shops</h4>
            <p className="text-[10px] text-slate-300 leading-tight">
              Direct connection with verified shopkeepers in Bank Road, Khwaja Ganj & Cantt.
            </p>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-lg shrink-0">
          Walk-in / Deliver
        </span>
      </div>

      {/* 3. Categories Horizontal Carousel */}
      <div className="mt-4">
        <div className="px-4 flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>Shop Categories</span>
            <span className="text-[10px] text-emerald-400 font-normal">دکانوں کے زمرے</span>
          </h3>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5"
          >
            All 11 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto px-4 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-chip-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center justify-center min-w-[72px] p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-emerald-500/50 transition group shrink-0 active:scale-95 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/90 flex items-center justify-center mb-1.5 group-hover:scale-105 transition border border-slate-700/50 text-emerald-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200 line-clamp-1 group-hover:text-emerald-300">
                {cat.name.split(' ')[0]}
              </span>
              <span className="text-[9px] text-slate-400 font-urdu">{cat.urduName?.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. "New Stock Near You" */}
      <div className="mt-5">
        <div className="px-4 flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-amber-500/15 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                New Stock Near You
                <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  Just Arrived
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Fresh products uploaded by local shopkeepers today</p>
            </div>
          </div>
          <button
            onClick={onViewAllNewStock}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-stretch gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {newStockProducts.slice(0, 5).map((prod) => (
            <div
              key={prod.id}
              id={`prod-card-${prod.id}`}
              onClick={() => onSelectProduct(prod)}
              className="min-w-[190px] w-[190px] bg-slate-800/90 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/60 rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition shrink-0 active:scale-[0.98] shadow-md shadow-black/30"
            >
              <div className="relative h-32 w-full bg-slate-900 overflow-hidden">
                <img
                  src={prod.photos[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600/95 text-white text-[9px] font-bold flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" /> New Stock
                  </span>
                  {prod.videoUrl && (
                    <span className="px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur text-white text-[9px] font-medium flex items-center gap-1">
                      <Video className="w-2.5 h-2.5 text-amber-400" /> Video
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur text-[10px] font-bold text-white font-mono">
                  Rs. {prod.price.toLocaleString()}
                </div>
              </div>

              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition">
                    {prod.name}
                  </h4>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-400 font-medium truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="truncate">{prod.shopName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                    <span className="truncate">{prod.shopLocation}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-medium">In Stock</span>
                  <span className="text-slate-400 text-[9px]">{prod.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. "Popular Shops Near You" */}
      <div className="mt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              Popular Shops Near You
              <span className="text-slate-400 text-xs font-normal">({popularShops.length})</span>
            </h3>
            <p className="text-[10px] text-slate-400">High rated physical shops in Mardan & Malakand</p>
          </div>
          <button
            onClick={onViewAllShops}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            All shops <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="px-4 space-y-3">
          {popularShops.map((shop) => (
            <div
              key={shop.id}
              id={`shop-card-${shop.id}`}
              onClick={() => onSelectShop(shop)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 rounded-2xl p-3.5 cursor-pointer transition active:scale-[0.99] shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-700 shrink-0 border border-slate-600">
                  <img src={shop.logoImage} alt={shop.name} className="w-full h-full object-cover" />
                  <span
                    className={`absolute bottom-0 inset-x-0 text-[8px] font-bold text-center py-0.5 text-white ${
                      shop.isOpenNow ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {shop.isOpenNow ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate hover:text-emerald-300">
                      {shop.name}
                    </h4>
                    {shop.isVerified && (
                      <span title="Physical Store Verified">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Shopkeeper: <span className="text-white font-medium">{shop.shopkeeperName}</span>
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{shop.address}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-300">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      ★ {shop.rating} <span className="text-slate-400 font-normal">({shop.reviewCount})</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{shop.productsCount} products</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">{shop.distanceKm} km away</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{shop.openingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  {shop.deliveryAvailable ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-medium border border-emerald-500/30">
                      <Truck className="w-2.5 h-2.5" /> Delivery (Rs. {shop.deliveryFee})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700 text-slate-300 text-[10px]">
                      In-store Pickup
                    </span>
                  )}
                  <span className="text-emerald-400 flex items-center font-bold text-xs">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. "Recently Added Shops" */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Recently Added Physical Shops</h3>
            <p className="text-[10px] text-slate-400">Newly verified physical merchants in Mardan</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {recentShops.slice(0, 4).map((shop) => (
            <div
              key={shop.id}
              onClick={() => onSelectShop(shop)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 rounded-2xl p-3 cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-20 w-full rounded-xl overflow-hidden bg-slate-900 mb-2">
                  <img src={shop.coverImage} alt={shop.name} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-500/90 text-white text-[9px] font-bold">
                    Verified
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{shop.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{shop.address.split(',')[0]}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-medium">{shop.productsCount} items</span>
                <span className="text-slate-400">{shop.distanceKm} km</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Product Feed: All Available Products in Local Bazaars */}
      <div className="mt-7 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Explore Local Products</h3>
            <p className="text-[10px] text-slate-400">Browse current inventory at physical shops</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 rounded-2xl overflow-hidden cursor-pointer flex flex-col transition group shadow-sm"
            >
              <div className="relative h-32 w-full bg-slate-900 overflow-hidden">
                <img
                  src={prod.photos[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {!prod.isAvailable && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
                      Sold Out
                    </span>
                  </div>
                )}
                {prod.isAvailable && prod.isNewStock && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[9px]">
                    New
                  </span>
                )}
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300">
                    {prod.name}
                  </h4>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      Rs. {prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-slate-500 line-through font-mono">
                        Rs. {prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700/60 flex flex-col gap-0.5 text-[9px] text-slate-400">
                  <span className="text-slate-300 font-medium truncate">{prod.shopName}</span>
                  <span className="text-slate-500 truncate">{prod.shopLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
