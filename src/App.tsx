/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ProductItem, InquiryItem, AppointmentData } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalVisitingCard } from './components/DigitalVisitingCard';
import { CatalogSection } from './components/CatalogSection';
import { AppointmentSchedulerSection } from './components/AppointmentSchedulerSection';
import { BrandPartnersSection } from './components/BrandPartnersSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { InquiryCartDrawer } from './components/InquiryCartDrawer';
import { AppointmentsHistoryModal } from './components/AppointmentsHistoryModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { CatalogPdfModal } from './components/CatalogPdfModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic as primary language for Saudi market
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalItem, setBookingModalItem] = useState<ProductItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCatalogPdfOpen, setIsCatalogPdfOpen] = useState(false);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  // Keep HTML document dir in sync with language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Load cart from session/local storage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vallcare_inquiry_cart');
      if (stored) {
        setInquiryItems(JSON.parse(stored));
      }
    } catch {
      // storage fallback
    }
  }, []);

  const saveCart = (items: InquiryItem[]) => {
    setInquiryItems(items);
    try {
      localStorage.setItem('vallcare_inquiry_cart', JSON.stringify(items));
    } catch {
      // storage
    }
  };

  const handleAddToInquiry = (product: ProductItem) => {
    const existingIndex = inquiryItems.findIndex((i) => i.product.id === product.id);
    let updated: InquiryItem[];
    if (existingIndex >= 0) {
      updated = [...inquiryItems];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...inquiryItems, { product, quantity: 1 }];
    }
    saveCart(updated);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = inquiryItems
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as InquiryItem[];
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = inquiryItems.filter((i) => i.product.id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleOpenBookingForProduct = (product: ProductItem) => {
    setBookingModalItem(product);
    setIsBookingModalOpen(true);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCard = () => {
    const el = document.getElementById('card-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenBooking={() => {
          setBookingModalItem(null);
          setIsBookingModalOpen(true);
        }}
        onOpenCard={handleScrollToCard}
        onOpenCatalogPdf={() => setIsCatalogPdfOpen(true)}
        inquiryCount={inquiryItems.length}
        onOpenInquiryCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Focal Anchor and 4-Column Proof Row */}
        <HeroSection
          language={language}
          onOpenBooking={() => {
            setBookingModalItem(null);
            setIsBookingModalOpen(true);
          }}
          onScrollToCatalog={handleScrollToCatalog}
          onOpenCatalogPdf={() => setIsCatalogPdfOpen(true)}
        />

        {/* 2. Interactive 3D Digital Visiting Card Twin */}
        <DigitalVisitingCard
          language={language}
          onOpenBooking={() => {
            setBookingModalItem(null);
            setIsBookingModalOpen(true);
          }}
        />

        {/* 3. Medical Supplies Catalog with Category Filters & Zero-Pill Metadata */}
        <CatalogSection
          language={language}
          onAddToInquiry={handleAddToInquiry}
          inquiryProductIds={inquiryItems.map((i) => i.product.id)}
          onOpenBookingForProduct={handleOpenBookingForProduct}
          onOpenCatalogPdf={() => setIsCatalogPdfOpen(true)}
        />

        {/* 4. In-page Appointment & Procurement Scheduler with direct WhatsApp dispatch */}
        <AppointmentSchedulerSection
          language={language}
          onAppointmentBooked={(_appointment: AppointmentData) => {
            // Callback handles notification
          }}
        />

        {/* 5. Authorized Partner Brands (Riester, DETECTO, BariQ 2030, KBM HK) */}
        <BrandPartnersSection
          language={language}
          onOpenBooking={() => {
            setBookingModalItem(null);
            setIsBookingModalOpen(true);
          }}
        />

        {/* 6. Contact & Riyadh Location Hub */}
        <ContactLocationSection language={language} />
      </main>

      {/* Quiet Constitutional Footer */}
      <Footer
        language={language}
        onOpenBooking={() => {
          setBookingModalItem(null);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Mobile Floating Action Bar (<15% viewport height) */}
      <FloatingActionBar
        language={language}
        onOpenBooking={() => {
          setBookingModalItem(null);
          setIsBookingModalOpen(true);
        }}
        inquiryCount={inquiryItems.length}
        onOpenInquiryCart={() => setIsCartOpen(true)}
      />

      {/* Modals & Drawers */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingModalItem(null);
        }}
        language={language}
        initialPurpose={bookingModalItem ? 'product_demo' : 'procurement'}
        initialItemName={bookingModalItem ? `${bookingModalItem.nameEn} (${bookingModalItem.nameAr})` : undefined}
      />

      <InquiryCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      <AppointmentsHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        language={language}
      />

      <CatalogPdfModal
        isOpen={isCatalogPdfOpen}
        onClose={() => setIsCatalogPdfOpen(false)}
        language={language}
      />

    </div>
  );
}
