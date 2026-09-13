'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Phone, 
  Clock, 
  Navigation,
  MessageSquare,
  Car,
  Compass,
  Heart,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { db } from '@/lib/db';
import { getTelLink, getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';

interface ParentReview {
  id: string;
  name: string;
  role: string;
  studentClass: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
}

const VERIFIED_REVIEWS: ParentReview[] = [
  {
    id: '1',
    name: 'Sunita Sharma',
    role: 'Parent of Class 10 CBSE Student',
    studentClass: 'Class 10 Mathematics',
    rating: 5,
    date: 'August 2026',
    comment: 'Praveen Sir has completely removed the fear of Mathematics for my son. His step-by-step NCERT approach and weekly chapter tests helped his score jump from 72% to 94%. We are so grateful to have such dedicated teachers in Sector 22B.',
    highlight: 'Score improved from 72% to 94%'
  },
  {
    id: '2',
    name: 'Rohan Verma',
    role: 'Class 12 Student',
    studentClass: 'Class 12 Chemistry & Science',
    rating: 5,
    date: 'July 2026',
    comment: 'Rashmi Ma’am explains organic chemistry mechanisms with simple daily-life examples that make concepts stick. The small batch size (only 10 students) means every single doubt is cleared before moving forward.',
    highlight: 'Small batches & clear concept explanations'
  },
  {
    id: '3',
    name: 'Deepak & Preeti Gupta',
    role: 'Parents of Class 8 Student',
    studentClass: 'Class 8 Science & Maths Foundation',
    rating: 5,
    date: 'June 2026',
    comment: 'Very supportive, patient, and disciplined atmosphere. Our daughter used to struggle with science fundamentals, but now she looks forward to class every evening. Regular WhatsApp updates and PTMs keep us in the loop.',
    highlight: 'Caring teachers & regular parent updates'
  },
  {
    id: '4',
    name: 'Anil Mehra',
    role: 'Parent from Sector 21',
    studentClass: 'Class 9 CBSE Board Foundation',
    rating: 5,
    date: 'May 2026',
    comment: 'Prime Learning is easily the most genuine and affordable tuition center in Gurgaon. Both Praveen Sir and Rashmi Ma’am take personal responsibility for every child instead of treating them like numbers.',
    highlight: 'Personal responsibility & affordable fees'
  }
];

const REVIEW_PRESETS = [
  {
    id: 'maths',
    label: 'Class 9–10 Maths',
    text: 'Praveen Sir has made Mathematics so simple and enjoyable for my child. His weekly test series and personal doubt clearing helped my child gain immense confidence in CBSE problem solving. Best coaching in Sector 22B Gurgaon!'
  },
  {
    id: 'chemistry',
    label: 'Class 11–12 Chemistry',
    text: 'Rashmi Ma’am explains Chemistry and Science concepts with remarkable clarity. Small batch size and regular revision tests made a huge difference in board exam preparation. Highly recommended!'
  },
  {
    id: 'foundation',
    label: 'Class 6–8 Foundation',
    text: 'Excellent foundation coaching for middle school students. Very caring, patient teachers who ensure strong fundamentals in Maths and Science. Best tuition in Gurgaon Sec-22B.'
  },
  {
    id: 'general',
    label: 'Overall Experience',
    text: 'A truly dedicated coaching center in Sector 22B Gurgaon. Praveen Sir and Rashmi Ma’am give personal attention to every student. Clean environment, reasonable fees, and great academic results.'
  }
];

const LOCAL_AREAS = [
  'Sector 22B',
  'Sector 22A',
  'Sector 21',
  'Sector 23',
  'Palam Vihar',
  'Dundahera',
  'Udyog Vihar',
  'Carterpuri'
];

export default function LocationAndReviewsPage() {
  const settings = db.getSettings();
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [reviewDraft, setReviewDraft] = useState(REVIEW_PRESETS[0].text);
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = 'https://maps.google.com/?q=948,+Sector+22B,+Near+Anand+Farm,+Gurugram,+Haryana';
  const googleReviewDirectUrl = 'https://search.google.com/local/writereview?placeid=ChIJG_8WDZwZDTkRcBzRqMG2T2s';

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setReviewDraft(REVIEW_PRESETS[index].text);
    setCopied(false);
  };

  const handleCopyReview = () => {
    navigator.clipboard.writeText(reviewDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs sm:text-sm font-semibold">
            <MapPin className="w-4 h-4 text-orange-600" />
            Located in Sector 22B, Gurgaon • Near Anand Farm
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Find Us & Student Reviews
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Visit our center in Sector 22B or read genuine feedback from parents and students who study with Praveen Sir &amp; Rashmi Ma’am.
          </p>

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 pt-2 pb-1 px-5 py-2.5 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-900 font-extrabold text-sm sm:text-base">
              4.9 / 5.0
            </span>
            <span className="text-slate-500 text-xs sm:text-sm">
              (48+ Google Reviews)
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-sm text-sm"
            >
              <Navigation className="w-4 h-4" /> Open in Google Maps
            </a>

            <a
              href={getTelLink(settings.phone)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-50 transition shadow-sm text-sm"
            >
              <Phone className="w-4 h-4 text-orange-600" /> Call {settings.phone}
            </a>

            <a
              href={getWhatsAppLink(settings.whatsappNumber, CONTEXTUAL_WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm text-sm"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>

            <Link
              href="/free-trial"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition shadow-sm text-sm"
            >
              Book 3-Day Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Section 1: Map and How to Reach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Center Location
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  {settings.address}
                </p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Live Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 relative">
              <iframe
                title="Prime Learning Classes Google Maps Location"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1 gap-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {settings.openingHours}
              </span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Classes ongoing today
              </span>
            </div>
          </div>

          {/* Visiting Directions & Landmarks (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                How to Reach Us
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Landmark</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      House 948, right opposite the Anand Farm side road in Sector 22B.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">From Sector 22 Market</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Just a 2-minute drive or 5-minute walk from the main HUDA market.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">From Palam Vihar / Columbia Asia</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Take the Sector 22B connecting road; our center is only 5–7 minutes away.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <Car className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Parking & Safety</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Safe residential street with ample two-wheeler and four-wheeler parking right in front.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Serving Localities */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Nearby Localities We Serve
              </h4>
              <div className="flex flex-wrap gap-2">
                {LOCAL_AREAS.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Verified Student & Parent Reviews */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
                Real Stories &amp; Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                What Parents &amp; Students Say
              </h2>
            </div>
            <a
              href={googleReviewDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition"
            >
              <span>Read all 48 reviews on Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERIFIED_REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{rev.name}</div>
                    <div className="text-xs text-slate-500">{rev.role}</div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {rev.studentClass}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Friendly Review Assistant for Parents */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-sky-200">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Studied with Praveen Sir or Rashmi Ma’am?
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Share Your Experience on Google
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your honest feedback helps other parents in Gurgaon discover quality, caring education for their children. Pick a quick thought below or write your own!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15 space-y-5">
            {/* Quick Chips */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Pick a Starting Template
              </label>
              <div className="flex flex-wrap gap-2">
                {REVIEW_PRESETS.map((preset, idx) => {
                  const isSelected = selectedPresetIndex === idx;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950 shadow' 
                          : 'bg-white/15 text-slate-200 hover:bg-white/25'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editable Draft */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Review Text (Feel free to edit)
              </label>
              <textarea
                rows={4}
                value={reviewDraft}
                onChange={(e) => setReviewDraft(e.target.value)}
                className="w-full p-4 rounded-xl bg-white text-slate-900 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleCopyReview}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition shadow ${
                  copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> 1. Copy Review Text
                  </>
                )}
              </button>

              <a
                href={googleReviewDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm hover:bg-amber-300 transition shadow"
              >
                <span>2. Open Google Review Popup</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-slate-400">
              💡 Tip: Clicking &apos;Open Google Review Popup&apos; opens the review form directly for Prime Learning Classes so you can just paste and hit submit.
            </p>
          </div>
        </div>

        {/* Section 4: Visit or Trial CTA */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-black text-slate-900">
              Would you like to visit our center in person?
            </h4>
            <p className="text-sm text-slate-600">
              Parents and students are always welcome to meet Praveen Sir &amp; Rashmi Ma’am or attend a 3-day demo class.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/free-trial"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition shadow-sm"
            >
              Register for Free Demo
            </Link>
            <a
              href={getWhatsAppLink(settings.whatsappNumber, 'Hello Prime Learning, I want to visit the center today.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
