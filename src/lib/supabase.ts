import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'contacted' | 'enrolled' | 'closed';
}

export interface Topper {
  id?: string;
  name: string;
  achievement: string;
  year: string;
  exam: string;
  score?: string;
  photo_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  rank: string;
  avatar_url?: string;
  is_active?: boolean;
  created_at?: string;
}
