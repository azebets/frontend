<script>
     const logo = new URL('../../../lib/images/Cyclix Games Casino - Coin Logo 3D.png', import.meta.url).href
     import { regsterReferralCode } from "$lib/index";
     import { handleAuthToken } from "$lib/store/routes";
     import { user } from "$lib/store/profile";
    import { onMount } from "svelte";
    export let referral

    let code = ""
    $: isloading = false
    const handleSubmit = (async()=>{
        isloading = true
      const response =  await regsterReferralCode($handleAuthToken,code)
      if(response){
        user.set(response)
        isloading = false
      }
    })

    onMount(()=>{
        code = $user?.referral_code ? $user?.referral_code : referral ? referral : ""
    })

</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="css-1v87fmr">
    <img src="{logo}" alt=""  size="120" class="css-11k5gmp" style="margin: 24px 0px 32px;">
    <h1 class="css-rhqiop">Apply Referral Code</h1>
    <div class="css-75vlcg">
        <div>
            <div class="css-1f51ttt">
                <input type="text" readonly={$user?.referral_code} name="code" placeholder="Enter Referral Code..." bind:value={code}>
            </div>
        </div>
    </div>
    {#if $user?.referral_code}
        <div class="css-1rzueyc">Don't have a code? Enter "{$user?.referral_code}"</div>
    {/if}
    {#if !$user?.referral_code}
        <button class="css-1ylvjsg button" type="submit" style="width: 140px; margin-top: 40px;">{isloading ? "Loading..." : "Apply"}</button>   
    {/if}
</div>
</form>

<style>
   
</style>