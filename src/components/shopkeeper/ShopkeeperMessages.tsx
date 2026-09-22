import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Clock,
  Send,
  Store,
  CheckCircle2,
} from 'lucide-react';
import { Conversation, ChatMessage } from '../../types';

interface ShopkeeperMessagesProps {
  conversations: Conversation[];
  onBack: () => void;
  onSendReply: (conversationId: string, text: string) => void;
}

export const ShopkeeperMessages: React.FC<ShopkeeperMessagesProps> = ({
  conversations,
  onBack,
  onSendReply,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConvId);

  const handleSend = () => {
    if (!selectedConvId || !replyText.trim()) return;
    onSendReply(selectedConvId, replyText);
    setReplyText('');
  };

  return (
    <div className="pb-24 bg-slate-900 min-h-full text-slate-100 flex flex-col">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (selectedConvId) setSelectedConvId(null);
              else onBack();
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">
              {activeConv ? `Chat with ${activeConv.shopkeeperName}` : 'Customer Inquiries Inbox'}
            </h2>
            <p className="text-[10px] text-slate-400">
              {activeConv ? 'Customer from Mardan' : 'Direct customer conversations'}
            </p>
          </div>
        </div>
      </div>

      {/* If a conversation is selected, show the chat thread */}
      {activeConv ? (
        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-3 overflow-y-auto mb-4 flex-1">
            {activeConv.messages.map((msg) => {
              const isShopkeeper = msg.sender === 'shopkeeper';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isShopkeeper ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isShopkeeper
                        ? 'bg-emerald-600 text-white rounded-tr-xs'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-xs'
                    }`}
                  >
                    {msg.attachedProduct && (
                      <div className="mb-2 p-2 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2">
                        <img
                          src={msg.attachedProduct.photo}
                          alt="product"
                          className="w-9 h-9 rounded-lg object-cover"
                        />
                        <div className="text-[10px] truncate">
                          <div className="font-bold truncate">{msg.attachedProduct.name}</div>
                          <div className="text-emerald-300 font-mono">
                            Rs. {msg.attachedProduct.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div className="mt-1 text-[9px] text-slate-300 flex justify-end">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Reply as Shopkeeper..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={!replyText.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Conversations List */
        <div className="p-4 space-y-2.5">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConvId(conv.id)}
              className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer flex items-center gap-3 transition"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
                <img src={conv.shopLogo} alt="avatar" className="w-full h-full object-cover" />
                {conv.unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">
                    Customer Inquiry
                  </h4>
                  <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {conv.lastMessage}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <Store className="w-3 h-3" />
                  <span>{conv.shopName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
