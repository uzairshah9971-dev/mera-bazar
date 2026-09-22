import React, { useState } from 'react';
import {
  ArrowLeft,
  PackageCheck,
  Store,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Star,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { Product, Shop } from '../../types';

interface ProductShopModerationProps {
  products: Product[];
  shops: Shop[];
  onBack: () => void;
  onRemoveProduct: (productId: string) => void;
  onToggleFeaturedShop: (shopId: string) => void;
  onToggleShopVerification: (shopId: string) => void;
}

export const ProductShopModeration: React.FC<ProductShopModerationProps> = ({
  products,
  shops,
  onBack,
  onRemoveProduct,
  onToggleFeaturedShop,
  onToggleShopVerification,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('shops');
  const [search, setSearch] = useState('');

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">
              Catalog & Shop Moderation
            </h2>
            <p className="text-[10px] text-slate-400">
              Ensure authenticity of all physical shops and listings
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('shops')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
              activeTab === 'shops'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Manage Shops ({shops.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
              activeTab === 'products'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Moderate Products ({products.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {activeTab === 'shops' ? (
          /* Shops Moderation */
          shops.map((shop) => (
            <div
              key={shop.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 shadow-sm"
            >
              <div className="flex items-start gap-3">
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
                  <p className="text-[11px] text-slate-300">
                    Owner: {shop.shopkeeperName} • {shop.phone}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {shop.address}
                  </p>
                </div>
              </div>

              {/* Moderation Controls */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => onToggleFeaturedShop(shop.id)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                    shop.isPopular
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  <Star className="w-3 h-3" />
                  <span>{shop.isPopular ? 'Featured on Home' : 'Promote to Featured'}</span>
                </button>

                <button
                  onClick={() => onToggleShopVerification(shop.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-300 hover:text-emerald-400 text-[11px] font-medium"
                >
                  {shop.isVerified ? 'Revoke Verified' : 'Verify Shop'}
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Products Moderation (Remove fake products, bad content) */
          products.map((prod) => (
            <div
              key={prod.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3 justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={prod.photos[0]}
                  alt={prod.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    Rs. {prod.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {prod.shopName}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Remove listing "${prod.name}" for violating policies?`)) {
                    onRemoveProduct(prod.id);
                  }
                }}
                className="p-2 rounded-xl bg-slate-700 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-600 transition shrink-0"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
