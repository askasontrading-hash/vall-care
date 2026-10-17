import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Language } from '../types';
import { downloadVCard } from '../utils/whatsapp';
import { MessageSquare, Phone, Mail, MapPin, Download } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenBooking }) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-white stroke-[8] stroke-linecap-round stroke-linejoin-round">
                  <path d="M30,30 C20,30 15,40 15,50 C15,65 35,78 50,88 C65,78 85,65 85,50 C85,40 80,30 70,30 C62,30 55,36 50,44 C45,36 38,30 30,30 Z" />
                  <path d="M25,50 L40,50 L45,38 L52,62 L58,45 L64,52 L75,52" />
                </svg>
              </div>
              <span>{COMPANY_INFO.nameEn}</span>
            </div>
            <p className="text-slate-300 font-medium">
              {COMPANY_INFO.nameAr}
            </p>
            <p className="text-slate-400 max-w-md leading-relaxed">
              {isAr
                ? 'المؤسسة المتخصصة في توريد المستلزمات الطبية المعقمة، أجهزة التشخيص السريرية الألمانية والأمريكية وتجهيزات الرعاية المنزلية في الرياض.'
                : 'Specialized enterprise for sterile medical disposables, diagnostic hospital equipment, and home healthcare supplies in Riyadh, Saudi Arabia.'}
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={downloadVCard}
                className="text-white hover:text-blue-400 flex items-center gap-1.5 transition-colors font-medium"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'تحميل بطاقة المبيعات (vCard)' : 'Download Sales vCard'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              {isAr ? 'الأقسام والتصنيفات' : 'Categories'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">{isAr ? 'المستهلكات الطبية (Disposables)' : 'Medical Disposables'}</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">{isAr ? 'الأجهزة والمعدات (Equipment)' : 'Medical Equipment'}</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">{isAr ? 'الرعاية المنزلية (Home Care)' : 'Home Care Supplies'}</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Riester & DETECTO</a></li>
            </ul>
          </div>

          {/* Direct Sales Rep Details */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              {isAr ? 'مسؤول المبيعات' : 'Sales Representative'}
            </h4>
            <p className="text-white font-semibold">
              {COMPANY_INFO.salesRep.nameEn}
            </p>
            <p className="text-slate-400">
              {COMPANY_INFO.salesRep.nameAr}
            </p>
            <p className="font-mono text-emerald-400 font-bold tabular-nums">
              {COMPANY_INFO.phones.primaryWhatsApp}
            </p>
            <p className="font-mono text-slate-300">
              {COMPANY_INFO.phones.secondaryPhone}
            </p>
            <p className="font-mono text-slate-400 truncate">
              {COMPANY_INFO.email}
            </p>
          </div>

        </div>

        {/* Bottom Bar: Clean quiet legal copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.nameEn} ({COMPANY_INFO.nameAr}). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Riyadh 12611, Saudi Arabia</span>
            <span>·</span>
            <span>SFDA Compliant</span>
            <span>·</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}`} 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:underline"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
