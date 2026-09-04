'use client';

import React from 'react';
import TrialForm from '@/components/TrialForm';
import { db } from '@/lib/db';
import { CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';

export default function FreeTrialPage() {
  const settings = db.getSettings();

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-12">
      
      {/* Page Header */}
      <section className="bg-white py-10 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/10 px-3 py-1 rounded-full">
            No Commitment Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Book Your FREE Trial Class
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Experience Prime Learning&apos;s small batch teaching approach, ask doubts live, and get a feel for our classes.
          </p>
        </div>
      </section>

      {/* Main Trial Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <TrialForm />
          </div>

          {/* Benefits Box (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900">
              What Happens During Your Free Trial?
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-prime-orange/10 text-prime-orange flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  1
                </div>
                <div>
                  <strong className="text-slate-900">Attend a Live Class:</strong> Sit in an actual small-batch class for Class 6 to 12 in Mathematics or Science.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  2
                </div>
                <div>
                  <strong className="text-slate-900">Meet the Faculty:</strong> Interact directly with Praveen Gandhi Sir (Math) or Rashmi Anand Ma&apos;am (Science) and ask any subject doubt.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  3
                </div>
                <div>
                  <strong className="text-slate-900">Parent Guidance:</strong> Parents can tour the center, view study material workbooks, and discuss batch timings.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold space-y-1">
              <div>⚡ {settings.trialSlotsAvailable} Trial Seats Remaining This Week</div>
              <div className="text-[11px] text-amber-800 font-normal">
                Slots are reserved on a first-come, first-served basis to maintain small batch quality.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
