// lib/api.ts
// Frontend fetch wrapper — all API calls go through here.
// This replaces direct localStorage access for all data that lives in the DB.

const API_BASE = '/api';

// ─── Generic fetch helper ────────────────────────────────────────────────────

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include', // send HTTP-only cookies automatically
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'API Error' }));
    throw new Error(error.error || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ─── Types (aligned with Prisma schema) ─────────────────────────────────────

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  registrationDate: string; // ISO string
  agentId: string;
  completionRate: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  loginEmail: string;
  territory: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Communication {
  id: string;
  fromAgentId: string;
  toUserId: string;
  message: string;
  type: 'sms' | 'email' | 'whatsapp' | 'call' | string;
  timestamp: string; // ISO string
  status: 'sent' | 'delivered' | 'read' | string;
  createdAt?: string;
}

export interface Report {
  id: string;
  agentId: string;
  type: string;
  data: Record<string, any>;
  generatedAt: string; // ISO string
  createdAt?: string;
}

export interface LoginResponse {
  success: boolean;
  role: 'agent' | 'admin';
  name?: string;
  territory?: string;
  agentId?: string;
}

// ─── API object ──────────────────────────────────────────────────────────────

export const api = {
  // Auth
  login: (email: string, password: string, role: 'agent' | 'admin') =>
    fetchAPI<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    }),

  logout: () => fetchAPI<{ success: boolean }>('/auth/logout', { method: 'POST' }),

  // Users
  getUsers: (agentId?: string) =>
    fetchAPI<User[]>(`/users${agentId ? `?agentId=${agentId}` : ''}`),

  getUser: (id: string) => fetchAPI<User>(`/users/${id}`),

  createUser: (user: Omit<User, 'id' | 'registrationDate' | 'createdAt' | 'updatedAt'>) =>
    fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  updateUser: (id: string, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) =>
    fetchAPI<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),

  deleteUser: (id: string) =>
    fetchAPI<{ success: boolean }>(`/users/${id}`, { method: 'DELETE' }),

  // Agents
  getAgents: () => fetchAPI<Agent[]>('/agents'),

  getAgent: (id: string) => fetchAPI<Agent>(`/agents/${id}`),

  createAgent: (agent: {
    name: string;
    email: string;
    loginEmail: string;
    loginPassword: string;
    territory: string;
    isActive?: boolean;
  }) =>
    fetchAPI<Agent>('/agents', {
      method: 'POST',
      body: JSON.stringify(agent),
    }),

  updateAgent: (
    id: string,
    agent: Partial<Agent & { loginPassword?: string }>
  ) =>
    fetchAPI<Agent>(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(agent),
    }),

  deleteAgent: (id: string) =>
    fetchAPI<{ success: boolean }>(`/agents/${id}`, { method: 'DELETE' }),

  // Communications
  getCommunications: (filters?: { userId?: string; agentId?: string }) => {
    const params = new URLSearchParams();
    if (filters?.userId) params.set('userId', filters.userId);
    if (filters?.agentId) params.set('agentId', filters.agentId);
    const qs = params.toString();
    return fetchAPI<Communication[]>(`/communications${qs ? `?${qs}` : ''}`);
  },

  sendCommunication: (comm: {
    toUserId: string;
    message: string;
    type: string;
    fromAgentId?: string;
  }) =>
    fetchAPI<Communication>('/communications', {
      method: 'POST',
      body: JSON.stringify(comm),
    }),

  // Reports
  getReports: (agentId?: string) =>
    fetchAPI<Report[]>(`/reports${agentId ? `?agentId=${agentId}` : ''}`),

  generateReport: (opts: {
    type: string;
    agentId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) =>
    fetchAPI<Report>('/reports', {
      method: 'POST',
      body: JSON.stringify(opts),
    }),
};
