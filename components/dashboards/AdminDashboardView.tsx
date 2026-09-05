'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, GraduationCap, CheckCircle2, Phone, Calendar, 
  BookOpen, Clock, Settings, Plus, Filter, Search, FileText, BarChart3, Edit, Save, ArrowRight, QrCode, Trash2, X, Bell, Download, CreditCard, HelpCircle, Send, Megaphone
} from 'lucide-react';
import { db, getPayments, getLeaveRequests, updateLeaveStatus, getDoubts, replyDoubt } from '@/lib/db';
import { 
  Enquiry, TrialRegistration, Student, Batch, Course, Teacher, 
  AttendanceRecord, TestResult, InstituteSettings, EnquiryStatus, TrialStatus, Announcement, StudyMaterial, StudentDoubt 
} from '@/lib/types';
import { getWhatsAppLink, getTelLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import QRAttendanceModal from '@/components/QRAttendanceModal';

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'trials' | 'students' | 'teachers' | 'batches' | 'courses' | 'announcements' | 'materials' | 'attendance' | 'marks' | 'payments' | 'leaves' | 'doubts' | 'broadcast' | 'settings'
  >('overview');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [trials, setTrials] = useState<TrialRegistration[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [settings, setSettings] = useState<InstituteSettings>(db.getSettings());
  const [payments, setPayments] = useState(getPayments());
  const [leaveRequests, setLeaveRequestsState] = useState(getLeaveRequests());
  const [doubtsState, setDoubtsState] = useState<StudentDoubt[]>(getDoubts());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<string>('All');
  const [trialFilter, setTrialFilter] = useState<string>('All');

  // Attendance Form State
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [attendanceDate, setAttendanceDate] = useState<string>('2026-09-05');
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

  // Modal States
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentName: '', parentName: '', grade: 'Class 10', subjects: 'Maths & Science', phone: '', whatsapp: '', batchId: '', teacherName: 'Praveen Gandhi & Rashmi Anand'
  });

  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '', qualification: 'M.Sc.', experience: '5+ Years', subjects: 'Mathematics', classesTaught: 'Class 9 - 12', bio: '', philosophy: ''
  });

  const [addBatchModal, setAddBatchModal] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: '', grade: 'Class 10', subject: 'Mathematics', teacherName: 'Praveen Gandhi', days: 'Mon, Wed, Fri', startTime: '5:00 PM', endTime: '6:30 PM', room: 'Room 101', maxStudents: 15
  });

  const [addCourseModal, setAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    grade: 'Class 10', subject: 'Maths & Science (Combined)', description: '', batchTiming: 'Mon to Sat (Alternate Days) | 5:00 PM - 6:30 PM', monthlyFee: '₹4,500 / month', availableSeats: 5
  });

  const [addAnnouncementModal, setAddAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '', content: '', targetGrade: 'All Classes', author: 'Admin'
  });

  const [addMaterialModal, setAddMaterialModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '', subject: 'Mathematics', grade: 'Class 10', fileType: 'PDF Document', downloadUrl: '#'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setEnquiries(db.getEnquiries());
    setTrials(db.getTrials());
    setStudents(db.getStudents());
    setTeachers(db.getTeachers());
    setBatches(db.getBatches());
    setCourses(db.getCourses());
    setAnnouncements(db.getAnnouncements());
    setMaterials(db.getStudyMaterials());
    setSettings(db.getSettings());
    setPayments(getPayments());
    setLeaveRequestsState(getLeaveRequests());
    setDoubtsState(getDoubts());
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

  const handleDeleteEnquiry = (id: string) => {
    if (confirm('Are you sure you want to remove this enquiry?')) {
      db.deleteEnquiry(id);
      refreshData();
      showToast('Enquiry removed.');
    }
  };

  const handleUpdateTrialStatus = (id: string, status: TrialStatus) => {
    db.updateTrialStatus(id, status);
    refreshData();
    showToast(`Trial status updated to ${status}`);
  };

  const handleDeleteTrial = (id: string) => {
    if (confirm('Are you sure you want to remove this trial registration?')) {
      db.deleteTrial(id);
      refreshData();
      showToast('Trial registration removed.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings(settings);
    refreshData();
    showToast('Institute settings updated successfully!');
  };

  // CRUD Handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const batch = batches.find(b => b.id === newStudent.batchId) || batches[0];
    db.addStudent({
      studentName: newStudent.studentName,
      parentName: newStudent.parentName,
      grade: newStudent.grade,
      subjects: newStudent.subjects.split(',').map(s => s.trim()),
      phone: newStudent.phone,
      whatsapp: newStudent.whatsapp || newStudent.phone,
      batchId: batch ? batch.id : 'batch-1',
      batchName: batch ? batch.name : 'Class 10 Batch',
      teacherName: newStudent.teacherName,
    });
    setAddStudentModal(false);
    refreshData();
    showToast(`Added new student: ${newStudent.studentName}`);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove student "${name}"?`)) {
      db.deleteStudent(id);
      refreshData();
      showToast(`Removed student ${name}`);
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    db.addTeacher({
      name: newTeacher.name,
      qualification: newTeacher.qualification,
      experience: newTeacher.experience,
      subjects: newTeacher.subjects.split(',').map(s => s.trim()),
      classesTaught: newTeacher.classesTaught.split(',').map(s => s.trim()),
      teachingPhilosophy: newTeacher.philosophy || 'Concept-focused interactive learning.',
      areasOfExpertise: [newTeacher.subjects, 'Board Exam Preparation'],
      achievements: ['Guided 100+ students to top grades'],
      photoUrl: '/images/teacher-rajesh.jpg',
      bio: newTeacher.bio || 'Dedicated educator.',
      studentFeedback: [],
    });
    setAddTeacherModal(false);
    refreshData();
    showToast(`Added new faculty: ${newTeacher.name}`);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove faculty "${name}"?`)) {
      db.deleteTeacher(id);
      refreshData();
      showToast(`Removed faculty ${name}`);
    }
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    db.addBatch({
      name: newBatch.name,
      grade: newBatch.grade,
      subject: newBatch.subject,
      teacherId: 'teacher-praveen',
      teacherName: newBatch.teacherName,
      days: newBatch.days,
      startTime: newBatch.startTime,
      endTime: newBatch.endTime,
      room: newBatch.room,
      maxStudents: Number(newBatch.maxStudents),
      status: 'Active',
    });
    setAddBatchModal(false);
    refreshData();
    showToast(`Created batch: ${newBatch.name}`);
  };

  const handleDeleteBatch = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove batch "${name}"?`)) {
      db.deleteBatch(id);
      refreshData();
      showToast(`Removed batch ${name}`);
    }
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    db.addCourse({
      grade: newCourse.grade,
      subject: newCourse.subject,
      description: newCourse.description || 'Structured academic preparation.',
      batchTiming: newCourse.batchTiming,
      monthlyFee: newCourse.monthlyFee,
      availableSeats: Number(newCourse.availableSeats),
      status: 'Open',
      highlights: ['Small batch size', 'Daily homework check', 'Concept building'],
    });
    setAddCourseModal(false);
    refreshData();
    showToast(`Created course offering for ${newCourse.grade}`);
  };

  const handleDeleteCourse = (id: string, subject: string) => {
    if (confirm(`Are you sure you want to remove course "${subject}"?`)) {
      db.deleteCourse(id);
      refreshData();
      showToast(`Removed course ${subject}`);
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    db.addAnnouncement({
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      targetGrade: newAnnouncement.targetGrade,
      author: newAnnouncement.author,
    });
    setAddAnnouncementModal(false);
    refreshData();
    showToast('Published new announcement!');
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Remove this announcement?')) {
      db.deleteAnnouncement(id);
      refreshData();
      showToast('Announcement removed.');
    }
  };

  const handleAddStudyMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    db.addStudyMaterial({
      title: newMaterial.title,
      subject: newMaterial.subject,
      grade: newMaterial.grade,
      fileType: newMaterial.fileType,
      downloadUrl: newMaterial.downloadUrl,
    });
    setAddMaterialModal(false);
    refreshData();
    showToast('Uploaded study material!');
  };

  const handleDeleteStudyMaterial = (id: string) => {
    if (confirm('Remove this study material?')) {
      db.deleteStudyMaterial(id);
      refreshData();
      showToast('Study material removed.');
    }
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
    showToast('Attendance logged successfully!');
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
    showToast(`Logged test marks for ${st.studentName}`);
  };

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
              { id: 'teachers', label: `Faculty (${teachers.length})`, icon: Users },
              { id: 'batches', label: 'Batches & Timings', icon: Clock },
              { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
              { id: 'payments', label: `Fee Ledger (${payments.length})`, icon: CreditCard },
              { id: 'leaves', label: `Leave Requests (${leaveRequests.filter(l=>l.status==='PENDING').length})`, icon: Calendar, badge: leaveRequests.filter(l=>l.status==='PENDING').length > 0 },
              { id: 'doubts', label: `Student Doubts (${doubtsState.filter(d=>d.status==='PENDING').length})`, icon: HelpCircle, badge: doubtsState.filter(d=>d.status==='PENDING').length > 0 },
              { id: 'broadcast', label: 'WhatsApp Broadcaster', icon: Megaphone },
              { id: 'announcements', label: 'Announcements', icon: Bell },
              { id: 'materials', label: 'Study Resources', icon: Download },
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
                <div className="text-[11px] text-slate-500 mt-1">Enrolled across active batches</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">Available Trial Slots</div>
                <div className="text-3xl font-black text-prime-orange mt-2">{settings.trialSlotsAvailable}</div>
                <div className="text-[11px] text-slate-500 mt-1">Configurable in settings</div>
              </div>
            </div>

            {/* Recent Enquiries & Trials Table Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Name & Date</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Message / Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
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
                          <a href={getTelLink(enq.phone)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200" title="Call">
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button onClick={() => handleDeleteEnquiry(enq.id)} className="p-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRIALS */}
        {activeTab === 'trials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Free Trial Registrations</h1>
                <p className="text-xs text-slate-500">Manage free demo class bookings</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Student & Parent</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Preferred Teacher</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trials.map((tr) => (
                    <tr key={tr.id} className="hover:bg-slate-50/80">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{tr.studentName}</div>
                        <div className="text-[10px] text-slate-500">Parent: {tr.parentName}</div>
                      </td>
                      <td className="p-4 font-semibold">{tr.phone}</td>
                      <td className="p-4"><span className="font-bold">{tr.grade}</span> - {tr.subject}</td>
                      <td className="p-4 font-bold text-prime-orange">{tr.preferredTeacher}</td>
                      <td className="p-4">
                        <select
                          value={tr.status}
                          onChange={(e) => handleUpdateTrialStatus(tr.id, e.target.value as TrialStatus)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Registered">Registered</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Attended">Attended</option>
                          <option value="Converted">Converted</option>
                          <option value="Not Converted">Not Converted</option>
                        </select>
                      </td>
                      <td className="p-4 flex items-center space-x-2">
                        <button onClick={() => handleDeleteTrial(tr.id)} className="p-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Enrolled Students Roster</h1>
                <p className="text-xs text-slate-500">Add, edit, or remove student enrollments</p>
              </div>

              <button
                onClick={() => setAddStudentModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Student</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Student & Parent Name</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Enrolled Batch</th>
                    <th className="p-4">Assigned Teacher</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{st.studentName}</div>
                        <div className="text-[10px] text-slate-500">Parent: {st.parentName}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-900">{st.grade}</td>
                      <td className="p-4 font-semibold text-prime-orange">{st.batchName}</td>
                      <td className="p-4 font-semibold">{st.teacherName}</td>
                      <td className="p-4">{st.phone}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteStudent(st.id, st.studentName)}
                          className="p-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold"
                          title="Remove Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: TEACHERS / FACULTY */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Faculty Management</h1>
                <p className="text-xs text-slate-500">Add new teachers or modify existing faculty profiles</p>
              </div>

              <button
                onClick={() => setAddTeacherModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Faculty Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map((tc) => (
                <div key={tc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative">
                  <button
                    onClick={() => handleDeleteTeacher(tc.id, tc.name)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    title="Remove Teacher"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-prime-orange/10 border border-prime-orange text-prime-orange flex items-center justify-center font-black text-xl">
                      {tc.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{tc.name}</h3>
                      <p className="text-xs text-slate-500 font-semibold">{tc.qualification} • {tc.experience}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{tc.bio}</p>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {tc.subjects.map((sub, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BATCHES */}
        {activeTab === 'batches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Batches & Class Timings</h1>
                <p className="text-xs text-slate-500">Create new class batches and assign faculty</p>
              </div>

              <button
                onClick={() => setAddBatchModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Batch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((b) => (
                <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative">
                  <button
                    onClick={() => handleDeleteBatch(b.id, b.name)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    title="Remove Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/10 px-2.5 py-0.5 rounded uppercase">
                    {b.grade}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">{b.name}</h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Faculty: <strong>{b.teacherName}</strong></div>
                    <div>Days: <strong>{b.days}</strong></div>
                    <div>Timing: {b.startTime} - {b.endTime}</div>
                    <div>Room: {b.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Course Offerings & Fees</h1>
                <p className="text-xs text-slate-500">Manage website course cards and monthly fee plans</p>
              </div>

              <button
                onClick={() => setAddCourseModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative">
                  <button
                    onClick={() => handleDeleteCourse(c.id, c.subject)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    title="Remove Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/10 px-2.5 py-0.5 rounded">
                    {c.grade}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">{c.subject}</h3>
                  <div className="text-xl font-black text-slate-900">{c.monthlyFee}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Class Announcements</h1>
                <p className="text-xs text-slate-500">Publish notices to student dashboards</p>
              </div>

              <button
                onClick={() => setAddAnnouncementModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Announcement</span>
              </button>
            </div>

            <div className="space-y-3 max-w-2xl">
              {announcements.map((anc) => (
                <div key={anc.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">{anc.title}</div>
                    <p className="text-xs text-slate-600">{anc.content}</p>
                    <div className="text-[10px] text-slate-400 font-semibold">Target: {anc.targetGrade} • Posted by {anc.author}</div>
                  </div>
                  <button onClick={() => handleDeleteAnnouncement(anc.id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Study Resources & Worksheets</h1>
                <p className="text-xs text-slate-500">Upload worksheets and formula cheat sheets</p>
              </div>

              <button
                onClick={() => setAddMaterialModal(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-prime-orange transition shadow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Study Resource</span>
              </button>
            </div>

            <div className="space-y-3 max-w-2xl">
              {materials.map((mat) => (
                <div key={mat.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{mat.title}</div>
                    <div className="text-xs text-slate-500">{mat.subject} • {mat.grade} ({mat.fileType})</div>
                  </div>
                  <button onClick={() => handleDeleteStudyMaterial(mat.id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: ATTENDANCE */}
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

        {/* TAB 11: MARKS */}
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

        {/* TAB: PAYMENTS LEDGER */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Fee Collection & Digital Receipts Ledger</h1>
                <p className="text-xs text-slate-500">Live record of online UPI payments, cash receipts, and transaction IDs</p>
              </div>
              <div className="px-4 py-2 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200">
                Total Collected: ₹{payments.reduce((acc, curr) => acc + (parseInt(curr.amount.replace(/[^0-9]/g, '')) || 0), 0).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Receipt #</th>
                    <th className="p-4">Student & Class</th>
                    <th className="p-4">Amount Paid</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Transaction UTR</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-400 italic">No payment receipts logged yet.</td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{p.receiptNo}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{p.studentName}</div>
                          <div className="text-[10px] text-slate-500">{p.grade}</div>
                        </td>
                        <td className="p-4 font-black text-emerald-600 text-sm">{p.amount}</td>
                        <td className="p-4 font-semibold">{p.paymentMethod}</td>
                        <td className="p-4 font-mono text-[11px] text-slate-600">{p.transactionId}</td>
                        <td className="p-4 text-slate-500">{p.paymentDate}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {p.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: LEAVE REQUESTS */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Student Leave Applications</h1>
              <p className="text-xs text-slate-500">Review student absence notifications and grant makeup class approvals</p>
            </div>

            <div className="space-y-4">
              {leaveRequests.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-200">
                  No student leave applications received.
                </div>
              ) : (
                leaveRequests.map((leave) => (
                  <div key={leave.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-base">{leave.studentName}</span>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {leave.grade}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
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
                        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 inline-block mt-1">
                          🗓️ Makeup Class: {leave.makeupDate}
                        </div>
                      )}
                    </div>

                    {leave.status === 'PENDING' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            const schedule = prompt('Enter Makeup Class Schedule for ' + leave.studentName + ':', 'Sunday 11:00 AM Doubt Batch');
                            if (schedule !== null) {
                              updateLeaveStatus(leave.id, 'APPROVED', schedule);
                              refreshData();
                              showToast('Leave approved!');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition"
                        >
                          Approve & Schedule
                        </button>

                        <button
                          onClick={() => {
                            updateLeaveStatus(leave.id, 'REJECTED');
                            refreshData();
                            showToast('Leave rejected.');
                          }}
                          className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: STUDENT DOUBTS OVERVIEW */}
        {activeTab === 'doubts' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Student Doubts Management</h1>
              <p className="text-xs text-slate-500">Monitor student questions and faculty solution submittals</p>
            </div>

            <div className="space-y-4">
              {doubtsState.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 italic bg-white rounded-2xl border border-slate-200">
                  No student doubts logged.
                </div>
              ) : (
                doubtsState.map((doubt) => (
                  <div key={doubt.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
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

                    <div className="text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Question:</strong> "{doubt.questionText}"
                    </div>

                    {doubt.teacherReply ? (
                      <div className="text-xs text-indigo-900 bg-indigo-50 p-3 rounded-xl border border-indigo-100 space-y-1">
                        <div className="font-bold text-[11px] text-indigo-700">Solution by {doubt.repliedBy}:</div>
                        <p className="leading-relaxed">{doubt.teacherReply}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          const replyText = prompt('Enter solution explanation for ' + doubt.studentName + ':', 'Use discriminant D = b^2 - 4ac.');
                          if (replyText) {
                            replyDoubt(doubt.id, replyText, 'Praveen Gandhi');
                            refreshData();
                            showToast('Solution posted!');
                          }
                        }}
                        className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-prime-orange text-white font-bold text-xs shadow transition flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Solution</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: BULK WHATSAPP BROADCASTER */}
        {activeTab === 'broadcast' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Bulk WhatsApp & SMS Parent Broadcaster</h1>
              <p className="text-xs text-slate-500">Dispatch 1-click monthly fee due alerts & attendance warnings to parents</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center">
                  <Megaphone className="w-4 h-4 text-emerald-600 mr-2" />
                  Select Student Roster for 1-Click WhatsApp Alert
                </h3>

                <div className="space-y-2">
                  {students.map((st) => {
                    const feeDueMsg = `Dear Parent (${st.parentName}), this is a friendly reminder from Prime Learning Classes Gurgaon regarding monthly tuition fee of ₹3,500 for ${st.studentName} (${st.grade}). Kindly complete online via UPI: http://localhost:3001/fees`;
                    const feeDueUrl = getWhatsAppLink('919876543210', feeDueMsg);

                    const attWarnMsg = `Dear Parent (${st.parentName}), attendance update for ${st.studentName} (${st.grade}): Student missed recent class session. Please contact teacher Praveen Gandhi / Rashmi Anand.`;
                    const attWarnUrl = getWhatsAppLink('919876543210', attWarnMsg);

                    return (
                      <div key={st.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{st.studentName}</div>
                          <div className="text-[11px] text-slate-500">Parent: {st.parentName} • {st.grade} ({st.batchName})</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <a
                            href={feeDueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Fee Due Alert</span>
                          </a>

                          <a
                            href={attWarnUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow transition flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Attendance Alert</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Institute CMS & Settings</h1>
              <p className="text-xs text-slate-500">Edit contact details, location, phone numbers, and WhatsApp links live</p>
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

        {/* MODALS */}
        {/* Add Student Modal */}
        {addStudentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Add New Student</h2>
                <button onClick={() => setAddStudentModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                  <input type="text" required value={newStudent.studentName} onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Parent Name *</label>
                  <input type="text" required value={newStudent.parentName} onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Grade</label>
                    <select value={newStudent.grade} onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                      <option value="Class 10">Class 10</option>
                      <option value="Class 12">Class 12</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 1 - 5">Class 1 - 5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Phone *</label>
                    <input type="text" required value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Assign Batch</label>
                  <select value={newStudent.batchId} onChange={(e) => setNewStudent({ ...newStudent, batchId: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                    {batches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Save & Enroll Student
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Teacher Modal */}
        {addTeacherModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Add Faculty Member</h2>
                <button onClick={() => setAddTeacherModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input type="text" required value={newTeacher.name} onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Qualification</label>
                    <input type="text" value={newTeacher.qualification} onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Experience</label>
                    <input type="text" value={newTeacher.experience} onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Subjects (comma separated)</label>
                  <input type="text" value={newTeacher.subjects} onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Bio / Profile</label>
                  <textarea rows={2} value={newTeacher.bio} onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300 resize-none" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Save Faculty Profile
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Batch Modal */}
        {addBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Add New Batch</h2>
                <button onClick={() => setAddBatchModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddBatch} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Batch Name *</label>
                  <input type="text" required value={newBatch.name} onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Grade</label>
                    <input type="text" value={newBatch.grade} onChange={(e) => setNewBatch({ ...newBatch, grade: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Subject</label>
                    <input type="text" value={newBatch.subject} onChange={(e) => setNewBatch({ ...newBatch, subject: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Faculty</label>
                    <select value={newBatch.teacherName} onChange={(e) => setNewBatch({ ...newBatch, teacherName: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                      <option value="Praveen Gandhi">Praveen Gandhi</option>
                      <option value="Rashmi Anand">Rashmi Anand</option>
                      <option value="Praveen Gandhi & Rashmi Anand">Praveen Gandhi & Rashmi Anand</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Days Schedule</label>
                    <input type="text" value={newBatch.days} onChange={(e) => setNewBatch({ ...newBatch, days: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Create Batch Schedule
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Course Modal */}
        {addCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Add New Course Offering</h2>
                <button onClick={() => setAddCourseModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddCourse} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Grade</label>
                    <input type="text" required value={newCourse.grade} onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Monthly Fee *</label>
                    <input type="text" required value={newCourse.monthlyFee} onChange={(e) => setNewCourse({ ...newCourse, monthlyFee: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Subject Offering *</label>
                  <input type="text" required value={newCourse.subject} onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Batch Schedule / Timing</label>
                  <input type="text" value={newCourse.batchTiming} onChange={(e) => setNewCourse({ ...newCourse, batchTiming: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Save Course Offering
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Announcement Modal */}
        {addAnnouncementModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Publish Announcement</h2>
                <button onClick={() => setAddAnnouncementModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Notice Title *</label>
                  <input type="text" required value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Content / Details *</label>
                  <textarea rows={3} required value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300 resize-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Target Grade</label>
                  <input type="text" value={newAnnouncement.targetGrade} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetGrade: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Publish Notice
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Study Material Modal */}
        {addMaterialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Upload Study Resource</h2>
                <button onClick={() => setAddMaterialModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleAddStudyMaterial} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Resource Title *</label>
                  <input type="text" required value={newMaterial.title} onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Subject</label>
                    <input type="text" value={newMaterial.subject} onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Grade</label>
                    <input type="text" value={newMaterial.grade} onChange={(e) => setNewMaterial({ ...newMaterial, grade: e.target.value })} className="w-full p-2.5 rounded-xl border border-slate-300" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-prime-orange transition">
                  Upload Resource
                </button>
              </form>
            </div>
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
