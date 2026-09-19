'use client';

import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, Clock, AlertCircle, Sparkles, Filter, 
  ChevronDown, ChevronUp, Award, HelpCircle, Layers, Lightbulb, Check
} from 'lucide-react';
import { SyllabusChapter, ChapterStatus } from '@/lib/types';
import { db, updateChapterStatus } from '@/lib/db';

interface CBSEChapterTrackerProps {
  initialGrade?: string;
  initialSubject?: string;
  isTeacherMode?: boolean;
  onStatusChange?: () => void;
}

export default function CBSEChapterTracker({
  initialGrade = 'Class 10',
  initialSubject = 'All',
  isTeacherMode = false,
  onStatusChange,
}: CBSEChapterTrackerProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<SyllabusChapter[]>(() => db.getSyllabusChapters());

  const handleUpdateStatus = (chapterId: string, newStatus: ChapterStatus) => {
    const updated = updateChapterStatus(chapterId, newStatus);
    setChapters(updated);
    if (onStatusChange) onStatusChange();
  };

  // Filter chapters
  const filtered = chapters.filter(ch => {
    if (selectedGrade !== 'All' && ch.grade !== selectedGrade) return false;
    if (selectedSubject !== 'All' && ch.subject !== selectedSubject) return false;
    if (statusFilter !== 'All' && ch.status !== statusFilter) return false;
    return true;
  });

  // Calculate statistics
  const totalChapters = filtered.length;
  const completedCount = filtered.filter(ch => ch.status === 'Completed').length;
  const inProgressCount = filtered.filter(ch => ch.status === 'In Progress').length;
  const revisionCount = filtered.filter(ch => ch.status === 'Revision Needed').length;
  const completionPercentage = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
  const totalWeightage = filtered.reduce((sum, ch) => sum + ch.weightageMarks, 0);
  const completedWeightage = filtered
    .filter(ch => ch.status === 'Completed')
    .reduce((sum, ch) => sum + ch.weightageMarks, 0);

  const getStatusColor = (status: ChapterStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Revision Needed':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Progress Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-prime-orange bg-prime-orange/10 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CBSE Curriculum & Board Roadmap</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              NCERT Chapter Mastery Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Track real-time topic coverage, board marks weightage, formulas, and teacher exam tips.
            </p>
          </div>

          {/* Quick Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              {['Class 10', 'Class 9'].map(grade => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedGrade === grade ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              {['All', 'Mathematics', 'Science'].map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedSubject === sub ? 'bg-prime-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar & Weightage Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
              <span>Syllabus Completed</span>
              <span className="text-prime-orange font-black text-sm">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-prime-orange to-amber-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {completedCount} of {totalChapters} chapters fully prepared
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="text-xs font-bold text-slate-500 mb-1">Board Weightage Covered</div>
            <div className="text-xl font-black text-slate-900">
              {completedWeightage} <span className="text-xs font-semibold text-slate-400">/ {totalWeightage} Marks</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Based on official CBSE board marking blueprint
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-around text-center">
            <div>
              <div className="text-lg font-black text-emerald-600">{completedCount}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Done</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="text-lg font-black text-amber-600">{inProgressCount}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">In Progress</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="text-lg font-black text-rose-600">{revisionCount}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Revise</div>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-slate-400 flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1" /> Filter:
          </span>
          {['All', 'Completed', 'In Progress', 'Revision Needed', 'Not Started'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(chapter => {
          const isExpanded = expandedChapterId === chapter.id;

          return (
            <div 
              key={chapter.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition shadow-sm overflow-hidden"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left Chapter Info */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-sm shrink-0 border border-slate-200">
                    Ch {chapter.chapterNo}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(chapter.status)}`}>
                        {chapter.status}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {chapter.subject} • {chapter.grade}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        ★ {chapter.weightageMarks} Marks in Board
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {chapter.ncertExercisesCount} NCERT Exercises • Comprehensive Exemplar & PYQ Coverage
                    </p>
                  </div>
                </div>

                {/* Right Actions & Status Toggle */}
                <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                  {isTeacherMode && (
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      {(['Completed', 'In Progress', 'Revision Needed', 'Not Started'] as ChapterStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(chapter.id, st)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                            chapter.status === st
                              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                          title={`Set status to ${st}`}
                        >
                          {st === 'Completed' ? '✓ Done' : st === 'In Progress' ? '⌛ Active' : st === 'Revision Needed' ? '⚠️ Revise' : '○ Pending'}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    <span>{isExpanded ? 'Hide Key Formulas' : 'View Formulas & Tips'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Formula Sheet & Exam Tips Drawer */}
              {isExpanded && (
                <div className="bg-gradient-to-b from-slate-50 to-amber-50/20 p-5 border-t border-slate-100 space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center mb-2">
                      <Layers className="w-3.5 h-3.5 mr-1.5 text-prime-orange" />
                      Key NCERT Formulas & Core Identities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {chapter.keyFormulas.map((formula, idx) => (
                        <div 
                          key={idx}
                          className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 shadow-xs flex items-start space-x-2"
                        >
                          <span className="text-prime-orange font-bold font-sans text-xs">#{idx + 1}</span>
                          <span className="font-semibold">{formula}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800 mr-1">Faculty Exam Tip:</span>
                      <span>{chapter.examTips}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-sm">No chapters match your selected filter criteria.</p>
            <button 
              onClick={() => { setSelectedGrade('Class 10'); setSelectedSubject('All'); setStatusFilter('All'); }}
              className="mt-3 text-xs font-bold text-prime-orange hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
