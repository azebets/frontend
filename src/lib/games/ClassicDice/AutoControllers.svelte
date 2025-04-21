<script>
import { goto } from "$app/navigation";
import { url } from "$lib/store/routes";
import { default_Wallet } from '$lib/store/coins';
import {handleSocketConnection} from "$lib/socket/index";
import { user } from "$lib/store/profile";
import { isLoggin , handleResposeMessages} from "$lib/store/activities";
import { DiceBet } from "$lib/gameAPIs/dice";
import { handleAuthToken } from "$lib/store/routes";
import { soundManager, turboManager, payout, betPosition, soundHandler, DiceEncription} from "$lib/games/ClassicDice/store/index";
import { dice_history, handlediceAutoInput,Handles_alive,handleOnLose,
 winning_track,losing_track,Autopre_bal, handleStopOnLose,HandleHas_won,
handleStopOnwin, handleOnwin, rollunder } from "../ClassicDice/store/index";

import { onMount } from "svelte";
$: default_coins = "https://res.cloudinary.com/dxwhz3r81/image/upload/v1721026026/USD_Coin_-_Green_ai65gw.png"
$: bet_amount = 0;
$: demo_wallet = "Fun Coupons";
$: demo_minebet = 100
$: demo_maxWallet = 10000
$: USD_min = 0.2
$: USD_max = 2000
$: aval_bal = parseFloat($default_Wallet?.balance) || 100


let is_min_max = false
const handleMinMax = (()=>{
   is_min_max = !is_min_max
})

let wining_amount = '' ;
let walletRange = 0
let x = 0;
onMount(()=>{
    if ($default_Wallet?.coin_name === demo_wallet) {
       handlediceAutoInput.set((100.0000).toFixed(7));
    }else{
       handlediceAutoInput.set((0.004).toFixed(7));
    }
})

$:{
    wining_amount = ($handlediceAutoInput * $payout).toFixed(4)
}

$: bet_number = 0
$: on_win = false
$: onWinEl = 0
$: on_lose = false
$: onLoseEl = 0

$: stopOnwin = 0
$: stopOnlose = 0

$: is_Looping = false
$: yu = ""
$: turbo = $turboManager ? 400 : 1000


const dive = (()=>{
    handlediceAutoInput.set(($handlediceAutoInput / 2).toFixed(4))
})

const handleRangeSTlop = ((eui)=>{
    handlediceAutoInput.set((parseFloat($default_Wallet.balance)  * (walletRange / 100 )).toFixed(4))
})

const mult = (()=>{
    handlediceAutoInput.set(($handlediceAutoInput * 2).toFixed(4))
})

let prev_bal;
const handlePreBetamout = ((event)=>{
   return prev_bal
})

const handleErrors = ((message)=>{
    if(message){
        handleResposeMessages("error", message)
    }
  is_Looping = false
  clearInterval(yu) 
  Handles_alive.set(false)
  let s = handlePreBetamout()
  handlediceAutoInput.set((parseFloat(s)).toFixed(5))
})

