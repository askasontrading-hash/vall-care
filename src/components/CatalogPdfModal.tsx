import React, { useState } from 'react';
import { Language, ProductCategory } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';
import { downloadExcelPricingSheet } from '../utils/catalogExport';
import { 
  X, 
  Printer, 
  FileSpreadsheet, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2,
  Calendar,
  Layers,
  Filter
} from 'lucide-react';

interface CatalogPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CatalogPdfModal: React.FC<CatalogPdfModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<ProductCategory>('all');
  if (!isOpen) return null;

  const isAr = language === 'ar';

  const displayedProducts = selectedFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedFilter);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[94vh] overflow-y-auto p-4 sm:p-8 border border-slate-200 shadow-2xl relative my-auto print:max-w-none print:max-h-none print:w-full print:border-none print:shadow-none print:p-0 print:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              PDF
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight flex items-center gap-2">
                <span>{isAr ? 'الكتالوج الطبي الشامل وجدول الأسعار المعتمد' : 'Official Medical Supplies Catalog & Price Sheet'}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold">
                  {PRODUCTS.length} {isAr ? 'منتج معتمد' : 'Products'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {COMPANY_INFO.nameEn} · {COMPANY_INFO.nameAr}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
              <Filter className="w-3.5 h-3.5 mx-1 text-slate-400" />
              {(['all', 'disposables', 'equipment', 'home_care'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedFilter === cat
                      ? 'bg-white text-blue-700 shadow-2xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' && (isAr ? 'الكل (82)' : 'All (82)')}
                  {cat === 'disposables' && (isAr ? 'المستهلكات' : 'Disposables')}
                  {cat === 'equipment' && (isAr ? 'الأجهزة' : 'Equipment')}
                  {cat === 'home_care' && (isAr ? 'الرعاية المنزلية' : 'Home Care')}
                </button>
              ))}
            </div>

            {/* Download Excel Sheet */}
            <button
              onClick={downloadExcelPricingSheet}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-98"
              title="Download Excel / CSV Pricing Sheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل جدول الإكسل (Excel)' : 'Download Excel'}</span>
            </button>

            {/* Print / Save as PDF */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-98"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'طباعة / حفظ كـ PDF' : 'Print / Save as PDF'}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Catalog Document Body */}
        <div className="catalog-print-area space-y-6 text-slate-900" dir={isAr ? 'rtl' : 'ltr'}>
          
          {/* Document Header */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border-slate-300 print:bg-white print:p-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 print:bg-blue-700">
                <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-current stroke-[7] stroke-linecap-round stroke-linejoin-round">
                  <path d="M30,30 C20,30 15,40 15,50 C15,65 35,78 50,88 C65,78 85,65 85,50 C85,40 80,30 70,30 C62,30 55,36 50,44 C45,36 38,30 30,30 Z" />
                  <path d="M25,50 L40,50 L45,38 L52,62 L58,45 L64,52 L75,52" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {COMPANY_INFO.nameEn}
                  </h1>
                  <span className="text-sm font-semibold text-slate-600">
                    {COMPANY_INFO.nameAr}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {COMPANY_INFO.subtitleEn} · {COMPANY_INFO.subtitleAr}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>3155 Abdulaziz Ibn Musaid, Al Olaya, Riyadh 12611</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-mono text-emerald-700 font-bold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{COMPANY_INFO.phones.primaryWhatsApp} / {COMPANY_INFO.phones.secondaryPhone}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{COMPANY_INFO.email}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 shrink-0" dir="ltr">
              <span className="text-[10px] uppercase font-bold text-blue-600 block">Sales Representative</span>
              <span className="text-base font-extrabold text-slate-900 block">{COMPANY_INFO.salesRep.nameEn}</span>
              <span className="text-xs text-slate-600 font-medium block" dir="rtl">{COMPANY_INFO.salesRep.nameAr}</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold block mt-1">Direct WA: {COMPANY_INFO.phones.primaryWhatsApp}</span>
              <span className="text-[10px] text-slate-400 block mt-1 flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3" />
                <span>Issue Date: {currentDate}</span>
              </span>
            </div>
          </div>

          {/* Catalog Trust Markers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center print:bg-white print:border-slate-300">
              <span className="font-bold text-slate-900 block">SFDA & CE Approved</span>
              <span className="text-slate-500 text-[11px]">{PRODUCTS.length} Certified Products</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center print:bg-white print:border-slate-300">
              <span className="font-bold text-slate-900 block">Riester & DETECTO</span>
              <span className="text-slate-500 text-[11px]">Authorized Channels</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center print:bg-white print:border-slate-300">
              <span className="font-bold text-slate-900 block">BariQ 2030 & Gloveix</span>
              <span className="text-slate-500 text-[11px]">Saudi & Global Standards</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center print:bg-white print:border-slate-300">
              <span className="font-bold text-slate-900 block">Riyadh Olaya Hub</span>
              <span className="text-slate-500 text-[11px]">Immediate Delivery & Samples</span>
            </div>
          </div>

          {/* Master Catalog Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs print:border-slate-300 print:shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" dir="ltr">
                <thead className="bg-slate-100/90 text-slate-700 uppercase font-bold border-b border-slate-200 print:bg-slate-200">
                  <tr>
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-4">Item & Description</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Brand</th>
                    <th className="py-3 px-4">Sizes & Specifications</th>
                    <th className="py-3 px-3">Packaging</th>
                    <th className="py-3 px-3">Standards</th>
                    <th className="py-3 px-3">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800 print:divide-slate-300">
                  {displayedProducts.map((prod, index) => (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors print:hover:bg-transparent">
                      <td className="py-3 px-3 font-mono font-semibold text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-4 min-w-[240px]">
                        <span className="font-bold text-slate-900 block text-xs">
                          {prod.nameEn}
                        </span>
                        <span className="text-slate-600 block text-[11px] mt-0.5" dir="rtl">
                          {prod.nameAr}
                        </span>
                        <span className="text-[10px] font-mono text-blue-600 mt-1 block">
                          Code: {prod.id.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="capitalize font-medium text-slate-600 text-[11px]">
                          {prod.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="font-bold text-blue-700 text-[11px]">
                          {prod.brand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-600 max-w-[280px]">
                        <ul className="list-disc list-inside space-y-0.5">
                          {prod.specsEn.slice(0, 3).map((s, idx) => (
                            <li key={idx} className="truncate" title={s}>{s}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-slate-700 font-medium whitespace-nowrap">
                        {prod.packagingEn}
                      </td>
                      <td className="py-3 px-3 text-[10px] text-emerald-700 font-semibold whitespace-nowrap">
                        {prod.certifications.slice(0, 2).join(' · ')}
                      </td>
                      <td className="py-3 px-3 text-[10px] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>In Stock</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Footer Callout */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs print:bg-white print:text-black print:border print:border-slate-300">
            <div>
              <span className="font-bold block text-sm">
                VALL CARE Trade (مؤسسة وادي الرعاية للتجارة)
              </span>
              <span className="text-slate-400 print:text-slate-600 text-xs mt-0.5 block">
                Official Healthcare & Medical Supplies Procurement · Al Olaya Riyadh · Direct Sales: {COMPANY_INFO.phones.primaryWhatsApp}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 print:hidden">
              <button
                onClick={downloadExcelPricingSheet}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{isAr ? 'تصدير إكسل' : 'Export Excel'}</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent('السلام عليكم أ. معصوم أختار خان، نود طلب عرض أسعار رسمي للكتالوج الطبي الكامل لمؤسسة وادي الرعاية (82 منتج).')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'طلب تسعير كامل الكتالوج عبر واتساب' : 'Request Full RFQ via WhatsApp'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
