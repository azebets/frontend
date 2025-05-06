import React, { useState } from 'react'
import CasinoSpot from './betlog/CasinoSpot';
import SportBets from './betlog/SportBets';
import RaceLeaderBoard from './betlog/RaceLeaderBoard';

export default function BetsLogSection() {
  const [activeTab, setActiveTab] = useState('casino');

  const tabs = [
    { id: 'casino', label: 'Casino Bets' },
    { id: 'sports', label: 'Sport Bets' },
    { id: 'leaderboard', label: 'Race LeaderBoard' }
  ];

  return (
    <div className="py-6 bg-[#1a2c38]">
      <div className="container mx-auto px-4">
        {/* Section Header */}

        {/* Tabs */}
        <div className=" p-1 rounded-lg mb-6">
          <div className="inline-flex bg-[rgb(15,33,46)] p-2 rounded-[30px] overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`py-2 px-4 text-center rounded-[30px] text-sm font-medium transition-colors cursor-pointer mx-1 ${
                  activeTab === tab.id 
                    ? 'bg-[rgb(26,44,56)] text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {activeTab === 'casino' && <CasinoSpot />}
          
          {activeTab === 'sports' && <SportBets />}
          
          {activeTab === 'leaderboard' && <RaceLeaderBoard />}
        </div>
      </div>
    </div>
  )
}
