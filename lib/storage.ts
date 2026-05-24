// Session storage helpers
export interface AgentSession {
  agentId: string;
  name: string;
  territory: string;
  email: string;
  authenticated?: boolean;
  role?: string;
}

export interface AdminSession {
  id: string;
  email: string;
  role: string;
  name?: string;
  authenticated?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  agentId: string;
  completionRate: number;
  registrationDate: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  gender?: string;
  dateOfBirth?: string;
  employmentStatus?: string;
  educationLevel?: string;
  industry?: string;
  monthlyIncome?: string;
  interests?: string[];
  territory?: string;
  completion?: number;
  literacyScore?: number;
  nthoppaCoins?: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  territory: string;
  commissionRate?: number;
  status?: string;
  registrations?: number;
  completionRate?: number;
  address?: string;
  loginEmail?: string;
  loginPassword?: string;
  isActive?: boolean;
  createdAt?: string;
  nthoppaCoins?: number;
  streakDays?: number;
  totalSavingsGenerated?: number;
  leaderboardRank?: number;
  lastActiveDate?: string;
}

// Session management
export function getAgentSession(): AgentSession | null {
  try {
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem('agent_session');
      if (sessionStr) {
        return JSON.parse(sessionStr);
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get agent session:', error);
    return null;
  }
}

export function getAdminSession(): AdminSession | null {
  try {
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem('admin_session');
      if (sessionStr) {
        return JSON.parse(sessionStr);
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get admin session:', error);
    return null;
  }
}

export function setAgentSession(session: AgentSession): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agent_session', JSON.stringify(session));
    }
  } catch (error) {
    console.error('Failed to set agent session:', error);
  }
}

export function setAdminSession(session: AdminSession): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_session', JSON.stringify(session));
    }
  } catch (error) {
    console.error('Failed to set admin session:', error);
  }
}

export function clearAgentSession(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agent_session');
    }
  } catch (error) {
    console.error('Failed to clear agent session:', error);
  }
}

export function clearAdminSession(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_session');
    }
  } catch (error) {
    console.error('Failed to clear admin session:', error);
  }
}

// User functions for localStorage
export function getUsers(): User[] {
  try {
    if (typeof window !== 'undefined') {
      const usersStr = localStorage.getItem('nthoppa_users');
      if (usersStr) {
        return JSON.parse(usersStr);
      }
    }
    return [];
  } catch (error) {
    console.error('Failed to get users:', error);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nthoppa_users', JSON.stringify(users));
    }
  } catch (error) {
    console.error('Failed to save users:', error);
  }
}

export function saveUser(user: User): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  saveUsers(users);
}

export function updateUser(userId: string, updates: Partial<User>): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
}

export function deleteUser(userId: string): void {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveUsers(filtered);
}

// Agent functions for localStorage
export function getAgents(): Agent[] {
  try {
    if (typeof window !== 'undefined') {
      const agentsStr = localStorage.getItem('nthoppa_agents');
      if (agentsStr) {
        return JSON.parse(agentsStr);
      }
    }
    return [];
  } catch (error) {
    console.error('Failed to get agents:', error);
    return [];
  }
}

export function saveAgents(agents: Agent[]): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nthoppa_agents', JSON.stringify(agents));
    }
  } catch (error) {
    console.error('Failed to save agents:', error);
  }
}

export function saveAgent(agent: Agent): void {
  const agents = getAgents();
  const index = agents.findIndex(a => a.id === agent.id);
  if (index !== -1) {
    agents[index] = agent;
  } else {
    agents.push(agent);
  }
  saveAgents(agents);
}

export function updateAgent(agent: Agent): void {
  const agents = getAgents();
  const index = agents.findIndex(a => a.id === agent.id);
  if (index !== -1) {
    agents[index] = { ...agents[index], ...agent };
    saveAgents(agents);
  }
}

export function deleteAgent(agentId: string): void {
  const agents = getAgents();
  const filtered = agents.filter(a => a.id !== agentId);
  saveAgents(filtered);
}

// Draft management for agent registration
export function getAgentDraft(): any | null {
  try {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('agent_registration_draft');
      if (draft) {
        return JSON.parse(draft);
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get agent draft:', error);
    return null;
  }
}

export function saveAgentDraft(draft: any): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agent_registration_draft', JSON.stringify(draft));
    }
  } catch (error) {
    console.error('Failed to save agent draft:', error);
  }
}

export function clearAgentDraft(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agent_registration_draft');
    }
  } catch (error) {
    console.error('Failed to clear agent draft:', error);
  }
}

// Draft management for user registration
export function getRegistrationDraft(): any | null {
  try {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('user_registration_draft');
      if (draft) {
        return JSON.parse(draft);
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get registration draft:', error);
    return null;
  }
}

export function saveRegistrationDraft(draft: any): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_registration_draft', JSON.stringify(draft));
    }
  } catch (error) {
    console.error('Failed to save registration draft:', error);
  }
}

export function clearRegistrationDraft(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_registration_draft');
    }
  } catch (error) {
    console.error('Failed to clear registration draft:', error);
  }
}

// ID generation
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Stats functions
export async function getTodayRegistrations(agentId?: string): Promise<number> {
  const users = getUsers();
  const today = new Date().toISOString().split('T')[0];
  const filtered = agentId ? users.filter(u => u.agentId === agentId) : users;
  return filtered.filter(u => u.registrationDate === today).length;
}

