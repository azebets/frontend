<script>
import { HandleDicePoint, betPosition, dice_history, 
 Handles_alive, HandleHas_won,
 rollunder, flix } from "./store/index";
 import { isLoggin } from "$lib/store/activities";
import HistoryDetails from "./componets/historyDetails.svelte";
import { soundManager , soundHandler, payout, range} from "$lib/games/ClassicDice/store/index";

$: rangeEl = 50
$:{
    if($range < 0){
        range.set(2)
    }
    if($range > 98){
        range.set(98)
    }
    betPosition.set($range)
    flix.set(rangeEl)
}

$: ishover = false
const handleRangl = ((w)=>{
    if(w === 1){
        ishover = true
    }else{
        ishover = false
    }
})

let houseEgde = 1
let game__charges = 100 / houseEgde
let game_logic;
let total_charge;

$: {
    if($rollunder){
        game_logic =  100 / ($betPosition)
        total_charge = game_logic / game__charges
        payout.set((game_logic - total_charge).toFixed(4))
    }else{
        game_logic =  100 / (100 - $betPosition)
        total_charge = game_logic / game__charges
        payout.set((game_logic - total_charge).toFixed(4))
    }
}

$: {
    if($rollunder){
        game_logic = 100 / $payout
        total_charge = game_logic / game__charges
        betPosition.set((game_logic - total_charge).toFixed(2))
        range.set($betPosition)
    }else{
        game_logic = 100 / $payout
        total_charge = game_logic / game__charges
        betPosition.set((game_logic - total_charge).toFixed(2))
        range.set(100 - $betPosition)
    }
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

const handleChange = ((e)=>{
    let sound = $soundManager.audioMap.bet
    $soundManager.Play(sound, $soundHandler);
    range.set(e)
    let re = 100 - $range
    rangeEl = 100 - $range
})

$:{
    if($betPosition < 0){
        $betPosition = 2
    }
    if($payout > 9900){
        $payout = 98
    }
    if($payout < 1.0102){
        $payout = 1.0102
    }
}

const handleRollUnder = ()=>{
    if($rollunder){
        rollunder.set(false)
        range.set(100 - $betPosition)
    }else{
        rollunder.set(true)
        range.set($betPosition)
    }
}


</script>

{#if hisQQ}
    <HistoryDetails on:close={handleDiceHistoryDetail} DgII={DgII} />
{/if}

<div class="game-view">
    <div class="sc-hoHwyw fIoiVG game-recent ">
        <div class="recent-list-wrap">
            {#if $isLoggin}
                {#if $dice_history.length !== 0}
                <div class="recent-list" style={`width: ${ 700 ? 160 : 100}%; transform: translate(0%, 0px);`} >
                {#each $dice_history.slice(0,15) as  dice} 
                    <button  on:click={()=> handleDiceHistoryDetail(dice)} class="recent-item" style={`width: ${ 700 ? 90 : 50}px;`}>
                        <div class={`item-wrap ${dice.has_won ? "is-win" : "is-lose"} `}>{(parseFloat(dice.cashout)).toFixed(2)}</div>
                    </button>
                {/each}
                </div> 
                {:else}
                <div class="empty-item">
                    <p>Game results will be displayed here.</p>
                </div>
                {/if}
                {:else}
                <div class="empty-item">
                    <p>Game results will be displayed here.</p>
                </div>
            {/if}
        </div>
    </div>

    <div class="sc-hcupDf dqwCNK game-box sc-jwQYvw fPOXr">
        <div class="sc-gLDmcm gnjHQb">
            <span>House Edge 1%</span>
        </div>

        <div class="game-slider ">
            <div class="slider-wrapper">
                <div class="slider-handles">
                    {#if ishover}
                        <div class="slider-tip" style={`left: ${ $rollunder ? $betPosition - 5 : 100 - $betPosition - 5 }%;`}>{(parseFloat($range)).toFixed(0)}</div>
                    {/if}
                    <input disabled={$Handles_alive} type="range" on:mouseenter={()=>handleRangl(1)} on:mouseleave={()=>handleRangl(2)} min="2" max="98" step="1" class="drag-block "  on:input={(e)=> handleChange(e.target.value)} bind:value={$range}>
                    <div class="slider-track " style={`transform: translate(${$HandleDicePoint}%, 0px);`}>
                        {#if parseFloat($HandleDicePoint) === 50}
                        <div class="dice_num ">{(parseFloat($HandleDicePoint)).toFixed(2)}</div>
                        {:else}
                            <div style={`color: ${$HandleHas_won ? "rgb(67, 179, 9)" : "#fb3d3d"};`} class="dice_num ">{(parseFloat($HandleDicePoint)).toFixed(2)}</div>
                        {/if}
                        <div class={`dice_png ${$HandleHas_won ? "dice-animate" : ""}`}>
                            <img alt="dice.png" src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1721132625/dice_hxmngl.png">
                        </div>
                    </div>
                    <div class="slider-line ">
                        <div class={ $rollunder ? "slide-win" : "slide-lose"} style={`width: ${$rollunder ? $betPosition : 100 - $betPosition }%;`}></div>
                        <div class={$rollunder ? "slide-lose" : "slide-win"} style={`width: ${$rollunder ? 100 - $betPosition : $betPosition}%;`}></div>
                        <div class="slider-sign" style={`transform: translate(${$HandleDicePoint}%, 0px);`}>
                            <div class="sign"></div>
                        </div>
                    </div>
                </div>
                <div class="slider-mark">
                    <span class="mark">0</span>
                    <span class="mark">25</span>
                    <span class="mark">50</span>
                    <span class="mark">75</span>
                    <span class="mark">100</span>
                </div>
            </div>

            <div class="sc-ljMRFG jdrurA">
                <div class="sc-ezbkAF gcQjQT input ">
                    <div class="input-label">Payout</div>
                    <div class="input-control">
                        <input type="number" bind:value={$payout}>
                        <span class="right-info">x</span>
                    </div>
                </div>
                <div class="sc-ezbkAF gcQjQT input roll-switch">
                    <div class="input-label">{ $rollunder ? "Roll Under" : "Roll Over"}</div>
                    <button on:click={handleRollUnder} class="input-control">
                        <input type="text" readonly value={ $rollunder ? $betPosition : (parseFloat(100 - $betPosition)).toFixed(2)}>
                        <span class="right-info">
                            <!-- <Icon src={AiOutlineSwap}  size="18"  color="rgb(67, 179, 9)"/> -->
                        </span>
                    </button>
                </div>
                <div class="sc-ezbkAF gcQjQT input win-change">
                    <div class="input-label">Win Chance</div>
                    <div class="input-control">
                        <input type="number" min="2" max="98" bind:value={$betPosition}>
                        <div class="right-info">
                            <span class="right-percent">%</span>
                            <button on:click={()=> range.set(2)} class="amount-scale">Min</button>
                            <button on:click={()=> range.set($range -5)} class="amount-scale">-5</button>
                            <button on:click={()=> range.set($range + 5)}  class="amount-scale">+5</button>
                            <button on:click={()=> range.set(98)} class="amount-scale">Max</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg class="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46"><defs><linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#31343C"></stop><stop offset="100%" stop-color="#1E2024" stop-opacity="0"></stop></linearGradient></defs><g opacity=".899"><path fill="url(#gcardBg)" fill-rule="evenodd" d="M0 0h996L892 46H96z" opacity=".598" transform="rotate(-180 498 23)"></path></g></svg>
    </div>
</div>

<style>
.fPOXr {
    flex: 1 1 0%;
    background: url(../../images/gameIcons/bg80.png) center center / cover no-repeat;
}
</style>