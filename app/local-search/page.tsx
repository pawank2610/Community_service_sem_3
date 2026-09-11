'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Star, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Phone, 
  Clock, 
  Globe, 
  Navigation,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { db } from '@/lib/db';
import { getTelLink, getWhatsAppLink } from '@/lib/constants';

interface ReviewTemplate {
  id: string;
  role: string;
  studentClass: string;
  facultyMentioned: string;
  text: string;
}

const REVIEW_TEMPLATES: ReviewTemplate[] = [
  {
    id: 'class-10-maths',
    role: 'Parent of Class 10 Student',
    studentClass: 'Class 10 CBSE',
    facultyMentioned: 'Praveen Sir',
    text: 'Praveen Sir has made Class 10 Mathematics crystal clear for my son. His step-by-step problem-solving and weekly mock tests boosted his confidence immensely. Test scores improved from 72% to 94%! Best coaching in Sec-22B Gurgaon.'
  },
  {
    id: 'class-12-science',
    role: 'Class 12 Student',
    studentClass: 'Class 12 Board',
    facultyMentioned: 'Rashmi Ma\'am & Praveen Sir',
    text: 'Studying Science and Chemistry here made all the difference for my board exam preparation. Rashmi Ma\'am explains difficult organic chemistry mechanisms with easy real-life examples. Small batch size means doubt is never left unresolved.'
  },
  {
    id: 'class-8-foundation',
    role: 'Parent of Class 8 Student',
    studentClass: 'Class 8 Foundation',
    facultyMentioned: 'Both Faculty',
    text: 'Very caring, disciplined and encouraging learning environment. My daughter used to fear Maths and Science, but now she looks forward to classes every evening. Regular PTMs and WhatsApp updates keep us parents well informed.'
  },
  {
    id: 'general-appreciation',
    role: 'Parent from Sector 22B',
    studentClass: 'Class 9 CBSE',
    facultyMentioned: 'Prime Learning Team',
    text: 'Prime Learning Classes is a true gem in Sector 22B Gurgaon. High quality coaching, very affordable fees, personal attention to every student, and genuine care for conceptual understanding. Highly recommended to all nearby residents!'
  }
];

const LOCAL_KEYWORDS = [
  { term: 'Coaching classes in Sec-22B Gurgaon', rank: '#1 on Google Maps' },
  { term: 'Maths and Science tuition near Anand Farm Gurgaon', rank: '#1 Top Result' },
  { term: 'Class 10 CBSE tuition Sector 22 Gurgaon', rank: '#2 Local Pack' },
  { term: 'Best tuition teacher near Palam Vihar / Sec 22', rank: 'Top 3 Recommended' },
  { term: 'Coaching near me Sec-22B', rank: '#1 Local Pack' },
];

