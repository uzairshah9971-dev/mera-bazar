import React, { useState } from 'react';
import {
  Shirt,
  Footprints,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Tv,
  Smartphone,
  Trophy,
  Flower2,
  Armchair,
  Layers,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { CategoryInfo, Shop, Product } from '../../types';

interface CustomerCategoriesProps {
  categories: CategoryInfo[];
  shops: Shop[];
  products: Product[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectShop: (shop: Shop) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export const CustomerCategories: React.FC<CustomerCategoriesProps> = ({
  categories,
  shops,
  products,
  selectedCategoryId,
  onSelectCategory,
  onSelectShop,
  onSelectProduct,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | string>(selectedCategoryId || 'all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'clothing':
        return <Shirt className="w-5 h-5" />;
      case 'shoes':
        return <Footprints className="w-5 h-5" />;
      case 'jewelry':
        return <Sparkles className="w-5 h-5" />;
      case 'grocery':
        return <ShoppingBag className="w-5 h-5" />;
      case 'food':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'electronics':
        return <Tv className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'sports':
        return <Trophy className="w-5 h-5" />;
      case 'cosmetics':
        return <Flower2 className="w-5 h-5" />;
      case 'furniture':
        return <Armchair className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const filteredShops =
    activeTab === 'all' ? shops : shops.filter((s) => s.category === activeTab);

  const filteredProducts =
    activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Marketplace Categories</span>
            <span className="text-xs text-emerald-400 font-urdu font-normal">زمرہ جات</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Browse real physical stores by category in Mardan & Malakand
          </p>
        </div>
      </div>

      {/* Categories Grid (Screen 2 requirement) */}
      <div className="p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          11 Local Bazaar Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
              activeTab === 'all'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                : 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">All Categories</div>
                <div className="text-[10px] text-slate-400 font-urdu">تمام زمرے</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {products.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = activeTab === cat.id;
            const shopCount = shops.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => {
                  setActiveTab(cat.id);
                  onSelectCategory(cat.id);
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-emerald-400'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate leading-tight">
                      {cat.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400 font-urdu truncate">
                      {cat.urduName}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-medium text-slate-400">
                    {shopCount} shops
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Shops for this Category */}
      <div className="px-4 mt-2">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Physical Shops ({filteredShops.length})
          </h3>
        </div>

        {filteredShops.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-800/40 border border-slate-800 text-slate-400 text-xs">
            No physical shops found in this category right now.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => onSelectShop(shop)}
                className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 flex items-center gap-3 cursor-pointer hover:border-emerald-500/50 transition"
              >
                <img
                  src={shop.logoImage}
                  alt={shop.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{shop.name}</h4>
                  <p className="text-[10px] text-emerald-400">{shop.shopkeeperName}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
                    <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                    <span className="truncate">{shop.address}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filtered Products */}
      <div className="px-4 mt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Products in this Category ({filteredProducts.length})
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition group"
            >
              <div className="relative h-28 w-full bg-slate-900">
                <img src={prod.photos[0]} alt={prod.name} className="w-full h-full object-cover" />
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
      </div>
    </div>
  );
};
