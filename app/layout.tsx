import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import SEOStructuredData from '@/components/SEOStructuredData';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://primelearning.edu.in'),
  title: 'Prime Learning Classes | Maths, Science & Tutoring in Sec-22B, Gurgaon',
  description: 'Prime Learning Classes offers expert tutoring for Class 1-5 (All Subjects), Class 6-10 (Maths & Science), and Class 11-12 (Maths & Chemistry). Faculty: Praveen Gandhi (Maths) & Rashmi Anand (Science).',
  keywords: [
    'coaching classes in Sec-22B Gurgaon',
    'tuition classes near Anand Farm Gurgaon',
    'math tuition Gurgaon',
    'science tuition Gurgaon',
    'Praveen Gandhi maths teacher',
    'Rashmi Anand science teacher',
    'Class 1 to 5 tuition Gurgaon',
    'Class 6 to 10 Maths and Science',
  ],
  authors: [{ name: 'Prime Learning Classes' }],
  openGraph: {
    title: 'Prime Learning Classes | Maths, Science, Tutoring in Gurgaon',
    description: 'Trusted local coaching institute in Sec-22B Gurgaon led by Praveen Gandhi (Maths) and Rashmi Anand (Science).',
    images: ['/logo.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo-transparent.png" />
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-prime-orange selection:text-white">
        <SEOStructuredData />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileStickyBar />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
