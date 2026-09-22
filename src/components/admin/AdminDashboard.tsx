import React from 'react';
import {
  ShieldAlert,
  Store,
  Users,
  PackageCheck,
  ShoppingBag,
  AlertOctagon,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { PendingShopApproval } from '../../data/mockData';

interface AdminDashboardProps {
  pendingApprovals: PendingShopApproval[];
  totalShopsCount: number;
  totalProductsCount: number;
  totalOrdersCount: number;
  onNavigateTo: (screen: 'shop_approval' | 'product_shop_management' | 'regional_management') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  pendingApprovals,
  totalShopsCount,
  totalProductsCount,
  totalOrdersCount,
  onNavigateTo,
}) => {
  const pendingCount = pendingApprovals.filter((a) => a.status === 'pending').length;

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/60 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Platform Control
              </div>
              <h1 className="text-base font-extrabold text-white tracking-tight">
                Mera Bazaar Admin
              </h1>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold">
            KP Regional Hub
          </span>
        </div>

        {/* Pending Approvals Notice Banner */}
        {pendingCount > 0 && (
          <div
            onClick={() => onNavigateTo('shop_approval')}
            className="mt-3.5 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between cursor-pointer hover:bg-amber-500/20 transition group"
          >
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{pendingCount} Physical Shops Awaiting Verification</span>
            </div>
            <span className="text-[11px] text-amber-300 font-bold flex items-center group-hover:translate-x-0.5 transition">
              Review <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* Metric Cards Grid (Prompt: Total Shops, Active Shops, Total Customers, Products, Orders, Reported Products, Reported Shops, Pending Shop Approvals) */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Marketplace Overview
          </h2>
          <span className="text-[10px] text-slate-400">Live Statistics</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Total Shops */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Shops</span>
              <Store className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {totalShopsCount + 112}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">118 in Mardan / Malakand</div>
            </div>
          </div>

          {/* Active Shops */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Shops Today</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-emerald-400 font-mono">
                {totalShopsCount + 94}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Open & accepting orders</div>
            </div>
          </div>

          {/* Total Customers */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Customers</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                8,420
              </div>
              <div className="text-[10px] text-blue-400 mt-0.5">+142 joined this week</div>
            </div>
          </div>

          {/* Listed Products */}
          <div
            onClick={() => onNavigateTo('product_shop_management')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Catalog Products</span>
              <PackageCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {totalProductsCount + 240}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Manage items</div>
            </div>
          </div>

          {/* Orders */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {totalOrdersCount + 680}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Rs. 1.8M GMV processed</div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div
            onClick={() => onNavigateTo('shop_approval')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/40 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-amber-300 text-xs">
              <span>Pending Approvals</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-amber-300 font-mono">
                {pendingCount}
              </div>
              <div className="text-[10px] text-amber-400 mt-0.5">Requires physical check</div>
            </div>
          </div>

          {/* Reported Products */}
          <div
            onClick={() => onNavigateTo('product_shop_management')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Reported Items</span>
              <AlertOctagon className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-rose-400 font-mono">
                2
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Unverified price flag</div>
            </div>
          </div>

          {/* Reported Shops */}
          <div
            onClick={() => onNavigateTo('product_shop_management')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Reported Shops</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                0
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">All stores verified</div>
            </div>
          </div>
        </div>

        {/* Business Model & Monetization Section (Part 9 in Prompt) */}
        <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Marketplace Monetization Model</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Simple & Local</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Designed to remain affordable for small local shopkeepers across Khyber Pakhtunkhwa:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60">
              <div className="font-bold text-white text-[11px]">Monthly Subscription</div>
              <div className="text-emerald-400 font-mono text-xs font-bold mt-0.5">Rs. 999 / month</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Unlimited listings & chat</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60">
              <div className="font-bold text-white text-[11px]">Featured Promotion</div>
              <div className="text-amber-300 font-mono text-xs font-bold mt-0.5">Rs. 450 / 7 days</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Top of Mardan home feed</div>
            </div>
          </div>
        </div>

        {/* Admin Navigation Hub */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Marketplace Control Modules
          </h3>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700/60 divide-y divide-slate-700/60 overflow-hidden text-xs">
            <button
              onClick={() => onNavigateTo('shop_approval')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Store className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">16. Physical Shop Approval Center</div>
                  <div className="text-[10px] text-slate-400">Review CNIC, utility bill & signboard photos</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigateTo('product_shop_management')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">17. Product & Shop Moderation</div>
                  <div className="text-[10px] text-slate-400">Remove fake items, suspend accounts, feature shops</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigateTo('regional_management')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">18. Regional & City Hierarchy Manager</div>
                  <div className="text-[10px] text-slate-400">Pakistan ➔ KPK ➔ Malakand ➔ Mardan, Swat, Dir</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
