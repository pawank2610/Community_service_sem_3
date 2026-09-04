import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== '' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { message: 'Supabase authentication credentials not configured in environment.' } };
  }
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = async (email: string, password: string, options?: any) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { message: 'Supabase authentication credentials not configured in environment.' } };
  }
  return await supabase.auth.signUp({ email, password, options });
};

export const signOutUser = async () => {
  if (!isSupabaseConfigured()) return { error: null };
  return await supabase.auth.signOut();
};
