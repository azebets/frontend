<script>
import { default_Wallet } from "$lib/store/coins";
import { goto } from "$app/navigation";
import { handleResposeMessages, isLoggin} from "$lib/store/activities";
import { url } from "$lib/store/routes";
import { DiceBet } from "$lib/gameAPIs/dice";
import { handleAuthToken} from "$lib/store/routes";
import { onMount } from "svelte";
import Load from "$lib/loader.svelte";
import { user } from "$lib/store/profile";
import {handleSocketConnection} from "$lib/socket/index";
import { soundManager,soundHandler, DiceEncription, payout, isbetLoadingBtn, betPosition,rollunder,
   Handles_Loading,dice_history  
} from "$lib/games/ClassicDice/store/index";


$: default_coins = "https://res.cloudinary.com/dxwhz3r81/image/upload/v1721026026/USD_Coin_-_Green_ai65gw.png"
$: bet_amount = 0;
$: demo_wallet = "Fun Coupons";
$: demo_minebet = 100
$: demo_maxWallet = 10000
$: USD_min = 0.2
$: USD_max = 2000
$: aval_bal = parseFloat($default_Wallet?.balance) || 100

const handleErrors = ((message)=>{
  handleResposeMessages("error", message)
  Handles_Loading.set(false);
})

let max_profit_tips = false;
let Handlemax_profit_tips = (e) => {
  if (e === 1) {
    max_profit_tips = true;
  } else {
    max_profit_tips = false;
  }
};

$: wining_amount = "";
onMount(() => {
    if ($default_Wallet?.coin_name === demo_wallet) {
      bet_amount = (100.0000).toFixed(7);
    }else{
      bet_amount = (0.004).toFixed(7);
    }
});

$: {
  wining_amount = (bet_amount * $payout).toFixed(7);
}

