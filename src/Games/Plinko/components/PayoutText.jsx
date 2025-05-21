import React from 'react';
import { BOARD_HEIGHT, SLOT_HEIGHT } from '../constants';

const PayoutText = ({ slotPositions, payouts }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {slotPositions.map((slot, index) => {
        const payout = payouts[index];
        const isWinning = payout >= 1;
        
        return (
          <div 
            key={index}
            className={`absolute text-center font-bold ${isWinning ? 'text-green-400' : 'text-red-400'}`}
            style={{
              left: `${slot.x - 30}px`,
              top: `${BOARD_HEIGHT - SLOT_HEIGHT + 10}px`,
              width: '60px',
            }}
          >
            {payout}x
          </div>
        );
      })}
    </div>
  );
};

export default PayoutText;