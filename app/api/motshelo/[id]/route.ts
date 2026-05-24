import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, TokenPayload } from "@/lib/jwt";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Fetch full details of a single Motshelo group
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id: groupId } = await params;

    const group = await prisma.motsheloGroup.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Check if user is a member
    const isMember = group.members.some((m) => m.userId === payload.id);

    const membersWithStatus = group.members.map((member) => ({
      id: member.userId,
      name: member.user.fullName,
      email: member.user.email,
      totalContributed: member.totalPaid,
      payoutOrder: member.payoutOrder,
      joinedDate: member.joinedAt,
    }));

    return NextResponse.json({
      success: true,
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        contributionAmount: group.monthlyContribution,
        frequency: "monthly",
        maxMembers: 50,
        memberCount: group.members.length,
        payoutOrderMethod: "rotation",
        inviteCode: isMember ? group.id : null,
        potTotal: group.currentBalance,
        currentCycle: 1,
        nextPayoutRecipient: null,
        nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: group.status,
        createdBy: group.agentId,
        createdAt: group.createdAt,
        members: membersWithStatus,
        contributions: [],
        payouts: [],
      },
    });
  } catch (error) {
    console.error("GET /api/motshelo/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update group settings (admin only)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id: groupId } = await params;

    // Check if user is the agent who created the group
    const group = await prisma.motsheloGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (group.agentId !== payload.id) {
      return NextResponse.json(
        { error: "Only the agent who created the group can update settings" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, status } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (status) updateData.status = status;

    const updatedGroup = await prisma.motsheloGroup.update({
      where: { id: groupId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Group updated successfully",
      group: updatedGroup,
    });
  } catch (error) {
    console.error("PATCH /api/motshelo/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}