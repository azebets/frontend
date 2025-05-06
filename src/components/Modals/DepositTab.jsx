import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Import QRCode from react-qr-code
import api from '../../utils/api'; // Import API utility
import { toast } from 'sonner';

export default function DepositTab() {
  const [depositAddress, setDepositAddress] = useState(''); // State for deposit address
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [selectedCrypto, setSelectedCrypto] = useState('ETH'); // Default crypto chain
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const cryptos = ['ETH', 'SOL', 'TRX', 'BSC']; // List of available cryptos

  useEffect(() => {
    const fetchDepositAddress = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.post('/api/ccpayment/permanent-address', {
            chain: selectedCrypto, // Pass the selected crypto chain
        });
        setDepositAddress(response.data.address); // Set the deposit address
      } catch (error) {
        console.error('Error fetching deposit address:', error);
        toast.error('Failed to fetch deposit address. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDepositAddress(); // Fetch the deposit address on component mount or when selectedCrypto changes
  }, [selectedCrypto]);

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto); // Update the selected crypto
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    toast.success('Address copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      {/* Dropdown for Cryptos */}
      <div className="relative mb-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#0f212e] text-gray-300 border border-gray-500 rounded focus:outline-none"
        >
          <span>{selectedCrypto}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transform transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full bg-[#1a2c38] border border-gray-500 rounded mt-2 max-h-40 overflow-y-auto">
            {cryptos.map((crypto, index) => (
              <li
                key={index}
                onClick={() => handleCryptoSelect(crypto)}
                className="px-4 py-2 hover:bg-blue-600 cursor-pointer text-gray-300"
              >
                {crypto}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        {loading ? (
          <p className="text-gray-300">Loading QR Code...</p>
        ) : (
          <div className="p-2 bg-white rounded-lg shadow-lg border-2 border-gray-500">
            <QRCode value={depositAddress || ' '} size={128} />
          </div>
        )}
      </div>

      {/* Deposit Address */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Deposit Address</label>
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={depositAddress}
              readOnly
              className="w-full px-4 py-2 text-sm text-gray-300 bg-[#0f212e] border border-gray-500 rounded focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}