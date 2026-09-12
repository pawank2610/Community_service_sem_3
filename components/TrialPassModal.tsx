'use client';

import React from 'react';
import { X, Printer, QrCode, MapPin, Calendar, Clock, User, BookOpen, CheckCircle2 } from 'lucide-react';
import { TrialRegistration } from '@/lib/types';
import { db } from '@/lib/db';

interface TrialPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  trial: TrialRegistration | null;
}

export default function TrialPassModal({ isOpen, onClose, trial }: TrialPassModalProps) {
  if (!isOpen || !trial) return null;

  const settings = db.getSettings();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 bg-slate-100 flex items-center justify-between border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Digital Trial Admission Pass
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print Pass
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Pass Card */}
        <div className="p-6 sm:p-8 space-y-6" id="printable-trial-pass">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{settings.name}</h2>
              <p className="text-xs font-semibold text-blue-600">{settings.tagline}</p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" /> {settings.address}
              </p>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded tracking-wider border border-emerald-300">
                Verified Pass
              </span>
              <p className="text-[10px] font-mono text-slate-400 mt-1">ID: {trial.id.slice(0, 8)}</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center py-1">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Official Demo Class Admit Card
            </span>
            <h3 className="text-2xl font-extrabold text-blue-900">3-DAY FREE TRIAL PASS</h3>
          </div>

          {/* Student & Class Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-bold block">Student Name</span>
              <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-blue-600" /> {trial.studentName}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block">Parent Name</span>
              <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{trial.parentName}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block">Enrolled Grade</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" /> {trial.grade}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block">Subject</span>
              <span className="text-sm font-bold text-indigo-700 mt-0.5 block">{trial.subject}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block">Faculty</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {trial.preferredTeacher || 'Praveen Gandhi & Rashmi Anand'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block">Slot / Timing</span>
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> {trial.preferredTiming || 'Evening Batch'}
              </span>
            </div>
          </div>

          {/* Security & Instructions */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-dashed border-slate-200">
            <div className="space-y-1 text-[11px] text-slate-600">
              <p className="font-bold text-slate-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instructions for Student:
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                <li>Please report 10 minutes prior to scheduled session.</li>
                <li>Bring notebook, pencil box & textbook for assessment.</li>
                <li>Parent orientation with faculty at end of 3rd demo class.</li>
              </ul>
            </div>

            <div className="shrink-0 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">SCAN AT DESK</span>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="text-center pt-2 text-[10px] text-slate-400 border-t border-slate-100">
            Helpline: {settings.phone} • Email: {settings.email}
          </div>
        </div>

      </div>
    </div>
  );
}
