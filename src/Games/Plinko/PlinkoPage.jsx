import React from 'react'
import { PlinkoProvider } from './context/PlinkoContext'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import BetHistory from './components/BetHistory'

const PlinkoPage = () => {
  return (
    <PlinkoProvider>
      <PlinkoGameContent />
    </PlinkoProvider>
  )
}

const PlinkoGameContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-5 text-white font-sans">
      <div className="bg-gray-900 bg-opacity-80 rounded-[18px] shadow-lg shadow-gray-900/50 p-5 mb-5">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Controls on the left, similar to Crash game */}
          <div className="md:w-1/3">
            <GameControls />
          </div>
          
          {/* Game board on the right */}
          <div className="md:w-2/3">
            <GameBoard />
          </div>
        </div>
      </div>
      
      {/* Bet history below */}
      <div className="bg-gray-900 bg-opacity-80 rounded-[18px] shadow-lg shadow-gray-900/50 p-5">
        <BetHistory />
      </div>
    </div>
  )
}

export default PlinkoPage
