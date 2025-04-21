<script>
   /** @type {import('./$types').PageLoad} */
   import Navbar from "$lib/navbar.svelte";
   import "../styles/global.css"
   import "../styles/games.css"
   import { user } from "$lib/store/profile";
   import { browser} from '$app/environment';
   import { screen, newScreen } from "$lib/store/screen";
   import { onMount } from "svelte";
   import { url, seaser } from "$lib/store/routes";
   import { device } from "$lib/store/profile";
   import Password from "$lib/password/index.svelte";
   import Loader from "$lib/loader.svelte";
   import RightSideBar from "$lib/right-sideBar.svelte";
   import LeftSidebar from "$lib/left-sidebar.svelte";
   import Footer from "$lib/footer.svelte";
   import { page } from '$app/stores';
   import { goto } from "$app/navigation";
   import {success,message, isLoggin, isLiveStat} from "$lib/store/activities";
   import Auth from "$lib/auth/layout.svelte";
   import Verification from "$lib/auth/verify/verification.svelte";
   import Wallet from "$lib/wallet/layout.svelte";
   import { fetchVistorsDevice } from "$lib/index";
   import { handleFetchPublicChat } from "$lib/socket/index";
   import SearchGames from "$lib/searchGames/SearchGames.svelte";
   import User from "$lib/user/layout.svelte"
   import LiveStats from "$lib/games/crash/dialogs/LiveStats.svelte";
   export let data 

   $: isPassword = data?.password ? false : true
   $: url.set($page.url.pathname)
   $: urlString = ($page.url.href);
   $: paramString = urlString.split('?')[1];
   $: queryString = new URLSearchParams(paramString);
   $: seaserEl = []
   $: tab = ""
   $: referral = ""

   $: {
    seaserEl = []
      if (paramString) {
         for (let pair of queryString.entries()) {
               seaserEl.push(pair[1])
         }
      }
      tab = seaserEl[0]
      referral = seaserEl[2]
      seaser.set(seaserEl)
   }

   let ens = browser && window.innerWidth
   browser && window.addEventListener("resize", () => {
      ens = (window.innerWidth)
      screen.set(ens)
      let el = document.documentElement
      el.style.fontSize = `${$screen > 650 ? 16 : $screen > 560 ?  23 : $screen > 500 ? 21.34 : $screen > 440 ? 17.54 : $screen > 300 ?  13.5 : 11.5}px`;
   })

   onMount(() => {
      ens = browser && window.innerWidth
      screen.set(ens)
      let el = document.documentElement
      el.style.fontSize = `${$screen > 650 ? 16 : $screen > 560 ?  23 : $screen > 500 ? 21.34 : $screen > 440 ? 17.54 : $screen >  300 ?  13.5 : 11.5}px`;
   })
  
   $: sideHasExpand = 8
   $: menu = false
   $: chat = false

   const handleChatSection = (()=>{
      if(menu){
         menu = false
         chat = true
      }
      else {
         chat =! chat
      }
   })

   const handleMenuSection = (()=>{
      if(chat){
         chat = false
         menu = true
      }else {
         menu =! menu
      }
   })

   onMount(()=>{
      if(!$isLoggin && $url === "/verification"){
         goto("/")
      }
   })

   onMount(async()=>{
      await handleFetchPublicChat()
   })

   onMount(()=>{
      if(tab === "auth"){
         if(referral && $isLoggin){
            goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=referral&=${referral}`)
         }
      }
   })


   $:{
      if(tab === "verify-email"){
         if($user?.emailIsVerified){
            goto($url)
         }
      }
   }


   onMount(async()=>{
     const response = await fetchVistorsDevice()
     device.set(response)
   })

   const delte = ((index)=>{
      $message = $message.filter((item, i) => i !== index);
   })

   $: newScreen.set($screen - sideHasExpand)

</script>

{#if $screen && $device}
   <div id="root" >
      {#if isPassword}
         <Password on:close={()=> isPassword = false}/>
      {/if}
      <Navbar sideHasExpand={sideHasExpand} chat={chat} menu={menu} on:return={()=> sideHasExpand = 248} on:chat={handleChatSection} on:menu={handleMenuSection}/>
         {#if $screen < 750}
            <div style="min-height: 112px;"></div>
         {:else}
            <div style="min-height: 64px;"></div>
         {/if}
      
      {#if $screen > 750 || menu}
         <RightSideBar />
      {/if}
      <div class="{sideHasExpand === 340 ? "css-yl3y1i" : sideHasExpand === 8 ? "css-qk763z" : "css-1polf3r"}">
         <div class="css-1gcbewu">
            {#if $url !== "/verification" && $isLoggin}
               <Verification />
            {/if}
            <slot></slot>
         </div>
         <Footer />
      </div>
      {#if $screen > 750 || chat}
         <LeftSidebar sideHasExpand={sideHasExpand} on:close={()=> sideHasExpand = 8}  on:ellapse={()=> sideHasExpand = 248} on:expand={()=> sideHasExpand = 340}/>  
      {/if}
   </div>
   {:else}
   <div style="height: 70vh;">
      <Loader />
   </div>
{/if}

{#if $message.length}
<div class="message-container">
   {#each $message as res, index}
      <div style="background-color:{res.type === "error" ? "crimson" : "green"};" class="error-message">
         <div class="css-1nc5kzu2">
            <button on:click={()=> delte(index)} class="css-1ou4ub22">
               <svg width="10px" height="10px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="10" class="css-1cvv4jt">
                  <title>Close</title>
                  <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                  </g>
               </svg>
            </button>
      </div>
         <div class="hTTvsjh">
         <div>{res.message}</div>
         </div>
         <!-- <div class="progress-bar">
            <div style="width: {res.pregress}%; background-color:{res.type === "error" ? "rgb(252, 159, 232)" : "#fff"};" class="process"></div>
         </div> -->
      </div>
   {/each}

</div>
{/if}


{#if $success}
   <div style="background-color:green;" class="error-message">
      <div class="hTTvsjh">
      <div>{$success}</div>
      </div>
   </div>
{/if}

<div class="rollbit-modal-popover-container" style="display: {tab === "wallet" ? "inline-block" : "none"} ;">
   <Wallet tab={seaserEl} />
</div>

{#if tab === "auth"}
   <Auth tab={seaserEl} />
{/if}

{#if tab === "user"}
   <User tab={seaserEl} />
{/if}

{#if tab === "search"}
   <SearchGames tab={seaserEl}/>
{/if}
{#if $isLiveStat}
   <LiveStats />
{/if}


<style>
.css-1nc5kzu2{
   position: absolute;
   right: 10px;
   top: 3px;
}
.message-container{
   display: flex;
   flex-direction: column-reverse;
   z-index: 10000000;
   height: 100vh;
   top: 0%;
   /* background-color: red; */
   position: fixed;
}
</style>