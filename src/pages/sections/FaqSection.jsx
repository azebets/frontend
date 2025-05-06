import React, { useState } from 'react'

export default function FaqSection() {
  const [openCards, setOpenCards] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
    card7: false,
    card8: false
  });

  const toggleCard = (cardId) => {
    setOpenCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="py-8 bg-[#1a2c38]">
      <div className="container mx-auto px-4">
        {/* Section Title with Icon */}
        <div className="flex items-center mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-500 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h2 className="text-xl font-bold text-white">Still Have Questions?</h2>
        </div>
        
        {/* FAQ Card 1 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card1')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Who is Stake?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card1 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card1 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Leading the online gambling industry since 2017, Stake.com offers a wide variety of online casino and sports betting options, operating globally in 15 different languages.
                </p>
                <p>
                  With a reputable and secure platform, Stake Casino is home to worldwide local currencies and crypto betting options for online slot games, Stake Originals and live casino games. Stake Sportsbook offers unbeatable odds on all major sporting events including a range of eSport leagues.
                </p>
                <p className="mt-3">
                  We host regular bet bonuses and promotions and offer an exclusive VIP Club experience - all with a simple-to-use deposit process on our licensed platform.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Card 2 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card2')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Is Stake Licensed?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card2 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card2 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Stake.com is licensed by gaming authorities in Curacao, providing a safe and secure betting platform. Stake is operated by Medium Rare N.V. under the Certificate of Operation (Application no. OGL/2024/1451/0918) issued by the Curaçao Gaming Control Board, which is authorised and regulated by the Government of Curaçao.
                </p>
                <p>
                  Stake is a Crypto Gambling Foundation verified operator with strong policies around Anti-Money Laundering. Stake promotes responsible gambling with a robust self-exclusion policy and various Stake Smart resources.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Card 3 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card3')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Is Betting on Stake Safe?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card3 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card3 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Stake is committed to providing a safe environment for our community. We pride ourselves in offering the most up to date and accessible smarter gambling resources. Our responsible gambling guidelines paired with our monthly budget calculator have been developed to help our players set appropriate betting limits.
                </p>
                <p>
                  When betting with local and crypto currencies, players can be sure their funds are securely stored using our Stake Vault feature.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Card 4 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card4')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">What Currencies Can I Bet With?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card4 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card4 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p>
                  Alongside supporting local currencies, Stake.com is the world's leading cryptocurrency casino and sportsbook, supporting 20 cryptocurrencies from Bitcoin (BTC) to Polygon (MATIC). Discover the complete list of supported crypto at Stake.com for more details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Card 5 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card5')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">What Sports Can I Bet On?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card5 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card5 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  From major football and basketball leagues to Dota 2 and CS:GO action, we cover all bases for sports and eSports markets. We offer industry leading odds and tailored betting resources including expert picks and predictions on our Stake News Blog.
                </p>
                <p>
                  You can bet on all major upcoming sporting events, place live bets and live stream all the biggest sporting events for free on Stake Sportsbook.
                </p>
              </div>
            )}
          </div>
        </div>

            {/* FAQ Card 7 */}
            <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card7')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">What Types of Casino Games Can I Play?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card7 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card7 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p>
                  Browse our wide variety of popular casino games and enjoy a fair and fun online gaming experience. Stake's online casino platform features a range of game categories including slot games, live casino games, Stake Originals and many classics like Blackjack, Roulette, Poker, and Baccarat, right from your browser. Stake brings you the best gameplay from esteemed iGaming providers like Pragmatic Play, Hacksaw Gaming, Twist Gaming and Evolution Gaming.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Card 8 */}
        <div className="w-full mb-3">
          <div 
            className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[rgb(38,62,76)]"
            onClick={() => toggleCard('card8')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">How Do I Watch Live Streams?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCards.card8 ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {/* Expandable content */}
            {openCards.card8 && (
              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Stake.com is the perfect place for official sports streams, with comprehensive coverage of most popular sporting events and major tournaments, from tennis matches to MMA fights.
                </p>
                <p>
                  To live stream the latest sporting events, click on the live stream icon next to the event on Stake Sportsbook. For full details, check out our comprehensive guide to live streaming your favourite sports on Stake.com.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* READ OUR GUIDES Button */}
        <div className="mt-8">
          <button 
            className="bg-[rgb(33,55,67)] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:bg-[rgb(38,62,76)] hover:shadow-lg cursor-pointer"
          >
            READ OUR GUIDES
          </button>
        </div>
      </div>
    </div>
  )
}
