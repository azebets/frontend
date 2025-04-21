<script>
$: showData = false
$: isIncoming = false
</script>

<div class="css-t60dms">
    <div class="css-1sg2lsz">
        <h3 class="css-qgoclk" style="margin: 0px auto 0px 0px;">Tips</h3>
        <button on:click={()=> showData =! showData } class="{!showData ? "css-vmbe4r" : "css-1umvd96"}">{!showData ? "Show" : "Hide"}</button>
    </div>
    {#if showData}
    <div style="margin-top: 24px;">
        <div class="css-uqeajf">
            <div class="css-1mo5975">
                <button on:click={()=> isIncoming = false} class="{!isIncoming ? "css-ak6yid" : "css-1otg8po"}">Outgoing</button>
                <button  on:click={()=> isIncoming = true} class="{isIncoming ? "css-ak6yid" : "css-1otg8po"}">Incoming</button>
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
        <div class="css-57x4g4" style="padding: 12px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" size="28" class="css-1ghf8pm">
                <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"></path>
            </svg>
            <div color="text3" size="14" class="css-1ippc9u">You haven't sent any tips yet</div>
        </div>
    </div>
    {/if}

</div>

<style>
.css-uqeajf {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 6px;
    max-width: 100%;
    margin-bottom: 16px;
}
.css-1umvd96 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    transition: all 0.1s ease 0s;
    appearance: none;
    border: none;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    height: 30px;
    padding: 0px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
    text-transform: none;
    color: rgb(177, 182, 198);
    background: rgba(203, 215, 255, 0.075);
}
</style>