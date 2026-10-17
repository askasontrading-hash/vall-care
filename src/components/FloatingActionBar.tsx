import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { MessageSquare, Phone, CalendarCheck } from 'lucide-react';

interface FloatingActionBarProps {
  language: Language;
  onOpenBooking: () => void;
  inquiryCount: number;
  onOpenInquiryCart: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  language,
  onOpenBooking,
  inquiryCount,
  onOpenInquiryCart,
}) => {
  const isAr = language === 'ar';

  return (
    <aside 
      aria-label="Quick contact and booking bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-4 py-2 sm:hidden"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Quick Call */}
        <a
          href={`tel:${COMPANY_INFO.phones.secondaryPhone}`}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors flex items-center justify-center shrink-0"
          title="Call Sales Rep"
        >
          <Phone className="w-4 h-4 text-slate-700" />
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent('السلام عليكم أ. معصوم، أود الاستفسار عن توريد المستلزمات الطبية.')}`}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition-colors flex items-center justify-center shrink-0"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
        </a>

        {/* Cart if items */}
        {inquiryCount > 0 && (
          <button
            onClick={onOpenInquiryCart}
            className="p-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0"
          >
            <span>RFQ</span>
            <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {inquiryCount}
            </span>
          </button>
        )}

        {/* Primary Action Button */}
        <button
          onClick={onOpenBooking}
          className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-98"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>{isAr ? 'حجز موعد واتساب' : 'Book on WhatsApp'}</span>
        </button>

      </div>
    </aside>
  );
};
