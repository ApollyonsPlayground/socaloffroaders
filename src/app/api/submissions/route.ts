import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration. Check environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/submissions
 * Handles form submissions from the Submission Hub
 * Inserts data into the Supabase submissions table
 */
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request
    const body = await request.json();

    // Validate required fields
    if (!body) {
      return Response.json(
        { success: false, error: 'Request body is required' },
        { status: 400 }
      );
    }

    // Insert the payload into the submissions table
    const { data, error } = await supabase
      .from('submissions')
      .insert([body])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Return 200 OK on success
    return Response.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('API route error:', err);
    return Response.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/submissions
 * Optional: Retrieve submissions
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return Response.json(
        { success: false, error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('API route error:', err);
    return Response.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}