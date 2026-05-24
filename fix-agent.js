const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAgent() {
  try {
    const loginEmail = 'agent@nthoppa.com';
    const password = 'agent123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if agent exists
    const existingAgent = await prisma.agent.findUnique({
      where: { loginEmail: loginEmail }
    });
    
    if (existingAgent) {
      // Update existing agent
      const updated = await prisma.agent.update({
        where: { loginEmail: loginEmail },
        data: { 
          loginPassword: hashedPassword,
          isActive: true,
          name: 'John Motsumi',
          email: 'agent@nthoppa.com',
          territory: 'Gaborone Central'
        }
      });
      console.log('✅ Agent updated:', updated);
    } else {
      // Create new agent
      const created = await prisma.agent.create({
        data: {
          name: 'John Motsumi',
          email: 'agent@nthoppa.com',
          loginEmail: loginEmail,
          loginPassword: hashedPassword,
          territory: 'Gaborone Central',
          isActive: true,
          nthoppaCoins: 0,
          streakDays: 0,
        }
      });
      console.log('✅ Agent created:', created);
    }
    
    // Verify the password works
    const verifyAgent = await prisma.agent.findUnique({
      where: { loginEmail: loginEmail }
    });
    
    const isValid = await bcrypt.compare(password, verifyAgent.loginPassword);
    console.log('Password verification:', isValid ? '✅ PASSED' : '❌ FAILED');
    console.log('Agent loginEmail:', verifyAgent.loginEmail);
    console.log('Agent isActive:', verifyAgent.isActive);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAgent();