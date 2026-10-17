import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { 
  downloadVCard, 
  getWhatsAppQuickChatUrl 
} from '../utils/whatsapp';
import { 
  RotateCw, 
  Download, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  User, 
  Share2, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface DigitalVisitingCardProps {
  language: Language;
  onOpenBooking: () => void;
}

export const DigitalVisitingCard: React.FC<DigitalVisitingCardProps> = ({
  language,
  onOpenBooking,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAr = language === 'ar';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VALL CARE Trade - Masoom Akhtar Khan',
          text: 'VALL CARE Trade - Medical Supplies, Equipment & Home Care Supplies in Riyadh.',
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="card-preview" className="py-12 bg-slate-100/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
            {isAr ? 'البطاقة التعريفية الرقمية' : 'Verified Business Identity'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isAr ? 'بطاقة الزيارة التفاعلية لممثل المبيعات' : 'Interactive Digital Visiting Card'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isAr
              ? 'النسخة الرقمية المتطابقة لبطاقة العمل الرسمية مع حفظ فوري لجهات الاتصال والربط المباشر بواتساب'
              : 'Digital twin of the physical card with instant 1-click vCard download, direct calling, and WhatsApp scheduling'}
          </p>
        </div>

        {/* Card Display Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* 3D Flippable Business Card */}
          <div className="w-full max-w-[440px] perspective-1000">
            <div 
              className={`relative w-full aspect-[1.75/1] transition-transform duration-700 transform-style-3d cursor-pointer select-none rounded-2xl shadow-xl hover:shadow-2xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
              role="button"
              tabIndex={0}
              aria-label="Click to flip visiting card"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFlipped(!isFlipped);
                }
              }}
            >
              
              {/* ===== FRONT OF CARD ===== */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden bg-white border border-slate-200/80 flex flex-col justify-between">
                
                {/* Upper White/Cream Zone */}
                <div className="p-4 sm:p-5 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
                  <div className="flex items-start gap-3">
                    {/* Vall Care Stethoscope Heart Logo */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900/5 p-1.5 flex items-center justify-center text-slate-800">
                      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-none stroke-current stroke-[6] stroke-linecap-round stroke-linejoin-round">
                        <path d="M30,30 C20,30 15,40 15,50 C15,65 35,78 50,88 C65,78 85,65 85,50 C85,40 80,30 70,30 C62,30 55,36 50,44 C45,36 38,30 30,30 Z" />
                        <path d="M25,50 L38,50 L43,38 L50,62 L56,45 L62,52 L75,52" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                          VALL
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-900 text-white text-xs font-bold rounded">
                          CARE
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Trade</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5" dir="rtl">
                        مؤسسة وادي الرعاية للتجارة
                      </p>
                    </div>
                  </div>

                  {/* Handwritten number simulation as on physical card */}
                  <div className="text-right">
                    <span className="text-[10px] font-medium text-emerald-700 block uppercase tracking-wider">
                      Direct WhatsApp
                    </span>
                    <span className="font-mono text-base font-extrabold text-blue-700 tracking-wide bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 inline-block">
                      0510950568
                    </span>
                  </div>
                </div>

                {/* Green Horizontal Divider Strip with 4 Circle Icons */}
                <div className="h-7 bg-emerald-600 px-6 flex items-center justify-between text-white shadow-inner">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Lower Blue Block */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                        {COMPANY_INFO.salesRep.nameEn}
                      </h3>
                      <p className="text-xs text-blue-100 font-medium">
                        {COMPANY_INFO.salesRep.titleEn} · {COMPANY_INFO.salesRep.titleAr}
                      </p>
                    </div>
                    <div className="text-right">
                      <a 
                        href={`tel:${COMPANY_INFO.phones.secondaryPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-semibold text-white/95 hover:text-white underline decoration-blue-300"
                      >
                        {COMPANY_INFO.phones.secondaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 flex items-end justify-between text-[11px] text-blue-100">
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-white transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-right font-medium text-white/90" dir="rtl">
                      الرياض - العليا - عبد العزيز بن مساعد بن جلوي 3155
                    </span>
                  </div>
                </div>

              </div>

              {/* ===== BACK OF CARD ===== */}
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 bg-slate-900 border border-slate-700 flex shadow-xl">
                
                {/* Left Green Brand Strip */}
                <div className="w-20 bg-emerald-700 p-2 flex flex-col justify-between items-center text-white border-r border-emerald-800/50">
                  <div className="text-[10px] font-bold tracking-tight bg-white/20 px-1.5 py-0.5 rounded text-center">
                    BariQ 2030
                  </div>
                  <div className="text-[11px] font-extrabold tracking-wider text-center rotate-[-90deg] my-auto">
                    Riester
                  </div>
                  <div className="text-[10px] font-bold text-center border-t border-emerald-600/50 pt-1">
                    KBM HK
                  </div>
                  <div className="text-[9px] font-extrabold tracking-widest text-center">
                    DETECTO
                  </div>
                </div>

                {/* Main Blue Card Body */}
                <div className="flex-1 p-4 sm:p-5 bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-900 text-white flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-5 h-5 fill-none stroke-white stroke-[7] stroke-linecap-round stroke-linejoin-round">
                          <path d="M30,30 C20,30 15,40 15,50 C15,65 35,78 50,88 C65,78 85,65 85,50 C85,40 80,30 70,30 C62,30 55,36 50,44 C45,36 38,30 30,30 Z" />
                          <path d="M25,50 L40,50 L45,38 L52,62 L58,45 L64,52 L75,52" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-bold tracking-tight block">VALLCARE Trade</span>
                        <span className="text-[10px] text-blue-200">Medical Supplies</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-300 font-mono">
                      {COMPANY_INFO.email}
                    </span>
                  </div>

                  {/* 3 Core Pillars matching back of card */}
                  <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <div className="w-6 h-6 mx-auto mb-1 rounded-md bg-blue-500/20 text-blue-300 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-white block leading-tight">
                        Medical Disposables
                      </span>
                      <span className="text-[9px] text-blue-200/80 block mt-0.5" dir="rtl">
                        المستهلكات الطبية
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <div className="w-6 h-6 mx-auto mb-1 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-white block leading-tight">
                        Equipment's
                      </span>
                      <span className="text-[9px] text-emerald-200/80 block mt-0.5" dir="rtl">
                        الأجهزة والمعدات
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <div className="w-6 h-6 mx-auto mb-1 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-white block leading-tight">
                        Home Care
                      </span>
                      <span className="text-[9px] text-purple-200/80 block mt-0.5" dir="rtl">
                        الرعاية المنزلية
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center flex items-center justify-between border-t border-white/10 pt-2">
                    <span>Authorized Partner Brands</span>
                    <span className="text-emerald-400 font-medium">Click to flip front</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Click to flip hint */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
              <RotateCw className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span>
                {isAr
                  ? 'انقر على البطاقة لقلبها ومعاينة الوجه الآخر'
                  : 'Click card to flip between Front and Back'}
              </span>
            </div>
          </div>

          {/* Quick Action Side Panel */}
          <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {COMPANY_INFO.salesRep.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'ممثل المبيعات المعتمد في الرياض' : 'Authorized Sales Representative in Riyadh'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  SA
                </div>
              </div>

              {/* Verified Contact Details Grid */}
              <div className="space-y-2.5 text-xs text-slate-700 mb-6">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp / Direct</span>
                  </span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>{COMPANY_INFO.phones.primaryWhatsApp}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Office / Mobile</span>
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.phones.secondaryPhone}`}
                    className="font-mono font-bold text-slate-900 hover:text-blue-600"
                  >
                    {COMPANY_INFO.phones.secondaryPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Official Email</span>
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-mono text-slate-900 hover:text-blue-600 truncate max-w-[200px]"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Riyadh Office</span>
                  </span>
                  <span className="text-slate-800 text-right truncate max-w-[210px]" title={COMPANY_INFO.address.en}>
                    Al Olaya, 3155 St
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={downloadVCard}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'حفظ جهة الاتصال (.vcf)' : 'Save to Contacts'}</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'حجز موعد واتساب' : 'Schedule on WhatsApp'}</span>
              </button>

              <a
                href={getWhatsAppQuickChatUrl('quote')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>{isAr ? 'طلب تسعير سريع' : 'Quick Price Quote'}</span>
              </a>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة البطاقة' : 'Share Card')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
