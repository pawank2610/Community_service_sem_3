import { InstituteSettings } from './types';

export const DEFAULT_SETTINGS: InstituteSettings = {
  name: 'Prime Learning Classes',
  tagline: 'Maths, Science & All-Subject Tutoring | Quality Coaching & Personal Attention',
  locationName: 'Sec-22B, Gurgaon', // Easily configurable for local SEO
  address: '948, Sec-22B, Near Anand Farm, Gurgaon',
  landmark: 'Near Anand Farm',
  phone: '+91 98109 89437',
  whatsappNumber: '+919810989437',
  email: 'info@primelearning.edu.in',
  openingHours: 'Mon - Sat: 3:00 PM - 8:30 PM | Sun: 9:00 AM - 1:00 PM',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.723485741639!2d77.0658423!3d28.5029315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d199c0d16ff1b%3A0x6b4fb6c1a8d11c0!2sSector%2022B%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  whatsappCommunityUrl: 'https://chat.whatsapp.com/PrimeLearningCommunityDemo',
  trialSlotsAvailable: 8,
};

export const getWhatsAppLink = (phoneNumber: string, message: string) => {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

export const getTelLink = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
  return `tel:${cleanNumber}`;
};

export const CONTEXTUAL_WA_MESSAGES = {
  general: 'Hello Prime Learning, I would like to know more about your coaching classes.',
  freeTrial: (grade?: string, subject?: string) => 
    `Hello Prime Learning, I want to register for a FREE Trial Class${grade ? ` for ${grade}` : ''}${subject ? ` (${subject})` : ''}.`,
  courseEnquiry: (courseTitle: string) => 
    `Hello Prime Learning, I want to enquire about details for ${courseTitle}.`,
  feeEnquiry: (grade?: string) => 
    `Hello Prime Learning, please share the fee details and timings${grade ? ` for ${grade}` : ''}.`,
  teacherEnquiry: (teacherName: string) => 
    `Hello Prime Learning, I want to ask a question regarding ${teacherName}'s batch.`,
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Teachers', href: '/teachers' },
  { label: 'Courses', href: '/courses' },
  { label: 'Fees & Timings', href: '/fees' },
  { label: 'Parent Portal', href: '/parent' },
  { label: 'Community Impact', href: '/impact' },
  { label: 'Contact', href: '/contact' },
];

export const MARKETING_PRESETS = [
  {
    templateId: 'free-trial' as const,
    name: 'Free Demo Class & Admissions Flyer',
    headline: 'Unlock Academic Excellence at Prime Learning',
    subheadline: 'Sec-22B, Gurgaon • Expert Faculty for Maths & Science',
    highlightOffer: 'FREE 3-DAY DEMO PASS + Free Diagnostic Test',
    targetClasses: 'Class 6th to 12th (CBSE & State Board)',
    batchStartDate: 'New Batches Starting Monday!',
    qrDestination: 'free-trial' as const,
    accentColor: '#f97316',
  },
  {
    templateId: 'cbse-boards' as const,
    name: 'Class 10 & 12 Board Exam Booster',
    headline: 'Target 95%+ in CBSE Board Exams',
    subheadline: 'Intensive Concept Mastery with Praveen Sir & Rashmi Ma\'am',
    highlightOffer: 'Complete NCERT + Exemplar + 10-Year PYQ Revision',
    targetClasses: 'Class 9, 10, 11 & 12 (Maths, Science & Chemistry)',
    batchStartDate: 'Limited 15 Students Per Batch Only',
    qrDestination: 'whatsapp' as const,
    accentColor: '#2563eb',
  },
  {
    templateId: 'foundation' as const,
    name: 'Class 1 to 5 Foundation & All Subjects',
    headline: 'Strong Foundation = Confident Future',
    subheadline: 'Loving, Patient Guidance & Daily Homework Assistance',
    highlightOffer: 'Small Groups (Max 8 Students) • Individual Care',
    targetClasses: 'Class 1st to 5th (All Subjects & Spoken English)',
    batchStartDate: 'Morning & Evening Convenient Timings',
    qrDestination: 'free-trial' as const,
    accentColor: '#10b981',
  },
  {
    templateId: 'table-standee' as const,
    name: 'Reception Counter QR Standee',
    headline: 'Scan to Book a Demo or Rate Us on Google',
    subheadline: 'Prime Learning Classes • 948, Sec-22B, Near Anand Farm',
    highlightOffer: 'Instant QR Registration & 5★ Google Feedback Standee',
    targetClasses: 'Mathematics • Science • Chemistry • All Subjects',
    batchStartDate: 'Call / WhatsApp: +91 98109 89437',
    qrDestination: 'google-review' as const,
    accentColor: '#7c3aed',
  },
];

export const WHATSAPP_CAMPAIGNS = [
  {
    id: 'demo-invite',
    title: 'Free Demo Class Invitation',
    category: 'Admissions',
    message: (studentName: string = 'Parent') => 
      `Dear ${studentName},\n\nPrime Learning Classes (Sec-22B Gurgaon) invites your child for a FREE 3-Day Trial Class in Maths & Science!\n\n✨ Why Choose Us:\n- Experienced Faculty: Praveen Gandhi (Maths) & Rashmi Anand (Science)\n- Small batches with personal concept attention\n- Regular weekly tests & CBSE preparation\n\n📍 Location: 948, Sec-22B, Near Anand Farm, Gurgaon\n📲 Book trial online: https://primelearning.edu.in/free-trial\n📞 Call/WhatsApp: +91 98109 89437`,
  },
  {
    id: 'fee-reminder',
    title: 'Gentle Fee Reminder',
    category: 'Accounts',
    message: (studentName: string = '[Student Name]', month: string = 'Current Month') =>
      `Dear Parent,\n\nThis is a gentle reminder from Prime Learning Classes regarding tuition fee for ${studentName} for the month of ${month}.\n\n💳 You can pay securely online via UPI/Card and download instant digital receipt: https://primelearning.edu.in/parent\n\nThank you for trusting Prime Learning with your child's education!\nPrime Learning Administration`,
  },
  {
    id: 'absent-alert',
    title: 'Instant Absentee Notice',
    category: 'Attendance',
    message: (studentName: string = '[Student Name]', date: string = 'today') =>
      `Notice from Prime Learning Classes:\n\nDear Parent, your ward ${studentName} was marked ABSENT for their scheduled coaching session on ${date}.\n\nRegularity is vital for concept continuity. Please contact teachers if leave was planned or arrange a makeup class at: https://primelearning.edu.in/parent\n\nContact: +91 98109 89437`,
  },
  {
    id: 'ptm-invite',
    title: 'Weekend PTM Invitation',
    category: 'Academics',
    message: () =>
      `Dear Parents,\n\nPrime Learning Classes cordially invites you for our upcoming Parent-Teacher Meeting (PTM) this Saturday & Sunday (4 PM - 7 PM).\n\nMeet Praveen Sir and Rashmi Ma'am to discuss your child's attendance, test performance, and exam roadmap.\n\nReserve your convenient 15-minute slot here: https://primelearning.edu.in/parent\nPrime Learning Classes, Sec-22B Gurgaon`,
  },
];