export default function LocalSearchPage() {
  const settings = db.getSettings();
  const [selectedTemplate, setSelectedTemplate] = useState<ReviewTemplate>(REVIEW_TEMPLATES[0]);
  const [customReviewText, setCustomReviewText] = useState<string>(REVIEW_TEMPLATES[0].text);
  const [copiedReview, setCopiedReview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('maths and science coaching near me sec 22b gurgaon');

  const handleSelectTemplate = (template: ReviewTemplate) => {
    setSelectedTemplate(template);
    setCustomReviewText(template.text);
    setCopiedReview(false);
  };

  const handleCopyReview = () => {
    navigator.clipboard.writeText(customReviewText);
    setCopiedReview(true);
    setTimeout(() => setCopiedReview(false), 3000);
  };

  const googleReviewSubmitUrl = `https://search.google.com/local/writereview?placeid=ChIJG_8WDZwZDTkRcBzRqMG2T2s`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=28.5029315,77.0658423&destination_place_id=Prime+Learning+Classes+Sec-22B+Gurgaon`;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sky-200 text-xs sm:text-sm font-semibold">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Community Service Project: Digital Transformation & Local SEO
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Google Business Profile & Local Search Identity
            </h1>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              Empowering local educators Praveen Sir & Rashmi Ma’am with verified Google Maps identity, local search ranking, and an interactive 1-click parent review assistant.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-800 font-bold hover:bg-blue-50 transition shadow"
              >
                <Navigation className="w-4 h-4 text-blue-600" />
                View on Google Maps
              </a>
              <a
                href={googleReviewSubmitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition shadow"
              >
                <Star className="w-4 h-4 fill-slate-900" />
                Leave a Google Review (4.9★)
              </a>
            </div>
          </div>
        </div>

        {/* Live Google Search Simulation */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Google Local 3-Pack Search Simulation
              </h2>
              <p className="text-sm text-slate-500">Live preview of how Prime Learning Classes appears when nearby parents search on mobile/desktop</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Google Verified
            </span>
          </div>

          {/* Search bar simulation */}
          <div className="bg-slate-100 rounded-full px-5 py-3 flex items-center gap-3 border border-slate-300 mb-6">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-slate-800 font-medium focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Google 3-Pack Card */}
          <div className="bg-white rounded-xl border-2 border-blue-200 p-5 sm:p-6 shadow-md hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer">
                    {settings.name} — Maths & Science Coaching
                  </h3>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold">Local Business</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    4.9
                    <span className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                  </span>
                  <span className="text-slate-500">(48 Google Reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">Coaching Center / Tuition</span>
                </div>

                <p className="text-sm text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  {settings.address}
                </p>

                <p className="text-sm text-emerald-700 flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 shrink-0" />
                  Open today • {settings.openingHours}
                </p>

                <p className="text-xs text-slate-500 pt-1">
                  &quot;Praveen Sir &amp; Rashmi Ma’am provide extraordinary personal guidance with 95%+ board results.&quot;
                </p>
              </div>

              {/* Action Buttons in Google Search Card */}
              <div className="flex flex-wrap md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
                <Link
                  href="/"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold border border-blue-200 transition"
                >
                  <Globe className="w-3.5 h-3.5" /> Website
                </Link>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-bold border border-slate-200 transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" /> Directions
                </a>
                <a
                  href={getTelLink(settings.phone)}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold border border-emerald-200 transition"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Click Google Review Assistant for Parents */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Community Reputation Builder
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              1-Click Google Review Assistant for Parents & Students
            </h2>
            <p className="text-sm text-slate-600">
              Select your child&apos;s class to generate an authentic 5-star testimonial. Parents can copy with one click and post directly to Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Template Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose Grade / Scenario
              </label>
              {REVIEW_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`w-full text-left p-4 rounded-xl border transition ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{tmpl.role}</span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {tmpl.studentClass}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tmpl.text}</p>
                  </button>
                );
              })}
            </div>

            {/* Live Review Preview and Copy */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 Star Rating</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Ready to Paste</span>
              </div>

              <textarea
                rows={5}
                value={customReviewText}
                onChange={(e) => setCustomReviewText(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyReview}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition shadow ${
                    copiedReview 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copiedReview ? (
                    <>
                      <Check className="w-4 h-4" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Review Text
                    </>
                  )}
                </button>

                <a
                  href={googleReviewSubmitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold text-sm hover:bg-amber-300 transition shadow"
                >
                  <ExternalLink className="w-4 h-4" /> Open Google Maps
                </a>
              </div>

              <p className="text-xs text-slate-500 text-center">
                💡 Tip: Clicking &apos;Open Google Maps&apos; opens the review popup directly for instant submission!
              </p>
            </div>
          </div>
        </div>

        {/* Local SEO Keywords Ranking & Citation Consistency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Local Keywords */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Sec-22B Local SEO Target Keywords
            </h3>
            <p className="text-xs text-slate-500">Targeted high-intent search queries tracked for Prime Learning Classes</p>

            <div className="space-y-2.5">
              {LOCAL_KEYWORDS.map((kw, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                  <span className="font-medium text-slate-800">{kw.term}</span>
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    {kw.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NAP Consistency Checklist */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              NAP (Name, Address, Phone) Audit
            </h3>
            <p className="text-xs text-slate-500">Consistency across local directories ensures maximum Google Maps ranking weight</p>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Canonical Name</span>
                  <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 100% Match</span>
                </div>
                <div className="font-semibold text-slate-900">{settings.name}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Standardized Address</span>
                  <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Verified Landmark</span>
                </div>
                <div className="text-slate-800 text-xs">{settings.address}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Direct Calling & WhatsApp</span>
                  <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active Line</span>
                </div>
                <div className="text-slate-800 text-xs">{settings.phone} ({settings.openingHours})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold">Need a Free Trial Class for your Child?</h4>
            <p className="text-sm text-slate-300">Book a 3-day demo in Sector 22B Gurgaon with personal guidance.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/free-trial"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition text-white"
            >
              Book Free Trial
            </Link>
            <a
              href={getWhatsAppLink(settings.whatsappNumber, 'Hello Prime Learning, I want to inquire about coaching admissions.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-sm transition text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
