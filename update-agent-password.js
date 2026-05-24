const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAllAgentPasswords() {
  try {
    const agentsToUpdate = [
      { loginEmail: 'agent@nthoppa.com', password: 'agent123' },
      { loginEmail: 'sarah@nthoppa.com', password: 'password123' },
      { loginEmail: 'mary@nthoppa.com', password: 'password123' }
    ];
    
    for (const { loginEmail, password } of agentsToUpdate) {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const agent = await prisma.agent.update({
        where: { loginEmail: loginEmail },
        data: { loginPassword: hashedPassword }
      });
      
      console.log(`✅ Updated: ${agent.name} (${agent.loginEmail}) -> ${password}`);
    }
    
    console.log('\n🎉 All agent passwords updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating agent passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllAgentPasswords();