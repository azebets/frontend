<script>
    import { handleCreateOtp, handleVerifyEmail } from "../../hook"
    import { handleAuthToken, otp} from "$lib/store/routes";
    import { seaser } from "$lib/store/routes";
    import { goto } from "$app/navigation"
    import { user } from "$lib/store/profile";
    import Loader from "$lib/loader.svelte"
    import VerifyEmail from "./verifyEmail/verifyEmail.svelte";
    import { url } from "$lib/store/routes";

    $: loading = false
    $: tab = $seaser[0]

  const createOtp = (async()=>{
    loading = true
    const repo = await handleCreateOtp($handleAuthToken)
    if(repo){
        goto(`${$url === "/" ? "" : $url}/?tab=verify-email&re=${repo?.token}`)
    }
    loading = false
  })

</script>

{#if tab === "verify-email" && $seaser[1]}
    <VerifyEmail />
{/if}

<div class="css-pd9vm2">
    <div class="css-1dxqvt0">Verify your email</div>
    {#if !$user.emailIsVerified && $user?.kyc1}
        <button on:click={createOtp} class="css-1psueex button" style="margin: 16px 0px; width:100%">
            CLick to Verify your email
            {#if loading}
                <Loader color={"btn"} />
            {/if}
        </button>
    {/if} 
</div>


<style>
   
</style>