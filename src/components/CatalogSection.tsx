import React, { useState } from 'react';
import { ProductItem, ProductCategory, Language } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';
import { 
  Search, 
  Plus, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Package, 
  SlidersHorizontal,
  ExternalLink,
  X
} from 'lucide-react';

import { downloadExcelPricingSheet } from '../utils/catalogExport';

interface CatalogSectionProps {
  language: Language;
  onAddToInquiry: (product: ProductItem) => void;
  inquiryProductIds: string[];
  onOpenBookingForProduct: (product: ProductItem) => void;
  onOpenCatalogPdf: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  language,
  onAddToInquiry,
  inquiryProductIds,
  onOpenBookingForProduct,
  onOpenCatalogPdf,
}) => {
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const categories: { id: ProductCategory; labelEn: string; labelAr: string }[] = [
    { id: 'all', labelEn: 'All Supplies', labelAr: 'كافة المنتجات' },
    { id: 'disposables', labelEn: 'Medical Disposables', labelAr: 'المستهلكات الطبية' },
    { id: 'equipment', labelEn: "Equipment's & Diagnostics", labelAr: 'الأجهزة والمعدات' },
    { id: 'home_care', labelEn: 'Home Care Supplies', labelAr: 'الرعاية المنزلية' },
  ];

  const brands = ['all', 'Riester', 'DETECTO', 'BariQ 2030', 'KBM HK', 'Gloveix', 'Giggles', 'Moon Light', 'VALL CARE'];

  const filteredProducts = PRODUCTS.filter((p) => {
    // Category filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    // Brand filter
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = p.nameEn.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchAr = p.nameAr.toLowerCase().includes(q) || p.descriptionAr.toLowerCase().includes(q);
      return matchEn || matchAr;
    }
    return true;
  });

  return (
    <section id="catalog" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
              {isAr ? 'كتالوج المنتجات والمستلزمات' : 'Medical Inventory & Catalog'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isAr ? 'المستهلكات والأجهزة الطبية المعتمدة' : 'Medical Disposables, Diagnostics & Home Care'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              {isAr
                ? 'مستلزمات معتمدة ومطابقة لمواصفات الهيئة العامة للغذاء والدواء SFDA مع إمكانية طلب عينات مجانية وتسعير فوري'
                : 'Hospital-grade supplies with SFDA certification. Request samples or add to your WhatsApp RFQ list.'}
            </p>
          </div>

          {/* Download & Export Actions + Quick Counter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCatalogPdf}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{isAr ? 'كتالوج PDF الرسمي' : 'Official PDF Catalog'}</span>
            </button>

            <button
              onClick={downloadExcelPricingSheet}
              className="px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{isAr ? 'جدول أسعار إكسل (Excel)' : 'Excel Pricing Sheet'}</span>
            </button>

            <div className="text-xs text-slate-500 font-medium px-2 py-1 bg-white rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 tabular-nums">{filteredProducts.length}</span>
              <span> {isAr ? 'صنفاً' : 'items'}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-8 space-y-4">
          
          {/* Top row: Categories + Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {categories.map((cat) => {
                const count = PRODUCTS.filter((p) => cat.id === 'all' || p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedCategory === cat.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث بالاسم، الماركة، أو الصنف (مثل: قفازات، سرنجات)...' : 'Search supplies, gloves, syringes, Riester...'}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Quick Search Preset Tags */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 text-slate-600">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap shrink-0">
              {isAr ? 'وصول سريع:' : 'Quick Tags:'}
            </span>
            {[
              { en: 'Gloves', ar: 'قفازات' },
              { en: 'Face Masks', ar: 'كمامات' },
              { en: 'Sharps Containers', ar: 'حاويات حادة' },
              { en: 'Bed Sheets', ar: 'شراشف أسرة' },
              { en: 'Gowns & Aprons', ar: 'أرواب ومآزر' },
              { en: 'Syringes', ar: 'سرنجات' },
              { en: 'Needles', ar: 'إبر حقن' },
              { en: 'IV Cannula', ar: 'كانيولا وريدية' },
              { en: 'Wheelchairs & Beds', ar: 'كراسي وأسرة' },
              { en: 'Alcohol Swabs', ar: 'مسحات كحولية' },
            ].map((tag) => (
              <button
                key={tag.en}
                onClick={() => setSearchQuery(isAr ? tag.ar : tag.en)}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 border border-slate-200/60"
              >
                {isAr ? tag.ar : tag.en}
              </button>
            ))}
          </div>

          {/* Bottom row: Brand filters */}
          <div className="flex items-center gap-2 text-xs pt-2 border-t border-slate-100 overflow-x-auto">
            <span className="text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isAr ? 'الماركة:' : 'Brand:'}</span>
            </span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedBrand === b
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b === 'all' ? (isAr ? 'الكل' : 'All Brands') : b}
              </button>
            ))}

            <div className="ml-auto text-[11px] text-slate-500 whitespace-nowrap font-medium pr-2">
              {isAr ? `عرض ${filteredProducts.length} من أصل ${PRODUCTS.length} منتج` : `Showing ${filteredProducts.length} of ${PRODUCTS.length} products`}
            </div>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-700">
              {isAr ? 'لم يتم العثور على منتجات مطابقة' : 'No matching products found'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {isAr ? 'يرجى تجربة كلمة بحث مختلفة أو تغيير التصنيف.' : 'Try adjusting your search query or filters.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCart = inquiryProductIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  
                  {/* Image & Click to preview */}
                  <div 
                    className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => setActiveModalProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      {product.brand}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5">
                        <span className="capitalize">{product.category.replace('_', ' ')}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-medium">{product.certifications[0]}</span>
                      </div>

                      <h3 
                        onClick={() => setActiveModalProduct(product)}
                        className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
                        title={product.nameEn}
                      >
                        {isAr ? product.nameAr : product.nameEn}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {isAr ? product.descriptionAr : product.descriptionEn}
                      </p>

                      {/* Specs snippet */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
                          <Package className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{isAr ? product.packagingAr : product.packagingEn}</span>
                        </span>
                        <span className="font-mono text-emerald-700 font-semibold text-[10px]">
                          {isAr ? 'متوفر' : 'In Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToInquiry(product)}
                        className={`px-2.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 whitespace-nowrap ${
                          inCart
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{inCart ? (isAr ? 'في القائمة' : 'Added') : (isAr ? 'طلب تسعير' : '+ Add RFQ')}</span>
                      </button>

                      <a
                        href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent(`السلام عليكم أ. معصوم أختار خان، أود الاستفسار عن توفر وسعر المنتج التالي:\n*${product.nameAr}*\n(${product.nameEn})\nالماركة: ${product.brand}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-2 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                      </a>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Product Modal */}
        {activeModalProduct && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveModalProduct(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 border border-slate-200 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-blue-600">{activeModalProduct.brand}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{activeModalProduct.category.replace('_', ' ')}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {isAr ? activeModalProduct.nameAr : activeModalProduct.nameEn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr ? activeModalProduct.nameEn : activeModalProduct.nameAr}
              </p>

              <div className="my-4 aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr ? activeModalProduct.descriptionAr : activeModalProduct.descriptionEn}
              </p>

              {/* Specs List */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isAr ? 'المواصفات الفنية' : 'Technical Specifications'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(isAr ? activeModalProduct.specsAr : activeModalProduct.specsEn).map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications and Packaging */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium mb-1">{isAr ? 'التعبئة والتغليف' : 'Packaging'}</span>
                  <span className="text-slate-800 font-semibold">{isAr ? activeModalProduct.packagingAr : activeModalProduct.packagingEn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-1">{isAr ? 'الشهادات والاعتمادات' : 'Certifications'}</span>
                  <span className="text-emerald-700 font-semibold">{activeModalProduct.certifications.join(', ')}</span>
                </div>
              </div>

              {/* Modal CTA Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    onAddToInquiry(activeModalProduct);
                    setActiveModalProduct(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة إلى قائمة التسعير' : 'Add to RFQ List'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModalProduct(null);
                    onOpenBookingForProduct(activeModalProduct);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>{isAr ? 'حجز موعد تجربة' : 'Schedule Demo'}</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent(`مرحباً أ. معصوم أختار خان، أود طلب عينة رسمية وعرض سعر لمنتج:\n*${activeModalProduct.nameAr}*\n(${activeModalProduct.nameEn})`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'طلب عينة واتساب' : 'Request Sample'}</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
