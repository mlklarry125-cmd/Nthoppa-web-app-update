import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, TokenPayload } from "@/lib/jwt";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST - Join a group
export async function POST(request: NextRequest, { params }: RouteParams) {
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

    // Get group details with members included
    const group = await prisma.motsheloGroup.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const currentMemberCount = group.members.length;
    const maxMemberLimit = 50; // Based on schema constraints

    // Check if group is full
    if (currentMemberCount >= maxMemberLimit) {
      return NextResponse.json(
        { error: "This group is already full" },
        { status: 400 }
      );
    }

    // Check if user is already a member
    const isAlreadyMember = group.members.some(
      (m) => m.userId === payload.id
    );
    if (isAlreadyMember) {
      return NextResponse.json(
        { error: "You are already a member of this group" },
        { status: 400 }
      );
    }

    // Check if group is active
    if (group.status !== "active") {
      return NextResponse.json(
        { error: "This group is not accepting new members" },
        { status: 400 }
      );
    }

    // Calculate next payout order number
    const nextPayoutOrder = currentMemberCount + 1;

    // Add user as member
    const newMember = await prisma.motsheloMember.create({
      data: {
        groupId: groupId,
        userId: payload.id,
        totalPaid: 0,
        payoutOrder: nextPayoutOrder,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    // Update group total member count
    await prisma.motsheloGroup.update({
      where: { id: groupId },
      data: { totalMembers: currentMemberCount + 1 },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully joined the group",
      member: {
        id: newMember.userId,
        name: newMember.user.fullName,
        email: newMember.user.email,
        joinedDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("POST /api/motshelo/[id]/members error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Leave a group
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const targetUserId = userId || payload.id;

    // Get group details with members included
    const group = await prisma.motsheloGroup.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Check if user is a member
    const membership = group.members.find((m) => m.userId === targetUserId);
    if (!membership) {
      return NextResponse.json(
        { error: "User is not a member of this group" },
        { status: 403 }
      );
    }

    // Only allow self-removal
    const isSelf = targetUserId === payload.id;
    if (!isSelf) {
      return NextResponse.json(
        { error: "Only the member themselves can leave the group" },
        { status: 403 }
      );
    }

    // Remove member
    await prisma.motsheloMember.delete({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: targetUserId,
        },
      },
    });

    // Update group total member count
    const newMemberCount = group.members.length - 1;
    await prisma.motsheloGroup.update({
      where: { id: groupId },
      data: { totalMembers: newMemberCount },
    });

    // If group becomes empty, archive it
    if (newMemberCount === 0) {
      await prisma.motsheloGroup.update({
        where: { id: groupId },
        data: { status: "archived" },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully left the group",
    });
  } catch (error) {
    console.error("DELETE /api/motshelo/[id]/members error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}