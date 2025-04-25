import React, { useEffect, useState } from 'react'
import { DiceGameContext } from '../Context'
import Empty from "../../../../components/Empty"
export default function Mybets() {
    const { DiceHistory } = React.useContext(DiceGameContext)
    const [newList, setNewList] = useState([])
    useEffect(()=>{
        setNewList([...DiceHistory].reverse())
    },[DiceHistory])

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
  return (
    <>
      <div id="main" className="tabs-view" style={{transform: "none"}}>
        <div className="sc-eZhRLC iycaRo">
            {newList.length ? 
            <table className="sc-gWXbKe iUeetX table is-hover">
            <thead>
                <tr>
                    <th className="num">Bet ID</th>
                    <th className="time">Time</th>
                    <th className="bet">Bet</th>
                    <th className="payout">Payout</th>
                    <th className="profit">Profit</th>
                </tr>
            </thead>
            <tbody>
                {newList.map((dice)=>(
                      <tr key={dice.time}>
                        <td>
                            <button  className="hash ellipsis">{dice.bet_id}</button>
                        </td>
                      <td>{formatTime(dice.time)}</td>
                    
                          <td className="bet">
                              <div className="sc-Galmp erPQzq coin notranslate monospace">
                                  <img className="coin-icon" alt="" src={dice.token_img} />
                                  <div className="amount">
                                      <span className="amount-str">{(parseFloat(dice.bet_amount)).toFixed(4)}<span className="suffix">00</span>
                                      </span>
                                  </div>
                              </div>
                          </td>
                      { dice.has_won ? <td className="payout">{(parseFloat(dice.payout)).toFixed(2)}×</td> : <td className="payout">0.00×</td>}
                      <td className={`profitline ${dice.has_won ? "is-win" : "is-lose" } `}>
                          <div className="sc-Galmp erPQzq coin notranslate monospace has-sign">
                              <img className="coin-icon" alt="" src={dice.token_img} />
                              <div className="amount">
                                  { dice.has_won ?
                                      <span className="amount-str">+{(parseFloat(dice.profit)).toFixed(6)}<span className="suffix">00</span>
                                  </span>
                                  : 
                                  <span className="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span className="suffix">00</span>
                                  </span>
                                  }
                              </div>
                          </div>
                      </td>
                  </tr>
                )) }
                {/* {#if $user.user_id === dice.user_id}
                <tr on:click={()=> handleDiceHistoryDetail(dice)}>
                    <td>
                        <button  className="hash ellipsis">{dice.bet_id}</button>
                    </td>
                    <!-- {#if newScreen > 600} -->
                    <td>{formatTime(dice.time)}</td>
                    <!-- {/if} -->
                    <!-- {#if newScreen > 400} -->
                        <td className="bet">
                            <div className="sc-Galmp erPQzq coin notranslate monospace">
                                <img className="coin-icon" alt="" src={dice.token_img}>
                                <div className="amount">
                                    <span className="amount-str">{(parseFloat(dice.bet_amount)).toFixed(4)}<span className="suffix">00</span>
                                    </span>
                                </div>
                            </div>
                        </td>
                    <!-- {/if} -->
            
                    {#if dice.has_won}
                    <td className="payout">{(parseFloat(dice.payout)).toFixed(2)}×</td>
                    {:else}
                    <td className="payout">0.00×</td>
                    {/if}
                    <td className={`profitline ${dice.has_won ? "is-win" : "is-lose" } `}>
                        <div className="sc-Galmp erPQzq coin notranslate monospace has-sign">
                            <img className="coin-icon" alt="" src={dice.token_img}>
                            <div className="amount">
                                {#if dice.has_won}
                                <span className="amount-str">+{(parseFloat(dice.profit)).toFixed(6)}<span className="suffix">00</span>
                                </span>
                                {:else}
                                <span className="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span className="suffix">00</span>
                                </span>
                                {/if}
                            </div>
                        </div>
                    </td>
                </tr>
                {/if}
                {/each} */}
            </tbody>
        </table> : 
            <div style={{height: "300px", width:"100"}}>
                <Empty size={120}/>
            </div>
        }
            
        </div>
    </div>
    </>
  )
}
