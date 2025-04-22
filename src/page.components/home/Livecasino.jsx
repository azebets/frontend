import React from 'react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // Import Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import {liveCasino} from "../../assets"

export default function GameList() {
  return (
    <>
        <div className="css-1y4j81h" style={{marginBottom: "3.5px"}}>
            <div className="css-1lvctvs" style={{marginRight: "auto"}}>
                <div className="css-mpgbkp">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" size="17" className="css-1xnqux5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.14769 0.802287L3.20448 3.8461C2.62026 4.1453 2.39883 4.84306 2.71 5.40486L7.30028 13.6922C7.61137 14.2538 8.33725 14.4668 8.92148 14.1676L14.8647 11.1238C15.4491 10.8245 15.6703 10.1264 15.3592 9.56476L10.769 1.27747C10.4578 0.715676 9.73207 0.502998 9.14769 0.802287ZM8.88913 4.8825C8.16079 4.76875 7.39137 4.39657 7.21952 4.20203C7.28436 4.45419 7.16379 5.2997 6.85207 5.96733C6.76616 6.15156 6.64572 6.34123 6.5202 6.5389L6.52019 6.5389C6.14743 7.12593 5.72985 7.78353 6.03852 8.57891C6.66392 10.1905 9.08587 9.6465 9.12677 8.04029C9.41181 8.67186 9.6997 9.87362 8.52883 10.9857C8.52529 10.989 8.52192 10.9924 8.51859 10.9958C8.51669 10.9978 8.5148 10.9997 8.51291 11.0017L8.5129 11.0017C8.507 11.0079 8.50106 11.014 8.4944 11.0202L8.58087 10.9742L12.0805 9.11002L12.138 9.07941C12.138 9.07941 12.1244 9.08252 12.1051 9.08643C11.8781 9.13358 10.4039 9.37221 9.34037 7.92655C10.6959 8.78908 12.4991 7.08303 11.5107 5.66472C11.0228 4.96472 10.244 4.94428 9.54865 4.92603C9.31458 4.91989 9.08998 4.91399 8.88913 4.8825ZM15.259 11.858L15.3208 11.8264C15.3437 11.8147 15.3646 11.8009 15.3856 11.7871C15.394 11.7815 15.4025 11.7759 15.4111 11.7705L15.4133 11.7691C15.4225 11.7632 15.432 11.7576 15.4416 11.752C15.457 11.7429 15.4725 11.7338 15.4869 11.7235C15.5101 11.881 15.5021 12.0359 15.4666 12.1828C15.3842 12.3868 15.2464 12.5738 15.0537 12.7184L14.5307 13.111L9.26062 17.0668C8.69121 17.4942 7.86893 17.3973 7.42389 16.8503L0.777643 8.67764C0.332424 8.13037 0.433542 7.34046 1.00287 6.91292L2.25935 5.96973L6.85159 14.2531C7.30571 15.0722 8.36897 15.3836 9.22156 14.9473L9.22381 14.9462L11.8232 13.6161L15.2566 11.8593L15.259 11.858Z" fill="currentColor"></path>
                    </svg>
                </div>
                <a href="/live-casino">Live Casino</a>
                <a href="/live-casino">
                    <div className="css-h1pfxx">View All</div>
                </a>
            </div>
        </div>
        <div className="css-13107in">
            <div className="css-9vwzbp">
                <div style={{position: "relative",width:"100%", height: "220px", overflow: "auto", willChange: "transform", direction: "ltr"}}>
                    <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events sc-bOTDDd fiiKfw">
                    <Swiper
                        loop={true}
                        modules={[Autoplay]}
                        spaceBetween={15} // Add some space to see transitions better
                        slidesPerView={5} // Start with one slide visible
                        autoplay={{
                            delay: 8000, // Adjust the delay as needed (milliseconds)
                            disableOnInteraction: false, // Important: Allow swiping without stopping autoplay
                        }}
                        speed={3200}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            390: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // Optional: Responsive breakpoints
                            520: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                            },
                            688: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            },
                            1100: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                            },
                            1111: {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                            1264: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                            },
                        }}
                    >
                    {liveCasino.map((game) => (    
                        <SwiperSlide key={game.img}>
                            <div onClick={()=> goto(game.link)} className="swiper-slide css-vugqe6" >
                                <div style={{paddingTop: "10px"}}>
                                    <div className="css-d6icxj">
                                        <img className="css-nyormw" src={game.img} alt="Mines" />
                                        <div className="css-1agvln2" style={{display: "none", background: "rgba(39, 43, 56, 0.95)"}}>
                                            <div className="css-199grsv">Challenge Pool</div>
                                            <div className="css-peshd1">$944.33</div>
                                            <div className="css-199grsv">Effective RTP</div>
                                            <div className="css-peshd1">99.20%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>   
                        ))}
                    </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
