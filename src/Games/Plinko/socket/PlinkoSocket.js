import { io } from 'socket.io-client';
import { serverUrl } from '../../../utils/api';

class PlinkoSocket {
  constructor(onConnect, onDisconnect, onBetUpdate, onWalletUpdate, onInitData) {
    this.socket = null;
    this.connected = false;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.onBetUpdate = onBetUpdate;
    this.onWalletUpdate = onWalletUpdate;
    this.onInitData = onInitData;
  }
  
  connect() {
    this.socket = io(serverUrl());
    
    this.socket.on('connect', () => {
      console.log('Connected to Plinko socket server');
      this.connected = true;
      
      // Initialize game data
      this.socket.emit('plinko-init', {}, (response) => {
        if (response.code === 0) {
          this.onInitData(response.data);
        } else {
          console.error('Failed to initialize Plinko game:', response.message);
        }
      });
      
      if (this.onConnect) this.onConnect();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Plinko socket server');
      this.connected = false;
      if (this.onDisconnect) this.onDisconnect();
    });

    this.socket.on('plinkoBet', (bet) => {
      if (this.onBetUpdate) this.onBetUpdate(bet);
    });

    this.socket.on('plinko-wallet', (walletData) => {
      if (this.onWalletUpdate) this.onWalletUpdate(walletData);
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }
  
  placeBet(betData) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.connected) {
        reject(new Error('Socket not connected'));
        return;
      }
      
      this.socket.emit('plinko-bet', betData, (response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || 'Failed to place bet'));
        }
      });
    });
  }
  
  getGameDetails(betId) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.connected) {
        reject(new Error('Socket not connected'));
        return;
      }
      
      this.socket.emit('plinko-game-details', { betId }, (response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || 'Failed to get game details'));
        }
      });
    });
  }
  
  updateSeeds(clientSeed) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.connected) {
        reject(new Error('Socket not connected'));
        return;
      }
      
      this.socket.emit('plinko-update-seeds', { clientSeed }, (response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || 'Failed to update seeds'));
        }
      });
    });
  }
  
  isConnected() {
    return this.connected;
  }
}

export default PlinkoSocket;