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
      <div id="main" class="tabs-view" style={{transform: "none"}}>
        <div class="sc-eZhRLC iycaRo">
            {newList.length ? 
            <table class="sc-gWXbKe iUeetX table is-hover">
            <thead>
                <tr>
                    <th class="num">Bet ID</th>
                    <th class="time">Time</th>
                    <th class="bet">Bet</th>
                    <th class="payout">Payout</th>
                    <th class="profit">Profit</th>
                </tr>
            </thead>
            <tbody>
                {newList.map((dice)=>(
                      <tr>
                        <td>
                            <button  class="hash ellipsis">{dice.bet_id}</button>
                        </td>
                      <td>{formatTime(dice.time)}</td>
                    
                          <td class="bet">
                              <div class="sc-Galmp erPQzq coin notranslate monospace">
                                  <img class="coin-icon" alt="" src={dice.token_img} />
                                  <div class="amount">
                                      <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(4)}<span class="suffix">00</span>
                                      </span>
                                  </div>
                              </div>
                          </td>
                      { dice.has_won ? <td class="payout">{(parseFloat(dice.payout)).toFixed(2)}×</td> : <td class="payout">0.00×</td>}
                      <td class={`profitline ${dice.has_won ? "is-win" : "is-lose" } `}>
                          <div class="sc-Galmp erPQzq coin notranslate monospace has-sign">
                              <img class="coin-icon" alt="" src={dice.token_img} />
                              <div class="amount">
                                  { dice.has_won ?
                                      <span class="amount-str">+{(parseFloat(dice.profit)).toFixed(6)}<span class="suffix">00</span>
                                  </span>
                                  : 
                                  <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span class="suffix">00</span>
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
                        <button  class="hash ellipsis">{dice.bet_id}</button>
                    </td>
                    <!-- {#if newScreen > 600} -->
                    <td>{formatTime(dice.time)}</td>
                    <!-- {/if} -->
                    <!-- {#if newScreen > 400} -->
                        <td class="bet">
                            <div class="sc-Galmp erPQzq coin notranslate monospace">
                                <img class="coin-icon" alt="" src={dice.token_img}>
                                <div class="amount">
                                    <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(4)}<span class="suffix">00</span>
                                    </span>
                                </div>
                            </div>
                        </td>
                    <!-- {/if} -->
            
                    {#if dice.has_won}
                    <td class="payout">{(parseFloat(dice.payout)).toFixed(2)}×</td>
                    {:else}
                    <td class="payout">0.00×</td>
                    {/if}
                    <td class={`profitline ${dice.has_won ? "is-win" : "is-lose" } `}>
                        <div class="sc-Galmp erPQzq coin notranslate monospace has-sign">
                            <img class="coin-icon" alt="" src={dice.token_img}>
                            <div class="amount">
                                {#if dice.has_won}
                                <span class="amount-str">+{(parseFloat(dice.profit)).toFixed(6)}<span class="suffix">00</span>
                                </span>
                                {:else}
                                <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span class="suffix">00</span>
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
