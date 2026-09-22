import React, { useState } from 'react';
import {
  MapPin,
  Store,
  ShieldCheck,
  ShoppingBag,
  Layers,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import {
  CATEGORIES,
  mockShops,
  mockProducts,
  mockOrders,
  mockConversations,
  pakistanRegionTree,
  mockPendingShopApprovals,
} from './data/mockData';
import {
  Shop,
  Product,
  Order,
  Conversation,
  OrderStatus,
  CategoryId,
  RegionNode,
} from './types';

// Customer Components
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerCategories } from './components/customer/CustomerCategories';
import { SearchExplore } from './components/customer/SearchExplore';
import { ProductDetails } from './components/customer/ProductDetails';
import { ShopProfile } from './components/customer/ShopProfile';
import { CustomerChat } from './components/customer/CustomerChat';
import { OrderDeliveryFlow } from './components/customer/OrderDeliveryFlow';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { CustomerBottomNav, CustomerNavTab } from './components/customer/CustomerBottomNav';

// Shopkeeper Components
import { ShopkeeperDashboard } from './components/shopkeeper/ShopkeeperDashboard';
import { AddProductModal } from './components/shopkeeper/AddProductModal';
import { ManageProducts } from './components/shopkeeper/ManageProducts';
import { ShopkeeperOrders } from './components/shopkeeper/ShopkeeperOrders';
import { ShopkeeperMessages } from './components/shopkeeper/ShopkeeperMessages';
import { ShopkeeperProfile } from './components/shopkeeper/ShopkeeperProfile';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShopApprovalScreen } from './components/admin/ShopApprovalScreen';
import { ProductShopModeration } from './components/admin/ProductShopModeration';
import { RegionalManagement } from './components/admin/RegionalManagement';

// Common
import { LocationSelectorModal } from './components/common/LocationSelectorModal';

type AppRole = 'customer' | 'shopkeeper' | 'admin';

type CustomerScreen =
  | 'tab_view'
  | 'product_details'
  | 'shop_profile'
  | 'order_flow'
  | 'chat_direct';

type ShopkeeperScreen =
  | 'shopkeeper_dashboard'
  | 'add_product'
  | 'manage_products'
  | 'shopkeeper_orders'
  | 'shopkeeper_messages'
  | 'shopkeeper_profile';

type AdminScreen =
  | 'admin_dashboard'
  | 'shop_approval'
  | 'product_shop_management'
  | 'regional_management';

