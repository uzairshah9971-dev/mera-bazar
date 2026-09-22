import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Clock,
  Phone,
  Truck,
  MapPin,
  CheckCircle2,
  Edit2,
  Users,
  Settings,
  PackageCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Shop } from '../../types';

interface ShopkeeperProfileProps {
  shop: Shop;
  onBack: () => void;
  onNavigateToManageProducts: () => void;
  onUpdateShop: (updated: Partial<Shop>) => void;
}

export const ShopkeeperProfile: React.FC<ShopkeeperProfileProps> = ({
  shop,
  onBack,
  onNavigateToManageProducts,
  onUpdateShop,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openingHours, setOpeningHours] = useState(shop.openingHours);
  const [phone, setPhone] = useState(shop.phone);
  const [description, setDescription] = useState(shop.description);
  const [deliveryAvailable, setDeliveryAvailable] = useState(shop.deliveryAvailable);
  const [deliveryFee, setDeliveryFee] = useState(shop.deliveryFee.toString());

  const handleSave = () => {
    onUpdateShop({
      openingHours,
      phone,
      description,
      deliveryAvailable,
      deliveryFee: Number(deliveryFee),
    });
    setIsEditing(false);
    alert('Shop profile successfully updated!');
  };

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-bold text-white tracking-tight">Shopkeeper Profile</h2>
        </div>
        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="py-1 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition"
        >
          <Edit2 className="w-3 h-3" />
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      </div>

      {/* Main Profile Identity */}
      <div className="p-4 space-y-4">
        <div className="p-4 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500/40 shrink-0">
              <img src={shop.logoImage} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold text-white truncate">{shop.name}</h1>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Shopkeeper: <strong className="text-white">{shop.shopkeeperName}</strong>
              </p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-700 text-emerald-300 font-medium capitalize">
                  {shop.category}
                </span>
                <span>•</span>
                <span className="text-emerald-400">Physical Verified</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white"
                />
              ) : (
                <span>{shop.phone}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white"
                />
              ) : (
                <span>{shop.openingHours}</span>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Settings Card */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Delivery Availability</span>
            </div>
            <button
              onClick={() => setDeliveryAvailable(!deliveryAvailable)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                deliveryAvailable
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-700 text-slate-400 border-slate-600'
              }`}
            >
              {deliveryAvailable ? 'Shop Delivery Enabled' : 'Pickup Only'}
            </button>
          </div>
          {deliveryAvailable && (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Local Delivery Fee:</span>
              <div className="flex items-center gap-1">
                <span>Rs.</span>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-white font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Shop Description */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Store Description
          </span>
          {isEditing ? (
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
            />
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed">{shop.description}</p>
          )}
        </div>

        {/* Buttons requested in Part 7:
            Edit Shop, Delivery Settings, Business Hours, Manage Products, View Customers, Settings */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Shop Management Tools
          </h3>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700/60 divide-y divide-slate-700/60 overflow-hidden text-xs">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Edit2 className="w-4 h-4 text-emerald-400" />
                <span>Edit Shop Information</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert('Delivery settings: Radius configured to 6 km in Mardan with Rs. 150 standard charge.')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Delivery Settings (Radius & Charges)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert(`Business Hours: ${shop.openingHours} Monday - Sunday`)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Business Hours & Prayer Breaks</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onNavigateToManageProducts}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Manage Products Catalog</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert('74 regular customers from Mardan have added your shop to favorites!')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>View Local Customers (74)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => alert('Settings: Subscription plan active, SMS notifications ON.')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/50 transition text-left"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Shopkeeper Account Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
