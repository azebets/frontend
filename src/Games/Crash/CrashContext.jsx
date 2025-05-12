import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import api from '../../api/auth';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

// Create the context
const CrashContext = createContext();

// Custom hook to use the crash context
export const useCrashGame = () => useContext(CrashContext);

// Provider component
export const CrashProvider = ({ children }) => {
  const { user, balance, setBalance } = useContext(AuthContext); // Get user and balance from AuthContext
  
  const [gameState, setGameState] = useState({
    status: 'waiting', // waiting, starting, running, crashed
    multiplier: 1.00,
    crashPoint: 0,
    timeLeft: 5,
    gameId: null
  });
  
  const [betAmount, setBetAmount] = useState(1);
  const [autoCashout, setAutoCashout] = useState(2.00);
  const [bets, setBets] = useState([]);
  const [userBet, setUserBet] = useState(null);
  const [history, setHistory] = useState([]);
  
  const timerRef = useRef(null);
  const socketRef = useRef(null);
  
  // Connect to Socket.IO for real-time game updates
  useEffect(() => {
    // Connect to Socket.IO server
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';
    console.log("Connecting to socket at:", socketUrl);
    socketRef.current = io(socketUrl);
    
    socketRef.current.on('connect', () => {
      console.log('Connected to game server');
    });
    
    // Game events - make sure these match exactly what the backend emits
    socketRef.current.on('game_starting', (data) => {
      console.log('Game starting event received:', data);
      setGameState({
        status: 'starting',
        timeLeft: data.countdown || 5,
        gameId: data.gameId
      });
    });
    
    socketRef.current.on('game_started', (data) => {
      console.log('Game started event received:', data);
      setGameState(prev => ({
        ...prev,
        status: 'running',
        multiplier: 1.00
      }));
    });
    
    socketRef.current.on('multiplier_update', (data) => {
      console.log('Multiplier update received:', data);
      setGameState(prev => ({
        ...prev,
        multiplier: data.multiplier
      }));
    });
    
    socketRef.current.on('game_crashed', (data) => {
      console.log('Game crashed event received:', data);
      setGameState(prev => ({
        ...prev,
        status: 'crashed',
        crashPoint: data.crashPoint
      }));
      
      // Add to history
      setHistory(prev => [
        { id: data.gameId, crashPoint: data.crashPoint },
        ...prev.slice(0, 9)
      ]);
    });
    
    socketRef.current.on('b', (data) => {
      // New bet placed
      setBets(prev => [
        ...prev,
        {
          userId: data.userId,
          username: data.name,
          amount: data.bet,
          autoCashout: data.autoEscapeRate,
          status: 'active'
        }
      ]);
    });
    
    socketRef.current.on('e', (data) => {
      // User cashed out
      if (data.userId === localStorage.getItem('userId')) {
        setUserBet(null);
        toast.success(`Cashed out at ${data.rate.toFixed(2)}x!`);
        // Update balance - this would ideally come from the server
        setBalance(prev => prev + (userBet?.amount || 0) * data.rate);
      }
      
      // Update the bet in the bets list
      setBets(prev => prev.map(bet => 
        bet.userId === data.userId 
          ? { ...bet, status: 'cashed_out', cashoutMultiplier: data.rate } 
          : bet
      ));
    });
    
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from game server');
    });
    
    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    
    // Add more detailed logging for debugging
    socketRef.current.onAny((event, ...args) => {
      console.log(`Socket event received: ${event}`, args);
    });
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  
  // Auto cashout logic
  useEffect(() => {
    if (gameState.status === 'running' && userBet && userBet.autoCashout && gameState.multiplier >= userBet.autoCashout) {
      handleCashout();
    }
  }, [gameState.multiplier, userBet]);
  
  const handlePlaceBet = async (amount, autoCashoutValue) => {
    if (gameState.status !== 'starting') {
      toast.error('Wait for the next round to place a bet');
      return;
    }
    
    if (amount <= 0) {
      toast.error('Bet amount must be greater than 0');
      return;
    }
    
    if (amount > balance) {
      toast.error('Insufficient balance');
      return;
    }
    
    try {
      // Place bet via Socket.IO
      socketRef.current.emit('throw-bet', {
        userId: localStorage.getItem('userId'),
        name: localStorage.getItem('username') || 'Anonymous',
        avatar: localStorage.getItem('avatar') || '',
        hidden: false,
        currencyName: 'USDT',
        currencyImage: '/assets/token/usdt.png',
        bet: amount,
        autoEscapeRate: autoCashoutValue,
        gameId: gameState.gameId
      }, (response) => {
        if (response.code === 0) {
          setUserBet({
            amount: amount,
            autoCashout: autoCashoutValue
          });
          setBalance(prev => prev - amount);
          toast.success('Bet placed successfully!');
        } else {
          toast.error(response.message || 'Failed to place bet');
        }
      });
    } catch (error) {
      toast.error('Failed to place bet');
    }
  };
  
  const handleCashout = async () => {
    if (gameState.status !== 'running' || !userBet) {
      return;
    }
    
    try {
      // Send cashout request via Socket.IO
      socketRef.current.emit('throw-escape', {
        userId: localStorage.getItem('userId'),
        gameId: gameState.gameId
      }, (response) => {
        if (response.code !== 0) {
          toast.error('Failed to cash out');
        }
      });
    } catch (error) {
      toast.error('Failed to cash out');
    }
  };
  
  // Value object to be provided to consumers
  const value = {
    gameState,
    betAmount,
    setBetAmount,
    autoCashout,
    setAutoCashout,
    bets,
    userBet,
    setUserBet,
    history,
    balance, // Use balance from AuthContext
    setBalance, // Use setBalance from AuthContext
    handlePlaceBet,
    handleCashout,
    user // Also provide user from AuthContext if needed
  };
  
  return (
    <CrashContext.Provider value={value}>
      {children}
    </CrashContext.Provider>
  );
};