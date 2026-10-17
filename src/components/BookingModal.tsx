import React, { useState } from 'react';
import { AppointmentData, AppointmentPurpose, Language } from '../types';
import { COMPANY_INFO, PURPOSE_OPTIONS } from '../data/companyData';
import { getWhatsAppAppointmentUrl, downloadCalendarInvite } from '../utils/whatsapp';
import { 
  X, 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Download, 
  Briefcase 
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialPurpose?: AppointmentPurpose;
  initialItemName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  language,
  initialPurpose = 'procurement',
  initialItemName,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const [purpose, setPurpose] = useState<AppointmentPurpose>(initialPurpose);
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [facilityType, setFacilityType] = useState<AppointmentData['facilityType']>('clinic');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [district, setDistrict] = useState('Al Olaya');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [meetingFormat, setMeetingFormat] = useState<AppointmentData['meetingFormat']>('in_person');
  const [notes, setNotes] = useState(initialItemName ? `Inquiry regarding: ${initialItemName}` : '');
  const [bookedRecord, setBookedRecord] = useState<AppointmentData | null>(null);

  const timeSlots = [
    { id: '09:00 AM - 11:00 AM', labelEn: 'Morning (09:00 AM - 11:00 AM)', labelAr: 'صباحاً (09:00 ص - 11:00 ص)' },
    { id: '11:00 AM - 01:00 PM', labelEn: 'Late Morning (11:00 AM - 01:00 PM)', labelAr: 'ظهراً (11:00 ص - 01:00 م)' },
    { id: '01:30 PM - 03:30 PM', labelEn: 'Afternoon (01:30 PM - 03:30 PM)', labelAr: 'بعد الظهر (01:30 م - 03:30 م)' },
    { id: '04:00 PM - 06:00 PM', labelEn: 'Late Afternoon (04:00 PM - 06:00 PM)', labelAr: 'عصراً (04:00 م - 06:00 م)' },
    { id: '06:30 PM - 08:30 PM', labelEn: 'Evening (06:30 PM - 08:30 PM)', labelAr: 'مساءً (06:30 م - 08:30 م)' },
  ];

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
      requestedItems: initialItemName ? [initialItemName] : undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed_whatsapp',
    };

    try {
      const existingStr = localStorage.getItem('vallcare_appointments');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('vallcare_appointments', JSON.stringify([appointment, ...existing]));
    } catch {
      // storage
    }

    setBookedRecord(appointment);
    const waUrl = getWhatsAppAppointmentUrl(appointment);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {bookedRecord ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {isAr ? 'تم فتح تطبيق واتساب وإرسال الموعد!' : 'Appointment Dispatched to WhatsApp!'}
            </h3>
            
            <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
              {isAr
                ? `تم تجهيز نص الموعد الرسمي وإرساله إلى ممثل المبيعات معصوم أختار خان (${COMPANY_INFO.phones.primaryWhatsApp}).`
                : `Your appointment request for ${bookedRecord.date} (${bookedRecord.timeSlot}) has been routed to Masoom Akhtar Khan (${COMPANY_INFO.phones.primaryWhatsApp}).`}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => downloadCalendarInvite(bookedRecord)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'حفظ في تقويم الهاتف (.ics)' : 'Add to Calendar (.ics)'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                {isAr ? 'جدولة موعد مباشر' : 'Fast-Track Scheduling'}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {isAr ? 'طلب موعد زيارة مع ممثل مبيعات وادي الرعاية' : 'Book Appointment with Masoom Akhtar Khan'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {COMPANY_INFO.nameEn} · {COMPANY_INFO.nameAr}
              </p>
            </div>

            {/* Purpose selection */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1.5">
                {isAr ? 'الغرض من الموعد' : 'Meeting Purpose'}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as AppointmentPurpose)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              >
                {PURPOSE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isAr ? opt.titleAr : opt.titleEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isAr ? 'التاريخ المفضل' : 'Preferred Date'}</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isAr ? 'الوقت المفضل' : 'Preferred Slot'}</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {isAr ? slot.labelAr : slot.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Requester Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {isAr ? 'الاسم الكريم' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. / Procurement Head"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {isAr ? 'اسم المستشفى / المركز الطبي' : 'Facility / Hospital Name'} *
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Al Olaya Medical Complex"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {isAr ? 'رقم الجوال (واتساب)' : 'Phone Number (WhatsApp)'} *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05XXXXXXXX"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {isAr ? 'طريقة الاجتماع' : 'Meeting Format'}
                </label>
                <select
                  value={meetingFormat}
                  onChange={(e) => setMeetingFormat(e.target.value as AppointmentData['meetingFormat'])}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  <option value="in_person">{isAr ? 'زيارة ميدانية بالمقر (Riyadh)' : 'In-Person Facility Visit'}</option>
                  <option value="whatsapp_call">{isAr ? 'مكالمة واتساب مباشرة' : 'Direct Phone/WhatsApp Call'}</option>
                  <option value="video_meeting">{isAr ? 'اجتماع مرئي عن بعد' : 'Virtual Video Meeting'}</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                {isAr ? 'ملاحظات إضافية أو أصناف مطلوبة' : 'Notes / Required Items'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'أصناف، كميات، أو تفاصيل...' : 'Specific sizes, sample units, or directions...'}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>{isAr ? 'تأكيد الموعد وفتح واتساب الآن' : 'Confirm & Launch Direct WhatsApp'}</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                {isAr
                  ? 'سيتم تحويلك فوراً إلى محادثة واتساب الرسمية مع تفاصيل الموعد مجهزة للإرسال.'
                  : 'You will be redirected to WhatsApp with your pre-formatted appointment booking.'}
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
