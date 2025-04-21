<script>
    import { onMount } from "svelte";
    import "../../styles/games.css"
    import Loader from "../loader.svelte";
    export let handleClientSeed
    export let pint
    export let seaser

    let server_seed = seaser[2] || ""
    let nonce = seaser[3] || ""
    let client_seed = seaser[1] || ""
    $: point = pint || null

    onMount(()=>{
        if(server_seed && nonce && client_seed){
            handleClientSeed({server_seed,client_seed, nonce })
        }
    })

    $: track = !server_seed || !client_seed

const handleNonce = ((ev)=>{
    if(ev === "+"){
        nonce += 1
    }
    if(ev === "-"){
        nonce -= 1
    }
    if(nonce <= 0 && ev === "-"){
        nonce = 0
    }
})
    
</script>

<div class="wrap svelte-1p93j4h">
    <label class="stacked svelte-1wzq4lo">
        <div class="input-wrap svelte-1u979cd">
            <div class="input-content svelte-1u979cd"> 
                <input autocomplete="on" class="input spacing-expanded svelte-1u979cd" bind:value={client_seed} type="text"> 
            </div>
        </div>
        <span class="label-content full-width svelte-1k9rtf3">
            <div class="label-left-wrapper svelte-1u979cd">
                <span >Client Seed</span> 
            </div> 
        </span>
    </label>
</div>

<div class="wrap svelte-1p93j4h">
    <label class="stacked svelte-1wzq4lo">
        <div class="input-wrap svelte-1u979cd">
            <div class="input-content svelte-1u979cd"> 
                <input autocomplete="on" class="input spacing-expanded svelte-1u979cd" bind:value={server_seed} type="text"> 
            </div>
        </div>
        <span class="label-content full-width svelte-1k9rtf3">
            <div class="label-left-wrapper svelte-1u979cd">
                <span>Server Seed</span> 
            </div> 
        </span>
    </label>
</div>

<div class="wrap svelte-1p93j4h">
    <label class="stacked svelte-1wzq4lo">
        <div class="input-wrap svelte-1u979cd">
            <div class="input-content svelte-1u979cd"> 
                <input autocomplete="on" class="input spacing-expanded svelte-1u979cd" bind:value={nonce} type="number"> 
            </div>
            <div class="input-button-wrap svelte-1u979cd">
                <button on:click={()=> handleNonce("-")} type="button" tabindex="0" class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white betterhover:hover:bg-grey-300 betterhover:hover:text-white focus-visible:outline-white text-sm leading-none py-[0.9375rem] px-[1.25rem] shadow-none" data-button-root="">
                    <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style="">
                        <title></title> 
                        <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07h-.005Z"></path>
                    </svg>
                </button>
                <button on:click={()=> handleNonce("+")} type="button" tabindex="0" class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white betterhover:hover:bg-grey-300 betterhover:hover:text-white focus-visible:outline-white text-sm leading-none py-[0.9375rem] px-[1.25rem] shadow-none" data-button-root="">
                    <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style="">
                         <title></title> 
                         <path d="M32.271 17 9.201 40.071 16.128 47l16.145-16.145L48.418 47l6.93-6.929L32.275 17h-.005Z"></path>
                    </svg>
                </button>
            </div>
        </div>
        <span class="label-content full-width svelte-1k9rtf3">
            <div class="label-left-wrapper svelte-1u979cd">
                <span >Nonce</span> 
            </div> 
        </span>
    </label>
</div>

<button disabled={track} on:click={()=> handleClientSeed({server_seed,client_seed, nonce })} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button" style="margin: 20px 0;">
    <div class="button-inner"> Verify </div>
</button>

