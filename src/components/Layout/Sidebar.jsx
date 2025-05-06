function Sidebar({ isOpen, toggleSidebar }) {
  const cardNavItems = [
    { name: 'Promotions', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', path: '/promotions' },
    { name: 'Affiliate', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: '/affiliate' },
    { name: 'VIP Club', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', path: '/vip-club' },
    { name: 'Blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', path: '/blog' },
    { name: 'Forum', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', path: '/forum' },
  ];

  const supportNavItems = [
    { name: 'Sponsorship', icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z' },
    { name: 'Responsible Gambling', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Live Support', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { name: 'Language: English', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  ];

  return (
    <aside 
      className={`bg-grey-700 shadow-lg transition-all duration-300 ease-in-out fixed h-full ${
        isOpen ? 'w-[240px]' : 'w-[70px]'
      } left-0 z-0 pt-0`}
    >
      {/* Top menu bar with hamburger and buttons - matching navbar height */}
      <div className="flex items-center px-4 h-[60px] shadow-md relative z-10">
        <button 
          className="text-grey-200 hover:text-white mr-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="flex space-x-2">
            <button 
              className="relative text-white font-semibold py-2 px-3 rounded-[6px] text-sm transition-all overflow-hidden group cursor-pointer"
              style={{
                width: '80px',
                height: '36px'
              }}
            >
              <div 
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                style={{ backgroundImage: 'url(/assets/sidebar/casino-poker-cards-en.jpg)' }}
              ></div>
              <div 
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ backgroundImage: 'url(/assets/sidebar/casino-poker-cards-green-en.jpg)' }}
              ></div>
              <span className="relative z-10">CASINO</span>
            </button>
            <button 
              className="relative text-white font-semibold py-2 px-3 rounded-md text-sm transition-all overflow-hidden group cursor-pointer"
              style={{
                width: '80px',
                height: '36px'
              }}
            >
              <div 
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                style={{ backgroundImage: 'url(/assets/sidebar/sports-balls-en.jpg)' }}
              ></div>
              <div 
                className="absolute rounded-[4px] inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ backgroundImage: 'url(/assets/sidebar/sports-balls-orange-en.jpg)' }}
              ></div>
              <span className="relative z-10">SPORTS</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="h-full overflow-y-auto">
        <nav className="px-4 py-6">
          {/* Card container for additional nav links */}
          <div className="mt-0 overflow-visible rounded-[4px]" style={{ backgroundColor: 'rgb(26, 44, 56)' }}>
            <ul>
              {cardNavItems.map((item, index) => (
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





















