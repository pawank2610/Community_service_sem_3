'use client';

import React, { useState } from 'react';
import { User, Calendar, CheckCircle2, FileText, Download, MessageSquare, Bell, Award, Sparkles, QrCode } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import QRScannerModal from '@/components/QRScannerModal';

export default function StudentDashboardView() {
  const settings = db.getSettings();
  const students = db.getStudents();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const student = students[0] || {
    id: 'std-1',
    studentName: 'Rohan Mehta',
    parentName: 'Sunil Mehta',
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
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover transition shadow flex items-center space-x-2 animate-bounce-slow"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Classroom QR</span>
            </button>

            <a
              href={teacherWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition shadow flex items-center space-x-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Teacher</span>
            </a>
            <a href="/" className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white">
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

          {/* Right Column (4 cols): Announcements & Study Resources */}
          <div className="lg:col-span-4 space-y-6">
            
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

        <QRScannerModal
          student={student}
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onSuccess={() => {
            setRefreshKey(k => k + 1);
          }}
        />

      </div>
    </div>
  );
}
