import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import PlinkoLogic from '../logic/PlinkoLogic';
import PlinkoSocket from '../socket/PlinkoSocket';
import { GAME_STATES } from '../constants';

// Create context
const PlinkoContext = createContext();

// Custom hook to use the context
export const usePlinko = () => useContext(PlinkoContext);

// Provider component
export const PlinkoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [recentBets, setRecentBets] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  
  // Game configuration
  const [rows, setRows] = useState(8);
  const [risk, setRisk] = useState(1);
  const [betAmount, setBetAmount] = useState(1);
  
  // Refs for game logic and socket
  const gameLogicRef = useRef(new PlinkoLogic());
  const socketRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Initialize game logic
  useEffect(() => {
    const gameLogic = gameLogicRef.current;
    gameLogic.calculateBoardPositions(rows, risk);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Initialize socket connection
  useEffect(() => {
    const socket = new PlinkoSocket(
      // onConnect
      () => {
        setConnected(true);
        setLoading(false);
      },
      // onDisconnect
      () => {
        setConnected(false);
      },
      // onBetUpdate
      (bet) => {
        setRecentBets(prevBets => [bet, ...prevBets.slice(0, 14)]);
      },
      // onWalletUpdate
      (walletData) => {
        if (user && walletData[0] && walletData[0].userId === user._id) {
          setBalance(walletData[0].balance);
        }
      },
      // onInitData
      (data) => {
        setRecentBets(data.betLogs || []);
        setLoading(false);
      }
    );
    
    socket.connect();
    socketRef.current = socket;
    
    return () => {
      socket.disconnect();
    };
  }, [user]);
  
  // Update game board when rows or risk changes
  useEffect(() => {
    const gameLogic = gameLogicRef.current;
    gameLogic.calculateBoardPositions(rows, risk);
  }, [rows, risk]);
  
  // Initialize game logic with PIXI app and textures
  const initializeGameLogic = useCallback((app, ballTexture, pegTexture, backgroundTexture) => {
    const gameLogic = gameLogicRef.current;
    gameLogic.setApp(app);
    gameLogic.setTextures(ballTexture, pegTexture, backgroundTexture);
  }, []);
  
  // Animation loop for ball physics
  const startAnimationLoop = () => {
    const gameLogic = gameLogicRef.current;
    
    const animate = () => {
      const stillAnimating = gameLogic.updateBalls();
      
      if (stillAnimating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setGameState(GAME_STATES.IDLE);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // Place a bet
  const placeBet = async () => {
    if (gameState === GAME_STATES.PLAYING || !connected || !user) return;
    
    try {
      setGameState(GAME_STATES.PLAYING);
      
      const socket = socketRef.current;
      const gameLogic = gameLogicRef.current;
      
      const result = await socket.placeBet({
        betAmount,
        betValue: { risk, row: rows },
        currencyName: 'USD', // Replace with your currency
        currencyImage: '/images/usd.png', // Replace with your currency image
        userId: user._id,
        name: user.username,
        hidden: user.hidden_from_public || false,
        avatar: user.profile_image || '',
      });
      
      // Add ball to the game
      gameLogic.addBall({
        startX: result.gameValue ? result.gameValue.startX : undefined,
        startY: result.gameValue ? result.gameValue.startY : undefined,
        path: result.gameValue ? result.gameValue.path.split('').map(Number) : [],
        result
      });
      
      // Start animation loop
      startAnimationLoop();
      
      return result;
    } catch (error) {
      console.error('Failed to place bet:', error);
      setError(error.message);
      setGameState(GAME_STATES.IDLE);
      throw error;
    }
  };
  
  // Change number of rows
  const handleRowChange = (newRows) => {
    if (gameState === GAME_STATES.PLAYING) return;
    setRows(newRows);
  };
  
  // Change risk level
  const handleRiskChange = (newRisk) => {
    if (gameState === GAME_STATES.PLAYING) return;
    setRisk(newRisk);
  };
  
  // Get current game board state
  const getGameBoardState = () => {
    return gameLogicRef.current.getState();
  };
  
  // Get payouts for current configuration
  const getPayouts = (riskLevel, numRows) => {
    return gameLogicRef.current.getPayouts(riskLevel || risk, numRows || rows);
  };
  
  // Reset the game
  const resetGame = () => {
    if (gameState === GAME_STATES.PLAYING) return;
    
    const gameLogic = gameLogicRef.current;
    gameLogic.clearBalls();
    setError(null);
  };
  
  // Update seeds
  const updateSeeds = async (clientSeed) => {
    if (!connected || !user) {
      throw new Error('Not connected or not authenticated');
    }
    
    try {
      const socket = socketRef.current;
      return await socket.updateSeeds(clientSeed);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Get game details
  const getGameDetails = async (betId) => {
    if (!betId) return null;
    
    try {
      const socket = socketRef.current;
      return await socket.getGameDetails(betId);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Context value
 const value = {
  gameState,
  recentBets,
  balance,
  loading,
  error,
  connected,
  rows,
  risk,
  betAmount,
  placeBet,
  handleRowChange,
  handleRiskChange,
  setBetAmount,
  getGameBoardState,
  getPayouts,
  resetGame,
  updateSeeds,
  getGameDetails,
  initializeGameLogic,
  user
};

  return (
    <PlinkoContext.Provider value={value}>
      {children}
    </PlinkoContext.Provider>
  );
};

export default PlinkoContext;
