<script>
   import { user } from "$lib/store/profile";
   import {fetchSumsub, updateVerifiedStatus} from "$lib/index";
   import { handleAuthToken } from "$lib/store/routes";
    import { onMount } from "svelte";
    $: isDoc = false
    $: token = ""

    function launchWebSdk(accessToken, applicantEmail, applicantPhone) {
    let snsWebSdkInstance = snsWebSdk
        .init(accessToken, () => getNewAccessToken())
        .withConf({
            lang: "en",
            email: applicantEmail,
            phone: applicantPhone,
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true })
        .on("idCheck.onStepCompleted", (payload) => {
            setVerifiedStatus(true)
            console.log("onStepCompleted", payload);
        })
        .on("idCheck.onError", (error) => {
            setVerifiedStatus(false)
            console.log("onError", error);
        })
        .onMessage((type, payload) => {
            console.log("onMessage", type, payload);
            if(payload.applicantId){
                console.log("I've gotten you", payload.applicantId)
            }
        })
        .build();
    snsWebSdkInstance.launch("#sumsub-websdk-container");
}

onMount(async()=>{
    const response = await fetchSumsub($handleAuthToken)
    token = response?.token
})

// Requests a new access token from the backend side.
async function getNewAccessToken() {
    let newToken = await fetchSumsub($handleAuthToken)
    return Promise.resolve(newToken);
}
/**
 * Set verified flag to backend
 */
async function setVerifiedStatus(status=false) {
    let stats = await updateVerifiedStatus(status)
    return Promise.resolve(stats);
}

const handleSubmitdoc = (async()=>{
    isDoc = true
    setTimeout(()=>{
        launchWebSdk(token)
    },3000)
})

    
</script>



<div class="css-pd9vm2">
    <div class="css-1dxqvt0">Upload a picture of your ID document</div>
    {#if $user?.emailIsVerified}
        <button on:click={handleSubmitdoc} class="css-1psueex" style="margin: 16px 0px;">Submit Documentation</button>
    {/if}


    {#if isDoc}
        <div id="rollbit-modal-popover-container">
            <div class="css-1yogdko" >
                <button class="css-xzyayo" >
                    <div class="css-1bws6us" width="600">
                        <div class="css-1nc5kzu">
                            <button on:click={()=> isDoc = false} class="css-1ou4ub2">
                                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                                    <title>Close</title>
                                    <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div style="width: 100%;" id="sumsub-websdk-container"></div>  
                    </div>     
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
   
</style>