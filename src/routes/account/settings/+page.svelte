<script>
    import { user } from "$lib/store/profile";
    import { handleAuthToken} from "$lib/store/routes";
    import { onMount } from "svelte";
    import { handleFetchLoginType , handleDeleteAuthentication} from "$lib/index";
    import GoogleFA from "./_2fa.svelte";
    import Tip from "./components/tip.svelte";
    import LoginHistory from "./components/loginHistory.svelte";
    import ChangeEmail from "./components/changeEmail.svelte";
    import ChangePassword from "./components/changePassword.svelte";
    $: respose = ""
    $: isGoogleFA = false
    let disableCode = ""
 
    const fetchLoginType = (async(event)=>{
        respose = event
        isGoogleFA = false
    })

    onMount(async()=>{
        respose = await handleFetchLoginType($handleAuthToken)
    })
    let disableLoad = false
    const Disable2faAuthentication = (async()=>{
        disableLoad = true
        const response = await handleDeleteAuthentication(disableCode,$user?.email)
        if(response){
            respose = response
            disableLoad = false
        }
    })

</script>
{#if isGoogleFA}
    <GoogleFA on:close={()=> isGoogleFA = false} on:response={(e)=> fetchLoginType(e.detail)}/>
{/if}


<ChangeEmail {respose}/>

<ChangePassword {respose} on:_2fa={()=> isGoogleFA = true}/>


<div class="css-t60dms">
    <div class="css-zjw3b0">
        <h3 class="css-qgoclk" style="margin: 0px auto 0px 0px;">Two-factor Authentication</h3>
        <svg enable-background="new 0 0 229.5 229.5" viewBox="0 0 229.5 229.5" xmlns="http://www.w3.org/2000/svg" size="15" color="{respose?.fa_auth ? "#72f238" : "#5E626F"}" class="css-1h2lco0" style="margin-right: 8px;">
            <path d="m214.419 32.12c-.412-2.959-2.541-5.393-5.419-6.193l-92.24-25.652c-1.315-.366-2.704-.366-4.02 0l-92.24 25.652c-2.878.8-5.007 3.233-5.419 6.193-.535 3.847-12.74 94.743 18.565 139.961 31.268 45.164 77.395 56.738 79.343 57.209.579.14 1.169.209 1.761.209s1.182-.07 1.761-.209c1.949-.471 48.076-12.045 79.343-57.209 31.305-45.217 19.1-136.113 18.565-139.961zm-40.186 53.066-62.917 62.917c-1.464 1.464-3.384 2.197-5.303 2.197s-3.839-.732-5.303-2.197l-38.901-38.901c-1.407-1.406-2.197-3.314-2.197-5.303s.791-3.897 2.197-5.303l7.724-7.724c2.929-2.928 7.678-2.929 10.606 0l25.874 25.874 49.89-49.891c1.406-1.407 3.314-2.197 5.303-2.197s3.897.79 5.303 2.197l7.724 7.724c2.929 2.929 2.929 7.678 0 10.607z"></path>
        </svg>
        <span>{respose?.fa_auth ? "Enabled" : "Disabled"}</span>
    </div>
    {#if respose?.fa_auth}
        <div class="css-yc876q">
            <p>Enter your 2FA code to disable two-factor authentication.</p>
            <form on:submit|preventDefault={Disable2faAuthentication}>
                <div>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" name="passcode" autocomplete="off" placeholder="Code" bind:value={disableCode}>
                        </div>
                    </div>
                </div>
                <button class="css-1ljh5f5 button" disabled={disableCode.length !== 6 || disableLoad} on:click={Disable2faAuthentication} type="submit" style="margin-top: 20px;">{disableLoad ? "Loading..." : "Disable 2FA"}</button>
                <div id="recaptcha13420">
                    <div class="grecaptcha-badge" data-style="none" style="width: 256px; height: 60px; position: fixed; visibility: hidden; display: block; transition: right 0.3s ease 0s; bottom: 14px; right: -186px; box-shadow: gray 0px 0px 5px; border-radius: 2px; overflow: hidden;">
                        <div class="grecaptcha-logo">
                            <iframe title="reCAPTCHA" width="256" height="60" role="presentation" name="a-l075nbd1kloq" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcLy4QaAAAAAJTsyzu-3Vy0vM7N1rs71trH38oG&amp;co=aHR0cHM6Ly9yb2xsYml0LmNvbTo0NDM.&amp;hl=en&amp;v=rKbTvxTxwcw5VqzrtN-ICwWt&amp;size=invisible&amp;cb=16fdiml7hd81"></iframe>
                        </div>
                        <div class="grecaptcha-error"></div>
                        <textarea id="g-recaptcha-response-100002" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea>
                    </div>
                </div>
            </form>
        </div>
    {/if}
    {#if !respose?.fa_auth}
        <p class="css-145ks4p">Using two-factor authentication is highly recommended because it protects your account with both your password and your phone.</p>
        <p class="css-145ks4p" style="margin-bottom: 24px;"> While 2FA is enabled, you will not be able to login via Steam.</p>
        <button on:click={()=> isGoogleFA = true} class="css-1psueex">Enable 2FA</button>
    {/if}

</div>
{#if respose?.login_history}
    <LoginHistory respose={respose?.login_history}/>
{/if}

<Tip />


<style>
   
</style>