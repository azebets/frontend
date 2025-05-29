import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SoundManager } from '../audio/SoundManager';
import { SocketEvents } from '../socket';

// Create context
const HiloContext = createContext();

// Custom hook to use the context
export const useHiloGame = () => useContext(HiloContext);

// Provider component
export const HiloGameProvider = ({ children }) => {
  const { user, balance, setBalance } = useContext(AuthContext);
  
  // Game state
  const [hiloGame, setHiloGame] = useState(null);
  const [processingRequest, setProcessingRequest] = useState(false);
  const [hotkeysEnabled, setHotkeysEnabled] = useState(false);
  const [soundSettings, setSoundSettings] = useState({ music: true, soundFx: true });
  const [soundManager, setSoundManager] = useState(null);
  const [error, setError] = useState(null);
  const [allBets, setAllBets] = useState([]);
  const [myBets, setMyBets] = useState([]);
  const [SE, setSE] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Initialize socket events when user is available
  useEffect(() => {
    if (user?.user_id && !SE) {
      const socketEvents = new SocketEvents(user.user_id);
      socketEvents.handleHiloInit({ user_id: user.user_id })
        .then(data => {
          // Initialize with data from server
          if (data.allBets) setAllBets(data.allBets);
          if (data.myBets) setMyBets(data.myBets);
          if (data.currentGame) setHiloGame(data.currentGame);
        })
        .catch(err => {
          console.error("Failed to initialize Hilo game:", err);
          setError("Failed to connect to game server");
        });
      
      setSE(socketEvents);
    }
    
    return () => {
      // Clean up socket connection when component unmounts
      if (SE) {
        SE.disconnect();
      }
    };
  }, [user]);

  // Initialize sound and hotkeys settings
  useEffect(() => {
    // Load hotkeys setting
    const hotkeys = localStorage.getItem("HILO_HOTKEYS_ENABLED") === "true";
    setHotkeysEnabled(hotkeys);
    
    // Load sound settings
    let settings = localStorage.getItem("HILO_SOUND_SETTINGS");
    settings = settings ? JSON.parse(settings) : { music: true, soundFx: true };
    setSoundSettings(settings);
    
    // Initialize sound manager
    const soundMgr = new SoundManager({ hilo: { enabled: settings.music } }, settings.soundFx);
    setSoundManager(soundMgr);
    
    // Start playing background music if enabled
    if (settings.music) {
      soundMgr.playMusic('hilo');
    }
    
    // Handle screen resize
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Set up keyboard shortcuts if enabled
    if (hotkeys) {
      const handleKeyDown = (e) => {
        if (!hiloGame || hiloGame.has_ended || processingRequest) return;
        
        switch (e.key.toLowerCase()) {
          case 'h': // Higher
            handleNextRound({ hi: true, lo: false, skip: false });
            break;
          case 'l': // Lower
            handleNextRound({ hi: false, lo: true, skip: false });
            break;
          case 's': // Skip
            handleNextRound({ hi: false, lo: false, skip: true });
            break;
          case 'c': // Cash out
            handleCashOut();
            break;
          default:
            break;
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyDown);
        soundMgr.stop();
      };
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      soundMgr.stop();
    };
  }, [hotkeysEnabled, hiloGame, processingRequest]);

  // Save hotkeys setting to localStorage when changed
  useEffect(() => {
    localStorage.setItem("HILO_HOTKEYS_ENABLED", hotkeysEnabled);
  }, [hotkeysEnabled]);

  // Save sound settings to localStorage when changed
  useEffect(() => {
    localStorage.setItem("HILO_SOUND_SETTINGS", JSON.stringify(soundSettings));
    
    // Update sound manager with new settings
    if (soundManager) {
      soundManager.setMusicEnabled(soundSettings.music, 'hilo');
      soundManager.setSoundFxEnabled(soundSettings.soundFx);
    }
  }, [soundSettings, soundManager]);

  // Update auth context when balance changes
  const updateBalance = useCallback((newBalanceOrFn) => {
    if (typeof newBalanceOrFn === 'function') {
      setBalance(prevBalance => {
        const newBalance = newBalanceOrFn(prevBalance);
        return newBalance;
      });
    } else {
      setBalance(newBalanceOrFn);
    }
  }, [setBalance]);

  // Handle bet submission
  const handleBet = useCallback((data) => {
    if (SE && !processingRequest) {
      setProcessingRequest(true);
      
      // Play bet sound
      if (soundManager) {
        soundManager.playGameEvent('bet');
      }
      
      SE.handleHiloBet({
        token: data.token,
        token_img: data.token_img,
        user_id: user.user_id,
        bet_amount: data.bet_amount,
      })
        .then(response => {
          // Update game state with response from server
          setHiloGame(response.game);
          updateBalance(response.balance);
        })
        .catch(error => {
          console.error('Bet error:', error);
          setError(error.message || 'Failed to place bet');
        })
        .finally(() => {
          setProcessingRequest(false);
        });
    }
  }, [SE, processingRequest, soundManager, user, updateBalance]);

  // Handle next round
  const handleNextRound = useCallback((data) => {
    if (SE && !processingRequest && hiloGame) {
      setProcessingRequest(true);
      
      // Add a check to ensure the game state is valid before proceeding
      if (!hiloGame.bet_id) {
        console.error('Invalid game state. Refreshing the page...');
        window.location.reload();
        return;
      }
      
      const { bet_id, token, token_img, payout, bet_amount } = hiloGame;
      
      // Play appropriate sound
      if (soundManager) {
        if (data.skip) {
          soundManager.playGameEvent('skip');
        } else {
          soundManager.playGameEvent('card');
        }
      }
      
      SE.handleHiloNextRound({
        hi: data.hi,
        lo: data.lo,
        user_id: user.user_id,
        skip: data.skip,
        bet_id,
        bet_amount,
        token,
        token_img,
        payout,
      })
        .then(response => {
          // Update game state with response from server
          setHiloGame(response.game);
          
          // If game ended, update my bets
          if (response.game.has_ended) {
            setMyBets(prev => [response.game, ...prev]);
          }
          
          // Play appropriate sound
          if (soundManager && response.game.rounds) {
            const lastRound = response.game.rounds[response.game.rounds.length - 1];
            if (lastRound) {
              if (lastRound.skipped) {
                // Skip sound already played
              } else if (lastRound.hi || lastRound.lo) {
                if (response.game.has_ended) {
                  if (response.game.won) {
                    soundManager.playGameEvent('win', { payout: response.game.payout });
                  } else {
                    soundManager.playGameEvent('lose');
                  }
                }
              }
            }
          }
        })
        .catch(error => {
          console.error('Next round error:', error);
          setError(error.message || 'Failed to proceed to next round');
        })
        .finally(() => {
          setProcessingRequest(false);
        });
    }
  }, [SE, processingRequest, hiloGame, soundManager, user]);

  // Handle cash out
  const handleCashOut = useCallback(() => {
    if (SE && !processingRequest && hiloGame) {
      setProcessingRequest(true);
      
      const { bet_id, token, token_img, payout, bet_amount } = hiloGame;
      
      // Play cashout sound
      if (soundManager) {
        soundManager.playGameEvent('cashout');
      }
      
      SE.handleHiloCashout({
        user_id: user.user_id,
        bet_id,
        bet_amount,
        token,
        token_img,
        payout,
      })
        .then(response => {
          // Update game state with response from server
          setHiloGame(response.game);
          updateBalance(response.balance);
          
          // Update my bets
          setMyBets(prev => [response.game, ...prev]);
          
          // Play win sound
          if (soundManager) {
            soundManager.playGameEvent('win', { payout: response.game.payout });
          }
        })
        .catch(error => {
          console.error('Cashout error:', error);
          setError(error.message || 'Failed to cash out');
        })
        .finally(() => {
          setProcessingRequest(false);
        });
    }
  }, [SE, processingRequest, hiloGame, soundManager, user, updateBalance]);

  // Context value
  const value = {
    hiloGame,
    setHiloGame,
    processingRequest,
    setProcessingRequest,
    hotkeysEnabled,
    setHotkeysEnabled,
    soundSettings,
    setSoundSettings,
    soundManager,
    setSoundManager,
    balance,
    setBalance: updateBalance,
    error,
    setError,
    user,
    allBets,
    setAllBets,
    myBets,
    setMyBets,
    screenWidth,
    handleBet,
    handleNextRound,
    handleCashOut
  };

  return (
    <HiloContext.Provider value={value}>
      {children}
    </HiloContext.Provider>
  );
};

export default HiloContext;