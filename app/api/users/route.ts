import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { createUserSchema, paginationSchema } from '@/lib/validations';
import { ApiError } from '@/lib/errors';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const agentId = searchParams.get('agentId');

    // Validate pagination
    const validated = paginationSchema.parse({ page, limit, search });
    
    const skip = (validated.page - 1) * validated.limit;
    
    // Build where clause
    let where: any = {};
    
    if (auth.role === 'agent') {
      where.agentId = auth.id;
    }
    
    if (agentId && auth.role === 'admin') {
      where.agentId = agentId;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }
    
    // Get total count for pagination
    const total = await prisma.user.count({ where });
    
    // Get paginated users
    const users = await prisma.user.findMany({
      where,
      skip,
      take: validated.limit,
      orderBy: { createdAt: 'desc' },
      include: {
        agent: {
          select: {
            name: true,
            territory: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      users,
      pagination: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('GET /api/users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);
    
    // If agent is creating a user, force agentId to their own ID
    let agentId = validatedData.agentId;
    if (auth.role === 'agent') {
      agentId = auth.id;
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    const user = await prisma.user.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        status: validatedData.status || 'pending', // Default to 'pending' if not provided
        agentId: agentId,
        completionRate: 0,
      },
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('POST /api/users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}