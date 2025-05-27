import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules'; // Corrected import path
import InhouseGames from './sections/InHouseGames';
import BetsLogSection from './sections/BetsLogSection';


function CasinoHome() {
  const cards = [
    { id: 1, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 2, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r2.avif' },
    { id: 3, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 4, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 5, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 6, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 7, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
    { id: 8, title: 'Daily Race', details: 'Play in our $100,000 daily race', image: '/assets/home/r1.avif' },
  ];



  return (
    <div className="p-2 md:p-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1240: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative flex justify-between bg-[rgb(33,55,67)] gap-2 p-3 text-white shadow-lg rounded-lg h-[13rem]">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  {/* Promo Badge */}
                  <div className="top-2 left-2 bg-white w-fit text-black text-xs font-bold px-2 py-1 rounded">
                    Promo
                  </div>
                  {/* Card Content */}
                  <div className="p-1">
                    <h2 className="text-xl font-bold">{card.title}</h2>
                    <p className="text-sm mt-2">{card.details}</p>
                  </div>
                </div>
                <div className="relative border p-2 hover:bg-[#1e3a4a] rounded border-white w-fit cursor-pointer">
                  <button className="text-white rounded">Play Now</button>
                </div>
              </div>

              {/* Card Image */}
              <div className="relative p-2 h-full">
                <img src={card.image} alt={card.title} className="h-full w-fit object-cover" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination */}
      <div className="custom-pagination flex justify-center mt-4"></div>
      
      {/* Full-width Search Input */}
      <div className="mt-8 w-full">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search games..." 
            className="w-full py-3 px-4 bg-[rgb(33,55,67)] text-white border-[3px] border-[rgb(33,55,67)] rounded-lg focus:outline-none focus:border-[#1e3a4a] transition-colors"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
        {/* Trending Games Section */}
        <InhouseGames />

        <BetsLogSection />

    </div>
  );
}

export default CasinoHome;
