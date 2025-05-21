import React, { useCallback, useEffect, useRef } from 'react';
import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Assets
} from 'pixi.js';
import { usePlinko } from '../context/PlinkoContext';
import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  PEG_RADIUS, 
  BALL_RADIUS, 
  SLOT_HEIGHT,
  COLORS,
  GAME_STATES,
  BALL_TEXTURE_PATH,
  PEG_TEXTURE_PATH,
  BACKGROUND_TEXTURE_PATH
} from '../constants';
import PayoutText from './PayoutText';

extend({
  Container,
  Graphics,
});

const GameBoard = () => {
  const { 
    gameState, 
    placeBet, 
    getGameBoardState,
    initializeGameLogic
  } = usePlinko();
  
  const { 
    pegPositions, 
    slotPositions, 
    payouts, 
    activeBalls 
  } = getGameBoardState();
  
  const appRef = useRef(null);
  const texturesLoadedRef = useRef(false);
  
  // Initialize PIXI app and load textures
  useEffect(() => {
    const loadTextures = async () => {
      if (appRef.current && !texturesLoadedRef.current) {
        try {
          console.log('Loading textures...');
          // Load all textures
          const ballTexture = await Assets.load(BALL_TEXTURE_PATH);
          const pegTexture = await Assets.load(PEG_TEXTURE_PATH);
          const backgroundTexture = await Assets.load(BACKGROUND_TEXTURE_PATH);
          
          console.log('Textures loaded, initializing game logic');
          // Initialize game logic with app and textures
          initializeGameLogic(appRef.current, ballTexture, pegTexture, backgroundTexture);
          texturesLoadedRef.current = true;
        } catch (error) {
          console.error('Failed to load textures:', error);
        }
      }
    };
    
    if (appRef.current) {
      loadTextures();
    }
  }, [appRef.current, initializeGameLogic]);

  // Draw the game board
  const drawBoard = useCallback(graphics => {
    graphics.clear();
    
    // Draw background
    graphics.beginFill(COLORS.BACKGROUND);
    graphics.drawRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    graphics.endFill();
    
    // We don't need to draw pegs here as they're handled by the game logic with sprites
    
    // Draw slots
    graphics.lineStyle(2, COLORS.PEG);
    slotPositions.forEach((slot, index) => {
      // Draw slot dividers
      if (index > 0) {
        const prevSlot = slotPositions[index - 1];
        graphics.moveTo(prevSlot.x + (slot.x - prevSlot.x) / 2, BOARD_HEIGHT - SLOT_HEIGHT);
        graphics.lineTo(prevSlot.x + (slot.x - prevSlot.x) / 2, BOARD_HEIGHT);
      }
      
      // Draw payout background with color based on payout value
      const payout = payouts[index];
      graphics.beginFill(payout >= 1 ? COLORS.WINNING_SLOT : COLORS.LOSING_SLOT, 0.3);
      graphics.drawRect(slot.x - 30, BOARD_HEIGHT - SLOT_HEIGHT + 5, 60, 30);
      graphics.endFill();
    });
    
    // Draw top drop zone
    graphics.beginFill(COLORS.SLOT_BACKGROUND, 0.5);
    graphics.drawRect(BOARD_WIDTH / 2 - 30, 10, 60, 20);
    graphics.endFill();
    
    // Draw drop arrow
    graphics.lineStyle(3, COLORS.BALL);
    graphics.moveTo(BOARD_WIDTH / 2, 5);
    graphics.lineTo(BOARD_WIDTH / 2, 35);
    graphics.moveTo(BOARD_WIDTH / 2 - 10, 25);
    graphics.lineTo(BOARD_WIDTH / 2, 35);
    graphics.lineTo(BOARD_WIDTH / 2 + 10, 25);
    
  }, [pegPositions, slotPositions, payouts]);

  // Handle app reference
  const handleAppMount = (app) => {
    appRef.current = app;
  };

  // Handle drop button click
  const handleDrop = () => {
    if (gameState !== GAME_STATES.PLAYING) {
      placeBet();
    }
  };

  return (
    <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
      <Application 
        width={BOARD_WIDTH} 
        height={BOARD_HEIGHT} 
        options={{ backgroundColor: COLORS.BACKGROUND }}
        onMount={handleAppMount}
      >
        <pixiContainer>
          <pixiGraphics draw={drawBoard} />
          {/* Note: We don't need to draw balls or pegs here as they're handled by the game logic with sprites */}
        </pixiContainer>
      </Application>
      
      {/* Overlay for payout text */}
      <PayoutText slotPositions={slotPositions} payouts={payouts} />
      
      {/* Drop button */}
      <button 
        className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDrop}
        disabled={gameState === GAME_STATES.PLAYING}
      >
        {gameState === GAME_STATES.PLAYING ? 'Dropping...' : 'Drop Ball'}
      </button>
    </div>
  );
};

export default GameBoard;