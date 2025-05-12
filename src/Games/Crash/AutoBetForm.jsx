import React from 'react';
import { toast } from 'react-toastify';
import api from '../../api/auth';

const AutoBetForm = ({ 
  gameState, 
  betAmount, 
  setBetAmount, 
  autoCashout, 
  setAutoCashout, 
  userBet, 
  setUserBet, 
  balance, 
  setBalance 
}) => {
  
  const handlePlaceBet = async () => {
    if (gameState.status !== 'starting') {
      toast.error('Wait for the next round to place a bet')
      return
    }
    
    if (betAmount <= 0) {
      toast.error('Bet amount must be greater than 0')
      return
    }
    
    if (betAmount > balance) {
      toast.error('Insufficient balance')
      return
    }
    
    if (autoCashout < 1.01) {
      toast.error('Auto cashout must be at least 1.01x')
      return
    }
    
    try {
      const response = await api.post('/games/crash/bet', {
        amount: betAmount,
        autoCashout: autoCashout
      })
      
      if (response.data.success) {
        setUserBet({
          amount: betAmount,
          autoCashout: autoCashout
        })
        setBalance(prev => prev - betAmount)
        toast.success('Auto bet placed successfully!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place bet')
    }
  }
  
  const handleHalfAmount = () => {
    setBetAmount(prevAmount => Math.max(1, Math.floor(prevAmount / 2)));
  };
  
  const handleDoubleAmount = () => {
    setBetAmount(prevAmount => Math.min(balance, prevAmount * 2));
  };
  
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Bet Amount</label>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none">
            <img 
              src="/assets/token/usdt.png" 
              alt="USDT" 
              className="w-5 h-5 mr-1" 
            />
          </div>
          <input 
            type="number" 
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            min="1"
            step="1"
            className="w-full p-3 pl-10 pr-28 bg-gray-700 rounded text-white"
          />
          <div className="absolute right-2 flex space-x-2">
            <button 
              onClick={handleHalfAmount}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium transition-colors"
            >
              ½
            </button>
            <button 
              onClick={handleDoubleAmount}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium transition-colors"
            >
              2×
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-2">Auto Cashout (x)</label>
        <input 
          type="number" 
          value={autoCashout}
          onChange={(e) => setAutoCashout(Number(e.target.value))}
          min="1.01"
          step="0.01"
          className="w-full p-3 bg-gray-700 rounded text-white"
        />
      </div>
      
      {!userBet && gameState.status === 'starting' && (
        <button 
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md text-lg font-bold transition-colors"
          onClick={handlePlaceBet}
        >
          Place Auto Bet
        </button>
      )}
      
      {userBet && gameState.status === 'running' && (
        <div className="text-center py-3 bg-gray-700 rounded-md text-lg font-medium">
          Auto cashout at {autoCashout.toFixed(2)}x
        </div>
      )}
    </div>
  );
};

export default AutoBetForm;