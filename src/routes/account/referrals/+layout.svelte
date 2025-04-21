<script>
  import { url } from "$lib/store/routes";
</script>

<div class="css-1tizvjc">
    <div class="css-t3di03">Refer Friends And Get Rewarded</div>
    <div class="css-1mqv0a7">
        <div>
            <div class="css-1j76v2v">Total Wagered</div>
            <div class="css-1dpm5lj">$0.00</div>
        </div>
        <div>
            <div class="css-1j76v2v">Total Commission</div>
            <div class="css-1dpm5lj" style="color: rgb(114, 242, 56);">$0.00</div>
        </div>
    </div>
    <button class="css-1wit1e6 button" disabled  style="min-width: 240px;">Nothing to Claim</button>
</div>

<div class="css-uqeajf" style="margin-bottom: 16px;">
    <div class="css-1mo5975">
        <a href="/account/referrals/codes">
            <div class="{$url === "/account/referrals/codes" ? "css-1rfdaqx" : "css-8nql6g"}">Referral Codes</div>
        </a>
        <a href="/account/referrals/users">
            <div class="{$url === "/account/referrals/users" ? "css-1rfdaqx" : "css-8nql6g"}">Referred Users</div>
        </a>
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

<slot></slot>

<style>
   
</style>