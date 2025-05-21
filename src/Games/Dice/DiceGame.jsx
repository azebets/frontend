import React from 'react'
import DiceCanvas from './DiceCanvas'
import DiceControls from './DiceControls'
import BetsTable from './BetsTable'
import "./style.css"
import { DiceGameProvider } from './DiceContext'

const DiceGame = () => {
  return (
    <DiceGameProvider>
      <DiceGameContent />
    </DiceGameProvider>
  )
}

const DiceGameContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-5 text-white font-sans"> 
      <div className="bg-gray-900 bg-opacity-80 rounded-[18px] shadow-lg shadow-gray-900/50 p-5 mb-5">
        <div className="flex flex-col md:flex-row gap-3">
          <DiceControls />
          <DiceCanvas />
        </div>
      </div>
    </div>
  )
}

export default DiceGame