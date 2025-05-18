import React from 'react';
import { FaQuestionCircle, FaGift, FaExchangeAlt, FaUserFriends } from 'react-icons/fa';

const Others = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <FaQuestionCircle className="text-purple-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Other Transactions</h2>
      </div>
      
      <div className="bg-[#071824] rounded-lg p-6">
        <p className="text-gray-300 mb-6">
          View and manage other types of transactions related to your account.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Bonuses */}
          <div className="bg-[#0f212e] p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <div className="bg-purple-900 rounded-full p-2 mr-3">
                <FaGift className="text-purple-400" />
              </div>
              <h3 className="text-white font-medium">Bonuses & Rewards</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              View all bonuses, rewards, and promotional credits received
            </p>
            <button className="text-blue-400 text-sm hover:text-blue-300">
              View History →
            </button>
          </div>
          
          {/* Conversions */}
          <div className="bg-[#0f212e] p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <div className="bg-green-900 rounded-full p-2 mr-3">
                <FaExchangeAlt className="text-green-400" />
              </div>
              <h3 className="text-white font-medium">Currency Conversions</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Track all currency exchange transactions between different tokens
            </p>
            <button className="text-blue-400 text-sm hover:text-blue-300">
              View History →
            </button>
          </div>
          
          {/* Affiliate */}
          <div className="bg-[#0f212e] p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <div className="bg-blue-900 rounded-full p-2 mr-3">
                <FaUserFriends className="text-blue-400" />
              </div>
              <h3 className="text-white font-medium">Affiliate Commissions</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Track earnings from your affiliate referrals
            </p>
            <button className="text-blue-400 text-sm hover:text-blue-300">
              View History →
            </button>
          </div>
          
          {/* Support */}
          <div className="bg-[#0f212e] p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <div className="bg-yellow-900 rounded-full p-2 mr-3">
                <FaQuestionCircle className="text-yellow-400" />
              </div>
              <h3 className="text-white font-medium">Support Adjustments</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              View manual adjustments made by customer support
            </p>
            <button className="text-blue-400 text-sm hover:text-blue-300">
              View History →
            </button>
          </div>
        </div>
        
        <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-800">
          <p className="text-sm text-blue-200">
            <strong>Need help?</strong> If you have any questions about transactions not listed here, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Others;