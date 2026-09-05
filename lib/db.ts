import { Course, Teacher, Batch, Enquiry, TrialRegistration, Student, AttendanceRecord, TestResult, Testimonial, Announcement, StudyMaterial, InstituteSettings, FeePayment, LeaveRequest, StudentBadge, StudentDoubt, VideoLesson, QuizQuestion, QuizResult } from './types';

// Re-export mock data for local storage initialization
import { 
  INITIAL_COURSES as MOCK_COURSES, 
  INITIAL_TEACHERS as MOCK_TEACHERS, 
  INITIAL_BATCHES as MOCK_BATCHES, 
  INITIAL_ENQUIRIES as MOCK_ENQUIRIES, 
  INITIAL_TRIALS as MOCK_TRIALS, 
  INITIAL_STUDENTS as MOCK_STUDENTS, 
  INITIAL_ATTENDANCE as MOCK_ATTENDANCE, 
  INITIAL_TEST_RESULTS as MOCK_TEST_RESULTS, 
  INITIAL_TESTIMONIALS as MOCK_TESTIMONIALS, 
  INITIAL_ANNOUNCEMENTS as MOCK_ANNOUNCEMENTS, 
  INITIAL_STUDY_MATERIALS as MOCK_STUDY_MATERIALS 
} from './mockData';
import { DEFAULT_SETTINGS as MOCK_SETTINGS } from './constants';

const STORAGE_PREFIX = 'prime_learning_';

const getStoredData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
};

const setStoredData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

