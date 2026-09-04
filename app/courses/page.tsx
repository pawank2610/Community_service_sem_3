'use client';

import React, { useState } from 'react';
import CourseCard from '@/components/CourseCard';
import EnquiryModal from '@/components/EnquiryModal';
import TrialForm from '@/components/TrialForm';
import { db } from '@/lib/db';
import { Course } from '@/lib/types';
import Link from 'next/link';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function CoursesPage() {
  const courses = db.getCourses();
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(undefined);
  const [gradeFilter, setGradeFilter] = useState<string>('All');

  const handleOpenTrialModal = (course?: Course) => {
    setSelectedCourse(course);
    setTrialModalOpen(true);
  };

  const handleOpenEnquiryModal = (course?: Course) => {
    setSelectedCourse(course);
    setEnquiryModalOpen(true);
  };

  const filteredCourses = courses.filter(c => {
    if (gradeFilter === 'All') return true;
    return c.grade.includes(gradeFilter);
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-12">
      
      {/* Header */}
      <section className="bg-white py-12 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-prime-orange uppercase tracking-wider bg-prime-orange/10 px-3 py-1 rounded-full">
            Academic Offerings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Courses & Batches
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Comprehensive coaching classes for Mathematics and Science from Class 6 to 12.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {['All', 'Class 1 - 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((flt) => (
              <button
                key={flt}
                onClick={() => setGradeFilter(flt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  gradeFilter === flt 
                    ? 'bg-prime-orange text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {flt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onOpenTrialModal={handleOpenTrialModal}
              onOpenEnquiryModal={handleOpenEnquiryModal}
            />
          ))}
        </div>
      </section>

      <EnquiryModal 
        isOpen={enquiryModalOpen} 
        onClose={() => setEnquiryModalOpen(false)}
        initialCourse={selectedCourse ? { grade: selectedCourse.grade, subject: selectedCourse.subject } : undefined}
      />

      {trialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>
            <TrialForm 
              initialCourse={selectedCourse ? { grade: selectedCourse.grade, subject: selectedCourse.subject } : undefined}
              onSuccess={() => {
                setTimeout(() => setTrialModalOpen(false), 4000);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
