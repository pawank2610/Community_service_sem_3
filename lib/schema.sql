-- PRIME LEARNING COACHING INSTITUTE DATABASE SCHEMA FOR SUPABASE / POSTGRESQL

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. INSTITUTE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'Prime Learning Classes',
    tagline VARCHAR(255) DEFAULT 'Maths, Science & All-Subject Tutoring | Quality Coaching & Personal Attention',
    location_name VARCHAR(255) DEFAULT 'Sec-22B, Gurgaon',
    address TEXT DEFAULT '948, Sec-22B, Near Anand Farm, Gurgaon',
    landmark VARCHAR(255) DEFAULT 'Near Anand Farm',
    phone VARCHAR(50) DEFAULT '+91 98109 89437',
    whatsapp_number VARCHAR(50) DEFAULT '+919810989437',
    email VARCHAR(255) DEFAULT 'info@primelearning.edu.in',
    opening_hours VARCHAR(255) DEFAULT 'Mon - Sat: 3:00 PM - 8:30 PM | Sun: 9:00 AM - 1:00 PM',
    google_maps_embed_url TEXT,
    whatsapp_community_url TEXT,
    trial_slots_available INT DEFAULT 8,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USERS & ROLES TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT')),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    batch_timing VARCHAR(255),
    monthly_fee VARCHAR(100),
    available_seats INT DEFAULT 10,
    status VARCHAR(50) DEFAULT 'Open' CHECK (status IN ('Open', 'Fast Filling', 'Full')),
    highlights TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TEACHERS TABLE
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    qualification VARCHAR(255),
    experience VARCHAR(255),
    subjects TEXT[],
    classes_taught TEXT[],
    teaching_philosophy TEXT,
    areas_of_expertise TEXT[],
    achievements TEXT[],
    photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BATCHES TABLE
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    days VARCHAR(100),
    start_time VARCHAR(50),
    end_time VARCHAR(50),
    room VARCHAR(100),
    max_students INT DEFAULT 15,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Full')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ENQUIRIES TABLE (CRM Pipeline)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    grade VARCHAR(100),
    subject VARCHAR(100),
    preferred_timing VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Trial Scheduled', 'Trial Completed', 'Enrolled', 'Not Interested')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TRIAL REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.trial_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    preferred_timing VARCHAR(100),
    preferred_teacher VARCHAR(255),
    trial_date DATE,
    status VARCHAR(50) DEFAULT 'Registered' CHECK (status IN ('Registered', 'Contacted', 'Scheduled', 'Attended', 'Absent', 'Converted', 'Not Converted')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    subjects TEXT[],
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    teacher_name VARCHAR(255),
    admission_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Trial', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent')),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TEST RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_name VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    grade VARCHAR(100),
    date DATE DEFAULT CURRENT_DATE,
    max_marks NUMERIC(5,2) NOT NULL,
    marks_obtained NUMERIC(5,2) NOT NULL,
    percentage NUMERIC(5,2) GENERATED ALWAYS AS ((marks_obtained / max_marks) * 100) STORED,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_grade VARCHAR(100) DEFAULT 'All',
    author VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. STUDY MATERIALS TABLE
CREATE TABLE IF NOT EXISTS public.study_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    file_type VARCHAR(50) DEFAULT 'PDF',
    download_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY POLICIES
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings, courses, teachers
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read teachers" ON public.teachers FOR SELECT USING (true);

-- Allow public insert on enquiries and trial registrations
CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert trial registrations" ON public.trial_registrations FOR INSERT WITH CHECK (true);
