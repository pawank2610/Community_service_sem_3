"use client";

import React, { useState } from 'react';
import { X, Calendar, FileText, Send, CheckCircle2, Clock } from 'lucide-react';
import { addLeaveRequest } from '@/lib/db';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  studentClass: string;
  onSubmitted?: () => void;
}

export default function LeaveRequestModal({
  isOpen,
  onClose,
  studentId,
  studentName,
  studentClass,
  onSubmitted
}: LeaveRequestModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [requestMakeup, setRequestMakeup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addLeaveRequest({
        studentId,
        studentName,
        grade: studentClass,
        startDate,
        endDate,
        reason,
        makeupClassRequested: requestMakeup
      });

      setIsSubmitting(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        if (onSubmitted) onSubmitted();
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Apply for Leave & Makeup Class</h3>
              <p className="text-xs text-blue-100">Notify teachers and request makeup schedules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {successMessage ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Leave Request Submitted!</h4>
            <p className="text-sm text-slate-400">
              Your class teacher (Praveen Gandhi / Rashmi Anand) has been notified. You will receive an update regarding your makeup class schedule shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 flex justify-between text-xs text-slate-300">
              <div>
                <span className="text-slate-400">Student:</span> <span className="font-semibold text-white">{studentName}</span>
              </div>
              <div>
                <span className="text-slate-400">Class:</span> <span className="font-semibold text-amber-400">{studentClass}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Reason for Leave *
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Fever / Family Function / School Exams"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3 p-3.5 bg-indigo-950/40 border border-indigo-800/50 rounded-xl">
              <input
                type="checkbox"
                id="requestMakeup"
                checked={requestMakeup}
                onChange={(e) => setRequestMakeup(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 rounded focus:ring-blue-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="requestMakeup" className="text-xs text-slate-200 cursor-pointer">
                <span className="font-semibold text-indigo-300">Request Makeup Class Slot</span>
                <span className="block text-slate-400 text-[11px]">Teacher will assign a extra session on off-days or Sunday.</span>
              </label>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all"
              >
                {isSubmitting ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
