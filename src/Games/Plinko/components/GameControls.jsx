import React from 'react';
import { usePlinko } from '../context/PlinkoContext';
import { GAME_STATES, AVAILABLE_ROWS, RISK_LEVELS } from '../constants';

const GameControls = () => {
  const { 
    gameState,
    balance,
    rows,
    risk,
    betAmount,
    handleRowChange,
    handleRiskChange,
    setBetAmount,
    placeBet,
    loading
  } = usePlinko();

  return (
    <div className="game-controls h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Balance</h2>
        <div className="text-2xl font-bold text-green-400">${balance.toFixed(2)}</div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Game Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bet Amount</label>
            <div className="flex items-center">
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-l-md transition-colors"
                onClick={() => setBetAmount(prev => Math.max(1, prev / 2))}
                disabled={gameState === GAME_STATES.PLAYING}
              >
                ½
              </button>
              <input 
                type="number" 
                className="bg-gray-700 text-white text-center w-full py-2 border-0 focus:ring-2 focus:ring-blue-500"
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(1, Number(e.target.value)))}
                disabled={gameState === GAME_STATES.PLAYING}
                min="1"
              />
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 transition-colors"
                onClick={() => setBetAmount(prev => prev * 2)}
                disabled={gameState === GAME_STATES.PLAYING}
              >
                2×
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-r-md transition-colors"
                onClick={() => setBetAmount(prev => prev + 10)}
                disabled={gameState === GAME_STATES.PLAYING}
              >
                +10
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Risk Level</label>
            <select 
              className="w-full bg-gray-700 text-white py-2 px-3 rounded-md focus:ring-2 focus:ring-blue-500"
              value={risk}
              onChange={(e) => handleRiskChange(Number(e.target.value))}
              disabled={gameState === GAME_STATES.PLAYING}
            >
              <option value={RISK_LEVELS.LOW}>Low Risk</option>
              <option value={RISK_LEVELS.MEDIUM}>Medium Risk</option>
              <option value={RISK_LEVELS.HIGH}>High Risk</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Rows</label>
            <select 
              className="w-full bg-gray-700 text-white py-2 px-3 rounded-md focus:ring-2 focus:ring-blue-500"
              value={rows}
              onChange={(e) => handleRowChange(Number(e.target.value))}
              disabled={gameState === GAME_STATES.PLAYING}
            >
              {AVAILABLE_ROWS.map(row => (
                <option key={row} value={row}>{row}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <button 
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-4 rounded-md font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={placeBet}
          disabled={gameState === GAME_STATES.PLAYING || loading}
        >
          {gameState === GAME_STATES.PLAYING ? 'Dropping...' : 'Place Bet'}
        </button>
      </div>
    </div>
  );
};

export default GameControls;
