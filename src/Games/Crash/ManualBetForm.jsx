import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCrashGame } from './CrashContext';

const ManualBetForm = () => {
  const { 
    gameState, 
    betAmount, 
    setBetAmount, 
    userBet, 
    setUserBet, 
    balance, 
    setBalance,
    handlePlaceBet,
    handleCashout
  } = useCrashGame();
  
  const [cashoutAt, setCashoutAt] = useState(2.00);
  
  // Sample data for the table - in a real implementation this would come from props or API
  const recentWins = [
    { username: "player123", payout: "2.35x", winAmount: 235.00 },
    { username: "lucky777", payout: "4.20x", winAmount: 420.00 },
    { username: "cryptoking", payout: "1.50x", winAmount: 75.00 },
    { username: "betmaster", payout: "3.10x", winAmount: 310.00 },
    { username: "gambler42", payout: "5.75x", winAmount: 575.00 },
    { username: "winner123", payout: "2.10x", winAmount: 210.00 },
    { username: "highroller", payout: "1.25x", winAmount: 125.00 },
    { username: "risktaker", payout: "8.50x", winAmount: 850.00 },
    { username: "luckycharm", payout: "3.33x", winAmount: 333.00 },
    { username: "bigwinner", payout: "4.75x", winAmount: 475.00 },
  ];
  
  const handlePlaceBetClick = () => {
    handlePlaceBet(betAmount, cashoutAt);
  };
  
  const handleHalfAmount = () => {
    setBetAmount(prevAmount => Math.max(1, Math.floor(prevAmount / 2)));
  };
  
  const handleDoubleAmount = () => {
    // Make sure betAmount is treated as a number
    const currentAmount = Number(betAmount);
    // Double it
    const doubledAmount = currentAmount * 2;
    // Update state with doubled amount without capping
    setBetAmount(doubledAmount);
  };
  
  const handleIncreaseCashout = () => {
    setCashoutAt(prev => Number((prev + 0.1).toFixed(2)));
  };
  
  const handleDecreaseCashout = () => {
    setCashoutAt(prev => Number(Math.max(1.01, (prev - 0.1).toFixed(2))));
  };
  
  // Calculate potential profit
  const calculateProfit = () => {
    if (!betAmount || !cashoutAt) return 0;
    const profit = betAmount * cashoutAt - betAmount;
    return profit.toFixed(5);
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
        <label className="block text-sm mb-2">Cashout At</label>
        <div className="relative flex items-center">
          <input 
            type="number" 
            value={cashoutAt}
            onChange={(e) => setCashoutAt(Number(e.target.value))}
            min="1.01"
            step="0.1"
            className="w-full p-3 pr-28 bg-gray-700 rounded text-white"
          />
          <div className="absolute right-2 flex space-x-2">
            <button 
              onClick={handleDecreaseCashout}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium transition-colors"
            >
              ↓
            </button>
            <button 
              onClick={handleIncreaseCashout}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 rounded text-sm font-medium transition-colors"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-2">Profit on Win</label>
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded text-white">
          <span>{calculateProfit()}</span>
          <img 
            src="/assets/token/usdt.png" 
            alt="USDT" 
            className="w-5 h-5" 
          />
        </div>
      </div>
      
      {!userBet && gameState.status === 'starting' && (
        <button 
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-bold transition-colors"
          onClick={handlePlaceBetClick}
        >
          Place Bet
        </button>
      )}
      
      {userBet && gameState.status === 'running' && (
        <button 
          className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-full text-lg font-bold transition-colors"
          onClick={handleCashout}
        >
          Cash Out ({gameState.multiplier.toFixed(2)}x)
        </button>
      )}
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>24 Players</span>
        </div>
        <div className="flex items-center">
          <span>Total: 1,245.00</span>
          <img 
            src="/assets/token/usdt.png" 
            alt="USDT" 
            className="w-4 h-4 ml-1" 
          />
        </div>
      </div>
      
      {/* Scrollable table of recent wins */}
      <div className="mt-4 h-[200px] overflow-y-auto bg-gray-800 bg-opacity-50 rounded">
        <table className="w-full text-sm">
          <tbody>
            {recentWins.map((win, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-0">
                <td className="py-2 px-3 text-left">{win.username}</td>
                <td className="py-2 px-3 text-center">{win.payout}</td>
                <td className="py-2 px-3 text-right">
                  <div className="flex items-center justify-end">
                    <img 
                      src="/assets/token/usdt.png" 
                      alt="USDT" 
                      className="w-4 h-4 mr-1" 
                    />
                    <span>{win.winAmount.toFixed(2)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManualBetForm;