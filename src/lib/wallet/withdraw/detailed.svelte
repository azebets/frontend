<script>
    export let activeCoin;
    const logo = new URL('../../../lib/images/Cyclix Games Casino - Coin Logo 3D.png', import.meta.url).href
    import { goto } from "$app/navigation"
    import { url } from "$lib/store/routes";
</script>

<h1 class="css-mpks89">
    <button on:click={()=> history.back()} class="css-bofapj">
        <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="9" color="#fff" class="css-6opzgw">
            <title>arrow</title>
            <g id="arrow" fill-rule="currentColor">
                <path d="M8,12.534 C8.00312077,12.1491981 7.86017338,11.7775349 7.6,11.494 L3.348,7 L7.6,2.506 C8.14019021,1.91980519 8.14019021,1.01719481 7.6,0.431 C7.34808121,0.156127315 6.99235127,-0.000378973093 6.6195,-0.000378973093 C6.24664873,-0.000378973093 5.89091879,0.156127315 5.639,0.431 L0.407,5.963 C-0.135688789,6.54706274 -0.135688789,7.45093726 0.407,8.035 L5.634,13.569 C5.88591879,13.8438727 6.24164873,14.000379 6.6145,14.000379 C6.98735127,14.000379 7.34308121,13.8438727 7.595,13.569 C7.8548547,13.2872672 7.99785194,12.9172619 7.995,12.534" id="Arrow-left-1"></path>
            </g>
        </svg>
    </button>
    <img src="{activeCoin?.coin_image}" alt="" size="32" class="css-bzek24">
    Withdraw Bitcoin
    <button on:click={()=> goto(`/account/withdrawals?tab=${(activeCoin.coin_name).toLowerCase()}`)} class="css-1w9eatj">View Transactions</button>
</h1>

<div class="css-1slrani">
    <form>
        <div class="css-1x7hz3d">Please enter the {activeCoin?.fullname} wallet address you wish to receive the funds on. Once confirmed, the withdrawal is usually processed within a few minutes.</div>
        <div style="height: 8px;"></div>
        <div>
            <label for="rollbit-field-11131" class="css-1vec8iw">Receiving {activeCoin?.fullname} address<span class="css-1vr6qde"> *</span></label>
            <div>
                <div class="css-1f51ttt">
                    <input type="text" name="address" placeholder="Paste your {activeCoin?.fullname} wallet address here" id="rollbit-field-11131" value="">
                </div>
            </div>
        </div>
        <div style="height: 24px;"></div>
        <label for="rb-withdraw-amount" class="css-1vec8iw">Withdrawal amount<span class="css-1vr6qde"> *</span></label>
        <div class="css-191t7fp">
            <div style="width: 100%;">
                <div>
                    <div class="css-1f51ttt">
                        <img src="{logo}" size="20" alt="" class="css-1vhuwci" style="margin-right: 10px; margin-bottom: -2px;">
                        <div class="css-azvonf" style="font-size: 17px;">$</div>
                        <input type="text" name="amountUSD" id="rb-withdraw-amount" value="">
                    </div>
                </div>
            </div>
            <div class="css-kaz972">=</div>
            <div style="width: 100%;"><div>
                <div class="css-1f51ttt">
                    <img src="{activeCoin?.coin_image}" alt
                     size="20" class="css-1lgqybz" style="margin-right: 10px;">
                     <input type="text" name="amountCrypto" value="">
                    </div>
                </div>
            </div>
            <button class="css-wrt0jz" type="submit">Request withdrawal</button>
        </div>
        <div class="css-g5wbxx">Network Fee: $2.05</div>
    </form>
    <div class="css-1x7hz3d" style="font-size: 12px; margin: 16px 0px 0px;">*You will receive the specified {activeCoin?.fullname} amount to your withdrawal address<br>*The value subtracted from your balance may vary between now and the time we process your withdrawal</div>
</div>

<style>
   
</style>