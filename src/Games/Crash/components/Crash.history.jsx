import React from 'react'
import { useCrashGame } from '../CrashContext'

export default function CrashHistory() {
  const { history } = useCrashGame()

  // Function to determine background color based on crash point
  const getBgColor = (crashPoint) => {
    return crashPoint < 2.00 ? 'bg-gray-700' : 'bg-green-600'
  }

  // Function to determine text color based on crash point
  const getTextColor = (crashPoint) => {
    return crashPoint < 2.00 ? 'text-white' : 'text-white'
  }

  return (

    <div className="w-full bg-gray-800 bg-opacity-50 p-4 rounded-lg">

      <div className="flex overflow-x-auto pb-2 space-x-2">
        {history.length === 0 ? (
          <div className="text-gray-400 italic">No game history available yet</div>
        ) : (
          history.map((game, index) => (
            <div 
              key={game.id || index} 
              className={`flex-shrink-0 flex items-center justify-center ${getBgColor(game.crashPoint)} ${getTextColor(game.crashPoint)} 
                          font-medium py-2 px-3 rounded-[30px] min-w-[70px] transition-all duration-200 hover:opacity-90`}
            >
              {game.crashPoint.toFixed(2)}x
            </div>
          ))
        )}
      </div>
    
    </div>
  )
}
