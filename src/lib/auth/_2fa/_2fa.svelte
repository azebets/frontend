<script>
    import { seaser} from "$lib/store/routes";
    import { device } from "$lib/store/profile";
    import { url} from "$lib/store/routes";
    import { goto } from "$app/navigation";
    let code = ''
    import { handleLoginUser } from "$lib/auth/hook"
    $: loading = false

    $: secret = $seaser[3] || ""
    $: email = $seaser[4] || ""
    $: user_id = $seaser[5] || ""
    $: password = $seaser[2] || ""

    $: devic = { ...$device, Login_time: new Date(), type :"Email Login"}
    const handleForgetPassword = (async()=>{
        loading = true
        const {response} = await handleLoginUser({password, email,user_id,code, secret, device:devic})
        if(response){
            goto($url)
        }
        loading = false
    })

    const trackCode = ((event)=>{
        if(event.length === 6){
            handleForgetPassword()
        }
    })

    // onMount(()=>{
    // const pasteButton = browser && document.querySelector('#paste-button');
    //     browser && pasteButton.addEventListener('click', async () => {
    //     try {
    //         code = await navigator.clipboard.readText()
    //         handleResposeMessages("success", "Copied")
    //         //  document.querySelector('textarea').value += text;
    //     } catch (error) {
    //         console.log('Failed to read clipboard');
    //     }
    //     });
    // })

</script>

<div class="css-1yogdko">
    <div class="css-xzyayo">
        <div class="css-1rmzzev" width="400">
            <div class="css-1nc5kzu">
                <button on:click={()=> history.back()} class="css-1ou4ub2">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                        <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                        </g>
                    </svg>
                </button>
            </div>
            
            <div class="codes">
                <p >Two factor Authentication</p>
                <!-- <p>Verification code</p> -->
                <div class="sc-cvZCdy hooaaA">
                    <div class="google-input">
                        <input on:keyup={(e)=> trackCode(e.target.value)} autocomplete="new-password" maxlength={6} type="password" bind:value={code} >
                        <ul >
                            <li class="{!code ? "active" : ""}">{code[0] || ""}</li>
                            <li class="{code.length === 1 ? "active" : ""}">{code[1] || ""}</li>
                            <li class="{code.length === 2 ? "active" : ""}">{code[2] || ""}</li>
                            <li class="{code.length === 3 ? "active" : ""}">{code[3] || ""}</li>
                            <li class="{code.length === 4 ? "active" : ""}">{code[4] || ""}</li>
                            <li class="{code.length === 5 ? "active" : ""}">{code[5] || ""}</li>
                        </ul>
                    </div>
                </div>
            </div>
           <div class="css-av8uu6">
            <!--     
                <div>
                    <label for="rollbit-field-146" class="css-1vec8iw">Code<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" placeholder="Enter code" id="rollbit-field-146" bind:value={code}>
                            <button id="paste-button" class="css-1psueex">paste</button>
                        </div>
                    </div>
                </div>-->
                <!-- <br>  -->

                <!-- <div class="css-8uluvh">
                    <button disabled={loading} on:click={handleForgetPassword} class="css-1psueex">
                        {#if loading}
                            <Loader color={"btn"}/>
                        {:else}
                            Proceed
                        {/if}
                    </button>
                </div> -->
            </div> 
        </div>
    </div>
</div>