<script>
    import { useSignupHook } from "../hook"
    import { loading } from "$lib/store/activities";
    import { url } from "$lib/store/routes";
    import { device } from "$lib/store/profile";
    import { goto } from "$app/navigation";
    import Google from "../google/google.svelte";
    export let referral;

    let username = ""
    let email = ""
    let password = ""
    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    $: _8to30Characters = password.length >= 8 && password.length <= 30 ? true : false
    $: passLowercase = password.search(/[a-z]/)  < 0 ? false : true
    $: passUppercase = password.search(/[A-Z]/)  < 0 ? false : true
    $: passNumbers = password.search(/[0-9]/)  < 0  ? false : true
    $: letter = passLowercase && passUppercase
    $: specialChar = isContainsSymbol.test(password) 
    $: devic = { ...$device, Login_time: new Date(), type :"Email Registration"}
    
    $: track = !username || !email || !password || $loading || !_8to30Characters || !letter || !specialChar 

    const handleSubmit = (async()=> {
        if(!track){
           let response = await useSignupHook({username, email, password, referral, device:devic})
           if(response){
                goto($url)
           }
        }
    })
    let showPassword = false;
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    
</script>


    <div class="css-exhu38">
    <label for="rollbit-field-4061" class="css-1vec8iw">Username<span class="css-1vr6qde"> *</span></label>
    <div>
        <div class="css-14hgewr">
            <input type="text" name="display" placeholder="Username" id="rollbit-field-4061" bind:value={username}>
        </div>
    </div>
</div>
<div class="css-exhu38">
    <label for="rollbit-field-4062" class="css-1vec8iw">Email<span class="css-1vr6qde"> *</span></label>
    <div>
        <div class="css-14hgewr">
            <input type="email" name="email" placeholder="youremail@domain.com" id="rollbit-field-4062" bind:value={email}></div>
        </div>
    </div>
    <div class="css-exhu38">
        <label for="rollbit-field-4063" class="css-1vec8iw">Password<span class="css-1vr6qde"> *</span></label>
        <div>
            <div class="css-14hgewr">
                {#if !showPassword}
                    <input type="password" name="password" placeholder="********" id="rollbit-field-113" bind:value={password}>  
                {/if}
                {#if showPassword}
                    <input type="text" name="password" placeholder="********" id="rollbit-field-113" bind:value={password}>  
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
    <div class="oisOwppms">
        <div class="KnjwnOOw {_8to30Characters ? "is-verified" : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52"  xml:space="preserve" size="16" class="css-1hu26ay">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
             </svg>
             Be between 8 and 30 characters</div>
        <div class="KnjwnOOw {letter ? "is-verified" : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52"  xml:space="preserve" size="16" class="css-1hu26ay">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
             </svg>
            Contain at least one uppercase and lowercase (a-z) </div>
        <div class="KnjwnOOw {passNumbers ? "is-verified" : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52"  xml:space="preserve" size="16" class="css-1hu26ay">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
             </svg>
             Contain at least one number (0-9)
        </div>
        <div class="KnjwnOOw {specialChar ? "is-verified" : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52"  xml:space="preserve" size="16" class="css-1hu26ay">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
             </svg>
             Contain at least one sign
        </div>
    </div>
     <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="css-1nsxilh">This site is protected by reCAPTCHA and the Google <a href="#" target="_blank" rel="noreferrer">Privacy Policy</a>
            and 
             <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" target="_blank" rel="noreferrer">Terms of Service</a> 
            apply.
    </div>
    <button disabled={track} on:click={handleSubmit} class="css-u44gss button" type="submit"> {$loading ? "Loading..." : "Start playing"}</button>


        <Google text={"Sign up with Google"} />

<style>
   
</style>