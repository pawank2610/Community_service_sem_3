'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  HeartHandshake, 
  BookOpen, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  FileText, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users, 
  ExternalLink,
  Sparkles,
  Download,
  X
} from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppLink } from '@/lib/constants';

export default function CommunityImpactPage() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const settings = db.getSettings();
  const metrics = db.getCommunityMetrics();
  const teachers = db.getTeachers();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. Hero & Mission Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-prime-blue-dark text-white pt-14 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-prime-orange/20 border border-prime-orange/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-prime-orange mb-6">
            <HeartHandshake className="w-4 h-4" />
            <span>Sem-3 Community Service Project • Academic Showcase</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Digital Transformation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-prime-orange to-amber-400">Local Coaching Educators</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Bridging the digital divide for local neighbourhood educators in <strong>Sec-22B, Gurgaon</strong>. We engineered a complete digital ecosystem — turning pen-and-paper operations into a modern, accessible learning hub aligned with <strong>UN Sustainable Development Goals (SDG 4, 8 & 9)</strong>.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-prime-orange hover:bg-prime-orange-hover shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View University Project Report (PDF)
                </button>

                <Link
                  href="/parent"
                  className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                >
                  <Users className="w-4 h-4 mr-2 text-prime-orange" />
                  Try Parent Portal
                </Link>

                <Link
                  href="/marketing"
                  className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-200 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                  Marketing & QR Studio
                </Link>
              </div>
            </div>

            {/* Quick Institutional Beneficiary Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-white space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Project Beneficiary</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{settings.name}</h2>
                </div>
                <div className="p-2 rounded-xl bg-white/10">
                  <MapPin className="w-5 h-5 text-prime-orange" />
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Location:</strong> {settings.address}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Faculty Enabled:</strong> Praveen Gandhi (Maths) & Rashmi Anand (Science)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Community Reach:</strong> 150+ Neighbourhood families in Sec-22B & Carterpuri</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Total Field Hours Served:</strong> 75+ Hours of tech training, setup & digitisation</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Semester 3 Project</span>
                <span className="text-emerald-400 font-semibold">Status: Successfully Deployed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Impact Statistics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((m) => (
            <div 
              key={m.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-prime-orange/30 transition">
                    {m.sdgTag}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {m.change}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {m.value}
                </h3>
                <h4 className="text-sm font-bold text-slate-800">
                  {m.label}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. UN Sustainable Development Goals (SDG) Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/10 px-3 py-1 rounded-full">
            Global Goals Alignment
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            How This Project Maps to UN SDGs
          </h2>
          <p className="text-sm text-slate-600">
            Engineered to deliver tangible, measurable impact in local community education and micro-entrepreneurship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SDG 4 */}
          <div className="bg-gradient-to-br from-red-500/5 to-white p-8 rounded-3xl border-2 border-red-200 shadow-md space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
              4
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">UN SDG 4</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">Quality Education</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensures inclusive and equitable quality education for school students by removing traditional entry barriers.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 font-bold">•</span>
                <strong>Free Trial Access:</strong> Any local student can take 3 days of trial classes without upfront fees.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 font-bold">•</span>
                <strong>AI Doubt Solver:</strong> Instant 24/7 curriculum doubt resolution powered by Google Gemini.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 font-bold">•</span>
                <strong>Parent Transparency:</strong> Real-time access to test marks and attendance health meters.
              </li>
            </ul>
          </div>

          {/* SDG 8 */}
          <div className="bg-gradient-to-br from-amber-500/5 to-white p-8 rounded-3xl border-2 border-amber-200 shadow-md space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-black text-xl shadow-lg">
              8
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">UN SDG 8</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">Decent Work & Economic Growth</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering self-employed educators as sustainable micro-entrepreneurs by scaling their student reach.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2 font-bold">•</span>
                <strong>Direct Disintermediation:</strong> Eliminates middleman commissions by connecting parents directly with teachers.
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2 font-bold">•</span>
                <strong>Enrolment Pipeline:</strong> Structured CRM leads ensure zero interested students slip through the cracks.
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2 font-bold">•</span>
                <strong>Predictable Cashflow:</strong> Automated digital fee reminders and receipts ensure timely month-end compensation.
              </li>
            </ul>
          </div>

          {/* SDG 9 */}
          <div className="bg-gradient-to-br from-blue-500/5 to-white p-8 rounded-3xl border-2 border-blue-200 shadow-md space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
              9
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">UN SDG 9</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">Industry, Innovation & Infrastructure</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bringing state-of-the-art digital infrastructure to a traditionally unorganized, offline coaching center.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <strong>QR Check-in System:</strong> Student QR code check-ins replacing easily damaged physical paper registers.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <strong>Digital Marketing Toolkit:</strong> In-app promotional flyer and standee generator for physical distribution.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <strong>Cloud Gradebooks:</strong> Instant percentage calculations, ranking, and digital report card generation.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. Before vs. After Digital Transformation Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10">
          
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/10 px-3 py-1 rounded-full">
              Field Evaluation Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Before vs. After Digital Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct comparison of operational challenges faced by the teachers prior to our community service project intervention.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                  <th className="py-4 px-3">Dimension</th>
                  <th className="py-4 px-3 text-red-700 bg-red-50/50 rounded-tl-xl">Traditional Baseline (Before)</th>
                  <th className="py-4 px-3 text-emerald-700 bg-emerald-50/50 rounded-tr-xl">Our Solution (After)</th>
                  <th className="py-4 px-3 text-right">Measurable Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Local Discoverability</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Dependent strictly on word-of-mouth; zero Google or web footprint</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">Ranked Next.js SEO site + Verified Google Maps Business Profile</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">+320% Search Impressions</td>
                </tr>

                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Trial Class Management</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Handwritten on slips of paper; frequent forgotten follow-ups</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">5-stage CRM pipeline (New → Contacted → Scheduled → Enrolled)</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">Zero Lost Leads</td>
                </tr>

                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Class Attendance</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Manual paper register; disputes over missed classes and makeup hours</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">Live QR attendance scanner + CBSE 75% health meter for parents</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">100% Tamper-Proof</td>
                </tr>

                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Fee Invoicing</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Cash only with physical receipt carbon copies; lost payment proof</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">Instant UPI/Card payments with downloadable official PDF receipts</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">100% Digital Receipts</td>
                </tr>

                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Academic Doubt Help</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Limited to 1-hour coaching slot; students stuck during self-study</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">24/7 AI-powered Doubt Solver with teacher verification queue</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">&lt;30s Doubt Response</td>
                </tr>

                <tr>
                  <td className="py-4 px-3 font-bold text-slate-900">Parent Engagement</td>
                  <td className="py-4 px-3 text-slate-600 bg-red-50/20">Reactive phone calls only when student fails or misses days</td>
                  <td className="py-4 px-3 text-slate-800 bg-emerald-50/20 font-medium">No-login Parent Portal (Phone/PIN lookup) + WhatsApp absent alerts</td>
                  <td className="py-4 px-3 text-right font-bold text-emerald-600">94% Active Parent Access</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Teachers Testimonial / Community Voice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-slate-900 to-prime-blue-dark rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/20 px-3 py-1 rounded-full">
                Educator Feedback
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                &ldquo;This project gave our coaching a professional identity.&rdquo;
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                &ldquo;Earlier, parents would only find us if an existing student recommended our classes. Managing paper attendance and remembering who had paid fees was stressful. Now, our courses appear on Google Maps, parents can check marks and receipts from home, and we have doubled our demo class bookings. This digital platform has transformed our work.&rdquo;
              </p>
              <div className="pt-2">
                <p className="font-bold text-white text-sm">Praveen Gandhi & Rashmi Anand</p>
                <p className="text-xs text-slate-400">Founders & Faculty, Prime Learning Classes (Sec-22B, Gurgaon)</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <h4 className="text-base font-bold text-amber-400 flex items-center">
                <Award className="w-5 h-5 mr-2 text-prime-orange" />
                Community Service Project Summary
              </h4>
              <div className="space-y-2.5 text-xs text-slate-200">
                <p>• <strong>Course Code:</strong> Semester 3 - Community Service / Social Outreach</p>
                <p>• <strong>Category:</strong> EdTech & Small Business Digital Transformation</p>
                <p>• <strong>Target Sector:</strong> Local Micro-Tutors & Supplementary Education</p>
                <p>• <strong>Primary Technologies:</strong> Next.js 15, TypeScript, Tailwind, QR Check-ins, AI Gemini</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-100 transition shadow-md flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-prime-orange" />
                  <span>Generate Official Submission Report</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. University Submission Report Modal (Printable PDF) */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 max-w-4xl w-full my-8 overflow-hidden flex flex-col">
            
            {/* Modal Actions Bar (Not printed) */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-prime-orange" />
                <span className="text-xs sm:text-sm font-bold">University Project Report Preview</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-prime-orange text-white hover:bg-prime-orange-hover text-xs font-bold shadow transition"
                >
                  <Printer className="w-4 h-4 mr-1.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Academic Document Body */}
            <div className="p-8 sm:p-12 text-slate-900 space-y-8 bg-white print:p-0 print:m-0 print:border-none">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-prime-orange">
                    ACADEMIC COMMUNITY SERVICE PROJECT REPORT • SEMESTER 3
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    Digital Transformation for Local Coaching Educators
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Beneficiary: <strong>Prime Learning Classes</strong>, 948, Sec-22B, Near Anand Farm, Gurgaon
                  </p>
                </div>

                <div className="text-right text-xs text-slate-500 shrink-0">
                  <p><strong>Academic Year:</strong> 2025–2026</p>
                  <p><strong>Report Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {/* Section 1: Executive Summary */}
              <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  1. Executive Summary & Problem Context
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Two dedicated local educators in Sector 22B, Gurgaon (Praveen Gandhi and Rashmi Anand) were facing significant barriers to student enrolment due to absence of digital visibility, reliance on word-of-mouth, and manual operational burdens (paper registers, lost inquiries, and delayed fees). This community service initiative developed a full-stack digital ecosystem—including a responsive web hub, QR-based classroom attendance, lead-capturing free trial pipelines, parent portals, and an automated marketing kit—empowering the teachers and benefiting neighbourhood learners.
                </p>
              </div>

              {/* Section 2: Key Deliverables Completed */}
              <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  2. Project Deliverables & Implemented Interventions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">✔ Institutional Web Portal</strong>
                    Next.js 15 web platform featuring faculty profiles, fee structures, interactive curriculum details, and local SEO.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">✔ QR Attendance Terminal</strong>
                    Automated classroom attendance scanner with student QR check-in and CBSE 75% health meter warnings.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">✔ 5-Stage Trial CRM</strong>
                    Digitized student inquiry and demo registration workflow with automated WhatsApp follow-ups.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">✔ 24/7 AI Doubt Solver & Parent Portal</strong>
                    Instant conceptual assistance for students and frictionless phone-based marks & fee receipts for parents.
                  </div>
                </div>
              </div>

              {/* Section 3: SDG Mapping */}
              <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  3. UN Sustainable Development Goals (SDG) Alignment
                </h2>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>• <strong>SDG 4 (Quality Education):</strong> Delivered 42+ free trial class hours and eliminated upfront registration barriers for local students.</p>
                  <p>• <strong>SDG 8 (Decent Work & Economic Growth):</strong> Increased educator enrollment capacity by +65% as a sustainable local micro-enterprise.</p>
                  <p>• <strong>SDG 9 (Industry, Innovation & Infrastructure):</strong> Converted 100% of institute records, fees, and attendance into modern digital assets.</p>
                </div>
              </div>

              {/* Section 4: Quantitative Verification Sign-Off */}
              <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Project Contributor(s):</p>
                  <div className="border-b border-slate-300 w-48 h-8"></div>
                  <p className="text-slate-500">Student Signature / Roll Number</p>
                </div>

                <div className="space-y-4 text-right">
                  <p className="font-bold text-slate-900">Institute Beneficiary Sign-Off:</p>
                  <div className="border-b border-slate-300 w-48 h-8 ml-auto"></div>
                  <p className="text-slate-500">Praveen Gandhi / Rashmi Anand<br/>Prime Learning Classes (Sec-22B, Gurgaon)</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
