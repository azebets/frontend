import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/authService';
import Cookies from 'js-cookie';
import axios from 'axios';
import api from '../utils/api';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial token check
  const [newScreen, setNewScreen] = useState(window.innerWidth);

  // Check for token in cookies and fetch user profile
  useEffect(() => {
    const token = Cookies.get('authToken'); // Get token from cookies
    if (token) {
      fetchUserProfile(); 
    } else {
      setIsLoading(false); // No token, stop loading
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUser(profile); // Update user state
    } catch (err) {
      // console.error('Failed to fetch user profile:', err);
      setUser(null); // Clear user state on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const verifyCode = async (verificationCode) => {
      try {
        const response = await api.post('/auth/verify-account', {
          email: user.email,
          verificationCode,
        });
        if (response.data.success) {
          // setUser({ ...user, is_verified: true }); // Update user state to mark as verified
          toast.success('Verification successful');
          // You can also use a toast notification here if you have a toast library
          // toast.success('Account verified successfully');
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
  };

  // Handle user logout
  const logout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    setUser(null); // Clear user state
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
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, 
    resendVerificationCode, verifyCode, updateUserDetails 
    ,newScreen, setNewScreen}}>
      {children}
    </AuthContext.Provider>
  );
};
