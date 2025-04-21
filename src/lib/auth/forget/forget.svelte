<script>
    import { url} from "$lib/store/routes";
    import { goto } from "$app/navigation";
    let email = ''
    import { handleRequestForgetPassword } from "$lib/auth/hook"
    import Loader from "../../loader.svelte";
    $: loading = false
    $: showWarning = false
    
    const handleForgetPassword = (async()=>{
        loading = true
        const {response} = await handleRequestForgetPassword(email)
        loading = false
        goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=reset&osp=${response?.hash}&id=${response.Emailexist?.user_id}&deal=${response.Emailexist?.email}`)
        showWarning = false
    })

    $: track = loading || !email
    const handleForgetPasswordEl = (()=>{
        loading = true 
        setTimeout(()=>{
            showWarning = true
            loading = false 
        },3000)
    })

</script>

{#if showWarning}
<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <button class="css-xzyayo" >
            <div class="css-1bws6us" style="width: 400px; padding:40px">
                <div class="css-1nc5kzu2" >
                    <button on:click={()=> showWarning = false} class=" fLASqZ" style="top: 0;">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <h4>Note: For security reasons, withdrawals will be paused for 24 hours following an password change.</h4>
                <button disabled={loading} on:click={handleForgetPassword}  class="css-1psueex button" style="margin-top: 24px;">
             
                {#if loading}
                <Loader color={"btn"}/>
            {:else}
            I understand, and proceed.
            {/if}
            </button>
            </div>
        </button>
    </div>
</div>
{/if}

{#if !showWarning}
<div class="css-1yogdko">
    <div class="css-xzyayo">
        <div class="css-1rmzzev" width="400">
            <div class="css-1nc5kzu">
                <button on:click={()=> history.back()} class="css-1ou4ub2 ">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                        <title>cross</title>
                        <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="css-av8uu6">
                <h1 class="css-rhqiop">Forgot Password?</h1>
                <div>
                    <label for="rollbit-field-146" class="css-1vec8iw">Email<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" placeholder="youremail@domain.com" id="rollbit-field-146" bind:value={email}>
                        </div>
                    </div>
                    <div class="css-g5wbxx">Enter your email to reset your Password.</div>
                </div>
                <div class="css-8uluvh">
                    <button disabled={track} on:click={handleForgetPasswordEl} class="css-1psueex button">
                        {#if loading}
                            <Loader color={"btn"}/>
                        {:else}
                            Reset Password
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}
