const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAgents() {
  try {
    const agents = await prisma.agent.findMany();
    console.log('Agents in database:');
    console.log('==================');
    if (agents.length === 0) {
      console.log('No agents found. Running seed...');
    } else {
      agents.forEach(agent => {
        console.log(`ID: ${agent.id}`);
        console.log(`Name: ${agent.name}`);
        console.log(`Email: ${agent.email}`);
        console.log(`Login Email: ${agent.loginEmail}`);
        console.log(`Territory: ${agent.territory}`);
        console.log(`Active: ${agent.isActive}`);
        console.log('------------------');
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAgents();