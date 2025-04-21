<script>
    import { handleChangeEmailOtp, handleChangeEmail, handleEMailChange} from "$lib/index";
    import { handleResposeMessages } from "$lib/store/activities";
    import { user } from "$lib/store/profile";
    import { handleAuthToken} from "$lib/store/routes";
    import { changeotp } from "$lib/store/routes";
    import Loader from "$lib/loader.svelte";
    export let respose

    let new_email = ""
    let old_email = ""
    $: checkEmailLoad = false
    let code = ""
    $: showWarning = false
    $: trackEmailChange = !new_email || !old_email
    let wsRegex = /\s/g;
    code.replace(wsRegex, "").replace(/,/g, ", ");

    $: loadConfirmAndSendCode = false
    const ConfirmAndSendCode = (async()=>{
        loadConfirmAndSendCode = true
        const {isLoading, response} = await handleChangeEmailOtp($user?.user_id, {old_email, new_email})
        if(response){
            showWarning = false
        }
        loadConfirmAndSendCode = isLoading
    })

    const handleCheckEmail = (async()=>{
        if(!respose?.fa_auth){
            handleResposeMessages("error", "Enable Two-Factor Authentication")
        }
        else{
            if(!checkEmailLoad){
                checkEmailLoad = true
                const {response, isLoading} = await handleEMailChange($handleAuthToken, {old_email, new_email})
                if(response){
                    showWarning = true
                }
                checkEmailLoad = isLoading
            }
        }
    })

    let _2faCode = ''
    let _otpCode = ''

    const pasteText = (async(event)=>{
        if(event === "otp"){
            _otpCode = await navigator.clipboard.readText()
        }
        if(event === "_2fa"){
            _2faCode = await navigator.clipboard.readText()
        }
    })

    $: trackSubmitChangeAddress = !_otpCode || !_2faCode
    let LoadSubmitChangeAddress = false
    const handleSubmitChangeAddress = (async()=>{
        LoadSubmitChangeAddress = true
        const {isLoading, response} = await handleChangeEmail($user?.user_id,{_otpCode:_otpCode.replace(wsRegex, "").replace(/,/g, ", "), _2faCode:_2faCode.replace(wsRegex, "").replace(/,/g, ", "), _faToken:respose?.fa_secrete, token:$changeotp})
        LoadSubmitChangeAddress = isLoading
    })

</script>
{#if showWarning}
<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <button class="css-xzyayo" >
            <div class="css-1bws6us" style="width: 400px; padding:40px">
                <div class="css-1nc5kzu2" >
                    <button class="css-1ou4ub2" style="top: 0;">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <h4>Note: For security reasons, withdrawals will be paused for 24 hours following an email change.</h4>
                <button on:click={ConfirmAndSendCode}  class="css-1psueex button" style="margin-top: 24px;">
                {#if !loadConfirmAndSendCode}
                    I understand, and proceed.
                {:else}
                   Loading <Loader color={"btn"}/>
                {/if}
               
            </button>
            </div>
        </button>
    </div>
</div>
{/if}


<div class="css-t60dms">
    <div class="css-1d7om45">
        <h3 class="css-qgoclk" style="margin: 0px; font-size:12px">Change Email <span style="color:blueviolet; font-size:11px">{$user?.email.slice(0,3)}******{$user?.email.slice(-9)}</span> </h3>
        <div class="css-1w9eatj" style="margin-right: auto;"></div>
        <div class="css-1cb76gi">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" color="currentColor" xml:space="preserve" size="16" class="css-1hu26ay" style="color: {$user?.emailIsVerified ? "rgb(114, 242, 56)" : "rgb(94, 98, 111)"} ; margin-right: 8px;">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
            </svg>
            <div>{$user?.emailIsVerified ? "Verified" : "Unverified"}</div>
        </div>
    </div>

{#if !$changeotp}
    <form on:submit|preventDefault={handleCheckEmail}>
        <div style="margin-top:15px;">
            <label for="rollbit-field-9923" class="css-1vec8iw">Old email</label>
            <div>
                <div class="css-1f51ttt">
                    <input type="text" name="email" placeholder="old_email@domain.com" id="rollbit-field-9923" bind:value={old_email}>
                </div>
            </div>
        </div>
        <div style="margin-top:15px;">
            <label for="rollbit-field-9923" class="css-1vec8iw">New email</label>
            <div>
                <div class="css-1f51ttt">
                    <input type="text" name="email" placeholder="new_email@domain.com" id="rollbit-field-9923" bind:value={new_email}>
                </div>
            </div>
        </div>
        <button disabled={trackEmailChange} class="css-1psueex button" style="margin-top: 24px;">
            {#if !checkEmailLoad}
                Change email 
            {:else}
               Loading <Loader color={"btn"}/>
            {/if}
        </button>
    </form>
{/if}

{#if $changeotp}
    <div>
        <div>
            <div>
                <label for="rollbit-field-9923" class="css-1vec8iw">Enter code from your email</label>
                <div class="css-1f51ttt">
                    <input type="text" name="text" placeholder="Enter code from your email" id="rollbit-field-9923" bind:value={_otpCode}>
                    <button class="css-vmbe4r button" on:click={()=> pasteText("otp")}  type="submit" style="margin-right: 4px;">Paste</button> 
                </div>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <div>
                <label for="rollbit-field-9923" class="css-1vec8iw">Two-Factor Authentication</label>
                <div class="css-1f51ttt">
                    <input type="text" name="text" placeholder="Enter code " id="rollbit-field-9923" bind:value={_2faCode}>
                    <button class="css-vmbe4r button" on:click={()=> pasteText("_2fa")} type="submit" style="margin-right: 4px;">Paste</button> 
                </div>
            </div>
        </div>
        <button disabled={trackSubmitChangeAddress} on:click={handleSubmitChangeAddress} class="css-1psueex button" style="margin-top: 24px;">
            {#if !LoadSubmitChangeAddress}
                Change email 
            {:else}
               Loading <Loader color={"btn"}/>
            {/if}
        </button>
    </div>
{/if}

</div>

<style>
.css-1nc5kzu2{
    position: absolute;
    z-index: 2;
    transform: translate(-20px, 26px);
    top: -14px;
    right: 0;
    height: 0px;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
}
</style>