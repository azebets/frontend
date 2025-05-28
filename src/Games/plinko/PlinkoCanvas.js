import { PAYOUTS, calculateProbabilities, simulatePlinkoDrop, getPayout } from './PlinkoLogic';

export default class PlinkoCanvas {
  constructor(canvas, { rows = 8, width = 560, height = 470, pegRadius = 4, ballRadius = 10, risk = 1, betAmount = 1 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rows = rows;
    this.width = width;
    this.height = height;
    this.pegRadius = pegRadius;
    this.ballRadius = ballRadius;
    this.pegColor = '#fff';
    this.backgroundColor = '#0f212e';
    this.buttonColor = '#1a2c38';
    this.buttonHighlightColor = '#4a9ea1';
    this.risk = risk;
    this.betAmount = betAmount;
    this.payouts = PAYOUTS[this.risk]?.[this.rows] || [];
    this.probabilities = calculateProbabilities(this.rows, this.rows)[this.rows] || [];
    this.pegs = this.getPegPositions();
    this.hoveredSlot = null;
    this.activeSlot = null;
    this.animationFrameId = null;

    // Load peg image
    this.pegImg = new window.Image();
    this.pegImg.src = '/assets/plinko/pin.png';
    this.pegImgLoaded = false;
    this.pegImg.onload = () => {
      this.pegImgLoaded = true;
      this.drawBoard();
    };

    // Add mouse move event listener to track hover
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseout', () => {
      this.hoveredSlot = null;
      this.drawBoard();
    });
  }

  // Handle mouse move to detect hover over slots
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if mouse is over the slots area
    const slots = this.rows + 1; // Match the number of slots to the bottom row of pegs
    const slotWidth = this.canvas.width / slots;
    const slotHeight = 25 * (this.canvas.height / this.height);
    const slotY = this.canvas.height - slotHeight - 5 * (this.canvas.height / this.height);
    
    if (y >= slotY && y <= this.canvas.height) {
      const slotIndex = Math.floor(x / slotWidth);
      if (slotIndex >= 0 && slotIndex < slots) {
        if (this.hoveredSlot !== slotIndex) {
          this.hoveredSlot = slotIndex;
          this.drawBoard();
        }
        return;
      }
    }
    
    // Not hovering over any slot
    if (this.hoveredSlot !== null) {
      this.hoveredSlot = null;
      this.drawBoard();
    }
  }

  // Set active slot (when ball lands)
  setActiveSlot(slotIndex) {
    this.activeSlot = slotIndex;
    this.drawBoard();
  }

  // Calculate profit for a given payout
  calculateProfit(payout) {
    if (payout === undefined) return 0;
    return (payout * this.betAmount - this.betAmount).toFixed(2);
  }

  // Draw pegs in a triangular pattern starting with 3 pegs at the top
  getPegPositions() {
    const positions = [];
    const totalRows = this.rows;
    const rowSpacing = this.height / (totalRows + 2);
    
    // Calculate the number of slots at the bottom
    const slots = totalRows + 3; // This creates the right number of slots for the pegs
    
    for (let row = 0; row < totalRows; row++) {
      // Calculate vertical position
      const y = rowSpacing * (row + 1);
      
      // Determine number of pegs in this row
      // Start with 3 pegs in the first row and add 1 peg in each subsequent row
      const pegsInRow = 3 + row;
      
      // Calculate horizontal spacing to center the pegs
      const colSpacing = this.width / (slots);
      
      // Calculate starting x-offset to center the pegs
      const startOffset = (this.width - (pegsInRow - 1) * colSpacing) / 2;
      
      for (let col = 0; col < pegsInRow; col++) {
        const x = startOffset + col * colSpacing;
        positions.push({ x, y, row, col });
      }
    }
    return positions;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Fill the background with a dark blue color
    // this.ctx.fillStyle = this.backgroundColor;
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Helper function to draw a rounded rectangle
  roundRect(x, y, width, height, radius) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  drawBoard() {
    this.clear();
    const scaleX = this.canvas.width / this.width;
    const scaleY = this.canvas.height / this.height;

    // Draw pegs as images - SMALLER SIZE
    this.pegs.forEach(peg => {
      if (this.pegImgLoaded) {
        const imgSize = 10 * scaleX; // Smaller pegs
        this.ctx.drawImage(
          this.pegImg,
          peg.x * scaleX - imgSize / 2,
          peg.y * scaleY - imgSize / 2,
          imgSize,
          imgSize
        );
      } else {
        // fallback: draw a small circle
        this.ctx.beginPath();
        this.ctx.arc(peg.x * scaleX, peg.y * scaleY, this.pegRadius * scaleX, 0, Math.PI * 2);
        this.ctx.fillStyle = this.pegColor;
        this.ctx.fill();
        this.ctx.closePath();
      }
    });

    // Draw ending slots as buttons - ALIGNED WITH PEGS
    const slots = this.rows + 1; // Match the number of slots to the bottom row of pegs
    const slotWidth = this.canvas.width / slots;
    const slotHeight = 25 * scaleY;
    const buttonPadding = 2 * scaleX; // Smaller padding to fit better
    
    for (let i = 0; i < slots; i++) {
      const slotX = i * slotWidth + buttonPadding / 2;
      const slotY = this.canvas.height - slotHeight - 5 * scaleY;
      const buttonWidth = slotWidth - buttonPadding;
      const buttonHeight = slotHeight - buttonPadding;
      const cornerRadius = 3 * scaleX;
      
      // Determine button color based on hover/active state
      let buttonFillColor = this.buttonColor;
      if (this.activeSlot === i) {
        buttonFillColor = this.buttonHighlightColor;
      } else if (this.hoveredSlot === i) {
        buttonFillColor = '#243845';
      }
      
      // Draw button shadow
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      this.ctx.shadowBlur = 4 * scaleX;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 2 * scaleY;
      
      // Draw button background
      this.ctx.fillStyle = buttonFillColor;
      this.roundRect(slotX, slotY, buttonWidth, buttonHeight, cornerRadius);
      this.ctx.fill();
      
      // Reset shadow
      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      
      // Draw button highlight at the top (gradient effect)
      const gradient = this.ctx.createLinearGradient(slotX, slotY, slotX, slotY + buttonHeight * 0.3);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.ctx.fillStyle = gradient;
      this.roundRect(slotX, slotY, buttonWidth, buttonHeight * 0.3, cornerRadius);
      this.ctx.fill();
      
      // Draw colored border for high payout buttons
      if (this.payouts[i] !== undefined) {
        // Higher payouts get a colored border
        if (this.payouts[i] > 5) {
          this.ctx.strokeStyle = this.buttonHighlightColor;
          this.ctx.lineWidth = 1 * scaleX;
          this.roundRect(slotX, slotY, buttonWidth, buttonHeight, cornerRadius);
          this.ctx.stroke();
        }
        
        // Draw payout text (MUCH smaller size)
        this.ctx.fillStyle = "#fff";
        this.ctx.font = `bold ${8 * scaleY}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          `${this.payouts[i]}x`,
          slotX + buttonWidth / 2,
          slotY + buttonHeight / 2 + 2 * scaleY
        );
      }
      
      // Draw hover card if this slot is hovered
      if (this.hoveredSlot === i && this.payouts[i] !== undefined) {
        this.drawHoverCard(i, slotX + buttonWidth / 2, slotY);
      }
    }
  }

  // Draw hover card with profit and chance info
  drawHoverCard(slotIndex, x, y) {
    const scaleX = this.canvas.width / this.width;
    const scaleY = this.canvas.height / this.height;
    
    const cardWidth = 200 * scaleX;
    const cardHeight = 100 * scaleY;
    const cardX = Math.max(10, Math.min(x - cardWidth / 2, this.canvas.width - cardWidth - 10));
    const cardY = y - cardHeight - 10 * scaleY;
    const cornerRadius = 6 * scaleX;
    
    // Draw card shadow
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.ctx.shadowBlur = 10 * scaleX;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3 * scaleY;
    
    // Draw card background
    this.ctx.fillStyle = '#1f2937';
    this.roundRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);
    this.ctx.fill();
    
    // Reset shadow
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    
    // Draw card border
    this.ctx.strokeStyle = '#374151';
    this.ctx.lineWidth = 1 * scaleX;
    this.roundRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);
    this.ctx.stroke();
    
    // Draw triangle pointer
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 5 * scaleY);
    this.ctx.lineTo(x - 8 * scaleX, y - 15 * scaleY);
    this.ctx.lineTo(x + 8 * scaleX, y - 15 * scaleY);
    this.ctx.closePath();
    this.ctx.fillStyle = '#1f2937';
    this.ctx.fill();
    
    // Draw card content
    const padding = 15 * scaleX;
    const halfWidth = (cardWidth - padding * 3) / 2;
    
    // Draw labels
    this.ctx.fillStyle = '#9ca3af';
    this.ctx.font = `${12 * scaleY}px Arial`;
    this.ctx.textAlign = "left";
    this.ctx.fillText("Profit on win", cardX + padding, cardY + 25 * scaleY);
    this.ctx.fillText("Win Chance", cardX + padding * 2 + halfWidth, cardY + 25 * scaleY);
    
    // Draw profit box
    this.ctx.fillStyle = '#374151';
    this.roundRect(cardX + padding, cardY + 35 * scaleY, halfWidth, 30 * scaleY, 4 * scaleX);
    this.ctx.fill();
    
    // Draw chance box
    this.ctx.fillStyle = '#374151';
    this.roundRect(cardX + padding * 2 + halfWidth, cardY + 35 * scaleY, halfWidth, 30 * scaleY, 4 * scaleX);
    this.ctx.fill();
    
    // Draw profit value
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = `${13 * scaleY}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${this.calculateProfit(this.payouts[slotIndex])}`,
      cardX + padding + halfWidth / 2,
      cardY + 55 * scaleY
    );
    
    // Draw chance value
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(
      `${(this.probabilities[slotIndex] * 100).toFixed(2)}%`,
      cardX + padding * 2 + halfWidth * 1.5,
      cardY + 55 * scaleY
    );
  }

  drawBall(ballImg, x, y) {
    const scaleX = this.canvas.width / this.width;
    const scaleY = this.canvas.height / this.height;
    const imgSize = this.ballRadius * 2 * scaleX;
    if (ballImg) {
      this.ctx.drawImage(
        ballImg,
        (x * scaleX) - imgSize / 2,
        (y * scaleY) - imgSize / 2,
        imgSize,
        imgSize
      );
    }
  }

  // New method to animate ball drop with bouncing effect on pegs
  animateBallDrop(ballImg, path, onComplete) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Parse the path string (e.g., "10011110")
    const pathArray = path.split('').map(bit => parseInt(bit));
    
    // Start position at the top center
    const startX = this.width / 2;
    const startY = 20;
    
    // Calculate the final slot based on the path
    let finalSlot = 0;
    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i] === 1) {
        finalSlot++;
      }
    }
    
    // Calculate positions for each step of the animation
    const positions = [];
    let currentX = startX;
    let currentY = startY;
    
    // Add starting position
    positions.push({ x: currentX, y: currentY, isPeg: false });
    
    // Calculate row spacing
    const rowSpacing = this.height / (this.rows + 2);
    
    // Calculate the positions for each row based on the path
    for (let row = 0; row < this.rows; row++) {
      currentY += rowSpacing;
      
      // Move left or right based on the path bit (0 = left, 1 = right)
      if (row < pathArray.length) {
        const colSpacing = this.width / (this.rows + 3);
        if (pathArray[row] === 1) {
          currentX += colSpacing / 2; // Move right
        } else {
          currentX -= colSpacing / 2; // Move left
        }
      }
      
      // Add this position to the array (mark as a peg position)
      positions.push({ x: currentX, y: currentY, isPeg: true });
      
      // Add intermediate positions for bouncing effect
      if (row < this.rows - 1) {
        // Calculate next position
        let nextX = currentX;
        const nextY = currentY + rowSpacing;
        
        if (row + 1 < pathArray.length) {
          const colSpacing = this.width / (this.rows + 3);
          if (pathArray[row + 1] === 1) {
            nextX += colSpacing / 2; // Move right
          } else {
            nextX -= colSpacing / 2; // Move left
          }
        }
        
        // Add bounce positions (3 points for a small bounce)
        const bounceHeight = rowSpacing * 0.2; // 20% of row spacing for bounce height
        
        // First bounce point (slightly to the side)
        positions.push({
          x: currentX + (nextX - currentX) * 0.25,
          y: currentY + rowSpacing * 0.25 - bounceHeight,
          isPeg: false
        });
        
        // Second bounce point (middle)
        positions.push({
          x: currentX + (nextX - currentX) * 0.5,
          y: currentY + rowSpacing * 0.5,
          isPeg: false
        });
        
        // Third bounce point (almost to next peg)
        positions.push({
          x: currentX + (nextX - currentX) * 0.75,
          y: currentY + rowSpacing * 0.75 - bounceHeight * 0.5,
          isPeg: false
        });
      }
    }
    
    // Add final position at the bottom
    const finalY = this.height - 15;
    positions.push({ x: currentX, y: finalY, isPeg: false });
    
    // Animate the ball along the path
    let step = 0;
    const totalSteps = positions.length;
    const animationSpeed = 10; 
    let progress = 0;
    
    const animate = () => {
      this.drawBoard();
      
      if (step < totalSteps - 1) {
        // Interpolate between current position and next position
        const current = positions[step];
        const next = positions[step + 1];
        
        // If we're at a peg position, add a slight pause but not as much as before
        const speedMultiplier = current.isPeg ? 0.85 : 1; // Increased from 0.7 to 0.85
        
        const x = current.x + (next.x - current.x) * progress;
        const y = current.y + (next.y - current.y) * progress;
        
        // Draw the ball
        this.drawBall(ballImg, x, y);
        
        // Update progress
        progress += (animationSpeed / 100) * speedMultiplier;
        
        // Move to next step if we've reached it
        if (progress >= 1) {
          step++;
          progress = 0;
          
          // If we just hit a peg, add a small visual effect
          if (step < totalSteps && positions[step].isPeg) {
            // Draw a small "impact" effect
            const pegX = positions[step].x * (this.canvas.width / this.width);
            const pegY = positions[step].y * (this.canvas.height / this.height);
            
            // Draw a small flash
            this.ctx.beginPath();
            this.ctx.arc(pegX, pegY, 8, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
            this.ctx.closePath();
          }
        }
        
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        // We've reached the end of the animation
        this.setActiveSlot(finalSlot);
        this.drawBall(ballImg, positions[totalSteps - 1].x, positions[totalSteps - 1].y);
        
        // Call the completion callback
        if (onComplete) {
          onComplete(finalSlot);
        }
        
        // Reset active slot after a delay
        setTimeout(() => {
          this.setActiveSlot(null);
          this.drawBoard();
        }, 2000);
      }
    };
    
    // Start the animation
    animate();
  }

  // Update bet amount
  setBetAmount(amount) {
    this.betAmount = amount;
    this.drawBoard(); // Redraw to update any hover cards that might be showing
  }

  // Update risk level
  setRisk(risk) {
    this.risk = risk;
    this.payouts = PAYOUTS[this.risk]?.[this.rows] || [];
    this.drawBoard();
  }

  // Update number of rows
  setRows(rows) {
    this.rows = rows;
    this.payouts = PAYOUTS[this.risk]?.[this.rows] || [];
    this.probabilities = calculateProbabilities(this.rows, this.rows)[this.rows] || [];
    this.pegs = this.getPegPositions();
    this.drawBoard();
  }

  // Utility to simulate a drop and get the slot index and payout
  simulateDrop(rng) {
    const slotIndex = simulatePlinkoDrop({ rows: this.rows, rng });
    const payout = getPayout(this.risk, this.rows, slotIndex);
    return { slotIndex, payout };
  }
}
