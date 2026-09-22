import React from 'react';
import {
  Home,
  Grid,
  Search,
  ShoppingBag,
  MessageSquare,
  User,
} from 'lucide-react';

export type CustomerNavTab = 'home' | 'categories' | 'explore' | 'orders' | 'messages' | 'profile';

interface CustomerBottomNavProps {
  activeTab: CustomerNavTab;
  onSelectTab: (tab: CustomerNavTab) => void;
  unreadMessagesCount?: number;
  activeOrdersCount?: number;
}

export const CustomerBottomNav: React.FC<CustomerBottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount = 1,
  activeOrdersCount = 2,
}) => {
  const tabs = [
    { id: 'home' as CustomerNavTab, label: 'Home', icon: Home },
    { id: 'categories' as CustomerNavTab, label: 'Categories', icon: Grid },
    { id: 'explore' as CustomerNavTab, label: 'Explore', icon: Search },
    { id: 'orders' as CustomerNavTab, label: 'Orders', icon: ShoppingBag, badge: activeOrdersCount },
    { id: 'messages' as CustomerNavTab, label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'profile' as CustomerNavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="customer-bottom-navigation"
      className="fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 z-40 max-w-md mx-auto"
    >
      <div className="flex items-center justify-around py-2 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 min-w-[54px] rounded-xl transition active:scale-95 ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition ${isActive ? 'scale-110 text-emerald-400 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-extrabold font-mono ring-2 ring-slate-950">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
