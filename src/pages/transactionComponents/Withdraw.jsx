import React, { useState } from 'react';
import { FaArrowUp, FaWallet } from 'react-icons/fa';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle withdrawal submission
    console.log({ amount, address });
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <FaArrowUp className="text-red-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Withdraw Funds</h2>
      </div>
      
      <div className="bg-[#071824] rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Withdrawal Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/assets/token/usdt.png" alt="USDT" className="w-5 h-5" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-3 pl-10 bg-[#0f212e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Wallet Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your wallet address"
              className="w-full p-3 bg-[#0f212e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="bg-yellow-900 bg-opacity-30 p-4 rounded-lg border border-yellow-800 mb-6">
            <p className="text-sm text-yellow-200">
              <strong>Important:</strong> Please double-check your wallet address before submitting. Withdrawals are processed within 24 hours.
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Request Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;