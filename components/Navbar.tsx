'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare, GraduationCap, UserCheck } from 'lucide-react';
import { NAV_LINKS, getTelLink, getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import { db } from '@/lib/db';

interface NavbarProps {
  onOpenTrialModal?: () => void;
  onOpenEnquiryModal?: () => void;
}

export default function Navbar({ onOpenTrialModal, onOpenEnquiryModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const settings = db.getSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100' 
        : 'bg-white py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative w-36 h-12 sm:w-44 sm:h-14 transition-transform group-hover:scale-105 overflow-hidden shrink-0" style={{ maxWidth: '176px', maxHeight: '56px' }}>
              <Image 
                src="/logo-transparent.png" 
                alt="Prime Learning Logo" 
                width={176}
                height={56}
                className="w-full h-full object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-prime-orange bg-prime-orange-light font-semibold'
                      : 'text-slate-700 hover:text-prime-orange hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/login"
              className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              title="Student, Teacher & Admin Login"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1.5 text-prime-orange" />
              Portal Login
            </Link>

            <Link
              href="/free-trial"
              onClick={(e) => {
                if (onOpenTrialModal) {
                  e.preventDefault();
                  onOpenTrialModal();
                }
              }}
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white bg-prime-orange hover:bg-prime-orange-hover shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Book Free Trial
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/free-trial"
              onClick={(e) => {
                if (onOpenTrialModal) {
                  e.preventDefault();
                  onOpenTrialModal();
                }
              }}
              className="px-3 py-1.5 text-xs font-bold text-white bg-prime-orange rounded-lg shadow-sm"
            >
              Free Trial
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-prime-orange hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-prime-orange bg-prime-orange-light font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/free-trial"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTrialModal) onOpenTrialModal();
              }}
              className="w-full text-center py-3 rounded-xl text-base font-bold text-white bg-prime-orange shadow-md"
            >
              🎓 Book FREE Trial Class
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 bg-slate-50"
            >
              🔑 Student & Admin Login
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={getTelLink(settings.phone)}
                className="flex items-center justify-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
                Call Now
              </a>

              <a
                href={getWhatsAppLink(settings.whatsappNumber, CONTEXTUAL_WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-2 px-3 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
