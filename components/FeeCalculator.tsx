'use client';

import React, { useState } from 'react';
import { 
  Calculator, IndianRupee, Sparkles, CheckCircle2, 
  MessageSquare, Percent, GraduationCap, ShieldCheck, ArrowRight
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';
import { db } from '@/lib/db';

interface FeeCalculatorProps {
  onBookTrial?: () => void;
  onPayFee?: () => void;
}

export default function FeeCalculator({ onBookTrial, onPayFee }: FeeCalculatorProps) {
  const settings = db.getSettings();
  const [gradeGroup, setGradeGroup] = useState<'primary' | 'middle' | 'secondary' | 'senior'>('secondary');
  const [subjectChoice, setSubjectChoice] = useState<'single' | 'combo' | 'all'>('combo');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  
  // Concession checkboxes
  const [isSibling, setIsSibling] = useState(false);
  const [isMerit, setIsMerit] = useState(false);
  const [isGirlChild, setIsGirlChild] = useState(false);

  // Base pricing matrix
  const getBaseMonthlyFee = () => {
    switch (gradeGroup) {
      case 'primary': // Class 1 - 5
        return subjectChoice === 'single' ? 1800 : 2500;
      case 'middle': // Class 6 - 8
        return subjectChoice === 'single' ? 2200 : 3500;
      case 'secondary': // Class 9 - 10
        return subjectChoice === 'single' ? 2800 : 4500;
      case 'senior': // Class 11 - 12
        return subjectChoice === 'single' ? 3200 : 5500;
      default:
        return 4500;
    }
  };

  const baseMonthly = getBaseMonthlyFee();

  // Compute discount percentages
  let discountPercent = 0;
  if (billingCycle === 'quarterly') discountPercent += 5;
  if (billingCycle === 'annual') discountPercent += 12;
  if (isSibling) discountPercent += 15;
  if (isMerit) discountPercent += 10;
  if (isGirlChild) discountPercent += 10;

  // Cap maximum discount at 35%
  const finalDiscountPercent = Math.min(35, discountPercent);

  const discountedMonthly = Math.round(baseMonthly * (1 - finalDiscountPercent / 100));
  const monthsInCycle = billingCycle === 'monthly' ? 1 : billingCycle === 'quarterly' ? 3 : 12;
  const cycleTotal = discountedMonthly * monthsInCycle;
  const annualStandard = baseMonthly * 12;
  const annualDiscounted = discountedMonthly * 12;
  const annualSavings = annualStandard - annualDiscounted;

  const getGradeLabel = () => {
    switch (gradeGroup) {
      case 'primary': return 'Class 1st to 5th (Primary)';
      case 'middle': return 'Class 6th to 8th (Middle)';
      case 'secondary': return 'Class 9th & 10th (CBSE Boards)';
      case 'senior': return 'Class 11th & 12th (Maths / Chemistry)';
    }
  };

  const getSubjectLabel = () => {
    switch (subjectChoice) {
      case 'single': return 'Single Subject (Maths or Science)';
      case 'combo': return 'Combo Special (Maths + Science)';
      case 'all': return 'All Subjects Comprehensive';
    }
  };

  const quoteMessage = `Hello Prime Learning Classes! I used your online Fee Calculator for:\n- Grade: ${getGradeLabel()}\n- Package: ${getSubjectLabel()}\n- Billing: ${billingCycle.toUpperCase()} (${finalDiscountPercent}% discount applied)\n- Effective Monthly Fee: ₹${discountedMonthly.toLocaleString('en-IN')}\n\nI want to lock in this fee quote and schedule a FREE 3-Day Demo Class!`;
  const quoteWhatsAppUrl = getWhatsAppLink(settings.whatsappNumber, quoteMessage);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700/60 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-prime-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 bg-amber-400/15 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Fee Estimator & Scholarship Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Transparent Tuition Fee Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Select your child's class and subjects to calculate exact fees, combo savings, and family concessions in real-time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center space-x-2 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div className="text-xs">
              <div className="font-bold text-white">Zero Admission Fee</div>
              <div className="text-[10px] text-slate-400">100% Free Study Materials</div>
            </div>
          </div>
        </div>

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Configuration (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Grade Group */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Academic Grade
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'primary', label: 'Class 1 - 5', sub: 'Foundation' },
                  { id: 'middle', label: 'Class 6 - 8', sub: 'Middle School' },
                  { id: 'secondary', label: 'Class 9 - 10', sub: 'CBSE Boards' },
                  { id: 'senior', label: 'Class 11 - 12', sub: 'Senior Sec' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGradeGroup(item.id as any)}
                    className={`p-3 rounded-2xl text-left border transition ${
                      gradeGroup === item.id
                        ? 'bg-prime-orange border-prime-orange text-white shadow-md shadow-prime-orange/30'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-black text-xs sm:text-sm">{item.label}</div>
                    <div className="text-[10px] opacity-80">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Subject Package */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                2. Select Subject Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSubjectChoice('single')}
                  className={`p-3 rounded-2xl text-left border transition ${
                    subjectChoice === 'single'
                      ? 'bg-prime-orange border-prime-orange text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Single Subject Only</div>
                  <div className="text-[10px] text-slate-300">Either Mathematics or Science</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSubjectChoice('combo')}
                  className={`p-3 rounded-2xl text-left border relative transition ${
                    subjectChoice === 'combo'
                      ? 'bg-prime-orange border-prime-orange text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="absolute -top-2 right-3 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </span>
                  <div className="font-bold text-xs sm:text-sm">Maths + Science Combo</div>
                  <div className="text-[10px] text-slate-300">Save ₹1,100/mo vs individual</div>
                </button>
              </div>
            </div>

            {/* Step 3: Billing Cycle */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                3. Payment Plan Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'monthly', label: 'Monthly', perk: 'Standard' },
                  { id: 'quarterly', label: 'Quarterly', perk: 'Save 5%' },
                  { id: 'annual', label: 'Full Year', perk: 'Save 12%' },
                ].map(cycle => (
                  <button
                    key={cycle.id}
                    type="button"
                    onClick={() => setBillingCycle(cycle.id as any)}
                    className={`p-3 rounded-2xl text-center border transition ${
                      billingCycle === cycle.id
                        ? 'bg-white text-slate-950 font-black shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{cycle.label}</div>
                    <div className={`text-[10px] font-semibold ${billingCycle === cycle.id ? 'text-prime-orange' : 'text-amber-400'}`}>
                      {cycle.perk}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Special Concessions */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                4. Community & Merit Concessions (Stackable)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className={`p-3 rounded-2xl border flex items-center space-x-2.5 cursor-pointer transition ${
                  isSibling ? 'bg-amber-400/20 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={isSibling}
                    onChange={(e) => setIsSibling(e.target.checked)}
                    className="rounded text-prime-orange focus:ring-0"
                  />
                  <div className="text-xs leading-tight">
                    <div className="font-bold">Sibling Discount</div>
                    <div className="text-[10px] text-amber-300 font-semibold">15% Waiver</div>
                  </div>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center space-x-2.5 cursor-pointer transition ${
                  isMerit ? 'bg-amber-400/20 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={isMerit}
                    onChange={(e) => setIsMerit(e.target.checked)}
                    className="rounded text-prime-orange focus:ring-0"
                  />
                  <div className="text-xs leading-tight">
                    <div className="font-bold">Merit Scholarship</div>
                    <div className="text-[10px] text-amber-300 font-semibold">10% (&gt;90% Score)</div>
                  </div>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center space-x-2.5 cursor-pointer transition ${
                  isGirlChild ? 'bg-amber-400/20 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={isGirlChild}
                    onChange={(e) => setIsGirlChild(e.target.checked)}
                    className="rounded text-prime-orange focus:ring-0"
                  />
                  <div className="text-xs leading-tight">
                    <div className="font-bold">Girl Child Incentive</div>
                    <div className="text-[10px] text-amber-300 font-semibold">10% Off</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Live Breakdown Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Custom Quotation
                </span>
                {finalDiscountPercent > 0 && (
                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {finalDiscountPercent}% Total Savings
                  </span>
                )}
              </div>

              {/* Price Display */}
              <div className="pt-4 text-center">
                <div className="text-xs font-semibold text-slate-500 mb-1">
                  Effective Monthly Tuition Fee
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {finalDiscountPercent > 0 && (
                    <span className="text-lg font-bold text-slate-400 line-through">
                      ₹{baseMonthly.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    ₹{discountedMonthly.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-slate-500 self-end mb-2">/ month</span>
                </div>

                {billingCycle !== 'monthly' && (
                  <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl inline-block border border-emerald-200">
                    Pay ₹{cycleTotal.toLocaleString('en-IN')} for {monthsInCycle} Months
                  </div>
                )}
              </div>

              {/* Fee Spec Breakdown */}
              <div className="mt-6 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>Standard Base Rate:</span>
                  <span className="font-semibold text-slate-900">₹{baseMonthly} / mo</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>Batch Capacity:</span>
                  <span className="font-semibold text-slate-900">Max 15 Students</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>Weekly Test Series:</span>
                  <span className="font-semibold text-emerald-600">Free (Included)</span>
                </div>
                <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>24/7 AI Doubt Solver:</span>
                  <span className="font-semibold text-emerald-600">Free (Included)</span>
                </div>

                {annualSavings > 0 && (
                  <div className="flex justify-between text-emerald-800 bg-emerald-50 p-2.5 rounded-xl font-bold">
                    <span>Annual Family Savings:</span>
                    <span>₹{annualSavings.toLocaleString('en-IN')} / year</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={quoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lock Fee via WhatsApp</span>
              </a>

              <button
                onClick={onBookTrial}
                className="w-full py-3 px-4 rounded-2xl font-black text-xs text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Book 3-Day Free Demo Pass</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
