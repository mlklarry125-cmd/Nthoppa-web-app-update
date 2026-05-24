import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { communicationSchema, paginationSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // For agents, find by loginEmail
    let agentId = null;
    if (payload.role === 'agent') {
      const agent = await prisma.agent.findFirst({
        where: { loginEmail: payload.email },
        select: { id: true }
      });
      if (agent) {
        agentId = agent.id;
      } else {
        return NextResponse.json([], { status: 200 }); // Return empty array if agent not found
      }
    }
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const validated = paginationSchema.parse({ page, limit });
    const skip = (validated.page - 1) * validated.limit;
    
    // Build where clause
    let where: any = {};
    
    if (payload.role === 'agent' && agentId) {
      where.fromAgentId = agentId;
    }
    
    if (userId) {
      where.toUserId = userId;
    }
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }
    
    const total = await prisma.communication.count({ where });
    
    const communications = await prisma.communication.findMany({
      where,
      skip,
      take: validated.limit,
      orderBy: { timestamp: 'desc' },
      include: {
        fromAgent: {
          select: {
            name: true,
            territory: true,
          },
        },
        toUser: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    
    // Return plain array with pagination metadata in headers if needed
    return NextResponse.json(communications);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('GET /api/communications error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id || payload.role !== 'agent') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find agent by loginEmail
    const agent = await prisma.agent.findFirst({
      where: { loginEmail: payload.email },
      select: { id: true }
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    const body = await request.json();
    const validatedData = communicationSchema.parse(body);
    
    const communication = await prisma.communication.create({
      data: {
        fromAgentId: agent.id,
        toUserId: validatedData.toUserId,
        message: validatedData.message,
        type: validatedData.type,
        status: 'pending', // Default status
        timestamp: new Date(),
      },
    });
    
    return NextResponse.json(communication, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('POST /api/communications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}