const dive = (sign) => {
  bet_amount = (bet_amount / 2).toFixed(7);
};

 const mult = () => {
    bet_amount = (bet_amount * 2).toFixed(7);
};


  $: non = 0;
  const handleRollSubmit = async () => {
    let sound = $soundManager.audioMap.bet;
    let winSound = $soundManager.audioMap.win;
    $soundManager.Play(sound, $soundHandler);
    Handles_Loading.set(true);
    if ($isLoggin) {
      if (parseFloat(bet_amount) > aval_bal) {
        handleErrors("Insufficient balance")
      }
      else if ( parseFloat(bet_amount) > demo_maxWallet &&  demo_wallet) {
          handleResposeMessages("error", `Max bet amount for Fun Coupons is ${demo_maxWallet}`)
      } 
     else if (parseFloat(bet_amount) < demo_minebet &&  $default_Wallet?.coin_name === demo_wallet ) {
        handleResposeMessages("error", `Minimum bet amount for Fun Coupons is ${demo_minebet}`)
      } 
    else if (parseFloat(bet_amount) < USD_min && $default_Wallet?.coin_name !== demo_wallet ) {
      handleResposeMessages("error", `Minimum bet amount for USD is ${USD_min}`)
    } 
    else {
        let data = {
          user: $user,
          server_seed: $DiceEncription.server_seed,
          client_seed: $DiceEncription.client_seed,
          hash_seed: $DiceEncription.hash_seed,
          nonce: $DiceEncription.nonce + non,
          prev_bal: parseFloat($default_Wallet?.balance),
          bet_amount: parseFloat(bet_amount),
          token_img: $default_Wallet?.coin_image,
          token: $default_Wallet?.coin_name,
          chance: $rollunder
            ? parseFloat($betPosition).toFixed(2)
            : 100 - parseFloat($betPosition).toFixed(2),
          payout: parseFloat($payout),
          time: new Date(),
          is_roll_under: $rollunder,
          wining_amount: parseFloat(wining_amount) - parseFloat(bet_amount),
        };
        isbetLoadingBtn.set(true); 
      non += 1;
      const respnse = await DiceBet(data, $handleAuthToken)
      const { handleDicebet } = await handleSocketConnection()
      await handleDicebet(respnse)
      if(respnse.has_won){
        $soundManager.Play(winSound, $soundHandler);
      }
      if($dice_history.length <= 14){
        dice_history.set([...$dice_history, respnse])
      }else{
        $dice_history.shift()
        dice_history.set([...$dice_history, respnse])
      }
    }
  }
    else {
      goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=login`)
      Handles_Loading.set(false);
    }
  };

  let is_min_max = false;
  const handleMinMax = () => {
    is_min_max = !is_min_max;
  };

  let walletRange = 0;
  const handleRangeSTlop = (eui) => {
    bet_amount = (parseFloat($default_Wallet?.balance) * (eui / 100)).toFixed(7);
  };

  const handlesjen = (e) => {
    bet_amount = (parseFloat($default_Wallet?.balance) * (e / 100)).toFixed(7);
  };
</script>

<div class="game-control-panel">
  <div class="sc-juEPzu lgTgT">
    <div class="sc-ezbkAF gcQjQT input sc-fvxzrP gOLODp sc-gsFzgR fCSgTW game-coininput">
      <div class="input-label">
        <div class="sc-hmvnCu efWjNZ label">
          <div>Amount</div>
          <div class="max-profit">
            {#if max_profit_tips}
              <div class="tip">
                <span class="tit">Max Profit:&nbsp;</span>
                <div class="sc-Galmp erPQzq coin notranslate">
                  <div class="amount">
                    <span class="amount-str"
                      >5000.<span class="suffix">00</span>
                    </span>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
        <!-- <div class="label-amount">0 USD</div> -->
      </div>
      <div class="input-control">
        <input type="number" bind:value={bet_amount} />
          <img class="coin-icon" alt="" src={ $isLoggin ? $default_Wallet?.coin_image : default_coins} />
        <div class="sc-kDTinF bswIvI button-group">
          <button on:click={() => dive()}>/2</button>
          <button on:click={() => mult()}>x2</button>
          {#if is_min_max}
            <div class="fix-layer" style="opacity: 1; transform: none;">
              <button
                on:click={() => handlesjen(0)}
                style={`${walletRange === 0 ? `color:#ffff;` : ""}`}
                class="">Min</button
              >
              <div class="sc-kLwhqv eOA-dmL slider">
                <div  class="slider-after"
                  style="transform: scaleX(100.001001);"
                ></div>
                <input
                  type="range"
                  class="drag-block"
                  on:input={(e) => handleRangeSTlop(e.target.value)}
                  bind:value={walletRange}
                />
                <div
                  class="slider-before"
                  style="transform: scaleX(100.998999);"
                ></div>
              </div>
              <button
                on:click={() => handlesjen(100)}
                style={`${walletRange === 100 ? `color:#ffff;` : ""}`}
                class="">Max</button
              >
            </div>
          {/if}
          <button on:click={handleMinMax} class="sc-cAhXWc cMPLfC">
            <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="sc-ezbkAF gWrsXy input sc-fvxzrP gOLODp" disabled="">
      <div class="input-label">
        Win Amount
        <!-- <div class="label-amount">0 USD</div> -->
      </div>
      <div class="input-control">
        <input type="number" disabled bind:value={wining_amount} />
        <img class="coin-icon" alt="" src={ $isLoggin ? $default_Wallet?.coin_image : default_coins} />
      </div>
    </div>
    <button disabled={$Handles_Loading} on:click={handleRollSubmit}
      class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button">
        <div class="button-inner">
          {#if $Handles_Loading}
            <Load color={"btn"}/>
            {:else}
            Roll Now 
          {/if}
        </div>
    </button>
  </div>
</div>

<style>
  .input-control:focus-within {
    border: 1px solid var(--primary-color);
  }

  .fCSgTW .fix-layer {
    position: absolute;
    right: 0px;
    top: 2.875rem;
    z-index: 2;
    touch-action: pan-x;
    width: 200px;
    height: 2.5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 0.625rem;
    background-color: rgb(33, 35, 40);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 1px 0px 7px 0px;
  }

  .fCSgTW .fix-layer > button {
    height: 100%;
    width: 2.5rem;
    flex: 0 0 auto;
    font-size: 0.75rem;
    background-color: rgba(60, 64, 74, 0.5);
  }
  .fCSgTW .fix-layer .slider {
    flex: 1 1 0%;
    height: 100%;
  }

  .drag-block {
    position: absolute;
    z-index: 100;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background-color: transparent;
    border-radius: 10px;
    appearance: none;
    width: 100%;
    margin: 0px;
    height: 100%;
    cursor: grab;
    -webkit-appearance: none;
  }
  .drag-block::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: 0px;
    /* Centers thumb on the track */
    background-color: #feffff;
    height: 1.5rem;
    width: 1rem;
    border-radius: 10px;
    cursor: grabbing;
  }
  .eOA-dmL {
    position: relative;
    display: flex;
    height: 0.875rem;
    overflow: hidden;
    box-sizing: content-box;
    padding: 0px 0.8125rem;
    cursor: pointer;
  }
  .fCSgTW .fix-layer .slider-after {
    width: 86%;
    left: 7%;
    height: 0.5rem;
    margin-top: -0.25rem;
    border-radius: 0.25rem;
    background-color: rgb(23, 24, 27);
    transform: scaleX(1) !important;
  }
  .eOA-dmL .slider-after {
    height: 2px;
    width: 98%;
    position: absolute;
    left: 1%;
    top: 50%;
    margin-top: -1px;
  }
  .eOA-dmL .slider-after {
    background-color: rgba(216, 222, 227, 0.4);
    transform-origin: left center;
  }

  .fCSgTW .fix-layer .slider-before,
  .fCSgTW .fix-layer .slider-after {
    width: 86%;
    left: 7%;
    height: 0.5rem;
    margin-top: -0.25rem;
    border-radius: 0.25rem;
    background-color: rgb(23, 24, 27);
    transform: scaleX(1) !important;
  }
  .eOA-dmL .slider-before {
    background-color: rgba(216, 222, 227, 0.4);
    transform-origin: right center;
  }
  .eOA-dmL .slider-before,
  .eOA-dmL .slider-after {
    height: 2px;
    width: 98%;
    position: absolute;
    left: 1%;
    top: 50%;
    margin-top: -1px;
  }
  .gcQjQT {
      margin-top: 1rem;
  }

</style>
