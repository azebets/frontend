<script>
    import { handlePasswordChange, handlePasswordValidation} from "$lib/auth/hook";
    import Loader from "$lib/loader.svelte";
    import { createEventDispatcher } from "svelte";
    import { handleResposeMessages } from "$lib/store/activities";
    import { handleAuthToken } from "$lib/store/routes";
    const dispatch = createEventDispatcher();
    export let respose

    let oldPassword = ""
    let newPassword = ""
    $: passwordLoad = false 
    let _2faCode = ""
    $: finale = false
    $: showWarning = false

    const handleChangePasswordEl = (async()=>{
        passwordLoad = true
        const data = await handlePasswordChange($handleAuthToken, {_2faCode, newPassword})
        if(data.response){
            showWarning = false
            finale = false
        }
        passwordLoad = data?.isLoading
    })

    let showPassword = false;
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    let showPassword1 = false;
    function togglePasswordVisibility1() {
        showPassword1 = !showPassword1;
    }

    const pasteText = (async(event)=>{
         _2faCode = await navigator.clipboard.readText()
    })

    $: loadVerifyPassword = false
    $: OldpasswordTrack =  loadVerifyPassword || !newPassword
    const handlepassword = (async()=>{
        loadVerifyPassword = true
        if(!respose?.fa_auth){
            handleResposeMessages("error", "Enable Two-Factor Authentication")
            dispatch("_2fa")
            loadVerifyPassword = false
          return 
        }
        else{
            const {response, isLoading} = await handlePasswordValidation($handleAuthToken, {oldPassword, newPassword})
            if(response){
                showWarning = true
            }
            loadVerifyPassword = isLoading
        }
    })

    const handleClearWarning = (()=>{
        showWarning = false
        finale =!finale
    })
</script>

