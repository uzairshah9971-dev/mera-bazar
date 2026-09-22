import React from 'react';
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Store,
  Phone,
  HelpCircle,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { Order, Shop } from '../../types';

interface CustomerProfileProps {
  orders: Order[];
  savedShops: Shop[];
  currentCity: string;
  onSwitchToShopkeeper: () => void;
  onOpenCitySelector: () => void;
  onSelectOrder: (order: Order) => void;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
  orders,
  savedShops,
  currentCity,
  onSwitchToShopkeeper,
  onOpenCitySelector,
  onSelectOrder,
}) => {
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Ready':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Out for delivery':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Profile Header */}
      <div className="p-4 bg-slate-800/80 border-b border-slate-700/80">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-lg border border-emerald-400/30">
            MF
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white tracking-tight">Muhammad Farhan</h2>
            <p className="text-xs text-slate-400 font-mono">+92 313 9087654</p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <MapPin className="w-3 h-3" />
              <span>Baghdada, {currentCity}</span>
            </div>
          </div>
          <button
            onClick={onOpenCitySelector}
            className="px-2.5 py-1 rounded-xl bg-slate-700 text-slate-200 text-xs font-medium hover:bg-slate-600 transition"
          >
            Change
          </button>
        </div>

        {/* CTA: Register Shop Banner */}
        <div
          onClick={onSwitchToShopkeeper}
          className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/70 border border-emerald-500/40 cursor-pointer hover:border-emerald-400 transition group flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                Own a Real Physical Shop in Mardan?
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">
                Switch to Shopkeeper Mode & upload your local inventory.
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* Orders List Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Local Orders ({orders.length})</span>
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 text-center text-xs text-slate-400">
            You haven't placed any local orders yet.
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => onSelectOrder(ord)}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 transition cursor-pointer shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white">{ord.id}</span>
                    <span className="text-[10px] text-slate-400">• {ord.createdAt}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                      ord.status
                    )}`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={ord.items[0]?.photo}
                    alt="product"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {ord.items[0]?.name}
                    </h4>
                    <p className="text-[10px] text-emerald-400 truncate mt-0.5">
                      {ord.shopName}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        {ord.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                      <span className="font-bold text-white font-mono">
                        Rs. {ord.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preferences & Help */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Account & Support
        </h3>

        <div className="rounded-2xl bg-slate-800/60 border border-slate-700/60 overflow-hidden divide-y divide-slate-700/60 text-xs">
          <button
            onClick={() => alert('Mera Bazaar Support Hotline: 0937-889900 (Mardan Head Office)')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
          >
            <div className="flex items-center gap-2.5 text-slate-200">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Helpline & Shop Dispute Resolution</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => alert('Language set to English (Urdu subtitle enabled)')}
            className="w-full p-3 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
          >
            <div className="flex items-center gap-2.5 text-slate-200">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>App Language: English / اردو</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold">Urdu On</span>
          </button>
        </div>
      </div>
    </div>
  );
};
