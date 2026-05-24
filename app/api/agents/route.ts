// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

function serializeAgent(a: any) {
  // Never expose the hashed password to the client
  const { loginPassword: _pw, ...rest } = a;
  return {
    ...rest,
    createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt,
    updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : a.updatedAt,
  };
}

// GET /api/agents
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

    // Admins can see all agents; agents can only see themselves
    let where = {};
    if (payload.role !== 'admin') {
      // For agents, find by loginEmail
      const agent = await prisma.agent.findFirst({
        where: { loginEmail: payload.email }
      });
      if (agent) {
        where = { id: agent.id };
      } else {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }
    }

    const agents = await prisma.agent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Return plain array instead of wrapped object
    return NextResponse.json(agents.map(serializeAgent));
  } catch (error) {
    console.error('GET /api/agents error:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

// POST /api/agents — admin only
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, loginEmail, loginPassword, territory, isActive } = body as {
      name: string;
      email: string;
      loginEmail: string;
      loginPassword: string;
      territory: string;
      isActive?: boolean;
    };

    if (!name || !email || !loginEmail || !loginPassword || !territory) {
      return NextResponse.json(
        { error: 'name, email, loginEmail, loginPassword, and territory are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(loginPassword, 10);

    const agent = await prisma.agent.create({
      data: {
        name,
        email,
        loginEmail,
        loginPassword: hashedPassword,
        territory,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(serializeAgent(agent), { status: 201 });
  } catch (error: any) {
    console.error('POST /api/agents error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'An agent with that email or login email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}

// PUT /api/agents/:id — admin only
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const body = await request.json();
    const { name, email, loginEmail, loginPassword, territory, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    const updateData: any = {
      name,
      email,
      loginEmail,
      territory,
      isActive,
    };

    if (loginPassword && loginPassword.length > 0) {
      updateData.loginPassword = await bcrypt.hash(loginPassword, 10);
    }

    const agent = await prisma.agent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(serializeAgent(agent));
  } catch (error: any) {
    console.error('PUT /api/agents error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'An agent with that email or login email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

// DELETE /api/agents/:id — admin only
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.id || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    await prisma.agent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/agents error:', error);
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}