export const db = {
  // Settings
  getSettings: (): InstituteSettings => {
    return getStoredData('settings', MOCK_SETTINGS);
  },
  saveSettings: (settings: InstituteSettings): InstituteSettings => {
    setStoredData('settings', settings);
    return settings;
  },

  // Courses
  getCourses: (): Course[] => {
    return getStoredData('courses', MOCK_COURSES);
  },
  saveCourses: (courses: Course[]): Course[] => {
    setStoredData('courses', courses);
    return courses;
  },
  addCourse: (courseData: Omit<Course, 'id'>): Course => {
    const current = getStoredData<Course[]>('courses', MOCK_COURSES);
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
    };
    const updated = [newCourse, ...current];
    setStoredData('courses', updated);
    return newCourse;
  },
  deleteCourse: (id: string): Course[] => {
    const current = getStoredData<Course[]>('courses', MOCK_COURSES);
    const updated = current.filter(c => c.id !== id);
    setStoredData('courses', updated);
    return updated;
  },

  // Teachers
  getTeachers: (): Teacher[] => {
    return getStoredData('teachers', MOCK_TEACHERS);
  },
  saveTeachers: (teachers: Teacher[]): Teacher[] => {
    setStoredData('teachers', teachers);
    return teachers;
  },
  addTeacher: (teacherData: Omit<Teacher, 'id'>): Teacher => {
    const current = getStoredData<Teacher[]>('teachers', MOCK_TEACHERS);
    const newTeacher: Teacher = {
      ...teacherData,
      id: `teacher-${Date.now()}`,
    };
    const updated = [...current, newTeacher];
    setStoredData('teachers', updated);
    return newTeacher;
  },
  deleteTeacher: (id: string): Teacher[] => {
    const current = getStoredData<Teacher[]>('teachers', MOCK_TEACHERS);
    const updated = current.filter(t => t.id !== id);
    setStoredData('teachers', updated);
    return updated;
  },

  // Batches
  getBatches: (): Batch[] => {
    return getStoredData('batches', MOCK_BATCHES);
  },
  saveBatches: (batches: Batch[]): Batch[] => {
    setStoredData('batches', batches);
    return batches;
  },
  addBatch: (batchData: Omit<Batch, 'id' | 'enrolledCount'>): Batch => {
    const current = getStoredData<Batch[]>('batches', MOCK_BATCHES);
    const newBatch: Batch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      enrolledCount: 0,
    };
    const updated = [newBatch, ...current];
    setStoredData('batches', updated);
    return newBatch;
  },
  deleteBatch: (id: string): Batch[] => {
    const current = getStoredData<Batch[]>('batches', MOCK_BATCHES);
    const updated = current.filter(b => b.id !== id);
    setStoredData('batches', updated);
    return updated;
  },

  // Enquiries
  getEnquiries: (): Enquiry[] => {
    return getStoredData('enquiries', MOCK_ENQUIRIES);
  },
  addEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: 'New inquiry from website form.',
    };
    const updated = [newEnquiry, ...current];
    setStoredData('enquiries', updated);
    return newEnquiry;
  },
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string): Enquiry[] => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const updated = current.map(enq => {
      if (enq.id === id) {
        return { ...enq, status, notes: notes !== undefined ? notes : enq.notes };
      }
      return enq;
    });
    setStoredData('enquiries', updated);
    return updated;
  },
  deleteEnquiry: (id: string): Enquiry[] => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const updated = current.filter(e => e.id !== id);
    setStoredData('enquiries', updated);
    return updated;
  },

  // Trial Registrations
  getTrials: (): TrialRegistration[] => {
    return getStoredData('trials', MOCK_TRIALS);
  },
  addTrial: (trialData: Omit<TrialRegistration, 'id' | 'createdAt' | 'status'>): TrialRegistration => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const newTrial: TrialRegistration = {
      ...trialData,
      id: `trial-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Registered',
      notes: 'Submitted online free trial form.',
    };
    const updated = [newTrial, ...current];
    setStoredData('trials', updated);
    return newTrial;
  },
  updateTrialStatus: (id: string, status: TrialRegistration['status'], notes?: string, trialDate?: string): TrialRegistration[] => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const updated = current.map(tr => {
      if (tr.id === id) {
        return {
          ...tr,
          status,
          notes: notes !== undefined ? notes : tr.notes,
          trialDate: trialDate !== undefined ? trialDate : tr.trialDate,
        };
      }
      return tr;
    });
    setStoredData('trials', updated);
    return updated;
  },
  deleteTrial: (id: string): TrialRegistration[] => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const updated = current.filter(t => t.id !== id);
    setStoredData('trials', updated);
    return updated;
  },

  // Students
  getStudents: (): Student[] => {
    return getStoredData('students', MOCK_STUDENTS);
  },
  saveStudents: (students: Student[]): Student[] => {
    setStoredData('students', students);
    return students;
  },
  addStudent: (studentData: Omit<Student, 'id' | 'admissionDate' | 'status'>): Student => {
    const current = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    const updated = [newStudent, ...current];
    setStoredData('students', updated);
    return newStudent;
  },
  deleteStudent: (id: string): Student[] => {
    const current = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const updated = current.filter(s => s.id !== id);
    setStoredData('students', updated);
    return updated;
  },

  // Attendance
  getAttendance: (): AttendanceRecord[] => {
    return getStoredData('attendance', MOCK_ATTENDANCE);
  },
  recordAttendance: (records: Omit<AttendanceRecord, 'id'>[]): AttendanceRecord[] => {
    const current = getStoredData<AttendanceRecord[]>('attendance', MOCK_ATTENDANCE);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecords = records.map(r => ({ 
      ...r, 
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      checkInMethod: r.checkInMethod || 'MANUAL',
      checkInTime: r.checkInTime || timeString,
    }));
    const updated = [...newRecords, ...current];
    setStoredData('attendance', updated);
    return updated;
  },
  markQRAttendance: (studentId: string, batchId: string, sessionPin?: string): { success: boolean; message: string; record?: AttendanceRecord } => {
    const students = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return { success: false, message: 'Student record not found.' };
    }

    const attendance = getStoredData<AttendanceRecord[]>('attendance', MOCK_ATTENDANCE);
    const today = new Date().toISOString().split('T')[0];
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const existingIndex = attendance.findIndex(a => a.studentId === studentId && a.date === today);

    const record: AttendanceRecord = {
      id: existingIndex >= 0 ? attendance[existingIndex].id : `att-${Date.now()}`,
      studentId: student.id,
      studentName: student.studentName,
      batchId: batchId || student.batchId,
      date: today,
      status: 'Present',
      checkInMethod: 'QR_SCAN',
      checkInTime: timeString,
      sessionPin,
      remarks: 'Automated QR Code Check-in',
    };

    let updated: AttendanceRecord[];
    if (existingIndex >= 0) {
      updated = [...attendance];
      updated[existingIndex] = record;
    } else {
      updated = [record, ...attendance];
    }

    setStoredData('attendance', updated);
    return { success: true, message: `Attendance marked Present for ${student.studentName} at ${timeString}`, record };
  },

  // Test Results
  getTestResults: (): TestResult[] => {
    return getStoredData('test_results', MOCK_TEST_RESULTS);
  },
  addTestResult: (res: Omit<TestResult, 'id' | 'percentage'>): TestResult => {
    const current = getStoredData<TestResult[]>('test_results', MOCK_TEST_RESULTS);
    const percentage = Math.round((res.marksObtained / res.maxMarks) * 100);
    const newResult: TestResult = {
      ...res,
      id: `test-${Date.now()}`,
      percentage,
    };
    const updated = [newResult, ...current];
    setStoredData('test_results', updated);
    return newResult;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    return getStoredData('testimonials', MOCK_TESTIMONIALS);
  },

  // Announcements
  getAnnouncements: (): Announcement[] => {
    return getStoredData('announcements', MOCK_ANNOUNCEMENTS);
  },
  addAnnouncement: (ancData: Omit<Announcement, 'id' | 'date'>): Announcement => {
    const current = getStoredData<Announcement[]>('announcements', MOCK_ANNOUNCEMENTS);
    const newAnnouncement: Announcement = {
      ...ancData,
      id: `anc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newAnnouncement, ...current];
    setStoredData('announcements', updated);
    return newAnnouncement;
  },
  deleteAnnouncement: (id: string): Announcement[] => {
    const current = getStoredData<Announcement[]>('announcements', MOCK_ANNOUNCEMENTS);
    const updated = current.filter(a => a.id !== id);
    setStoredData('announcements', updated);
    return updated;
  },

  // Study Materials
  getStudyMaterials: (): StudyMaterial[] => {
    return getStoredData('study_materials', MOCK_STUDY_MATERIALS);
  },
  addStudyMaterial: (matData: Omit<StudyMaterial, 'id' | 'date'>): StudyMaterial => {
    const current = getStoredData<StudyMaterial[]>('study_materials', MOCK_STUDY_MATERIALS);
    const newMaterial: StudyMaterial = {
      ...matData,
      id: `mat-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newMaterial, ...current];
    setStoredData('study_materials', updated);
    return newMaterial;
  },
  deleteStudyMaterial: (id: string): StudyMaterial[] => {
    const current = getStoredData<StudyMaterial[]>('study_materials', MOCK_STUDY_MATERIALS);
    const updated = current.filter(m => m.id !== id);
    setStoredData('study_materials', updated);
    return updated;
  },

  // Fee Payments & Receipts
  getPayments: (): FeePayment[] => {
    return getStoredData('payments', [
      {
        id: 'pay-1',
        receiptNo: 'PLC-2026-0901',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        parentName: 'Sunil Mehta',
        courseTitle: 'Class 10 Maths & Science (Combined)',
        grade: 'Class 10',
        amount: '₹5,000',
        paymentMethod: 'UPI',
        transactionId: 'UPI-9810989437-09012',
        paymentDate: '2026-09-01',
        monthPaidFor: 'September 2026',
        status: 'SUCCESS',
      },
    ]);
  },
  recordPayment: (paymentData: Omit<FeePayment, 'id' | 'receiptNo' | 'transactionId' | 'paymentDate' | 'status'>): FeePayment => {
    const current = getStoredData<FeePayment[]>('payments', []);
    const dateStr = new Date().toISOString().split('T')[0];
    const newPayment: FeePayment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      receiptNo: `PLC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionId: `UPI-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      paymentDate: dateStr,
      status: 'SUCCESS',
    };
    const updated = [newPayment, ...current];
    setStoredData('payments', updated);
    return newPayment;
  },

  // Leave Requests & Makeup Portal
  getLeaveRequests: (): LeaveRequest[] => {
    return getStoredData('leave_requests', [
      {
        id: 'leave-1',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        startDate: '2026-09-10',
        endDate: '2026-09-11',
        reason: 'School sports tournament event',
        makeupClassRequested: true,
        status: 'APPROVED',
        makeupDate: '2026-09-13',
        createdAt: '2026-09-02T10:00:00Z',
      },
    ]);
  },
  addLeaveRequest: (leaveData: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>): LeaveRequest => {
    const current = getStoredData<LeaveRequest[]>('leave_requests', []);
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `leave-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    const updated = [newLeave, ...current];
    setStoredData('leave_requests', updated);
    return newLeave;
  },
  updateLeaveStatus: (id: string, status: LeaveRequest['status'], makeupDate?: string): LeaveRequest[] => {
    const current = getStoredData<LeaveRequest[]>('leave_requests', []);
    const updated = current.map(l => {
      if (l.id === id) {
        return { ...l, status, makeupDate: makeupDate || l.makeupDate };
      }
      return l;
    });
    setStoredData('leave_requests', updated);
    return updated;
  },

  // Gamified Badges
  getBadges: (studentId?: string): StudentBadge[] => {
    const all = getStoredData<StudentBadge[]>('student_badges', [
      {
        id: 'badge-1',
        studentId: 'std-1',
        title: '100% Attendance Master',
        category: 'ATTENDANCE',
        description: 'Attended all scheduled classes continuously this month',
        iconName: 'CheckCircle2',
        earnedDate: '2026-09-01',
      },
      {
        id: 'badge-2',
        studentId: 'std-1',
        title: 'Math Wizard',
        category: 'ACADEMIC',
        description: 'Scored 90%+ in Quadratic Equations unit test',
        iconName: 'Sparkles',
        earnedDate: '2026-08-28',
      },
      {
        id: 'badge-3',
        studentId: 'std-1',
        title: 'Science Scholar',
        category: 'CONCEPT_MASTERY',
        description: 'Completed all ray diagram numerical workbooks',
        iconName: 'Award',
        earnedDate: '2026-08-25',
      },
    ]);

    if (studentId) {
      return all.filter(b => b.studentId === studentId);
    }
    return all;
  },

  // Student Doubts Resolver
  getDoubts: (): StudentDoubt[] => {
    return getStoredData('student_doubts', [
      {
        id: 'doubt-1',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        questionText: 'How to find nature of roots when discriminant is zero vs negative?',
        status: 'RESOLVED',
        teacherReply: 'When D = 0, roots are real and equal (-b / 2a). When D < 0, roots are imaginary/complex.',
        repliedBy: 'Praveen Gandhi',
        createdAt: '2026-09-03T14:30:00Z',
        repliedAt: '2026-09-03T16:15:00Z',
      },
      {
        id: 'doubt-2',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        subject: 'Science',
        topic: 'Light Reflection & Refraction',
        questionText: 'Why does a ray of light bend towards the normal when passing from air to glass?',
        status: 'PENDING',
        createdAt: '2026-09-05T09:00:00Z',
      },
    ]);
  },
  addDoubt: (doubtData: Omit<StudentDoubt, 'id' | 'createdAt' | 'status'>): StudentDoubt => {
    const current = getStoredData<StudentDoubt[]>('student_doubts', []);
    const newDoubt: StudentDoubt = {
      ...doubtData,
      id: `doubt-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    const updated = [newDoubt, ...current];
    setStoredData('student_doubts', updated);
    return newDoubt;
  },
  replyDoubt: (id: string, reply: string, teacherName: string): StudentDoubt[] => {
    const current = getStoredData<StudentDoubt[]>('student_doubts', []);
    const updated = current.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'RESOLVED' as const,
          teacherReply: reply,
          repliedBy: teacherName,
          repliedAt: new Date().toISOString(),
        };
      }
      return d;
    });
    setStoredData('student_doubts', updated);
    return updated;
  },

  // Video Lessons Vault
  getVideoLessons: (): VideoLesson[] => {
    return getStoredData('video_lessons', [
      {
        id: 'vid-1',
        title: 'Quadratic Formula & Discriminant Shortcuts',
        subject: 'Mathematics',
        grade: 'Class 10',
        duration: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Praveen Gandhi',
        chapterName: 'Chapter 4: Quadratic Equations',
      },
      {
        id: 'vid-2',
        title: 'Ray Diagram Rules for Concave & Convex Mirrors',
        subject: 'Science',
        grade: 'Class 10',
        duration: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Rashmi Anand',
        chapterName: 'Chapter 10: Light & Optics',
      },
      {
        id: 'vid-3',
        title: 'Chemical Equations Balancing Technique',
        subject: 'Science',
        grade: 'Class 10',
        duration: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Rashmi Anand',
        chapterName: 'Chapter 1: Chemical Reactions',
      },
    ]);
  },

  // Chapter Practice Quizzes
  getQuizQuestions: (subject: string = 'Mathematics'): QuizQuestion[] => {
    if (subject.includes('Science')) {
      return [
        {
          id: 'q1',
          question: 'What is the focal length of a plane mirror?',
          options: ['Zero', 'Infinite', '25 cm', '10 cm'],
          correctOptionIndex: 1,
          explanation: 'A plane mirror has an infinite radius of curvature, hence its focal length is infinite.',
        },
        {
          id: 'q2',
          question: 'Which gas is released when zinc reacts with dilute sulphuric acid?',
          options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen'],
          correctOptionIndex: 2,
          explanation: 'Zn + H2SO4 -> ZnSO4 + H2(g). Hydrogen gas burns with a pop sound.',
        },
        {
          id: 'q3',
          question: 'The S.I. unit of electric current is:',
          options: ['Volt', 'Ohm', 'Ampere', 'Joule'],
          correctOptionIndex: 2,
          explanation: 'Electric current is measured in Amperes (A), named after André-Marie Ampère.',
        },
      ];
    }
    return [
      {
        id: 'qm1',
        question: 'If the discriminant D = b^2 - 4ac > 0 and a perfect square, the roots of the quadratic equation are:',
        options: ['Real, rational and unequal', 'Real, irrational and unequal', 'Real and equal', 'Imaginary'],
        correctOptionIndex: 0,
        explanation: 'When D > 0 and D is a perfect square, sqrt(D) is rational, making the roots real, rational, and unequal.',
      },
      {
        id: 'qm2',
        question: 'What is the nth term formula for an Arithmetic Progression (AP)?',
        options: ['an = a + n*d', 'an = a + (n - 1)*d', 'an = (n/2)*(a + l)', 'an = a * r^(n-1)'],
        correctOptionIndex: 1,
        explanation: 'The nth term an = a + (n - 1)d where a is first term and d is common difference.',
      },
      {
        id: 'qm3',
        question: 'If sin(theta) = 3/5, what is the value of cos(theta)?',
        options: ['4/5', '3/4', '5/3', '5/4'],
        correctOptionIndex: 0,
        explanation: 'In a right triangle with perpendicular 3 and hypotenuse 5, base = sqrt(5^2 - 3^2) = 4. Thus cos(theta) = 4/5.',
      },
    ];
  },
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'date'>): QuizResult => {
    const current = getStoredData<QuizResult[]>('quiz_results', []);
    const newResult: QuizResult = {
      ...result,
      id: `quiz-res-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setStoredData('quiz_results', [newResult, ...current]);
    return newResult;
  },
  getQuizResults: (studentId?: string): QuizResult[] => {
    const all = getStoredData<QuizResult[]>('quiz_results', []);
    if (studentId) return all.filter(r => r.studentId === studentId);
    return all;
  },
};

// Named Helper Exports
export const getPayments = db.getPayments;
export const recordPayment = db.recordPayment;
export const getLeaveRequests = (studentId?: string) => {
  const all = db.getLeaveRequests();
  if (studentId) return all.filter(l => l.studentId === studentId);
  return all;
};
export const addLeaveRequest = db.addLeaveRequest;
export const updateLeaveStatus = db.updateLeaveStatus;
export const getBadges = db.getBadges;
export const getDoubts = (studentId?: string) => {
  const all = db.getDoubts();
  if (studentId) return all.filter(d => d.studentId === studentId);
  return all;
};
export const addDoubt = db.addDoubt;
export const replyDoubt = db.replyDoubt;
export const getVideoLessons = db.getVideoLessons;
export const getQuizQuestions = db.getQuizQuestions;
export const saveQuizResult = db.saveQuizResult;
export const getQuizResults = db.getQuizResults;


