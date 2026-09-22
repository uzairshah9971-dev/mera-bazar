import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  ShoppingBag,
  Navigation,
  CheckCircle2,
  Share2,
  Heart,
  Video,
  Play,
  ShieldCheck,
  Truck,
  Store,
  Clock,
  Sparkles,
  Phone,
} from 'lucide-react';
import { Product, Shop } from '../../types';

interface ProductDetailsProps {
  product: Product;
  shop: Shop | undefined;
  onBack: () => void;
  onViewShop: (shop: Shop) => void;
  onChatWithShopkeeper: (product: Product) => void;
  onOrderProduct: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  shop,
  onBack,
  onViewShop,
  onChatWithShopkeeper,
  onOrderProduct,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  return (
    <div className="pb-28 bg-slate-900 min-h-full text-slate-100 selection:bg-emerald-500">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition active:scale-95"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
            <Store className="w-3 h-3" /> Real Physical Shop
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-700 transition active:scale-95"
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
          <button
            onClick={() => alert('Product link copied to clipboard!')}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Large Product Media & Video Carousel */}
      <div className="relative bg-slate-950 border-b border-slate-800">
        {isVideoPlaying && product.videoUrl ? (
          <div className="relative h-72 w-full bg-black flex items-center justify-center">
            <video
              src={product.videoUrl}
              autoPlay
              controls
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 text-[10px] text-white"
            >
              Close Video
            </button>
          </div>
        ) : (
          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={product.photos[selectedImageIndex] || product.photos[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges on Top */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              {product.isNewStock && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600/95 backdrop-blur text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" /> New Stock In Shop
                </span>
              )}
              {product.isAvailable ? (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold">
                  Available in Physical Store
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold">
                  Currently Sold Out
                </span>
              )}
            </div>

            {/* Video Preview Play Button if available */}
            {product.videoUrl && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-900 transition shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-amber-300" /> Watch Store Video
              </button>
            )}
          </div>
        )}

        {/* Thumbnail Selector */}
        {product.photos.length > 1 && !isVideoPlaying && (
          <div className="flex items-center gap-2 p-3 bg-slate-900/60 overflow-x-auto">
            {product.photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 ${
                  selectedImageIndex === idx
                    ? 'border-emerald-500'
                    : 'border-slate-700 opacity-60'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Product Info */}
      <div className="p-4 space-y-4">
        {/* Name & Price */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-base font-bold text-white leading-snug tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="mt-2.5 flex items-baseline gap-3">
            <span className="text-xl font-extrabold text-emerald-400 font-mono tracking-tight">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.offerDiscountPercent && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                {product.offerDiscountPercent}% OFF
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>Stock available: <strong className="text-white font-mono">{product.quantity} pieces</strong></span>
            <span>•</span>
            <span>Uploaded: <strong className="text-slate-300">{product.createdAt}</strong></span>
          </div>
        </div>

        {/* Physical Shop Card (CRITICAL REQUIREMENT: Must clearly show product belongs to a real physical shop) */}
        {shop && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-emerald-500/30 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-700/60">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Physical Storefront Verified
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                {shop.distanceKm} km from you
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={shop.logoImage}
                alt={shop.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-600 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white truncate">{shop.name}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-300">
                  Shopkeeper: <strong className="text-white">{shop.shopkeeperName}</strong>
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{shop.address}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px]">
                  <span className="text-amber-400 font-bold">★ {shop.rating} ({shop.reviewCount})</span>
                  <span>•</span>
                  <span className={shop.isOpenNow ? 'text-emerald-400' : 'text-rose-400'}>
                    {shop.isOpenNow ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Row inside Shop Box */}
            <div className="mt-3 pt-2.5 border-t border-slate-700/70 grid grid-cols-2 gap-2">
              <button
                id="view-shop-btn"
                onClick={() => onViewShop(shop)}
                className="py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Store className="w-3.5 h-3.5 text-emerald-400" /> View Shop Profile
              </button>
              <button
                id="get-directions-btn"
                onClick={() => setShowDirectionsModal(true)}
                className="py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" /> Get Directions
              </button>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Product Description
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">{product.description}</p>

          {/* Specifications if any */}
          {product.specifications && (
            <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Store Specifications
              </h4>
              <div className="grid grid-cols-1 gap-1 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-1 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">{key}</span>
                    <span className="text-slate-200 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-xs">Local Pickup or Direct Shop Delivery</div>
            <div className="text-[10px] text-slate-400">
              Check in person before paying, or order straight to your doorstep in Mardan.
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 flex items-center gap-3 z-40 max-w-md mx-auto">
        <button
          id="chat-with-shopkeeper-btn"
          onClick={() => onChatWithShopkeeper(product)}
          className="flex-1 py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition active:scale-95 shadow"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Chat with Shopkeeper</span>
        </button>

        <button
          id="order-product-btn"
          onClick={() => onOrderProduct(product)}
          disabled={!product.isAvailable}
          className={`flex-1 py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg ${
            product.isAvailable
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{product.isAvailable ? 'Order / Request' : 'Sold Out'}</span>
        </button>
      </div>

      {/* Directions Modal */}
      {showDirectionsModal && shop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-3xl p-5 text-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Physical Shop Directions</h3>
              </div>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/60 mb-4 space-y-1.5 text-xs">
              <div className="font-bold text-white">{shop.name}</div>
              <div className="text-slate-300 text-[11px]">{shop.address}</div>
              <div className="text-emerald-400 text-[11px]">
                Landmark: {shop.nearbyLandmark || 'Main Commercial Area'}
              </div>
              <div className="text-slate-400 text-[10px]">
                Distance: {shop.distanceKm} km from your selected location
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`tel:${shop.phone}`}
                className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> Call Shopkeeper ({shop.phone})
              </a>
              <button
                onClick={() => {
                  alert(`Navigating to ${shop.name} at ${shop.address}...`);
                  setShowDirectionsModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
