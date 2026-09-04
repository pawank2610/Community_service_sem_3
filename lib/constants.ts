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
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];
