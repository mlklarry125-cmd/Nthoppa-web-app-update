import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, TokenPayload } from "@/lib/jwt";

// GET - Fetch all Motshelo groups the user belongs to or can join
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = payload.id;
    const userRole = payload.role;

    // Check if user is an agent (can see all groups)
    const isAgent = userRole === "agent";

    if (isAgent) {
      // AGENT VIEW: Fetch ALL groups in the system
      const allGroups = await prisma.motsheloGroup.findMany({
        where: {
          status: "active",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedGroups = allGroups.map((group) => ({
        id: group.id,
        name: group.name,
        description: group.description,
        contributionAmount: group.monthlyContribution,
        frequency: "monthly",
        maxMembers: 50,
        memberCount: group.totalMembers,
        payoutOrderMethod: "rotation",
        currentCycle: 1,
        nextPayoutRecipient: null,
        nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        potTotal: group.currentBalance,
        inviteCode: group.id,
        status: group.status,
        createdAt: group.createdAt,
        createdBy: group.agentId,
      }));

      return NextResponse.json({
        success: true,
        groups: formattedGroups,
        totalGroups: formattedGroups.length,
        isAgent: true,
      });
    }

    // REGULAR USER VIEW: Fetch groups user belongs to via MotsheloMember
    const userMemberships = await prisma.motsheloMember.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
      },
    });

    const userGroups = userMemberships.map((membership) => membership.group);

    // Fetch groups user can join (active groups they're not a member of)
    const userGroupIds = userGroups.map((g) => g.id);
    
    const availableGroups = await prisma.motsheloGroup.findMany({
      where: {
        status: "active",
        id: {
          notIn: userGroupIds.length > 0 ? userGroupIds : ["none"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format response for regular users
    const formatGroups = (groups: any[], isUserMember: boolean) => {
      return groups.map((group) => ({
        id: group.id,
        name: group.name,
        description: group.description,
        contributionAmount: group.monthlyContribution,
        frequency: "monthly",
        maxMembers: 50,
        memberCount: group.totalMembers,
        payoutOrderMethod: "rotation",
        currentCycle: 1,
        nextPayoutRecipient: null,
        nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        potTotal: group.currentBalance,
        inviteCode: isUserMember ? group.id : null,
        status: group.status,
        createdAt: group.createdAt,
        isMember: isUserMember,
      }));
    };

    return NextResponse.json({
      success: true,
      userGroups: formatGroups(userGroups, true),
      availableGroups: formatGroups(availableGroups, false),
      totalUserGroups: userGroups.length,
      totalAvailableGroups: availableGroups.length,
      isAgent: false,
    });
  } catch (error) {
    console.error('🔴 Motshelo GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST - Create a new Motshelo group
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("nthoppa_token")?.value 
               || request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken<TokenPayload>(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const agentId = payload.id;
    const body = await request.json();

    const {
      name,
      description,
      contributionAmount,
      frequency,
      maxMembers,
      payoutOrderMethod,
    } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      );
    }

    if (!contributionAmount || contributionAmount <= 0) {
      return NextResponse.json(
        { error: "Contribution amount must be greater than 0" },
        { status: 400 }
      );
    }

    if (!maxMembers || maxMembers < 2 || maxMembers > 50) {
      return NextResponse.json(
        { error: "Max members must be between 2 and 50" },
        { status: 400 }
      );
    }

    // Check for duplicate group name (case insensitive)
    const allActiveGroups = await prisma.motsheloGroup.findMany({
      where: { status: "active" },
      select: { name: true },
    });
    
    const nameExists = allActiveGroups.some(
      group => group.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (nameExists) {
      return NextResponse.json(
        { error: "A group with this name already exists" },
        { status: 400 }
      );
    }

    // Create the group using schema fields
    const group = await prisma.motsheloGroup.create({
      data: {
        name: name.trim(),
        description: description?.trim() || "",
        monthlyContribution: contributionAmount,
        totalMembers: 0,
        currentBalance: 0,
        status: "active",
        agentId: agentId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Motshelo group created successfully",
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        contributionAmount: group.monthlyContribution,
        frequency: "monthly",
        maxMembers: 50,
        memberCount: group.totalMembers,
        payoutOrderMethod: "rotation",
        inviteCode: group.id,
        potTotal: group.currentBalance,
        status: group.status,
        createdAt: group.createdAt,
      },
    });
  } catch (error) {
    console.error('🔴 Motshelo POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}