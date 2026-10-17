import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { MessageSquare, PhoneCall, Globe, CreditCard } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenCard: () => void;
  onOpenCatalogPdf?: () => void;
  inquiryCount: number;
  onOpenInquiryCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenBooking,
  onOpenCard,
  onOpenCatalogPdf,
  inquiryCount,
  onOpenInquiryCart,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark / brand */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current stroke-[7] stroke-linecap-round stroke-linejoin-round">
                {/* Stethoscope heart motif matching visiting card */}
                <path d="M30,30 C20,30 15,40 15,50 C15,65 35,78 50,88 C65,78 85,65 85,50 C85,40 80,30 70,30 C62,30 55,36 50,44 C45,36 38,30 30,30 Z" />
                <path d="M25,50 L40,50 L45,38 L52,62 L58,45 L64,52 L75,52" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight whitespace-nowrap">
                VALL CARE
              </span>
              <span className="text-xs text-slate-500 font-medium block leading-none">
                {isAr ? 'وادي الرعاية الطبية' : 'Medical Supplies'}
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a 
              href="#card-preview" 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-blue-500" />
              <span>{isAr ? 'البطاقة الرقمية' : 'Visiting Card'}</span>
            </a>
            <a 
              href="#catalog" 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'كتالوج المنتجات' : 'Medical Catalog'}
            </a>
            <a 
              href="#partners" 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'العلامات المعتمدة' : 'Authorized Brands'}
            </a>
            <a 
              href="#booking-section" 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'حجز موعد ميداني' : 'Schedule Visit'}
            </a>
            <a 
              href="#contact" 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'التواصل ومقر الرياض' : 'Riyadh HQ'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Inquiry Cart Pill (if items selected) */}
            {inquiryCount > 0 && (
              <button
                onClick={onOpenInquiryCart}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>{isAr ? 'قائمة التسعير' : 'RFQ List'}</span>
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                  {inquiryCount}
                </span>
              </button>
            )}

            {/* PDF Catalog Button */}
            {onOpenCatalogPdf && (
              <button
                onClick={onOpenCatalogPdf}
                className="hidden md:flex px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
                title={isAr ? 'عرض وتحميل كتالوج PDF' : 'View and Download PDF Catalog'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>{isAr ? 'كتالوج PDF' : 'PDF Catalog'}</span>
              </button>
            )}

            {/* Quick Call */}
            <a
              href={`tel:${COMPANY_INFO.phones.primaryWhatsApp}`}
              className="hidden sm:flex px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono tabular-nums">{COMPANY_INFO.phones.primaryWhatsApp}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>{isAr ? 'حجز موعد واتساب' : 'Book via WhatsApp'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
