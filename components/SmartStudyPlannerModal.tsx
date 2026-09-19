'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Sparkles, Printer, CheckCircle2, 
  Brain, BookOpen, Target, ArrowRight, Save, RotateCcw, AlertTriangle
} from 'lucide-react';
import { StudyPlanSchedule, StudyPlanDay } from '@/lib/types';
import { db, saveStudyPlan } from '@/lib/db';

interface SmartStudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
  studentName?: string;
}

export default function SmartStudyPlannerModal({
  isOpen,
  onClose,
  studentId = 'std-1',
  studentName = 'Bhavya Anand',
}: SmartStudyPlannerModalProps) {
  const [examName, setExamName] = useState('CBSE Class 10 Board Exams');
  const [targetDate, setTargetDate] = useState('2027-02-15');
  const [dailyHours, setDailyHours] = useState(3);
  const [prioritySubject, setPrioritySubject] = useState('Both (Maths & Science)');
  const [weakTopics, setWeakTopics] = useState<string[]>(['Trigonometry', 'Light & Optics', 'Quadratic Equations']);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [activePlan, setActivePlan] = useState<StudyPlanSchedule | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  // Compute countdown
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
    setDaysRemaining(diff);
  }, [targetDate]);

  // Load existing plan if any
  useEffect(() => {
    if (isOpen) {
      const existing = db.getStudyPlans(studentId);
      if (existing.length > 0) {
        setActivePlan(existing[0]);
        setExamName(existing[0].examName);
        setTargetDate(existing[0].targetDate);
        setDailyHours(existing[0].dailyHours);
        setPrioritySubject(existing[0].prioritySubject);
        setWeakTopics(existing[0].weakTopics);
      } else {
        generatePlan();
      }
    }
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  const generatePlan = () => {
    const days: StudyPlanDay[] = [
      {
        dayNumber: 1,
        date: 'Day 1: Concept Foundation',
        subject: 'Mathematics',
        chapter: 'Quadratic Equations',
        tasks: [
          'Revise Discriminant formulas D = b² - 4ac and roots nature',
          'Solve NCERT Ex 4.2 & 4.3 word problems on speed & dimensions',
          'Praveen Sir\'s tip: Attempt 5 PYQs on unknown constant k',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 2,
        date: 'Day 2: Concept Foundation',
        subject: 'Science',
        chapter: 'Light - Reflection & Refraction',
        tasks: [
          'Practice all 6 concave mirror and 2 convex mirror ray diagrams',
          'Solve 5 numericals applying Cartesian sign conventions (1/f = 1/v + 1/u)',
          'Rashmi Ma\'am\'s tip: Recheck sign of focal length (- for concave, + for convex)',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 3,
        date: 'Day 3: Deep Practice & Weak Topics',
        subject: 'Mathematics',
        chapter: 'Introduction to Trigonometry',
        tasks: [
          'Write down and verify 3 Pythagorean identities 3 times',
          'Solve NCERT Exercise 8.4 identity proofs (convert to sin & cos)',
          'Complete 20-minute timed quiz on standard angle values (30°, 45°, 60°)',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 4,
        date: 'Day 4: Deep Practice & Weak Topics',
        subject: 'Science',
        chapter: 'Chemical Reactions & Equations',
        tasks: [
          'Practice balancing 10 complex chemical equations with physical states',
          'Memorize preparation & uses of Bleaching powder, Baking soda, and POP',
          'Review redox reactions with oxidizing and reducing agent identification',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 5,
        date: 'Day 5: Interleaved Problem Solving',
        subject: 'Mathematics',
        chapter: 'Arithmetic Progressions & Triangles',
        tasks: [
          'Derive sum formula Sn = (n/2)[2a + (n - 1)d] and solve case studies',
          'State and write complete proof of Basic Proportionality Theorem (Thales)',
          'Clear any lingering doubts via Prime Learning AI Doubt Solver',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 6,
        date: 'Day 6: Interleaved Problem Solving',
        subject: 'Science',
        chapter: 'Life Processes & Electricity',
        tasks: [
          'Draw neat labeled diagrams: Nephron structure & Human Heart blood flow',
          'Solve combined series-parallel resistance numerical circuits (R = ρL/A)',
          'Review Joule\'s heating law and calculate electrical energy consumption in kWh',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
      {
        dayNumber: 7,
        date: 'Day 7: Mock Test & Revision Audit',
        subject: 'Comprehensive',
        chapter: 'Full Weekly Assessment',
        tasks: [
          'Attempt 50-mark Prime Learning Sunday Assessment test under timed conditions',
          'Review incorrect answers with teacher and note mistake patterns in error diary',
          'Rest & light revision of formula flashcards before next study cycle',
        ],
        durationMinutes: dailyHours * 60,
        completed: false,
      },
    ];

    const newSchedule: StudyPlanSchedule = {
      id: `plan-${Date.now()}`,
      studentId,
      studentName,
      examName,
      targetDate,
      dailyHours,
      prioritySubject,
      weakTopics,
      planDays: days,
      createdAt: new Date().toISOString(),
    };

    setActivePlan(newSchedule);
    saveStudyPlan(newSchedule);
    setIsSaved(true);
  };

  const handleToggleDay = (dayIndex: number) => {
    if (!activePlan) return;
    const updatedDays = [...activePlan.planDays];
    updatedDays[dayIndex].completed = !updatedDays[dayIndex].completed;
    const updatedPlan = { ...activePlan, planDays: updatedDays };
    setActivePlan(updatedPlan);
    saveStudyPlan(updatedPlan);
  };

  const handleAddWeakTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;
    if (!weakTopics.includes(newTopicInput.trim())) {
      setWeakTopics([...weakTopics, newTopicInput.trim()]);
    }
    setNewTopicInput('');
  };

  const handleRemoveWeakTopic = (topic: string) => {
    setWeakTopics(weakTopics.filter(t => t !== topic));
  };

  const completedDaysCount = activePlan?.planDays.filter(d => d.completed).length || 0;
  const progressPercent = activePlan?.planDays.length 
    ? Math.round((completedDaysCount / activePlan.planDays.length) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-prime-orange text-white flex items-center justify-center font-black shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  AI Study Engine
                </span>
                <span className="text-xs text-slate-300">Spaced Repetition & Revision Planner</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                CBSE Board Exam Timetable & Revision Generator
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Target Exam & Countdown Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-200/80 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center justify-center sm:justify-start">
                <Target className="w-3.5 h-3.5 mr-1 text-prime-orange" />
                Target Milestone
              </span>
              <div className="text-xl font-black text-slate-900">{examName}</div>
              <p className="text-xs text-slate-600">
                Customized for student <strong>{studentName}</strong> • Class 10 Foundation
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl border border-amber-200 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-black text-prime-orange leading-none">{daysRemaining}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">Days Remaining</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-xs text-slate-600">
                <div className="font-semibold text-slate-900">{new Date(targetDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="text-[10px] text-slate-400">Board Exam Date</div>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-prime-orange" />
              Study Parameters & Focus Topics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Exam</label>
                <select 
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="CBSE Class 10 Board Exams">CBSE Class 10 Board Exams</option>
                  <option value="Pre-Board Diagnostic Exam">Pre-Board Diagnostic Exam</option>
                  <option value="CBSE Mid-Term Exams">CBSE Mid-Term Exams</option>
                  <option value="Foundation Unit Assessment">Foundation Unit Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Date</label>
                <input 
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Daily Study Hours</label>
                <div className="flex items-center space-x-1">
                  {[2, 3, 4, 5].map(hrs => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setDailyHours(hrs)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        dailyHours === hrs
                          ? 'bg-prime-orange text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {hrs}h/day
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Weak Topics Tag Manager */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Priority Chapters & Weak Topics (Spaced Repetition Focus)
              </label>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {weakTopics.map(topic => (
                  <span 
                    key={topic}
                    className="inline-flex items-center text-xs font-bold bg-white text-slate-800 border border-slate-200 px-3 py-1 rounded-full shadow-2xs"
                  >
                    <span>{topic}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveWeakTopic(topic)}
                      className="ml-1.5 text-slate-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddWeakTopic} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Type a difficult chapter (e.g. Carbon & its Compounds) and press Enter..."
                  value={newTopicInput}
                  onChange={(e) => setNewTopicInput(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                >
                  Add Topic
                </button>
                <button
                  type="button"
                  onClick={generatePlan}
                  className="px-4 py-2 bg-prime-orange text-white rounded-xl text-xs font-bold hover:bg-prime-orange-hover transition shadow-sm flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate Plan</span>
                </button>
              </form>
            </div>
          </div>

          {/* Generated Day-by-Day Revision Timetable */}
          {activePlan && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Your 7-Day Precision Revision Timetable
                  </h3>
                  <p className="text-xs text-slate-500">
                    Check off tasks as you finish them. Spaced intervals guarantee maximum formula recall.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-600">{progressPercent}% Completed</div>
                    <div className="text-[10px] text-slate-400">{completedDaysCount} of 7 days done</div>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    title="Print Study Schedule"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day Cards */}
              <div className="grid grid-cols-1 gap-3">
                {activePlan.planDays.map((day, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-2xl border p-4 transition ${
                      day.completed
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3">
                        <button
                          type="button"
                          onClick={() => handleToggleDay(idx)}
                          className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                            day.completed 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'border-slate-300 hover:border-prime-orange bg-white'
                          }`}
                        >
                          {day.completed && <CheckCircle2 className="w-4 h-4" />}
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-slate-900">{day.date}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              day.subject === 'Mathematics'
                                ? 'bg-blue-100 text-blue-800'
                                : day.subject === 'Science'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {day.subject}
                            </span>
                            <span className="text-xs font-bold text-slate-700">• {day.chapter}</span>
                            <span className="text-[10px] text-slate-400">({day.durationMinutes} mins allocated)</span>
                          </div>

                          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                            {day.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="flex items-start space-x-2">
                                <span className="text-prime-orange font-bold text-xs mt-0.5">•</span>
                                <span className={day.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                                  {task}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            {isSaved ? '✓ Timetable automatically saved to your student profile' : 'Generate and customize your schedule'}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
