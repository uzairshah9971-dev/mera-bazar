import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MapPin,
  FileText,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { PendingShopApproval } from '../../data/mockData';

interface ShopApprovalScreenProps {
  pendingApprovals: PendingShopApproval[];
  onBack: () => void;
  onApprove: (appId: string) => void;
  onReject: (appId: string) => void;
}

export const ShopApprovalScreen: React.FC<ShopApprovalScreenProps> = ({
  pendingApprovals,
  onBack,
  onApprove,
  onReject,
}) => {
  const [selectedProofImage, setSelectedProofImage] = useState<string | null>(null);

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
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">
              Physical Shop Verification
            </h2>
            <p className="text-[10px] text-slate-400">
              Verify real storefronts before enabling public discovery
            </p>
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="p-4 space-y-4">
        {pendingApprovals.map((app) => {
          const isPending = app.status === 'pending';
          return (
            <div
              key={app.id}
              className={`p-4 rounded-3xl border transition space-y-3.5 ${
                app.status === 'approved'
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : app.status === 'rejected'
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-slate-800/90 border-slate-700/80 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">ID: {app.id}</span>
                  <h3 className="text-sm font-bold text-white leading-snug">{app.shopName}</h3>
                  <p className="text-xs text-emerald-400 mt-0.5">
                    Shopkeeper: <strong className="text-white">{app.shopkeeperName}</strong>
                  </p>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    app.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : app.status === 'rejected'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>

              {/* Verification Details */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CNIC Number:</span>
                  <span className="font-mono font-bold text-white">{app.cnicNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Contact Phone:</span>
                  <span className="font-mono text-emerald-400">{app.phone}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Bazaar Address:</span>
                  <span className="text-right text-white font-medium">{app.bazaarAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">City / Division:</span>
                  <span className="text-slate-200">
                    {app.city}, {app.division}
                  </span>
                </div>
              </div>

              {/* Physical Verification Photos: Signboard & Utility Bill */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-300">
                  Uploaded Storefront & Proof of Physical Shop:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setSelectedProofImage(app.storefrontPhotoUrl)}
                    className="relative h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 cursor-pointer group"
                  >
                    <img
                      src={app.storefrontPhotoUrl}
                      alt="Signboard"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-bold gap-1">
                      <Eye className="w-3 h-3" /> View Signboard
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedProofImage(app.utilityBillProofUrl)}
                    className="relative h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 cursor-pointer group"
                  >
                    <img
                      src={app.utilityBillProofUrl}
                      alt="Utility Bill"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-bold gap-1">
                      <FileText className="w-3 h-3" /> Shop Bill / Lease
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isPending && (
                <div className="pt-2 border-t border-slate-700/60 flex items-center gap-2">
                  <button
                    id={`approve-shop-${app.id}`}
                    onClick={() => onApprove(app.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Grant Verified Badge</span>
                  </button>
                  <button
                    id={`reject-shop-${app.id}`}
                    onClick={() => onReject(app.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 border border-slate-700 hover:border-rose-500 text-rose-300 font-bold text-xs transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Proof Viewer Lightbox */}
      {selectedProofImage && (
        <div
          onClick={() => setSelectedProofImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-md w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
            <img src={selectedProofImage} alt="proof enlarged" className="w-full h-auto max-h-[75vh] object-contain" />
            <div className="p-3 text-center text-xs text-slate-300">
              Tap anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
