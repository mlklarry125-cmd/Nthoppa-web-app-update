const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash passwords for all roles
  const agentPassword = await bcrypt.hash('agent123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);
  const clientPassword = await bcrypt.hash('client123', 10);
  const hrPassword = await bcrypt.hash('hr123', 10);
  const merchantPassword = await bcrypt.hash('merchant123', 10);
  const defaultPassword = await bcrypt.hash('password123', 10);
  
  // Create agents using upsert
  const agentData = [
    {
      name: 'John Motsumi',
      email: 'john.motsumi@nthoppa.com',
      loginEmail: 'agent@nthoppa.com',
      loginPassword: agentPassword,
      territory: 'Gaborone Central',
      isActive: true,
      nthoppaCoins: 1250,
      streakDays: 5,
      totalSavingsGenerated: 15000,
    },
    {
      name: 'Sarah Kgosi',
      email: 'sarah.kgosi@nthoppa.com',
      loginEmail: 'sarah@nthoppa.com',
      loginPassword: defaultPassword,
      territory: 'Francistown',
      isActive: true,
      nthoppaCoins: 850,
      streakDays: 3,
      totalSavingsGenerated: 8000,
    },
    {
      name: 'Mary Phiri',
      email: 'mary.phiri@nthoppa.com',
      loginEmail: 'mary@nthoppa.com',
      loginPassword: defaultPassword,
      territory: 'Serowe',
      isActive: true,
      nthoppaCoins: 2100,
      streakDays: 12,
      totalSavingsGenerated: 25000,
    },
  ];

  const createdAgents = [];
  for (const data of agentData) {
    try {
      const agent = await prisma.agent.upsert({
        where: { loginEmail: data.loginEmail },
        update: data,
        create: data,
      });
      createdAgents.push(agent);
      console.log(`✅ Created/Updated agent: ${agent.name} (${agent.loginEmail})`);
    } catch (error) {
      console.error(`❌ Failed to create agent ${data.loginEmail}:`, error.message);
    }
  }

  const [john, sarah, mary] = createdAgents;

  // Create admin user using upsert
  try {
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@nthoppa.com' },
      update: {
        fullName: 'System Administrator',
        password: adminPassword,
        phone: '+267 71 000 001',
        status: 'active',
        role: 'admin',
        completionRate: 100,
        nthoppaCoins: 0,
      },
      create: {
        fullName: 'System Administrator',
        email: 'admin@nthoppa.com',
        password: adminPassword,
        phone: '+267 71 000 001',
        status: 'active',
        role: 'admin',
        completionRate: 100,
        nthoppaCoins: 0,
        registrationDate: new Date(),
      },
    });
    console.log(`✅ Created/Updated admin user: ${adminUser.email}`);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
  }

  // Create client user using upsert
  try {
    const clientUser = await prisma.user.upsert({
      where: { email: 'client@nthoppa.com' },
      update: {
        fullName: 'Josephine Morolong',
        password: clientPassword,
        phone: '+267 71 234 569',
        status: 'active',
        role: 'client',
        completionRate: 78,
        nthoppaCoins: 150,
      },
      create: {
        fullName: 'Josephine Morolong',
        email: 'client@nthoppa.com',
        password: clientPassword,
        phone: '+267 71 234 569',
        status: 'active',
        role: 'client',
        completionRate: 78,
        nthoppaCoins: 150,
        registrationDate: new Date(),
      },
    });
    console.log(`✅ Created/Updated client user: ${clientUser.email}`);
  } catch (error) {
    console.error('❌ Failed to create client user:', error.message);
  }

  // Create HR user using upsert
  try {
    const hrUser = await prisma.user.upsert({
      where: { email: 'hr@nthoppa.com' },
      update: {
        fullName: 'Thabo Molefe',
        password: hrPassword,
        phone: '+267 71 234 570',
        status: 'active',
        role: 'hr',
        completionRate: 90,
        nthoppaCoins: 0,
      },
      create: {
        fullName: 'Thabo Molefe',
        email: 'hr@nthoppa.com',
        password: hrPassword,
        phone: '+267 71 234 570',
        status: 'active',
        role: 'hr',
        completionRate: 90,
        nthoppaCoins: 0,
        registrationDate: new Date(),
      },
    });
    console.log(`✅ Created/Updated HR user: ${hrUser.email}`);
  } catch (error) {
    console.error('❌ Failed to create HR user:', error.message);
  }

  // Create merchant user using upsert
  try {
    const merchantUser = await prisma.user.upsert({
      where: { email: 'merchant@nthoppa.com' },
      update: {
        fullName: 'Kgabo General Store',
        password: merchantPassword,
        phone: '+267 71 234 571',
        status: 'active',
        role: 'merchant',
        completionRate: 95,
        nthoppaCoins: 500,
        businessName: 'Kgabo General Store',
        businessType: 'Retail',
        city: 'Gaborone',
      },
      create: {
        fullName: 'Kgabo General Store',
        email: 'merchant@nthoppa.com',
        password: merchantPassword,
        phone: '+267 71 234 571',
        status: 'active',
        role: 'merchant',
        completionRate: 95,
        nthoppaCoins: 500,
        registrationDate: new Date(),
        businessName: 'Kgabo General Store',
        businessType: 'Retail',
        city: 'Gaborone',
      },
    });
    console.log(`✅ Created/Updated merchant user: ${merchantUser.email}`);
  } catch (error) {
    console.error('❌ Failed to create merchant user:', error.message);
  }

  // Create regular users (clients) using upsert
  if (john && sarah && mary) {
    const userData = [
      { fullName: 'Kabelo Motsumi', email: 'kabelo@example.com', phone: '+26771234567', status: 'active', agentId: john.id, completionRate: 100, nthoppaCoins: 150, role: 'client', monthlyIncome: 5000 },
      { fullName: 'Tshepo Kgosi', email: 'tshepo@example.com', phone: '+26771345678', status: 'pending', agentId: john.id, completionRate: 45, nthoppaCoins: 50, role: 'client', monthlyIncome: 3000 },
      { fullName: 'Mpho Sebina', email: 'mpho@example.com', phone: '+26771456789', status: 'active', agentId: john.id, completionRate: 100, nthoppaCoins: 200, role: 'client', monthlyIncome: 4500 },
      { fullName: 'Boitumelo Phiri', email: 'boitumelo@example.com', phone: '+26771567890', status: 'pending', agentId: sarah.id, completionRate: 30, nthoppaCoins: 25, role: 'client', monthlyIncome: 2500 },
      { fullName: 'Thato Mmolawa', email: 'thato@example.com', phone: '+26771678901', status: 'active', agentId: sarah.id, completionRate: 100, nthoppaCoins: 175, role: 'client', monthlyIncome: 6000 },
      { fullName: 'Lerato Kgosiemang', email: 'lerato@example.com', phone: '+26771789012', status: 'inactive', agentId: mary.id, completionRate: 0, nthoppaCoins: 0, role: 'client', monthlyIncome: 2000 },
    ];

    for (const data of userData) {
      try {
        const user = await prisma.user.upsert({
          where: { email: data.email },
          update: {
            fullName: data.fullName,
            password: defaultPassword,
            phone: data.phone,
            status: data.status,
            agentId: data.agentId,
            role: data.role,
            completionRate: data.completionRate,
            nthoppaCoins: data.nthoppaCoins,
          },
          create: {
            fullName: data.fullName,
            email: data.email,
            password: defaultPassword,
            phone: data.phone,
            status: data.status,
            agentId: data.agentId,
            role: data.role,
            completionRate: data.completionRate,
            nthoppaCoins: data.nthoppaCoins,
            registrationDate: new Date(),
          },
        });
        console.log(`✅ Created/Updated user: ${user.fullName}`);
        
        // Create financial profile for each user using upsert
        await prisma.financialProfile.upsert({
          where: { userId: user.id },
          update: {
            monthlyIncome: data.monthlyIncome,
            employmentStatus: 'employed',
            savingsGoal: data.monthlyIncome * 6,
            riskTolerance: 'medium',
          },
          create: {
            userId: user.id,
            monthlyIncome: data.monthlyIncome,
            employmentStatus: 'employed',
            literacyScore: Math.floor(Math.random() * 100),
            savingsGoal: data.monthlyIncome * 6,
            riskTolerance: 'medium',
          },
        });
      } catch (error) {
        console.error(`❌ Failed to create user ${data.email}:`, error.message);
      }
    }
  }

  // Create courses using upsert
  console.log('\n📚 Seeding courses...');
  
  const courseData = [
    {
      title: 'Budgeting Basics',
      description: 'Learn how to track income, manage expenses, and create a budget that works for you.',
      content: JSON.stringify({
        lessons: [
          { title: 'Understanding Your Income', content: 'Learn to calculate your total monthly income.', duration: '5 min' },
          { title: 'Tracking Expenses', content: 'Discover where your money goes.', duration: '10 min' },
          { title: 'Creating a Budget', content: 'Build a realistic budget.', duration: '15 min' },
          { title: 'Sticking to Your Budget', content: 'Tips for long-term success.', duration: '8 min' }
        ],
        quiz: [
          { question: 'What is the 50/30/20 rule?', options: ['A budgeting method', 'A savings account', 'An investment strategy'], correct: 0 }
        ]
      }),
      coinsReward: 50,
      requiredScore: 0,
      order: 1
    },
    {
      title: 'Saving Strategies',
      description: 'Master the art of saving with proven strategies.',
      content: JSON.stringify({
        lessons: [
          { title: 'Emergency Fund Basics', content: 'Save 3-6 months of expenses.', duration: '8 min' },
          { title: 'Goal-Based Saving', content: 'Set and achieve savings goals.', duration: '12 min' },
          { title: 'Automated Saving Systems', content: 'Build wealth automatically.', duration: '10 min' },
          { title: 'High-Interest Savings Accounts', content: 'Make your money work harder.', duration: '7 min' }
        ],
        quiz: [
          { question: 'How many months of expenses should an emergency fund cover?', options: ['1-2 months', '3-6 months', '12+ months'], correct: 1 }
        ]
      }),
      coinsReward: 75,
      requiredScore: 40,
      order: 2
    },
    {
      title: 'Investment Fundamentals',
      description: 'Introduction to stocks, bonds, and diversification.',
      content: JSON.stringify({
        lessons: [
          { title: 'Stocks Explained', content: 'Understanding the stock market.', duration: '15 min' },
          { title: 'Bonds & Fixed Income', content: 'Safe investments.', duration: '12 min' },
          { title: 'Building a Diversified Portfolio', content: 'Spread risk across assets.', duration: '20 min' },
          { title: 'Retirement Planning', content: 'Invest for the long term.', duration: '15 min' }
        ],
        quiz: [
          { question: 'What is diversification?', options: ['Putting all money in one stock', 'Spreading investments across different assets', 'Only buying bonds'], correct: 1 }
        ]
      }),
      coinsReward: 100,
      requiredScore: 70,
      order: 3
    },
    {
      title: 'Credit Score Mastery',
      description: 'Learn how to build and maintain a good credit score.',
      content: JSON.stringify({
        lessons: [
          { title: 'What is a Credit Score?', content: 'Understanding credit reporting.', duration: '10 min' },
          { title: 'Factors Affecting Your Score', content: 'What matters most.', duration: '12 min' },
          { title: 'Improving Your Credit', content: 'Practical steps to boost your score.', duration: '15 min' }
        ],
        quiz: [
          { question: 'What is a good credit score range?', options: ['300-500', '500-650', '670-739'], correct: 2 }
        ]
      }),
      coinsReward: 85,
      requiredScore: 50,
      order: 4
    }
  ];

  const createdCourses = [];
  for (const data of courseData) {
    try {
      const course = await prisma.course.upsert({
        where: { title: data.title },
        update: data,
        create: data,
      });
      createdCourses.push(course);
      console.log(`✅ Created/Updated course: ${course.title} (${course.coinsReward} coins)`);
    } catch (error) {
      console.error(`❌ Failed to create course ${data.title}:`, error.message);
    }
  }

  // Create motshelo groups using findFirst + create (NOT upsert - name is not unique)
  let createdGroups = [];
  if (john && sarah && mary) {
    console.log('\n👥 Creating motshelo groups...');
    
    const groupData = [
      {
        name: "Women's Empowerment Group",
        description: "A savings group focused on empowering women entrepreneurs in Gaborone",
        agentId: john.id,
        monthlyContribution: 200,
        currentBalance: 2400,
        totalMembers: 12,
        status: "active"
      },
      {
        name: "Youth Savings Circle",
        description: "Young professionals saving for future investments",
        agentId: sarah.id,
        monthlyContribution: 100,
        currentBalance: 800,
        totalMembers: 8,
        status: "active"
      },
      {
        name: "Business Growth Group",
        description: "Small business owners pooling resources for expansion",
        agentId: mary.id,
        monthlyContribution: 500,
        currentBalance: 5000,
        totalMembers: 10,
        status: "active"
      }
    ];

    for (const data of groupData) {
      try {
        // Check if group already exists by name
        const existing = await prisma.motsheloGroup.findFirst({
          where: { name: data.name }
        });
        
        if (!existing) {
          const group = await prisma.motsheloGroup.create({
            data: data,
          });
          createdGroups.push(group);
          console.log(`✅ Created motshelo group: ${group.name}`);
        } else {
          createdGroups.push(existing);
          console.log(`⏭️ Skipped existing group: ${existing.name}`);
        }
      } catch (error) {
        console.error(`❌ Failed to create motshelo group ${data.name}:`, error.message);
      }
    }

    // Add members to motshelo groups
    if (createdGroups.length > 0) {
      console.log('\n👥 Adding members to motshelo groups...');
      
      // Get some users to add as members
      const users = await prisma.user.findMany({
        where: {
          role: 'client',
          status: 'active'
        },
        take: 10
      });

      for (const group of createdGroups) {
        // Clear existing members to avoid duplicates
        await prisma.motsheloMember.deleteMany({
          where: { groupId: group.id }
        });
        
        const membersToAdd = users.slice(0, Math.min(5, users.length));
        for (let i = 0; i < membersToAdd.length; i++) {
          const user = membersToAdd[i];
          try {
            await prisma.motsheloMember.create({
              data: {
                groupId: group.id,
                userId: user.id,
                totalPaid: Math.random() * 1000,
                payoutOrder: i + 1
              }
            });
            console.log(`✅ Added ${user.fullName} to ${group.name}`);
          } catch (error) {
            console.error(`❌ Failed to add member to group:`, error.message);
          }
        }
      }
    }
  }

  // Create agent record for admin (for backward compatibility)
  try {
    await prisma.agent.upsert({
      where: { loginEmail: 'admin@nthoppa.com' },
      update: {
        name: 'System Administrator',
        email: 'admin@nthoppa.com',
        loginPassword: adminPassword,
        territory: 'Head Office',
        isActive: true,
      },
      create: {
        name: 'System Administrator',
        email: 'admin@nthoppa.com',
        loginEmail: 'admin@nthoppa.com',
        loginPassword: adminPassword,
        territory: 'Head Office',
        isActive: true,
        nthoppaCoins: 0,
        streakDays: 0,
        totalSavingsGenerated: 0,
      },
    });
    console.log('✅ Created/Updated admin agent record');
  } catch (error) {
    console.error('❌ Failed to create admin agent record:', error.message);
  }

  // Create some notifications for agents
  if (john && sarah && mary) {
    console.log('\n🔔 Creating notifications...');
    
    // Clear existing notifications to avoid duplicates
    await prisma.notification.deleteMany({});
    
    const notifications = [
      { agentId: john.id, type: 'achievement', message: '🎉 Congratulations! You\'ve reached 5 active clients!', read: false },
      { agentId: john.id, type: 'system', message: 'New training module available: Advanced Credit Scoring', read: false },
      { agentId: sarah.id, type: 'alert', message: 'Reminder: Weekly team meeting tomorrow at 10 AM', read: false },
      { agentId: sarah.id, type: 'achievement', message: '🏆 You\'ve earned the "Top Performer" badge!', read: false },
      { agentId: mary.id, type: 'reminder', message: 'Client Kabelo Motsumi has completed all courses!', read: false },
    ];

    for (const notif of notifications) {
      try {
        await prisma.notification.create({
          data: notif,
        });
        console.log(`✅ Created notification for agent`);
      } catch (error) {
        console.error(`❌ Failed to create notification:`, error.message);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🔐 LOGIN CREDENTIALS:');
  console.log('='.repeat(60));
  console.log('\n📋 ADMIN PORTAL:');
  console.log(`   Email: admin@nthoppa.com`);
  console.log(`   Password: admin123`);
  
  console.log('\n📋 AGENT PORTAL:');
  console.log(`   Email: agent@nthoppa.com | Password: agent123`);
  console.log(`   Email: sarah@nthoppa.com | Password: password123`);
  console.log(`   Email: mary@nthoppa.com | Password: password123`);
  
  console.log('\n📋 CLIENT PORTAL:');
  console.log(`   Email: client@nthoppa.com | Password: client123`);
  console.log(`   Email: kabelo@example.com | Password: password123`);
  console.log(`   Email: tshepo@example.com | Password: password123`);
  console.log(`   Email: mpho@example.com | Password: password123`);
  
  console.log('\n📋 HR PORTAL:');
  console.log(`   Email: hr@nthoppa.com | Password: hr123`);
  
  console.log('\n📋 MERCHANT PORTAL:');
  console.log(`   Email: merchant@nthoppa.com | Password: merchant123`);
  
  console.log('\n📋 ADDITIONAL USERS:');
  console.log(`   Email: boitumelo@example.com | Password: password123`);
  console.log(`   Email: thato@example.com | Password: password123`);
  console.log(`   Email: lerato@example.com | Password: password123`);
  
  console.log('='.repeat(60));
  
  // Get actual counts from database for accurate statistics
  const agentCount = await prisma.agent.count();
  const courseCount = await prisma.course.count();
  const groupCount = await prisma.motsheloGroup.count();
  
  console.log(`\n📊 Database Statistics:`);
  console.log(`   - Agents: ${agentCount}`);
  console.log(`   - Courses: ${courseCount}`);
  console.log(`   - Motshelo Groups: ${groupCount}`);
  console.log(`\n========== SEED COMPLETE ==========`);
  console.log('====================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });