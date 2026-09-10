'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Printer, 
  Share2, 
  Sparkles, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  MessageSquare, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Palette,
  ArrowRight
} from 'lucide-react';
import { db } from '@/lib/db';
import { MARKETING_PRESETS, WHATSAPP_CAMPAIGNS, getWhatsAppLink } from '@/lib/constants';

export default function MarketingToolkitPage() {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const currentPreset = MARKETING_PRESETS[selectedTemplateIndex];

  // Editable state
  const [headline, setHeadline] = useState(currentPreset.headline);
  const [subheadline, setSubheadline] = useState(currentPreset.subheadline);
  const [highlightOffer, setHighlightOffer] = useState(currentPreset.highlightOffer);
  const [targetClasses, setTargetClasses] = useState(currentPreset.targetClasses);
  const [batchStartDate, setBatchStartDate] = useState(currentPreset.batchStartDate);
  const [qrDestination, setQrDestination] = useState<'free-trial' | 'google-review' | 'whatsapp'>(currentPreset.qrDestination);
  const [accentColor, setAccentColor] = useState(currentPreset.accentColor);
  const [copiedCampaignId, setCopiedCampaignId] = useState<string | null>(null);

  const settings = db.getSettings();

  const handleSelectTemplate = (index: number) => {
    setSelectedTemplateIndex(index);
    const p = MARKETING_PRESETS[index];
    setHeadline(p.headline);
    setSubheadline(p.subheadline);
    setHighlightOffer(p.highlightOffer);
    setTargetClasses(p.targetClasses);
    setBatchStartDate(p.batchStartDate);
    setQrDestination(p.qrDestination);
    setAccentColor(p.accentColor);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCampaignId(id);
    setTimeout(() => setCopiedCampaignId(null), 2500);
  };

  // QR target resolution
  const getQrUrl = () => {
    if (qrDestination === 'free-trial') {
      return 'https://primelearning.edu.in/free-trial';
    }
    if (qrDestination === 'google-review') {
      return 'https://maps.google.com/?q=Prime+Learning+Classes+Sec-22B+Gurgaon';
    }
    return getWhatsAppLink(settings.whatsappNumber, 'Hello Prime Learning, I saw your poster and want to know more about demo batches.');
  };

  const qrTitle = 
    qrDestination === 'free-trial' 
      ? 'SCAN FOR FREE DEMO CLASS' 
      : qrDestination === 'google-review' 
      ? 'SCAN TO RATE ON GOOGLE' 
      : 'SCAN TO CHAT ON WHATSAPP';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      
      {/* 1. Header (Hidden during print) */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 print:hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-prime-orange/20 text-prime-orange px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Local Marketing & Visibility Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Promotional Flyer & QR Standee Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Generate high-resolution promotional flyers, social media announcements, and physical counter standees with dynamic QR codes for <strong>Prime Learning Classes</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-prime-orange hover:bg-prime-orange-hover shadow-lg transition"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / Save Poster (A4)
            </button>
            <Link
              href="/impact"
              className="inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800 border border-slate-700 transition"
            >
              View SDG Impact
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Studio Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls (Hidden during print) */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            
            {/* Template Selector */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                1. Select Marketing Template
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MARKETING_PRESETS.map((p, idx) => (
                  <button
                    key={p.templateId}
                    onClick={() => handleSelectTemplate(idx)}
                    className={`p-3 rounded-xl text-left border transition text-xs font-semibold flex flex-col justify-between ${
                      selectedTemplateIndex === idx
                        ? 'border-prime-orange bg-prime-orange/5 text-prime-orange shadow-sm ring-1 ring-prime-orange'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-normal">{p.targetClasses}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Fields */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                2. Customize Flyer Details
              </label>

              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Main Headline</span>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                />
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Subheadline / Location Tag</span>
                <input
                  type="text"
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                />
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Highlight Offer / Promo Banner</span>
                <input
                  type="text"
                  value={highlightOffer}
                  onChange={(e) => setHighlightOffer(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="font-semibold text-slate-700">Target Classes</span>
                  <input
                    type="text"
                    value={targetClasses}
                    onChange={(e) => setTargetClasses(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-slate-700">Batch Timing / Urgency</span>
                  <input
                    type="text"
                    value={batchStartDate}
                    onChange={(e) => setBatchStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                  />
                </div>
              </div>

              {/* QR Destination */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700 block">Scannable QR Destination</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQrDestination('free-trial')}
                    className={`p-2 rounded-lg text-center font-bold text-[11px] border transition ${
                      qrDestination === 'free-trial' 
                        ? 'bg-prime-orange text-white border-prime-orange' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Free Trial
                  </button>

                  <button
                    type="button"
                    onClick={() => setQrDestination('whatsapp')}
                    className={`p-2 rounded-lg text-center font-bold text-[11px] border transition ${
                      qrDestination === 'whatsapp' 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => setQrDestination('google-review')}
                    className={`p-2 rounded-lg text-center font-bold text-[11px] border transition ${
                      qrDestination === 'google-review' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Google Map
                  </button>
                </div>
              </div>

              {/* Accent Color Selection */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700 block">Theme Color Accent</span>
                <div className="flex items-center space-x-3">
                  {['#f97316', '#2563eb', '#10b981', '#7c3aed', '#dc2626'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition transform hover:scale-110 ${
                        accentColor === color ? 'border-slate-900 ring-2 ring-offset-1 ring-slate-900' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Quick WhatsApp Campaign Templates */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  3. Instant WhatsApp Broadcast Copy
                </label>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-2.5">
                {WHATSAPP_CAMPAIGNS.slice(0, 3).map((camp) => {
                  const text = camp.message('Parent');
                  const waUrl = getWhatsAppLink(settings.whatsappNumber, text);
                  const isCopied = copiedCampaignId === camp.id;

                  return (
                    <div key={camp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{camp.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {camp.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {text}
                      </p>
                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => handleCopyText(text, camp.id)}
                          className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center justify-center space-x-1"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold flex items-center space-x-1"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live High-Resolution Printable Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <div className="w-full mb-3 flex items-center justify-between text-xs text-slate-500 print:hidden">
              <span className="font-bold uppercase tracking-wider">Live Poster Preview (A4 Scalable)</span>
              <span className="text-slate-400">Click &apos;Print / Save Poster&apos; for high-res output</span>
            </div>

            {/* Poster Sheet Canvas (Specially styled for Screen & Print) */}
            <div 
              id="printable-flyer"
              className="bg-white rounded-3xl shadow-2xl border-4 border-slate-900 overflow-hidden w-full max-w-xl text-slate-900 p-8 sm:p-10 space-y-6 relative print:border-none print:shadow-none print:m-0 print:p-6 print:max-w-none print:w-full"
              style={{
                borderTopColor: accentColor,
                borderTopWidth: '12px'
              }}
            >
              
              {/* Top Banner & Institute Logo */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-100 pb-5 gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="relative w-44 h-12">
                    <Image src="/logo-transparent.png" alt="Prime Learning Logo" fill className="object-contain" priority />
                  </div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Maths, Science & Academic Tutoring
                  </p>
                </div>

                <div className="text-center sm:text-right space-y-0.5">
                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-prime-orange" />
                    <span>Sec-22B, Gurgaon</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold">{settings.landmark}</p>
                </div>
              </div>

              {/* Main Headline & Pitch */}
              <div className="text-center space-y-3 py-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  {headline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto">
                  {subheadline}
                </p>

                {/* Offer Highlight Ribbon */}
                <div 
                  className="py-3 px-6 rounded-2xl text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md transform -rotate-1 mx-auto inline-block"
                  style={{ backgroundColor: accentColor }}
                >
                  ⚡ {highlightOffer} ⚡
                </div>
              </div>

              {/* Class & Subject Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">Classes Offered</span>
                  <p className="font-black text-slate-900 text-sm">{targetClasses}</p>
                  <p className="text-[11px] text-slate-600">CBSE / ICSE / State Board</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">Batch Schedule</span>
                  <p className="font-black text-slate-900 text-sm">{batchStartDate}</p>
                  <p className="text-[11px] text-slate-600">Limited 15 Students per batch</p>
                </div>
              </div>

              {/* Faculty Pillars Highlight */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Lead Faculty Mentors
                  </span>
                  <p className="font-bold text-sm text-white">
                    Praveen Gandhi <span className="text-xs text-slate-300">(15+ Yrs Maths)</span>
                  </p>
                  <p className="font-bold text-sm text-white">
                    Rashmi Anand <span className="text-xs text-slate-300">(12+ Yrs Science & Chem)</span>
                  </p>
                </div>

                <div className="shrink-0 text-center">
                  <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full uppercase">
                    100% Concept Focus
                  </span>
                </div>
              </div>

              {/* Call to Action & Dynamic Scannable QR Block */}
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-5 sm:p-6 bg-amber-50/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* QR Code SVG */}
                <div className="flex flex-col items-center space-y-2 shrink-0">
                  <div className="p-3 bg-white rounded-2xl border-2 border-slate-900 shadow-lg w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                      {/* Corner markers */}
                      <rect x="5" y="5" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="11" y="11" width="14" height="14" rx="2"/>
                      <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="75" y="11" width="14" height="14" rx="2"/>
                      <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <rect x="11" y="75" width="14" height="14" rx="2"/>
                      {/* Pattern blocks */}
                      <rect x="40" y="8" width="6" height="6" rx="1"/>
                      <rect x="52" y="8" width="6" height="6" rx="1"/>
                      <rect x="40" y="20" width="6" height="6" rx="1"/>
                      <rect x="52" y="20" width="6" height="6" rx="1"/>
                      <rect x="8" y="40" width="6" height="6" rx="1"/>
                      <rect x="20" y="40" width="6" height="6" rx="1"/>
                      <rect x="36" y="36" width="28" height="28" rx="4" style={{ fill: accentColor }} />
                      <rect x="74" y="40" width="6" height="6" rx="1"/>
                      <rect x="86" y="40" width="6" height="6" rx="1"/>
                      <rect x="40" y="74" width="6" height="6" rx="1"/>
                      <rect x="52" y="74" width="6" height="6" rx="1"/>
                      <rect x="74" y="74" width="6" height="6" rx="1"/>
                      <rect x="86" y="86" width="6" height="6" rx="1"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-slate-700 uppercase">
                    {qrTitle}
                  </span>
                </div>

                {/* Contact Information & Action Text */}
                <div className="space-y-3 text-center sm:text-left flex-grow">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-prime-orange uppercase tracking-wider">
                      Easy Admissions
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      Scan with Phone Camera or Call Directly
                    </h3>
                    <p className="text-xs text-slate-600">
                      Visit us at Sec-22B, Near Anand Farm or register online in 30 seconds.
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs font-bold text-slate-800">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>{settings.phone}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span>primelearning.edu.in</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Address Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-semibold gap-2">
                <span>📍 948, Sec-22B, Near Anand Farm, Gurgaon</span>
                <span>⭐ Rated 4.9/5 by 60+ Local Parents</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
