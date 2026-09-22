import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Store,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface ShopkeeperOrdersProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const ShopkeeperOrders: React.FC<ShopkeeperOrdersProps> = ({
  orders,
  onBack,
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Ready':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Out for delivery':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

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
            <h2 className="text-xs font-bold text-white tracking-tight">Customer Bazaar Orders</h2>
            <p className="text-[10px] text-slate-400">
              Manage incoming local requests & deliveries
            </p>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'Pending', 'Preparing', 'Ready', 'Out for delivery', 'Completed'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize whitespace-nowrap border transition ${
                  activeTab === tab
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {tab === 'all' ? `All (${orders.length})` : tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-800/40 border border-slate-800 text-slate-400 text-xs">
            No orders found under "{activeTab}".
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-white">{ord.id}</span>
                  <span className="text-[10px] text-slate-400">{ord.createdAt}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(
                    ord.status
                  )}`}
                >
                  {ord.status}
                </span>
              </div>

              {/* Items in Order */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-emerald-400 font-mono">
                        {item.quantity} x Rs. {item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer & Delivery Details */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-white">{ord.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Contact:</span>
                  <a
                    href={`tel:${ord.customerPhone}`}
                    className="font-mono text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3 h-3" /> {ord.customerPhone}
                  </a>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Method:</span>
                  <span className="font-semibold text-right text-slate-200">
                    {ord.fulfillmentType === 'delivery'
                      ? `Shop Delivery (${ord.customerAddress})`
                      : 'Self Pickup from Store'}
                  </span>
                </div>
                {ord.notes && (
                  <div className="p-2 rounded-lg bg-slate-850 text-[11px] text-amber-300 border border-slate-800">
                    Note: "{ord.notes}"
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Payable (COD):</span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  Rs. {ord.total.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons Based on Status Progression (Prompt: Accept, Reject, Preparing, Ready, Out for delivery, Completed, Cancelled) */}
              <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-2">
                {ord.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'Preparing')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accept Order
                    </button>
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'Cancelled')}
                      className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 font-bold text-xs transition"
                    >
                      Reject
                    </button>
                  </>
                )}

                {ord.status === 'Preparing' && (
                  <button
                    onClick={() => onUpdateOrderStatus(ord.id, 'Ready')}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
                  >
                    Mark Ready for Pickup / Dispatch
                  </button>
                )}

                {ord.status === 'Ready' && ord.fulfillmentType === 'delivery' && (
                  <button
                    onClick={() => onUpdateOrderStatus(ord.id, 'Out for delivery')}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Truck className="w-3.5 h-3.5" /> Dispatch: Out for Delivery
                  </button>
                )}

                {(ord.status === 'Ready' || ord.status === 'Out for delivery') && (
                  <button
                    onClick={() => onUpdateOrderStatus(ord.id, 'Completed')}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed & Payment Received
                  </button>
                )}

                {ord.status === 'Completed' && (
                  <div className="w-full text-center py-1.5 text-xs text-emerald-400 font-medium">
                    ✓ Order fulfilled successfully at physical shop
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
