import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
type Difficulty = 'Beginner' | 'Moderate' | 'Advanced' | 'Extreme';
type TrailStatus = 'Open' | 'Closed' | 'Seasonal';
type SubmissionType = 'run' | 'trail';
type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Trail {
  id: string;
  title: string;
  location: string;
  difficulty: Difficulty;
  difficulty_level: string;
  rig_requirements: string;
  onx_slug: string;
  coordinates: string;
  status: TrailStatus;
  image_url: string;
  distance: string;
  time_estimate: string;
  description: string;
  terrain: string;
  created_at?: string;
}

export interface Run {
  id: string;
  title: string;
  date: string;
  meetup_location: string;
  description: string;
  difficulty: Difficulty;
  max_rigs: number;
  rigs_joined: number;
  trail_id: string;
  is_verified: boolean;
  organizer_name: string;
  organizer_instagram: string;
  created_at?: string;
}

export interface Submission {
  id: string;
  type: SubmissionType;
  content_payload: Record<string, any>;
  user_contact?: string;
  status: SubmissionStatus;
  created_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

// Helper functions
export async function getTrails() {
  const { data, error } = await supabase
    .from('trails')
    .select('*')
    .order('title', { ascending: true });
  
  if (error) throw error;
  return data as Trail[];
}

export async function getRuns() {
  const { data, error } = await supabase
    .from('runs')
    .select('*')
    .eq('is_verified', true)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data as Run[];
}

export async function createSubmission(submission: Omit<Submission, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('submissions')
    .insert([submission])
    .select()
    .single();
  
  if (error) throw error;
  return data as Submission;
}