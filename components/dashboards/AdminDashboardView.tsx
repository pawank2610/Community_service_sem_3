'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, GraduationCap, CheckCircle2, Phone, Calendar, 
  BookOpen, Clock, Settings, Plus, Filter, Search, FileText, BarChart3, Edit, Save, ArrowRight, QrCode
} from 'lucide-react';
import { db } from '@/lib/db';
import { 
  Enquiry, TrialRegistration, Student, Batch, Course, Teacher, 
  AttendanceRecord, TestResult, InstituteSettings, EnquiryStatus, TrialStatus 
} from '@/lib/types';
import { getWhatsAppLink, getTelLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import QRAttendanceModal from '@/components/QRAttendanceModal';

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'trials' | 'students' | 'batches' | 'courses' | 'attendance' | 'marks' | 'settings'>('overview');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [trials, setTrials] = useState<TrialRegistration[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [settings, setSettings] = useState<InstituteSettings>(db.getSettings());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<string>('All');
  const [trialFilter, setTrialFilter] = useState<string>('All');

  // Attendance Form State
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent'>>({});

  // Test Mark Form State
  const [testForm, setTestForm] = useState({
    testName: 'Mid-Term Algebra Quiz',
    subject: 'Mathematics',
    grade: 'Class 10',
    studentId: '',
    maxMarks: 50,
    marksObtained: 45,
    remarks: 'Great concept understanding.',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setEnquiries(db.getEnquiries());
    setTrials(db.getTrials());
    setStudents(db.getStudents());
    setBatches(db.getBatches());
    setCourses(db.getCourses());
    setSettings(db.getSettings());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status Handlers
  const handleUpdateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    db.updateEnquiryStatus(id, status);
    refreshData();
    showToast(`Enquiry status updated to ${status}`);
  };

  const handleUpdateTrialStatus = (id: string, status: TrialStatus) => {
    db.updateTrialStatus(id, status);
    refreshData();
    showToast(`Trial status updated to ${status}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings(settings);
    refreshData();
    showToast('Institute settings updated successfully!');
  };

  // Attendance Save
  const handleSaveAttendance = () => {
    if (!selectedBatchId) {
      alert('Please select a batch first.');
      return;
    }
    const batchStudents = students.filter(s => s.batchId === selectedBatchId);
    const records = batchStudents.map(s => ({
      studentId: s.id,
      studentName: s.studentName,
      batchId: selectedBatchId,
      date: attendanceDate,
      status: attendanceMap[s.id] || 'Present',
    }));

    db.recordAttendance(records);
    showToast(`Attendance recorded for ${records.length} students.`);
  };

  // Test Result Save
  const handleAddTestResult = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === testForm.studentId);
    if (!st) {
      alert('Please select a student.');
      return;
    }

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

    showToast(`Marks saved for ${st.studentName}`);
    refreshData();
  };

  // Statistics calculation
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const pendingTrialsCount = trials.filter(t => t.status === 'Registered' || t.status === 'Scheduled').length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-prime-orange flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-prime-orange bg-prime-orange/10 px-2 py-0.5 rounded">
              ADMIN CONTROL PANEL
            </span>
            <h2 className="text-xl font-black text-white mt-1">Prime Learning</h2>
            <p className="text-xs text-slate-400">Institute Management Portal</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
              { id: 'enquiries', label: `Enquiries (${newEnquiriesCount})`, icon: MessageSquare, badge: newEnquiriesCount > 0 },
              { id: 'trials', label: `Free Trials (${pendingTrialsCount})`, icon: GraduationCap, badge: pendingTrialsCount > 0 },
              { id: 'students', label: `Students (${students.length})`, icon: Users },
              { id: 'batches', label: 'Batches & Timings', icon: Clock },
              { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
              { id: 'attendance', label: 'Mark Attendance', icon: CheckCircle2 },
              { id: 'marks', label: 'Test Results & Marks', icon: FileText },
              { id: 'settings', label: 'CMS & Settings', icon: Settings },
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-prime-orange text-white shadow-md' 
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
          <div>Signed in as <strong>Admin</strong></div>
          <a href="/" className="text-prime-orange hover:underline block mt-1">← Return to Main Website</a>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Admin Dashboard Overview</h1>
              <p className="text-xs text-slate-500">Live operational metrics and enquiry pipeline stats</p>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">New Enquiries</div>
                <div className="text-3xl font-black text-slate-900 mt-2">{newEnquiriesCount}</div>
                <div className="text-[11px] text-amber-600 font-semibold mt-1">Requires follow-up</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">Trial Registrations</div>
                <div className="text-3xl font-black text-slate-900 mt-2">{trials.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">{pendingTrialsCount} pending schedule</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">Active Students</div>
                <div className="text-3xl font-black text-slate-900 mt-2">{activeStudentsCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">Enrolled across 3 batches</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">Available Trial Slots</div>
                <div className="text-3xl font-black text-prime-orange mt-2">{settings.trialSlotsAvailable}</div>
                <div className="text-[11px] text-slate-500 mt-1">Configurable in settings</div>
              </div>
            </div>

            {/* Recent Enquiries & Trials Table Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Enquiries Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Website Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs text-prime-orange font-bold hover:underline">
                    View All ({enquiries.length}) &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 4).map((enq) => (
                    <div key={enq.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{enq.name}</div>
                        <div className="text-slate-500">{enq.grade} • {enq.subject} • {enq.phone}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        enq.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Trial Requests Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Free Trial Requests</h3>
                  <button onClick={() => setActiveTab('trials')} className="text-xs text-prime-orange font-bold hover:underline">
                    View All ({trials.length}) &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {trials.slice(0, 4).map((tr) => (
                    <div key={tr.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{tr.studentName} (Parent: {tr.parentName})</div>
                        <div className="text-slate-500">{tr.grade} • {tr.subject} • Teacher: {tr.preferredTeacher}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        {tr.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES CRM */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Enquiry CRM Pipeline</h1>
                <p className="text-xs text-slate-500">Track lead inquiries and contact status</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={enquiryFilter}
                  onChange={(e) => setEnquiryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Trial Scheduled">Trial Scheduled</option>
                  <option value="Trial Completed">Trial Completed</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Not Interested">Not Interested</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Name & Date</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Message / Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries
                    .filter(e => enquiryFilter === 'All' || e.status === enquiryFilter)
                    .map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50/80">
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{enq.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4 font-semibold">{enq.phone}</td>
                        <td className="p-4">
                          <span className="font-bold text-slate-900">{enq.grade}</span> - {enq.subject}
                        </td>
                        <td className="p-4 max-w-xs truncate text-slate-500">
                          {enq.notes || enq.message || 'No notes'}
                        </td>
                        <td className="p-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Trial Scheduled">Trial Scheduled</option>
                            <option value="Trial Completed">Trial Completed</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Not Interested">Not Interested</option>
                          </select>
                        </td>
                        <td className="p-4 flex items-center space-x-2">
                          <a
                            href={getTelLink(enq.phone)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                            title="Call Student"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={getWhatsAppLink(enq.phone, CONTEXTUAL_WA_MESSAGES.general)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRIAL REGISTRATIONS */}
        {activeTab === 'trials' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Free Trial Class Registrations</h1>
              <p className="text-xs text-slate-500">Manage free trial class requests and scheduled sessions</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Student & Parent</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4">Teacher & Timing</th>
                    <th className="p-4">Trial Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trials.map((tr) => (
                    <tr key={tr.id} className="hover:bg-slate-50/80">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{tr.studentName}</div>
                        <div className="text-slate-400">Parent: {tr.parentName}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold">{tr.grade}</span> ({tr.subject})
                      </td>
                      <td className="p-4 font-semibold">{tr.phone}</td>
                      <td className="p-4">
                        <div>{tr.preferredTeacher}</div>
                        <div className="text-[10px] text-slate-500">{tr.preferredTiming}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">
                        {tr.trialDate || 'Not set'}
                      </td>
                      <td className="p-4">
                        <select
                          value={tr.status}
                          onChange={(e) => handleUpdateTrialStatus(tr.id, e.target.value as TrialStatus)}
                          className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Registered">Registered</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Attended">Attended</option>
                          <option value="Absent">Absent</option>
                          <option value="Converted">Converted</option>
                          <option value="Not Converted">Not Converted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Enrolled Students Directory</h1>
              <p className="text-xs text-slate-500">Student master records, batch allocations, and status</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Parent Name</th>
                    <th className="p-4">Class</th>
                    <th className="p-4">Assigned Batch</th>
                    <th className="p-4">Teacher</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-bold text-slate-900">{st.studentName}</td>
                      <td className="p-4">{st.parentName} ({st.phone})</td>
                      <td className="p-4 font-bold text-prime-orange">{st.grade}</td>
                      <td className="p-4 text-slate-600">{st.batchName}</td>
                      <td className="p-4 font-semibold">{st.teacherName}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: BATCHES */}
        {activeTab === 'batches' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Batch Scheduling</h1>
              <p className="text-xs text-slate-500">Current batch capacity, timings, and rooms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batches.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-prime-orange bg-prime-orange-light px-2.5 py-0.5 rounded">
                      {b.grade}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {b.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Teacher: <strong>{b.teacherName}</strong></div>
                    <div>Days: {b.days} ({b.startTime} - {b.endTime})</div>
                    <div>Room: {b.room}</div>
                    <div>Capacity: {b.enrolledCount} / {b.maxStudents} students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COURSES & FEES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Courses & Monthly Fees</h1>
              <p className="text-xs text-slate-500">Public course offerings, seat availability, and fee structure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">{c.grade}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {c.monthlyFee}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{c.subject}</h3>
                  <p className="text-xs text-slate-600">{c.description}</p>
                  <div className="text-[11px] font-semibold text-slate-500 pt-2">
                    Timing: {c.batchTiming}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MARK ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Batch Attendance Tracker</h1>
                <p className="text-xs text-slate-500">Supports live QR Code self-scanning and manual overrides</p>
              </div>

              {selectedBatchId && batches.find(b => b.id === selectedBatchId) && (
                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4 text-prime-orange" />
                  <span>Project Batch QR Code</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Batch *</label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="">-- Choose Batch --</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date *</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                />
              </div>
            </div>

            {selectedBatchId && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Student Attendance List</h3>
                <div className="space-y-2 max-w-xl">
                  {students
                    .filter(s => s.batchId === selectedBatchId)
                    .map(st => (
                      <div key={st.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <span className="font-bold text-slate-900">{st.studentName} ({st.grade})</span>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'Present' })}
                            className={`px-3 py-1 rounded-lg font-bold text-xs ${
                              (attendanceMap[st.id] || 'Present') === 'Present' 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'Absent' })}
                            className={`px-3 py-1 rounded-lg font-bold text-xs ${
                              attendanceMap[st.id] === 'Absent' 
                                ? 'bg-rose-600 text-white' 
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <button
                  onClick={handleSaveAttendance}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover shadow-md transition"
                >
                  Save Attendance Records
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: MARKS & TEST RESULTS */}
        {activeTab === 'marks' && (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Enter Test Results & Remarks</h1>
              <p className="text-xs text-slate-500">Record assessment scores and detailed teacher feedback</p>
            </div>

            <form onSubmit={handleAddTestResult} className="space-y-4 text-xs">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Select Student *</label>
                  <select
                    value={testForm.studentId}
                    onChange={(e) => setTestForm({ ...testForm, studentId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  >
                    <option value="">-- Select Student --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.studentName} ({s.grade})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <select
                    value={testForm.subject}
                    onChange={(e) => setTestForm({ ...testForm, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Max Marks *</label>
                  <input
                    type="number"
                    required
                    value={testForm.maxMarks}
                    onChange={(e) => setTestForm({ ...testForm, maxMarks: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    required
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

              <button
                type="submit"
                className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-prime-orange hover:bg-prime-orange-hover shadow-md transition"
              >
                Save Test Score
              </button>
            </form>
          </div>
        )}

        {/* TAB 9: SETTINGS & CMS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Institute CMS & Settings</h1>
              <p className="text-xs text-slate-500">Edit contact details, location, phone numbers, and WhatsApp links live without changing code</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Institute Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Official Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Full Physical Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Landmark</label>
                <input
                  type="text"
                  value={settings.landmark}
                  onChange={(e) => setSettings({ ...settings, landmark: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Community Link</label>
                <input
                  type="text"
                  value={settings.whatsappCommunityUrl}
                  onChange={(e) => setSettings({ ...settings, whatsappCommunityUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Available Free Trial Slots</label>
                <input
                  type="number"
                  value={settings.trialSlotsAvailable}
                  onChange={(e) => setSettings({ ...settings, trialSlotsAvailable: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Institute Settings</span>
              </button>
            </form>
          </div>
        )}

        {selectedBatchId && batches.find(b => b.id === selectedBatchId) && (
          <QRAttendanceModal
            batch={batches.find(b => b.id === selectedBatchId)!}
            isOpen={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
          />
        )}

      </main>
    </div>
  );
}
