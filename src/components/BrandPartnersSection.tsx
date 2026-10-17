import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { ShieldCheck, Award, CheckCircle2, MessageSquare } from 'lucide-react';

interface BrandPartnersSectionProps {
  language: Language;
  onOpenBooking: () => void;
}

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({
  language,
  onOpenBooking,
}) => {
  const isAr = language === 'ar';

  return (
    <section id="partners" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
            {isAr ? 'شركاء الجودة والاعتماد' : 'Certified Manufacturer Partnerships'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isAr ? 'العلامات التجارية المعتمدة ببطاقة وادي الرعاية' : 'Authorized Partner Brands'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {isAr
              ? 'نضمن توريد منتجات أصلية 100% معتمدة من الهيئة العامة للغذاء والدواء بالمملكة العربية السعودية'
              : 'Official authorized supply channel for world-renowned German, American, and regional medical manufacturers.'}
          </p>
        </div>

        {/* 4 Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.partnerBrands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Brand Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs font-extrabold text-sm text-slate-900 tracking-tight">
                    {brand.name}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {brand.country}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {isAr ? brand.specialtyAr : brand.specialtyEn}
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {isAr ? brand.descriptionAr : brand.descriptionEn}
                </p>
              </div>

              {/* Brand footer assurance */}
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-emerald-700">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'وكيل ومورد معتمد' : 'Authorized Channel'}</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">SFDA / CE</span>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Callout Strip */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'عقود التوريد والمناقصات' : 'Hospital Contracts & Tender Supplies'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              {isAr ? 'هل تحتاج إلى توريد كميات كبرى لمستشفاك أو مجمعك الطبي؟' : 'Need bulk supply contracts or official SFDA compliance documents?'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {isAr
                ? 'يوفر أ. معصوم أختار خان عروض أسعار تفصيلية وجداول تسليم فورية داخل مدينة الرياض وكافة مناطق المملكة.'
                : 'Masoom Akhtar Khan prepares official institutional bids, batch certificates, and scheduled clinical deliveries across Riyadh.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              {isAr ? 'طلب اجتماع توريد' : 'Schedule Procurement Meeting'}
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent('السلام عليكم أ. معصوم، نود التنسيق لمناقصة / طلب توريد كميات كبرى لمستلزمات المستشفى.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'واتساب مباشر' : 'WhatsApp RFP'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
