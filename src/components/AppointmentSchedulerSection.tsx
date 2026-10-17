import React, { useState } from 'react';
import { 
  AppointmentData, 
  AppointmentPurpose, 
  Language 
} from '../types';
import { 
  COMPANY_INFO, 
  PURPOSE_OPTIONS 
} from '../data/companyData';
import { 
  getWhatsAppAppointmentUrl, 
  downloadCalendarInvite,
  downloadVCard
} from '../utils/whatsapp';
import { 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Download, 
  Copy, 
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface AppointmentSchedulerSectionProps {
  language: Language;
  onAppointmentBooked?: (appointment: AppointmentData) => void;
}

export const AppointmentSchedulerSection: React.FC<AppointmentSchedulerSectionProps> = ({
  language,
  onAppointmentBooked,
}) => {
  const isAr = language === 'ar';

  // Form state
  const [purpose, setPurpose] = useState<AppointmentPurpose>('procurement');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [facilityType, setFacilityType] = useState<AppointmentData['facilityType']>('clinic');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [district, setDistrict] = useState('Al Olaya');
  
  // Date calculation: default to tomorrow or next business day
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [meetingFormat, setMeetingFormat] = useState<AppointmentData['meetingFormat']>('in_person');
  const [notes, setNotes] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Submission / success state
  const [lastBooked, setLastBooked] = useState<AppointmentData | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const timeSlots = [
    { id: '09:00 AM - 11:00 AM', labelEn: 'Morning (09:00 AM - 11:00 AM)', labelAr: 'صباحاً (09:00 ص - 11:00 ص)' },
    { id: '11:00 AM - 01:00 PM', labelEn: 'Late Morning (11:00 AM - 01:00 PM)', labelAr: 'ظهراً (11:00 ص - 01:00 م)' },
    { id: '01:30 PM - 03:30 PM', labelEn: 'Early Afternoon (01:30 PM - 03:30 PM)', labelAr: 'بعد الظهر (01:30 م - 03:30 م)' },
    { id: '04:00 PM - 06:00 PM', labelEn: 'Late Afternoon (04:00 PM - 06:00 PM)', labelAr: 'عصراً (04:00 م - 06:00 م)' },
    { id: '06:30 PM - 08:30 PM', labelEn: 'Evening (06:30 PM - 08:30 PM)', labelAr: 'مساءً (06:30 م - 08:30 م)' },
  ];

  const popularInterests = [
    { id: 'underpads', labelEn: 'Medical Underpads & Bed Protectors', labelAr: 'مفارش صحية طبية (أندر باد)' },
    { id: 'gloveix', labelEn: 'Gloveix Vinyl Exam Gloves', labelAr: 'قفازات فحص فينيل جلوفكس' },
    { id: 'bariq_masks', labelEn: 'BariQ 3-Ply Face Masks (Kids & Adults)', labelAr: 'كمامات بارق 3 طبقات (أطفال وكبار)' },
    { id: 'giggles', labelEn: 'Giggles Adult Incontinence Pants', labelAr: 'حفاضات كلوت للكبار جيجلز' },
    { id: 'std_wheelchair', labelEn: 'Hospital Chrome Wheelchairs', labelAr: 'كراسي متحركة طبية كروم' },
    { id: 'boot_covers', labelEn: 'Knee-High Surgical Boot Covers', labelAr: 'أغطية أحذية جراحية طويلة (أوفر بوت)' },
    { id: 'sharps_bin', labelEn: 'Biohazard Sharps Containers', labelAr: 'حاويات نفايات طبية حادة صفراء' },
    { id: 'disposables', labelEn: 'Sterile Gloves & Catheters', labelAr: 'قفازات جراحية وكانيولا وريدية' },
    { id: 'riester', labelEn: 'Riester Diagnostic Sets', labelAr: 'أجهزة ريستر لفحص الأذن والعين' },
    { id: 'detecto', labelEn: 'DETECTO Clinical Scales', labelAr: 'موازين ديتيكتو الطبية' },
    { id: 'oxygen', labelEn: 'Oxygen Concentrators & Home Care', labelAr: 'مولدات أكسجين ورعاية منزلية' },
  ];

  const toggleInterest = (label: string) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((i) => i !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !organization) {
      alert(isAr ? 'يرجى إكمال الاسم والجهة ورقم الجوال للمتابعة' : 'Please provide your name, organization, and phone number.');
      return;
    }

    const appointment: AppointmentData = {
      id: 'apt-' + Date.now(),
      fullName,
      organization,
      facilityType,
      phoneNumber,
      email: email || undefined,
      city,
      district: district || undefined,
      purpose,
      date,
      timeSlot,
      meetingFormat,
      notes: notes || undefined,
      requestedItems: selectedItems.length > 0 ? selectedItems : undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed_whatsapp',
    };

    // Save to local storage
    try {
      const existingStr = localStorage.getItem('vallcare_appointments');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('vallcare_appointments', JSON.stringify([appointment, ...existing]));
    } catch {
      // Storage fallback
    }

    setLastBooked(appointment);
    if (onAppointmentBooked) {
      onAppointmentBooked(appointment);
    }

    // Launch WhatsApp
    const waUrl = getWhatsAppAppointmentUrl(appointment);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    if (!lastBooked) return;
    const summary = `VALL CARE Appointment: ${lastBooked.date} (${lastBooked.timeSlot}) - ${lastBooked.fullName} (${lastBooked.organization}) - Rep: Masoom Akhtar Khan (${COMPANY_INFO.phones.primaryWhatsApp})`;
    navigator.clipboard.writeText(summary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <section id="booking-section" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {isAr ? 'جدولة مواعيد فورية' : 'Direct Representative Scheduling'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isAr ? 'حجز موعد ميداني أو استشارة مع ممثل المبيعات' : 'Schedule Procurement Appointment with Masoom Akhtar Khan'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isAr
              ? 'حدد تفاصيل الزيارة أو الاجتماع وسيقوم النظام بتوليد طلب الموعد المباشر وإرساله فوراً عبر واتساب إلى جوال الممثل'
              : 'Select your preferred date, time, and supply requirements to schedule directly with VALL CARE Trade sales rep via WhatsApp.'}
          </p>
        </div>

        {/* If appointment just confirmed, show success card */}
        {lastBooked ? (
          <div className="max-w-2xl mx-auto bg-slate-50 border border-emerald-300 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {isAr ? 'تم فتح تطبيق واتساب وجدولة الموعد!' : 'WhatsApp Scheduled Successfully!'}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {isAr
                ? `تم إرسال تفاصيل الموعد بتاريخ ${lastBooked.date} (${lastBooked.timeSlot}) مباشرة إلى أ. معصوم أختار خان على الرقم ${COMPANY_INFO.phones.primaryWhatsApp}.`
                : `Your appointment details for ${lastBooked.date} (${lastBooked.timeSlot}) were prepared for Masoom Akhtar Khan on ${COMPANY_INFO.phones.primaryWhatsApp}.`}
            </p>

            {/* Appointment Recap Box */}
            <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5" dir="ltr">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-medium">Facility / Requester:</span>
                <span className="font-bold text-slate-900">{lastBooked.organization} · {lastBooked.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-medium">Date & Time:</span>
                <span className="font-semibold text-blue-700">{lastBooked.date} ({lastBooked.timeSlot})</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-medium">Sales Rep:</span>
                <span className="font-semibold text-slate-900">Masoom Akhtar Khan ({COMPANY_INFO.phones.primaryWhatsApp})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Format:</span>
                <span className="font-semibold text-emerald-700 uppercase">{lastBooked.meetingFormat.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Quick Actions after booking */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppAppointmentUrl(lastBooked)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'إعادة فتح محادثة واتساب' : 'Re-open WhatsApp Chat'}</span>
              </a>

              <button
                onClick={() => downloadCalendarInvite(lastBooked)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'إضافة إلى التقويم (.ics)' : 'Add to Calendar (.ics)'}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{copiedText ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ ملخص الموعد' : 'Copy Summary')}</span>
              </button>

              <button
                onClick={() => setLastBooked(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
              >
                {isAr ? 'جدولة موعد آخر' : 'Book Another Meeting'}
              </button>
            </div>

          </div>
        ) : (
          /* Main Interactive Scheduler Form */
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            
            {/* Step 1: Purpose Selection */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                {isAr ? '1. اختر نوع الموعد أو الغرض من الزيارة' : '1. Select Appointment Purpose'}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PURPOSE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setPurpose(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      purpose === opt.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs block leading-tight">
                        {isAr ? opt.titleAr : opt.titleEn}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 line-clamp-2 leading-relaxed ${
                      purpose === opt.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {isAr ? opt.descAr : opt.descEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot & Meeting Format */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isAr ? 'تاريخ الموعد المفضل' : 'Preferred Date'}</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isAr ? 'الفترة الزمنية' : 'Preferred Time Slot'}</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {isAr ? slot.labelAr : slot.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isAr ? 'طريقة الاجتماع' : 'Meeting Format'}</span>
                </label>
                <select
                  value={meetingFormat}
                  onChange={(e) => setMeetingFormat(e.target.value as AppointmentData['meetingFormat'])}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="in_person">
                    {isAr ? 'زيارة ميدانية في المقر (Riyadh)' : 'In-Person Facility Visit (Riyadh)'}
                  </option>
                  <option value="whatsapp_call">
                    {isAr ? 'مكالمة هاتفية / واتساب مباشرة' : 'Direct Phone / WhatsApp Call'}
                  </option>
                  <option value="video_meeting">
                    {isAr ? 'اجتماع مرئي عن بعد' : 'Virtual Video Meeting'}
                  </option>
                </select>
              </div>
            </div>

            {/* Step 3: Requester & Facility Information */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                {isAr ? '2. بيانات المنشأة ومسؤول المشتريات' : '2. Facility & Contact Details'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{isAr ? 'الاسم الكريم' : 'Your Full Name'} *</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isAr ? 'مثال: د. عبد الله الشمري' : 'e.g. Dr. Abdullah / Procurement Lead'}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>{isAr ? 'اسم المستشفى / المجمع الطبي' : 'Facility / Organization'} *</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={isAr ? 'مثال: مجمع العليا الطبي' : 'e.g. King Fahad Hospital / Al Olaya Clinic'}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {isAr ? 'نوع المنشأة' : 'Facility Category'}
                  </label>
                  <select
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value as AppointmentData['facilityType'])}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="clinic">{isAr ? 'مجمع طبي / عيادات' : 'Medical Complex / Polyclinic'}</option>
                    <option value="hospital">{isAr ? 'مستشفى حكومي / خاص' : 'General / Private Hospital'}</option>
                    <option value="laboratory">{isAr ? 'مختبر طبي / مركز أشعة' : 'Diagnostic Lab / Center'}</option>
                    <option value="home">{isAr ? 'رعاية صحية منزلية' : 'Home Healthcare'}</option>
                    <option value="other">{isAr ? 'صيدلية / أخرى' : 'Pharmacy / Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{isAr ? 'رقم الجوال (واتساب)' : 'Mobile Phone (WhatsApp)'} *</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="05XXXXXXXX or +966..."
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>{isAr ? 'المدينة والحي في الرياض' : 'City & District'}</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder={isAr ? 'مثال: الرياض - العليا / السليمانية' : 'e.g. Riyadh - Al Olaya'}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@hospital.sa"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Items of Interest */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                {isAr ? '3. المستلزمات أو الأجهزة المستهدفة في الزيارة' : '3. Targeted Medical Supplies & Equipment'}
              </label>
              <div className="flex flex-wrap gap-2">
                {popularInterests.map((item) => {
                  const active = selectedItems.includes(item.labelEn);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleInterest(item.labelEn)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        active
                          ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes textarea */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-900 block mb-1">
                {isAr ? 'ملاحظات خاصة لممثل المبيعات' : 'Additional Notes for Sales Rep'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'أي متطلبات تسعير خاصة أو عينات ترغبون في إحضارها خلال الزيارة...' : 'Specific quantities, sample requirements, or gate pass instructions...'}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                <span>{isAr ? 'سيتم التوجيه الفوري لمحادثة واتساب الرسمية لممثل المبيعات: ' : 'Direct WhatsApp dispatch to sales rep: '}</span>
                <span className="font-mono font-bold text-emerald-700">{COMPANY_INFO.phones.primaryWhatsApp}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 whitespace-nowrap active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>{isAr ? 'تأكيد الموعد وإرسال عبر واتساب' : 'Schedule Directly via WhatsApp'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
