<script>
    import { browser} from '$app/environment';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    import { goto } from "$app/navigation"
    import { url } from "$lib/store/routes";
    import "../../styles/wallet.css"
    import Deposit from "./deposit/deposit.svelte";
    import Referral from "./referral/referral.svelte";
    import Withdraw from "./withdraw/withdraw.svelte";
    export let tab
  
   let wallet = [
     {
        is_active: false,
         fullname: "Bitcoin",
        coin_image:"https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400", 
        coin_name: "BTC", 
    },
    {
     is_active: false,   
     fullname: "Ethereum",
     coin_image:"https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628", 
     coin_name: "ETH", 
    },
    {
     is_active: true,   
     fullname: "Tron",
     coin_image:"https://assets.coingecko.com/coins/images/1094/standard/tron-logo.png?1696502193", 
     coin_name: "TRX", 
    },
    {
     is_active: false,   
     fullname: "Solana",
     coin_image:"https://s2.coinmarketcap.com/static/img/coins/64x64/16116.png", 
     coin_name: "SOL"
    },
     {
     is_active: false,   
     fullname: "Litecoin",
     coin_image:"https://assets.coingecko.com/coins/images/2/standard/litecoin.png?1696501400", 
     coin_name: "LTC"
    },
    {
     is_active: false,   
     fullname: "Tether",
     coin_image:"https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663", 
     coin_name: "USDT"
    }
 ]


function handleClickOutside(event) {
  if (!event.target.closest('.css-15hip2x')) {
    goto($url)
  }
}

$: referral = tab[2]


</script>


<div class="css-1yogdko" >
     <button class="css-17zcsfw" on:click={handleClickOutside}>
         <div class="css-15hip2x" type="button" >
             <div class="css-1nc5kzu">
                 <button on:click={()=> goto($url)} class="css-1ou4ub2">
                     <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                         <title>cross</title>
                         <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                             <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                         </g>
                     </svg>
                 </button>
             </div>
             <div class="css-1h2fqou">
                 <div class="css-lcqjyq">
                     <div class="css-1mo5975">
                         <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=deposit`)} class="{tab[1] === "deposit" ? "css-ak6yid" : "css-1otg8po"}">Deposit</button>
                         <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=withdraw`)} class="{tab[1] === "withdraw" ? "css-ak6yid" : "css-1otg8po"}">Withdraw</button>
                         <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=referral`)} class="{tab[1] === "referral" ? "css-ak6yid" : "css-1otg8po"}">Referrals</button>
                     </div>
                     <div class="css-1xat6c" style="display: none;">
                         <button class="css-lui29e">
                             <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" class="css-rrpfla">
                                 <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                             </svg>
                         </button>
                         <button class="css-lui29e">
                             <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" class="css-8adv44">
                                 <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                             </svg>
                         </button>
                     </div>
                 </div>
                 {#if tab[1] === "deposit"}
                    <Deposit wallet={wallet}/>
                 {/if}
                 {#if tab[1] === "withdraw"}
                    <Withdraw wallet={wallet} currency={tab[2]}/>
                {/if}
                {#if tab[1] === "referral"}
                    <Referral {referral}/>
                {/if}
             </div>
            </div>
     </button>
</div>




<style>

</style>