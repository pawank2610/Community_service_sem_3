"use client";

import React from 'react';
import { X, Printer, Award, CheckCircle2, FileText, Download, User, Calendar, BookOpen } from 'lucide-react';
import { Student, TestResult, AttendanceRecord } from '@/lib/types';
import { db } from '@/lib/db';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export default function ReportCardModal({ isOpen, onClose, student }: ReportCardModalProps) {
  if (!isOpen) return null;

  const testResults = db.getTestResults().filter(t => t.studentId === student.id);
  const attendance = db.getAttendance().filter(a => a.studentId === student.id);
  const settings = db.getSettings();

  const totalClasses = attendance.length || 10;
  const presentClasses = attendance.filter(a => a.status === 'Present').length || 9;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  const avgMarks = testResults.length 
    ? Math.round(testResults.reduce((acc, curr) => acc + curr.percentage, 0) / testResults.length)
    : 88;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-8 border border-slate-200">
        
        {/* Modal Top Actions Bar */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-prime-orange" />
            <h3 className="font-bold text-sm">Official PTM Student Progress Certificate</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-prime-orange hover:bg-prime-orange-hover text-white font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Card Sheet */}
        <div className="p-8 sm:p-12 space-y-8 print:p-0">
          
          {/* Header & Institute Info */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-black tracking-widest text-prime-orange uppercase">
                ACADEMIC PERFORMANCE REPORT CARD
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">PRIME LEARNING CLASSES</h1>
              <p className="text-xs text-slate-600 font-semibold">
                948, Sec-22B, Near Anand Farm, Gurgaon • Contact: +91 98109 89437
              </p>
            </div>

            <div className="text-right sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-prime-orange pl-3 sm:pl-0 sm:pr-4">
              <div className="text-xs font-bold text-slate-500 uppercase">Session</div>
              <div className="text-base font-black text-slate-900">2026 - 2027</div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                Verified Institute Seal
              </div>
            </div>
          </div>

          {/* Student Demographics Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Student Name</span>
              <strong className="text-slate-900 text-sm">{student.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Parent / Guardian</span>
              <strong className="text-slate-900 text-sm">{student.parentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Grade & Batch</span>
              <strong className="text-slate-900 text-sm">{student.grade}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Primary Educators</span>
              <strong className="text-prime-orange text-sm">Praveen Gandhi & Rashmi Anand</strong>
            </div>
          </div>

          {/* Attendance & Grade Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800">Attendance Percentage</span>
                <div className="text-2xl font-black text-emerald-900 mt-1">{attendancePercentage}%</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{presentClasses} of {totalClasses} classes attended</div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-80" />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-800">Cumulative Academic Average</span>
                <div className="text-2xl font-black text-amber-900 mt-1">{avgMarks}%</div>
                <div className="text-[10px] text-amber-700 font-semibold">Grade Grade A+ (Outstanding)</div>
              </div>
              <Award className="w-8 h-8 text-amber-600 opacity-80" />
            </div>
          </div>

          {/* Detailed Test Scores Log */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center">
              <FileText className="w-4 h-4 text-prime-orange mr-1.5" />
              Chapter Unit Test Performance
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Test Name & Date</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Marks Obtained</th>
                    <th className="p-3">Percentage</th>
                    <th className="p-3">Faculty Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testResults.map((t) => (
                    <tr key={t.id}>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{t.testName}</div>
                        <div className="text-[10px] text-slate-400">{t.date}</div>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{t.subject}</td>
                      <td className="p-3 font-bold">{t.marksObtained} / {t.maxMarks}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                          {t.percentage}%
                        </span>
                      </td>
                      <td className="p-3 italic text-slate-600">{t.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Remarks & Signatures */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 items-end">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Class Teacher Feedback</span>
              <p className="text-xs text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                "{student.studentName} shows excellent conceptual clarity in Mathematics and Science. Attendance is consistent and homework submittals are prompt."
              </p>
            </div>

            <div className="flex justify-between items-center text-center">
              <div>
                <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">Praveen Gandhi</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase border-t border-slate-300 pt-1">
                  Faculty (Maths)
                </div>
              </div>
              <div>
                <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">Rashmi Anand</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase border-t border-slate-300 pt-1">
                  Faculty (Science)
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
