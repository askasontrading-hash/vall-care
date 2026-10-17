import { AppointmentData, InquiryItem } from '../types';
import { COMPANY_INFO, PURPOSE_OPTIONS } from '../data/companyData';

export function getWhatsAppAppointmentUrl(appointment: AppointmentData): string {
  const purposeObj = PURPOSE_OPTIONS.find((p) => p.id === appointment.purpose);
  const purposeTitleEn = purposeObj ? purposeObj.titleEn : appointment.purpose;
  const purposeTitleAr = purposeObj ? purposeObj.titleAr : appointment.purpose;

  const message = `
*🏥 VALL CARE Trade | طلب حجز موعد جديد*
*Appointment Booking Request*

👤 *الاسم / Requester:* ${appointment.fullName}
🏢 *الجهة / Facility:* ${appointment.organization} (${appointment.facilityType.toUpperCase()})
📍 *المدينة والحي / Location:* ${appointment.city}${appointment.district ? ' - ' + appointment.district : ''}
📞 *رقم الاتصال / Phone:* ${appointment.phoneNumber}
${appointment.email ? `✉️ *البريد / Email:* ${appointment.email}\n` : ''}
🗓️ *التاريخ المحدد / Date:* ${appointment.date}
⏰ *الوقت / Time Slot:* ${appointment.timeSlot}
🤝 *نوع اللقاء / Meeting Type:* ${
    appointment.meetingFormat === 'in_person'
      ? 'زيارة ميدانية في المقر (In-Person Visit)'
      : appointment.meetingFormat === 'whatsapp_call'
      ? 'مكالمة هاتفية / واتساب (Phone/WhatsApp Call)'
      : 'اجتماع مرئي عن بعد (Virtual Video Meeting)'
  }

📋 *الغرض من الموعد / Purpose:*
${purposeTitleAr}
(${purposeTitleEn})

${
  appointment.requestedItems && appointment.requestedItems.length > 0
    ? `📦 *المستلزمات المطلوبة / Items of Interest:*\n- ${appointment.requestedItems.join('\n- ')}\n`
    : ''
}
${appointment.notes ? `📝 *ملاحظات إضافية / Notes:* ${appointment.notes}\n` : ''}
---
*مرسل عبر البوابة الإلكترونية لمؤسسة وادي الرعاية للتجارة*
*Sent via VALL CARE Trade Digital Portal*
(الممثل: ${COMPANY_INFO.salesRep.nameAr} - ${COMPANY_INFO.salesRep.nameEn})
`.trim();

  return `https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppInquiryUrl(items: InquiryItem[], customerName?: string, facilityName?: string): string {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.nameAr}* (${item.product.nameEn})
   • الكمية: ${item.quantity} | الماركة: ${item.product.brand}
   • التغليف: ${item.product.packagingAr}`
    )
    .join('\n\n');

  const message = `
*🏥 VALL CARE Trade | طلب عرض سعر وتوريد*
*Quotation & RFQ Request*

${customerName ? `👤 *العميل / Client:* ${customerName}\n` : ''}${facilityName ? `🏢 *المنشأة / Facility:* ${facilityName}\n` : ''}
السلام عليكم أ. معصوم أختار خان،
نود طلب عرض سعر رسمي وتأكيد توفر الكميات للمستلزمات والمعدات الطبية التالية:

${itemsText}

يرجى إفادتنا بأفضل الأسعار المتاحة وتاريخ التسليم في الرياض.
شاكرين لكم،
---
*VALL CARE Trade - مؤسسة وادي الرعاية للتجارة*
`.trim();

  return `https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppQuickChatUrl(preset: 'quote' | 'visit' | 'sample' | 'general'): string {
  let message = '';
  switch (preset) {
    case 'quote':
      message = 'مرحباً أ. معصوم أختار خان (VALL CARE Trade)، أود الاستفسار عن عروض أسعار المستلزمات الطبية وتوفرها.';
      break;
    case 'visit':
      message = 'السلام عليكم، نود التنسيق لزيارة مندوب مبيعات وادي الرعاية إلى مجمعنا الطبي / المستشفى لمناقشة التوريد.';
      break;
    case 'sample':
      message = 'مرحباً، نرغب في طلب عينات فحص وتجربة للمستهلكات الطبية (قفازات / كانيولا / سرنجات / ضمادات) للاعتماد في منشأتنا.';
      break;
    default:
      message = 'السلام عليكم ورحمة الله، أتواصل معكم بخصوص منتجات مؤسسة وادي الرعاية الطبية للتجارة.';
      break;
  }
  return `https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}?text=${encodeURIComponent(message)}`;
}

export function downloadVCard(): void {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${COMPANY_INFO.salesRep.nameEn} (VALL CARE Trade)
N;CHARSET=UTF-8:Khan;Masoom;Akhtar;;
ORG;CHARSET=UTF-8:VALL CARE Trade - مؤسسة وادي الرعاية للتجارة
TITLE;CHARSET=UTF-8:${COMPANY_INFO.salesRep.titleEn} - ممثل مبيعات
TEL;TYPE=CELL,VOICE,PREF:+966510950568
TEL;TYPE=WORK,VOICE:+966510424236
EMAIL;TYPE=PREF,INTERNET:${COMPANY_INFO.email}
ADR;TYPE=WORK,PREF:;;3155 Abdulaziz Ibn Musaid Ibn Jalawi St, Al Olaya;Riyadh;;12611;Saudi Arabia
NOTE;CHARSET=UTF-8:Medical Supplies, Medical Equipment & Home Care Supplies. Brands: Riester Germany, DETECTO USA, BariQ 2030, KBM HK.
URL:https://wa.me/${COMPANY_INFO.phones.primaryWhatsAppClean}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Masoom_Akhtar_Khan_VallCare.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCalendarInvite(appointment: AppointmentData): void {
  // Format date and time into basic ICS format
  // assuming appointment.date is YYYY-MM-DD
  const cleanDate = appointment.date.replace(/-/g, '');
  const startTime = '090000';
  const endTime = '100000';

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VALL CARE Trade//Appointment Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${appointment.id}@vallcare.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${cleanDate}T${startTime}
DTEND:${cleanDate}T${endTime}
SUMMARY:VALL CARE Meeting with ${COMPANY_INFO.salesRep.nameEn}
DESCRIPTION:Meeting regarding ${appointment.purpose} for ${appointment.organization}. Contact: ${COMPANY_INFO.salesRep.nameEn} (${COMPANY_INFO.phones.primaryWhatsApp}).
LOCATION:3155 Abdulaziz Ibn Musaid Ibn Jalawi St, Al Olaya, Riyadh 12611 / Client Facility
STATUS:CONFIRMED
ORGANIZER;CN="Masoom Akhtar Khan":mailto:${COMPANY_INFO.email}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `VALL_CARE_Appointment_${appointment.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
