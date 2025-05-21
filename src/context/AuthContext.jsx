import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../services/authService';
import { getUserVipProgress, getAllVipTiers } from '../services/vipService';
import Cookies from 'js-cookie';
import axios from 'axios';
import api from '../utils/api';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial token check
  const [newScreen, setNewScreen] = useState(window.innerWidth);
  const [balance, setBalance] = useState(0);
  const [vipProgress, setVipProgress] = useState(null);
  const [vipTiers, setVipTiers] = useState([]);
  const [userVipTier, setUserVipTier] = useState(null);
  
  // Default VIP benefits
  const [vipBenefits] = useState([
    {
      title: "Instant Withdrawals",
      description: "Enjoy priority processing for all your withdrawal requests.",
      icon: "/assets/affiliate-icons/b1.webp"
    },
    {
      title: "Exclusive Promotions",
      description: "Access to special promotions and bonuses only available to VIP members.",
      icon: "/assets/affiliate-icons/b2.webp"
    },
    {
      title: "Dedicated VIP Host",
      description: "Personal account manager to assist with all your gaming needs.",
    icon: "/assets/affiliate-icons/b3.webp"
    },
    {
      title: "Customized Bonuses",
      description: "Receive personalized bonuses tailored to your gaming preferences.",
       icon: "/assets/affiliate-icons/b4.webp"
    }
  ]);
  
  // Default supported languages
  const [supportedLanguages] = useState([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ru', name: 'Русский' }
  ]);

  // Check for token in cookies and fetch user profile
  useEffect(() => {
    const token = Cookies.get('authToken'); // Get token from cookies
    if (token) {
      fetchUserProfile(); 
    } else {
      setIsLoading(false); // No token, stop loading
    }
    
    // Fetch VIP tiers regardless of authentication
    fetchVipTiers();
  }, []);

  // Fetch VIP tiers
  const fetchVipTiers = async () => {
    try {
      const tiers = await getAllVipTiers();
      setVipTiers(tiers);
    } catch (err) {
      console.error('Failed to fetch VIP tiers:', err);
      // Set default tiers if fetch fails
      setVipTiers([
        {
          name: 'None',
          color: '#2F4553',
          wagerAmount: 'Below $10k',
          icon: {
            viewBox: "0 0 96 96",
            path: "m48 14.595 8.49 15.75a13.68 13.68 0 0 0 9.66 7.08L84 40.635l-12.39 12.9a13.9 13.9 0 0 0-3.9 9.63q-.069.96 0 1.92l2.46 17.76-15.66-7.56a15 15 0 0 0-6.51-1.53 15 15 0 0 0-6.6 1.5l-15.57 7.53 2.46-17.76q.051-.93 0-1.86a13.9 13.9 0 0 0-3.9-9.63L12 40.635l17.64-3.21a13.62 13.62 0 0 0 9.84-7.02zm0-12.54a5.22 5.22 0 0 0-4.59 2.73l-11.4 21.45a5.4 5.4 0 0 1-3.66 2.67l-24 4.32A5.25 5.25 0 0 0 0 38.385a5.13 5.13 0 0 0 1.44 3.6l16.83 17.55a5.16 5.16 0 0 1 1.47 3.6q.024.435 0 .87l-3.27 24a3 3 0 0 0 0 .72 5.19 5.19 0 0 0 5.19 5.22h.18a5.1 5.1 0 0 0 2.16-.6l21.39-10.32a6.4 6.4 0 0 1 2.76-.63 6.2 6.2 0 0 1 2.79.66l21 10.32c.69.377 1.464.573 2.25.57h.21a5.22 5.22 0 0 0 5.19-5.19q.024-.375 0-.75l-3.27-24q-.025-.375 0-.75a5 5 0 0 1 1.47-3.57l16.77-17.7a5.19 5.19 0 0 0-2.82-8.7l-24-4.32a5.22 5.22 0 0 1-3.69-2.76l-11.4-21.45a5.22 5.22 0 0 0-4.65-2.7"
          },
          features: ['Level Up bonuses']
        },
        // Add more default tiers if needed
      ]);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUser(profile); // Update user state
      setBalance(profile.balance);
      // Fetch VIP progress if user is logged in
      if (profile) {
        fetchUserVipProgress();
      }
    } catch (err) {
      // console.error('Failed to fetch user profile:', err);
      setUser(null); // Clear user state on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  // Fetch user VIP progress
  const fetchUserVipProgress = async () => {
    try {
      const progress = await getUserVipProgress();
      setVipProgress(progress);
      setUserVipTier(progress.currentTierDetails);
    } catch (err) {
      console.error('Failed to fetch VIP progress:', err);
    }
  };

  const verifyCode = async (verificationCode) => {
    try {
      const response = await api.post('/auth/verify-account', {
        email: user.email,
        verificationCode,
      });
      if (response.data.success) {
        toast.success('Verification successful');
        return response.data;
      }
      return false;
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  };

  // Handle user login
  const login = (userData, token) => {
    Cookies.set('authToken', token); // Save token to cookies
    setUser(userData); // Update user state
    setBalance(userData.balance);
    // Fetch VIP progress after login
    fetchUserVipProgress();
  };

  const resendVerificationCode = async (email) => {
    try {
      await api.post('/auth/resend-code', { email });
    } catch (error) {
      console.error('Resend code error:', error);
      throw error;
    }
  };

  // Handle user registration
  const register = (userData, token) => {
    Cookies.set('authToken', token); // Save token to cookies
    setUser(userData); // Update user state
    // Initialize VIP progress for new user
    fetchUserVipProgress();
  };

  // Handle user logout
  const logout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    setUser(null); // Clear user state
    setVipProgress(null); // Clear VIP progress
    setUserVipTier(null); // Clear user VIP tier
  };

  const updateUserDetails = async (details) => {
    try {
      const response = await api.post('/api/user/update-details', details);
      setUser({ ...user, ...details }); // Update the user state with the new details
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      resendVerificationCode, 
      verifyCode, 
      updateUserDetails, 
      balance, 
      setBalance,
      newScreen, 
      setNewScreen,
      vipProgress,
      vipTiers,
      vipBenefits,
      supportedLanguages,
      userVipTier,
      fetchUserVipProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);