import React from 'react';

export default function WithdrawTab({ networks, selectedNetwork, setSelectedNetwork }) {
  return (
    <div className="space-y-4 py-2">
      <label className="text-m text-gray-200 py-[1.5rem]">Withdraw USDT</label>
      {/* Network Tabs */}
      <div className="space-y-2 mt-5">
        <label className="text-sm text-gray-400">Network</label>
        <div className="flex space-x-2">
          {networks.map((network, index) => (
            <button
              key={index}
              onClick={() => setSelectedNetwork(network)}
              className={`px-4 py-2 text-sm font-medium rounded ${
                selectedNetwork === network
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#0f212e] text-gray-300'
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter USDT withdrawal address"
        className="w-full px-4 my-2 py-3 text-sm text-gray-300 bg-[#0f212e] border border-gray-500 rounded focus:outline-none"
      />
      <input
        type="number"
        placeholder="Enter USDT amount"
        className="w-full px-4 py-3 my-2 text-sm text-gray-300 bg-[#0f212e] border border-gray-500 rounded focus:outline-none"
      />
      <button className="w-full px-4 mt-7 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Withdraw
      </button>
    </div>
  );
}