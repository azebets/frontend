import React, { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { AuthContext } from '../../context/AuthContext';

function TrendingGames() {

  const trendingGames = [
    {
      id: 1,
      title: "Mega Fortune",
      provider: "NetEnt",
      image: "/assets/trending-games/1.avif",
      players: 1243,
    },
    {
      id: 2,
      title: "Book of Dead",
      provider: "Play'n GO",
      image: "/assets/trending-games/2.avif",
      players: 987,
    },
    {
      id: 3,
      title: "Starburst",
      provider: "NetEnt",
      image: "/assets/trending-games/3.avif",
      players: 1567,
    },
    {
      id: 4,
      title: "Gonzo's Quest",
      provider: "NetEnt",
      image: "/assets/trending-games/4.avif",
      players: 876,
    },
    {
      id: 5,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/5.avif",
      players: 1432,
    },
    {
      id: 6,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/6.avif",
      players: 1432,
    },
    {
      id: 7,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/6.avif",
      players: 1432,
    },
    {
      id: 8,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/8.avif",
      players: 1432,
    },
    {
      id: 9,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/9.avif",
      players: 1432,
    },
    {
      id: 10,
      title: "Sweet Bonanza",
      provider: "Pragmatic Play",
      image: "/assets/trending-games/10.avif",
      players: 1432,
    },
  ];
  const swiperRef = useRef(null);


  return (
    <div className="py-4 bg-[#1a2c38] relative w-full px-4">
      <div className="container relative h-full w-full">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              className="w-4 h-4 mr-2"
            >
              <path d="M12.265 47.726.21 14.603a3.574 3.574 0 0 1 2.108-4.553l.024-.007 19.282-7.015a3.55 3.55 0 0 1 4.553 2.082l.008.024.694 1.92L12.69 46.073a9 9 0 0 0-.418 1.598zM63.79 15.511 48.002 58.93a3.53 3.53 0 0 1-4.558 2.1l.024.009-21.948-8.001a3.58 3.58 0 0 1-2.124-4.585l-.008.024 15.787-43.39a3.555 3.555 0 0 1 4.559-2.126l-.024-.008 21.948 8a3.58 3.58 0 0 1 2.124 4.585l.008-.024zM50.457 32.685l-1.386-3.254a1.79 1.79 0 0 0-2.333-.956l.012-.004-2.666 1.174a1.787 1.787 0 0 1-2.316-.948l-.004-.012-1.146-2.667a1.764 1.764 0 0 0-2.332-.93l.012-.004-3.28 1.386a1.74 1.74 0 0 0-.929 2.33l-.004-.01 3.92 9.255a1.816 1.816 0 0 0 2.359.928l-.012.005 9.227-3.947a1.737 1.737 0 0 0 .794-2.356l.004.01z"></path>
            </svg>
            <h2 className="text-[14px] font-bold text-white">Trending Games</h2>
          </div>

          <div className="flex border rounded-[30px] pr-2 pl-2 border-amber-50 overflow-hidden">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex items-center justify-center cursor-pointer rounded-[30px] p-2 text-white -400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="w-px bg-blue-400/30"></div>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex items-center justify-center rounded-[30px] cursor-pointer p-2 text-blue-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Games Swiper - Responsive height based on screen size */}
        <div className={`h-full mb-6`}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              320: {
                slidesPerView: 2.4,
                spaceBetween: 8,
              },
              500: {
                slidesPerView: 3.3,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 4.2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 5.4,
                spaceBetween: 10,
              },
              1190: {
                slidesPerView: 7.3,
                spaceBetween: 10,
              },
            }}
            className={`h-full`}>
            {trendingGames.map((game) => (
              <SwiperSlide
                key={game.id}
                className="!h-auto transform transition-transform duration-400 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex flex-col items-center">
                 <div className="w-full h-full aspect-[3/4] relative">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="absolute inset-0  object-cover rounded-[12px]"
                    />
                  </div>
                   <div className="flex items-start mt-[6px] justify-center w-full">
                    <span className="bg-green-500 mt-[2px] h-2 w-2 rounded-full mr-1"></span>
                    <span className="text-white text-[10px] sm:text-[12px]">
                      {Math.floor(Math.random() * 5000) + 1000} Players
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default TrendingGames;




