<script>
import { dicegameplays } from "../store/index"
import Empty from "../../../empty.svelte";
import HistoryDetails from "./historyDetails.svelte";
$: newItem = []

 $: {
    // $crash_historyEl.sort((a, b) => b._id - a._id);
    newItem =  [...$dicegameplays].reverse()
}

$: DgII = ''
$: hisQQ = false
const handleDiceHistoryDetail = ((data)=>{
    if(hisQQ){
        hisQQ = false
    }else{
        DgII = data
        hisQQ = true
    }
})

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


</script>

{#if hisQQ}
    <HistoryDetails on:close={handleDiceHistoryDetail} DgII={DgII}/> 
{/if}

<div  class="tabs-view" style="transform: none;">
    <div class="sc-eZhRLC iycaRo">
        <table class="sc-gWXbKe iUeetX table is-hover">
            <thead>
                <tr>
                    <th class="num">Bet ID</th>
                    <th class="user">Player</th>
                    <!-- {#if newScreen > 600} -->
                        <th class="time">Time</th>
                    <!-- {/if} -->
                    <!-- {#if newScreen > 360} -->
                        <th class="bet">Bet</th>
                    <!-- {/if} -->
                  
                    <th class="payout">Payout</th>
                    <th class="profit">Profit</th>
                </tr>
            </thead>
            <tbody>
                {#each newItem.slice(0, 20) as dice  }
                <tr  on:click={()=>handleDiceHistoryDetail(dice)}>
                    <td>
                        <button class="hash ellipsis">{dice.bet_id}</button>
                    </td>
                    <td>
                        {#if dice.hidden_from_public }
                            <div class="sc-jUosCB iTDswZ" >
                                <div class="name">Hidden</div>
                            </div>
                            {:else}
                            <a class="sc-jUosCB iTDswZ user-info " href={`?/user/profile/${dice.user_id}`}>
                                <div class="name">{dice.user?.username}</div>
                            </a>
                        {/if}
                    </td>
                    <!-- {#if newScreen > 600} -->
                    <td>{formatTime(dice.time)}</td>
                    <!-- {/if} -->
                    <!-- {#if newScreen > 360} -->
                    <td class="bet">
                        <div class="sc-Galmp erPQzq coin notranslate monospace">
                            <img class="coin-icon" alt="" src={dice.token_img}>
                            <div class="amount">
                                <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span class="suffix">00</span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <!-- {/if} -->
                    {#if !dice.has_won}
                    <td class="payout">0.00×</td>
                    {:else}
                    <td class="payout">{(parseFloat(dice.payout)).toFixed(2)}×</td>
                    {/if}
                    <td class={`profitline ${dice.has_won ? "is-win": "is-lose"} `}>
                        <div class="sc-Galmp erPQzq coin notranslate monospace has-sign">
                            <img class="coin-icon" alt=""  src={dice.token_img}>
                            <div class="amount">
                                {#if !dice.has_won}
                                <span class="amount-str">{(parseFloat(dice.bet_amount)).toFixed(6)}<span class="suffix">00</span></span>
                                {:else}
                                <span class="amount-str">+{(parseFloat(dice.profit)).toFixed(6)}<span class="suffix">00</span></span>
                                {/if}
                            </div>
                        </div>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
        {#if newItem.length === 0}
            <div style="height: 300px; width:100%">
                <Empty size={120}/>
            </div>
        {/if}
    </div>
</div>
