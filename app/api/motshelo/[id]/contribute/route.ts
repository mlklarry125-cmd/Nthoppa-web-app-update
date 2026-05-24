import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, TokenPayload } from "@/lib/jwt";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST - Make a contribution to a Motshelo group
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
    const body = await request.json();
    const { amount, agentAssisted } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid contribution amount is required" },
        { status: 400 }
      );
    }

    // Get group with members
    const group = await prisma.motsheloGroup.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Check if user is a member
    const isMember = group.members.some((m) => m.userId === payload.id);
    if (!isMember && !agentAssisted) {
      return NextResponse.json(
        { error: "You are not a member of this group" },
        { status: 403 }
      );
    }

    // Update member's total paid
    await prisma.motsheloMember.update({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: payload.id,
        },
      },
      data: {
        totalPaid: { increment: amount },
      },
    });

    // Update group current balance
    await prisma.motsheloGroup.update({
      where: { id: groupId },
      data: { currentBalance: { increment: amount } },
    });

    // Award 25 Nthoppa Coins
    if (!agentAssisted) {
      await prisma.user.update({
        where: { id: payload.id },
        data: { nthoppaCoins: { increment: 25 } },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Contribution recorded successfully",
      awardedCoins: agentAssisted ? 0 : 25,
    });
  } catch (error) {
    console.error("POST /api/motshelo/[id]/contribute error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
