'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QrCode, X, Printer, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Download, ArrowRight } from 'lucide-react';
import { Course, FeePayment } from '@/lib/types';
import { db } from '@/lib/db';

interface FeePaymentModalProps {
  course?: Course;
  studentId?: string;
  studentName?: string;
  studentClass?: string;
  monthlyFee?: number;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
  onSuccess?: (payment: FeePayment) => void;
}

export default function FeePaymentModal({
  course,
  studentId,
  studentName: defaultStudentName = '',
  studentClass: defaultStudentClass = '',
  monthlyFee: defaultMonthlyFee,
  isOpen,
  onClose,
  onPaymentSuccess,
  onSuccess
}: FeePaymentModalProps) {
  const [studentName, setStudentName] = useState(defaultStudentName || '');
  const [parentName, setParentName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'CASH'>('UPI');
  const [upiProvider, setUpiProvider] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'BHIM'>('GPay');
  const [processing, setProcessing] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<FeePayment | null>(null);

  if (!isOpen) return null;

  const targetGrade = course?.grade || defaultStudentClass || 'Class 10';
  const feeAmount = defaultMonthlyFee || (course ? parseInt(course.monthlyFee.replace(/[^0-9]/g, '')) || 3500 : 3500);

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const payment = db.recordPayment({
        studentId: studentId || `std-${Date.now()}`,
        studentName: studentName || 'Student Learner',
        parentName: parentName || 'Parent / Guardian',
        courseTitle: `${targetGrade} ${course?.subject || 'Tuition Fee'}`,
        grade: targetGrade,
        amount: `₹${feeAmount.toLocaleString('en-IN')}`,
        paymentMethod: paymentMethod,
        monthPaidFor: `${new Date().toLocaleString('en-US', { month: 'long' })} ${new Date().getFullYear()}`,
      });

      setProcessing(false);
      setCompletedPayment(payment);
      if (onPaymentSuccess) onPaymentSuccess();
      if (onSuccess) onSuccess(payment);
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-md w-full my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-prime-orange/20 border border-prime-orange flex items-center justify-center text-prime-orange font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-prime-orange uppercase bg-prime-orange/10 px-2 py-0.5 rounded">
                ONLINE FEE PAYMENT
              </span>
              <h2 className="text-base font-extrabold text-white">{targetGrade} • {course?.subject || 'Tuition Fee'}</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: Receipt after success */}
        {completedPayment ? (
          <div className="p-6 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Payment Successful ✅
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">Official Digital Receipt</h3>
              <p className="text-xs text-slate-500">Transaction ID: {completedPayment.transactionId}</p>
            </div>

            {/* Printable Digital Receipt Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 space-y-3 text-left shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <strong className="text-slate-900 block text-sm">PRIME LEARNING CLASSES</strong>
                  <span className="text-[10px] text-slate-500">948, Sec-22B, Gurgaon • +91 98109 89437</span>
                </div>
                <span className="text-[11px] font-black text-prime-orange bg-white px-2 py-1 rounded border border-slate-200">
                  {completedPayment.receiptNo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name</span>
                  <strong className="text-slate-900">{completedPayment.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Parent Name</span>
                  <strong className="text-slate-900">{completedPayment.parentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Course / Batch</span>
                  <strong className="text-slate-900">{completedPayment.courseTitle}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Period Paid</span>
                  <strong className="text-slate-900">{completedPayment.monthPaidFor}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Total Monthly Fee Paid:</span>
                <strong className="text-emerald-700 text-lg font-black">{completedPayment.amount}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center justify-center space-x-2"
              >
                <span>Done</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* View 2: Payment Form & UPI QR */
          <form onSubmit={handlePayNow} className="p-6 space-y-5 text-xs">
            
            {/* Amount Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow">
              <div>
                <span className="text-[10px] text-slate-300 uppercase font-bold">Monthly Fee Amount</span>
                <div className="text-2xl font-black text-prime-orange">
                  {course?.monthlyFee || `₹${feeAmount.toLocaleString('en-IN')} / month`}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold">100% Secure</span>
            </div>

            {/* Student Info Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Mehta"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunil Mehta"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700 uppercase mb-1">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2 font-bold">
                {['UPI', 'CARD', 'CASH'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method as any)}
                    className={`py-2 rounded-xl transition border text-center ${
                      paymentMethod === method
                        ? 'bg-slate-900 text-white border-slate-900 shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI App Options & Simulated QR Box */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
                <div className="text-[11px] font-bold text-emerald-900">Scan & Pay using any UPI App</div>
                
                <div className="flex items-center justify-center space-x-2">
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiProvider(app as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                        upiProvider === app
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                          : 'bg-white text-emerald-900 border-emerald-200'
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 inline-block shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500 mb-1">UPI ID: primelearning@upi</div>
                  <div className="w-32 h-32 bg-slate-900 p-2 rounded-lg mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                      <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="11" y="11" width="14" height="14" rx="2"/>
                      <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="75" y="11" width="14" height="14" rx="2"/>
                      <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="11" y="75" width="14" height="14" rx="2"/>
                      <rect x="40" y="40" width="20" height="20" rx="3" className="text-prime-orange fill-current"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow-lg flex items-center justify-center space-x-2"
            >
              {processing ? (
                <span>Processing UPI Payment...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Online Fee Payment ({course?.monthlyFee || `₹${feeAmount.toLocaleString('en-IN')}`})</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
