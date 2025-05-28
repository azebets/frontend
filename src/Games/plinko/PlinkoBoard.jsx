
import React, { useEffect, useRef } from 'react';
import { usePlinkoGame } from './PlinkoContext';
import PlinkoCanvas from './PlinkoCanvas';

const BOARD_WIDTH = 560;
const BOARD_HEIGHT = 470;

export default function PlinkoBoard() {
  const { rows, risk, gameState, lastDrop, onAnimationComplete } = usePlinkoGame();
  const canvasRef = useRef(null);
  const ballImgRef = useRef(null);
  const canvasInstanceRef = useRef(null);

  // Load ball image
  useEffect(() => {
    const ballImg = new window.Image();
    ballImg.src = '/assets/plinko/ball.png';
    ballImg.onload = () => {
      ballImgRef.current = ballImg;
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create and use PlinkoCanvas for all drawing
    const plinko = new PlinkoCanvas(canvas, {
      rows,
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      risk,
    });

    canvasInstanceRef.current = plinko;
    plinko.drawBoard();

    return () => {
      if (canvasInstanceRef.current && canvasInstanceRef.current.animationFrameId) {
        cancelAnimationFrame(canvasInstanceRef.current.animationFrameId);
      }
    };
  }, [rows, risk]);

  // Handle ball animation when a drop occurs
  useEffect(() => {
    if (!lastDrop || !ballImgRef.current || !canvasInstanceRef.current || gameState !== 'dropping') return;

    // Get the path from the game result
    const path = lastDrop.gameValue?.path;
    
    if (path) {
      // Use the path to animate the ball drop
      canvasInstanceRef.current.animateBallDrop(
        ballImgRef.current,
        path,
        (finalSlot) => {
          // Animation complete
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      );
    } else {
      // Fallback to the old animation if path is not available
      const startX = BOARD_WIDTH / 2; // Start in the middle
      const startY = 20;
      const endSlot = lastDrop.slotIndex;
      const endX = (BOARD_WIDTH / (rows + 1)) * (endSlot + 0.5); // Center of the slot
      const endY = BOARD_HEIGHT - 15;

      // Simple animation to move the ball from top to bottom
      let currentY = startY;
      const speed = 3; // Adjust for faster/slower animation

      const animate = () => {
        if (!canvasInstanceRef.current) return;
        
        canvasInstanceRef.current.drawBoard();
        
        // Calculate x position based on progress (simple linear interpolation)
        const progress = (currentY - startY) / (endY - startY);
        const currentX = startX + (endX - startX) * progress;
        
        // Draw the ball at the current position
        canvasInstanceRef.current.drawBall(ballImgRef.current, currentX, currentY);
        
        // Move the ball down
        currentY += speed;
        
        // Continue animation until the ball reaches the bottom
        if (currentY < endY) {
          canvasInstanceRef.current.animationFrameId = requestAnimationFrame(animate);
        } else {
          // Animation complete
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      };

      // Start the animation
      animate();
    }
  }, [lastDrop, gameState, rows, onAnimationComplete]);

  return (
    <div className="flex flex-col items-center w-full">
      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        className=" rounded-lg"
      />
    </div>
  );
}
