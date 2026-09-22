import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Sparkles,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { Product } from '../../types';

interface ManageProductsProps {
  products: Product[];
  onBack: () => void;
  onAddNew: () => void;
  onEditProduct: (product: Product) => void;
  onToggleAvailability: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ManageProducts: React.FC<ManageProductsProps> = ({
  products,
  onBack,
  onAddNew,
  onEditProduct,
  onToggleAvailability,
  onDeleteProduct,
}) => {
  const [filter, setFilter] = useState<'all' | 'new_stock' | 'sold_out'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter((p) => {
    if (filter === 'new_stock' && !p.isNewStock) return false;
    if (filter === 'sold_out' && p.isAvailable) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">Manage Shop Catalog</h2>
              <p className="text-[10px] text-slate-400 font-mono">
                {products.length} products listed in Mardan
              </p>
            </div>
          </div>

          <button
            onClick={onAddNew}
            className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter your products..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mt-2.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
              filter === 'all'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilter('new_stock')}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
              filter === 'new_stock'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            New Stock
          </button>
          <button
            onClick={() => setFilter('sold_out')}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
              filter === 'sold_out'
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Sold Out
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="p-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-800/40 border border-slate-800 text-slate-400 text-xs">
            No products found matching this filter.
          </div>
        ) : (
          filtered.map((prod) => (
            <div
              key={prod.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                  <img src={prod.photos[0]} alt={prod.name} className="w-full h-full object-cover" />
                  {prod.isNewStock && (
                    <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[8px]">
                      NEW
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{prod.name}</h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      Rs. {prod.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Qty: {prod.quantity}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                    <span>Category: <strong className="text-slate-300 capitalize">{prod.category}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                {/* 1-tap Available / Sold Out Switch */}
                <button
                  onClick={() => onToggleAvailability(prod.id)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 ${
                    prod.isAvailable
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      prod.isAvailable ? 'bg-emerald-400' : 'bg-rose-500'
                    }`}
                  />
                  <span>{prod.isAvailable ? 'In Stock (Active)' : 'Sold Out'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditProduct(prod)}
                    className="p-1.5 rounded-xl bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px] px-2.5"
                  >
                    <Edit2 className="w-3 h-3 text-emerald-400" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${prod.name} from shop listing?`)) {
                        onDeleteProduct(prod.id);
                      }
                    }}
                    className="p-1.5 rounded-xl bg-slate-700/60 text-slate-400 hover:text-rose-400 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
