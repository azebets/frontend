import React from 'react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // Import Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import {slotsGames} from "../../assets"

export default function GameList() {
  return (
    <>
      <div className="css-1y4j81h" style={{marginBottom: "3.5px"}}>
    <div className="css-1lvctvs" style={{marginRight: "auto"}}>
    <div className="css-mpgbkp">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" size="13" top="-0.5" className="css-1kv5tu">
                <path d="m4.35514362 7.92721639c2.91007931-.66629828 4.44813965.97471551 4.3508 3.23924141-.10319138 2.4005741-1.94800517 4.3507793-4.3508 4.3507793s-4.2476-1.9502052-4.35079138-4.3507793c-.09733966-2.2645259 1.44072069-3.90553969 4.35079138-3.23924141zm3.6274931-.03738966c.7002931-.54673965 1.73978793-.75768276 3.08639998-.44887414 2.7725328-.63450172 4.237269.92980173 4.1444604 3.08638961-.0978759 2.2882311-1.8562293 4.1461937-4.1444604 4.1461937-.916142.0036007-1.80588854-.3066792-2.52110515-.8792126.48664578-.7831112.76167454-1.6791367.79817931-2.6004155.05232414-1.19472934-.30543448-2.25447245-1.00404483-2.9834759-.11162312-.11570699-.2317701-.22287617-.35942931-.32060517zm.83490862-7.85440862c.10442931-.15480172.62792931.23955.7506138.38031724.0588756.06766806.08845543.1559547.08223101.24543407-.00622442.08947938-.04774312.17282021-.11542067.2316849-.34479483.29998276-.67182931.60468793-.98477759.91256896-.00072241.00424138-.0004431.00841035-.00133103.01265173-.31438621 1.50385.62036379 2.65004483 1.52440694 3.75842586.3211948.3763426.6179392.7728841.8884086 1.18718621-.2941333-.0569208-.5921733-.09136574-.8915362-.10303621-.16120003-.21500862-.33937589-.43396207-.520969-.65664828-.79443965-.97404827-1.67392241-2.05685689-1.73426724-3.43637931-1.36350517 1.49199138-2.35765345 3.05372587-2.94072069 4.61642069-.17046724.02173276-.3431862.04895862-.51909138.08553621-.07228275-.01502241-.14352241-.02697759-.21494827-.03950517.60366552-1.75580517 1.69207758-3.50735862 3.21826034-5.16671035.15308659-.16496947.29482416-.34011798.42423966-.5242431.34505345-.49553104.69266034-.99636724 1.03490172-1.50370345zm.89024483 1.19877069c.30354653-.04891724 2.42520003.09100172 3.35097763.78911724 1.1285879.85105 1.0841086 1.17696897 1.5514758 3.41212414-1.2950707-.22524655-2.3635362-.29004828-3.7597258-1.53043448-.7561583-.67817159-1.17434952-1.65557681-1.14272763-2.6708069z"></path>
            </svg>
        </div>
        <a href="/slots">Slots</a>
        <a href="/slots">
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
                    delay: 22000, // Adjust the delay as needed (milliseconds)
                    disableOnInteraction: false, // Important: Allow swiping without stopping autoplay
                }}
                speed={5200}
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
             {slotsGames.map((game) => (    
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
