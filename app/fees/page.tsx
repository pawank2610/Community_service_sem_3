'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IndianRupee, Clock, Calendar, Users, GraduationCap, MessageSquare, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/db';
import EnquiryModal from '@/components/EnquiryModal';
import TrialForm from '@/components/TrialForm';
import { getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';

export default function FeesPage() {
  const settings = db.getSettings();
  const courses = db.getCourses();
  const batches = db.getBatches();

  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <div className="py-12 bg-white space-y-12">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-prime-orange-light/50 to-white py-12 border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/10 px-3 py-1 rounded-full">
            Transparent Structure
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Fees & Batch Timings
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Affordable, transparent monthly fee schedule with no hidden charges. All course plans include personal doubt-clearing and study material.
          </p>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Batch Fee Overview Table</h2>
              <p className="text-xs text-slate-400">Classes taught in small batches of maximum 15 students</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setTrialModalOpen(true)}
                className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow"
              >
                Book Free Trial
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-xs border-b border-slate-200">
                <tr>
                  <th className="p-4">Class / Grade</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Days & Timing</th>
                  <th className="p-4">Monthly Fee</th>
                  <th className="p-4">Batch Capacity</th>
                  <th className="p-4">Faculty</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {courses.map((course, idx) => (
                  <tr key={course.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 font-bold text-slate-900">{course.grade}</td>
                    <td className="p-4 text-prime-orange font-bold">{course.subject}</td>
                    <td className="p-4">{course.batchTiming}</td>
                    <td className="p-4 font-black text-slate-900 text-base">{course.monthlyFee}</td>
                    <td className="p-4">Max 15 Students ({course.availableSeats} Seats Left)</td>
                    <td className="p-4 font-semibold">
                      {course.subject.includes('Math') ? 'Praveen Gandhi' : 'Rashmi Anand'}
                    </td>
                    <td className="p-4 flex items-center space-x-2">
                      <button
                        onClick={() => setTrialModalOpen(true)}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-prime-orange hover:bg-prime-orange-hover shadow-sm"
                      >
                        Book Trial
                      </button>
                      <a
                        href={getWhatsAppLink(settings.whatsappNumber, CONTEXTUAL_WA_MESSAGES.feeEnquiry(course.grade))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
                      >
                        Enquire
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Feature Bullet Points */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-slate-900">No Hidden Costs</h4>
            <p className="text-slate-600">Monthly fees cover all classroom teaching, regular chapter test series, and formula workbooks.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-slate-900">No Long Commitments</h4>
            <p className="text-slate-600">Fees are paid on a monthly basis so parents can evaluate progress comfortably every month.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-slate-900">Free Trial First</h4>
            <p className="text-slate-600">Attend a trial class completely free before making any fee payment decision.</p>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={enquiryModalOpen} onClose={() => setEnquiryModalOpen(false)} />

      {trialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
            <TrialForm onSuccess={() => setTimeout(() => setTrialModalOpen(false), 4000)} />
          </div>
        </div>
      )}

    </div>
  );
}
