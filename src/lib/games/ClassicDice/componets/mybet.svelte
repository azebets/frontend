<script>
import { user } from "$lib/store/profile"
import Empty from "../../../empty.svelte";
import { dice_history } from '$lib/games/ClassicDice/store/index';
import HistoryDetails from "./historyDetails.svelte";
$: newItem =  [...$dice_history].reverse()

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

<div id="main" class="tabs-view" style="transform: none;">
    <div class="sc-eZhRLC iycaRo">
        <table class="sc-gWXbKe iUeetX table is-hover">
            <thead>
                <tr>
                    <th class="num">Bet ID</th>
                    <!-- {#if newScreen > 600} -->
                        <th class="time">Time</th>
                    <!-- {/if} -->
                    <!-- {#if newScreen > 400} -->
                    <th class="bet">Bet</th>
                    <!-- {/if} -->
                    <th class="payout">Payout</th>
                    <th class="profit">Profit</th>
                </tr>
            </thead>
            <tbody>
                {#each newItem.slice(0, 15) as dice }
                {#if $user.user_id === dice.user_id}
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

<style>

</style>
