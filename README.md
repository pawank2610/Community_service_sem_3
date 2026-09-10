# Prime Learning Classes

A modern, full-featured educational platform and institutional management system built for **Prime Learning Classes** — a coaching institute in Sec-22B, Gurgaon. The platform serves as a public-facing marketing site, a student learning portal, a teacher operations dashboard, and an admin CRM — all in one application.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ecf8e)
![Firebase](https://img.shields.io/badge/Firebase-Auth-ffca28)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Student Portal](#student-portal)
  - [Teacher Portal](#teacher-portal)
  - [Admin CRM & Operations](#admin-crm--operations)
  - [Public Website](#public-website)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [Integrations & Services](#integrations--services)
- [SEO & Metadata](#seo--metadata)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**Prime Learning Classes** offers expert coaching for Class 1–12 with a focus on Mathematics and Science. The platform digitizes the entire institute workflow — from lead capture and trial class scheduling to attendance tracking, fee collection, test grading, and AI-powered doubt resolution.

The application is built with **Next.js 15 (App Router)**, uses **localStorage** for rapid prototyping and offline-capable demos, and is architected to swap in **Supabase** and **Firebase** for production persistence and authentication.

---

## Key Features

### Student Portal

| Feature | Description |
|---------|-------------|
| **AI Instant Doubt Solver** | 24/7 step-by-step doubt resolution powered by Google Gemini, tailored for CBSE & competitive syllabi. |
| **Practice Quiz Engine** | Subject-wise interactive quizzes with instant evaluation, answer keys, and score history. |
| **CBSE Attendance Health Meter** | Visual attendance tracker with color-coded warning thresholds and QR code check-ins. |
| **PTM Report Cards** | Digital report cards showing test score analysis, rank tracking, and progress metrics. |
| **Online Fee Payments** | Secure fee collection via Razorpay (UPI, Cards, NetBanking) with auto-generated digital receipts. |
| **Leave Request & Makeup Portal** | Submit leave requests, track approval status, and schedule makeup classes. |
| **Study Materials Vault** | Access teacher-uploaded notes, assignments, and video lessons. |
| **Student Badges & Gamification** | Earn badges for attendance streaks, academic excellence, and concept mastery. |

### Teacher Portal

| Feature | Description |
|---------|-------------|
| **Batch Scoring & Gradebooks** | Enter test scores, view class rank distribution, and export report cards. |
| **QR Attendance Scanner** | Scan student QR passes for instantaneous attendance logging with camera access. |
| **Study Materials Repository** | Upload and distribute notes, assignments, PDFs, and video lessons. |
| **Absentee Alerts** | Automated WhatsApp and email notifications for student absences. |
| **Doubt Resolution Queue** | Review and reply to student doubts submitted through the AI solver. |

### Admin CRM & Operations

| Feature | Description |
|---------|-------------|
| **Trial Class Pipeline** | Lead management dashboard with status tracking: New → Contacted → Trial Scheduled → Enrolled. |
| **Student & Teacher Directory** | Centralized records with role-based session management. |
| **Payment & Revenue Tracking** | Audit logs of fee payments, outstanding dues, and revenue metrics. |
| **Broadcast Announcements** | Send batch-wide updates via WhatsApp and email. |
| **Institute Settings** | Configure institute name, address, timings, fees, and branding from one place. |

### Public Website

- **Responsive Landing Page** — Hero, stats, testimonials, courses, teachers, FAQs
- **Course Catalog** — Detailed class listings with batch timings, fees, and seat availability
- **Teacher Profiles** — Faculty bios, qualifications, and student feedback
- **Free Trial Registration** — Lead capture form with WhatsApp follow-up
- **Contact & Enquiry** — Contact form, map embed, and enquiry pipeline
- **SEO Optimized** — Semantic HTML, dynamic metadata, OpenGraph, JSON-LD schema, sitemap, and robots.txt

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 15.1.7 |
| **UI Library** | React | 19.0.0 |
| **Language** | TypeScript | 5.7.3 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **Icons** | Lucide React | 0.475.0 |
| **Database** | Supabase (PostgreSQL) | 2.48.1 |
| **Authentication** | Firebase Auth | 12.18.0 |
| **Payments** | Razorpay | — |
| **AI / LLM** | Google Gemini API | — |
| **Communications** | WhatsApp Cloud API, Twilio, Resend | — |
| **Utilities** | clsx, tailwind-merge | — |

---

## Project Structure

```
├── .env.example                 # Environment variable template
├── .env.local                   # Local environment overrides (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── Prime_Learning_Logo.png
├── README.md
│
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout with SEO metadata & structured data
│   ├── page.tsx                 # Landing page (Hero, Courses, Teachers, Testimonials)
│   ├── globals.css              # Global styles & Tailwind directives
│   ├── sitemap.ts               # Dynamic XML sitemap
│   ├── robots.ts                # robots.txt configuration
│   │
│   ├── about/page.tsx           # About Us — institute story, vision, faculty
│   ├── courses/page.tsx         # Full course catalog with filtering
│   ├── teachers/page.tsx        # Faculty directory with detailed profiles
│   ├── testimonials/page.tsx    # Student & parent testimonials
│   ├── fees/page.tsx            # Fee structure, payment plans, timings
│   ├── contact/page.tsx         # Contact form, enquiry modal, map
│   ├── login/page.tsx           # Role-based authentication (Student / Teacher / Admin)
│   │
│   ├── student/page.tsx         # Student dashboard (redirects to dashboard view)
│   ├── teacher/page.tsx         # Teacher dashboard (redirects to dashboard view)
│   ├── admin/page.tsx           # Admin CRM dashboard
│   │
│   └── free-trial/page.tsx      # Free trial registration flow
│
├── components/                  # Reusable React components
│   ├── Navbar.tsx               # Responsive navigation with mobile menu
│   ├── Footer.tsx               # Site footer with links, contact, SEO
│   ├── Hero.tsx                 # Landing page hero with CTAs
│   ├── StatsSection.tsx         # Trust indicators (students, years, results)
│   ├── WhyChooseUs.tsx          # 6-pillar value proposition section
│   ├── CourseCard.tsx           # Course listing card with status badges
│   ├── TeacherCard.tsx          # Teacher profile card
│   ├── TestimonialCard.tsx      # Testimonial display card
│   ├── FAQSection.tsx           # Accordion-style FAQs
│   ├── LocationSection.tsx      # Google Maps embed & address
│   ├── TrialForm.tsx            # Free trial lead capture form
│   ├── EnquiryModal.tsx         # General enquiry modal
│   ├── ReportCardModal.tsx      # Student report card viewer
│   ├── PracticeQuizModal.tsx    # Interactive quiz engine
│   ├── DoubtResolverModal.tsx   # AI-powered doubt solver interface
│   ├── QRAttendanceModal.tsx    # QR code generator for student check-in
│   ├── QRScannerModal.tsx       # Camera-based QR scanner for teachers
│   ├── FeePaymentModal.tsx      # Razorpay payment modal
│   ├── LeaveRequestModal.tsx    # Leave application form
│   ├── MobileStickyBar.tsx      # Bottom sticky CTA bar for mobile
│   ├── WhatsAppFloatingButton.tsx # Floating WhatsApp chat button
│   ├── SEOStructuredData.tsx    # JSON-LD schema injection
│   │
│   └── dashboards/
│       ├── StudentDashboardView.tsx  # Full student portal UI
│       ├── TeacherDashboardView.tsx  # Full teacher portal UI
│       └── AdminDashboardView.tsx    # Full admin CRM UI
│
├── lib/                         # Business logic, data layer, types
│   ├── types.ts                 # TypeScript interfaces for all entities
│   ├── constants.ts             # App constants, WhatsApp links, nav config
│   ├── mockData.ts              # Seed data for offline/demo mode
│   ├── db.ts                    # LocalStorage data access layer (swap with Supabase)
│   ├── supabase.ts              # Supabase client configuration
│   ├── firebase.ts              # Firebase client configuration
│   └── schema.sql               # PostgreSQL schema for Supabase
│
└── public/                      # Static assets
    ├── logo.png
    ├── logo-transparent.png
    ├── logo-dark.png
    └── ... (images, favicons)
```

---

## Database Schema

The application is designed with a **Supabase / PostgreSQL** schema. During development, data is persisted in **localStorage** for instant prototyping without a backend. The full schema is defined in `lib/schema.sql`.

### Core Tables

| Table | Purpose |
|-------|---------|
| `settings` | Institute configuration (name, address, contact, branding) |
| `users` | Authentication accounts (ADMIN, TEACHER, STUDENT roles) |
| `courses` | Course definitions with grades, subjects, fees, and seat counts |
| `teachers` | Faculty profiles with qualifications, subjects, and bios |
| `batches` | Scheduled class batches linked to teachers and courses |
| `students` | Student records with parent info, batch assignments, and status |
| `enquiries` | CRM pipeline for prospective student leads |
| `trial_registrations` | Free trial class registrations with conversion tracking |
| `attendance` | Daily attendance records with QR/MANUAL check-in methods |
| `test_results` | Test scores with auto-calculated percentages |
| `announcements` | Batch-targeted announcements |
| `study_materials` | Uploaded notes, PDFs, and video lessons |
| `fee_payments` | Payment records with Razorpay transaction IDs |
| `leave_requests` | Student leave applications with makeup scheduling |
| `student_badges` | Gamification badges (ATTENDANCE, ACADEMIC, CONCEPT_MASTERY) |
| `student_doubts` | AI/teacher doubt resolution queue |
| `video_lessons` | Recorded lesson library |
| `quiz_questions` | Question bank for practice quizzes |
| `quiz_results` | Quiz attempt history |

### Row Level Security (RLS)

Supabase RLS policies are defined for:
- **Public read access**: `settings`, `courses`, `teachers`
- **Public insert access**: `enquiries`, `trial_registrations`
- Additional policies can be added for authenticated role-based access.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

```env
# =================================================================
# 1. FIREBASE — Client Authentication & Storage
# =================================================================
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# =================================================================
# 2. SUPABASE — Database, Realtime & Storage
# =================================================================
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# =================================================================
# 3. RAZORPAY — Payment Gateway (UPI / QR / Cards / NetBanking)
# =================================================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# =================================================================
# 4. GEMINI AI — Instant Doubt Solver & Quiz Generation
# =================================================================
NEXT_PUBLIC_GEMINI_API_KEY=

# =================================================================
# 5. EMAIL — Resend / SendGrid for receipts & alerts
# =================================================================
RESEND_API_KEY=
EMAIL_FROM_ADDRESS="Prime Learning <admissions@primelearning.edu.in>"
ADMIN_ALERT_EMAIL=

# =================================================================
# 6. WHATSAPP & SMS — Meta WhatsApp Cloud API / Twilio
# =================================================================
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# =================================================================
# 7. APP URL & ANALYTICS
# =================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

> **Note**: For local development without backend services, the app runs fully in **offline/demo mode** using localStorage and mock data. No environment variables are required to view the UI.

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or **yarn** / **pnpm**)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/prime-learning.git
cd prime-learning

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server on http://localhost:3000
npm run dev
```

The app opens at `http://localhost:3000`. No database or API keys are required for the demo — all data is seeded from `lib/mockData.ts` and persisted in localStorage.

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm run start
```

### Linting

```bash
npm run lint
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, courses, teachers, testimonials, FAQs |
| `/about` | About Prime Learning — story, mission, faculty |
| `/courses` | Full course catalog with grade/subject filters |
| `/teachers` | Faculty directory with detailed bios |
| `/testimonials` | Student & parent testimonials |
| `/fees` | Fee structure, payment plans, and batch timings |
| `/contact` | Contact form, enquiry modal, embedded map |
| `/login` | Role-based login (Student / Teacher / Admin) |
| `/student` | Student dashboard (after login) |
| `/teacher` | Teacher dashboard (after login) |
| `/admin` | Admin CRM dashboard (after login) |
| `/free-trial` | Free trial registration page |

---

## Key Components

### Modals
- **EnquiryModal** — General lead capture with course pre-selection
- **TrialForm** — Free trial registration with parent/student details
- **PracticeQuizModal** — Interactive quiz with timer, scoring, and explanations
- **DoubtResolverModal** — AI chat interface powered by Gemini
- **QRAttendanceModal** — Generates unique QR codes for student check-in
- **QRScannerModal** — Camera-based QR scanner for teacher attendance logging
- **FeePaymentModal** — Razorpay payment flow with receipt generation
- **LeaveRequestModal** — Leave application with makeup class scheduling
- **ReportCardModal** — Visual report card with subject-wise breakdown

### Dashboard Views
- **StudentDashboardView** — Attendance health meter, upcoming tests, fee status, doubt resolver, video vault, badges
- **TeacherDashboardView** — Batch overview, attendance scanner, gradebook, study material upload
- **AdminDashboardView** — CRM pipeline, revenue dashboard, announcement center, institute settings

### Layout & Navigation
- **Navbar** — Responsive nav with role-aware links and CTA buttons
- **Footer** — Multi-column footer with contact info, quick links, and social proof
- **MobileStickyBar** — Bottom-fixed CTA bar for mobile users
- **WhatsAppFloatingButton** — Always-visible WhatsApp chat button with contextual messages
- **SEOStructuredData** — JSON-LD LocalBusiness schema injection

---

## Integrations & Services

### Supabase
- **Purpose**: Production database, row-level security, and realtime subscriptions
- **Files**: `lib/supabase.ts`, `lib/schema.sql`
- **Usage**: Replace `localStorage` calls in `lib/db.ts` with Supabase queries

### Firebase Auth
- **Purpose**: Client-side email/password and Google authentication
- **Files**: `lib/firebase.ts`
- **Usage**: Handles login state for Student, Teacher, and Admin roles

### Razorpay
- **Purpose**: UPI, card, and net-banking payments for fee collection
- **Files**: `components/FeePaymentModal.tsx`
- **Flow**: Create order → Razorpay Checkout → Verify payment → Generate receipt

### Google Gemini AI
- **Purpose**: 24/7 AI doubt solver and auto-generated practice quizzes
- **Files**: `components/DoubtResolverModal.tsx`, `components/PracticeQuizModal.tsx`
- **Model**: Gemini 1.5 Flash for fast, cost-effective responses

### WhatsApp Business API
- **Purpose**: Absentee alerts, test mark releases, fee reminders, and lead follow-ups
- **Files**: `lib/constants.ts` (contextual message templates)
- **Flow**: Trigger webhook → Send template message via Meta WhatsApp Cloud API

### Email (Resend)
- **Purpose**: Fee receipts, admission confirmations, report cards
- **Files**: API route handlers (to be added)

---

## SEO & Metadata

The project is optimized for local SEO targeting **Sec-22B, Gurgaon**:

- **Dynamic Metadata** — Title, description, and keywords per page (`app/layout.tsx`)
- **OpenGraph** — Social sharing cards for Facebook, LinkedIn, WhatsApp
- **JSON-LD Schema** — `LocalBusiness`, `EducationalOrganization`, `Course` structured data (`components/SEOStructuredData.tsx`)
- **Sitemap** — Auto-generated XML sitemap (`app/sitemap.ts`)
- **Robots.txt** — Search engine crawling rules (`app/robots.ts`)

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Environment Variables

Ensure all variables from `.env.example` are set in your deployment platform (Vercel, Netlify, Railway, etc.).

---

## Roadmap

- [ ] Supabase auth integration replacing Firebase
- [ ] Server-side Razorpay webhook verification
- [ ] Real-time notifications via Supabase Realtime
- [ ] Parent mobile app (React Native)
- [ ] Online class scheduling with calendar sync
- [ ] AI-generated personalized study plans
- [ ] Multi-institute multi-tenant support
- [ ] Offline PWA mode with service workers

---

## License

Private & Proprietary — Developed for **Prime Learning Classes**.

---

Built with care for students, teachers, and administrators.
