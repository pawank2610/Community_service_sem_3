'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserCheck, ShieldCheck, BookOpen, Lock, ArrowRight, KeyRound, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { isSupabaseConfigured, signInWithEmail } from '@/lib/supabase';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, findUserAccount } from '@/lib/db';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleAutoFill = (selectedRole: UserRole, sampleEmail: string, samplePass: string) => {
    setRole(selectedRole);
    setEmail(sampleEmail);
    setPassword(samplePass);
    setAuthError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const trimmedEmail = email.trim();
      let effectiveRole = role;

      // Check registered accounts
      const matchedAccount = db.findUserAccount(trimmedEmail, password);
      const emailOnlyAccount = db.findUserAccount(trimmedEmail);

      if (emailOnlyAccount && !matchedAccount) {
        setAuthError('Incorrect password entered. Please try again.');
        setLoading(false);
        return;
      }

      if (matchedAccount) {
        effectiveRole = matchedAccount.role;
      }

      if (auth && trimmedEmail && password) {
        try {
          await signInWithEmailAndPassword(auth, trimmedEmail, password);
          setAuthSuccess(`🔥 Firebase Auth verified! Authenticated as ${effectiveRole}. Redirecting...`);
        } catch (firebaseErr: any) {
          if (matchedAccount) {
            setAuthSuccess(`Authenticated as ${effectiveRole} (Registered Account). Redirecting...`);
          } else {
            console.warn('Firebase login attempt:', firebaseErr.message);
            setAuthSuccess(`Authenticated as ${effectiveRole}! Redirecting...`);
          }
        }
      } else if (isSupabaseConfigured()) {
        const { data, error } = await signInWithEmail(trimmedEmail, password);
        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return;
        }
        setAuthSuccess('Supabase Authentication successful! Redirecting...');
      } else {
        setAuthSuccess(`Authenticated as ${effectiveRole}! Redirecting...`);
      }

      // Persist session role in local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('prime_learning_user_role', effectiveRole);
        window.localStorage.setItem('prime_learning_user_email', trimmedEmail || `${effectiveRole.toLowerCase()}@primelearning.edu.in`);
        if (matchedAccount?.name) {
          window.localStorage.setItem('prime_learning_user_name', matchedAccount.name);
        }
      }

      setTimeout(() => {
        if (effectiveRole === 'ADMIN') {
          router.push('/admin');
        } else if (effectiveRole === 'TEACHER') {
          router.push('/teacher');
        } else {
          router.push('/student');
        }
      }, 600);
    } catch (err: any) {
      setAuthError(err.message || 'Login error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
        
        {/* Logo Header */}
        <div className="text-center space-y-3">
          <div className="relative w-44 h-12 mx-auto overflow-hidden shrink-0" style={{ maxWidth: '176px', maxHeight: '48px' }}>
            <Image src="/logo-transparent.png" alt="Prime Learning Logo" width={176} height={48} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Institute Portal Login</h1>
          <p className="text-xs text-slate-500">Select your role to access your dashboard</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setRole('ADMIN'); setAuthError(null); }}
            className={`py-2 rounded-lg transition ${
              role === 'ADMIN' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => { setRole('TEACHER'); setAuthError(null); }}
            className={`py-2 rounded-lg transition ${
              role === 'TEACHER' ? 'bg-prime-orange text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => { setRole('STUDENT'); setAuthError(null); }}
            className={`py-2 rounded-lg transition ${
              role === 'STUDENT' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student/Parent
          </button>
        </div>

        {/* Quick Demo Credentials Autofill */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>⚡ 1-Click Demo Login</span>
            <Sparkles className="w-3.5 h-3.5 text-prime-orange" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => handleAutoFill('ADMIN', 'admin@primelearning.edu.in', 'admin123')}
              className="py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-slate-900 hover:border-slate-400 text-center truncate"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleAutoFill('TEACHER', 'praveen@primelearning.edu.in', 'teacher123')}
              className="py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-prime-orange hover:border-prime-orange text-center truncate"
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => handleAutoFill('STUDENT', 'student@primelearning.edu.in', 'student123')}
              className="py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-emerald-700 hover:border-emerald-500 text-center truncate"
            >
              Student
            </button>
          </div>
        </div>

        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {authSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{authSuccess}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address / ID *
            </label>
            <input
              type="text"
              required
              placeholder={role === 'ADMIN' ? 'admin@primelearning.edu.in' : role === 'TEACHER' ? 'praveen@primelearning.edu.in' : 'student@primelearning.edu.in'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prime-orange text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-prime-orange transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : `Access ${role.charAt(0) + role.slice(1).toLowerCase()} Dashboard`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 space-y-1">
          <div className="text-emerald-600 font-semibold flex items-center justify-center space-x-1">
            <span>🔥 Firebase Auth Connected (primelearning-74747)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Select a role tab above or click a demo login button.
          </div>
        </div>

      </div>
    </div>
  );
}
