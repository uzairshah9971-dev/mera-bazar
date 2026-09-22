import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Video,
  Upload,
  Sparkles,
  CheckCircle2,
  Tag,
  Plus,
  Trash2,
} from 'lucide-react';
import { Product, CategoryId } from '../../types';

interface AddProductModalProps {
  shopId: string;
  shopName: string;
  shopLocation: string;
  shopkeeperName: string;
  onBack: () => void;
  onSaveProduct: (product: Product) => void;
  editingProduct?: Product;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  shopId,
  shopName,
  shopLocation,
  shopkeeperName,
  onBack,
  onSaveProduct,
  editingProduct,
}) => {
  const [name, setName] = useState(editingProduct?.name || '');
  const [price, setPrice] = useState(editingProduct ? editingProduct.price.toString() : '');
  const [originalPrice, setOriginalPrice] = useState(
    editingProduct?.originalPrice ? editingProduct.originalPrice.toString() : ''
  );
  const [category, setCategory] = useState<CategoryId>(editingProduct?.category || 'shoes');
  const [quantity, setQuantity] = useState(editingProduct ? editingProduct.quantity.toString() : '10');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [isAvailable, setIsAvailable] = useState(editingProduct ? editingProduct.isAvailable : true);
  const [isNewStock, setIsNewStock] = useState(editingProduct ? editingProduct.isNewStock : true);
  const [hasOffer, setHasOffer] = useState(Boolean(editingProduct?.offerDiscountPercent));
  const [offerDiscountPercent, setOfferDiscountPercent] = useState(
    editingProduct?.offerDiscountPercent ? editingProduct.offerDiscountPercent.toString() : '10'
  );

  const samplePhotoPresets = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
  ];

  const [photos, setPhotos] = useState<string[]>(
    editingProduct?.photos || [samplePhotoPresets[0]]
  );
  const [videoUrl, setVideoUrl] = useState<string | undefined>(editingProduct?.videoUrl);

  const handleAddSamplePhoto = () => {
    const nextPhoto = samplePhotoPresets[photos.length % samplePhotoPresets.length];
    setPhotos([...photos, nextPhoto]);
  };

  const handleToggleVideo = () => {
    if (videoUrl) {
      setVideoUrl(undefined);
    } else {
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-artisan-stitching-leather-shoes-42354-large.mp4');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Please fill out Product Name and Price');
      return;
    }

    const savedProduct: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      shopId,
      shopName,
      shopLocation,
      shopkeeperName,
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      photos: photos.length > 0 ? photos : [samplePhotoPresets[0]],
      videoUrl,
      description: description || 'Genuine physical shop stock verified in Mardan.',
      isAvailable,
      isNewStock,
      offerDiscountPercent: hasOffer ? Number(offerDiscountPercent) : undefined,
      quantity: Number(quantity) || 1,
      createdAt: editingProduct?.createdAt || 'Just now',
      tags: ['Local Stock', shopName],
    };

    onSaveProduct(savedProduct);
  };

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
            <h2 className="text-xs font-bold text-white tracking-tight">
              {editingProduct ? 'Edit Shop Product' : 'Add New Product to Shop'}
            </h2>
            <p className="text-[10px] text-emerald-400 font-mono">
              Live directly in {shopName}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Photo Upload Area */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Real Product Photos</span>
            <span className="text-[10px] text-slate-400">Take photo inside your physical shop</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {photos.map((url, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-600 bg-slate-900 shrink-0 group"
              >
                <img src={url} alt="upload" className="w-full h-full object-cover" />
                {photos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 p-1 rounded-md bg-rose-600 text-white"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Add Photo Button */}
            <button
              type="button"
              onClick={handleAddSamplePhoto}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-600 hover:border-emerald-500 bg-slate-900/60 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-400 transition shrink-0"
            >
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">+ Photo</span>
            </button>
          </div>

          {/* Short Video Attachment Toggle */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Video className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Short Store Video Clip</span>
            </div>
            <button
              type="button"
              onClick={handleToggleVideo}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition ${
                videoUrl
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-700 text-slate-300 border-slate-600'
              }`}
            >
              {videoUrl ? 'Video Attached ✓' : '+ Attach Video'}
            </button>
          </div>
        </div>

        {/* Product Basic Fields */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Charsadda Leather Chappal Mustard Double Sole"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Selling Price (PKR) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Rs. 3,450"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Original/Cut Price (PKR)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Rs. 3,800"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Shop Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
              >
                <option value="clothing">Clothing & Fabrics</option>
                <option value="shoes">Shoes & Chappals</option>
                <option value="jewelry">Jewelry & Gold</option>
                <option value="grocery">Grocery & Atta</option>
                <option value="food">Food & Sweets</option>
                <option value="electronics">Electronics & Solar</option>
                <option value="mobile">Mobile & Accessories</option>
                <option value="sports">Sports & Fitness</option>
                <option value="cosmetics">Cosmetics & Bangles</option>
                <option value="furniture">Furniture & Woodcraft</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Available Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Description & Details for Customers
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention sizes, material, warranty or freshness details..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Stock & Offer Flags */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Stock & Promotion Status
          </h3>

          {/* Available / Sold Out Toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-xs font-bold text-white">Stock Availability</div>
              <div className="text-[10px] text-slate-400">
                {isAvailable ? 'Customers can order or request' : 'Marked as Sold Out in shop'}
              </div>
            </div>
            <button
              type="button"
              id="stock-toggle-btn"
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                isAvailable
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
              }`}
            >
              {isAvailable ? 'In Stock' : 'Sold Out'}
            </button>
          </div>

          {/* New Stock vs Existing Stock Toggle */}
          <div className="flex items-center justify-between py-1 border-t border-slate-700/60">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Mark as "New Stock"</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Shows in "New Stock Near You" carousel on customer homepage
              </div>
            </div>
            <input
              type="checkbox"
              checked={isNewStock}
              onChange={(e) => setIsNewStock(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          {/* Offer / Discount Toggle */}
          <div className="flex items-center justify-between py-1 border-t border-slate-700/60">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Special Bazaar Offer / Discount</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Highlight discount badge to local shoppers
              </div>
            </div>
            <input
              type="checkbox"
              checked={hasOffer}
              onChange={(e) => setHasOffer(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          {hasOffer && (
            <div className="pt-2 flex items-center gap-3">
              <label className="text-xs text-slate-300">Discount %:</label>
              <input
                type="number"
                value={offerDiscountPercent}
                onChange={(e) => setOfferDiscountPercent(e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-emerald-400">% off normal shop rate</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="save-product-submit-btn"
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition active:scale-95 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{editingProduct ? 'Save Changes' : 'Publish Product to Mera Bazaar'}</span>
        </button>
      </form>
    </div>
  );
};
