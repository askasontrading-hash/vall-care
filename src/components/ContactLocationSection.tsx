import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { downloadVCard, getWhatsAppQuickChatUrl } from '../utils/whatsapp';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Download, 
  MessageSquare,
  Building,
  Check,
  Copy
} from 'lucide-react';

interface ContactLocationSectionProps {
  language: Language;
}

export const ContactLocationSection: React.FC<ContactLocationSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(COMPANY_INFO.phones.primaryWhatsApp);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
            {isAr ? 'المقر الرئيسي وخدمة العملاء' : 'Location & Verified Channels'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isAr ? 'مقر وادي الرعاية للتجارة بالرياض' : 'VALL CARE Trade Headquarters in Riyadh'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {isAr
              ? 'يقع مكتبنا في قلب الرياض بحي العليا لتأمين سرعة التوريد والاستجابة لكافة المستشفيات والمراكز التخصصية.'
              : 'Centrally located in Al Olaya, Riyadh, ensuring rapid response times and distribution across central healthcare networks.'}
          </p>
        </div>

        {/* 2-Column Split: Info Cards & Interactive Location Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'العنوان الوطني والرسمي' : 'Official Postal Address'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isAr ? COMPANY_INFO.address.ar : COMPANY_INFO.address.en}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    Building 3155 · Postal Code: 12611 · Al Olaya, Riyadh
                  </p>
                  <a
                    href={COMPANY_INFO.address.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2"
                  >
                    <span>{isAr ? 'عرض على خرائط Google' : 'Open in Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'أرقام الاتصال والواتساب' : 'Phone & Direct WhatsApp'}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{isAr ? 'الواتساب الرئيسي (المكتوب يدوياً):' : 'Primary WhatsApp:'}</span>
                      <a 
                        href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono font-bold text-emerald-700 hover:underline"
                      >
                        {COMPANY_INFO.phones.primaryWhatsApp}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{isAr ? 'الهاتف المكتبي (المطبوع):' : 'Office Mobile:'}</span>
                      <a 
                        href={`tel:${COMPANY_INFO.phones.secondaryPhone}`}
                        className="font-mono font-bold text-slate-800 hover:text-blue-600"
                      >
                        {COMPANY_INFO.phones.secondaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={handleCopyPhone}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedPhone ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرقم' : 'Copy Number')}</span>
                    </button>
                    <button
                      onClick={downloadVCard}
                      className="px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>{isAr ? 'تحميل بطاقة الاتصال (.vcf)' : 'Save vCard'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'أوقات العمل والمراسلة' : 'Hours & Official Email'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {isAr ? COMPANY_INFO.workingHours.ar : COMPANY_INFO.workingHours.en}
                  </p>
                  <p className="text-xs text-slate-700 font-mono mt-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline text-blue-700">
                      {COMPANY_INFO.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual Column */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Visual background map grid graphic */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                    {isAr ? 'خارطة التوزيع والتغطية' : 'Distribution & Logistics Hub'}
                  </span>
                  <h3 className="text-xl font-bold mt-0.5">
                    {isAr ? 'العليا - الرياض، المملكة العربية السعودية' : 'Al Olaya - Riyadh, Saudi Arabia'}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              {/* Riyadh Key Facilities Served */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                  {isAr ? 'أبرز المنشآت الطبية القريبة المغطاة فورياً:' : 'Key Nearby Medical Hubs Served:'}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>King Fahad Medical City (KFMC)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Dr. Sulaiman Al Habib Olaya</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Specialized Medical Center (SMC)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Al Hammadi Hospital Olaya</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside card */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-300">
                {isAr ? 'مندوب المبيعات الميداني: ' : 'Direct Field Sales Rep: '}
                <strong className="text-white">{COMPANY_INFO.salesRep.nameEn}</strong>
              </span>

              <a
                href={getWhatsAppQuickChatUrl('visit')}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{isAr ? 'بدء محادثة واتساب الآن' : 'Start WhatsApp Now'}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
