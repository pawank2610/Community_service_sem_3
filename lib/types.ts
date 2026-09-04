export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Trial Scheduled' 
  | 'Trial Completed' 
  | 'Enrolled' 
  | 'Not Interested';

export type TrialStatus = 
  | 'Registered' 
  | 'Contacted' 
  | 'Scheduled' 
  | 'Attended' 
  | 'Absent' 
  | 'Converted' 
  | 'Not Converted';

export type StudentStatus = 'Active' | 'Inactive' | 'Trial' | 'Completed';
export type BatchStatus = 'Active' | 'Inactive' | 'Full';
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface InstituteSettings {
  name: string;
  tagline: string;
  locationName: string;
  address: string;
  landmark: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  googleMapsEmbedUrl: string;
  whatsappCommunityUrl: string;
  trialSlotsAvailable: number;
}

export interface Course {
  id: string;
  grade: string;
  subject: string;
  description: string;
  batchTiming: string;
  monthlyFee: string;
  availableSeats: number;
  status: 'Open' | 'Fast Filling' | 'Full';
  highlights: string[];
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  subjects: string[];
  classesTaught: string[];
  teachingPhilosophy: string;
  areasOfExpertise: string[];
  achievements: string[];
  photoUrl: string;
  bio: string;
  studentFeedback: {
    author: string;
    comment: string;
    rating: number;
  }[];
}

export interface Batch {
  id: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  days: string;
  startTime: string;
  endTime: string;
  room: string;
  maxStudents: number;
  enrolledCount: number;
  status: BatchStatus;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  grade: string;
  subject: string;
  preferredTiming: string;
  message: string;
  createdAt: string;
  status: EnquiryStatus;
  notes?: string;
}

export interface TrialRegistration {
  id: string;
  studentName: string;
  parentName: string;
  grade: string;
  subject: string;
  phone: string;
  whatsapp: string;
  preferredTiming: string;
  preferredTeacher: string;
  trialDate?: string;
  status: TrialStatus;
  createdAt: string;
  notes?: string;
}

export interface Student {
  id: string;
  studentName: string;
  parentName: string;
  grade: string;
  subjects: string[];
  phone: string;
  whatsapp: string;
  batchId: string;
  batchName: string;
  teacherName: string;
  admissionDate: string;
  status: StudentStatus;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  batchId: string;
  date: string;
  status: 'Present' | 'Absent';
  checkInMethod?: 'QR_SCAN' | 'MANUAL';
  checkInTime?: string;
  sessionPin?: string;
  remarks?: string;
}

export interface TestResult {
  id: string;
  testName: string;
  subject: string;
  studentId: string;
  studentName: string;
  grade: string;
  date: string;
  maxMarks: number;
  marksObtained: number;
  percentage: number;
  remarks: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  grade: string;
  rating: number;
  content: string;
  avatarUrl?: string;
  isSample: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetGrade: string;
  author: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  grade: string;
  fileType: string;
  downloadUrl: string;
  date: string;
}
