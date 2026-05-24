const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAllAgentPasswords() {
  try {
    const agents = await prisma.agent.findMany();
    
    if (agents.length === 0) {
      console.log('❌ No agents found. Please run: npx prisma db seed');
      return;
    }
    
    console.log(`Found ${agents.length} agent(s)`);
    console.log('Updating passwords to "password123"...');
    console.log('========================================\n');
    
    for (const agent of agents) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const updated = await prisma.agent.update({
        where: { id: agent.id },
        data: { loginPassword: hashedPassword }
      });
      
      console.log(`✅ Updated: ${updated.name}`);
      console.log(`   Email: ${updated.email}`);
      console.log(`   Login Email: ${updated.loginEmail}`);
      console.log(`   New Password: password123`);
      console.log('------------------');
    }
    
    console.log('\n✅ All agent passwords updated successfully!');
    console.log('You can now login with:');
    console.log('- Email: any agent email');
    console.log('- Password: password123');
    
  } catch (error) {
    console.error('❌ Error updating agent passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllAgentPasswords();