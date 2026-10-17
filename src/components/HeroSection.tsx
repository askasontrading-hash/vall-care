import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { MessageSquare, PhoneCall, CalendarCheck, ShieldCheck, MapPin, Truck } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenBooking: () => void;
  onScrollToCatalog: () => void;
  onOpenCatalogPdf?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenBooking,
  onScrollToCatalog,
  onOpenCatalogPdf,
}) => {
  const isAr = language === 'ar';

  return (
    <section className="relative bg-white pt-8 pb-14 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Top Editorial Lead */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <span>{COMPANY_INFO.nameEn}</span>
          <span aria-hidden="true">·</span>
          <span>{COMPANY_INFO.nameAr}</span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-700 font-semibold">{isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
        </div>

        {/* 2-Column Balanced Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Text & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                {isAr ? (
                  <>
                    توريد المستلزمات الطبية والأجهزة مباشرة لمستشفيات وعيادات الرياض
                  </>
                ) : (
                  <>
                    Medical Supplies, Equipment & Direct Hospital Procurement in Riyadh
                  </>
                )}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {isAr ? (
                  <>
                    الموزع المعتمد للمستهلكات الطبية المعقمة، أجهزة التشخيص الدقيقة من <span className="font-semibold text-slate-900">Riester</span> وموازين <span className="font-semibold text-slate-900">DETECTO</span> وتجهيزات الرعاية المنزلية. تواصل مباشرة مع ممثل المبيعات <span className="font-semibold text-slate-900">{COMPANY_INFO.salesRep.nameAr}</span> لحجز موعد ميداني وتوريد فوري.
                  </>
                ) : (
                  <>
                    Official procurement gateway for sterile disposables, German-engineered <span className="font-semibold text-slate-900">Riester</span> diagnostics, heavy-duty <span className="font-semibold text-slate-900">DETECTO</span> medical scales, and certified home healthcare equipment. Connect directly with sales representative <span className="font-semibold text-slate-900">{COMPANY_INFO.salesRep.nameEn}</span> via WhatsApp.
                  </>
                )}
              </p>
            </div>

            {/* Direct Sales Rep Identity Lockup */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  {COMPANY_INFO.salesRep.nameEn.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{COMPANY_INFO.salesRep.nameEn}</span>
                    <span className="text-xs text-slate-400 font-normal">/</span>
                    <span className="text-xs text-slate-700 font-medium">{COMPANY_INFO.salesRep.nameAr}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>{COMPANY_INFO.salesRep.titleEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-emerald-700 font-semibold">{COMPANY_INFO.phones.primaryWhatsApp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent('السلام عليكم أ. معصوم أختار خان، أود الاستفسار عن توريد المستلزمات الطبية من مؤسسة وادي الرعاية.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 rounded-lg transition-colors text-center"
                >
                  {isAr ? 'محادثة مباشرة' : 'Direct Chat'}
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones.secondaryPhone}`}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono">{COMPANY_INFO.phones.secondaryPhone}</span>
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 whitespace-nowrap active:scale-98"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{isAr ? 'حجز موعد زيارة ممثل المبيعات' : 'Schedule Procurement Visit'}</span>
              </button>

              <button
                onClick={onScrollToCatalog}
                className="px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                {isAr ? 'استعراض كتالوج المنتجات' : 'Browse Supplies Catalog'}
              </button>

              {onOpenCatalogPdf && (
                <button
                  onClick={onOpenCatalogPdf}
                  className="px-4 py-3.5 text-sm font-bold text-slate-900 bg-amber-100/80 hover:bg-amber-200/90 border border-amber-300 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>{isAr ? 'كتالوج PDF وجدول الأسعار' : 'Official PDF & Price Sheet'}</span>
                </button>
              )}

              <a
                href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent('السلام عليكم، نود طلب قائمة الأسعار المعتمدة لمؤسسة وادي الرعاية الطبية.')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'طلب التسعير عبر واتساب' : 'Request RFQ on WhatsApp'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Carrier / Clinical Showcase */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg relative group">
              <img
                src="/src/assets/images/hero_medical_supplies_1792225788920.jpg"
                alt="VALL CARE Medical Supplies and Clinical Equipment in Riyadh"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'معتمد ومطابق للمعايير الطبية' : 'SFDA & Hospital Standard Compliant'}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight">
                  {isAr ? 'وادي الرعاية للتجارة' : 'VALL CARE Trade'}
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  {isAr
                    ? 'المستهلكات الطبية · الأجهزة والتشخيص · مستلزمات الرعاية المنزلية'
                    : 'Medical Disposables · Clinical Equipment · Home Healthcare Solutions'}
                </p>
                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{COMPANY_INFO.address.district}, {COMPANY_INFO.address.city}</span>
                  </span>
                  <span className="font-mono tabular-nums text-emerald-300">
                    Masoom Akhtar Khan
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof / Trust Strip (below 2-column hero split) */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {isAr ? 'توريد سريع بالرياض' : 'Rapid Riyadh Delivery'}
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                {isAr ? 'تسليم فوري للمستشفيات والعيادات' : 'Same-day urgent orders available'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {isAr ? 'ماركات عالمية موثوقة' : 'Global Certified Brands'}
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                Riester · DETECTO · BariQ · KBM
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {isAr ? 'جدولة واتساب مباشرة' : 'Direct WhatsApp Flow'}
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                {isAr ? 'تنسيق فوري مع ممثل المبيعات' : 'No delay, direct rep confirmation'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {isAr ? 'مقرنا بحي العليا' : 'Al Olaya Riyadh Hub'}
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                {isAr ? 'شارع عبد العزيز بن مساعد بن جلوي' : 'Building 3155, Postal 12611'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
