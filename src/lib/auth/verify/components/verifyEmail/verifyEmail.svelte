<script>
    import { browser } from '$app/environment'
        import { handleVerifyEmail } from "../../../../auth/hook"
    import { onMount } from 'svelte';
    import { handleAuthToken} from "$lib/store/routes";
    import { url } from "$lib/store/routes";
    import Loader from "$lib/loader.svelte"
    import { seaser } from "$lib/store/routes";
    import { goto } from "$app/navigation"

    let code = ""
    $: loading = false
    $: track = !code 
    $: token = $seaser[1]

    const handleEmail = (async()=>{
        loading = true
        const response = await handleVerifyEmail(code, token, $handleAuthToken)
        loading = false
        if(response){
            goto($url)
        }
    })

    onMount(()=>{
    const pasteButton = browser && document.querySelector('#paste-button');
        browser && pasteButton.addEventListener('click', async () => {
        try {
            code = await navigator.clipboard.readText()
        } catch (error) {
            console.log('Failed to read clipboard');
        }
        });
    })
</script>

<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <button class="css-xzyayo" style="cursor: auto;">
            <div class="css-1bws6us" style="width: 400px; padding:40px">
                <div class="css-1nc5kzu2" >
                    <button class="css-1ou4ub2 fLASqZ" style="top: 0;">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div>
                    <h1 class="css-rhqiop">One-Time password</h1>
                    <label for="rollbit-field-5728" class="css-1vec8iw"></label>
                    <div>
                        <div class="css-1f51ttt">
                            <input name="name" placeholder="Enter code" id="rollbit-field-5728" bind:value={code}>
                            <button id="paste-button" class="css-vmbe4r button" type="submit" style="margin-right: 4px;">Paste code</button>
                        </div>
                    </div>
                </div>
                <label for="rollbit-field-5728" class="css-1vec8iw"></label>
                <button disabled={track} on:click={handleEmail} class="css-1psueex button" style="margin: 16px 0px; width:100%">
                    Submit
                    {#if loading}
                        <Loader color={"btn"} />
                    {/if}
                </button>
            </div>
        </button>
    </div>
</div>