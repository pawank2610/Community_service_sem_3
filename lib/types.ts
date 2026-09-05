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
  email?: string;
  password?: string;
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
  email?: string;
  password?: string;
  batchId: string;
  batchName: string;
  teacherName: string;
  admissionDate: string;
  status: StudentStatus;
}

export interface UserAccount {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  associatedId?: string;
  createdAt: string;
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

export interface FeePayment {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  parentName: string;
  courseTitle: string;
  grade: string;
  amount: string;
  paymentMethod: 'UPI' | 'CARD' | 'CASH';
  transactionId: string;
  paymentDate: string;
  monthPaidFor: string;
  status: 'SUCCESS' | 'PENDING';
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  startDate: string;
  endDate: string;
  reason: string;
  makeupClassRequested: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  makeupDate?: string;
  createdAt: string;
}

export interface StudentBadge {
  id: string;
  studentId: string;
  title: string;
  category: 'ATTENDANCE' | 'ACADEMIC' | 'CONCEPT_MASTERY';
  description: string;
  iconName: string;
  earnedDate: string;
}

export interface StudentDoubt {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  subject: string;
  topic: string;
  questionText: string;
  status: 'PENDING' | 'RESOLVED';
  teacherReply?: string;
  repliedBy?: string;
  createdAt: string;
  repliedAt?: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: string;
  videoUrl: string;
  notesPdfUrl: string;
  teacherName: string;
  chapterName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  studentId: string;
  studentName: string;
  quizTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}