export default function App() {
  // App Role Switcher
  const [currentRole, setCurrentRole] = useState<AppRole>('customer');

  // Regional State
  const [currentCity, setCurrentCity] = useState('Mardan');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [regionTree, setRegionTree] = useState<RegionNode[]>(pakistanRegionTree);

  // Core Data State
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingShopApprovals);

  // Customer Navigation State
  const [customerActiveTab, setCustomerActiveTab] = useState<CustomerNavTab>('home');
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>('tab_view');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryId | null>(null);
  const [activeConversationShopId, setActiveConversationShopId] = useState<string | null>(null);

  // Shopkeeper Navigation State
  // Defaulting to "Khyber Chappal & Leather House" in Mardan
  const currentShopId = 'shop-1';
  const currentShop = shops.find((s) => s.id === currentShopId) || shops[0];
  const [shopkeeperScreen, setShopkeeperScreen] = useState<ShopkeeperScreen>('shopkeeper_dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // Admin Navigation State
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('admin_dashboard');

  // Handlers: Customer Actions
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCustomerScreen('product_details');
  };

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    setCustomerScreen('shop_profile');
  };

  const handleOpenCategory = (categoryId: CategoryId) => {
    setActiveCategoryFilter(categoryId);
    setCustomerActiveTab('categories');
    setCustomerScreen('tab_view');
  };

  const handleInitiateChatWithShop = (shopId: string, attachedProduct?: Product) => {
    setActiveConversationShopId(shopId);
    if (attachedProduct) {
      setSelectedProduct(attachedProduct);
    }
    setCustomerScreen('chat_direct');
  };

  const handleStartOrder = (product: Product) => {
    setSelectedProduct(product);
    const shop = shops.find((s) => s.id === product.shopId);
    setSelectedShop(shop || null);
    setCustomerScreen('order_flow');
  };

  const handleOrderSubmitted = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  const handleSendCustomerMessage = (convId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'customer' as const,
            text,
            timestamp: 'Just now',
          };
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  // Handlers: Shopkeeper Actions
  const handleToggleStoreStatus = () => {
    setShops((prev) =>
      prev.map((s) => (s.id === currentShop.id ? { ...s, isOpenNow: !s.isOpenNow } : s))
    );
  };

  const handleSaveProduct = (savedProduct: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });
    setEditingProduct(undefined);
    setShopkeeperScreen('manage_products');
  };

  const handleToggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleShopkeeperReply = (convId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'shopkeeper' as const,
            text,
            timestamp: 'Just now',
          };
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            unreadCount: 0,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const handleUpdateShopProfile = (updated: Partial<Shop>) => {
    setShops((prev) =>
      prev.map((s) => (s.id === currentShop.id ? { ...s, ...updated } : s))
    );
  };

  // Handlers: Admin Actions
  const handleApproveShop = (appId: string) => {
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved' as const } : a))
    );
    const approvedApp = pendingApprovals.find((a) => a.id === appId);
    if (approvedApp) {
      const newShop: Shop = {
        id: `shop-${Date.now()}`,
        name: approvedApp.shopName,
        shopkeeperName: approvedApp.shopkeeperName,
        category: approvedApp.category as CategoryId,
        address: approvedApp.bazaarAddress,
        phone: approvedApp.phone,
        locationCity: approvedApp.city || 'Mardan',
        division: approvedApp.division || 'Malakand Division',
        province: 'Khyber Pakhtunkhwa',
        distanceKm: 1.2,
        openingHours: '9:00 AM - 9:00 PM',
        description: 'Verified physical storefront registered in local bazaar.',
        coverImage: approvedApp.storefrontPhotoUrl,
        logoImage: approvedApp.storefrontPhotoUrl,
        isVerified: true,
        isOpenNow: true,
        deliveryAvailable: true,
        deliveryFee: 120,
        deliveryRadiusKm: 5.0,
        rating: 5.0,
        reviewCount: 1,
        productsCount: 0,
        registeredDate: 'Today',
        isPopular: true,
      };
      setShops([newShop, ...shops]);
    }
  };

  const handleRejectShop = (appId: string) => {
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'rejected' as const } : a))
    );
  };

  const handleRemoveProductAdmin = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleToggleFeaturedShop = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, isPopular: !s.isPopular } : s))
    );
  };

  const handleToggleShopVerification = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, isVerified: !s.isVerified } : s))
    );
  };

  const handleAddCityToDivision = (divisionId: string, cityName: string) => {
    const newCityNode: RegionNode = {
      id: `city-${Date.now()}`,
      name: cityName,
      type: 'city',
      activeShopsCount: 0,
    };
    setRegionTree((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const division = cloned[0]?.children?.[0]?.children?.find(
        (d: RegionNode) => d.id === divisionId
      );
      if (division) {
        division.children = division.children || [];
        division.children.push(newCityNode);
      }
      return cloned;
    });
    alert(`City "${cityName}" added to ${divisionId}!`);
  };

  // Active chat conversation helper
  const activeCustomerConversation =
    conversations.find((c) => c.shopId === activeConversationShopId) ||
    conversations[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center selection:bg-emerald-500 selection:text-slate-950">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md bg-slate-900 border-x border-slate-800 min-h-screen flex flex-col relative shadow-2xl">
        {/* Global Multi-Role Header Switcher */}
        <header
          id="role-mode-switcher-bar"
          className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-3 py-2.5 flex items-center justify-between"
        >
          {/* Logo & Urdu Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
              MB
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black tracking-tight text-white">MERA BAZAAR</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  LOCAL
                </span>
              </div>
              <div className="text-[9px] text-slate-400 font-urdu font-medium">
                اصلی دکانیں، بااعتماد خریداری
              </div>
            </div>
          </div>

          {/* Region Selector Quick Button */}
          <button
            id="global-region-selector-btn"
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-[11px] text-emerald-400 font-semibold transition"
          >
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span className="max-w-[70px] truncate">{currentCity}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </header>

        {/* 3-Role Concept Navigation Bar (Allows instant evaluation of all 3 personas) */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between gap-1 text-[11px]">
          <div className="flex items-center gap-1 w-full">
            <button
              id="role-tab-customer"
              onClick={() => {
                setCurrentRole('customer');
                setCustomerScreen('tab_view');
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                currentRole === 'customer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Customer</span>
            </button>

            <button
              id="role-tab-shopkeeper"
              onClick={() => {
                setCurrentRole('shopkeeper');
                setShopkeeperScreen('shopkeeper_dashboard');
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                currentRole === 'shopkeeper'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-3 h-3" />
              <span>Shopkeeper</span>
            </button>

            <button
              id="role-tab-admin"
              onClick={() => {
                setCurrentRole('admin');
                setAdminScreen('admin_dashboard');
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                currentRole === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROLE 1: CUSTOMER VIEW */}
        {/* ========================================================================= */}
        {currentRole === 'customer' && (
          <main className="flex-1 flex flex-col">
            {/* Screen 4: Product Details */}
            {customerScreen === 'product_details' && selectedProduct && (
              <ProductDetails
                product={selectedProduct}
                shop={shops.find((s) => s.id === selectedProduct.shopId)}
                onBack={() => setCustomerScreen('tab_view')}
                onViewShop={(shop) => {
                  setSelectedShop(shop);
                  setCustomerScreen('shop_profile');
                }}
                onChatWithShopkeeper={(prod) =>
                  handleInitiateChatWithShop(prod.shopId, prod)
                }
                onOrderProduct={(prod) => handleStartOrder(prod)}
              />
            )}

            {/* Screen 5: Shop Profile */}
            {customerScreen === 'shop_profile' && selectedShop && (
              <ShopProfile
                shop={selectedShop}
                products={products.filter((p) => p.shopId === selectedShop.id)}
                onBack={() => setCustomerScreen('tab_view')}
                onSelectProduct={(prod) => handleSelectProduct(prod)}
                onChatWithShopkeeper={(shop) => handleInitiateChatWithShop(shop.id)}
              />
            )}

            {/* Screen 6: Direct Chat */}
            {customerScreen === 'chat_direct' && activeCustomerConversation && (
              <CustomerChat
                conversation={activeCustomerConversation}
                currentShop={shops.find((s) => s.id === activeCustomerConversation.shopId)}
                attachedProduct={selectedProduct || undefined}
                onBack={() => setCustomerScreen('tab_view')}
                onSendMessage={(text) =>
                  handleSendCustomerMessage(activeCustomerConversation.id, text)
                }
                onRequestOrder={(prod) => {
                  if (prod) handleStartOrder(prod);
                }}
              />
            )}

            {/* Screen 7: Order / Delivery Flow */}
            {customerScreen === 'order_flow' && selectedProduct && (
              <OrderDeliveryFlow
                product={selectedProduct}
                shop={selectedShop || shops.find((s) => s.id === selectedProduct.shopId)}
                onBack={() => setCustomerScreen('tab_view')}
                onSubmitOrder={handleOrderSubmitted}
              />
            )}

            {/* Tab Views (Home, Categories, Explore, Orders, Messages, Profile) */}
            {customerScreen === 'tab_view' && (
              <>
                {customerActiveTab === 'home' && (
                  <CustomerHome
                    currentCity={currentCity}
                    onOpenCitySelector={() => setIsLocationModalOpen(true)}
                    onSearchClick={() => setCustomerActiveTab('explore')}
                    categories={CATEGORIES}
                    onSelectCategory={(catId) => handleOpenCategory(catId as CategoryId)}
                    shops={shops}
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    onSelectShop={handleSelectShop}
                    onViewAllNewStock={() => setCustomerActiveTab('explore')}
                    onViewAllShops={() => setCustomerActiveTab('explore')}
                  />
                )}

                {customerActiveTab === 'categories' && (
                  <CustomerCategories
                    categories={CATEGORIES}
                    shops={shops}
                    products={products}
                    selectedCategoryId={activeCategoryFilter || 'clothing'}
                    onSelectCategory={(catId) => setActiveCategoryFilter(catId as CategoryId)}
                    onSelectShop={handleSelectShop}
                    onSelectProduct={handleSelectProduct}
                    onBack={() => setCustomerActiveTab('home')}
                  />
                )}

                {customerActiveTab === 'explore' && (
                  <SearchExplore
                    shops={shops}
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    onSelectShop={handleSelectShop}
                  />
                )}

                {customerActiveTab === 'orders' && (
                  <CustomerProfile
                    orders={orders}
                    savedShops={shops.filter((s) => s.isPopular)}
                    currentCity={currentCity}
                    onSwitchToShopkeeper={() => setCurrentRole('shopkeeper')}
                    onOpenCitySelector={() => setIsLocationModalOpen(true)}
                    onSelectOrder={(ord) => {
                      alert(`Order ${ord.id} status: ${ord.status}`);
                    }}
                  />
                )}

                {customerActiveTab === 'messages' && (
                  <CustomerChat
                    conversation={activeCustomerConversation}
                    currentShop={shops.find((s) => s.id === activeCustomerConversation.shopId)}
                    onBack={() => setCustomerActiveTab('home')}
                    onSendMessage={(text) =>
                      handleSendCustomerMessage(activeCustomerConversation.id, text)
                    }
                    onRequestOrder={(prod) => {
                      if (prod) handleStartOrder(prod);
                    }}
                  />
                )}

                {customerActiveTab === 'profile' && (
                  <CustomerProfile
                    orders={orders}
                    savedShops={shops.filter((s) => s.isPopular)}
                    currentCity={currentCity}
                    onSwitchToShopkeeper={() => setCurrentRole('shopkeeper')}
                    onOpenCitySelector={() => setIsLocationModalOpen(true)}
                    onSelectOrder={(ord) => {
                      alert(`Order ${ord.id} status: ${ord.status}`);
                    }}
                  />
                )}

                {/* Bottom Navigation */}
                <CustomerBottomNav
                  activeTab={customerActiveTab}
                  onSelectTab={(tab) => {
                    setCustomerActiveTab(tab);
                    setCustomerScreen('tab_view');
                  }}
                  activeOrdersCount={orders.filter((o) => o.status !== 'Completed').length}
                  unreadMessagesCount={1}
                />
              </>
            )}
          </main>
        )}

        {/* ========================================================================= */}
        {/* ROLE 2: SHOPKEEPER VIEW */}
        {/* ========================================================================= */}
        {currentRole === 'shopkeeper' && (
          <main className="flex-1 flex flex-col">
            {/* Screen 9: Shopkeeper Dashboard */}
            {shopkeeperScreen === 'shopkeeper_dashboard' && (
              <ShopkeeperDashboard
                shop={currentShop}
                products={products}
                orders={orders}
                conversations={conversations}
                onNavigate={(screen) => setShopkeeperScreen(screen)}
                onToggleStoreStatus={handleToggleStoreStatus}
              />
            )}

            {/* Screen 10: Add / Edit Product */}
            {shopkeeperScreen === 'add_product' && (
              <AddProductModal
                shopId={currentShop.id}
                shopName={currentShop.name}
                shopLocation={currentShop.address}
                shopkeeperName={currentShop.shopkeeperName}
                editingProduct={editingProduct}
                onBack={() => {
                  setEditingProduct(undefined);
                  setShopkeeperScreen('shopkeeper_dashboard');
                }}
                onSaveProduct={handleSaveProduct}
              />
            )}

            {/* Screen 11: Manage Products */}
            {shopkeeperScreen === 'manage_products' && (
              <ManageProducts
                products={products.filter((p) => p.shopId === currentShop.id)}
                onBack={() => setShopkeeperScreen('shopkeeper_dashboard')}
                onAddNew={() => {
                  setEditingProduct(undefined);
                  setShopkeeperScreen('add_product');
                }}
                onEditProduct={(prod) => {
                  setEditingProduct(prod);
                  setShopkeeperScreen('add_product');
                }}
                onToggleAvailability={handleToggleProductAvailability}
                onDeleteProduct={handleDeleteProduct}
              />
            )}

            {/* Screen 12: Shopkeeper Orders */}
            {shopkeeperScreen === 'shopkeeper_orders' && (
              <ShopkeeperOrders
                orders={orders.filter((o) => o.shopId === currentShop.id)}
                onBack={() => setShopkeeperScreen('shopkeeper_dashboard')}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            )}

            {/* Screen 13: Shopkeeper Messages */}
            {shopkeeperScreen === 'shopkeeper_messages' && (
              <ShopkeeperMessages
                conversations={conversations}
                onBack={() => setShopkeeperScreen('shopkeeper_dashboard')}
                onSendReply={handleShopkeeperReply}
              />
            )}

            {/* Screen 14: Shopkeeper Profile & Delivery Settings */}
            {shopkeeperScreen === 'shopkeeper_profile' && (
              <ShopkeeperProfile
                shop={currentShop}
                onBack={() => setShopkeeperScreen('shopkeeper_dashboard')}
                onNavigateToManageProducts={() => setShopkeeperScreen('manage_products')}
                onUpdateShop={handleUpdateShopProfile}
              />
            )}
          </main>
        )}

        {/* ========================================================================= */}
        {/* ROLE 3: ADMIN PANEL VIEW */}
        {/* ========================================================================= */}
        {currentRole === 'admin' && (
          <main className="flex-1 flex flex-col">
            {/* Screen 15: Admin Dashboard */}
            {adminScreen === 'admin_dashboard' && (
              <AdminDashboard
                pendingApprovals={pendingApprovals}
                totalShopsCount={shops.length}
                totalProductsCount={products.length}
                totalOrdersCount={orders.length}
                onNavigateTo={(screen) => setAdminScreen(screen)}
              />
            )}

            {/* Screen 16: Physical Shop Approval Workflow */}
            {adminScreen === 'shop_approval' && (
              <ShopApprovalScreen
                pendingApprovals={pendingApprovals}
                onBack={() => setAdminScreen('admin_dashboard')}
                onApprove={handleApproveShop}
                onReject={handleRejectShop}
              />
            )}

            {/* Screen 17: Product & Shop Moderation */}
            {adminScreen === 'product_shop_management' && (
              <ProductShopModeration
                products={products}
                shops={shops}
                onBack={() => setAdminScreen('admin_dashboard')}
                onRemoveProduct={handleRemoveProductAdmin}
                onToggleFeaturedShop={handleToggleFeaturedShop}
                onToggleShopVerification={handleToggleShopVerification}
              />
            )}

            {/* Screen 18: Regional Hierarchy Management */}
            {adminScreen === 'regional_management' && (
              <RegionalManagement
                regionTree={regionTree}
                onBack={() => setAdminScreen('admin_dashboard')}
                onAddCity={handleAddCityToDivision}
              />
            )}
          </main>
        )}

        {/* Global Location Selector Modal */}
        <LocationSelectorModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          regionTree={regionTree}
          selectedCity={currentCity}
          onSelectCity={(city) => setCurrentCity(city)}
        />
      </div>
    </div>
  );
}
