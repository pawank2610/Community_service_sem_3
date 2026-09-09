# The Prime Learning 🎓

A modern, full-featured educational platform and institutional management system built with Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase, and Firebase.

---

## 🚀 Key Features

### 👨‍🎓 Student Portal
- **AI Instant Doubt Solver**: Real-time AI-powered doubt resolution tailored for CBSE & competitive syllabi.
- **Practice Quiz Engine**: Subject-wise interactive practice tests with instant evaluation and answer keys.
- **CBSE Attendance Health Meter**: Track attendance percentage with color-coded warning thresholds and QR code check-ins.
- **PTM Report Cards**: Digital report cards with test score analysis, rank tracking, and progress metrics.
- **Online Fee Payments**: Secure fee payments via UPI and digital receipts.
- **Leave Request & Makeup Portal**: Submit leaves and schedule makeup sessions seamlessly.

### 👩‍🏫 Teacher Portal
- **Batch Scoring & Gradebooks**: Enter and manage test scores, view class rank distribution.
- **QR Attendance Scanner**: Scan student QR passes for instantaneous attendance logging.
- **Study Materials Repository**: Distribute notes, assignments, and curriculum resources.
- **Absentee Alerts**: Automated notifications for student absence and parent coordination.

### 🛡️ Admin CRM & Operations
- **Trial Class Pipeline**: Lead management and conversion pipeline for prospective students.
- **Student & Teacher Directory**: Centralized records with role-based session management.
- **Payment & Revenue Tracking**: Audit logs of fee payments, outstanding dues, and revenue metrics.
- **Broadcast Announcements**: Send batch-wide updates and WhatsApp notifications.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) & [Firebase Auth](https://firebase.google.com/)
- **SEO**: Semantic HTML, Dynamic Metadata, OpenGraph cards, JSON-LD Schema

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18+ installed on your machine.

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 4. Running the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
│   ├── about/            # About Us page
│   ├── admin/            # Admin CRM & dashboard
│   ├── contact/          # Contact page & enquiries
│   ├── courses/          # Course listings and details
│   ├── fees/             # Fee payment portal
│   ├── free-trial/       # Free trial registration
│   ├── login/            # Authentication & role-based sign-in
│   ├── student/          # Student learning dashboard
│   ├── teacher/          # Teacher grading & attendance dashboard
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components & modals
│   ├── dashboards/       # Role-specific dashboard views
│   ├── DoubtResolverModal.tsx
│   ├── FeePaymentModal.tsx
│   ├── PracticeQuizModal.tsx
│   └── QRAttendanceModal.tsx
├── lib/                  # Database clients, schema & type definitions
└── public/               # Static assets & images
```

---

## 📄 License

Private & Proprietary — Developed for The Prime Learning.




<!-- Test -->