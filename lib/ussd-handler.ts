// USSD interface for feature phone access
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export interface USSDSession {
  sessionId: string;
  phoneNumber: string;
  currentMenu: string;
  userData: Record<string, any>;
  lastUpdated: Date;
}

export class USSDHandler {
  private static sessions: Map<string, USSDSession> = new Map();
  
  static async handleRequest(
    sessionId: string,
    phoneNumber: string,
    input: string,
    network: string
  ): Promise<string> {
    // Get or create session
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        phoneNumber,
        currentMenu: 'main',
        userData: {},
        lastUpdated: new Date()
      };
      this.sessions.set(sessionId, session);
    }
    
    // Route based on current menu
    switch (session.currentMenu) {
      case 'main':
        return this.handleMainMenu(session, input);
      case 'register':
        return await this.handleRegistration(session, input);
      case 'check_balance':
        return await this.handleBalanceCheck(session, input);
      case 'savings':
        return await this.handleSavings(session, input);
      default:
        return this.handleMainMenu(session, input);
    }
  }
  
  private static handleMainMenu(session: USSDSession, input: string): string {
    if (!input) {
      return `CON Welcome to Nthoppa Financial Services
      
1. Register for account
2. Check savings balance
3. Join savings group
4. Financial tips
5. Speak to agent

Reply with number:`;
    }
    
    switch (input) {
      case '1':
        session.currentMenu = 'register';
        session.userData = {};
        return `CON Register for Nthoppa
Enter your full name:`;
      case '2':
        session.currentMenu = 'check_balance';
        return `CON Check Balance
Enter your account number:`;
      case '3':
        return `CON Join a motshelo/Savings Group
Available groups in your area:
1. Women's Empowerment Group (BWP 200/month)
2. Youth Savings Circle (BWP 100/month)
3. Business Growth Group (BWP 500/month)
4. Start new group

Reply with number:`;
      case '4':
        return `END 💡 Financial Tip: Save 20% of your income. Start small, think big! Call 0800 123 456 for free consultation.`;
      case '5':
        return `END 📞 Agent will call you back within 24 hours. Thank you for choosing Nthoppa!`;
      default:
        return `END Invalid option. Please try again.`;
    }
  }
  
  private static async handleRegistration(session: USSDSession, input: string): Promise<string> {
    const step = Object.keys(session.userData).length;
    
    switch (step) {
      case 0:
        session.userData.fullName = input;
        return `CON Enter your ID number:`;
      case 1:
        session.userData.idNumber = input;
        return `CON Enter your date of birth (DD/MM/YYYY):`;
      case 2:
        session.userData.dob = input;
        return `CON Create a 4-digit PIN:`;
      case 3:
        session.userData.pin = input;
        
        // Save to database
        try {
          // Find or create default agent
          const defaultAgent = await prisma.agent.findFirst({
            where: { isActive: true }
          });
          
          // Check if user already exists
          const existingUser = await prisma.user.findFirst({
            where: { phone: session.phoneNumber }
          });
          
          if (existingUser) {
            session.currentMenu = 'main';
            return `END You are already registered! Your account number is NTH${existingUser.id.slice(-8)}. Dial *123# to check balance.`;
          }
          
          // Create user
          const user = await prisma.user.create({
            data: {
              fullName: session.userData.fullName,
              email: `${session.userData.idNumber}@ussd.nthoppa.com`,
              phone: session.phoneNumber,
              status: 'pending',
              agentId: defaultAgent?.id,
              registrationDate: new Date(),
              completionRate: 0,
              dateOfBirth: session.userData.dob,
              // Store additional data in interests as JSON
              interests: JSON.stringify({
                idNumber: session.userData.idNumber,
                registeredVia: 'USSD',
                network: session.userData.network || 'unknown'
              })
            }
          });
          
          // Generate account number from user ID
          const accountNumber = `NTH${user.id.slice(-8)}`;
          
          // Create financial profile for the user
          await prisma.financialProfile.create({
            data: {
              userId: user.id,
              literacyScore: 10, // Initial low score, will increase with education
              products: JSON.stringify([])
            }
          });
          
          session.currentMenu = 'main';
          return `END ✅ Registration successful! Your account number is ${accountNumber}. Dial *123# to check balance.`;
        } catch (error) {
          console.error('USSD registration error:', error);
          session.currentMenu = 'main';
          return `END Registration failed. Please try again later or visit an Nthoppa agent.`;
        }
      default:
        session.currentMenu = 'main';
        return this.handleMainMenu(session, '');
    }
  }
  
  private static async handleBalanceCheck(session: USSDSession, input: string): Promise<string> {
    if (!input) {
      return `CON Check Balance
Enter your account number:`;
    }
    
    try {
      // Find user by account number (using ID suffix or phone number)
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { phone: session.phoneNumber },
            { id: { contains: input.replace('NTH', '') } }
          ]
        }
      });
      
      if (!user) {
        session.currentMenu = 'main';
        return `END Account not found. Please register first by dialing *123#.`;
      }
      
      // Get user's savings from motshelo groups
      const motsheloMembers = await prisma.motsheloMember.findMany({
        where: { userId: user.id },
        include: { group: true }
      });
      
      const totalSavings = motsheloMembers.reduce((sum: number, member: any) => sum + member.totalPaid, 0);
      const balance = totalSavings > 0 ? totalSavings : 1500.50; // Mock balance if no savings
      
      session.currentMenu = 'main';
      return `END 💰 Account: ${user.fullName}
Balance: BWP ${balance.toFixed(2)}
Savings groups: ${motsheloMembers.length}
Dial *123# for main menu.`;
    } catch (error) {
      console.error('Balance check error:', error);
      session.currentMenu = 'main';
      return `END Unable to fetch balance. Please try again later.`;
    }
  }
  
  private static async handleSavings(session: USSDSession, input: string): Promise<string> {
    if (!input) {
      return `CON Join a motshelo/Savings Group
Available groups in your area:
1. Women's Empowerment Group (BWP 200/month)
2. Youth Savings Circle (BWP 100/month)
3. Business Growth Group (BWP 500/month)
4. Start new group

Reply with number:`;
    }
    
    try {
      // Find or create user
      let user = await prisma.user.findFirst({
        where: { phone: session.phoneNumber }
      });
      
      if (!user) {
        session.currentMenu = 'main';
        return `END Please register first by dialing *123# before joining a savings group.`;
      }
      
      switch (input) {
        case '1':
          // Join Women's Empowerment Group
          const group1 = await prisma.motsheloGroup.findFirst({
            where: { name: "Women's Empowerment Group" }
          });
          
          if (group1) {
            await prisma.motsheloMember.create({
              data: {
                groupId: group1.id,
                userId: user.id,
                totalPaid: 0
              }
            });
            return `END ✅ You have joined Women's Empowerment Group! Monthly contribution: BWP 200. An agent will contact you for payment details.`;
          }
          return `END Group not found. Please try again later.`;
          
        case '2':
          // Join Youth Savings Circle
          const group2 = await prisma.motsheloGroup.findFirst({
            where: { name: "Youth Savings Circle" }
          });
          
          if (group2) {
            await prisma.motsheloMember.create({
              data: {
                groupId: group2.id,
                userId: user.id,
                totalPaid: 0
              }
            });
            return `END ✅ You have joined Youth Savings Circle! Monthly contribution: BWP 100. An agent will contact you for payment details.`;
          }
          return `END Group not found. Please try again later.`;
          
        case '3':
          // Join Business Growth Group
          const group3 = await prisma.motsheloGroup.findFirst({
            where: { name: "Business Growth Group" }
          });
          
          if (group3) {
            await prisma.motsheloMember.create({
              data: {
                groupId: group3.id,
                userId: user.id,
                totalPaid: 0
              }
            });
            return `END ✅ You have joined Business Growth Group! Monthly contribution: BWP 500. An agent will contact you for payment details.`;
          }
          return `END Group not found. Please try again later.`;
          
        case '4':
          session.currentMenu = 'main';
          return `END To start a new savings group, please visit your nearest Nthoppa agent or call 0800 123 456.`;
          
        default:
          session.currentMenu = 'main';
          return this.handleMainMenu(session, '');
      }
    } catch (error) {
      console.error('Savings group error:', error);
      session.currentMenu = 'main';
      return `END Unable to join savings group. Please try again later.`;
    }
  }
  
  private static generateAccountNumber(): string {
    return 'NTH' + Math.random().toString().slice(2, 10);
  }
}