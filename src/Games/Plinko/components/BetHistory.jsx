import React from 'react';
import { usePlinko } from '../context/PlinkoContext';

const BetHistory = () => {
  const { recentBets } = usePlinko();

  return (
    <div className="bet-history">
      <h3 className="text-xl font-bold text-white mb-4">Recent Bets</h3>
      
      {recentBets.length === 0 ? (
        <div className="text-gray-400 text-center py-6 bg-gray-800 rounded-lg">No recent bets</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-800">
              <tr>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Bet</th>
                <th className="px-4 py-3">Multiplier</th>
                <th className="px-4 py-3">Payout</th>
              </tr>
            </thead>
            <tbody>
              {recentBets.map((bet) => (
                <tr key={bet.betId} className="border-b border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 flex items-center">
                    {bet.avatar && !bet.hidden ? (
                      <img 
                        src={bet.avatar} 
                        alt={bet.name} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                    )}
                    <span className="truncate max-w-[120px]">
                      {bet.hidden ? 'Hidden' : bet.name || 'Anonymous'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(bet.betTime).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {bet.currencyImage && (
                        <img src={bet.currencyImage} alt={bet.currencyName} className="w-4 h-4 mr-1" />
                      )}
                      {bet.betAmount} {bet.currencyName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {bet.odds}x
                  </td>
                  <td className={`px-4 py-3 font-medium ${bet.won ? 'text-green-400' : 'text-red-400'}`}>
                    {bet.won ? `+${bet.winAmount} ${bet.currencyName}` : `0 ${bet.currencyName}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BetHistory;
