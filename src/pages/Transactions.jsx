import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { FaExchangeAlt } from 'react-icons/fa'

export default function Transactions() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('deposit')

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop()
    if (path && path !== 'transactions') {
      setActiveTab(path)
    }
  }, [location.pathname])

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
    navigate(`/transactions/${tabName}`)
  }

  // Tab configuration
  const tabs = [
    { id: 'deposit', label: 'Deposit' },
    { id: 'withdraw', label: 'Withdraw' },
    { id: 'bills', label: 'Bills' },
    { id: 'others', label: 'Others' },
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Header with Title */}
      <div className="w-full py-6 px-8 flex items-center justify-start">
        <FaExchangeAlt className="h-8 w-8 text-white mr-3" />
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
      </div>

      {/* Tab and Content Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex">
          {/* Left side - Tabs with improved sticky behavior */}
          <div className="w-[200px] mr-6">
            <div className="sticky top-20 bg-[rgb(15,33,46)] p-2 rounded-2xl">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`w-full rounded-md text-left p-3 mb-1 cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-l-4 border-blue-600 bg-[#071824] text-white pl-3' 
                      : 'text-gray-300 hover:bg-[#0a2435] hover:text-white'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 bg-[#0f212e] rounded-2xl p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
