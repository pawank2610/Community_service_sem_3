'use client';

import React, { useState } from 'react';
import { Users, CheckCircle2, FileText, Calendar, BookOpen, User, QrCode, MessageSquare, Clock, Check, X, HelpCircle, Send } from 'lucide-react';
import { db, getLeaveRequests, updateLeaveStatus, getDoubts, replyDoubt } from '@/lib/db';
import { Student, Batch } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/constants';
import QRAttendanceModal from '@/components/QRAttendanceModal';

export default function TeacherDashboardView() {
  const [activeTab, setActiveTab] = useState<'batches' | 'attendance' | 'marks' | 'leaves' | 'doubts'>('batches');
  const batches = db.getBatches();
  const students = db.getStudents();
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent'>>({});
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const [testForm, setTestForm] = useState({
    testName: 'Chapter 4 Physics Numerical Test',
    subject: 'Science',
    studentId: students[0]?.id || '',
    maxMarks: 50,
    marksObtained: 42,
    remarks: 'Clear ray diagram steps.',
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleReplyDoubt = (doubtId: string) => {
    const replyText = prompt('Enter solution explanation for student doubt:', 'Use discriminant D = b^2 - 4ac. If D >= 0, roots are real.');
    if (replyText) {
      replyDoubt(doubtId, replyText, 'Praveen Gandhi / Rashmi Anand');
      setMessage('Solution posted for student doubt!');
      setRefreshKey(k => k + 1);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleApproveLeave = (leaveId: string, makeupText: string) => {
    updateLeaveStatus(leaveId, 'APPROVED', makeupText || 'Sunday 11:00 AM Special Doubt Class');
    setMessage('Leave request approved & makeup class assigned!');
    setRefreshKey(k => k + 1);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRejectLeave = (leaveId: string) => {
    updateLeaveStatus(leaveId, 'REJECTED');
    setMessage('Leave request rejected.');
    setRefreshKey(k => k + 1);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveAttendance = () => {
    const batchStudents = students.filter(s => s.batchId === selectedBatchId);
    const records = batchStudents.map(s => ({
      studentId: s.id,
      studentName: s.studentName,
      batchId: selectedBatchId,
      date: attendanceDate,
      status: attendanceMap[s.id] || 'Present',
    }));
    db.recordAttendance(records);
    setMessage('Attendance successfully logged.');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === testForm.studentId);
    if (!st) return;
    db.addTestResult({
      testName: testForm.testName,
      subject: testForm.subject,
      studentId: st.id,
      studentName: st.studentName,
      grade: st.grade,
      date: new Date().toISOString().split('T')[0],
      maxMarks: Number(testForm.maxMarks),
      marksObtained: Number(testForm.marksObtained),
      remarks: testForm.remarks,
    });
    setMessage(`Score logged for ${st.studentName}`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-prime-orange/20 border border-prime-orange flex items-center justify-center">
              <User className="w-8 h-8 text-prime-orange" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/10 px-2 py-0.5 rounded">
                TEACHER PORTAL
              </span>
              <h1 className="text-xl font-extrabold text-white mt-0.5">Faculty Dashboard</h1>
              <p className="text-xs text-slate-300">Manage assigned batches, attendance, and student marks</p>
            </div>
          </div>

          <a href="/" className="text-xs font-semibold text-slate-400 hover:text-white">
            ← Exit Portal
          </a>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'batches', label: 'My Batches', icon: BookOpen },
            { id: 'attendance', label: 'Mark Batch Attendance', icon: CheckCircle2 },
            { id: 'marks', label: 'Enter Test Scores', icon: FileText },
            { id: 'leaves', label: 'Leave Requests & Makeup', icon: Clock },
            { id: 'doubts', label: `Student Doubts (${getDoubts().filter(d=>d.status==='PENDING').length})`, icon: HelpCircle },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === tab.id 
                  ? 'bg-prime-orange text-white shadow' 
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: BATCHES */}
        {activeTab === 'batches' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batches.map(b => (
              <div key={b.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-prime-orange bg-prime-orange-light px-2.5 py-0.5 rounded">
                  {b.grade}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Subject: {b.subject}</div>
                  <div>Schedule: {b.days} ({b.startTime} - {b.endTime})</div>
                  <div>Room: {b.room}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Mark & Track Attendance</h2>
                <p className="text-xs text-slate-500">Supports live QR Code self-scanning and manual overrides</p>
              </div>

              {selectedBatch && (
                <button
                  onClick={() => setQrModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4 text-prime-orange" />
                  <span>Project Batch QR Code</span>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Batch</label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                />
              </div>
            </div>

            <div className="space-y-2 max-w-lg">
              {students
                .filter(s => s.batchId === selectedBatchId)
                .map(st => {
                  const status = attendanceMap[st.id] || 'Present';
                  const waText = `Dear Parent (${st.parentName}), this is from Prime Learning Classes Gurgaon. Attendance alert for ${st.studentName} on ${attendanceDate}: marked ${status.toUpperCase()}.`;
                  const waUrl = getWhatsAppLink('919876543210', waText);

                  return (
                    <div key={st.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{st.studentName}</span>
                        <div className="text-[10px] text-slate-500">Parent: {st.parentName}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'Present' })}
                          className={`px-3 py-1 rounded-lg font-bold text-xs ${
                            status === 'Present' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'Absent' })}
                          className={`px-3 py-1 rounded-lg font-bold text-xs ${
                            status === 'Absent' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Absent
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition font-bold flex items-center space-x-1"
                          title="Send 1-Click WhatsApp Parent Alert"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[10px]">WA Alert</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>

            <button
              onClick={handleSaveAttendance}
              className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover shadow transition"
            >
              Save Batch Attendance
            </button>
          </div>
        )}

        {/* TAB 3: MARKS */}
        {activeTab === 'marks' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm max-w-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Enter Student Test Marks</h2>
            
            <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Test Name *</label>
                <input
                  type="text"
                  required
                  value={testForm.testName}
                  onChange={(e) => setTestForm({ ...testForm, testName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Student *</label>
                <select
                  value={testForm.studentId}
                  onChange={(e) => setTestForm({ ...testForm, studentId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.studentName} ({s.grade})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={testForm.maxMarks}
                    onChange={(e) => setTestForm({ ...testForm, maxMarks: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Marks Obtained</label>
                  <input
                    type="number"
                    value={testForm.marksObtained}
                    onChange={(e) => setTestForm({ ...testForm, marksObtained: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Teacher Remarks</label>
                <textarea
                  rows={2}
                  value={testForm.remarks}
                  onChange={(e) => setTestForm({ ...testForm, remarks: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover shadow transition"
                >
                  Log Test Score
                </button>

                {testForm.studentId && (
                  <a
                    href={getWhatsAppLink('919876543210', `Dear Parent, ${students.find(s=>s.id===testForm.studentId)?.studentName} scored ${testForm.marksObtained}/${testForm.maxMarks} in ${testForm.testName} (${testForm.subject}). Remarks: ${testForm.remarks}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow transition flex items-center space-x-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send WhatsApp Mark Alert</span>
                  </a>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: LEAVE REQUESTS & MAKEUP CLASS SCHEDULER */}
        {activeTab === 'leaves' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Student Leave & Automated Makeup Class Portal</h2>
              <p className="text-xs text-slate-500">Review student absence notifications and schedule makeup doubt sessions</p>
            </div>

            <div className="space-y-4">
              {getLeaveRequests().length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 italic bg-slate-50 rounded-2xl">
                  No student leave applications found.
                </div>
              ) : (
                getLeaveRequests().map((leave) => (
                  <div key={leave.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{leave.studentName}</span>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {leave.grade}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                          leave.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {leave.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>Leave Duration:</strong> {leave.startDate} to {leave.endDate}
                      </p>
                      <p className="text-xs text-slate-500 italic">
                        "{leave.reason}"
                      </p>
                      {leave.makeupDate && (
                        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 inline-block mt-1">
                          🗓️ Assigned Makeup: {leave.makeupDate}
                        </div>
                      )}
                    </div>

                    {leave.status === 'PENDING' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            const schedule = prompt('Enter Makeup Class Schedule for ' + leave.studentName + ':', 'Sunday 11:00 AM Doubt Batch');
                            if (schedule !== null) handleApproveLeave(leave.id, schedule);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 shadow transition"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve & Schedule</span>
                        </button>

                        <button
                          onClick={() => handleRejectLeave(leave.id)}
                          className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center space-x-1 transition"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT DOUBTS RESOLVER DESK */}
        {activeTab === 'doubts' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Student Academic Doubt Resolver Desk</h2>
              <p className="text-xs text-slate-500">Post step-by-step solutions to student queries in Mathematics & Science</p>
            </div>

            <div className="space-y-4">
              {getDoubts().length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 italic bg-slate-50 rounded-2xl">
                  No student doubts submitted.
                </div>
              ) : (
                getDoubts().map((doubt) => (
                  <div key={doubt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{doubt.studentName}</span>
                        <span className="text-xs text-slate-500 ml-2">({doubt.grade})</span>
                        <div className="text-xs font-bold text-prime-orange">{doubt.subject} • {doubt.topic}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border self-start sm:self-auto ${
                        doubt.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {doubt.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-800 font-medium bg-white p-3 rounded-xl border border-slate-200">
                      <strong>Question:</strong> "{doubt.questionText}"
                    </div>

                    {doubt.teacherReply ? (
                      <div className="text-xs text-indigo-900 bg-indigo-50 p-3 rounded-xl border border-indigo-100 space-y-1">
                        <div className="font-bold text-[11px] text-indigo-700">Solution by {doubt.repliedBy}:</div>
                        <p className="leading-relaxed">{doubt.teacherReply}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleReplyDoubt(doubt.id)}
                        className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-prime-orange text-white font-bold text-xs shadow transition flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Solution Step</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {selectedBatch && (
          <QRAttendanceModal
            batch={selectedBatch}
            isOpen={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
          />
        )}

      </div>
    </div>
  );
}
