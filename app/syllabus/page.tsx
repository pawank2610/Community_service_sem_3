import { Metadata } from 'next';
import CBSEChapterTracker from '@/components/CBSEChapterTracker';
import Link from 'next/link';
import { BookOpen, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CBSE Class 9 & 10 Syllabus Tracker & Formula Sheets | Prime Learning Classes',
  description: 'Track CBSE Class 9 and 10 Mathematics and Science syllabus, NCERT chapter weightage, key formulas, and exam tips curated by Praveen Gandhi & Rashmi Anand in Sec-22B Gurgaon.',
};

export default function SyllabusPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-12">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white via-amber-50/20 to-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-prime-orange bg-prime-orange/10 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Excellence & Blueprint</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            CBSE Syllabus & NCERT Chapter Tracker
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Comprehensive curriculum blueprint for Class 9 & 10 Mathematics and Science. Explore chapter weightage, core formulas, and verified exam tips curated by teachers <strong>Praveen Gandhi</strong> and <strong>Rashmi Anand</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/free-trial"
              className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow-md flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Book 3-Day Demo Class</span>
            </Link>

            <Link
              href="/parent"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-xs"
            >
              <span>Track Ward's Progress</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Interactive Tracker Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CBSEChapterTracker initialGrade="Class 10" initialSubject="All" />
      </section>

      {/* Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">
              Need Personal Guidance in Any Topic?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our small batches (max 15 students) ensure individual concept attention. Join our free trial to experience Praveen Sir and Rashmi Ma'am's teaching first-hand.
            </p>
          </div>

          <Link
            href="/free-trial"
            className="px-6 py-3.5 rounded-2xl font-black text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-lg shrink-0 uppercase tracking-wider"
          >
            Start 3-Day Free Demo Pass
          </Link>
        </div>
      </section>

    </div>
  );
}
