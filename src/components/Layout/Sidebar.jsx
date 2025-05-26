import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for route checking
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

function Sidebar({ isOpen, toggleSidebar }) {
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false); // State to toggle promotions dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false); // New state for profile dropdown
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const location = useLocation(); // Get the current route
  const { user, logout } = useContext(AuthContext); // Get user and logout function from AuthContext

  const isCasinoRoute = location.pathname.includes('/casino'); // Check if the current route includes "/casino"

  const cardNavItems = [
    { 
      name: 'Profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', 
      requiresAuth: true, 
      isDropdown: true 
    },
    { name: 'Promotions', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', path: '/promotions', isDropdown: true },
    { name: 'Affiliate', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: '/affiliate' },
    { name: 'VIP Club', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', path: '/vip-club' },
    { name: 'Blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', path: '/blog' },
    { name: 'Forum', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', path: '/forum' },
  ];

  const profileSubItems = [
    { name: 'Wallet', path: '/profile/wallet', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { name: 'VIP', path: '/profile/vip', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4' },
    { name: 'Statistics', path: '/profile/statistics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Notifications', path: '/profile/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { name: 'Logout', action: 'logout', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
  ];

  const supportNavItems = [
    { name: 'Sponsorship', icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z' },
    { name: 'Responsible Gambling', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Live Support', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { name: 'Language: English', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  ];

    const FavNavItems = [
    { 
      name: 'Favourite', 
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    },
    { 
      name: 'Recent', 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    { 
      name: 'Challenges', 
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    },
    { 
      name: 'My bets', 
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
    },
  ];

  // New Games list
  const gamesItems = [
    { 
      name: 'Crash', 
      // Airplane icon for Crash
      icon: 'M2.5 19.5l19-7.5m-19 7.5l7.5-19m-7.5 19l7.5-7.5m11.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', 
      path: '/casino/game/crash'
    },
    { 
      name: 'Mines', 
      // Pickaxe icon for Mines
      icon: 'M2 22l20-20m-7 7l7 7m-7-7l-7 7m7-7v14', 
      path: '/casino/game/mines'
    },
    { 
      name: 'Dice', 
      // Dice icon for Dice
      icon: 'M5 5h14v14H5V5zm3 3h2v2H8V8zm6 0h2v2h-2V8zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2z', 
      path: '/casino/game/dice'
    },
    { 
      name: 'Hilo', 
      // Arrow up and down icon for Hilo
      icon: 'M12 4v16m0 0l-4-4m4 4l4-4M12 20V4m0 0l-4 4m4-4l4 4', 
      path: '/casino/game/hilo'
    },
  ];

  const promotionsSubItems = [
    { name: '75k Weekly Raffle', path: '/promotions/weekly-raffle' },
    { name: '100k Race', path: '/promotions/100k-race' },
    { name: 'Pragmatic Drops', path: '/promotions/pragmatic-drops' },
    { name: 'View More', path: '/promotions/view-more' },
  ];

  // Handle profile item click
  const handleProfileItemClick = (item) => {
    if (item.action === 'logout') {
      logout();
      navigate('/');
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside
      className={`bg-[#0f212e] sidebar pb-12 shadow-lg transition-all h-screen duration-300 ease-in-out fixed ${
        isOpen ? 'w-[240px]' : 'w-[70px]'
      } left-0 z-[-1] pt-0`}
    >

      {/* Top menu bar with hamburger and buttons */}
      <div className="flex items-center px-4 h-[60px] shadow-md relative z-[-1]">
        <button
          className="text-grey-200 hover:text-white mr-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="flex space-x-2">
            {/* Casino Button */}
            <button
              onClick={() => navigate('/casino/home/')} // Navigate to /casino/home/
              className="relative text-white font-semibold py-2 px-3 rounded-[6px] text-sm transition-all overflow-hidden group cursor-pointer"
              style={{
                width: '80px',
                height: '36px',
              }}
            >
              <div
                className={`absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 ${
                  isCasinoRoute ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  backgroundImage: 'url(/assets/sidebar/casino-poker-cards-en.jpg)',
                }}
              ></div>
              <div
                className={`absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 ${
                  isCasinoRoute ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: 'url(/assets/sidebar/casino-poker-cards-green-en.jpg)',
                }}
              ></div>
              <span className="relative z-10">CASINO</span>
            </button>
            {/* Sports Button */}
            <button
              className="relative text-white font-semibold py-2 px-3 rounded-md text-sm transition-all overflow-hidden group cursor-pointer"
              style={{
                width: '80px',
                height: '36px',
              }}
            >
              <div
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                style={{
                  backgroundImage: 'url(/assets/sidebar/sports-balls-en.jpg)',
                }}
              ></div>
              <div
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: 'url(/assets/sidebar/sports-balls-orange-en.jpg)',
                }}
              ></div>
              <span className="relative z-10">SPORTS</span>
            </button>
          </div>
        )}
      </div>

      

      <div className="h-full overflow-y-auto">
        <nav className="px-4 py-6">
            {/* Second card container for support links */}
           {isCasinoRoute && 
          <div className="mt-6 mb-5 rounded-[4px] overflow-visible" style={{ backgroundColor: 'rgb(26, 44, 56)' }}>
            <ul>
              {FavNavItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a 
                    href="#" 
                    className={`flex items-center ${!isOpen && 'justify-center'} font-semibold p-3 
                    ${!user ? 'text-gray-500 cursor-not-allowed' : 'text-grey-200 hover:bg-[#2f4553] hover:text-white'} 
                    text-[13px] transition-colors`}
                    onClick={(e) => !user && e.preventDefault()}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6 transition-transform group-hover:scale-110'} 
                      ${!user ? 'text-gray-500' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {isOpen && <span>{item.name}</span>}
                  </a>
                  {!isOpen && (
                    <div className="absolute left-[76px] top-0 px-3 py-1 bg-white text-grey-800 text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-md ml-2 h-full flex items-center pointer-events-none">
                      {item.name}
                      {!user && <span className="ml-1 text-red-500">(Login required)</span>}
                      <div className="absolute top-1/2 left-[-6px] transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
            }

          {/* Games card container */}
          {isCasinoRoute && 
           <div className="mt-6 rounded-[4px] mb-5 overflow-visible" style={{ backgroundColor: 'rgb(26, 44, 56)' }}>
            {isOpen && (
              <div className="px-4 py-2 border-b border-[#1a3547]">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Games</h3>
              </div>
            )}
            <div className={isOpen ? "pt-1" : ""}>
              <ul>
                {gamesItems.map((item, index) => (
                  <li key={index} className="relative group">
                    <a 
                      href={item.path} 
                      className={`flex items-center ${!isOpen && 'justify-center'} font-semibold p-3 text-grey-200 text-[13px] hover:bg-[#2f4553] hover:text-white transition-colors`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6 transition-transform group-hover:scale-110'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {isOpen && <span>{item.name}</span>}
                    </a>
                    {!isOpen && (
                      <div className="absolute left-[76px] top-0 px-3 py-1 bg-white text-grey-800 text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-md ml-2 h-full flex items-center pointer-events-none">
                        {item.name}
                        <div className="absolute top-1/2 left-[-6px] transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          }
         
          
          {/* Card container for additional nav links */}
          <div className="mt-0 overflow-visible rounded-[4px]" style={{ backgroundColor: 'rgb(26, 44, 56)' }}>
            <ul>
              {cardNavItems.map((item, index) => {
                // Skip rendering Profile if user is not logged in
                if (item.requiresAuth && !user) {
                  return null;
                }
                
                return (
                  <li key={index} className="relative group">
                    {item.name === 'Profile' ? (
                      <>
                        <button
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className={`flex items-center justify-between w-full font-semibold p-3 text-grey-200 text-[13px] hover:bg-[#2f4553] hover:text-white transition-colors ${
                            !isOpen && 'justify-center'
                          }`}
                        >
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {isOpen && <span>{item.name}</span>}
                          </div>
                          {isOpen && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transform transition-transform ${
                                isProfileOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>
                        {isProfileOpen && isOpen && (
                          <ul className="pl-4 pr-4 bg-[#142736] rounded-md mt-2 py-2">
                            {profileSubItems.map((subItem, subIndex) => (
                              <li key={subIndex} className="py-2">
                                <button
                                  onClick={() => handleProfileItemClick(subItem)}
                                  className="flex items-center w-full text-gray-300 hover:text-white text-sm transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={subItem.icon} />
                                  </svg>
                                  <span>{subItem.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : item.name === 'Promotions' ? (
                      <>
                        <button
                          onClick={() => setIsPromotionsOpen(!isPromotionsOpen)}
                          className={`flex items-center justify-between w-full font-semibold p-3 text-grey-200 text-[13px] hover:bg-[#2f4553] hover:text-white transition-colors ${
                            !isOpen && 'justify-center'
                          }`}
                        >
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {isOpen && <span>{item.name}</span>}
                          </div>
                          {isOpen && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transform transition-transform ${
                                isPromotionsOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>
                        {isPromotionsOpen && isOpen && (
                          <ul className="pl-8 bg-[#1a2c38] rounded-md mt-2">
                            {promotionsSubItems.map((subItem, subIndex) => (
                              <li key={subIndex} className="py-2">
                                <a
                                  href={subItem.path}
                                  className="text-gray-300 hover:text-white text-sm transition-colors"
                                >
                                  {subItem.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.path}
                        className={`flex items-center ${!isOpen && 'justify-center'} font-semibold p-3 text-grey-200 text-[13px] hover:bg-[#2f4553] hover:text-white transition-colors`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        {isOpen && <span>{item.name}</span>}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Second card container for support links */}
          <div className="mt-6 rounded-[4px] overflow-visible" style={{ backgroundColor: 'rgb(26, 44, 56)' }}>
            <ul>
              {supportNavItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a 
                    href="#" 
                    className={`flex items-center ${!isOpen && 'justify-center'} font-semibold p-3 text-grey-200 text-[13px] hover:bg-[#2f4553] hover:text-white transition-colors`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`${isOpen ? 'h-5 w-5 mr-3' : 'h-6 w-6 transition-transform group-hover:scale-110'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {isOpen && <span>{item.name}</span>}
                  </a>
                  {!isOpen && (
                    <div className="absolute left-[76px] top-0 px-3 py-1 bg-white text-grey-800 text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-md ml-2 h-full flex items-center pointer-events-none">
                      {item.name}
                      <div className="absolute top-1/2 left-[-6px] transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
