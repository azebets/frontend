import React from 'react'

export default function Bets() {
  return (
<div style={{margin: "33.5px 0px 16px"}}>
    <div className="css-bmalp3">
        <div className="css-1lvctvs" style={{marginRight: "auto"}}>
            <div className="css-mpgbkp">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" size="12" className="css-u3qmim">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.94651 5.10258C6.19732 5.04516 6.46666 5.10496 6.66622 5.28325L6.72984 5.34687C6.76301 5.384 6.79208 5.42354 6.81706 5.46493C8.46024 5.16004 9.76296 5.22804 10.7193 5.68084C10.9754 5.54051 11.2032 5.37061 11.4026 5.17113C12.9382 3.63562 11.1536 1.85104 10.0758 1.9242C10.149 0.846428 8.3644 -0.938148 6.82889 0.597369C5.91782 1.50844 5.62369 3.01017 5.94651 5.10258ZM6.91656 5.72406C6.96559 5.97607 6.89452 6.24979 6.70465 6.4543L6.64508 6.51261C6.54295 6.60346 6.42454 6.66553 6.30069 6.69867C6.55134 8.21139 6.49658 9.44697 6.12728 10.4007C6.26987 10.7016 6.45284 10.9637 6.67619 11.1871C8.16806 12.6789 10.0048 10.8421 9.96274 9.76602C11.0389 9.80813 12.8756 7.97133 11.3838 6.47947C10.5006 5.59633 9.01156 5.34452 6.91656 5.72406ZM5.50049 5.368C5.32212 5.56853 5.25469 5.83179 5.29938 6.07576C3.19428 6.46031 1.69881 6.20967 0.812977 5.32383C-0.678888 3.83197 1.15791 1.99518 2.23402 2.03728C2.19191 0.961168 4.02871 -0.875624 5.52057 0.61624C5.71439 0.810057 5.8778 1.03306 6.0108 1.28524C5.5286 2.25842 5.42394 3.56935 5.68477 5.21149C5.64063 5.23934 5.59842 5.27166 5.5588 5.30844L5.50049 5.368ZM6.02573 6.72495C5.85104 6.71236 5.68106 6.64395 5.54467 6.5193L5.49376 6.46839C5.45583 6.42689 5.42311 6.38228 5.39559 6.33538C3.80633 6.6322 2.53468 6.58117 1.58602 6.17155C1.20245 6.33423 0.872896 6.55333 0.597369 6.82886C-0.938148 8.36437 0.846428 10.1489 1.9242 10.0758C1.85104 11.1536 3.63562 12.9381 5.17113 11.4026C6.10704 10.4667 6.3919 8.90749 6.02573 6.72495Z" fill="currentColor"></path>
                </svg>
            </div>
            Bets
        </div>
    </div>
    <div className="css-io63f9">
        <table className="css-wcq858">
            <thead className="css-oe1okv">
                <tr>
                    <th className="css-1d17pqc">
                        <div>Game</div>
                    </th>
                    <th className="css-1d17pqc">
                        <div>Player/Clan</div>
                    </th>
                    <th className="css-1n6eoad">
                        <div>Time</div>
                    </th>
                    <th className="css-1n6eoad">
                        <div>Wager</div>
                    </th>
              
                    <th className="css-1n6eoad">
                        <div>Multiplier</div>
                    </th>
                    <th className="css-1n6eoad">
                        <div>Payout</div>
                    </th>
                </tr>
            </thead>
            <tbody className="css-13107in">
                { [1,2,3,4,5,6,7,8,9,0,91,81,17,16].map((item ) => (
                    <tr className="css-1k5q1yl" key={item}>
                       <td className="css-1oa65f7">
                           <div>
                               <a href="/">
                                   <div className="css-s92gka">
                                       <img className="css-18g7uso" src="assets/games/livecasino1.webp" alt="Roulette 9 – The Club" />
                                   </div>
                               </a>
                               <a href="/" style={{color: "rgb(255, 255, 255)"}}>Roulette 9 – The Club</a>
                           </div>
                       </td>
                       
                       {/* small screen */}
                       <td className="css-1b3rv0c">
                           <div>
                               <div className="css-15m7f2a" size="14">
                                   <div size="21" className="css-1f0zcjv">
                                       <img src="assets/games/livecasino1.webp" alt="" scale="0.72" className="css-10qm6dq" />
                                   </div>
                                   <div className="css-o3tivt" style={{color: "white", fontWeight: "500"}}>Making pro</div>
                               </div>
                           </div>
                       </td>
                       <td className="css-rja9yq" style={{color: "rgb(177, 182, 198)"}}>
                           <div>9s</div>
                       </td>
                       <td className="css-rja9yq" style={{color: "rgb(177, 182, 198)"}}>
                           <div>$20.00</div>
                       </td>
                     
                       <td className="css-rja9yq">
                           <div>
                               <span style={{color: "rgb(177, 182, 198)"}}>0.75x</span>
                           </div>
                       </td>
                       <td className="css-rja9yq">
                           <div>
                                <span style={{color: "rgb(177, 182, 198)"}}>$15.00</span>
                            </div>
                       </td>
                   </tr>
                ))}
            </tbody>
        </table>
      
    </div> 
</div>
  )
}
