<script>
    import { screen} from "$lib/store/screen";
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher()
</script>


<div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
    <div class="dialog " style={`${$screen < 650 ? "transform: scale(1) translateZ(0px);" : "opacity: 1; width: 464px; height: 560px; margin-top: -285.5px; margin-left: -232px;"}  `}>
        <div class="dialog-head has-close"><div class="dialog-title">Details</div></div>
        <button on:click={()=> dispatch("close")} class="sc-ieecCq fLASqZ close-icon dialog-close">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                <title>Close</title>
                <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                </g>
            </svg>
        </button>
        <div class="dialog-body default-style " style="z-index: 2; transform: none;">
            <div class="sc-dkPtRN jScFby scroll-view sc-knKHOI cWvTBH">
                <p>Classic Dice, a probability game established by blockchain hash value calculation and algorithm, provides more fun with bet and prediction, in which the closer the number rolled by players to the random number, the higher the probability winning.</p>
            </div>
        </div>
    </div>
</div>