'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { NAV_LINKS, getTelLink, getWhatsAppLink, CONTEXTUAL_WA_MESSAGES } from '@/lib/constants';
import { db } from '@/lib/db';

export default function Footer() {
  const settings = db.getSettings();

  return (
    <footer className="bg-prime-dark text-slate-300 pt-16 pb-12 border-t-4 border-prime-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="relative w-48 h-14 bg-white/90 p-2 rounded-xl overflow-hidden shrink-0" style={{ maxWidth: '192px', maxHeight: '56px' }}>
              <Image 
                src="/logo-transparent.png" 
                alt="Prime Learning Logo" 
                width={192}
                height={56}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              {settings.tagline}. Trusted local coaching institute providing individual student focus, experienced teaching, and strong academic fundamentals.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-prime-orange hover:text-white flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-prime-orange hover:text-white flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-prime-orange hover:text-white flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold uppercase tracking-wider text-prime-orange">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white hover:translate-x-1 inline-flex items-center transition-all text-slate-300"
                  >
                    <ArrowRight className="w-3 h-3 text-prime-orange mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/free-trial" 
                  className="hover:text-white inline-flex items-center transition text-prime-orange font-semibold"
                >
                  <ArrowRight className="w-3 h-3 text-prime-orange mr-2" />
                  Book FREE Trial
                </Link>
              </li>
              <li>
                <Link 
                  href="/login" 
                  className="hover:text-white inline-flex items-center transition text-slate-400 hover:text-slate-200"
                >
                  <ShieldCheck className="w-3 h-3 text-slate-400 mr-2" />
                  Student / Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold uppercase tracking-wider text-prime-orange">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-prime-orange mr-3 shrink-0 mt-0.5" />
                <span>
                  <strong>{settings.name}</strong><br />
                  {settings.address}<br />
                  <span className="text-xs text-slate-400">Landmark: {settings.landmark}</span>
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-prime-orange mr-3 shrink-0" />
                <a href={getTelLink(settings.phone)} className="hover:text-white transition">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center">
                <MessageSquare className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                <a 
                  href={getWhatsAppLink(settings.whatsappNumber, CONTEXTUAL_WA_MESSAGES.general)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition text-emerald-300"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-prime-orange mr-3 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Community Join */}
          <div className="space-y-4 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Community</span>
            </div>
            <h4 className="text-white text-base font-bold">Stay Connected With Us</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get official announcements, class schedules, test timetables, and study tips directly on WhatsApp.
            </p>
            <a
              href={settings.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md"
            >
              Join WhatsApp Community
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {settings.name}. All Rights Reserved. Trusted Local Coaching Institute.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-200 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition">Terms & Conditions</a>
            <Link href="/login" className="hover:text-slate-200 transition text-slate-400">Admin Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
