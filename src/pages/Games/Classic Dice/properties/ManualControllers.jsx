import React, { useState } from 'react'
import { DiceGameContext } from '../Context'
import { AppContext } from '../../../../context/AppContext'

export default function ManualControllers() {
    const {betamount, setBetamount, multiplyBetamount,payout,setWalletRange,handleRollSubmit, handleWalletRange,
         divideBetAmount, walletRange} = React.useContext(DiceGameContext)
      const {activeWallet} = React.useContext(AppContext)
   
    const [max_profit_tips, setMax_profit_tips] = React.useState(false)
    const [is_min_max, setIs_min_max] = React.useState(false)

    const handleRangeSTlop = ()=> {}
   
  return (
    <>
      
<div className="game-control-panel">
  <div className="sc-juEPzu lgTgT">
    <div className="sc-ezbkAF gcQjQT input sc-fvxzrP gOLODp sc-gsFzgR fCSgTW game-coininput">
      <div className="input-label">
        <div className="sc-hmvnCu efWjNZ label">
          <div>Amount</div>
          <div className="max-profit">
            {max_profit_tips &&  
            <div className="tip">
                <span className="tit">Max Profit:&nbsp;</span>
                <div className="sc-Galmp erPQzq coin notranslate">
                  <div className="amount">
                    <span className="amount-str"
                      >5000.<span className="suffix">00</span>
                    </span>
                  </div>
                </div>
              </div>}
          </div>
        </div>
        {/* <!-- <div className="label-amount">0 USD</div> --> */}
      </div>
      <div className="input-control">
        <input type="number" onChange={(e)=> setBetamount(e.target.value)} placeholder='0 - 5000' value={betamount} />
          {activeWallet?.coin_image && <img className="coin-icon" alt="" src={activeWallet?.coin_image} />}
        <div className="sc-kDTinF bswIvI button-group">
          <button onClick={divideBetAmount}>/2</button>
          <button onClick={multiplyBetamount}>x2</button>
          { is_min_max &&
            <div className="fix-layer" style={{opacity: 1, transform: "none"}}>
            <button onClick={()=> setWalletRange(0)} className="">Min</button >
            <div className="sc-kLwhqv eOA-dmL slider">
              <div  className="slider-after" style={{transform: "scaleX(100.001001)"}}></div>
              <input type="range" className="drag-block" value={walletRange} onChange={(e)=> handleWalletRange(e.target.value)} />
              <div className="slider-before" style={{transform: "scaleX(100.998999)"}}></div>
            </div>
            <button onClick={()=> setWalletRange(100)} className="">Max</button>
          </div>
          }
          
          <button onClick={()=> setIs_min_max(!is_min_max)} className="sc-cAhXWc cMPLfC">
            <svg xmlns="http://www.w3.org/2000/svg" className="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" dataname="Layer 2"><g id="Layer_1-2" dataname="Layer 1"><polygon className="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" dataname="Layer 2"><g id="Layer_1-2" dataname="Layer 1"><polygon className="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
          </button>
        </div>
      </div>
    </div>
    <div className="sc-ezbkAF gWrsXy input sc-fvxzrP gOLODp" disabled="">
      <div className="input-label">
        Win Amount
        {/* <!-- <div className="label-amount">0 USD</div> --> */}
      </div>
      <div className="input-control">
        <input type="number" readOnly value={((payout * betamount).toFixed(7)) || 0} />
        {activeWallet?.coin_image && <img className="coin-icon" alt="" src={activeWallet?.coin_image} />}
      </div>
    </div>
    <button disabled={!betamount} onClick={handleRollSubmit} className="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button">
        <div className="button-inner">
            Roll Now 
        </div>
    </button>
  </div>
</div>

    </>
  )
}
