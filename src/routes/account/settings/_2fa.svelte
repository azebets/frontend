<script>
    import "../../../styles/setting.css";
    import { user } from "$lib/store/profile";
    import { onMount } from "svelte";
    import { loading} from "$lib/store/activities";
    import {handleGenerateSecrete, handleverifyFA_Token} from "$lib/index";
    import Loader from "$lib/loader.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    let qrCode = '';
    let secret = '';
    let token = '';

    onMount(async () => {
        const response = await handleGenerateSecrete($user?.email)
        if(response){
            qrCode = response.qrCode;
            secret = response.secret;
        }
    });

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(secret);
            alert('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    const verification = (async()=>{
        if(!$loading){
            const response = await handleverifyFA_Token({token, secret },$user.user_id)
            if(response){
                dispatch("response", response)
            }
        }
    })

    function handleClickOutside(event) {
        if (!event.target.closest('.css-1bws6us')) {
             dispatch("close")
        }
    }

</script>

<div id="rollbit-modal-popover-container">
   <div class="css-1yogdko">
        <button class="css-xzyayo" >
            <div class="css-1bws6us" width="600" >
                <div class="css-1nc5kzu">
                    <button on:click={()=> dispatch("close")} class="css-1ou4ub2">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>cross</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                {#if !$loading}
                <div class="css-1mz1qbe">
                    <h1 class="css-rhqiop">Set up Google Authenticator</h1>
                    <div class="css-1u1hdo2">1. Download the Google Authenticator app for iPhone or Android</div>
                    <div class="css-1u1hdo2">2. Save the following Account Token (Key) in a secure place</div>
                    <div>
                        <label for="rollbit-field-182" class="css-1vec8iw">Account Token (Key)</label>
                        <div>
                            <div class="css-14hgewr">
                                <input type="text" readonly id="rollbit-field-182" value="{secret}">
                                <button on:click={copyToClipboard} class="css-suhvqt">Copy</button>
                            </div>
                        </div>
                    </div>
                    <p>You will need your Account Token (Key) above to access your account in case you lose your phone.</p>
                    <div class="css-1u1hdo2">3. Scan QR Code with the Google Authenticator app</div>
                    <img src="{qrCode}" alt="qrcode" style="margin-bottom: 30px;">
                    <div class="css-1u1hdo2">4. Enter the Token below</div>
                    <form on:submit|preventDefault={verification}>
                        <div>
                            <label for="rollbit-field-183" class="css-1vec8iw">2FA Code<span class="css-1vr6qde"> *</span></label>
                            <div>
                                <div class="css-14hgewr">
                                    <input type="text" name="passcode" placeholder="Enter code" autocomplete="off" id="rollbit-field-183" bind:value={token}>
                                </div>
                            </div>
                        </div>
                        <button on:click={verification} disabled={token.length !== 6} class="css-1psueex button" type="submit" style="margin-top: 20px;">Enable 2FA</button>
                    </form>
                </div>
                {:else}
                <div style="height: 60vh;">
                    <Loader />
                </div>
                   
                {/if}
            </div>
        </button>
   </div>
</div>

<style>
   
</style>