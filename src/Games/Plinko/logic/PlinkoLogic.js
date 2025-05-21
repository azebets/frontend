import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  PEG_RADIUS, 
  BALL_RADIUS, 
  SLOT_HEIGHT,
  PAYOUTS
} from '../constants';
import * as PIXI from 'pixi.js';

class PlinkoLogic {
  constructor() {
    this.pegPositions = [];
    this.slotPositions = [];
    this.payouts = [];
    this.activeBalls = [];
    this.ballTexture = null;
    this.pegTexture = null;
    this.backgroundTexture = null;
    this.app = null;
    this.ballSprites = [];
    this.pegSprites = [];
    this.backgroundSprite = null;
    this.pegContainer = null;
  }
  
  // Set the PIXI application reference
  setApp(app) {
    this.app = app;
    
    // Create a container for pegs
    if (!this.pegContainer) {
      this.pegContainer = new PIXI.Container();
      this.app.stage.addChild(this.pegContainer);
    }
  }
  
  // Set the textures
  setTextures(ballTexture, pegTexture, backgroundTexture) {
    this.ballTexture = ballTexture;
    this.pegTexture = pegTexture;
    this.backgroundTexture = backgroundTexture;
    
    // Create background sprite if we have the app and texture
    if (this.app && this.backgroundTexture) {
      if (this.backgroundSprite && this.backgroundSprite.parent) {
        this.backgroundSprite.parent.removeChild(this.backgroundSprite);
      }
      
      this.backgroundSprite = new PIXI.Sprite(this.backgroundTexture);
      this.backgroundSprite.width = BOARD_WIDTH;
      this.backgroundSprite.height = BOARD_HEIGHT;
      this.backgroundSprite.alpha = 0.1; // Make it very transparent
      this.app.stage.addChildAt(this.backgroundSprite, 0); // Add at the bottom layer
    }
    
    // Create peg sprites if we have positions
    if (this.pegPositions.length > 0) {
      this.createPegSprites();
    }
  }
  
  // Create peg sprites
  createPegSprites() {
    if (!this.app || !this.pegTexture) return;
    
    // Clear existing peg container
    if (this.pegContainer) {
      this.pegContainer.removeChildren();
    } else {
      this.pegContainer = new PIXI.Container();
      this.app.stage.addChild(this.pegContainer);
    }
    
    // Create new peg sprites
    this.pegPositions.forEach(peg => {
      const sprite = new PIXI.Sprite(this.pegTexture);
      sprite.anchor.set(0.5);
      sprite.width = PEG_RADIUS * 2.5;  // Make pins slightly larger
      sprite.height = PEG_RADIUS * 2.5;
      sprite.x = peg.x;
      sprite.y = peg.y;
      
      this.pegContainer.addChild(sprite);
    });
    
    console.log(`Created ${this.pegPositions.length} peg sprites`);
  }
  
  // Calculate board positions based on number of rows and risk level
  calculateBoardPositions(numRows, riskLevel) {
    const pegPositions = [];
    const slotPositions = [];
    
    // Calculate horizontal spacing
    const horizontalSpacing = BOARD_WIDTH / (numRows + 1);
    const verticalSpacing = (BOARD_HEIGHT - SLOT_HEIGHT) / numRows;
    
    // Generate peg positions
    for (let row = 0; row < numRows; row++) {
      const pegsInRow = row + 1;
      const rowOffset = (BOARD_WIDTH - (pegsInRow * horizontalSpacing)) / 2 + horizontalSpacing / 2;
      
      for (let peg = 0; peg < pegsInRow; peg++) {
        pegPositions.push({
          x: rowOffset + peg * horizontalSpacing,
          y: 50 + row * verticalSpacing
        });
      }
    }
    
    // Generate slot positions
    const numSlots = numRows + 1;
    const slotWidth = BOARD_WIDTH / numSlots;
    
    for (let slot = 0; slot < numSlots; slot++) {
      slotPositions.push({
        x: slot * slotWidth + slotWidth / 2,
        y: BOARD_HEIGHT - SLOT_HEIGHT / 2
      });
    }
    
    // Get payouts based on risk level
    const payouts = this.getPayouts(riskLevel, numRows);
    
    this.pegPositions = pegPositions;
    this.slotPositions = slotPositions;
    this.payouts = payouts;
    
    // Create peg sprites if we have the app and texture
    if (this.app && this.pegTexture) {
      this.createPegSprites();
    }
    
    return { pegPositions, slotPositions, payouts };
  }
  
