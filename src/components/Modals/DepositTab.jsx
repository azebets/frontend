import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Import QRCode from react-qr-code
import api from '../../utils/api'; // Import API utility
import { toast } from 'sonner';
import Loader from '../common/Loader';

export default function DepositTab() {
  const [depositAddress, setDepositAddress] = useState(''); // State for deposit address
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [selectedCrypto, setSelectedCrypto] = useState({ chain: 'ETH', network: 'ERC20' }); // Default crypto chain
  const [selectedCurrency, setSelectedCurrency] = useState(   {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/assets/token/ethereum.png',
  },); // Default currency
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for crypto dropdown visibility
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false); // State for currency dropdown visibility

  const cryptos = [
    { chain: 'ETH', network: 'ERC20' },
    { chain: 'TRX', network: 'TRC20' },
    { chain: 'BSC', network: 'BEP20' },
  ]; // List of available cryptos

  const currencies = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '/assets/token/bitcoin-btc-logo.png',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: '/assets/token/ethereum.png',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      icon: '/assets/token/usdt.png',
    },
  ]; // List of available currencies

  useEffect(() => {
    const fetchDepositAddress = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.post('/api/ccpayment/permanent-address', {
          chain: selectedCrypto.chain, // Pass the selected crypto chain
        });
        setDepositAddress(response?.data?.data?.address); // Set the deposit address
      } catch (error) {
        console.error('Error fetching deposit address:', error);
        toast.error('Failed to fetch deposit address. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDepositAddress(); // Fetch the deposit address on component mount or when selectedCrypto changes
  }, [selectedCrypto]);

  const handleCryptoSelect = async (crypto) => {
    if(selectedCurrency.symbol === 'USDT'){
      setSelectedCrypto(crypto); // Update the selected crypto
    } 
    setIsDropdownOpen(false); // Close the dropdown

    try {
      setLoading(true); // Start loading
      const response = await api.post('/api/ccpayment/permanent-address', {
        chain: crypto.chain || crypto.symbol , // Pass the selected crypto chain
      });
      setDepositAddress(response?.data?.data?.address); // Set the deposit address
      toast.success(`Deposit address for ${crypto.network || crypto.symbol} fetched successfully!`);
    } catch (error) {
      console.error(`Error fetching deposit address for ${crypto.network || crypto.symbol}:`, error);
      toast.error('Failed to fetch deposit address. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency); // Update the selected currency
    setIsCurrencyDropdownOpen(false); // Close the dropdown
    if(currency.symbol === 'USDT') return;
    handleCryptoSelect(currency)
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    toast.success('Address copied to clipboard!');
  };

  return (
    <div className="space-y-4">

     {/* Dropdown for Currencies */}
     <div className="relative mb-4">
        <button
          onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#0f212e] text-gray-300 border border-gray-500 rounded focus:outline-none"
        >
          <div className='px-4 py-2 hover:bg-blue-600 cursor-pointer text-gray-300 flex items-center space-x-2'>
            <img src={selectedCurrency.icon} alt={selectedCurrency.name} className="w-5 h-5" />
            <span>{selectedCurrency.name}</span>
          </div>
    
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transform transition-transform ${
              isCurrencyDropdownOpen ? 'rotate-180' : ''
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
        {isCurrencyDropdownOpen && (
          <ul className="absolute z-10 w-full bg-[#1a2c38] border border-gray-500 rounded mt-2 max-h-40 overflow-y-auto">
            {currencies.map((currency, index) => (
              <li
                key={index}
                onClick={() => handleCurrencySelect(currency)}
                className="px-4 py-2 hover:bg-blue-600 cursor-pointer text-gray-300 flex items-center space-x-2"
              >
                <img src={currency.icon} alt={currency.name} className="w-5 h-5" />
                <span>{currency.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown for Cryptos */}
      {selectedCurrency.symbol === 'USDT' && (
      <div className="relative mb-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#0f212e] text-gray-300 border border-gray-500 rounded focus:outline-none"
        >
          <span>{selectedCrypto.network || "Select Network"}</span>
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
                  {crypto.network}
                </li>
              ))}
            </ul>
          )}
      </div>
      )}
        


 

      {/* QR Code */}
      <div className="flex justify-center h-[148px]">
        {loading ? (
          <p>Loading...</p>
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
           <p>Loading...</p>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={depositAddress}
              readOnly
              className="w-full px-4 py-4 text-sm text-gray-300 bg-[#0f212e] border border-gray-500 rounded focus:outline-none"
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