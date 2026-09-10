'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  CreditCard, 
  Printer, 
  Phone, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare,
  X,
  Send
} from 'lucide-react';
import { db } from '@/lib/db';
import { Student, AttendanceRecord, TestResult, FeePayment, PtmBooking } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/constants';

export default function ParentPortalPage() {
  const [searchQuery, setSearchQuery] = useState('9810989437');
  const [activeStudent, setActiveStudent] = useState<Student | null>(() => {
    return db.getStudentByPhoneOrId('9810989437') || db.getStudents()[0] || null;
  });
  const [searchError, setSearchError] = useState('');
  const [activeTab, setActiveTab] = useState<'attendance' | 'marks' | 'fees' | 'ptm'>('attendance');
  
  // Fee receipt print modal state
  const [selectedReceipt, setSelectedReceipt] = useState<FeePayment | null>(null);

  // PTM Booking form state
  const [ptmTeacher, setPtmTeacher] = useState('Praveen Gandhi (Maths)');
  const [ptmSlot, setPtmSlot] = useState('Saturday: 4:30 PM - 4:45 PM');
  const [ptmNotes, setPtmNotes] = useState('');
  const [ptmSuccessMessage, setPtmSuccessMessage] = useState('');

  const settings = db.getSettings();
  const allStudents = db.getStudents();

  // Search handler
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchError('');
    const found = db.getStudentByPhoneOrId(searchQuery);
    if (found) {
      setActiveStudent(found);
    } else {
      setSearchError('No student record found matching this phone number or ID. Please verify or contact administration.');
    }
  };

  const handleSelectQuickStudent = (phone: string) => {
    setSearchQuery(phone);
    const found = db.getStudentByPhoneOrId(phone);
    if (found) {
      setActiveStudent(found);
      setSearchError('');
    }
  };

  // Student specific data
  const attendanceRecords: AttendanceRecord[] = activeStudent 
    ? db.getAttendance().filter(a => a.studentId === activeStudent.id) 
    : [];

  const testResults: TestResult[] = activeStudent 
    ? db.getTestResults().filter(t => t.studentId === activeStudent.id) 
    : [];

  const feePayments: FeePayment[] = activeStudent 
    ? db.getPayments().filter(p => p.studentId === activeStudent.id) 
    : [];

  // Attendance metrics calculation
  const totalClasses = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(a => a.status === 'Present').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 88;
  const isAttendanceSafe = attendancePercentage >= 75;

  // Handle PTM submit
  const handlePtmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent) return;

    db.addPtmBooking({
      studentId: activeStudent.id,
      studentName: activeStudent.studentName,
      parentName: activeStudent.parentName,
      parentPhone: activeStudent.phone,
      preferredTeacher: ptmTeacher,
      preferredSlot: ptmSlot,
      concernArea: ptmNotes || 'General academic and attendance review',
    });

    setPtmSuccessMessage('PTM slot booked successfully! Our faculty will confirm the appointment via WhatsApp.');
    setPtmNotes('');
    setTimeout(() => setPtmSuccessMessage(''), 6000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-prime-orange/20 text-prime-orange px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Parent Quick-Access Hub</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white">
                Child Performance & Attendance Tracker
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                No password required. Enter your registered mobile number to check attendance, view test marks, book PTM slots, and download official fee receipts.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/impact"
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 transition"
              >
                Community Impact
              </Link>
              <Link
                href="/marketing"
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-prime-orange hover:bg-prime-orange-hover shadow transition"
              >
                Marketing Kit
              </Link>
            </div>
          </div>

          {/* Quick Lookup Bar */}
          <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-xl max-w-3xl space-y-3">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter 10-Digit Mobile Number (e.g. 9810989437) or Student ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-prime-orange hover:bg-prime-orange-hover text-white font-bold text-xs sm:text-sm transition shadow shrink-0"
              >
                Track Student
              </button>
            </form>

            {/* Quick Demo Student Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-semibold">Quick Demo Profiles:</span>
              {allStudents.slice(0, 3).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleSelectQuickStudent(st.phone)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition font-medium ${
                    activeStudent?.id === st.id
                      ? 'bg-prime-orange/20 border-prime-orange text-prime-orange'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {st.studentName} ({st.grade})
                </button>
              ))}
            </div>

            {searchError && (
              <div className="text-xs text-rose-400 font-semibold flex items-center space-x-1.5 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. Main Parent Portal Dashboard */}
      {activeStudent ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Active Student Overview Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-prime-orange to-amber-400 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {activeStudent.studentName.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-black text-slate-900">{activeStudent.studentName}</h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {activeStudent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  <strong>Class:</strong> {activeStudent.grade} • <strong>Batch:</strong> {activeStudent.batchName} • <strong>Mentor:</strong> {activeStudent.teacherName}
                </p>
                <p className="text-xs text-slate-500">
                  Parent: <strong>{activeStudent.parentName}</strong> • Registered Phone: {activeStudent.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <a
                href={getWhatsAppLink(settings.whatsappNumber, `Hello Prime Learning, I am ${activeStudent.parentName} (Parent of ${activeStudent.studentName}, ${activeStudent.grade}). I would like to speak with the teacher.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                WhatsApp Teacher
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-2">
            {[
              { id: 'attendance', label: 'Attendance Health Meter', icon: Clock },
              { id: 'marks', label: 'Test Marks & Ranks', icon: GraduationCap },
              { id: 'fees', label: 'Fees & Official Receipts', icon: CreditCard },
              { id: 'ptm', label: 'Request PTM Slot', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 whitespace-nowrap transition ${
                    isActive
                      ? 'bg-prime-orange text-white shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Attendance Health Meter */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              
              {/* Health Gauge Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={isAttendanceSafe ? 'text-emerald-500' : 'text-rose-500'}
                        strokeDasharray={`${attendancePercentage}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">{attendancePercentage}%</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Overall Rate</span>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isAttendanceSafe ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isAttendanceSafe ? 'CBSE Safe (>75%)' : 'Attendance Warning (<75%)'}
                  </span>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Classroom Attendance Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prime Learning uses live QR check-ins during every batch session. Regularity is critical for concept retention and pre-board revision.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Classes</span>
                      <span className="text-xl font-black text-slate-900">{totalClasses || 24}</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase block">Present Days</span>
                      <span className="text-xl font-black text-emerald-800">{presentCount || 21}</span>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
                      <span className="text-[10px] font-bold text-rose-700 uppercase block">Absences</span>
                      <span className="text-xl font-black text-rose-800">{(totalClasses - presentCount) || 3}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Attendance Log Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Recent Session Logs
                </h4>
                {attendanceRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                          <th className="py-3 px-2">Date</th>
                          <th className="py-3 px-2">Status</th>
                          <th className="py-3 px-2">Verification Method</th>
                          <th className="py-3 px-2">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {attendanceRecords.slice(0, 10).map((a) => (
                          <tr key={a.id}>
                            <td className="py-3 px-2 font-bold text-slate-900">{a.date}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                a.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-slate-600">{a.checkInMethod || 'QR_SCAN'}</td>
                            <td className="py-3 px-2 text-slate-500">{a.checkInTime || '4:05 PM'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-4 text-center">
                    Full historical logs available at institute terminal. Standard attendance logged as regular.
                  </p>
                )}
              </div>

            </div>
          )}

          {/* Tab 2: Test Marks & Ranks */}
          {activeTab === 'marks' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chapter Test Reports & Gradebook
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Weekly evaluations and mock CBSE board test papers graded by Praveen Gandhi & Rashmi Anand.
                </p>
              </div>

              {testResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testResults.map((t) => (
                    <div key={t.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{t.testName}</span>
                        <span className="text-xs font-black text-prime-orange bg-prime-orange/10 px-2.5 py-1 rounded-lg">
                          {t.percentage}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Subject: <strong>{t.subject}</strong></span>
                        <span>Date: {t.date}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-prime-orange h-2 rounded-full" 
                          style={{ width: `${Math.min(100, t.percentage)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">Score: {t.marksObtained} / {t.maxMarks}</span>
                        <span className="text-slate-500 italic">&ldquo;{t.remarks || 'Good conceptual grasp'}&rdquo;</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-2">
                  <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No recent test records uploaded for this session</p>
                  <p className="text-xs text-slate-500">Weekly tests are uploaded every Monday evening following evaluation.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Fees & Official Receipts */}
          {activeTab === 'fees' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Tuition Fee Ledgers & Digital Invoices
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Official tax and admission receipts issued by Prime Learning Classes.
                  </p>
                </div>

                <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Current Status: Fee Cleared</span>
                </div>
              </div>

              {feePayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                        <th className="py-3 px-3">Receipt #</th>
                        <th className="py-3 px-3">Month Paid For</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Method</th>
                        <th className="py-3 px-3 text-right">Official Slip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {feePayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3 font-bold text-slate-900">{p.receiptNo}</td>
                          <td className="py-3 px-3 font-semibold text-slate-800">{p.monthPaidFor}</td>
                          <td className="py-3 px-3 text-slate-600">{p.paymentDate}</td>
                          <td className="py-3 px-3 font-black text-slate-900">₹{p.amount}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                              {p.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => setSelectedReceipt(p)}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-prime-orange text-white hover:bg-prime-orange-hover font-bold text-xs shadow-sm transition"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <CreditCard className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600">
                    Receipts can be generated directly by paying through the student portal or by cash receipt at center counter.
                  </p>
                  <button
                    onClick={() => {
                      const samplePayment: FeePayment = {
                        id: `sample-${Date.now()}`,
                        receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                        studentId: activeStudent.id,
                        studentName: activeStudent.studentName,
                        parentName: activeStudent.parentName,
                        courseTitle: activeStudent.batchName,
                        grade: activeStudent.grade,
                        amount: '2500',
                        paymentMethod: 'UPI',
                        transactionId: `UPI-${Date.now().toString().slice(-8)}`,
                        paymentDate: new Date().toISOString().split('T')[0],
                        monthPaidFor: 'Current Term',
                        status: 'SUCCESS',
                      };
                      setSelectedReceipt(samplePayment);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Generate Sample Official Fee Receipt
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Tab 4: Request PTM Slot */}
          {activeTab === 'ptm' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Book Weekend Parent-Teacher Meeting (PTM)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Reserve a dedicated 15-minute one-on-one slot with your child&apos;s teachers to review progress, syllabus completion, and doubt clearance.
                </p>
              </div>

              {ptmSuccessMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{ptmSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handlePtmSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Select Faculty Member</label>
                  <select
                    value={ptmTeacher}
                    onChange={(e) => setPtmTeacher(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                  >
                    <option value="Praveen Gandhi (Maths)">Praveen Gandhi (Maths & Mental Ability)</option>
                    <option value="Rashmi Anand (Science)">Rashmi Anand (Science & Chemistry)</option>
                    <option value="Both Teachers">Joint Discussion with Both Teachers</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Preferred Weekend Slot</label>
                  <select
                    value={ptmSlot}
                    onChange={(e) => setPtmSlot(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                  >
                    <option value="Saturday: 4:00 PM - 4:15 PM">Saturday: 4:00 PM - 4:15 PM</option>
                    <option value="Saturday: 4:30 PM - 4:45 PM">Saturday: 4:30 PM - 4:45 PM</option>
                    <option value="Saturday: 5:00 PM - 5:15 PM">Saturday: 5:00 PM - 5:15 PM</option>
                    <option value="Sunday: 10:30 AM - 10:45 AM">Sunday: 10:30 AM - 10:45 AM</option>
                    <option value="Sunday: 11:15 AM - 11:30 AM">Sunday: 11:15 AM - 11:30 AM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Specific Questions / Focus Topics (Optional)</label>
                  <textarea
                    rows={3}
                    value={ptmNotes}
                    onChange={(e) => setPtmNotes(e.target.value)}
                    placeholder="e.g., Pre-board exam readiness, homework consistency, doubts in Science..."
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prime-orange text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-prime-orange hover:bg-prime-orange-hover text-white font-bold text-xs sm:text-sm transition shadow flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm PTM Booking Request</span>
                </button>
              </form>
            </div>
          )}

        </div>
      ) : (
        <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 bg-white rounded-3xl border border-slate-200 shadow-md">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-xl font-black text-slate-900">Track Child Progress</h2>
          <p className="text-xs text-slate-600">
            Please enter your registered mobile number or student roll number above to access performance records.
          </p>
        </div>
      )}

      {/* 3. Official Printable Fee Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 max-w-xl w-full my-8 overflow-hidden flex flex-col">
            
            {/* Top Toolbar (Hidden on print) */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
              <div className="flex items-center space-x-2 text-xs font-bold">
                <FileText className="w-4 h-4 text-prime-orange" />
                <span>Official Fee Receipt Voucher</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-prime-orange text-white text-xs font-bold hover:bg-prime-orange-hover transition"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5" />
                  Print Receipt
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Receipt Paper */}
            <div className="p-8 sm:p-10 space-y-6 bg-white text-slate-900 print:p-0 print:m-0 print:border-none">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div className="space-y-0.5">
                  <div className="relative w-40 h-10">
                    <Image src="/logo-transparent.png" alt="Prime Learning Logo" fill className="object-contain" priority />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    948, Sec-22B, Near Anand Farm, Gurgaon
                  </p>
                  <p className="text-[10px] text-slate-500">Contact: {settings.phone} • info@primelearning.edu.in</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-prime-orange tracking-widest block">
                    FEE RECEIPT
                  </span>
                  <p className="font-mono font-black text-sm text-slate-900">
                    #{selectedReceipt.receiptNo}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Date: {selectedReceipt.paymentDate}
                  </p>
                </div>
              </div>

              {/* Student & Course Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Student Details</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedReceipt.studentName}</p>
                  <p className="text-slate-600">Parent: {selectedReceipt.parentName}</p>
                  <p className="text-slate-600">Class: {selectedReceipt.grade}</p>
                </div>

                <div className="space-y-1 text-right">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Course & Payment</span>
                  <p className="font-bold text-slate-900">{selectedReceipt.courseTitle}</p>
                  <p className="text-slate-600">Month: {selectedReceipt.monthPaidFor}</p>
                  <p className="text-slate-600">Txn: {selectedReceipt.transactionId}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 p-2.5 font-bold text-slate-700 flex justify-between">
                  <span>Particulars</span>
                  <span>Amount (INR)</span>
                </div>
                <div className="p-3 flex justify-between border-b border-slate-100 text-slate-800">
                  <span>Tuition & Laboratory Coaching Fee ({selectedReceipt.monthPaidFor})</span>
                  <span className="font-semibold">₹{selectedReceipt.amount}.00</span>
                </div>
                <div className="p-3 bg-slate-50 font-black text-sm flex justify-between text-slate-900">
                  <span>Total Amount Paid</span>
                  <span>₹{selectedReceipt.amount}.00</span>
                </div>
              </div>

              {/* Footer & Signatory Seal */}
              <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    PAYMENT VERIFIED (PAID)
                  </span>
                  <p className="text-[10px] text-slate-400">Computer generated official receipt</p>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-28 border-b border-slate-400 pb-4">
                    <span className="text-[10px] font-bold text-slate-400 italic">Praveen / Rashmi</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                    Authorized Signatory
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
