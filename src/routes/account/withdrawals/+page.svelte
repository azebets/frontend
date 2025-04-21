<script>
     import { seaser, url } from "$lib/store/routes";
     import { goto } from "$app/navigation";
     $: tab = $seaser[0]
</script>

<div class="css-uqeajf">
    <div class="css-1mo5975">
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=btc`)} class="{tab === "btc" ? "css-ak6yid" : "css-1otg8po"}">BTC</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=eth`)} class="{tab === "eth" ? "css-ak6yid" : "css-1otg8po"}">ETH</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=ltc`)} class="{tab === "ltc" ? "css-ak6yid" : "css-1otg8po"}">LTC</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=sol`)} class="{tab === "sol" ? "css-ak6yid" : "css-1otg8po"}">SOL</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=trx`)} class="{tab === "trx" ? "css-ak6yid" : "css-1otg8po"}">TRX</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=usdt`)} class="{tab === "usdt" ? "css-ak6yid" : "css-1otg8po"}">USDT</button>
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

<div class="css-57x4g4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" size="28" class="css-1ghf8pm"><path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"></path></svg><div color="text3" size="14" class="css-1ippc9u">No entries</div></div>

<style>
   
</style>