export async function getWeekRegistrations(agentId?: string): Promise<number> {
  const users = getUsers();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const filtered = agentId ? users.filter(u => u.agentId === agentId) : users;
  return filtered.filter(u => new Date(u.registrationDate) >= weekAgo).length;
}

export async function getMonthRegistrations(agentId?: string): Promise<number> {
  const users = getUsers();
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const filtered = agentId ? users.filter(u => u.agentId === agentId) : users;
  return filtered.filter(u => new Date(u.registrationDate) >= monthAgo).length;
}

// Initialize demo data
export function initializeDemoData(): void {
  if (typeof window === 'undefined') return;
  
  // Check if data already exists
  if (getAgents().length > 0) return;
  
  // Create demo agents
  const demoAgents: Agent[] = [
    {
      id: 'agent_001',
      name: 'John Motsumi',
      email: 'john.motsumi@nthoppa.com',
      phone: '+267 71 234 567',
      territory: 'Gaborone Central',
      commissionRate: 5,
      status: 'active',
      registrations: 45,
      completionRate: 78,
      address: '123 Main Street, Gaborone',
      loginEmail: 'john.doe@example.com',
      loginPassword: 'hashed_password',
      isActive: true,
      createdAt: new Date().toISOString(),
      nthoppaCoins: 1250,
      streakDays: 7,
      totalSavingsGenerated: 25000,
      leaderboardRank: 1,
    },
    {
      id: 'agent_002',
      name: 'Sarah Kgosi',
      email: 'sarah.kgosi@nthoppa.com',
      phone: '+267 71 345 678',
      territory: 'Francistown',
      commissionRate: 5,
      status: 'active',
      registrations: 38,
      completionRate: 72,
      address: '456 Queen Street, Francistown',
      loginEmail: 'sarah@nthoppa.com',
      loginPassword: 'hashed_password',
      isActive: true,
      createdAt: new Date().toISOString(),
      nthoppaCoins: 980,
      streakDays: 5,
      totalSavingsGenerated: 18500,
      leaderboardRank: 2,
    },
    {
      id: 'agent_003',
      name: 'Mary Phiri',
      email: 'mary.phiri@nthoppa.com',
      phone: '+267 71 456 789',
      territory: 'Serowe',
      commissionRate: 5,
      status: 'active',
      registrations: 32,
      completionRate: 68,
      address: '789 Independence Road, Serowe',
      loginEmail: 'mary@nthoppa.com',
      loginPassword: 'hashed_password',
      isActive: true,
      createdAt: new Date().toISOString(),
      nthoppaCoins: 750,
      streakDays: 3,
      totalSavingsGenerated: 14200,
      leaderboardRank: 3,
    },
  ];
  
  saveAgents(demoAgents);
  
  // Create demo users
  const demoUsers: User[] = [
    {
      id: 'user_001',
      fullName: 'Kabelo Motsumi',
      email: 'kabelo@example.com',
      phone: '+267 71 567 890',
      status: 'active',
      agentId: 'agent_001',
      completionRate: 85,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Gaborone Central',
      city: 'Gaborone',
      completion: 85,
      literacyScore: 75,
      nthoppaCoins: 350,
    },
    {
      id: 'user_002',
      fullName: 'Tshepo Kgosi',
      email: 'tshepo@example.com',
      phone: '+267 71 678 901',
      status: 'active',
      agentId: 'agent_001',
      completionRate: 62,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Gaborone Central',
      city: 'Gaborone',
      completion: 62,
      literacyScore: 55,
      nthoppaCoins: 180,
    },
    {
      id: 'user_003',
      fullName: 'Mpho Sebina',
      email: 'mpho@example.com',
      phone: '+267 71 789 012',
      status: 'active',
      agentId: 'agent_002',
      completionRate: 91,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Francistown',
      city: 'Francistown',
      completion: 91,
      literacyScore: 88,
      nthoppaCoins: 520,
    },
    {
      id: 'user_004',
      fullName: 'Boitumelo Phiri',
      email: 'boitumelo@example.com',
      phone: '+267 71 890 123',
      status: 'active',
      agentId: 'agent_002',
      completionRate: 74,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Francistown',
      city: 'Francistown',
      completion: 74,
      literacyScore: 68,
      nthoppaCoins: 290,
    },
    {
      id: 'user_005',
      fullName: 'Thato Mmolawa',
      email: 'thato@example.com',
      phone: '+267 71 901 234',
      status: 'active',
      agentId: 'agent_003',
      completionRate: 88,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Serowe',
      city: 'Serowe',
      completion: 88,
      literacyScore: 82,
      nthoppaCoins: 410,
    },
    {
      id: 'user_006',
      fullName: 'Lerato Kgosiemang',
      email: 'lerato@example.com',
      phone: '+267 71 012 345',
      status: 'pending',
      agentId: 'agent_003',
      completionRate: 45,
      registrationDate: new Date().toISOString().split('T')[0],
      territory: 'Serowe',
      city: 'Serowe',
      completion: 45,
      literacyScore: 40,
      nthoppaCoins: 95,
    },
  ];
  
  saveUsers(demoUsers);
}