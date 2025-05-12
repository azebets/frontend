import React from 'react'
import CrashCanvas from './CrashCanvas'
import CrashControls from './CrashControls'
import BetsTable from './BetsTable'
import { CrashProvider } from './CrashContext'

const CrashGame = () => {
  return (
    <CrashProvider>
      <CrashGameContent />
    </CrashProvider>
  )
}

const CrashGameContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-5 text-white font-sans"> 
      <div className="bg-gray-900 bg-opacity-80 rounded-[18px] shadow-lg shadow-gray-900/50 p-5 mb-5">
        <div className="flex flex-col md:flex-row gap-5">
          <CrashControls />
          
          <CrashCanvas />
        </div>
      </div>
      
      <div className="bg-gray-900 bg-opacity-80 rounded-[18px] shadow-lg shadow-gray-900/50 p-5">
        <BetsTable />
      </div>
    </div>
  )
}

export default CrashGame
