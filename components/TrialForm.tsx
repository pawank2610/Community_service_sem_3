'use client';

import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, MessageSquare, Send, Sparkles } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';

interface TrialFormProps {
  initialCourse?: { grade?: string; subject?: string };
  onSuccess?: () => void;
}

export default function TrialForm({ initialCourse, onSuccess }: TrialFormProps) {
  const settings = db.getSettings();
  
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    grade: initialCourse?.grade || 'Class 10',
    subject: initialCourse?.subject || 'Mathematics',
    phone: '',
    whatsapp: '',
    preferredTiming: 'Evening (5:30 PM)',
    preferredTeacher: 'Praveen Gandhi',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      db.addTrial({
        studentName: formData.studentName,
        parentName: formData.parentName,
        grade: formData.grade,
        subject: formData.subject,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        preferredTiming: formData.preferredTiming,
        preferredTeacher: formData.preferredTeacher,
        notes: formData.message,
      });

      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const whatsappMessage = CONTEXTUAL_WA_MESSAGES.freeTrial(formData.grade, formData.subject);
  const whatsappUrl = getWhatsAppLink(settings.whatsappNumber, whatsappMessage);

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-5 max-w-xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Registration Successful
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            Thank you! Your free trial request has been received.
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our team will contact you shortly on <strong>{formData.phone}</strong> to confirm the exact date and timing for your trial class.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-1.5">
          <div><strong>Student:</strong> {formData.studentName} ({formData.grade})</div>
          <div><strong>Subject:</strong> {formData.subject}</div>
          <div><strong>Teacher:</strong> {formData.preferredTeacher}</div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat on WhatsApp Now
          </a>

          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
          >
            Submit Another Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-2xl mx-auto">
      
      {/* Form Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-prime-orange/10 text-prime-orange text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Limited Free Seats Available</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Experience Prime Learning Before You Enrol
        </h2>
        <p className="text-sm text-slate-600">
          Attend a free trial class and experience our teaching approach before making your decision.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Student Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rohan Sharma"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition"
            />
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Parent Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sunil Sharma"
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student Class */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Student Class / Grade *
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition bg-white"
            >
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subject Needed *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition bg-white"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science (Physics & Chemistry)</option>
              <option value="Physics Core">Physics Core (Class 11-12)</option>
              <option value="Combined Math & Science">Combined Math & Science</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              WhatsApp Number
            </label>
            <input
              type="tel"
              placeholder="Same as phone number"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preferred Timing */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Preferred Batch Timing
            </label>
            <select
              value={formData.preferredTiming}
              onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition bg-white"
            >
              <option value="Afternoon (4:00 PM - 5:30 PM)">Afternoon (4:00 PM - 5:30 PM)</option>
              <option value="Evening (5:30 PM - 7:00 PM)">Evening (5:30 PM - 7:00 PM)</option>
              <option value="Late Evening (7:00 PM - 8:30 PM)">Late Evening (7:00 PM - 8:30 PM)</option>
            </select>
          </div>

          {/* Preferred Teacher */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Preferred Teacher
            </label>
            <select
              value={formData.preferredTeacher}
              onChange={(e) => setFormData({ ...formData, preferredTeacher: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition bg-white"
            >
              <option value="Praveen Gandhi">Praveen Gandhi (Mathematics)</option>
              <option value="Rashmi Anand">Rashmi Anand (Science & Primary All Subjects)</option>
              <option value="Any Teacher">Any Available Teacher</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Additional Questions / Notes
          </label>
          <textarea
            rows={2}
            placeholder="Tell us any specific topic or doubt areas..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange focus:border-prime-orange text-sm outline-none transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-extrabold text-base text-white bg-prime-orange hover:bg-prime-orange-hover shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
        >
          <GraduationCap className="w-5 h-5" />
          <span>{loading ? 'Submitting Request...' : 'Register for Free Trial Class'}</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center pt-1">
          🔒 No commitment required. Free trial allows parents & students to experience teaching before enrolling.
        </p>

      </form>
    </div>
  );
}
