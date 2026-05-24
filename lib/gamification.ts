export interface Achievement {
  id: string;
  name: string;
  description: string;
  coinsReward: number;
  badge: string;
  requirement: {
    type: 'users_registered' | 'completion_rate' | 'streak_days' | 'savings_amount';
    target: number;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_user',
    name: 'First Step',
    description: 'Register your first customer',
    coinsReward: 100,
    badge: '🌱',
    requirement: { type: 'users_registered', target: 1 }
  },
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Register 10 customers',
    coinsReward: 500,
    badge: '⭐',
    requirement: { type: 'users_registered', target: 10 }
  },
  {
    id: 'top_performer',
    name: 'Top Performer',
    description: 'Achieve 100% completion rate',
    coinsReward: 1000,
    badge: '🏆',
    requirement: { type: 'completion_rate', target: 100 }
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: '7-day active streak',
    coinsReward: 300,
    badge: '👑',
    requirement: { type: 'streak_days', target: 7 }
  },
  {
    id: 'savings_champion',
    name: 'Savings Champion',
    description: 'Help customers save 10,000 BWP',
    coinsReward: 2000,
    badge: '💰',
    requirement: { type: 'savings_amount', target: 10000 }
  }
];

export class GamificationEngine {
  
  static async checkAchievements(
    agentId: string,
    stats: {
      usersRegistered: number;
      completionRate: number;
      streakDays: number;
      totalSavings: number;
    }
  ): Promise<Achievement[]> {
    const unlockedAchievements: Achievement[] = [];
    
    for (const achievement of ACHIEVEMENTS) {
      let isUnlocked = false;
      
      switch (achievement.requirement.type) {
        case 'users_registered':
          isUnlocked = stats.usersRegistered >= achievement.requirement.target;
          break;
        case 'completion_rate':
          isUnlocked = stats.completionRate >= achievement.requirement.target;
          break;
        case 'streak_days':
          isUnlocked = stats.streakDays >= achievement.requirement.target;
          break;
        case 'savings_amount':
          isUnlocked = stats.totalSavings >= achievement.requirement.target;
          break;
      }
      
      if (isUnlocked) {
        unlockedAchievements.push(achievement);
      }
    }
    
    return unlockedAchievements;
  }
  
  static calculateLevel(coins: number): {
    level: number;
    nextLevelCoins: number;
    progress: number;
  } {
    const level = Math.floor(coins / 1000) + 1;
    const nextLevelCoins = level * 1000;
    const currentLevelCoins = (level - 1) * 1000;
    const progress = ((coins - currentLevelCoins) / 1000) * 100;
    
    return { level, nextLevelCoins, progress };
  }
}