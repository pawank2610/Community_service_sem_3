'use client';

import React, { useState } from 'react';
import { User, Calendar, CheckCircle2, FileText, Download, MessageSquare, Bell, Award, Sparkles, QrCode, CreditCard, Clock, Brain, AlertTriangle, ChevronRight, Video, HelpCircle, Printer, Target, BookOpen } from 'lucide-react';
import { db, getBadges, getLeaveRequests, getVideoLessons, getDoubts, getQuizResults } from '@/lib/db';
import { getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import QRScannerModal from '@/components/QRScannerModal';
import FeePaymentModal from '@/components/FeePaymentModal';
import LeaveRequestModal from '@/components/LeaveRequestModal';
import PracticeQuizModal from '@/components/PracticeQuizModal';
import ReportCardModal from '@/components/ReportCardModal';
import DoubtResolverModal from '@/components/DoubtResolverModal';

export default function StudentDashboardView() {
  const [mounted, setMounted] = useState(false);
  const settings = db.getSettings();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [reportCardOpen, setReportCardOpen] = useState(false);
  const [doubtModalOpen, setDoubtModalOpen] = useState(false);
  const [videoVaultOpen, setVideoVaultOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const students = mounted ? db.getStudents() : [];
  const student = students[0] || {
    id: 'std-1',
    studentName: 'Bhavya Anand',
    parentName: 'Rashmi Anand',
    grade: 'Class 10',
    subjects: ['Mathematics'],
    batchName: 'Batch M10-A (Class 10 Math)',
    teacherName: 'Praveen Gandhi',
  };

  const attendance = db.getAttendance().filter(a => a.studentId === student.id);
  const testResults = db.getTestResults().filter(t => t.studentId === student.id);
  const announcements = db.getAnnouncements();
  const materials = db.getStudyMaterials();

  const totalClasses = attendance.length || 10;
  const presentClasses = attendance.filter(a => a.status === 'Present').length || 9;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  const avgMarks = testResults.length 
    ? Math.round(testResults.reduce((acc, curr) => acc + curr.percentage, 0) / testResults.length)
    : 88;

  const teacherWaUrl = getWhatsAppLink(settings.whatsappNumber, CONTEXTUAL_WA_MESSAGES.teacherEnquiry(student.teacherName));

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-prime-orange text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white/20">
              {student.studentName.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                STUDENT & PARENT PORTAL
              </span>
              <h1 className="text-2xl font-black text-white mt-1">Welcome back, {student.studentName}!</h1>
              <p className="text-xs text-slate-300">
                Parent: <strong>{student.parentName}</strong> • {student.grade} ({student.batchName})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setScannerOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow flex items-center space-x-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR</span>
            </button>

            <button
              onClick={() => setQuizModalOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-amber-500 hover:bg-amber-400 transition shadow flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Quiz</span>
            </button>

            <button
              onClick={() => setDoubtModalOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition shadow flex items-center space-x-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Doubt</span>
            </button>

            <button
              onClick={() => setReportCardOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 transition border border-slate-700 flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>PTM Report</span>
            </button>

            <button
              onClick={() => setFeeModalOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center space-x-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Fee (UPI)</span>
            </button>

            <button
              onClick={() => setLeaveModalOpen(true)}
              className="px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition shadow flex items-center space-x-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Leave</span>
            </button>

            <a href="/" className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white">
              Exit
            </a>
          </div>
        </div>

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Attendance Rate</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{attendancePercentage}%</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">{presentClasses} of {totalClasses} classes attended</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Average Test Score</div>
              <div className="text-2xl font-black text-prime-orange mt-1">{avgMarks}%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Based on chapter tests</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-prime-orange-light text-prime-orange flex items-center justify-center font-black">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Assigned Faculty</div>
              <div className="text-lg font-bold text-slate-900 mt-1">{student.teacherName}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Primary Educator</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Test Results & Attendance History */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Test Results Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <FileText className="w-5 h-5 text-prime-orange mr-2" />
                  Recent Performance & Test Scores
                </h3>
                <span className="text-xs text-slate-400 font-semibold">{testResults.length} Tests Logged</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Test Name & Date</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Percentage</th>
                      <th className="p-3">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {testResults.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{t.testName}</div>
                          <div className="text-[10px] text-slate-400">{t.date}</div>
                        </td>
                        <td className="p-3 font-semibold">{t.subject}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {t.marksObtained} / {t.maxMarks}
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            t.percentage >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {t.percentage}%
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 italic max-w-xs">{t.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Learning Analytics & Weak Area Insights */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-indigo-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center">
                      AI Learning Analytics & Mastery Insights
                    </h3>
                    <p className="text-[11px] text-indigo-200">Powered by Praveen Gandhi & Rashmi Anand's Curriculum Engine</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Real-time AI Diagnosis</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex justify-between">
                    <span>Topic Mastery Breakdown</span>
                    <span className="text-emerald-400">88% Overall</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Quadratic & Polynomials</span>
                        <span className="font-bold text-emerald-400">95% (Strong)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Trigonometry & Heights</span>
                        <span className="font-bold text-amber-400">72% (Requires Practice)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Chemical Reactions & Equations</span>
                        <span className="font-bold text-emerald-400">90% (Strong)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-800/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Weak Area Alert & Action Plan</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      AI identified low performance in <strong>Trigonometrical Identities & Heights</strong>. We recommend taking the targeted practice sheet before next Monday's test.
                    </p>
                  </div>

                  <a
                    href={materials[0]?.downloadUrl || '#'}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Recommended Practice Sheet</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CBSE Board Exam Score Predictor & Target Setter */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl border border-blue-800/40 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30 text-blue-300">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">CBSE Board Exam Rank Predictor</h3>
                    <p className="text-[11px] text-blue-200">Based on past test performance & unit test series</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Predicted: {Math.min(96, avgMarks + 5)}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] block font-bold uppercase">Maths Forecast</span>
                  <span className="text-sm font-black text-amber-400">92 / 100</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Praveen Sir Target</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] block font-bold uppercase">Science Forecast</span>
                  <span className="text-sm font-black text-emerald-400">94 / 100</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Rashmi Ma'am Target</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] block font-bold uppercase">Recommended Action</span>
                  <span className="text-xs font-bold text-indigo-300">Take Trigonometry Practice Quiz</span>
                </div>
              </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2" />
                Attendance Log
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {attendance.map((att) => (
                  <div key={att.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="text-[11px] font-bold text-slate-900">{att.date}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      att.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {att.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Video Vault, Announcements, Study Resources */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recorded Class Video Vault */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <Video className="w-5 h-5 text-indigo-600 mr-2" />
                  Recorded Class Vault
                </h3>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {getVideoLessons().length} Lessons
                </span>
              </div>

              <div className="space-y-3">
                {getVideoLessons().map((vid) => (
                  <div key={vid.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="font-bold text-slate-900 leading-tight">{vid.title}</div>
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>{vid.subject} • {vid.duration}</span>
                      <span className="font-semibold text-slate-700">{vid.teacherName}</span>
                    </div>
                    <div className="pt-1 flex items-center space-x-2">
                      <a
                        href={vid.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] flex items-center space-x-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>Watch Video</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gamified Badges */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <Award className="w-5 h-5 text-amber-500 mr-2" />
                  Gamified Achievement Badges
                </h3>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Rank #2
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {getBadges(student.id).map((badge) => (
                  <div
                    key={badge.id}
                    className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/50 to-orange-50/50 border border-amber-200/80 text-center space-y-1 hover:scale-105 transition-transform"
                  >
                    <div className="text-2xl">{badge.iconName === 'CheckCircle2' ? '🌟' : badge.iconName === 'Sparkles' ? '📐' : '🧪'}</div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">{badge.title}</div>
                    <div className="text-[9px] text-slate-500 line-clamp-1">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Requests Status */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                  Leave & Makeup Class Status
                </h3>
                <button
                  onClick={() => setLeaveModalOpen(true)}
                  className="text-xs text-indigo-600 font-bold hover:underline"
                >
                  + Apply
                </button>
              </div>

              {getLeaveRequests(student.id).length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl text-center">
                  No leave requests submitted yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {getLeaveRequests(student.id).map((lr) => (
                    <div key={lr.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{lr.startDate} to {lr.endDate}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lr.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                          lr.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {lr.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{lr.reason}</p>
                      {lr.makeupDate && (
                        <div className="mt-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">
                          🗓️ Makeup: {lr.makeupDate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Announcements */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <Bell className="w-5 h-5 text-amber-500 mr-2" />
                Class Announcements
              </h3>

              <div className="space-y-3">
                {announcements.map((anc) => (
                  <div key={anc.id} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900">{anc.title}</div>
                    <p className="text-slate-600 leading-relaxed">{anc.content}</p>
                    <div className="text-[10px] text-amber-800 font-semibold pt-1">
                      Posted by {anc.author} • {anc.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Materials */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <Download className="w-5 h-5 text-blue-600 mr-2" />
                Study Resources
              </h3>

              <div className="space-y-2">
                {materials.map((mat) => (
                  <div key={mat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{mat.title}</div>
                      <div className="text-[10px] text-slate-500">{mat.subject} • {mat.fileType}</div>
                    </div>
                    <a href={mat.downloadUrl} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-[10px]">
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modals */}
        <QRScannerModal
          student={student}
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onSuccess={() => {
            setRefreshKey(k => k + 1);
          }}
        />

        <FeePaymentModal
          isOpen={feeModalOpen}
          onClose={() => setFeeModalOpen(false)}
          studentId={student.id}
          studentName={student.studentName}
          studentClass={student.grade}
          monthlyFee={3500}
          onPaymentSuccess={() => {
            setRefreshKey(k => k + 1);
          }}
        />

        <LeaveRequestModal
          isOpen={leaveModalOpen}
          onClose={() => setLeaveModalOpen(false)}
          studentId={student.id}
          studentName={student.studentName}
          studentClass={student.grade}
          onSubmitted={() => {
            setRefreshKey(k => k + 1);
          }}
        />

        <PracticeQuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          studentId={student.id}
          studentName={student.studentName}
          subject="Mathematics"
          onCompleted={() => {
            setRefreshKey(k => k + 1);
          }}
        />

        <ReportCardModal
          isOpen={reportCardOpen}
          onClose={() => setReportCardOpen(false)}
          student={student}
        />

        <DoubtResolverModal
          isOpen={doubtModalOpen}
          onClose={() => setDoubtModalOpen(false)}
          studentId={student.id}
          studentName={student.studentName}
          studentClass={student.grade}
          onSubmitted={() => {
            setRefreshKey(k => k + 1);
          }}
        />

      </div>
    </div>
  );
}
