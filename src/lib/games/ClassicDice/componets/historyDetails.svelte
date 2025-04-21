<script>
import { handleDiceDetails } from "$lib/gameAPIs/dice";
import { onMount } from "svelte";
import { screen} from "$lib/store/screen";
import { user } from "$lib/store/profile";
import SeedMedal from "./seedMedal.svelte";
export let DgII
import { DiceEncription } from '$lib/games/ClassicDice/store/index';

$: DgII
import { createEventDispatcher} from 'svelte';
import Seedsettings from './share/seedsettings.svelte';
import Loader from "$lib/loader.svelte";
$: demoWallet = "Fun Coupons"
$: deatls = {}
let is_loading = false
onMount(async()=>{
    is_loading = true
   let  { loading, response } = await handleDiceDetails(DgII.bet_id)
   if(response){
        deatls = response
   }
   is_loading = loading
})

const dispatch = createEventDispatcher()
const handleCloseHelp = (() => {
    dispatch("close", 5)
})

let is_seeed_settigs = false
const handleSeedSettings = (()=>{
    is_seeed_settigs = !is_seeed_settigs
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

$: seedConfirmation = false
const handleSeedMedal = ((event)=>{
    if(event.detail === "cancel"){
        seedConfirmation = false
    }
    if(event.detail === "confirm"){
        seedConfirmation = false
        is_seeed_settigs = true
    }
})

function goToExternalSite() {
    window.open(`/provably-fair/calculation?tab=classic%20Dice&clientseed=${deatls?.client_seed}&Serverseed=${deatls?.server_seed}&nonce=${deatls?.game_nonce}`, '_blank', 'noopener noreferrer');
}

</script>

<div class="sc-bkkeKt kBjSXI">
    <div class="dialog " style={`${$screen < 650 ? "transform: scale(1) translateZ(0px);" : "opacity: 1; width: 464px; height: 560px; margin-top: -285.5px; margin-left: -232px;"}  `}>
        {#if is_seeed_settigs}
        <button on:click={()=> handleSeedSettings()} class="dialog-back" style="opacity: 1; transform: none;">
            <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
        </button>
        {/if}
        <div class={`dialog-head ${is_seeed_settigs ? "has-back" : "has-close"} `}>
            <div class="dialog-title">{is_seeed_settigs ? "Seed Settings" : "Details"}</div>
        </div>

        <button on:click={()=> handleCloseHelp()}  class="sc-ieecCq fLASqZ close-icon dialog-close">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                <title>Close</title>
                <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                </g>
            </svg>
        </button>

        {#if !is_seeed_settigs}
        {#if is_loading}
            <Loader color={"display"}/>
            {:else}
            <div class="dialog-body default-style " style="z-index: 2; transform: none;">
                <div class="sc-dkPtRN jScFby scroll-view sc-bvFjSx jGQOsZ">
                    <div class="sc-emDsmM Osnbt">
                        {#if !deatls?.has_won}
                        <img class="win-state" alt="" src="https://static.nanogames.io/assets/lose.b4ff48b7.png">
                        {:else}
                        <img class="win-state" alt="" src="https://static.nanogames.io/assets/win.431b83d6.png">
                        {/if}
                        <div class="rt_info">              
                            <img class="avatar avatar" alt="" src={deatls.user?.profileImg}>
                            <div class="name">{deatls.user?.username}</div>
                            <div class="flex">
                                <div class="betid">{`${deatls?.bet_id ? `Betting ID: ${deatls?.bet_id}` : "" }`}</div>
                                <div class="verified">Verified</div>
                            </div>
                        </div>
                        <div class="rt_time"> {new Date(deatls?.time).getFullYear()}:{new Date(deatls?.time).getMonth()}:{new Date(deatls?.time).getDate()} {formatTime(deatls?.time)} </div>
                        <div class="rt_items">
                            <div class="item-wrap">
                                <div class="label flex-center">
                                    <span style="padding-right: 3px;">
                                        <!-- <Icon src={SiMoneygram}  size="13"  color="rgb(223, 39, 113)" className="custom-icon" /> -->
                                    </span>
                                    Amount
                                </div>
                                <div class="number flex-center">{(parseFloat(deatls?.bet_amount)).toFixed(2)} {deatls?.token === demoWallet ? "FC" : deatls?.token}</div>
                            </div>
                            <div class="item-wrap">
                                <div class="label flex-center">
                                    <span style="padding-right: 3px;">
                                        <!-- <Icon src={BsCreditCardFill}  size="13"  color="rgb(119, 60, 253)" className="custom-icon" /> -->
                                    </span>
                                    Payout
                                </div>
                                <div class="number flex-center">{(parseFloat(deatls?.payout)).toFixed(2)} x</div>
                            </div>
                            <div class="item-wrap">
                                <div class="label flex-center">
                                    <span style="padding-right: 3px;">
                                        <!-- <Icon src={RiFinanceHandCoinFill} size="13"  color="rgb(218, 30, 40)" className="custom-icon" /> -->
                                    </span>
                                    Profit
                                </div>
                                <div class="number flex-center">{(parseFloat(deatls?.profit)).toFixed(2)} {deatls?.token === demoWallet ? "FC" : deatls?.token}</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="sc-ekrjqK fmwvmO rt_items">
                        <div class="item-wrap">
                            <div class="item-num">
                                <span style="padding-right: 3px;">
                                    <!-- <Icon src={BiChart}  size="13"  color="rgb(67, 179, 9)" className="custom-icon" /> -->
                                </span>
                                Result
                            </div>
                            <div class="item-desc">{deatls?.cashout}</div>
                        </div>
                        <div class="item-wrap">
                            <div class="item-num">
                                <span style="padding-right: 3px;">
                                    <!-- <Icon src={FaSolidDice}  size="13"  color="rgb(15, 98, 254)" className="custom-icon" /> -->
                                </span>
                                Bet
                            </div>
                            <div class="item-desc">
                                <span class="mthan">&lt;{deatls?.chance}</span>
                            </div>
                        </div>
                        <div class="item-wrap">
                            <div class="item-num">
                                <span style="padding-right: 3px;">
                                    <!-- <Icon src={AiFillSlackCircle}  size="17"  color="rgb(237, 99, 0)" className="custom-icon" /> -->
                                </span>
                                Chance
                            </div>
                            <div class="item-desc">{deatls?.chance}%</div>
                        </div>
                    </div>
    
                    <div class="seed-main">
                        <div class="sc-ezbkAF kDuLvp input ">
                            <div class="input-label">Server Seed</div>
                            <div class="input-control">
                                <input type="text" placeholder="The seed hasn't been revealed yet." readonly value={$DiceEncription.server_seed === deatls?.server_seed ? "" : deatls?.server_seed}>
                            </div>
                        </div>
                        <div class="sc-ezbkAF kDuLvp input ">
                            <div class="input-label">
                                <div class="seed-col">
                                    <div>Server Seed (hash)</div>
                                    {#if $DiceEncription.server_seed === deatls?.server_seed}
                                        <button on:click={()=>handleSeedSettings()} class="cl-primary">Seed Settings</button>
                                    {/if}
                                </div>
                            </div>
                            <div class="input-control">
                                <input type="text" readonly value={deatls?.server_seed}>
                            </div>
                        </div>
                        <div class="col">
                            <div class="sc-ezbkAF kDuLvp input ">
                                <div class="input-label">Client Seed</div>
                                <div class="input-control">
                                    <input type="text" readonly value={deatls?.client_seed}>
                                </div>
                            </div>
                            <div class="sc-ezbkAF kDuLvp input ">
                                <div class="input-label">nonce</div>
                                <div class="input-control">
                                    <input type="number" readonly value={deatls?.game_nonce}>
                                </div>
                            </div>
                        </div>
                    </div>
                    {#if $user?.user_id === deatls?.user_id}
                    {#if $DiceEncription?.server_seed === deatls?.server_seed}
                        <button on:click={()=> seedConfirmation = true} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal verify-btn">
                            <div class="button-inner">Verify</div>
                        </button>
                    {:else}
                        <button on:click={goToExternalSite} class="verify-wrap">
                            <button  class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal verify-btn">
                                <div class="button-inner">Verify</div>
                            </button>
                        </button>
                    {/if}
                    {/if}
                </div>
            </div>
        {/if}
        {:else}
            <Seedsettings on:close={handleSeedSettings} settin={deatls} />
        {/if}
    </div>
</div>

{#if seedConfirmation}
    <SeedMedal on:close={handleSeedMedal}/>
{/if}

<style>

.Osnbt {
    position: relative;
}
.Osnbt .win-state {
    position: absolute;
    left: 0.625rem;
    top: 0px;
    width: 5rem;
    z-index: 10;
}
.gZqspm {
    z-index: 10;
    width: 2.75rem;
    height: 2.75rem;
    margin: 0px;
    padding: 0px;
    border-radius: 50%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    cursor: pointer;
    right: 0.625rem;
    top: 0.625rem;
}

.Osnbt .rt_info {
    margin: 0px auto;
    padding-top: 2.875rem;
    text-align: center;
}
/* .Osnbt .rt_info .avatar {
    width: 4.625rem;
    height: 4.625rem;
    border-radius: 50%;
    border: 2px solid rgb(70, 70, 70);
    font-size: 0px;
} */
.Osnbt .rt_info .name {
    line-height: 1.25rem;
    margin-top: 0.5rem;
}
.Osnbt .rt_info .flex {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.25rem;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 0.375rem;
}
.flex {
    display: flex;
}
.Osnbt .rt_info .flex .betid {
    opacity: 0.6;
}
.Osnbt .rt_info .verified {
    color: rgb(255, 255, 255);
    margin-left: 0.5rem;
    background: url(https://static.nanogames.io/assets/verified.312ca177.svg) left center / auto 0.875rem no-repeat;
    padding-left: 1rem;
    font-weight: bold;
}
.Osnbt .rt_info .name {
    line-height: 1.25rem;
    margin-top: 0.5rem;
}
.Osnbt .rt_time {
    font-size: 0.75rem;
    margin-top: 0.375rem;
    text-align: center;
    opacity: 0.5;
}
.Osnbt .rt_items {
    margin-top: 2.25rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.Osnbt .rt_items .item-wrap {
    height: 4.625rem;
    border-radius: 0.625rem;
    background-color: rgb(23, 24, 27);
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.375rem;
    padding: 1rem 0px;
    color: rgba(153, 164, 176, 0.6);
}
.fmwvmO {
    margin-top: 0.5rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.fmwvmO .item-wrap {
    height: 4.625rem;
    border-radius: 0.625rem;
    background-color: rgb(23, 24, 27);
    color: rgba(153, 164, 176, 0.6);
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    flex: 1 1 0%;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.375rem;
    padding: 1rem 0px;
}
.fmwvmO .item-wrap .item-num {
    height: 1.25rem;
    font-size: 0.75rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-weight: bold;
}
.fmwvmO .item-wrap .item-desc {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1rem;
    font-size: 0.75rem;
    white-space: nowrap;
    margin-top: 0.75rem;
}

.Osnbt .rt_items .item-wrap .label {
    height: 1.25rem;
    font-size: 0.75rem;
}
.Osnbt .rt_items .item-wrap .number {
    height: 1rem;
    font-size: 0.75rem;
    white-space: nowrap;
    margin-top: 0.75rem;
}
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.kDuLvp {
    margin-top: 1rem;
}
.jGQOsZ .seed-main {
    margin-top: 1.25rem;
}
.jGQOsZ .seed-main .input {
    margin-top: 1rem;
}
.jGQOsZ .seed-main .input:first-of-type {
    margin-top: 0px;
}
.kDuLvp .input-label {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    line-height: 1em;
    height: 1.25rem;
    margin: 0px 0.75rem 0.375rem;
    color: rgba(153, 164, 176, 0.6);
}

.kDuLvp .input-control {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 1.25rem;
    border: 1px solid rgb(45, 48, 53);
    background-color: rgba(45, 48, 53, 0.5);
    height: 3.5rem;
    padding: 0px 1.25rem;
    opacity: 1;
}
.jGQOsZ .seed-main .input input {
    font-weight: 500;
}
.jGQOsZ .seed-main .input .input-control input[readonly] {
    opacity: 1;
}
.jGQOsZ .seed-main .input .seed-col {
    width: 100%;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.jGQOsZ .seed-main .input .seed-col .cl-primary {
    color: rgb(67, 179, 9);
}
.jGQOsZ .seed-main .input .input-control input[readonly] {
    opacity: 1;
}
.jGQOsZ .seed-main .input input {
    font-weight: 500;
}
.jGQOsZ .seed-main .col {
    margin-top: 0.75rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.jGQOsZ .seed-main .col > .input:first-of-type {
    flex: 2 1 0%;
}
.jGQOsZ .seed-main .col > .input:last-of-type {
    flex: 1 1 0%;
    margin-left: 0.625rem;
}
.jGQOsZ .seed-main .col > .input {
    margin-top: 0rem;
}
.jGQOsZ > div:last-of-type {
    margin-bottom: 3.375rem;
}
.jGQOsZ .verify-wrap  {
    width: 100%;
}
.jGQOsZ .verify-wrap .verify-btn {
    width: 70%;
    height: 3.5rem;
    margin: 0.25rem auto 0px;
}

</style>
