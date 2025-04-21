<script>
    import { createRefCode , referralCode} from "$lib/index";
    import { handleAuthToken } from "$lib/store/routes";
    import { clientUrl } from "$lib/backendUrl";
    import { onMount } from "svelte";
    import Loader from "$lib/loader.svelte";

    $: isloading = false
    let code = ""
    $: track = !code || isloading
    $: referralData = []

    const handleSubmit = (async()=>{
        isloading = true
       const {response, load} = await createRefCode($handleAuthToken, code)
       if(response){
            referralData = response
       }
       isloading = load
       code = ''
    })

    onMount(async()=>{
        referralData = await referralCode($handleAuthToken)
    })

$: isCopied = false
 function copyTextToClipboard(text) {
    let link = `${clientUrl()}/?tab=auth&modal=login&ref=${text}`
    navigator.clipboard.writeText(link).then(function() {
    isCopied = true
    setTimeout(()=>{
        isCopied = false
    },5000)
    }, function(err) {
      console.error('Error copying text: ', err);
    });
  }

</script>


<div class="css-1vuvc25">
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <div>
                <div class="css-1f51ttt">
                    <input type="text" name="code" placeholder="Create new referral code" bind:value={code}>
                    <button class="css-vmbe4r button" disabled={track} type="submit" style="margin-right: 4px;">{isloading ? "Loading..." : "Create"}</button>
                </div>
            </div>
        </div>
    </form>
</div>

{#if !isloading}
{#if referralData.length !== 0}
<div class="css-1mwdm11">
    <!-- <div id="rollbit-modal-popover-container">
        <div class="css-29gh6u" style="height: 33.1979px; max-height: 33.1979px; top: 517.708px; left: 349.589px;">
            <div class="css-1nrrr26">
                Copy
                <div class="css-97vfs4" style="left: 14.0938px;"></div>
            </div>
        </div>
    </div> -->
    <table class="css-wcq858">
        <thead class="css-oe1okv">
            <tr>
                <th class="css-1d17pqc">
                    <div>Code</div>
                </th>
                <th class="css-1n6eoad">
                    <div>Users</div>
                </th>
                <th class="css-1n6eoad">
                    <div>Wagered</div>
                </th>
                <th class="css-1n6eoad">
                    <div>Claimed</div>
                </th>
                <th class="css-1n6eoad">
                    <div>Available</div>
                </th>
                <th class="css-1n6eoad">
                    <div>%</div>
                </th>
                <th class="css-1n6eoad">
                    <div>Link</div>
                </th>
            </tr>
        </thead>
        <tbody class="css-13107in">
            {#each referralData as data}
            <tr class="css-1k5q1yl">
                <td class="css-1nwtsan">
                    <div>{data?.code}</div>
                </td>
                <td class="css-rja9yq">
                    <div>{data?.user}</div>
                </td>
                <td class="css-rja9yq">
                    <div>${(parseFloat(data?.wager)).toFixed(2)}</div>
                </td>
                <td class="css-rja9yq">
                    <div>${(parseFloat(data?.claimed)).toFixed(2)}</div>
                </td>
                <td class="css-rja9yq">
                    <div>${(parseFloat(data?.available)).toFixed(2)}</div>
                </td>
                <td class="css-rja9yq">
                    <div>10%</div>
                </td>
                <td class="css-rja9yq">
                    <div>
                        {#if isCopied}
                            <span style="background: rgb(39, 43, 56); color:#b1b6c6; font-size: 11px; padding: 5px">copied</span> 
                        {/if}
                        {#if !isCopied}
                            <button on:click={()=> copyTextToClipboard(data?.code)} class="css-3ile2c">
                                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="18" class="css-oluyn3">
                                    <g id="link" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(3.000000, 3.000000)" fill="currentColor" fill-rule="nonzero" id="Path">
                                            <path d="M7.023,10.368 L6.103,11.288 C5.15466384,12.143027 3.70288438,12.1058147 2.79959713,11.2033266 C1.89630988,10.3008385 1.8578127,8.84909256 2.712,7.9 L3.632,6.98 C4.02522674,6.58732554 4.02567446,5.95022674 3.633,5.557 C3.24032554,5.16377326 2.60322674,5.16332554 2.21,5.556 L1.291,6.476 C-0.430195423,8.19719542 -0.430195423,10.9878046 1.291,12.709 C3.01219542,14.4301954 5.80280458,14.4301954 7.524,12.709 L8.444,11.79 C8.83667445,11.3976017 8.8368983,10.7611745 8.44449999,10.3685 C8.05210168,9.97582556 7.41567446,9.9756017 7.023,10.368 Z"></path>
                                            <path d="M7.711,4.868 L4.868,7.711 C4.4756017,8.10339832 4.4756017,8.73960168 4.86800001,9.13199999 C5.26039832,9.5243983 5.89660168,9.5243983 6.289,9.132 L9.132,6.289 C9.5243983,5.89660168 9.5243983,5.26039832 9.13199999,4.86800001 C8.73960168,4.4756017 8.10339832,4.4756017 7.711,4.868 L7.711,4.868 Z"></path>
                                            <path d="M12.709,1.291 C11.8825044,0.464355626 10.7614465,-6.08558574e-05 9.5925,-6.08558574e-05 C8.4235535,-6.08558574e-05 7.30249561,0.464355626 6.476,1.291 L5.556,2.21 C5.16332554,2.60239831 5.16310169,3.23882554 5.5555,3.6315 C5.94789831,4.02417446 6.58432554,4.02439831 6.977,3.632 L7.897,2.712 C8.84533616,1.856973 10.2971156,1.89418525 11.2004029,2.79667337 C12.1036901,3.69916148 12.1421873,5.15090744 11.288,6.1 L10.368,7.02 C9.97477328,7.41267446 9.97432558,8.04977324 10.367,8.44299998 C10.7596745,8.83622671 11.3967733,8.83667443 11.79,8.444 L12.709,7.524 C13.5356444,6.69750439 14.0000609,5.5764465 14.0000609,4.4075 C14.0000609,3.2385535 13.5356444,2.11749561 12.709,1.291 L12.709,1.291 Z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        {/if}
                    </div>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}

{#if referralData.length === 0}
<div class="css-57x4g4">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" size="28" class="css-1ghf8pm">
        <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"></path>
    </svg>
    <div color="text3" size="14" class="css-1ippc9u">No referral codes found</div>
</div>
{/if}
{/if}

{#if isloading}
    <div class="css-57x4g4">
        <Loader />
    </div>
{/if}

<style>
   
</style>