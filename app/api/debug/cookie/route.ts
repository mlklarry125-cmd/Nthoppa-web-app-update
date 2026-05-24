import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const agentSession = request.cookies.get('agent_session')?.value;
  const adminSession = request.cookies.get('admin_session')?.value;
  
  return NextResponse.json({
    hasAgentSession: !!agentSession,
    hasAdminSession: !!adminSession,
    agentSessionLength: agentSession?.length || 0,
    adminSessionLength: adminSession?.length || 0,
    allCookies: request.headers.get('cookie') || 'none',
  });
}