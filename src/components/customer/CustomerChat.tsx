import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Phone,
  Store,
  Sparkles,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Conversation, ChatMessage, Product, Shop } from '../../types';

interface CustomerChatProps {
  conversation: Conversation;
  currentShop?: Shop;
  attachedProduct?: Product;
  onBack: () => void;
  onSendMessage: (text: string, attachedProduct?: Product) => void;
  onRequestOrder: (product?: Product) => void;
}

export const CustomerChat: React.FC<CustomerChatProps> = ({
  conversation,
  currentShop,
  attachedProduct,
  onBack,
  onSendMessage,
  onRequestOrder,
}) => {
  const [inputText, setInputText] = useState('');
  const [activeAttachment, setActiveAttachment] = useState<Product | undefined>(
    attachedProduct
  );

  const quickQuestions = [
    'Is this available right now in shop?',
    'What is your final cash price?',
    'Can you deliver this to Baghdada?',
    'Can I come to your shop to check it?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    onSendMessage(text, activeAttachment);
    setInputText('');
    setActiveAttachment(undefined);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      {/* Chat Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
            <img
              src={conversation.shopLogo}
              alt={conversation.shopName}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="text-xs font-bold text-white truncate max-w-[150px]">
                {conversation.shopName}
              </h3>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            </div>
            <p className="text-[10px] text-emerald-400">
              {conversation.shopkeeperName} • Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {currentShop?.phone && (
            <a
              href={`tel:${currentShop.phone}`}
              className="p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-700 transition"
              title="Call Shopkeeper"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Trust Notice in Chat */}
      <div className="px-4 py-1.5 bg-emerald-950/40 border-b border-emerald-900/30 flex items-center justify-between text-[10px] text-emerald-300">
        <span className="flex items-center gap-1">
          <Store className="w-3 h-3" /> Direct line to physical store owner
        </span>
        <span className="text-slate-400 font-mono">Bank Road Mardan</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.messages.map((msg) => {
          const isCustomer = msg.sender === 'customer';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                  isCustomer
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-tl-xs'
                }`}
              >
                {/* Attached Product Box */}
                {msg.attachedProduct && (
                  <div className="mb-2 p-2 rounded-xl bg-black/25 border border-white/10 flex items-center gap-2">
                    <img
                      src={msg.attachedProduct.photo}
                      alt={msg.attachedProduct.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold line-clamp-1">
                        {msg.attachedProduct.name}
                      </div>
                      <div className="text-[10px] text-emerald-200 font-mono font-bold">
                        Rs. {msg.attachedProduct.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                <div>{msg.text}</div>

                <div
                  className={`mt-1 text-[9px] flex items-center justify-end gap-1 ${
                    isCustomer ? 'text-emerald-200' : 'text-slate-400'
                  }`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Active Attachment Pill if inquiring about a product */}
      {activeAttachment && (
        <div className="mx-3 mb-2 p-2 rounded-xl bg-slate-800 border border-emerald-500/40 flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={activeAttachment.photos[0]}
              alt={activeAttachment.name}
              className="w-9 h-9 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 text-[11px]">
              <div className="font-bold text-white truncate">{activeAttachment.name}</div>
              <div className="text-emerald-400 font-mono font-bold">
                Rs. {activeAttachment.price.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveAttachment(undefined)}
            className="text-slate-400 hover:text-white text-xs px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick Suggestion Pills (Prompt: "Is this available?", "What is the final price?", "Can you deliver?") */}
      <div className="px-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 whitespace-nowrap shrink-0 transition active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onRequestOrder(activeAttachment)}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition"
          title="Send Order Request"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        <input
          id="chat-input-field"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask shopkeeper in Urdu or English..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />

        <button
          id="chat-send-btn"
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
