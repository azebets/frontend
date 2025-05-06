import React, { useState } from 'react';

function VipClubPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian'];

  return (
    <div className="bg-[#1a2c38] min-h-screen text-white">
      {/* Container for Image and Text */}
      <div className="relative w-full h-[300px]">
        {/* Full-Width Image */}
        <img
          src="/assets/affiliate-icons/vip-header.webp"
          alt="VIP Header"
          className="w-full h-full object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-start px-8 bg-gradient-to-r from-black/70 to-transparent">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              The unrivalled VIP experience
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
              Unlock exclusive benefits and receive instantly withdrawable bonuses without any strings attached.
            </p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded shadow-lg hover:bg-blue-500 transition-colors">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="w-full mt-8 text-center">
        <h2 className="text-3xl font-bold text-white">
          Stake VIP ranking system
        </h2>
      </div>
      {/* VIP Vertical Card with Star Icon and Horizontal Line */}
      <div className="w-full relative">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-2 relative h-full">
          {/* Star Icon and Horizontal Line */}
          <div className="card-wraps-center  w-full mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#C69C6D"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#C69C6D] text-white py-2 px-6 rounded mb-4">
                  Bronze
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$10k</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#C69C6D] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#C69C6D] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#C69C6D] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#C69C6D] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-wraps-center w-full  mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#B2CCCC"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#B2CCCC] text-white py-2 px-6 rounded mb-4">
                  Silver
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$10k</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#B2CCCC] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#B2CCCC] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#B2CCCC] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#B2CCCC] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-wraps-center w-full  mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#FED100"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#FED100] text-black py-2 px-6 rounded mb-4">
                  Gold
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$100k</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#FED100] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#FED100] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#FED100] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#FED100] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#FED100] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Bonus growth
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-wraps-center w-full  mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#6FDDE7"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#6FDDE7] text-black py-2 px-6 rounded mb-4">
                Platinum I-III
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$250k - $1M</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Bonus growth
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Daily bonuses / Reload
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-wraps-center w-full  mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#6FDDE7"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#6FDDE7] text-black py-2 px-6 rounded mb-4">
                Platinum IV-VI
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$2.5M - $10M</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Bonus growth
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Daily bonuses / Reload
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Daily bonuses / Reload
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-wraps-center w-full  mr-3">
            {/* Star Icon with Round Background */}
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#213743] rounded-full h-10 w-10">
                <svg
                  fill="none"
                  viewBox="0 0 96 96"
                  className="h-5 w-5"
                >
                  <path
                    fill="#6FDDE7"
                    d="m48.002 14.603 8.48 15.757c1.97 3.693 5.495 6.336 9.677 7.068l.08.012 17.64 3.2L71.48 53.56a13.84 13.84 0 0 0-3.884 9.63q0 .978.132 1.922l-.01-.072 2.44 17.758L54.52 75.24c-1.908-.934-4.15-1.48-6.52-1.48s-4.613.546-6.608 1.518l.09-.039-15.637 7.56 2.438-17.759c.078-.555.123-1.197.123-1.85 0-3.741-1.482-7.137-3.887-9.633l.003.003-12.518-12.92 17.638-3.2a13.64 13.64 0 0 0 9.842-7.008l.036-.072zm0-12.521h-.01a5.2 5.2 0 0 0-4.577 2.733l-.015.027L32 26.28a5.3 5.3 0 0 1-3.648 2.675l-.033.006-23.997 4.32C1.853 33.717 0 35.847 0 38.406a5.2 5.2 0 0 0 1.443 3.596L1.44 42l16.837 17.558a5.06 5.06 0 0 1 1.473 3.578q0 .458-.078.894l.006-.03L16.4 87.997a5.2 5.2 0 0 0 5.148 5.918h.012c.045.003.102.003.156.003.834 0 1.623-.207 2.31-.576l-.027.013 21.397-10.32a6.2 6.2 0 0 1 2.76-.638c1.004 0 1.952.236 2.795.653l-.036-.014 21.08 10.319a4.7 4.7 0 0 0 2.249.56h.033-.003c.051.003.111.003.171.003a5.2 5.2 0 0 0 5.144-5.948l.004.027-3.28-23.998a5.06 5.06 0 0 1 1.4-4.32l16.84-17.557a5.18 5.18 0 0 0 1.448-3.6c0-2.55-1.836-4.67-4.257-5.114l-.033-.006-23.997-4.32a5.3 5.3 0 0 1-3.705-2.768l-.015-.03-11.399-21.44a5.2 5.2 0 0 0-4.593-2.759h-.008z"
                  ></path>
                </svg>
              </div>

              {/* Extended Horizontal Line */}
              <div className="flex-1 h-[4px] bg-gray-600 ml-4"></div>
            </div>
              <div className="flex flex-col bg-[#213743] h-100 rounded-[9px] shadow-lg p-6 mt-3">
              {/* Card Content */}
              <div>
                {/* Button */}
                <button className="bg-[#6FDDE7] text-black py-2 px-6 rounded mb-4">
                Diamond I-V
                </button>

                {/* Price Title */}
                <h3 className="text-2xl font-bold text-white mb-1">$25M</h3>
                <p className="text-gray-400 text-sm mb-4">Wager Amount</p>

                {/* Features */}
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Level Up bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Rakeback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Weekly bonuses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Bonus growth
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Daily bonuses / Reload
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div
                      className="w-5 h-5 bg-[#6FDDE7] rounded-full flex items-center justify-center mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Daily bonuses / Reload
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="w-full my-8 text-center">
        <h2 className="text-3xl font-bold text-white">
          Stake VIP Club benefits
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 px-4">
          {/* Card 1 */}
          <div className="flex items-center bg-[#213743] rounded shadow-lg p-3">
            <img
              src="/assets/affiliate-icons/b1.webp"
              alt="Boost Icon"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl text-start font-bold text-white">Boost</h3>
              <p className="text-gray-30 text-start text-sm">
                Every week and every month, expect a fresh bonus based on your recent games. The more you play, the higher the bonuses.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center bg-[#213743] rounded shadow-lg p-3">
            <img
              src="/assets/affiliate-icons/b2.webp"
              alt="VIP Host Icon"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl text-start font-bold text-white">
              Recent Play Bonuses</h3>
              <p className="text-gray-300 text-start text-sm">
              Having a rough streak of luck? Stake offers money back on losses every time you level up.
              </p>
            </div>
          </div>
              {/* Card 2 */}
              <div className="flex items-center bg-[#213743] rounded shadow-lg p-3">
            <img
              src="/assets/affiliate-icons/b3.webp"
              alt="VIP Host Icon"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl text-start font-bold text-white">Level-Ups</h3>
              <p className="text-gray-300 text-start text-sm">
              Reach a new level and get paid. The level-ups get better the higher you go.
              </p>
            </div>
          </div>
              {/* Card 2 */}
              <div className="flex items-center bg-[#213743] rounded shadow-lg p-3">
            <img
              src="/assets/affiliate-icons/b4.webp"
              alt="VIP Host Icon"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl text-start font-bold text-white">
              Level-Upst</h3>
              <p className="text-gray-300 text-start text-sm">
                Receive your own dedicated VIP host who will support and cater to your betting needs.
              </p>
            </div>
            </div>
                    {/* Card 2 */}
                    <div className="flex items-center bg-[#213743] rounded shadow-lg p-3">
            <img
              src="/assets/affiliate-icons/b4.webp"
              alt="VIP Host Icon"
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl text-start font-bold text-white">
              Bespoke benefits</h3>
              <p className="text-gray-300 text-start text-sm">
              Work with your dedicated VIP host to tailor benefits to your gaming needs.
              </p>
            </div>
            </div>
        </div>
      </div>

      {/* Full-Width Card Section */}
      <div className="w-full bg-[#213743] mr-5 rounded-lg shadow-lg p-6 mb-40 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        {/* Title and Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            Live, 24-hour customer support
          </h2>
          <p className="text-gray-300 text-sm">
            Real support from real people. We're available through instant live chat and email to help you.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Preferred Language Button */}
          <div className="relative">
            <label className="text-gray-400 text-xs mb-1 block">Preferred language</label>
            <button
              className="bg-[#1a2c38] text-white py-2 px-4 rounded flex items-center justify-between w-48"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedLanguage}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
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
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-[#1a2c38] text-white rounded shadow w-48">
                <ul className="py-2">
                  {languages.map((language) => (
                    <li
                      key={language}
                      className="px-4 py-2 hover:bg-[#2a3b4c] cursor-pointer"
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Chat With Us Button */}
          <button className="bg-blue-600 text-white mt-5 py-2 px-6 rounded shadow hover:bg-blue-500 transition-colors">
            Chat with us
          </button>
        </div>
      </div>
    </div>
  );
}

export default VipClubPage;
