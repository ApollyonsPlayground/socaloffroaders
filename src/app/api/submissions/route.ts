import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // [PHASE 2: SCHEMA ALIGNMENT] - Enhanced validation matching frontend payload
    
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

    // Validate content_payload is not empty
    if (typeof body.content_payload !== 'object' || Object.keys(body.content_payload).length === 0) {
      return NextResponse.json(
        { error: 'content_payload cannot be empty' },
        { status: 400 }
      );
    }

    // Run-specific validation
    if (body.type === 'run') {
      const requiredRunFields = ['title', 'date', 'meetupPoint', 'description', 'difficulty', 'maxRigs'];
      const missingFields = requiredRunFields.filter(field => !body.content_payload[field]);
      
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required run fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }

      // Validate difficulty enum
      const validDifficulties = ['Beginner', 'Moderate', 'Advanced', 'Extreme'];
      if (!validDifficulties.includes(body.content_payload.difficulty)) {
        return NextResponse.json(
          { error: 'Invalid difficulty. Must be Beginner, Moderate, Advanced, or Extreme' },
          { status: 400 }
        );
      }

      // Validate maxRigs is a positive number
      const maxRigs = parseInt(body.content_payload.maxRigs);
      if (isNaN(maxRigs) || maxRigs < 1 || maxRigs > 50) {
        return NextResponse.json(
          { error: 'maxRigs must be between 1 and 50' },
          { status: 400 }
        );
      }
    }

    // Trail-specific validation
    if (body.type === 'trail') {
      if (!body.content_payload.onxSlug) {
        return NextResponse.json(
          { error: 'Missing required trail field: onxSlug' },
          { status: 400 }
        );
      }
    }

    // Create submission with mapped fields
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