let lose_track = 0
let bet_num_count = 1
let load = false
const handleAutoStart = (()=>{
    if(!$isLoggin){
        goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=login`)
        return 
    }
    if(!is_Looping){
        prev_bal = $handlediceAutoInput
        Autopre_bal.set(prev_bal)
        is_Looping = true
        yu = setInterval(()=>{
        if(parseFloat($handlediceAutoInput) > parseFloat($default_Wallet.balance)){
            handleErrors("Insufficient balance")
        }
    else{
            if(bet_number){
                if(bet_number < bet_num_count){
                    bet_num_count = 1
                    handleErrors()
                }
                else{
                    handleRollSubmit()
                    bet_num_count += 1
                }
            } 
           else if($handleStopOnwin){
                if($winning_track >= $handleStopOnwin ){
                    handleErrors()  
                    winning_track.set(0)
                    handleStopOnwin.set(0)
                }else{
                    handleRollSubmit()
                }
            }
            else if($handleStopOnLose){
                if(onLoseEl >= $handleStopOnLose ){
                    handleErrors() 
                    losing_track.set(0)
                    handleStopOnLose.set(0)
                }else{
                    handleRollSubmit()
                }
            }
            else{
                handleRollSubmit()
            }
        }
        }, turbo)
    }else{
        is_Looping = false
        clearInterval(yu)
        let s = handlePreBetamout()
        Handles_alive.set(false)
        handlediceAutoInput.set((parseFloat(s)).toFixed(5))
    }
})


$: non = 1
const handleRollSubmit = (async()=>{
    let sound = $soundManager.audioMap.bet
    let winSound = $soundManager.audioMap.win
     $soundManager.Play(sound, $soundHandler);
     Handles_alive.set(true)
    if($isLoggin){
        if(aval_bal <= 0){
            handleErrors("Insufficient balance")
        }
        if(parseFloat($handlediceAutoInput) > aval_bal){
            handleErrors("Insufficient balance")
        }
        else if(parseFloat($handlediceAutoInput) > demo_maxWallet && $default_Wallet.coin_name !== demo_wallet){
            handleErrors(`Maximum bet amount for USD is ${USD_max} `)
        }
        else if( parseFloat($handlediceAutoInput) > demo_maxWallet && $default_Wallet.coin_name === demo_wallet){
            handleErrors(`Maximum bet amount for ${demo_wallet} ${demo_maxWallet} `)
        }
        else if( parseFloat($handlediceAutoInput) < demo_minebet && $default_Wallet.coin_name === demo_wallet){
            handleErrors(`Maximum bet amount for ${demo_wallet} ${demo_minebet} `)
        }
        else if( parseFloat($handlediceAutoInput) < USD_min && $default_Wallet.coin_name !== demo_wallet){
            handleErrors(`Maximum bet amount for USD is ${USD_min} `)
        }
        else{
            let data = {
                user: $user,
                server_seed: $DiceEncription.server_seed,
                client_seed: $DiceEncription.client_seed,
                hash_seed: $DiceEncription.hash_seed,
                nonce:$DiceEncription.nonce + non,
                bet_amount:  parseFloat($handlediceAutoInput),
                prev_bal: parseFloat($default_Wallet.balance),
                token_img: $default_Wallet.coin_image, 
                token: $default_Wallet.coin_name ,
                chance: $rollunder ? parseFloat($betPosition).toFixed(2) : 100 - parseFloat($betPosition).toFixed(2) ,
                payout: parseFloat($payout),
                time: new Date(),
                is_roll_under:$rollunder,
                wining_amount: parseFloat(wining_amount) - parseFloat($handlediceAutoInput)
            }
            non += 1
           const respnse = await DiceBet(data, $handleAuthToken)
           const { handleDicebet } = await handleSocketConnection()
           await handleDicebet(respnse)
           if(respnse.has_won){
            winning_track.set($winning_track += parseFloat(respnse.profit))
                if($handleOnwin){
                    let to = (($handleOnwin/100) * parseFloat($handlediceAutoInput)/1)
                    let from = (to + parseFloat($handlediceAutoInput)).toFixed(4)
                    handlediceAutoInput.set(from)
                }
                if($handleOnLose){
                    handlediceAutoInput.set($Autopre_bal)
                }
                $soundManager.Play(winSound, $soundHandler);
                HandleHas_won.set(true)
            }
            else{
                onLoseEl = onLoseEl += parseFloat(respnse.bet_amount)
                if($handleOnLose){
                    let to = (($handleOnLose / 100) * parseFloat($handlediceAutoInput)/1)
                    let from = (to + parseFloat($handlediceAutoInput)).toFixed(4)
                    handlediceAutoInput.set(from)
                }
                HandleHas_won.set(false)
            }
            if($dice_history.length <= 14){
                dice_history.set([...$dice_history, respnse])
            }else{
                $dice_history.shift()
                dice_history.set([...$dice_history, respnse])
            }
       
        }
    }else{
        goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=login`)
        clearInterval(yu)
        is_Looping = false
    }
})

const handlesjen = ((e)=>{
    handlediceAutoInput.set((parseFloat($default_Wallet.balance)  * (e / 100 )).toFixed(4))
    walletRange = e
})


</script>

