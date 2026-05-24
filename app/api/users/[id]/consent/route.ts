import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

type Params = { params: Promise<{ id: string }> };

const consentSchema = z.object({
  consentType: z.enum(['data_sharing', 'marketing', 'partner_referral', 'analytics']),
  granted: z.boolean()
});

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const auth = await verifyAuth(request);
    const { id } = await params;
    
    if (!auth || (auth.role !== 'admin' && auth.id !== id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const consents = await prisma.consentRecord.findMany({
      where: { userId: id }
    });

    return NextResponse.json(consents);
  } catch (error) {
    console.error('GET /api/users/[id]/consent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const auth = await verifyAuth(request);
    const { id } = await params;
    
    if (!auth || auth.role !== 'agent') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = consentSchema.parse(body);

    const consent = await prisma.consentRecord.upsert({
      where: {
        userId_consentType: {
          userId: id,
          consentType: validated.consentType
        }
      },
      update: {
        granted: validated.granted,
        grantedAt: validated.granted ? new Date() : null,
        revokedAt: validated.granted ? null : new Date()
      },
      create: {
        userId: id,
        consentType: validated.consentType,
        granted: validated.granted,
        grantedAt: validated.granted ? new Date() : null,
        revokedAt: validated.granted ? null : new Date()
      }
    });

    return NextResponse.json(consent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('POST /api/users/[id]/consent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}