import { useState } from 'react';

function Footer() {
  const [language, setLanguage] = useState('English');
  const [showLanguages, setShowLanguages] = useState(false);
  
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Arabic'
  ];
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguages(false);
  };

  return (
    <footer className="bg-grey-700 py-6 px-8">
      <div className="flex justify-between items-start w-full">
        {/* Left side - Logo and copyright */}
        <div className="flex flex-col">
          {/* Logo and copyright in same row */}
          
          <div className="flex flex-col items-center mb-4">
            {/* Logo SVG */}
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 180 40"
              className="h-7 text-white hover:text-grey-200 transition-colors"
            >
              <text
                x="0"
                y="28"
                fontFamily="Verdana, Geneva, sans-serif"
                fontWeight="bold"
                fontSize="32"
                fill="currentColor"
                letterSpacing="2"
              >
                Azabets
              </text>
            </svg>
            
            {/* Copyright text */}
            <p className="text-grey-300 text-sm">
              © 2025 Stake.com | All Rights Reserved.
            </p>
          </div>
        </div>
        
        {/* Right side - Social media icons */}
        <div className="flex items-center space-x-5 self-center">
          {/* Forum */}
          <a href="#" className="text-grey-300 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a href="#" className="text-grey-300 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          
          {/* Twitter */}
          <a href="#" className="text-grey-300 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          
          {/* Instagram */}
          <a href="#" className="text-grey-300 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a1 1 0 011 1v11a1 1 0 01-1 1h-11a1 1 0 01-1-1v-11a1 1 0 011-1z" />
            </svg>
          </a>
          
          {/* YouTube */}
          <a href="#" className="text-grey-300 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Horizontal line */}
      <div className="border-t border-grey-600 my-6"></div>
      
      {/* Footer links section */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8">
        {/* Casino column */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">Casino</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Casino Games</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Slots</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Live Casino</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Roulette</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Blackjack</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Poker</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Providers</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Promos & Competitions</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Stake Engine</a>
          </div>
        </div>
        
        {/* Sports column */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">Sports</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Sportsbook</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Live Sports</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Soccer</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Basketball</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Tennis</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">eSports</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Bet Bonuses</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Sports Rules</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Racing Rules</a>
          </div>
        </div>

            {/* Sports column */}
            <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">Support</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Help Center</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Fairness</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Gambling Helpline</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Live Support</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Self Exclusion</a>
          </div>
        </div>
            {/* Sports column */}
            <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">About Us</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">VIP Club</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Affiliate</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">AML Policy</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
            {/* Sports column */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">Payment Info</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Deposit & Withdrawals</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Currency Guide</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Crypto Guide</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Supported Crypto</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">How to Use the Vault</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">How Much to Bet With</a>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">How-to Guides</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">How-to Guides</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Online Casino Guide</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Sports Betting Guide</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">How to Live Stream Sports</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">Stake VIP Guide</a>
            <a href="#" className="text-grey-300 hover:text-white text-sm transition-colors">House Edge Guide</a>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base mb-4">Language</h3>
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full bg-[#2f4553] hover:bg-[#3a5060] text-white text-sm py-2 px-3 rounded transition-colors"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <span>{language}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-2 transition-transform ${showLanguages ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showLanguages && (
              <div className="absolute top-full mt-1 left-0 bg-[#2f4553] rounded shadow-lg py-1 w-full z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`block w-full text-left px-3 py-2 text-sm ${
                      lang === language ? 'text-white bg-[#3a5060]' : 'text-grey-300 hover:bg-[#3a5060] hover:text-white'
                    }`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom footer section with policies */}
      <div className="border-t border-grey-600 mt-8 pt-6 flex justify-between items-center">
        <div className="text-grey-300 text-sm">
          <p>Responsible Gaming | Terms of Service | Privacy Policy</p>
        </div>
        <div className="text-grey-300 text-sm">
          <p>18+ | Play Responsibly</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;




