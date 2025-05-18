import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.serverUrl = null;
    this.connectionPromise = null;
    this.connectionTimeout = null;
  }

  // Connect to the backend socket server with promise-based connection
  connect(serverUrl) {
    // Store the server URL for reconnection
    if (serverUrl) {
      this.serverUrl = serverUrl;
    }
    
    // Use the stored URL if none is provided
    const url = this.serverUrl || 'http://localhost:8000';
    
    // Return existing promise if already connecting
    if (this.connectionPromise) {
      return this.connectionPromise;
    }
    
    // Return immediately if already connected
    if (this.isConnected && this.socket) {
      console.log("Already connected to socket server");
      return Promise.resolve(this.socket);
    }

    console.log("Connecting to socket server:", url);
    
    // Create a new connection promise
    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        // Clear any existing timeout
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
        }
        
        // Create socket connection with more options for better reliability
        this.socket = io(url, {
          transports: ['websocket', 'polling'], // Try websocket first, fall back to polling
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 20000, // Increase socket.io connection timeout
          query: { clientTime: new Date().toISOString() }, // Add timestamp for debugging
        });

        // Set up connection event handlers
        this.socket.on('connect', () => {
          console.log("Socket connected successfully");
          this.isConnected = true;
          
          // Clear the timeout since we're connected
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
          }
          
          resolve(this.socket);
          this.connectionPromise = null;
        });

        this.socket.on('disconnect', (reason) => {
          console.log("Socket disconnected, reason:", reason);
          this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
          console.error("Socket connection error:", error);
          this.isConnected = false;
          
          // Don't reject here, let the timeout handle it
          // This allows multiple connection attempts
        });
        
        // Set a timeout for the connection
        this.connectionTimeout = setTimeout(() => {
          if (!this.isConnected) {
            console.error("Socket connection timeout - server might be unreachable");
            
            // Provide more helpful error message based on URL
            let errorMessage = "Socket connection timeout";
            if (url.includes('localhost')) {
              errorMessage += " - Make sure your backend server is running on " + url;
            } else {
              errorMessage += " - Check your network connection and server availability";
            }
            
            const error = new Error(errorMessage);
            reject(error);
            this.connectionPromise = null;
            
            // Clean up the socket to prevent memory leaks
            if (this.socket) {
              this.socket.disconnect();
              this.socket = null;
            }
          }
        }, 15000); // Increase timeout to 15 seconds
        
      } catch (error) {
        console.error("Socket connection failed:", error);
        this.isConnected = false;
        reject(error);
        this.connectionPromise = null;
        
        // Clear the timeout
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
      }
    });
    
    return this.connectionPromise;
  }

  // Reconnect to the socket server
  reconnect() {
    if (this.socket) {
      this.disconnect();
    }
    this.connectionPromise = null;
    return this.connect();
  }

  // Send a message to the backend with auto-reconnect
  async sendMessage(event, data) {
    // Try to ensure connection before sending
    if (!this.isConnected || !this.socket) {
      console.log("Socket not connected, attempting to connect before sending message");
      try {
        await this.connect();
      } catch (error) {
        console.error("Failed to connect before sending message:", error);
        return false;
      }
    }
    
    // Now try to send the message
    if (this.socket && this.isConnected) {
      console.log(`Sending ${event}:`, data);
      this.socket.emit(event, data);
      return true;
    } else {
      console.error("Cannot send message - socket not connected");
      return false;
    }
  }

  // Listen for messages from the backend
  onMessage(event, callback) {
    if (this.socket) {
      console.log(`Registering listener for ${event}`);
      this.socket.off(event); // Remove any existing listeners for this event
      this.socket.on(event, callback);
    } else {
      console.error("Cannot register listener - socket not initialized");
    }
  }

  // Check connection status
  isSocketConnected() {
    return this.isConnected && this.socket !== null;
  }

  // Disconnect from the socket server
  disconnect() {
    if (this.socket) {
      console.log("Manually disconnecting socket");
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
    
    // Clear any existing timeout
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;