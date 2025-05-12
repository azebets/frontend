import React, { useEffect, useRef, useState } from 'react';
import { useCrashGame } from './CrashContext';
import CrashGameGraph from './components/CrashGameGraph';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable, runInAction } from 'mobx';
import EventEmitter from './components/EventEmitter';
import CrashHistory from './components/Crash.history';

// Create a game object that extends EventEmitter
class CrashGame extends EventEmitter {
  status = 0; // CONNECTION
  rate = 1.0;
  startTime = Date.now();
  paused = false;
  errorMessage = null;
  statusMessage = null;
  gameStateMessage = null;
  reconnecting = false;

  constructor() {
    super();
  }

  updateStatus(status) {
    this.status = status;
  }

  updateRate(rate) {
    this.rate = rate;
  }

  setStartTime(time) {
    this.startTime = time;
  }

  emitEscape(escape) {
    this.emit('escape', escape);
  }
  
  setErrorMessage(message, isReconnecting = false) {
    this.errorMessage = message;
    this.statusMessage = null;
    this.gameStateMessage = null;
    this.reconnecting = isReconnecting;
  }
  
  setStatusMessage(message) {
    this.statusMessage = message;
    this.errorMessage = null;
    this.gameStateMessage = null;
    this.reconnecting = false;
  }
  
  setGameStateMessage(message) {
    if (!this.errorMessage && !this.statusMessage) {
      this.gameStateMessage = message;
    }
  }
  
  clearMessages() {
    this.errorMessage = null;
    this.statusMessage = null;
    this.gameStateMessage = null;
    this.reconnecting = false;
  }
}

// Create a MobX store for the graph state
class GraphStore {
  game = new CrashGame();
  escapes = [];

  constructor() {
    makeAutoObservable(this, {
      game: false // Don't make the EventEmitter observable
    });
  }

  updateGameStatus(status) {
    runInAction(() => {
      this.game.updateStatus(status);
    });
  }

  updateGameRate(rate) {
    runInAction(() => {
      this.game.updateRate(rate);
    });
  }

  setStartTime(time) {
    runInAction(() => {
      this.game.setStartTime(time);
    });
  }

  addEscape(escape) {
    runInAction(() => {
      this.escapes.push(escape);
      this.game.emitEscape(escape);
    });
  }

  resetEscapes() {
    runInAction(() => {
      this.escapes = [];
    });
  }
  
  setErrorMessage(message, isReconnecting = false) {
    runInAction(() => {
      this.game.setErrorMessage(message, isReconnecting);
    });
  }
  
  setStatusMessage(message) {
    runInAction(() => {
      this.game.setStatusMessage(message);
    });
  }
  
  setGameStateMessage(message) {
    runInAction(() => {
      this.game.setGameStateMessage(message);
    });
  }
  
  clearMessages() {
    runInAction(() => {
      this.game.clearMessages();
    });
  }
}

const graphStore = new GraphStore();

const CrashCanvas = observer(() => {
  const { gameState, setGameState } = useCrashGame();
  const canvasRef = useRef(null);
  const graphRef = useRef(null);

  // Map gameState.status to GameStatus enum used in CrashGameGraph
  const mapStatus = (status) => {
    switch (status) {
      case 'waiting':
      case 'starting':
        return 1; // STARTING
      case 'running':
        return 2; // PROGRESS
      case 'crashed':
        return 3; // ENDED
      default:
        return 0; // CONNECTION
    }
  };

  // Initialize the graph when the component mounts
  useEffect(() => {
    if (canvasRef.current && !graphRef.current) {
      graphRef.current = new CrashGameGraph(graphStore.game);
      graphRef.current.mountEffect(canvasRef.current);
    }

    return () => {
      if (graphRef.current) {
        graphRef.current.mountEffect(null); // Unmount the graph
      }
    };
  }, []);

  // Update the graph state when gameState changes
  useEffect(() => {
    if (!graphRef.current) return;

    // Update the game status in the store
    graphStore.updateGameStatus(mapStatus(gameState.status));

    // Update other properties based on game state
    if (gameState.status === 'running') {
      graphStore.updateGameRate(gameState.multiplier);
      
      // If we just started running, set the start time
      if (graphStore.game.status !== 2) {
        graphStore.setStartTime(Date.now());
        graphStore.resetEscapes();
        graphStore.clearMessages(); // Clear any messages when game starts
      }
    } else if (gameState.status === 'crashed') {
      graphStore.updateGameRate(gameState.crashPoint);
      graphStore.setGameStateMessage(`CRASHED AT ${gameState.crashPoint.toFixed(2)}x`);
    } else if (gameState.status === 'waiting') {
      graphStore.setGameStateMessage('Waiting for next round...');
    } else if (gameState.status === 'starting') {
      graphStore.setGameStateMessage(`Game starting in ${gameState.timeLeft}s`);
    }

    // Debug logging
    console.log("Updated graph store:", graphStore.game);
  }, [gameState]);

  // Listen for socket error and status messages
  useEffect(() => {
    const handleSocketError = (error) => {
      if (error && error.type === 'error') {
        const isReconnecting = error.message === 'Reconnecting...';
        graphStore.setErrorMessage(error.message || 'Connection error', isReconnecting);
        console.log(`Socket error: ${error.message}`, isReconnecting ? '(reconnecting)' : '');
      }
    };

    const handleSocketStatus = (status) => {
      if (status && status.type === 'info') {
        graphStore.setStatusMessage(status.message || 'Connected');
        console.log(`Socket status: ${status.message}`);
      }
    };

    // Add event listeners for socket messages
    const socket = window.socket; // Assuming socket is available globally
    if (socket) {
      socket.on('crash_error', handleSocketError);
      socket.on('crash_status', handleSocketStatus);
    }

    return () => {
      // Clean up event listeners
      if (socket) {
        socket.off('crash_error', handleSocketError);
        socket.off('crash_status', handleSocketStatus);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (graphRef.current) {
        graphRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add cashout/escape events to the graph
  const handleEscape = (username, amount, rate) => {
    if (graphRef.current && gameState.status === 'running') {
      const escape = {
        name: username,
        amount: amount,
        rate: rate,
        usd: amount
      };
      
      graphStore.addEscape(escape);
    }
  };

  // For testing, add a sample escape when multiplier reaches certain thresholds
  useEffect(() => {
    if (gameState.status === 'running') {
      // Add sample escapes at specific multipliers for demonstration
      const thresholds = [1.5, 2, 3, 5];
      const currentMultiplier = gameState.multiplier;
      
      thresholds.forEach(threshold => {
        if (currentMultiplier >= threshold && currentMultiplier < threshold + 0.1) {
          handleEscape(`Player${Math.floor(Math.random() * 1000)}`, 
                      Math.random() * 100 + 10, 
                      threshold);
        }
      });
    }
  }, [gameState.multiplier, gameState.status]);

  return (
    <div className="flex-grow relative rounded-lg overflow-hidden">
      <div className="w-full mb-42">
        <CrashHistory />
      </div>
      <canvas 
        ref={canvasRef} 
        className="bg-gray-900 w-full block h-[300px]"
      />
    </div>
  );
});

export default CrashCanvas;