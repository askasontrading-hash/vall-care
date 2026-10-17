export type Language = 'en' | 'ar';

export type ProductCategory = 'all' | 'disposables' | 'equipment' | 'home_care';

export interface ProductItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'disposables' | 'equipment' | 'home_care';
  brand: 'Riester' | 'DETECTO' | 'BariQ 2030' | 'KBM ' | 'VALL CARE' | 'Gloveix' | 'Giggles' | 'Moon Light' | string;
  image: string;
  descriptionEn: string;
  descriptionAr: string;
  specsEn: string[];
  specsAr: string[];
  packagingEn: string;
  packagingAr: string;
  inStock: boolean;
  certifications: string[];
}

export type AppointmentPurpose = 
  | 'procurement' 
  | 'product_demo' 
  | 'urgent_quotation' 
  | 'home_care_setup' 
  | 'tender_rfp';

export interface AppointmentData {
  id: string;
  fullName: string;
  organization: string; // Hospital, Clinic, Pharmacy, Home Care, Individual
  facilityType: 'hospital' | 'clinic' | 'laboratory' | 'home' | 'other';
  phoneNumber: string;
  email?: string;
  city: string;
  district?: string;
  purpose: AppointmentPurpose;
  date: string;
  timeSlot: string;
  meetingFormat: 'in_person' | 'whatsapp_call' | 'video_meeting';
  notes?: string;
  requestedItems?: string[];
  createdAt: string;
  status: 'confirmed_whatsapp' | 'pending';
}

export interface InquiryItem {
  product: ProductItem;
  quantity: number;
  notes?: string;
}
