import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  CheckCircle2,
  Share2,
  Truck,
  Sparkles,
  Tag,
  Store,
  ExternalLink,
} from 'lucide-react';
import { Shop, Product } from '../../types';

interface ShopProfileProps {
  shop: Shop;
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onChatWithShopkeeper: (shop: Shop) => void;
}

export const ShopProfile: React.FC<ShopProfileProps> = ({
  shop,
  products,
  onBack,
  onSelectProduct,
  onChatWithShopkeeper,
}) => {
  const [activeTab, setActiveTab] = useState<'new_stock' | 'all' | 'offers' | 'about'>('all');
  const shopProducts = products.filter((p) => p.shopId === shop.id);
  const newStock = shopProducts.filter((p) => p.isNewStock);
  const offerProducts = shopProducts.filter((p) => p.offerDiscountPercent && p.offerDiscountPercent > 0);

  const displayedProducts =
    activeTab === 'new_stock'
      ? newStock
      : activeTab === 'offers'
      ? offerProducts
      : shopProducts;

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Cover Header */}
      <div className="relative h-44 w-full bg-slate-950">
        <img
          src={shop.coverImage}
          alt={shop.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Shop link for ${shop.name} copied!`)}
              className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 transition active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Pill */}
        <div className="absolute bottom-3 right-4">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${
              shop.isOpenNow
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
            }`}
          >
            ● {shop.isOpenNow ? 'Store Open Now' : 'Closed for the Day'}
          </span>
        </div>
      </div>

      {/* Shop Identity Header Card */}
      <div className="px-4 -mt-10 relative z-20">
        <div className="p-4 rounded-3xl bg-slate-800/95 border border-slate-700 shadow-xl backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-900 shrink-0 -mt-8 shadow-lg">
              <img src={shop.logoImage} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold text-white truncate tracking-tight">
                  {shop.name}
                </h1>
                {shop.isVerified && (
                  <span title="Verified Physical Store">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Shopkeeper: <span className="font-bold text-white">{shop.shopkeeperName}</span>
              </p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                <span className="capitalize px-2 py-0.5 rounded-md bg-slate-700 text-emerald-300 font-medium">
                  {shop.category}
                </span>
                <span>•</span>
                <span className="text-amber-400 font-bold">★ {shop.rating} ({shop.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Location & Timings Details */}
          <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-200 font-medium">{shop.address}</div>
                <div className="text-[10px] text-slate-400">
                  Landmark: {shop.nearbyLandmark} ({shop.distanceKm} km away)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-300">{shop.openingHours}</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {shop.deliveryAvailable ? (
                <span className="text-emerald-400 font-medium text-[11px]">
                  Local Delivery Available (Rs. {shop.deliveryFee} within {shop.deliveryRadiusKm} km)
                </span>
              ) : (
                <span className="text-slate-400 text-[11px]">
                  Walk-in Physical Store Pickup Only
                </span>
              )}
            </div>
          </div>

          {/* Contact / Directions Buttons */}
          <div className="mt-3.5 pt-3 border-t border-slate-700/60 grid grid-cols-3 gap-2">
            <button
              id="shop-chat-btn"
              onClick={() => onChatWithShopkeeper(shop)}
              className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <a
              href={`tel:${shop.phone}`}
              className="py-2 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 border border-slate-600"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call
            </a>
            <button
              onClick={() => alert(`Directions: Head towards ${shop.address}, Mardan. Approx ${shop.distanceKm} km.`)}
              className="py-2 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 border border-slate-600"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" /> Directions
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: New Stock, All Products, Offers, About */}
      <div className="px-4 mt-5">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({shopProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('new_stock')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'new_stock'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" /> New Stock ({newStock.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
              activeTab === 'offers'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3 h-3" /> Offers ({offerProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'about'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            About & Proof
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'about' ? (
        <div className="p-4 space-y-3.5">
          {/* Shop Story & Description */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              About This Physical Store
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{shop.description}</p>
          </div>

          {/* Physical Verification Photos */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-4 h-4" /> Physical Storefront & Signboard Proof
            </h3>
            <p className="text-[11px] text-slate-400">
              Verified by Mera Bazaar regional inspection team in Mardan.
            </p>
            {shop.physicalSignboardPhoto && (
              <div className="rounded-2xl overflow-hidden border border-slate-700 h-44 bg-slate-900">
                <img
                  src={shop.physicalSignboardPhoto}
                  alt="Signboard"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300">
              <span>Merchant Registered: <strong>{shop.registeredDate}</strong></span>
              <span className="text-emerald-400 font-bold">● Active Merchant</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition group"
              >
                <div className="relative h-28 w-full bg-slate-900">
                  <img
                    src={prod.photos[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  {prod.isNewStock && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[9px]">
                      New Stock
                    </span>
                  )}
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-emerald-400 font-mono">
                    Rs. {prod.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-2.5">
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300">
                    {prod.name}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-medium">
                      {prod.isAvailable ? 'In Stock' : 'Sold Out'}
                    </span>
                    <span className="text-slate-400">{prod.quantity} left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
