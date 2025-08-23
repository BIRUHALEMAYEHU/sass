import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a mock client if environment variables are not set
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface PortfolioData {
  id?: string
  user_id: string
  personal_info: {
    name: string
    title: string
    bio: string
    email: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
  }
  skills: string[]
  projects: {
    id: string
    title: string
    description: string
    technologies: string[]
    link?: string
    github?: string
  }[]
  education: {
    id: string
    degree: string
    institution: string
    year: string
    description?: string
  }[]
  experience: {
    id: string
    title: string
    company: string
    period: string
    description: string
  }[]
  created_at?: string
  updated_at?: string
}

// Mock functions for testing without Supabase
export const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
    signUp: async () => ({ error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: { message: 'Supabase not configured' } })
      })
    }),
    upsert: async () => ({ error: { message: 'Supabase not configured' } })
  })
}

// Use mock if no real Supabase config
export const supabaseClient = supabaseUrl === 'https://placeholder.supabase.co' ? mockSupabase : supabase
