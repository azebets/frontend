<script>
import { createEventDispatcher } from 'svelte';
import About from './helps/about.svelte';
import Fairness from './helps/fairness.svelte';
const dispatch = createEventDispatcher()

const handleCloseHelp = (() => {
    dispatch("close", 5)
})

let defaultSate = true
let is_about = false
let fairness = false
const HandleAboutGame = ((e) => {
    if(e === 1){
        defaultSate = !defaultSate
        is_about = !is_about
        fairness = false
    }
    else{
        defaultSate = !defaultSate
        fairness = !fairness
        is_about = false
    }
})


</script>

<div class="sc-bkkeKt kBjSXI">
    <div class="dialog " style="opacity: 1; width: 464px; height: 631px; margin-top: -315.5px; margin-left: -232px; transform: scale(1) translateZ(0px);">
        {#if !defaultSate}
            <button on:click={()=> defaultSate = true} class="dialog-back" style="opacity: 1; transform: none;">
                <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
            </button>
        {/if}
        <div class={`dialog-head ${defaultSate ? "has-close" : "has-back"} `}>
            <div class="dialog-title">{defaultSate ? "Help" :  is_about ? "What Game Is This?" : "Fairness"}</div>
        </div>
        <button on:click={()=> handleCloseHelp()}  class="sc-ieecCq fLASqZ close-icon dialog-close">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                <title>Close</title>
                <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                </g>
            </svg>
        </button>

        {#if defaultSate}
        <div class="dialog-body default-style " style="z-index: 2; transform: none;">
            <div class="sc-dkPtRN jScFby scroll-view sc-cfJLRR cTaiTH">
                <div class="help-list">
                    <button on:click={()=> HandleAboutGame(1)} class="usiu">
                        <span>What Game Is This?</span>
                        <!-- <Icon src={RiSystemArrowDropRightLine}  size="23"  color="rgba(153, 164, 176, 0.6)"  /> -->
                    </button>
                    <button on:click={()=> HandleAboutGame(2)} class="usiu">
                        <span>Fairness</span>
                        <!-- <Icon src={RiSystemArrowDropRightLine}  size="23"  color="rgba(153, 164, 176, 0.6)"  /> -->
                    </button>
                </div>
            </div>
        </div>
        {/if}

        {#if is_about && !defaultSate}
            <About />
        {/if}
        {#if fairness && !defaultSate}
            <Fairness />
        {/if}

    </div>
</div>

<style>



.cTaiTH .help-list {
    margin-top: 0.5rem;
}

.cTaiTH .help-list>button {
    background-color: rgb(23, 24, 27);
    border-radius: 1.25rem;
    display: flex;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 3.5rem;
    padding: 0px 1.25rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: rgba(153, 164, 176, 0.6);
}
</style>