{#if point}
<div class="wrap svelte-1uf4dpw">
    <div class="wrap svelte-q19e8x">
        <div class="dice-wrap svelte-q19e8x">
            <div class="translate-x svelte-3ojd3c" style="--dice-slide-transition: 300ms; left: {point?.point}%">
                <div class="hide-show positive svelte-3ojd3c" style="--dice-scale-transition: 500ms;">
                    <img class="dice svelte-3ojd3c" src="https://stake.com/_app/immutable/assets/classic-dice.BVpplMR8.svg" alt="Dice"> 
                    <div class="result positive svelte-3ojd3c" style="--dice-result-transition: 100ms;">{point?.point || ""}</div>
                </div>
            </div>
        </div>
        <div class="wrap svelte-ck6zcq" data-test-dice-condition="above" style="--slider-height: 8px; --drag-size: 36px; --max-game-board-width: 730px; --lines-asset: url(https://stake.com/_app/immutable/assets/lines.T9v8Oznt.svg);">
            <div class="wrap svelte-jyarsh">
                <div class="content svelte-jyarsh" style="left: 0%;">
                    <div class="value svelte-jyarsh">0</div>
                </div>
                <div class="content svelte-jyarsh" style="left: 25%;">
                    <div class="value svelte-jyarsh">25</div>
                </div>
                <div class="content svelte-jyarsh" style="left: 50%;">
                    <div class="value svelte-jyarsh">50</div>
                </div>
                <div class="content svelte-jyarsh" style="left: 75%;">
                    <div class="value svelte-jyarsh">75</div>
                </div>
                <div class="content svelte-jyarsh" style="left: 100%;">
                    <div class="value svelte-jyarsh">100</div>
                </div>
            </div> 
            <div class="content svelte-ck6zcq"> 
                <div class="range svelte-ck6zcq">
                    <div class="lower above svelte-ck6zcq"></div> 
                    <div class="higher above svelte-ck6zcq" style="width: 0%;"></div>
                </div> 
                <input disabled="" min="2" max="98" type="range" value="1" class="classic-slider svelte-ck6zcq" data-test="dice-slider">
            </div>
            </div>
        </div>
</div>
{/if}


{#if !point}
    <div class="wrap svelte-1uf4dpw">
        <span class="weight-normal line-height-default align-left size-default text-size-default variant-subtle with-icon-space svelte-17v69ua" style="">More inputs are required to verify result</span>
        <div class="loader svelte-5ovsvp" style="height: 50px;">
            <Loader color={"default"}/>
        </div>
    </div>
{/if}


{#if point}
    <div class="row-wrap svelte-16rgtah">
        <h2 class="weight-semibold line-height-default align-left size-default text-size-default variant-subtle with-icon-space svelte-17v69ua" style="">Final Result</h2>
        <div class="scrollX">
            <span class="weight-semibold line-height-default align-left size-medium text-size-medium variant-highlighted with-icon-space svelte-17v69ua" style="font-family: monospace;">{point?.point}</span>
        </div>
    </div>

    <div class="row-wrap svelte-16rgtah">
        <h2 class="weight-semibold line-height-default align-left size-default text-size-default variant-subtle with-icon-space svelte-17v69ua" style="">Casino Seeds to Bytes</h2>
        <div class="scrollX">
            <span class="weight-normal line-height-default align-left size-default text-size-default variant-highlighted with-icon-space svelte-17v69ua" style="font-family: monospace;">HMAC_SHA256({point?.server_seed},{point?.client_seed}::{point?.nonce})</span>
        </div>
    </div>
{/if}


{#if !point}
    <div class="loader svelte-5ovsvp" style="height: 190px;">
        <Loader color={"default"}/>
    </div>
{/if}



<style>
.wrap.svelte-q19e8x {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 700px;
}
.dice-wrap.svelte-q19e8x {
    position: absolute;
    width: calc(100% - 3em);
    height: 100%;
}
.translate-x.svelte-3ojd3c {
    position: absolute;
    display: flex;
    bottom: 50%;
    left: 0;
    right: 0;
    z-index: 5;
    pointer-events: none;
    transition: transform 300ms;
    will-change: transform;
}
.hide-show.positive.svelte-3ojd3c {
    animation: svelte-3ojd3c-expand 300ms;
}
.content.svelte-ck6zcq {
    position: relative;
    height:8px;
}
.range.svelte-ck6zcq {
    pointer-events: none;
    height: 8px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 1px;
    box-shadow: 0 0 0 10px var(--background-color);
    transition: opacity .3s;
    overflow: hidden;
}
.lower.above.svelte-ck6zcq {
    background: var(--primary-color);
}
.lower.svelte-ck6zcq {
    position: absolute;
    height: 8px;
    width: 100%;
    right: 0;
    top: 0;
    border-radius: 5px;
}
.higher.above.svelte-ck6zcq {
    background: #e9113c;
}
.higher.svelte-ck6zcq {
    position: absolute;
    height: 8px;
    top: 0;
    left: 0;
    border-radius: 100px;
}

.wrap.svelte-ck6zcq {
    position: relative;
    width: 100%;
    max-width: 730px;
    border-radius: 5px;
    padding: 1.5em;
    background:rgba(203, 215, 255, 0.03);
    text-align: left;
    margin: 4em 0;
    box-shadow: 0 4px 6px -1px rgba(27, 23, 23, .2), 0 2px 4px -1px rgba(0, 0, 0, .12);
}
.wrap.svelte-jyarsh {
    position: absolute;
    bottom: calc(100% - 1px);
    left: calc(1.5em + 4px);
    right: calc(1.5em + 4px);
}
.content.svelte-jyarsh {
    position: absolute;
    text-align: center;
    transform: translate(-50%);
}
.value.svelte-jyarsh {
    position: absolute;
    font-weight: 600;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
}
.content.svelte-jyarsh:after {
    content: "";
    bottom: 0;
    position: absolute;
    transform: translate(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #2f4553;
}
.dice.svelte-3ojd3c {
    width: 7ch;
    height: auto;
    filter: drop-shadow(0 0 3px rgba(25, 25, 25, .1));
}
.result.svelte-3ojd3c {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 1px 0 #fff;
    font-weight: 600;
    transition: 100ms;
}
.hide-show.svelte-3ojd3c {
    position: relative;
    transform: translate(-50%);
    transition: all 500ms;
    transform-origin: center bottom;
}
.result.positive.svelte-3ojd3c {
    color: var(--primary-color);
}
.classic-slider.svelte-ck6zcq {
    -webkit-appearance: none;
    width: 100%;
    position: absolute;
    z-index: 1;
    background: #0000;
    top: 0;
    height: var(--slider-height);
    pointer-events: none;
}
.classic-slider.svelte-ck6zcq::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: 0px;
    /* Centers thumb on the track */
    background-color: #feffff;
    height: 2rem;
    width: 1.4rem;
    border-radius: 5px;
    cursor: grabbing;
}
 h2.variant-subtle.svelte-17v69ua {
    color: #b1bad3;
}

span.align-left.svelte-17v69ua,  h2.align-left.svelte-17v69ua{
    text-align: left;
    font-size: 12px;
    justify-content: flex-start;
}
.row-wrap.svelte-16rgtah{
    margin-top: 16px;
}
</style>