{#if finale}
<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <div class="css-xzyayo" >
            <div class="css-1bws6us" style="width: 400px; padding:40px">
                <div class="css-1nc5kzu2" >
                    <button on:click={()=> finale =! finale}  class="css-1ou4ub2 fLASqZ" style="top: 0;">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
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
                <button on:click={handleChangePasswordEl} disabled={passwordLoad}  class="css-1psueex button" style="margin-top: 24px;">
                Proceed
                {#if passwordLoad}
                 <Loader color={"btn"}/>
                {/if}
            </button>
            </div>
        </div>
    </div>
</div>
{/if}

{#if showWarning}
<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <button class="css-xzyayo" >
            <div class="css-1bws6us" style="width: 400px; padding:40px">
                <div class="css-1nc5kzu2" >
                    <button on:click={()=> showWarning = false} class="css-1ou4ub2 fLASqZ" style="top: 0;">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <h4>Note: For security reasons, withdrawals will be paused for 24 hours following an password change.</h4>
                <button on:click={handleClearWarning}  class="css-1psueex button" style="margin-top: 24px;">
                I understand, and proceed.
            </button>
            </div>
        </button>
    </div>
</div>
{/if}

<div class="css-t60dms">
    <h3 class="css-qgoclk">Change password</h3>
        {#if respose?.login_type !== "google"}
        <div>
            <label for="rollbit-field-9925" class="css-1vec8iw">Old Password<span class="css-1vr6qde"> *</span></label>
            <div>
                <div class="css-1f51ttt">
                    {#if !showPassword}
                    <input type="password" name="newpass" placeholder="{respose?.login_type !== "google" ? "Old Password" : "Create a password"}" id="rollbit-field-9926" bind:value={oldPassword}>
                {/if}
                {#if showPassword}
                    <input type="text" name="newpass" placeholder="{respose?.login_type !== "google" ? "New Password" : "Create a password"}" id="rollbit-field-9926" bind:value={oldPassword}>
                {/if}
                    <button on:click={()=> togglePasswordVisibility("pass")} class="css-u44gsswwe"
                        aria-label={showPassword ? 'Hide password' : 'Show password'} >
                        {#if !showPassword}
                          <!-- Eye Open Icon -->
                          <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 32c6.63-11.67 18.48-19.45 32-19.45S57.37 20.33 64 32c-6.63 11.67-18.48 19.45-32 19.45S6.63 43.67 0 32Zm18.19 0c0 7.66 6.21 13.87 13.87 13.87h.01c7.654 0 13.86-6.206 13.86-13.86V32c0-7.66-6.21-13.87-13.87-13.87-7.66 0-13.87 6.21-13.87 13.87Zm13.87 8.2a8.2 8.2 0 0 0 0-16.4 8.2 8.2 0 0 0 0 16.4Z"></path></svg>
                        {:else}
                          <!-- Eye Closed Icon -->
                          <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M47.7 47.72 3.86 3.89.12 7.63l11.51 11.51C6.858 22.546 2.954 26.852.102 31.836L0 32.03C6.63 43.7 18.48 51.48 32 51.48h.012c3.613 0 7.095-.56 10.367-1.593L52.602 60.11l3.74-3.74-8.64-8.64-.002-.01ZM32.06 45.9c-7.656-.012-13.86-6.222-13.86-13.88 0-1.9.382-3.712 1.074-5.362l-.034.092 4.66 4.65v.63a8.2 8.2 0 0 0 8.2 8.2h.63l4.65 4.65c-1.544.646-3.336 1.02-5.218 1.02h-.102Zm0-27.74h.002c7.66 0 13.87 6.21 13.87 13.87 0 1.904-.384 3.72-1.079 5.373l-.003-.003-.034.09.037-.087 7.527 7.527c4.764-3.414 8.664-7.722 11.518-12.706L64 32.03c-6.63-11.67-18.48-19.45-32-19.45a34.73 34.73 0 0 0-10.616 1.668l.246-.068 5.07 5.06c1.582-.682 3.424-1.08 5.36-1.08Zm8.16 14.61-8.9-8.9.033-.003a8.76 8.76 0 0 1 .667-.037 8.2 8.2 0 0 1 8.2 8.2v.74Z"></path></svg>
                        {/if}
                    </button>
                </div>
            </div>
        </div>
        <br>
        {/if}
        <div>
            <label for="rollbit-field-9926" class="css-1vec8iw">{respose?.login_type !== "google" ? "New Password" : "Create a password"}<span class="css-1vr6qde"> *</span></label>
            <div>
                <div class="css-1f51ttt">
                {#if !showPassword1}
                    <input type="password" name="newpass" placeholder="{respose?.login_type !== "google" ? "New Password" : "Create a password"}" id="rollbit-field-9926" bind:value={newPassword}>
                {/if}
                {#if showPassword1}
                    <input type="text" name="newpass" placeholder="{respose?.login_type !== "google" ? "New Password" : "Create a password"}" id="rollbit-field-9926" bind:value={newPassword}>
                {/if}
               
                <button on:click={()=> togglePasswordVisibility1("pass")} class="css-u44gsswwe"
                    aria-label={showPassword1 ? 'Hide password' : 'Show password'} >
                    {#if !showPassword1}
                      <!-- Eye Open Icon -->
                      <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 32c6.63-11.67 18.48-19.45 32-19.45S57.37 20.33 64 32c-6.63 11.67-18.48 19.45-32 19.45S6.63 43.67 0 32Zm18.19 0c0 7.66 6.21 13.87 13.87 13.87h.01c7.654 0 13.86-6.206 13.86-13.86V32c0-7.66-6.21-13.87-13.87-13.87-7.66 0-13.87 6.21-13.87 13.87Zm13.87 8.2a8.2 8.2 0 0 0 0-16.4 8.2 8.2 0 0 0 0 16.4Z"></path></svg>
                    {:else}
                      <!-- Eye Closed Icon -->
                      <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M47.7 47.72 3.86 3.89.12 7.63l11.51 11.51C6.858 22.546 2.954 26.852.102 31.836L0 32.03C6.63 43.7 18.48 51.48 32 51.48h.012c3.613 0 7.095-.56 10.367-1.593L52.602 60.11l3.74-3.74-8.64-8.64-.002-.01ZM32.06 45.9c-7.656-.012-13.86-6.222-13.86-13.88 0-1.9.382-3.712 1.074-5.362l-.034.092 4.66 4.65v.63a8.2 8.2 0 0 0 8.2 8.2h.63l4.65 4.65c-1.544.646-3.336 1.02-5.218 1.02h-.102Zm0-27.74h.002c7.66 0 13.87 6.21 13.87 13.87 0 1.904-.384 3.72-1.079 5.373l-.003-.003-.034.09.037-.087 7.527 7.527c4.764-3.414 8.664-7.722 11.518-12.706L64 32.03c-6.63-11.67-18.48-19.45-32-19.45a34.73 34.73 0 0 0-10.616 1.668l.246-.068 5.07 5.06c1.582-.682 3.424-1.08 5.36-1.08Zm8.16 14.61-8.9-8.9.033-.003a8.76 8.76 0 0 1 .667-.037 8.2 8.2 0 0 1 8.2 8.2v.74Z"></path></svg>
                    {/if}
                </button>
                </div>
            </div>
        </div>
        <button class="css-1psueex button" on:click={handlepassword} disabled={OldpasswordTrack} type="submit"  style="margin-top: 24px;">
            {respose?.login_type === "google" ? "Set password" : "Change password"} 
            {#if loadVerifyPassword}
               <Loader color={"btn"} />
            {/if}
        </button>
</div>