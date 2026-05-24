import { z } from 'zod';

// ==================== USER VALIDATIONS ====================

export const userSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+267 \d{7,8}$|^\d{8}$/, 'Invalid Botswana phone number (format: +267 71 234 567 or 71234567)'),
  status: z.enum(['active', 'pending', 'inactive']).optional(),
  nthoppaCoins: z.number().min(0).optional(),
});

export const createUserSchema = userSchema.extend({
  agentId: z.string().optional(),
});

export const updateUserSchema = userSchema.partial();

// ==================== AGENT VALIDATIONS ====================

export const agentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  loginEmail: z.string().email('Invalid login email'),
  loginPassword: z.string().min(6, 'Password must be at least 6 characters'),
  territory: z.string().min(1, 'Territory is required'),
  isActive: z.boolean().optional(),
});

export const createAgentSchema = agentSchema;
export const updateAgentSchema = agentSchema.partial();

// ==================== MOTSHELO VALIDATIONS ====================

export const motsheloGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
  description: z.string().optional(),
  agentId: z.string(),
  monthlyContribution: z.number().positive('Monthly contribution must be positive'),
  currentBalance: z.number().min(0).optional(),
  status: z.enum(['active', 'completed', 'paused']).optional(),
});

export const motsheloMemberSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  totalPaid: z.number().min(0).optional(),
  payoutOrder: z.number().optional(),
});

// ==================== AUTH VALIDATIONS ====================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'agent', 'client', 'hr', 'merchant']),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+267 \d{7,8}$|^\d{8}$/, 'Invalid Botswana phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['client', 'hr', 'merchant']),
});

// ==================== COMMUNICATION VALIDATIONS ====================

export const communicationSchema = z.object({
  toUserId: z.string(),
  message: z.string().min(1, 'Message cannot be empty').max(500, 'Message too long (max 500 characters)'),
  type: z.enum(['sms', 'email', 'whatsapp', 'call']),
  fromAgentId: z.string().optional(),
});

// Alias for compatibility with existing API imports
export const createCommunicationSchema = communicationSchema;

// ==================== PAGINATION VALIDATIONS ====================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.string().optional(),
  territory: z.string().optional(),
  type: z.string().optional(),
});

// ==================== REPORT VALIDATIONS ====================

export const reportSchema = z.object({
  type: z.enum(['users', 'communications', 'agents', 'performance', 'registration']),
  agentId: z.string().optional(),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});