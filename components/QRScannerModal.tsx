'use client';

import React, { useState } from 'react';
import { QrCode, X, CheckCircle2, Camera, KeyRound, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/db';
import { Student } from '@/lib/types';

interface QRScannerModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function QRScannerModal({ student, isOpen, onClose, onSuccess }: QRScannerModalProps) {
  const [activeTab, setActiveTab] = useState<'camera' | 'pin'>('camera');
  const [pinInput, setPinInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ time: string; batch: string } | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setError(null);
    setTimeout(() => {
      const res = db.markQRAttendance(student.id, student.batchId);
      setScanning(false);
      if (res.success && res.record) {
        setSuccessData({
          time: res.record.checkInTime || 'Just now',
          batch: student.batchName,
        });
        onSuccess();
      } else {
        setError(res.message);
      }
    }, 1200);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput || pinInput.length < 6) {
      setError('Please enter a valid 6-digit session PIN.');
      return;
    }
    setError(null);
    setScanning(true);
    setTimeout(() => {
      const res = db.markQRAttendance(student.id, student.batchId, pinInput);
      setScanning(false);
      if (res.success && res.record) {
        setSuccessData({
          time: res.record.checkInTime || 'Just now',
          batch: student.batchName,
        });
        onSuccess();
      } else {
        setError(res.message);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-md w-full my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-prime-orange/20 border border-prime-orange flex items-center justify-center text-prime-orange">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-prime-orange uppercase bg-prime-orange/10 px-2 py-0.5 rounded">
                STUDENT ATTENDANCE SCANNER
              </span>
              <h2 className="text-base font-extrabold text-white">Classroom Check-in</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {successData ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Attendance Marked Present ✅
              </span>
              <h3 className="text-2xl font-black text-slate-900">Verified Check-in!</h3>
              <p className="text-xs text-slate-600">
                You have been marked <strong className="text-emerald-700">Present</strong> for <br />
                <span className="font-bold text-slate-900">{successData.batch}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <strong className="text-slate-900">{student.studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Check-in Time:</span>
                <strong className="text-slate-900">{successData.time}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Method:</span>
                <strong className="text-prime-orange">Automated QR Scan</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-prime-orange transition shadow-lg"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { setActiveTab('camera'); setError(null); }}
                className={`py-2 rounded-lg transition flex items-center justify-center space-x-1.5 ${
                  activeTab === 'camera' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Camera Scanner</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('pin'); setError(null); }}
                className={`py-2 rounded-lg transition flex items-center justify-center space-x-1.5 ${
                  activeTab === 'pin' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Session PIN</span>
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Camera View Finder */}
            {activeTab === 'camera' ? (
              <div className="space-y-4 text-center">
                <div className="relative w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-800 flex items-center justify-center shadow-inner">
                  
                  {/* Viewfinder corners */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-prime-orange rounded-tl" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-prime-orange rounded-tr" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-prime-orange rounded-bl" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-prime-orange rounded-br" />

                  {/* Animated scanning beam */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-prime-orange to-transparent shadow-[0_0_15px_#f97316] animate-pulse" />

                  <div className="space-y-2 p-6 z-10">
                    <QrCode className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
                    <p className="text-xs text-slate-400 font-medium">
                      Point camera at the <strong className="text-white">Classroom QR Screen</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateScan}
                  disabled={scanning}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow-lg flex items-center justify-center space-x-2"
                >
                  {scanning ? (
                    <span>Verifying QR Code...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Scan & Mark Attendance Now</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Session PIN Entry View */
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter 6-Digit Session PIN
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Look at the teacher&apos;s classroom screen for today&apos;s 6-digit PIN.
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="e.g. 849201"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full text-center text-3xl font-black tracking-widest py-3 rounded-2xl border-2 border-slate-300 focus:border-prime-orange outline-none bg-slate-50 text-slate-900"
                />

                <button
                  type="submit"
                  disabled={scanning}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-prime-orange transition shadow-lg flex items-center justify-center space-x-2"
                >
                  {scanning ? (
                    <span>Verifying Session PIN...</span>
                  ) : (
                    <>
                      <span>Submit PIN & Check-in</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automated verification logs your attendance directly in teacher records.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
