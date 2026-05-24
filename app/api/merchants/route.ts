import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { z } from 'zod';

const merchantSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  businessRegNumber: z.string().optional(),
  taxId: z.string().optional(),
  ownerName: z.string().min(2, 'Owner full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Physical address is required'),
  city: z.string().min(2, 'City is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(5, 'Account number is required'),
  branchCode: z.string().optional(),
  loginEmail: z.string().email('Invalid login email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = merchantSchema.parse(body);

    // Check if login email already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: validatedData.loginEmail }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create merchant user
    const merchant = await prisma.user.create({
      data: {
        fullName: validatedData.ownerName,
        email: validatedData.loginEmail,
        phone: validatedData.phone,
        status: 'active',
        role: 'merchant',
        password: hashedPassword,
        businessName: validatedData.businessName,
        businessType: validatedData.businessType,
        businessRegNumber: validatedData.businessRegNumber,
        taxId: validatedData.taxId,
        ownerName: validatedData.ownerName,
        address: validatedData.address,
        city: validatedData.city,
        bankName: validatedData.bankName,
        accountNumber: validatedData.accountNumber,
        branchCode: validatedData.branchCode,
        registrationDate: new Date(),
        nthoppaCoins: 0,
        completionRate: 0,
      }
    });

    // Return merchant without password
    const { password, ...merchantWithoutPassword } = merchant;
    
    return NextResponse.json({
      success: true,
      message: 'Merchant account created successfully',
      merchant: merchantWithoutPassword
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating merchant:', error);
    return NextResponse.json(
      { error: 'Failed to create merchant account' },
      { status: 500 }
    );
  }
}