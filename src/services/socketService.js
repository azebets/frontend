import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  // Connect to the backend socket server
  connect(url) {
    this.socket = io(url, {
      transports: ['websocket'], // Use WebSocket for better performance
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  // Send a message to the backend
  sendMessage(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket is not connected');
    }
  }

  // Listen for messages from the backend
  onMessage(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error('Socket is not connected');
    }
  }

  // Disconnect from the socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();