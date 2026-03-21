import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.type || !body.content_payload) {
      return NextResponse.json(
        { error: 'Missing required fields: type and content_payload' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['run', 'trail'].includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "run" or "trail"' },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await createSubmission({
      type: body.type,
      content_payload: body.content_payload,
      user_contact: body.user_contact || null,
      status: 'pending'
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Submission received - Our team will verify and post shortly.',
        data: submission 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}