import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import { serverUrl } from '../../utils/api';

// Create context
const LimboContext = createContext();

// Custom hook to use the context
export const useLimboGame = () => useContext(LimboContext);

// Provider component
export const LimboGameProvider = ({ children }) => {
  const { user, balance, setBalance } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [recentBets, setRecentBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameState, setGameState] = useState('idle'); // idle, rolling, finished
  const [lastRoll, setLastRoll] = useState(null);
  const [showResult, setShowResult] = useState(false)
  // Game configuration
  const [betAmount, setBetAmount] = useState(1);
  const [target, setTarget] = useState(50);
  const [mode, setMode] = useState('over'); // 'over' or 'under'
  const [multiplier, setMultiplier] = useState(1.0102);
  const [winChance, setWinChance] = useState((100 - target));
  // Calculate win chance and multiplier
  // const winChance = mode === 'over' ? (100 - target) : target;
  // const multiplier = parseFloat((99 / winChance).toFixed(2));

  useEffect(() => {
    setWinChance(mode === 'over' ? (100 - target) : target);
    setMultiplier(parseFloat((99 / winChance).toFixed(2)));
  }, [target]);
  
  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(serverUrl());
    
    socketInstance.on('connect', () => {
      console.log('Connected to limbo socket server');
      setConnected(true);
      
      // Initialize game data
      socketInstance.emit('limbo-init', user, (response) => {
        if (response.code === 0) {
          setRecentBets(!user ? [] : response.data.betLogs.filter(bet => bet.user_id === user._id));
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from limbo socket server');
      setConnected(false);
    });

    socketInstance.on('limboBet', (bet) => {
      if(!user) return
      if(bet.userId !== user._id) return 
      setRecentBets(prevBets => [bet, ...prevBets.slice(0, 10)]);
    });

    socketInstance.on('limbo-wallet', ([walletData]) => {
      if (user && walletData._id === user._id) {
        setBalance(walletData.balance);
      }
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [user]);
  
  // Place a bet
  const placeBet = useCallback(() => {
    if (!socket || !connected || gameState === 'rolling') {
      return;
    }
    if (!user) {
      setError('Please log in to place a bet');
      return;
    }

    setGameState('rolling');
    
    const betData = {
      _id: user._id,
      name: user.username,
      hidden: user.hidden_from_public || false,
      avatar: user.profile_image || '',
      betAmount: betAmount,
      currencyName: 'USD', // Replace with your currency
      currencyImage: '/assets/token/usdt.png', // Replace with your currency image
      betValue: {
        target: target,
        mode: mode
      }
    };

    socket.emit('limbo-bet', betData, (response) => {
      if (response.code === 0) {
        setLastRoll(response.data);
          setShowResult(true)
      } else {
        setError(response.message);
      }
      setGameState('finished');
      
      // Reset after a short delay
      setTimeout(() => {
        setGameState('idle');
        setShowResult(false)
      }, 4000);
    });
  }, [socket, connected, gameState, user, betAmount, target, mode]);
  
  // Update seeds
  const updateSeeds = useCallback(async (clientSeed) => {
    if (!socket || !connected || !user) {
      throw new Error('Not connected or not authenticated');
    }
    
    return new Promise((resolve, reject) => {
      socket.emit('limbo-update-seeds', { userId: user._id, clientSeed }, (response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          setError(response.message);
          reject(new Error(response.message));
        }
      });
    });
  }, [socket, connected, user]);
  
  // Get game details
  const getGameDetails = useCallback((betId) => {
    if (!socket || !connected) {
      throw new Error('Not connected');
    }
    
    return new Promise((resolve, reject) => {
      socket.emit('limbo-game-details', { betId }, (response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          setError(response.message);
          reject(new Error(response.message));
        }
      });
    });
  }, [socket, connected]);
  
  // Handle target change
  const handleTargetChange = (newTarget) => {
    setTarget(newTarget);
  };
  
  // Toggle mode between 'over' and 'under'
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'over' ? 'under' : 'over');
  };
  
  // Calculate potential profit
  const calculateProfit = () => {
    return (betAmount * multiplier - betAmount).toFixed(2);
  };
  
  // Context value
  const value = {
    connected,
    loading,
    error,
    recentBets,
    balance,
    gameState,
    lastRoll,
    betAmount,
    setBetAmount,
    target,
    handleTargetChange,
    mode,
    toggleMode,
    winChance,
    multiplier,
    showResult,
    calculateProfit,
    placeBet,
    updateSeeds,
    getGameDetails,
    user,
    setWinChance,
    setMultiplier
  };

  return (
    <LimboContext.Provider value={value}>
      {children}
    </LimboContext.Provider>
  );
};

export default LimboContext;