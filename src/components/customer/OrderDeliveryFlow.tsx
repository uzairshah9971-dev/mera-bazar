import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Truck,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { Product, Shop, Order, FulfillmentType } from '../../types';

interface OrderDeliveryFlowProps {
  product: Product;
  shop: Shop | undefined;
  onBack: () => void;
  onSubmitOrder: (order: Order) => void;
}

export const OrderDeliveryFlow: React.FC<OrderDeliveryFlowProps> = ({
  product,
  shop,
  onBack,
  onSubmitOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>(
    shop?.deliveryAvailable ? 'delivery' : 'pickup'
  );
  const [customerName, setCustomerName] = useState('Muhammad Farhan');
  const [customerPhone, setCustomerPhone] = useState('0313-9087654');
  const [customerAddress, setCustomerAddress] = useState('House #42, Street 3, Baghdada, Mardan');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  const deliveryFee = fulfillmentType === 'delivery' ? (shop?.deliveryFee || 120) : 0;
  const subtotal = product.price * quantity;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      shopId: product.shopId,
      shopName: product.shopName,
      customerName,
      customerPhone,
      customerAddress:
        fulfillmentType === 'delivery' ? customerAddress : `Self Pickup at ${shop?.address || 'Physical Shop'}`,
      fulfillmentType,
      items: [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          photo: product.photos[0],
        },
      ],
      subtotal,
      deliveryFee,
      total,
      status: 'Pending',
      createdAt: 'Just now',
      notes,
    };

    setCreatedOrderId(newOrderId);
    setIsSubmitted(true);
    onSubmitOrder(newOrder);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-slate-900 min-h-full flex flex-col items-center justify-center text-center text-slate-100">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">Order Request Sent!</h2>
        <p className="text-xs text-slate-400 max-w-xs mt-1">
          Your order has been directly transmitted to <strong className="text-white">{product.shopName}</strong> ({shop?.shopkeeperName}).
        </p>

        <div className="w-full max-w-sm my-5 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-700">
            <span className="text-slate-400">Order ID:</span>
            <span className="font-mono font-bold text-emerald-400">{createdOrderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Fulfillment:</span>
            <span className="font-semibold text-white capitalize">
              {fulfillmentType === 'delivery' ? 'Local Shop Delivery' : 'Self-Pickup from Shop'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Total Payable:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              Rs. {total.toLocaleString()} (Cash on Delivery)
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-700 text-[11px]">
            <span className="text-slate-400">Initial Status:</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
              Pending Shopkeeper Confirmation
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full max-w-sm py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition active:scale-95 shadow-lg shadow-emerald-950/50"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">Place Order / Request</h2>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{product.shopName}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400 font-mono">
          Cash On Delivery
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Selected Product Summary Card */}
        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
              Rs. {product.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              In Store: {product.shopLocation}
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Select Quantity</div>
            <div className="text-[10px] text-slate-400">Maximum {product.quantity} in stock</div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-xs font-mono text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Fulfillment Type Toggle (Delivery vs Pickup) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Fulfillment Method
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              id="pickup-option-btn"
              onClick={() => setFulfillmentType('pickup')}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                fulfillmentType === 'pickup'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 border-slate-700/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Self Pickup</span>
              </div>
              <span className="text-[10px] text-slate-400">
                Collect directly at physical shop (Free)
              </span>
            </button>

            <button
              type="button"
              id="delivery-option-btn"
              onClick={() => {
                if (shop && !shop.deliveryAvailable) {
                  alert('This physical shop currently only supports in-store pickup!');
                  return;
                }
                setFulfillmentType('delivery');
              }}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                fulfillmentType === 'delivery'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 border-slate-700/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Shop Delivery</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {shop?.deliveryAvailable
                  ? `Delivered by shop rider (Rs. ${shop.deliveryFee})`
                  : 'Shop delivery not supported'}
              </span>
            </button>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-400" /> Customer Information
          </h3>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Phone Number (For Verification)</label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          {fulfillmentType === 'delivery' ? (
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Street Address & Nearby Landmark in Mardan
              </label>
              <textarea
                required
                rows={2}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="House / Flat #, Street, Area, landmark..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Pickup Location:</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{shop?.address}</p>
                <p className="text-[10px] text-emerald-400 mt-0.5">Opening hours: {shop?.openingHours}</p>
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              Instructions for Shopkeeper (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Size 42 please, call before arriving"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Bill Summary (Prompt: Product price, Delivery fee, Total) */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Payment Breakdown
          </h3>

          <div className="flex justify-between text-xs text-slate-400">
            <span>Product Subtotal ({quantity}x)</span>
            <span className="font-mono text-slate-200">Rs. {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-400">
            <span>Delivery Fee</span>
            <span className="font-mono text-slate-200">
              {fulfillmentType === 'delivery' ? `Rs. ${deliveryFee}` : 'Free (In-Store Pickup)'}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
            <span className="text-xs font-bold text-white">Total Amount</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              Rs. {total.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 text-right">Payment method: Cash on delivery / In-store</p>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          id="confirm-order-btn"
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition active:scale-95 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm & Send Order to Shopkeeper</span>
        </button>
      </form>
    </div>
  );
};
