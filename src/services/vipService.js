import api from '../utils/api';

// Get user's VIP progress
export const getUserVipProgress = async () => {
  try {
    const response = await api.get('/api/vip/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching VIP progress:', error);
    // Return default values if API call fails
    return {
      currentTier: 'None',
      nextTier: 'Bronze',
      progress: 0,
      currentTierDetails: {
        name: 'None',
        color: '#2F4553',
        features: ['Level Up bonuses']
      },
      nextTierDetails: {
        name: 'Bronze',
        color: '#C69C6D',
        features: ['Level Up bonuses', 'Rakeback', 'Weekly bonuses']
      },
      totalWager: 0,
      nextTierRequirement: 10000
    };
  }
};

// Get all VIP tiers
export const getAllVipTiers = async () => {
  try {
    const response = await api.get('/api/vip/tiers');
    return response.data;
  } catch (error) {
    console.error('Error fetching VIP tiers:', error);
    throw error;
  }
};