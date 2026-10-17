import React, { useState, useEffect } from 'react';
import { AppointmentData, Language } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppAppointmentUrl, downloadCalendarInvite } from '../utils/whatsapp';
import { X, Calendar, MessageSquare, Download, Trash2, Clock, CheckCircle2 } from 'lucide-react';

interface AppointmentsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AppointmentsHistoryModal: React.FC<AppointmentsHistoryModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vallcare_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch {
      // storage error
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    try {
      localStorage.setItem('vallcare_appointments', JSON.stringify(updated));
    } catch {
      // storage
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 border border-slate-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'سجل المواعيد المحجوزة' : 'Your Scheduled Appointments'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {isAr ? 'قائمة المواعيد المحفوظة على هذا الجهاز' : 'Track appointments scheduled with Masoom Akhtar Khan'}
            </p>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">
              {isAr ? 'لا توجد مواعيد مسجلة حالياً' : 'No appointments scheduled yet'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {isAr ? 'قم بحجز موعد ميداني ليظهر هنا في السجل.' : 'Book a procurement visit to view it here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {apt.organization}
                    </span>
                    <span className="text-slate-500">
                      {apt.fullName} · {apt.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700 font-mono text-[11px]">
                  <span>📅 {apt.date}</span>
                  <span>⏰ {apt.timeSlot}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppAppointmentUrl(apt)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{isAr ? 'فتح المحادثة' : 'Re-open Chat'}</span>
                    </a>
                    <button
                      onClick={() => downloadCalendarInvite(apt)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>.ics</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(apt.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