  // Get payouts for a specific risk level and number of rows
  getPayouts(riskLevel, numRows) {
    return PAYOUTS[riskLevel]?.[numRows] || [];
  }
  
  // Add a new ball to the game
  addBall(ballData) {
    const newBall = {
      x: ballData.startX || BOARD_WIDTH / 2,
      y: ballData.startY || 20,
      vx: 0,
      vy: 0,
      path: ballData.path || [],
      pathIndex: 0,
      done: false,
      result: ballData.result || null,
      sprite: null
    };
    
    // Create sprite if we have the app and texture
    if (this.app && this.ballTexture) {
      const sprite = new PIXI.Sprite(this.ballTexture);
      sprite.anchor.set(0.5);
      sprite.width = BALL_RADIUS * 2;
      sprite.height = BALL_RADIUS * 2;
      sprite.x = newBall.x;
      sprite.y = newBall.y;
      
      this.app.stage.addChild(sprite);
      newBall.sprite = sprite;
      this.ballSprites.push(sprite);
    }
    
    this.activeBalls.push(newBall);
    return newBall;
  }
  
  // Update all balls (physics and collisions)
  updateBalls() {
    let stillAnimating = false;
    
    this.activeBalls = this.activeBalls.map(ball => {
      if (ball.done) return ball;
      
      // Ball is still active
      stillAnimating = true;
      
      // Physics simulation
      ball.vy += 0.2; // Gravity
      ball.x += ball.vx;
      ball.y += ball.vy;
      
      // Update sprite position if it exists
      if (ball.sprite) {
        ball.sprite.x = ball.x;
        ball.sprite.y = ball.y;
      }
      
      // Check for collisions with pegs
      for (const peg of this.pegPositions) {
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < BALL_RADIUS + PEG_RADIUS) {
          // Collision detected
          // Use the pre-determined path from the server
          if (ball.pathIndex < ball.path.length) {
            // 0 means go left, 1 means go right
            const direction = ball.path[ball.pathIndex];
            ball.vx = direction === 0 ? -2 : 2;
            ball.pathIndex++;
          }
          
          // Bounce effect
          ball.vy = Math.abs(ball.vy) * 0.8;
          break;
        }
      }
      
      // Check if ball reached the bottom
      if (ball.y > BOARD_HEIGHT - SLOT_HEIGHT - BALL_RADIUS) {
        // Find which slot the ball ended in
        let slotIndex = 0;
        for (let i = 1; i < this.slotPositions.length; i++) {
          if (ball.x < (this.slotPositions[i-1].x + this.slotPositions[i].x) / 2) {
            slotIndex = i - 1;
            break;
          }
          slotIndex = i;
        }
        
        // Mark ball as done
        ball.done = true;
        ball.y = BOARD_HEIGHT - SLOT_HEIGHT - BALL_RADIUS;
        ball.vy = 0;
        ball.vx = 0;
        ball.finalSlot = slotIndex;
        
        // Add win effect if the ball won
        if (ball.result && ball.result.won) {
          this.addWinEffect(ball);
        }
      }
      
      return ball;
    });
    
    return stillAnimating;
  }
  
  // Add a win effect to a ball
  addWinEffect(ball) {
    if (!this.app) return;
    
    // Create a glow effect
    const glow = new PIXI.Graphics();
    glow.beginFill(0xFFD700, 0.5);
    glow.drawCircle(ball.x, ball.y, BALL_RADIUS * 2);
    glow.endFill();
    
    this.app.stage.addChild(glow);
    
    // Animate the glow
    let alpha = 0.5;
    let scale = 1;
    let ticker = this.app.ticker.add(() => {
      alpha -= 0.01;
      scale += 0.05;
      
      glow.alpha = alpha;
      glow.scale.set(scale);
      
      if (alpha <= 0) {
        this.app.ticker.remove(ticker);
        this.app.stage.removeChild(glow);
      }
    });
  }
  
  // Clear all balls
  clearBalls() {
    // Remove sprites from stage
    if (this.app) {
      this.ballSprites.forEach(sprite => {
        if (sprite.parent) {
          sprite.parent.removeChild(sprite);
        }
      });
    }
    
    this.ballSprites = [];
    this.activeBalls = [];
  }
  
  // Get current game state
  getState() {
    return {
      pegPositions: this.pegPositions,
      slotPositions: this.slotPositions,
      payouts: this.payouts,
      activeBalls: this.activeBalls
    };
  }
}

export default PlinkoLogic;