<div class="game-control-panel">
    <div class="sc-gFSQbh hRGEiw">
        <div class="sc-ezbkAF gcQjQT input sc-fvxzrP gOLODp sc-gsFzgR fCSgTW game-coininput">
            <div class="input-label">
                <div class="sc-hmvnCu efWjNZ label">
                    <div>Amount</div>
                    <div class="max-profit">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Inform"></use>
                        </svg>
                        <div class="tip">
                            <span class="tit">Max Profit:&nbsp;</span>
                            <div class="sc-Galmp erPQzq coin notranslate">
                                <div class="amount">
                                    <span class="amount-str">5000.
                                        <span class="suffix">00000</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="label-amount">0 USD</div>
            </div>
            <div class="input-control">
                <input disabled={$Handles_alive} type="number" bind:value={$handlediceAutoInput}>
                   <img class="coin-icon" alt="" src={$isLoggin ? $default_Wallet.coin_image : default_coins}>
                <div class="sc-kDTinF bswIvI button-group">
                    <button disabled={$Handles_alive} on:click={()=> dive() }>/2</button>
                    <button disabled={$Handles_alive} on:click={()=> mult() }>x2</button>
                    {#if is_min_max }
                     <div class="fix-layer" style="opacity: 1; transform: none;">
                        <button disabled={$Handles_alive} on:click={()=>  handlesjen(0) } style={`${walletRange === 0 ? `color:#ffff;` : ""}`} class="">Min</button>
                        <div class="sc-kLwhqv eOA-dmL slider">
                           <div class="slider-after" style="transform: scaleX(100.001001);"></div>
                             <input disabled={$Handles_alive} type="range" class="drag-block" on:input={(e)=> handleRangeSTlop(e.target.value)} bind:value={walletRange}>
                           <div class="slider-before" style="transform: scaleX(100.998999);"></div>
                        </div>
                        <button disabled={$Handles_alive} on:click={()=> handlesjen(100)} style={`${walletRange === 100 ? `color:#ffff;` : ""}`} class="">Max</button>
                     </div>
                    {/if}

                    <button disabled={$Handles_alive} on:click={handleMinMax} class="sc-cAhXWc cMPLfC">
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="sc-ezbkAF hzTJOu input ">
            <div class="input-label">Number of Bets</div>
            <div class="input-control">
                <input type="number" disabled={$Handles_alive} bind:value={bet_number}>
                <div class={`sc-kDTinF bswIvI button-group`}>
                    <button disabled={$Handles_alive} on:click={()=> bet_number = 0}>∞</button>
                    <button disabled={$Handles_alive} on:click={()=> bet_number = 10}>10</button>
                    <button disabled={$Handles_alive} on:click={()=> bet_number = 100}>100</button>
                </div>
            </div>
        </div>

        <div class="sc-ezbkAF hzTJOu input sc-gqtqkP cTKsPy">
            <div class="input-label">On win</div>
            <div class="input-control">
                <input type="number" disabled={$Handles_alive} readonly={!on_win} bind:value={$handleOnwin}>
                <div class={`sc-cxVPaa ${on_win ? "kvRMBr" : "eIHoct"}  increase-switch`}>
                    <button disabled={$Handles_alive} on:click={()=> on_win = !on_win} class="dot-wrap">
                        <div  class="dot"></div>
                    </button>
                    <div class="reset text">Reset</div>
                    <div class="increse text">Increase by</div>
                </div>
                <div class="percent">%</div>
            </div>
        </div>

        <div class="sc-ezbkAF hzTJOu input sc-fvxzrP gOLODp">
            <div class="input-label">
                Stop on win<div class="label-amount">0 USD</div>
            </div>
            <div class="input-control">
                <input type="number" disabled={$Handles_alive} bind:value={$handleStopOnwin}>
                <img class="coin-icon" alt="" src={$isLoggin ? $default_Wallet.coin_image : default_coins}>
            </div>
        </div>

        <div class="sc-ezbkAF hzTJOu input sc-gqtqkP cTKsPy">
            <div class="input-label">On lose</div>
            <div class="input-control">
                <input type="number" readonly={!on_lose} bind:value={$handleOnLose}>
                <div class={`sc-cxVPaa ${on_lose ? "kvRMBr"  : "eIHoct"}  increase-switch`}>
                    <button on:click={()=> on_lose = !on_lose}  class="dot-wrap">
                        <div class="dot"></div>
                    </button>
                    <div class="reset text">Reset</div>
                    <div class="increse text">Increase by</div>
                </div>
                <div class="percent">%</div>
            </div>
        </div>

        <div class="sc-ezbkAF hzTJOu input sc-fvxzrP gOLODp">
            <div class="input-label">Stop on lose<div class="label-amount">0 USD</div>
            </div>
            <div class="input-control">
                <input type="number" disabled={$Handles_alive} bind:value={$handleStopOnLose}>
                   <img class="coin-icon" alt="" src={$isLoggin ? $default_Wallet.coin_image : default_coins}>
            </div>
        </div>

        <div class="sc-gfXuXe kNGYYA script-tips">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                <use xlink:href="#icon_Help"></use>
            </svg>
            <div class="tip-msg">
                <span>Use of script is optional and players must take full responsibility for any attendant risks. We will not be held liable in this regard.</span>
            </div>
        </div>

        <button on:click={handleAutoStart} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button">
            <div class="button-inner"> {is_Looping ? "Stop" : "Start"} Auto Bet</div>
        </button>

    </div>
</div>
