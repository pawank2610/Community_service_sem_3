'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, Printer, ShieldCheck, QrCode, Phone, Calendar, 
  MapPin, CheckCircle2, Download, User, Sparkles
} from 'lucide-react';
import { StudentIdCard } from '@/lib/types';
import { db, getStudentIdCard } from '@/lib/db';

interface StudentIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
}

export default function StudentIDCardModal({
  isOpen,
  onClose,
  studentId = 'std-1',
}: StudentIDCardModalProps) {
  const [viewSide, setViewSide] = useState<'both' | 'front' | 'back'>('both');
  const cardData = getStudentIdCard(studentId);
  const settings = db.getSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-prime-orange text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/20 px-2 py-0.5 rounded uppercase tracking-wider">
                Official Digital Credential
              </span>
              <h2 className="text-lg font-black text-white mt-0.5">
                Student Identity Pass & Card
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print ID Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 ml-2">Preview Mode:</span>
            <div className="flex rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
              {(['both', 'front', 'back'] as const).map(side => (
                <button
                  key={side}
                  onClick={() => setViewSide(side)}
                  className={`px-3 py-1 rounded-lg transition capitalize ${
                    viewSide === side ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {side === 'both' ? 'Both Sides' : `${side} Only`}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
            
            {/* FRONT OF ID CARD */}
            {(viewSide === 'both' || viewSide === 'front') && (
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-700/60 overflow-hidden flex flex-col justify-between min-h-[380px]">
                
                {/* Background decorative watermark */}
                <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-prime-orange/10 blur-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-prime-orange via-amber-400 to-prime-orange" />

                {/* Card Top */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-prime-orange flex items-center justify-center font-black text-white text-sm shadow">
                      PLC
                    </div>
                    <div>
                      <div className="font-black text-sm tracking-wide text-white leading-tight">
                        PRIME LEARNING
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold">
                        Sec-22B, Gurugram • Estd. 2014
                      </div>
                    </div>
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-wider bg-prime-orange/20 text-prime-orange px-2 py-0.5 rounded border border-prime-orange/30">
                    STUDENT PASS
                  </span>
                </div>

                {/* Card Middle: Photo & Details */}
                <div className="py-4 flex items-center space-x-4">
                  <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-prime-orange/40 flex flex-col items-center justify-center text-white shadow-inner shrink-0 overflow-hidden">
                    <User className="w-10 h-10 text-slate-300" />
                    <span className="text-[9px] font-black mt-1 text-prime-orange bg-black/40 px-1.5 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-lg font-black text-white leading-tight">
                      {cardData.studentName}
                    </div>
                    <div className="text-xs text-amber-400 font-bold">
                      {cardData.grade} • {cardData.batchName}
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[10px] text-slate-300">
                      <div>
                        <span className="text-slate-500 block">Roll Number:</span>
                        <span className="font-mono font-bold text-white">{cardData.rollNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Blood Group:</span>
                        <span className="font-bold text-white">{cardData.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Validity & Signatures */}
                <div className="pt-3 border-t border-white/10 flex items-end justify-between text-[9px] text-slate-400">
                  <div>
                    <span className="block text-slate-500">Valid Session:</span>
                    <span className="font-bold text-white">2026 - 2027</span>
                  </div>

                  <div className="text-right">
                    <div className="font-serif italic text-[11px] text-amber-300 font-bold">
                      Praveen Gandhi
                    </div>
                    <span className="block text-slate-500 text-[8px] uppercase tracking-wider">
                      Authorized Signatory
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* BACK OF ID CARD */}
            {(viewSide === 'both' || viewSide === 'back') && (
              <div className="relative bg-white text-slate-900 rounded-3xl p-6 shadow-xl border-2 border-slate-200 overflow-hidden flex flex-col justify-between min-h-[380px]">
                
                {/* Card Top */}
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Institutional Details & QR Check-In
                  </div>
                </div>

                {/* Card Middle: Emergency & QR Code */}
                <div className="py-2 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                    {/* Visual QR pattern simulation */}
                    <div className="w-24 h-24 bg-slate-900 text-white p-2 rounded-xl flex flex-col items-center justify-center">
                      <QrCode className="w-16 h-16 text-white" />
                      <span className="text-[8px] font-mono mt-0.5 text-slate-300">SCAN PASS</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-800">
                      Emergency Parent Contact:
                    </div>
                    <div className="font-mono text-xs font-black text-prime-orange">
                      {cardData.emergencyPhone}
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-400 max-w-xs leading-relaxed">
                    This pass is strictly non-transferable. Must be presented upon entry for QR attendance and offline board test sessions.
                  </p>
                </div>

                {/* Card Bottom: Address */}
                <div className="pt-2 border-t border-slate-100 text-center text-[9px] text-slate-500 space-y-0.5">
                  <div className="font-bold text-slate-700">Prime Learning Classes</div>
                  <div>948, Sec-22B, Near Anand Farm, Gurugram • Helpline: {settings.phone}</div>
                </div>

              </div>
            )}

          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">PVC Card Print Instructions:</span> Use standard 85.6mm × 53.98mm plastic card or 300 GSM photo paper. Click the <strong>Print ID Card</strong> button to output the front and reverse sides.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Student ID: <strong className="font-mono text-slate-900">{cardData.rollNo}</strong>
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-prime-orange hover:bg-prime-orange-hover shadow transition flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Badge</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
