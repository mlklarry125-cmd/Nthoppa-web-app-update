// app/api/agents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

function serializeAgent(a: any) {
  const { loginPassword: _pw, ...rest } = a;
  return {
    ...rest,
    createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt,
    updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : a.updatedAt,
  };
}

// GET /api/agents/[id]
export async function GET(request: NextRequest, { params }: Params) {
  const auth = await verifyAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // An agent may only view their own record; admin can view any
  if (auth.role === 'agent' && auth.id !== (await params).id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const agent = await prisma.agent.findUnique({ where: { id: (await params).id } });
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    return NextResponse.json(serializeAgent(agent));
  } catch (error) {
    console.error(`GET /api/agents/${(await params).id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
  }
}

// PUT /api/agents/[id] — admin or the agent themselves
export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await verifyAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (auth.role === 'agent' && auth.id !== (await params).id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, loginEmail, loginPassword, territory, isActive } = body;

    // Hash the new password only if supplied
    let hashedPassword: string | undefined;
    if (loginPassword) {
      hashedPassword = await bcrypt.hash(loginPassword, 10);
    }

    const agent = await prisma.agent.update({
      where: { id: (await params).id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(loginEmail !== undefined && { loginEmail }),
        ...(hashedPassword && { loginPassword: hashedPassword }),
        ...(territory !== undefined && { territory }),
        // Only admins can toggle isActive
        ...(isActive !== undefined && auth.role === 'admin' && { isActive }),
      },
    });

    return NextResponse.json(serializeAgent(agent));
  } catch (error: any) {
    console.error(`PUT /api/agents/${(await params).id} error:`, error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Email or login email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

// DELETE /api/agents/[id] — admin only
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await verifyAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (auth.role !== 'admin') return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  try {
    const existing = await prisma.agent.findUnique({ where: { id: (await params).id } });
    if (!existing) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    await prisma.agent.delete({ where: { id: (await params).id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/agents/${(await params).id} error:`, error);
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}