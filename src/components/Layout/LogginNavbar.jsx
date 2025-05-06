import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import VerificationModal from '../Modals/VerificationModal'; // Import the modal
import TwoStepRegistrationModal from '../Modals/TwoStepRegistrationModal'; // Import the two-step registration modal
import WalletModal from '../Modals/WalletModal'; // Import the WalletModal component
import { toast } from 'sonner'; // Import toast from sonner

export default function LogginNavbar({ toggleChat }) {
  const { user, logout, verifyCode, resendVerificationCode, updateUserDetails } = useContext(AuthContext); // Access user, logout, verifyCode, and updateUserDetails from AuthContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isTwoStepModalOpen, setIsTwoStepModalOpen] = useState(false); // State for two-step registration modal
  const userDropdownRef = useRef(null); // Reference for the dropdown
  const [searchParams, setSearchParams] = useSearchParams(); // Manage query parameters

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleWalletModal = () => {
    const isWalletModalOpen = searchParams.get('modal') === 'wallet';
    if (isWalletModalOpen) {
      searchParams.delete('modal'); // Remove the modal query parameter
      searchParams.delete('tab'); // Remove the tab query parameter
    } else {
      searchParams.set('modal', 'wallet'); // Set modal to wallet
      searchParams.set('tab', 'deposit'); // Default tab to deposit
    }
    setSearchParams(searchParams); // Update the URL
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check if the user's email is verified or if additional details are required
    if (user) {
      if (!user.is_verified) {
        setIsVerificationModalOpen(true);
      } else if (!user.firstName || !user.lastName || !user.country) {
        setIsTwoStepModalOpen(true);
      }
    }
  }, [user]);

  const handleVerify = async (verificationCode) => {
    try {
      const isVerified = await verifyCode(verificationCode); // Call the verifyCode function from AuthContext
      if (isVerified) {
        setIsVerificationModalOpen(false); // Close the modal if verification is successful
        if (!user.firstName || !user.lastName || !user.country) {
          setIsTwoStepModalOpen(true); // Open the two-step registration modal if details are missing
        }
      } else {
        toast.error('Invalid verification code.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('An error occurred during verification. Please try again.');
    }
  };

  const handleSubmitDetails = async (details) => {
    try {
      await updateUserDetails(details); // Call the API to update user details
      setIsTwoStepModalOpen(false); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Failed to update details. Please try again.');
    }
  };

  const cryptocurrencies = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.0023', icon: '/assets/token/bitcoin-btc-logo.png' },
    { name: 'Ethereum', symbol: 'ETH', balance: '1.2345', icon: '/assets/token/ethereum.png' },
    { name: 'Binance Coin', symbol: 'BNB', balance: '0.5678', icon: '/assets/token/bnb.png' },
    { name: 'Cardano', symbol: 'ADA', balance: '100.45', icon: '/assets/token/ada.png' },
    { name: 'Solana', symbol: 'SOL', balance: '50.12', icon: '/assets/token/sol.png' },
    { name: 'Ripple', symbol: 'XRP', balance: '200.34', icon: '/assets/token/xrp.png' },
    { name: 'Polkadot', symbol: 'DOT', balance: '75.89', icon: '/assets/token/dot.png' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: '5000.67', icon: '/assets/token/doge.png' },
    { name: 'Litecoin', symbol: 'LTC', balance: '2.345', icon: '/assets/token/ltc.png' },
    { name: 'Shiba Inu', symbol: 'SHIB', balance: '1000000', icon: '/assets/token/shib.png' },
    { name: 'Avalanche', symbol: 'AVAX', balance: '12.34', icon: '/assets/token/avax.png' },
    { name: 'Chainlink', symbol: 'LINK', balance: '45.67', icon: '/assets/token/link.png' },
    { name: 'Cosmos', symbol: 'ATOM', balance: '34.56', icon: '/assets/token/atom.png' },
  ];

  const userDropdownItems = [
    { name: 'Wallet', icon: '💼' },
    { name: 'VIP', icon: '👑' },
    { name: 'Affiliate', icon: '🤝' },
    { name: 'Statistics', icon: '📊' },
    { name: 'Transactions', icon: '💳' },
    { name: 'My Bets', icon: '🎲' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Live Support', icon: '💬' },
    { name: 'Logout', icon: '🚪', action: logout }, // Add the logout action
  ];

  const handleResendCode = async () => {
    try {
      await resendVerificationCode(user.email); // Call the resend function
      toast.success('A new verification code has been sent to your email.');
    } catch (error) {
      console.error('Resend code error:', error);
      toast.error('Failed to resend verification code. Please try again.');
    }
  };

  // Filter cryptocurrencies based on the search term
  const filteredCryptocurrencies = cryptocurrencies.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerify={handleVerify}
        onResendCode={handleResendCode}
      />
      {!user.firstName || !user.lastName || !user.country && (
        <TwoStepRegistrationModal
          isOpen={isTwoStepModalOpen}
          onClose={() => setIsTwoStepModalOpen(false)}
          onSubmit={handleSubmitDetails}
        />
      )}
      <TwoStepRegistrationModal
        isOpen={isTwoStepModalOpen}
        onClose={() => setIsTwoStepModalOpen(false)}
        onSubmit={handleSubmitDetails}
      />
      <WalletModal
        isOpen={searchParams.get('modal') === 'wallet'} // Open modal if modal=wallet
        onClose={() => {
          searchParams.delete('modal'); // Remove modal query parameter
          searchParams.delete('tab'); // Remove tab query parameter
          setSearchParams(searchParams); // Update the URL
        }}
      />
      <nav className="p-4 flex justify-center items-center space-x-0 relative">
        {/* Wallet Balance Container */}
        <div
          className="wallet-container flex"
          onClick={toggleWalletModal} // Open wallet modal on click
        >
          <div className="bg-[rgb(15,33,46)] cursor-pointer text-white px-4 py-3 rounded-l flex items-center space-x-2 relative">
            <span className="text-sm font-medium">0.002339</span>
            <img
              src="/assets/token/usdt.png" // Replace with the actual path to your currency icon
              alt="Currency Icon"
              className="w-4 h-4"
            />
          </div>
          <div className="bg-blue-600 text-white px-4 py-3 rounded-r flex items-center">
            <span className="text-sm font-medium">Wallet</span>
          </div>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-16 left-0 bg-[rgb(15,33,46)] text-white rounded shadow-lg w-64">
            {/* Enhanced Search Input */}
            <div className="p-2">
              <input
                type="text"
                placeholder="Search currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm text-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 ease-in-out"
              />
            </div>
            <ul className="py-2 max-h-55 overflow-y-auto">
              {filteredCryptocurrencies.map((crypto, index) => (
                <li
                  key={index}
                  className="px-4 py-2 flex justify-between items-center hover:bg-blue-600 cursor-pointer"
                >
                  {/* Left: Balance */}
                  <span className="text-sm font-medium">{crypto.balance}</span>
                  {/* Right: Icon and Symbol */}
                  <div className="flex  space-x-2">
                    <img src={crypto.icon} alt={`${crypto.name} Icon`} className="w-4 h-4" />
                    <span className="text-sm font-medium">{crypto.symbol}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Search Icon */}
        <button className="ml-40 p-4 flex items-center bold text-white">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon w-7 h-7 text-white mb-1 mx-1"
          >
            <title></title>
            <path
              fillRule="evenodd"
              d="M10.266 3.893a23.1 23.1 0 1 1 25.668 38.414A23.1 23.1 0 0 1 10.266 3.893m5.112 30.764a13.9 13.9 0 1 0 15.444-23.114 13.9 13.9 0 0 0-15.444 23.114M38.55 46.33a28 28 0 0 0 7.78-7.78L64 56.22 56.22 64z"
              clipRule="evenodd"
            ></path>
          </svg>
          Search
        </button>

        {/* User Icon */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={toggleUserDropdown}
            className="p-4 flex items-center text-white"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              className="svg-icon w-9 h-9 text-white"
            >
              <title></title>
              <path
                fillRule="evenodd"
                d="M48.322 30.536A19.63 19.63 0 0 0 51.63 19.63 19.62 19.62 0 0 0 32 0a19.63 19.63 0 1 0 16.322 30.536M42.197 43.97a26.6 26.6 0 0 0 8.643-5.78A19.84 19.84 0 0 1 64 56.86V64H0v-7.14a19.84 19.84 0 0 1 13.16-18.67 26.63 26.63 0 0 0 29.037 5.78"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {/* User Dropdown */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-[rgb(15,33,46)] text-white rounded shadow-lg w-48">
              <ul className="py-2">
                {userDropdownItems.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 cursor-pointer"
                    onClick={() => item.action && item.action()} // Trigger the action (logout for the Logout item)
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bell Icon */}
        <button className="p-4 flex items-center text-white">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon w-9 h-9 text-white"
          >
            <title></title>
            <path d="M56 39.64V32c0-10.44-6.68-19.32-16-22.6V8c0-4.4-3.6-8-8-8s-8 3.6-8 8v1.4C14.68 12.68 8 21.56 8 32v7.56H0V48h64v-8.44zm-40 19.6c0 2.64 2.12 4.76 4.76 4.76H43.2c2.64 0 4.76-2.12 4.76-4.76V54H16z"></path>
          </svg>
        </button>

        {/* Chat Icon */}
        <button onClick={toggleChat} className="p-4 flex items-center text-white">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon w-9 h-9 text-white"
          >
            <title></title>
            <path d="M63.76 13.92c-.16-.36-.36-.68-.68-.96-.28-.28-.6-.48-1-.64-.36-.16-.76-.24-1.16-.2h-9v26.16c0 2.04-.8 4-2.28 5.48a7.75 7.75 0 0 1-5.48 2.28H26.84c-1.6 0-2.92 1.32-2.92 2.92v15.08h5c.2-1.32.88-2.56 1.88-3.48s2.28-1.44 3.64-1.52c1.36.08 2.64.6 3.64 1.52s1.64 2.12 1.84 3.48h8c.2-1.32.88-2.56 1.88-3.48s2.28-1.44 3.64-1.52c1.36.08 2.64.6 3.68 1.52 1 .92 1.68 2.16 1.88 3.48h5V15.08c0-.4-.08-.8-.24-1.16"></path>
            <path d="M43.04 38.08c.56-.56.88-1.32.88-2.12V3c0-.8-.32-1.56-.88-2.12S41.72 0 40.92 0H3C2.2 0 1.44.32.88.88S0 2.2 0 3v32.96c0 .8.32 1.56.88 2.12s1.32.88 2.12.88h1v13c0 1.44 1.76 2.16 2.76 1.08L20 38.96h20.92c.8 0 1.56-.32 2.12-.88"></path>
          </svg>
        </button>
      </nav>
    </>
  );
}
