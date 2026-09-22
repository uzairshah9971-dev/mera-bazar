import React from 'react';
import {
  Store,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  Users,
  MessageSquare,
  Plus,
  ChevronRight,
  Clock,
  ArrowUpRight,
  PackageCheck,
  Truck,
} from 'lucide-react';
import { Shop, Product, Order, Conversation } from '../../types';

interface ShopkeeperDashboardProps {
  shop: Shop;
  products: Product[];
  orders: Order[];
  conversations: Conversation[];
  onNavigate: (screen: 'add_product' | 'manage_products' | 'shopkeeper_orders' | 'shopkeeper_messages' | 'shopkeeper_profile') => void;
  onToggleStoreStatus: () => void;
}

export const ShopkeeperDashboard: React.FC<ShopkeeperDashboardProps> = ({
  shop,
  products,
  orders,
  conversations,
  onNavigate,
  onToggleStoreStatus,
}) => {
  const shopProducts = products.filter((p) => p.shopId === shop.id);
  const newStockCount = shopProducts.filter((p) => p.isNewStock).length;
  const soldOutCount = shopProducts.filter((p) => !p.isAvailable).length;

  const todayOrders = orders.filter((o) => o.shopId === shop.id);
  const pendingOrders = todayOrders.filter((o) => o.status === 'Pending');
  const todaySales = todayOrders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Header Greeting */}
      <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-900 shrink-0">
              <img src={shop.logoImage} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[11px] text-emerald-400 font-medium">
                Assalam-o-Alaikum, {shop.shopkeeperName}
              </div>
              <h1 className="text-base font-extrabold text-white tracking-tight line-clamp-1">
                {shop.name}
              </h1>
              <div className="text-[10px] text-slate-400">{shop.address.split(',')[0]}, Mardan</div>
            </div>
          </div>

          {/* Quick Open/Close Toggle */}
          <button
            id="store-status-toggle"
            onClick={onToggleStoreStatus}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              shop.isOpenNow
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                shop.isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span>{shop.isOpenNow ? 'Store Open' : 'Closed'}</span>
          </button>
        </div>

        {/* Pending Order Alert if any */}
        {pendingOrders.length > 0 && (
          <div
            onClick={() => onNavigate('shopkeeper_orders')}
            className="mt-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between cursor-pointer hover:bg-amber-500/20 transition"
          >
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{pendingOrders.length} New Customer Order Pending!</span>
            </div>
            <span className="text-[11px] text-amber-400 font-bold flex items-center">
              Review <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* Main Metric Cards Grid (Prompt requirements: Today's Orders, Today's Sales, Products, New Stock, Sold Out, Customers, Messages) */}
      <div className="p-4 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Today's Bazaar Performance
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Today's Sales */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Today's Sales</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-emerald-400 font-mono">
                Rs. {todaySales.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                From {todayOrders.length} customer orders
              </div>
            </div>
          </div>

          {/* Today's Orders */}
          <div
            onClick={() => onNavigate('shopkeeper_orders')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Today's Orders</span>
              <ShoppingBag className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {todayOrders.length}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {pendingOrders.length} awaiting response
              </div>
            </div>
          </div>

          {/* Active Products */}
          <div
            onClick={() => onNavigate('manage_products')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Listed Items</span>
              <PackageCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {shopProducts.length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Physical store catalog</div>
            </div>
          </div>

          {/* New Stock */}
          <div
            onClick={() => onNavigate('manage_products')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>New Stock</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-amber-300 font-mono">
                {newStockCount}
              </div>
              <div className="text-[10px] text-amber-400/80 mt-0.5">Visible to nearby customers</div>
            </div>
          </div>

          {/* Sold Out Alerts */}
          <div
            onClick={() => onNavigate('manage_products')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Sold Out</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-rose-400 font-mono">
                {soldOutCount}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Needs restocking in shop</div>
            </div>
          </div>

          {/* Customer Inquiries */}
          <div
            onClick={() => onNavigate('shopkeeper_messages')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Customer Chats</span>
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-extrabold text-white font-mono">
                {conversations.length}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {unreadMessages > 0 ? `${unreadMessages} new message` : 'All caught up'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons (Prompt: + Add Product, + Add New Stock, View Orders, Manage Products, Messages) */}
        <div className="space-y-2.5 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Shop Actions
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="add-product-btn"
              onClick={() => onNavigate('add_product')}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Product</span>
            </button>

            <button
              id="add-new-stock-btn"
              onClick={() => onNavigate('add_product')}
              className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-amber-950/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>+ Post New Stock</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              id="view-orders-btn"
              onClick={() => onNavigate('shopkeeper_orders')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex flex-col items-center gap-1 transition"
            >
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>Orders ({todayOrders.length})</span>
            </button>

            <button
              id="manage-products-btn"
              onClick={() => onNavigate('manage_products')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex flex-col items-center gap-1 transition"
            >
              <PackageCheck className="w-4 h-4 text-purple-400" />
              <span>Products ({shopProducts.length})</span>
            </button>

            <button
              id="messages-btn"
              onClick={() => onNavigate('shopkeeper_messages')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex flex-col items-center gap-1 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chats ({conversations.length})</span>
            </button>
          </div>
        </div>

        {/* Live Shop Profile Summary Card */}
        <div
          onClick={() => onNavigate('shopkeeper_profile')}
          className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 cursor-pointer hover:border-emerald-500/50 transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Physical Shop Profile & Settings</div>
              <div className="text-[10px] text-slate-400">
                Opening hours: {shop.openingHours} • {shop.deliveryAvailable ? 'Delivery Active' : 'Pickup Only'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
