import React, { useState } from 'react'
import { DiceGameContext } from '../Context'

export default function Gameview() {
    const {setRange, range, DiceHistory, betPosition,HandleHas_won, payout, setBetposition, HandleDicePoint} = React.useContext(DiceGameContext)
    const [ishover, setIshover] = useState(false)
   const rollunder = true

    function handleRollUnder(){
        
    }

  return (
    <>
      <div className="game-view">
    <div className="sc-hoHwyw fIoiVG game-recent ">
        <div className="recent-list-wrap">
            {DiceHistory.length ?
                <div className="recent-list" style={{width: `${ 700 ? 160 : 100}%`, transform: `translate(0%, 0px)`}} >
                {DiceHistory?.map((item)=>(
                    <button key={item?._id} className="recent-item" style={{width: `${ 700 ? 90 : 50}px`}}>
                        <div className={`item-wrap ${item.has_won ? "is-win" : "is-lose"} `}>{(parseFloat(item.cashout)).toFixed(2)}</div>
                    </button>
                ))} 
            </div> 
            :
            <div className="empty-item">
                <p>Game results will be displayed here.</p>
            </div>
        }
             
        </div>
    </div>

    <div className="sc-hcupDf dqwCNK game-box sc-jwQYvw fPOXr">
        <div className="sc-gLDmcm gnjHQb">
            <span>House Edge 1%</span>
        </div>

        <div className="game-slider ">
            <div className="slider-wrapper">
                <div className="slider-handles">
                    { ishover && 
                        <div className="slider-tip" style={{left:  `${ rollunder ? betPosition - 5 : 100 - betPosition - 5 }%`}}>{(parseFloat(range)).toFixed(0)}</div>
                    }
                  
                    <input  type="range"  min="2" max="98" step="1" className="drag-block " onMouseLeave={()=> setIshover(false)} onMouseEnter={()=> setIshover(true)}
                     onChange={(e)=> setRange(e.target.value)} value={range} />
                    <div className="slider-track " style={{transform: `translate(${HandleDicePoint}%, 0px)`}}>

                        {parseFloat(HandleDicePoint) === 50  ? <div className="dice_num ">{(parseFloat(HandleDicePoint)).toFixed(2)}</div> :
                            <div style={{color: `${HandleHas_won ? "rgb(67, 179, 9)" : "#fb3d3d"}`}} className="dice_num ">{(parseFloat(HandleDicePoint)).toFixed(2)}</div>
                        }

                 
                        <div className={`dice_png ${HandleHas_won ? "dice-animate" : ""}`}>
                            <img alt="dice.png" src="/assets/games/classic-dice/dice_hxmngl.png" />
                        </div>
                    </div>
                    <div className="slider-line ">
                        <div className={ rollunder ? "slide-win" : "slide-lose"} style={{width: `${rollunder ? betPosition : 100 - betPosition }%`}}></div>
                        <div className={rollunder ? "slide-lose" : "slide-win"} style={{width: `${rollunder ? 100 - betPosition : betPosition}%`}}></div>
                        <div className="slider-sign" style={{transform: `translate(${HandleDicePoint}%, 0px)`}}>
                            <div className="sign"></div>
                        </div>
                    </div>
                </div>
                <div className="slider-mark">
                    <span className="mark">0</span>
                    <span className="mark">25</span>
                    <span className="mark">50</span>
                    <span className="mark">75</span>
                    <span className="mark">100</span>
                </div>
            </div>

            <div className="sc-ljMRFG jdrurA">
                <div className="sc-ezbkAF gcQjQT input ">
                    <div className="input-label">Payout</div>
                    <div className="input-control">
                        <input type="number" readOnly value={payout} />
                        <span className="right-info">x</span>
                    </div>
                </div>
                <div className="sc-ezbkAF gcQjQT input roll-switch">
                    <div className="input-label">{ rollunder ? "Roll Under" : "Roll Over"}</div>
                    <button onClick={handleRollUnder} className="input-control">
                        <input type="text" readOnly value={ rollunder ? betPosition : (parseFloat(100 - betPosition)).toFixed(2)} />
                        <span className="right-info">
                            {/* <!-- <Icon src={AiOutlineSwap}  size="18"  color="rgb(67, 179, 9)"/> --> */}
                        </span>
                    </button>
                </div>
                <div className="sc-ezbkAF gcQjQT input win-change">
                    <div className="input-label">Win Chance</div>
                    <div className="input-control">
                        <input type="number" min="2" max="98" onChange={(e)=> setBetposition(e.target.value)} value={betPosition} />
                        <div className="right-info">
                            <span className="right-percent">%</span>
                            <button onClick={()=> setRange(2)} className="amount-scale">Min</button>
                            <button onClick={()=> setRange(range -5)} className="amount-scale">-5</button>
                            <button onClick={()=> setRange(range + 5)}  className="amount-scale">+5</button>
                            <button onClick={()=> setRange(98)} className="amount-scale">Max</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg className="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46"><defs><linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#31343C"></stop><stop offset="100%" stopColor="#1E2024" stopOpacity="0"></stop></linearGradient></defs><g opacity=".899"><path fill="url(#gcardBg)" fillRule="evenodd" d="M0 0h996L892 46H96z" opacity=".598" transform="rotate(-180 498 23)"></path></g></svg>
    </div>
</div>
    </>
  )
}
