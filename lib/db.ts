import { Course, Teacher, Batch, Enquiry, TrialRegistration, Student, AttendanceRecord, TestResult, Testimonial, Announcement, StudyMaterial, InstituteSettings } from './types';

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
};
