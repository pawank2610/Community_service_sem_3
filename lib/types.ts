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
  attendanceStatus?: 'Pending' | 'Attended' | 'Absent' | 'Rescheduled';
  feedbackNotes?: string;
  conversionProbability?: 'High' | 'Medium' | 'Low' | 'Converted';
  followUpDate?: string;
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

export interface CommunityImpactMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  description: string;
  sdgTag: 'SDG 4' | 'SDG 8' | 'SDG 9';
}

export interface PtmBooking {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  preferredTeacher: string;
  preferredSlot: string;
  concernArea: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
  createdAt: string;
}

export interface MarketingPosterConfig {
  templateId: 'free-trial' | 'cbse-boards' | 'foundation' | 'table-standee';
  headline: string;
  subheadline: string;
  highlightOffer: string;
  targetClasses: string;
  batchStartDate: string;
  qrDestination: 'free-trial' | 'google-review' | 'whatsapp';
  accentColor: string;
}

export type ChapterStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Revision Needed';

export interface SyllabusChapter {
  id: string;
  grade: string; // e.g. 'Class 10', 'Class 9'
  subject: string; // e.g. 'Mathematics', 'Science'
  chapterNo: number;
  title: string;
  weightageMarks: number; // e.g. 8
  status: ChapterStatus;
  keyFormulas: string[];
  examTips: string;
  ncertExercisesCount: number;
  updatedAt?: string;
}

export interface StudyPlanDay {
  dayNumber: number;
  date: string;
  subject: string;
  chapter: string;
  tasks: string[];
  durationMinutes: number;
  completed: boolean;
}

export interface StudyPlanSchedule {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  targetDate: string;
  dailyHours: number;
  prioritySubject: string;
  weakTopics: string[];
  planDays: StudyPlanDay[];
  createdAt: string;
}

export interface StudentIdCard {
  studentId: string;
  rollNo: string;
  studentName: string;
  grade: string;
  batchName: string;
  emergencyPhone: string;
  bloodGroup: string;
  validTill: string;
  qrCodeData: string;
}

export type ExpenseCategory = 'Rent' | 'Utilities & Electricity' | 'Printing & Question Banks' | 'Marketing & Flyers' | 'Faculty Honorarium' | 'Miscellaneous';

export interface ExpenseRecord {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidTo?: string;
  paymentMethod: 'UPI' | 'CASH' | 'NETBANKING';
  receiptRef?: string;
}

export type AcademicEventType = 'TEST' | 'PTM' | 'HOLIDAY' | 'WORKSHOP' | 'BOARD_PRACTICAL';

export interface AcademicEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  eventType: AcademicEventType;
  description: string;
  targetGrade: string;
  venue?: string;
}

export interface FormulaFlashcard {
  id: string;
  subject: 'Mathematics' | 'Science';
  grade: string;
  chapter: string;
  title: string;
  frontQuestion: string;
  backAnswer: string;
  keyFormula: string;
  examNote: string;
}

