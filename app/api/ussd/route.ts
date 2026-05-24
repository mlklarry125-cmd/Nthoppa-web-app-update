import { NextRequest, NextResponse } from 'next/server';
import { USSDHandler } from '@/lib/ussd-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, phoneNumber, text, network } = body;
    
    // Handle different USSD gateway formats
    const input = text || body.input || '';
    
    const response = await USSDHandler.handleRequest(
      sessionId,
      phoneNumber,
      input,
      network || 'unknown'
    );
    
    // Return response in USSD format
    return new NextResponse(response, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('USSD Error:', error);
    return new NextResponse('END An error occurred. Please try again.', {
      status: 500,
    });
  }
}

// Handle GET for testing
export async function GET(request: NextRequest) {
  return new NextResponse('USSD endpoint is ready. Send POST requests with sessionId, phoneNumber, and text.', {
    status: 200,
  });
}