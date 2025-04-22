import React from 'react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // Import Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import {showGame} from "../../assets"

export default function GameList() {
  return (
    <>
    <div className="css-1y4j81h" style={{marginBottom: "3.5px"}}>
        <div className="css-1lvctvs" style={{marginRight: "auto"}}>
        <div className="css-mpgbkp">
            <svg xmlns="http://www.w3.org/2000/svg" className="css-1xnqux5" viewBox="0 0 55.71 40"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M26.38,3.89a13.91,13.91,0,0,0,3.91-2A22.08,22.08,0,0,1,32.63.51,19.58,19.58,0,0,0,22,1C22.75,2.21,24.36,4.43,26.38,3.89Z"/><path className="cls-1" d="M54.49,29.16c.87-1.52,1.73-3.55.85-4.58-1.51-1.76-7.55-.8-12.51,1.14a75.35,75.35,0,0,0-11,5.81c-5.17,3.09-10.49,6.26-16.59,7.85A92.66,92.66,0,0,0,26.58,40C42.17,40,50,37,54.49,29.16Z"/><path className="cls-1" d="M11.32,26.38A11.18,11.18,0,0,0,2.07,27a3.84,3.84,0,0,0-2,2.65A5.87,5.87,0,0,0,1.6,34.34c1.74,1.91,4.89,3.36,9.32,4.31,5.67-.7,10.65-3,15.38-5.65a25.74,25.74,0,0,1-14.22-4.12l-.45,1.31a.76.76,0,1,1-1.44-.49Z"/><path className="cls-1" d="M13,26.19h0l-.4,1.19a24.88,24.88,0,0,0,16.47,4h.07l1.91-1.14a92.13,92.13,0,0,1,9.44-5.17L34.78,1.39a10.38,10.38,0,0,0-3.66,1.78,15.07,15.07,0,0,1-4.35,2.19,3.82,3.82,0,0,1-1,.14c-2.11,0-3.69-1.74-4.6-3.09Z"/></g></g></svg>
        </div>
        <a href="/show-games">Show Games</a>
        <a href="/show-games">
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
                        delay: 12000, // Adjust the delay as needed (milliseconds)
                        disableOnInteraction: false, // Important: Allow swiping without stopping autoplay
                    }}
                    speed={6200}
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
                {showGame.map((game) => (    
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
