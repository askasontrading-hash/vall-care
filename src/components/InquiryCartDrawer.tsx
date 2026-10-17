import React, { useState } from 'react';
import { InquiryItem, Language } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';
import { X, Trash2, MessageSquare, Plus, Minus, Send, Package } from 'lucide-react';

interface InquiryCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  language: Language;
}

export const InquiryCartDrawer: React.FC<InquiryCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const [customerName, setCustomerName] = useState('');
  const [facilityName, setFacilityName] = useState('');

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const url = getWhatsAppInquiryUrl(items, customerName, facilityName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'قائمة طلب التسعير (RFQ)' : 'Quotation & RFQ Cart'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {items.length} {isAr ? 'منتجات محددة للتسعير' : 'selected items'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body: Items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-semibold text-slate-700">
                {isAr ? 'القائمة فارغة حالياً' : 'Your RFQ list is currently empty'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {isAr
                  ? 'تصفح الكتالوج واضغط على "طلب تسعير" لإضافة المستلزمات الطبية المطلوبة.'
                  : 'Browse the catalog and click "+ Add RFQ" to request pricing from Masoom Akhtar Khan.'}
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.product.image}
                    alt={item.product.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {isAr ? item.product.nameAr : item.product.nameEn}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {item.product.brand} · {isAr ? item.product.packagingAr : item.product.packagingEn}
                  </p>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-bold text-slate-900 min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Form & Submit */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-2">
              <input
                type="text"
                placeholder={isAr ? 'اسمك الكريم (اختياري)' : 'Your Name (Optional)'}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder={isAr ? 'اسم المستشفى أو العيادة' : 'Hospital / Clinic Name'}
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال طلب التسعير عبر واتساب' : 'Send RFQ via WhatsApp to Masoom'}</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>{items.reduce((acc, i) => acc + i.quantity, 0)} {isAr ? 'قطعة/عبوة إجمالية' : 'total items'}</span>
              <button
                onClick={onClearCart}
                className="text-rose-600 hover:underline"
              >
                {isAr ? 'تفريغ القائمة' : 'Clear List'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
