<script>
    import Gameview from "$lib/games/ClassicDice/gameview.svelte";
    import Controls from "$lib/games/ClassicDice/Controls.svelte";
    import { newScreen } from "$lib/store/screen";
    import {  handleAuthToken } from "$lib/store/routes";
    import { onMount } from "svelte";
    import { browser } from '$app/environment';
    import { handleSoundManager } from "$lib/games/ClassicDice/audio/SoundManager";
    import { soundManager, turboManager , soundHandler} from "$lib/games/ClassicDice/store/index";
    import Allbet from "$lib/games/ClassicDice/componets/allbet.svelte";
    import Mybet from "$lib/games/ClassicDice/componets/mybet.svelte";
    // import Hotkey from "$lib/games/ClassicDice/componets/hotkey.svelte";
    // import LiveStats from "$lib/games/ClassicDice/componets/liveStats.svelte";
    import SeedSetting from "$lib/games/ClassicDice/componets/share/seedsettings.svelte";
    import Help from "$lib/games/ClassicDice/componets/help.svelte";
    import { handleDiceGameEncrypt, DiceHistory } from "$lib/gameAPIs/dice";
    import Loader from "$lib/controller/loader.svelte";
    import Description from "$lib/games/ClassicDice/componets/description.svelte";

    $: is_hotkey = false
    $: is_stats = false
    $: isSeed = false
    $: isHelp = false
    $: loading = true

    onMount(async()=>{
        const resion = await handleDiceGameEncrypt($handleAuthToken)
        await DiceHistory($handleAuthToken)
        const id = browser && JSON.parse(localStorage.getItem('classic_dice_sound'))
        const tubor = browser && JSON.parse(localStorage.getItem('classic_dice_tubo'))
        soundHandler.set(id)
        turboManager.set(tubor)
        soundManager.set(handleSoundManager())
        loading = resion
    })

    $: tab = 1
    const handleAllbet = ((e) => {
        tab = e
    })

    const handleSoundState = (()=>{
        if($soundHandler){
            soundHandler.set(null)
            localStorage.removeItem("classic_dice_sound");
        }else{
            soundHandler.set(true)
            localStorage.setItem("classic_dice_sound", true);
        }
    })

    const handleTurbeState = (()=>{
        if($turboManager){
            turboManager.set(null)
            localStorage.removeItem("classic_dice_tubo");
        }else{
            turboManager.set(true)
            localStorage.setItem("classic_dice_tubo", true);
        }
    })

$: showDesc = false
</script>

  <!-- {#if is_hotkey}
    <Hotkey on:close={()=> is_hotkey = false} />
  {/if} -->

  <!-- {#if is_stats}
    <LiveStats on:close={()=> is_stats = false} />
  {/if} -->

  {#if isSeed}
  <div class="sc-bkkeKt kBjSXI">
    <div class="dialog " style={`${$newScreen < 650 ? "transform: scale(1) translateZ(0px);" : "opacity: 1; width: 464px; height: 631px; margin-top: -315.5px; margin-left: -232px;"}  `}>
        <button on:click={()=> isSeed = false}  class="sc-ieecCq fLASqZ close-icon dialog-close">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                </g>
            </svg>
        </button>
        <SeedSetting settin={null}/>
    </div>
</div>

  {/if}
  
  {#if isHelp}
      <Help on:close={()=> isHelp = false} />
  {/if}
  
  
  <div id="dice-main">
    {#if !loading}
    <div id="game-ClassicDice" class={`sc-haTkiu lmWKWf ${$newScreen > 1200 ? "game-style0" : "game-style1" }  sc-gDGHff gYWFhf`}>
        <div class="game-area">
            <div class="game-main">
                <Gameview />
                <Controls />
                <div class="game-actions">
                    <button on:click={()=> handleSoundState()} class={`action-item ${$soundHandler ? "active" : ""} `}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 337.37 337.35">
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g id="Iconly_Bold_Volume_Down" data-name="Iconly Bold Volume Down">
                                        <g id="Volume_Down" data-name="Volume Down">
                                            <path id="Volume_Down-2" data-name="Volume Down-2" class="cls-1" d="M181.59,337.35a50.45,50.45,0,0,1-29.78-12.68L85.63,269.56h-34A49.59,49.59,0,0,1,2.71,221.15a523.92,523.92,0,0,1,0-106.39A50.63,50.63,0,0,1,51.63,67.71h34l64.92-54.23A56.66,56.66,0,0,1,183.09,0,47.75,47.75,0,0,1,227.5,36.66a188.08,188.08,0,0,1,4.35,28l.9,8.28a1809,1809,0,0,1,0,191.47l-.9,8.58a168.24,168.24,0,0,1-4.2,27.24,47.61,47.61,0,0,1-44.11,37.1Zm102.31-61a17.9,17.9,0,0,1-4.31-24.51,149.13,149.13,0,0,0,23.33-83.12,149,149,0,0,0-23.35-83.1,17.91,17.91,0,0,1,4.31-24.52,17.06,17.06,0,0,1,23.76,4.16l.19.28a185,185,0,0,1,29.52,103.18,185,185,0,0,1-29.5,103.17,17.12,17.12,0,0,1-14.13,7.5,16.85,16.85,0,0,1-9.82-3.06Z"/></g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                    </button>
                    <button on:click={()=> handleTurbeState()} class={`action-item ${$turboManager ? "active" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 224 350"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M104.93,220.83H9.14a9.13,9.13,0,0,1-8-13.6L114.87,4.69c4.86-8.66,18.1-4.43,17,5.44l-12.84,119h95.79a9.13,9.13,0,0,1,8,13.6L109.13,345.31c-4.86,8.66-18.1,4.43-17-5.44Z"/></g></g></svg>
                    </button>
                  
                    <!-- <button on:click={()=> is_hotkey = true} class="action-item  ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 350 244.34"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M307.08,0H42.92A42.93,42.93,0,0,0,0,42.92v158.5a42.93,42.93,0,0,0,42.92,42.92H307.08A42.93,42.93,0,0,0,350,201.42V42.92A42.93,42.93,0,0,0,307.08,0ZM135.38,34.51a8.92,8.92,0,0,1,8.92-8.93h61.4a8.92,8.92,0,0,1,8.92,8.93V52.29a8.92,8.92,0,0,1-8.92,8.93H144.3a8.92,8.92,0,0,1-8.92-8.93Zm0,52.56a8.92,8.92,0,0,1,8.92-8.93h61.4a8.92,8.92,0,0,1,8.92,8.93v17.78a8.92,8.92,0,0,1-8.92,8.93H144.3a8.92,8.92,0,0,1-8.92-8.93Zm0,52.56a8.92,8.92,0,0,1,8.92-8.93h61.4a8.92,8.92,0,0,1,8.92,8.93v17.78a8.92,8.92,0,0,1-8.92,8.93H144.3a8.92,8.92,0,0,1-8.92-8.93ZM29,34.51a8.93,8.93,0,0,1,8.93-8.93H99.3a8.93,8.93,0,0,1,8.93,8.93V52.29a8.93,8.93,0,0,1-8.93,8.93H37.91A8.93,8.93,0,0,1,29,52.29Zm0,52.56a8.93,8.93,0,0,1,8.93-8.93H99.3a8.93,8.93,0,0,1,8.93,8.93v17.78a8.93,8.93,0,0,1-8.93,8.93H37.91A8.93,8.93,0,0,1,29,104.85Zm0,52.56a8.93,8.93,0,0,1,8.93-8.93H99.3a8.93,8.93,0,0,1,8.93,8.93v17.78a8.93,8.93,0,0,1-8.93,8.93H37.91A8.93,8.93,0,0,1,29,157.41ZM321,210a8.93,8.93,0,0,1-8.93,8.93H37.91A8.93,8.93,0,0,1,29,210V192.19a8.93,8.93,0,0,1,8.93-8.93H312.09a8.93,8.93,0,0,1,8.93,8.93Zm0-52.56a8.93,8.93,0,0,1-8.93,8.93H250.7a8.93,8.93,0,0,1-8.93-8.93V139.63a8.93,8.93,0,0,1,8.93-8.93h61.39a8.93,8.93,0,0,1,8.93,8.93Zm0-52.56a8.93,8.93,0,0,1-8.93,8.93H250.7a8.93,8.93,0,0,1-8.93-8.93V87.07a8.93,8.93,0,0,1,8.93-8.93h61.39A8.93,8.93,0,0,1,321,87.07Zm0-52.56a8.93,8.93,0,0,1-8.93,8.93H250.7a8.93,8.93,0,0,1-8.93-8.93V34.51a8.93,8.93,0,0,1,8.93-8.93h61.39A8.93,8.93,0,0,1,321,34.51Z"/></g></g></svg>
                    </button>
                 
                    <button on:click={()=> is_stats = true} class="action-item  ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 350 350"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M173.53,265.4a18.81,18.81,0,0,1-12.71-4.73c-3.63-3.13-5.43-7.54-5.43-13.17a16.93,16.93,0,0,1,5.26-12.67,17.7,17.7,0,0,1,12.88-5.14,17.54,17.54,0,0,1,17.82,17.81c0,5.54-1.79,9.95-5.39,13.12a18.06,18.06,0,0,1-12.43,4.78M115.28,134.5q0-11.31,7.29-23t21.25-19.29c9.33-5.09,20.17-7.62,32.6-7.62Q193.73,84.6,207,91a49.34,49.34,0,0,1,20.5,17.36,42.71,42.71,0,0,1,7.22,23.89A36.89,36.89,0,0,1,230.6,150a56,56,0,0,1-9.78,13.21c-3.78,3.71-10.6,9.91-20.38,18.67a82.75,82.75,0,0,0-6.52,6.52,24.63,24.63,0,0,0-5.51,9.78q-.67,2.34-1.95,8.2-2.27,12.41-14.23,12.39a14.53,14.53,0,0,1-10.43-4c-2.86-2.73-4.25-6.73-4.25-12.07a42.42,42.42,0,0,1,11.34-30.29q5.13-5.5,13.85-13.17c5.1-4.47,8.77-7.82,11.06-10.1a32.77,32.77,0,0,0,5.74-7.59,18.24,18.24,0,0,0,2.33-9.05,21.17,21.17,0,0,0-7.09-16.14c-4.78-4.36-10.84-6.57-18.36-6.57q-13.14,0-19.36,6.65T146.59,136c-2.73,9-7.87,13.49-15.41,13.49a15.18,15.18,0,0,1-11.3-4.73C116.83,141.55,115.28,138.17,115.28,134.5ZM175,0a175,175,0,1,1-74.31,333.47q5.37-.84,10.62-2a143.17,143.17,0,0,0,44.22-18.32c2.66.38,5.31.68,7.92.89,3.84.32,7.7.48,11.55.48A139.73,139.73,0,1,0,88.92,284.7,105,105,0,0,1,76.31,300a108.48,108.48,0,0,1-12,10.46A175,175,0,0,1,175,0Zm0,54a121,121,0,0,0-68.55,220.65A9.25,9.25,0,0,1,109.16,287,120.9,120.9,0,0,1,89.4,313.06c-1.17,1.18-2.36,2.34-3.58,3.46a134.82,134.82,0,0,0,21.37-3.11,125.08,125.08,0,0,0,41.19-17.68,9.16,9.16,0,0,1,6.62-1.4c3.17.52,6.49.94,10,1.22,3.26.27,6.61.41,10,.41A121,121,0,0,0,175,54Z"/></g></g></svg>
                    </button> -->

                    <button on:click={()=> isSeed = true} class="action-item  " id="set_seed">
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 350 350"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M349.94,156.21A16.22,16.22,0,0,0,333.69,140l-27.28,0a134.84,134.84,0,0,0-14-33.62l19.26-19.32a16.23,16.23,0,0,0,0-23L285.41,38a16.22,16.22,0,0,0-22.94,0L243.21,57.36a135.12,135.12,0,0,0-33.67-13.9l0-27.26A16.23,16.23,0,0,0,193.25,0l-37,.06A16.22,16.22,0,0,0,140,16.31l0,27.26a134.94,134.94,0,0,0-33.63,14L87.11,38.32a16.23,16.23,0,0,0-23,0L38,64.59a16.22,16.22,0,0,0,0,22.94l19.32,19.25a135.19,135.19,0,0,0-13.9,33.68l-27.26,0A16.23,16.23,0,0,0,0,156.75l.06,37A16.22,16.22,0,0,0,16.31,210l27.26,0a135.27,135.27,0,0,0,14,33.62L38.32,262.89a16.23,16.23,0,0,0,0,22.95L64.59,312a16.22,16.22,0,0,0,22.94,0l19.27-19.33a134.65,134.65,0,0,0,33.66,13.89l0,27.28A16.23,16.23,0,0,0,156.75,350l37-.06A16.22,16.22,0,0,0,210,333.69l0-27.28a135.17,135.17,0,0,0,33.61-14l19.33,19.27a16.23,16.23,0,0,0,22.95,0L312,285.41a16.22,16.22,0,0,0,0-22.94L292.63,243.2a135.4,135.4,0,0,0,13.89-33.66l27.28,0A16.23,16.23,0,0,0,350,193.25ZM262.5,174.86a87.51,87.51,0,1,1-87.64-87.38A87.5,87.5,0,0,1,262.5,174.86Z"/><path class="cls-1" d="M167.41,107.6a4.06,4.06,0,0,0-1.17-3.5,4.76,4.76,0,0,0-3.5-1.4h-8.63a4.16,4.16,0,0,0-3.51,1.52A9.07,9.07,0,0,0,149,107.6l-4.2,28.24H116.06a4.82,4.82,0,0,0-5.14,5.14v7.94a4.82,4.82,0,0,0,5.14,5.13H142l-6.07,41.08H110a4.82,4.82,0,0,0-5.14,5.14v7.94a4.82,4.82,0,0,0,5.14,5.13H133.1l-4.2,28.24a4.07,4.07,0,0,0,1.16,3.51,4.77,4.77,0,0,0,3.5,1.4h8.64q4.67,0,5.37-4.91l4.2-28.24h34.31l-4.2,28.24a4.11,4.11,0,0,0,1.17,3.51,4.76,4.76,0,0,0,3.5,1.4h8.64q4.67,0,5.37-4.91l4.2-28.24h28a5.48,5.48,0,0,0,3.85-1.4,4.84,4.84,0,0,0,1.52-3.73v-7.94a4.88,4.88,0,0,0-1.52-3.74,5.48,5.48,0,0,0-3.85-1.4H207.56l6.07-41.08h25.21a5.48,5.48,0,0,0,3.85-1.4,4.84,4.84,0,0,0,1.52-3.73V141a4.88,4.88,0,0,0-1.52-3.74,5.48,5.48,0,0,0-3.85-1.4H216.2l4.2-28.24a4.09,4.09,0,0,0-1.17-3.5,4.76,4.76,0,0,0-3.5-1.4h-8.64a4.14,4.14,0,0,0-3.5,1.52A9.07,9.07,0,0,0,202,107.6l-4.2,28.24H163.21ZM195,154.05l-6.06,41.08H154.57l6.07-41.08Z"/></g></g></svg>
                    </button>

                    <button on:click={()=> isHelp = true} class="action-item  ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 350 350"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M173.53,265.4a18.81,18.81,0,0,1-12.71-4.73c-3.63-3.13-5.43-7.54-5.43-13.17a16.93,16.93,0,0,1,5.26-12.67,17.7,17.7,0,0,1,12.88-5.14,17.54,17.54,0,0,1,17.82,17.81c0,5.54-1.79,9.95-5.39,13.12a18.06,18.06,0,0,1-12.43,4.78M115.28,134.5q0-11.31,7.29-23t21.25-19.29c9.33-5.09,20.17-7.62,32.6-7.62Q193.73,84.6,207,91a49.34,49.34,0,0,1,20.5,17.36,42.71,42.71,0,0,1,7.22,23.89A36.89,36.89,0,0,1,230.6,150a56,56,0,0,1-9.78,13.21c-3.78,3.71-10.6,9.91-20.38,18.67a82.75,82.75,0,0,0-6.52,6.52,24.63,24.63,0,0,0-5.51,9.78q-.67,2.34-1.95,8.2-2.27,12.41-14.23,12.39a14.53,14.53,0,0,1-10.43-4c-2.86-2.73-4.25-6.73-4.25-12.07a42.42,42.42,0,0,1,11.34-30.29q5.13-5.5,13.85-13.17c5.1-4.47,8.77-7.82,11.06-10.1a32.77,32.77,0,0,0,5.74-7.59,18.24,18.24,0,0,0,2.33-9.05,21.17,21.17,0,0,0-7.09-16.14c-4.78-4.36-10.84-6.57-18.36-6.57q-13.14,0-19.36,6.65T146.59,136c-2.73,9-7.87,13.49-15.41,13.49a15.18,15.18,0,0,1-11.3-4.73C116.83,141.55,115.28,138.17,115.28,134.5ZM175,0a175,175,0,1,1-74.31,333.47q5.37-.84,10.62-2a143.17,143.17,0,0,0,44.22-18.32c2.66.38,5.31.68,7.92.89,3.84.32,7.7.48,11.55.48A139.73,139.73,0,1,0,88.92,284.7,105,105,0,0,1,76.31,300a108.48,108.48,0,0,1-12,10.46A175,175,0,0,1,175,0Zm0,54a121,121,0,0,0-68.55,220.65A9.25,9.25,0,0,1,109.16,287,120.9,120.9,0,0,1,89.4,313.06c-1.17,1.18-2.36,2.34-3.58,3.46a134.82,134.82,0,0,0,21.37-3.11,125.08,125.08,0,0,0,41.19-17.68,9.16,9.16,0,0,1,6.62-1.4c3.17.52,6.49.94,10,1.22,3.26.27,6.61.41,10,.41A121,121,0,0,0,175,54Z"/></g></g></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="sc-cxpSdN kQfmQV tabs game-tabs len-3">
            <div class="tabs-navs">
                <button on:click={()=>handleAllbet(1)} class={`tabs-nav ${tab === 1 && "is-active"}`}>All Bets</button>
                <button on:click={()=>handleAllbet(2)} class={`tabs-nav ${tab === 2 && "is-active"}`}>My Bets</button>
            {#if tab === 1}
                <div class="bg" style={`left: 0%; right: 50%;`}></div>
            {:else if tab === 2}
                <div class="bg" style="left: 50%; right: 0%;"></div>
            {/if}
            </div>
            {#if tab === 1}
            <Allbet />
            {:else if tab === 2}
            <Mybet />
            {/if}
        </div>

        <div class="sc-knKHOI cFxmZX">
            <div class="intro-title">
            <p>Classic Dice</p>
          </div>
            <div class="description">Classic Dice, a probability game established by blockchain hash value calculation and algorithm, provides more fun with bet and prediction, in which the closer the number rolled by players to the random number, the higher the probability winning.</div>
            <button on:click={()=> showDesc =!showDesc } class="intro-detail">
                Details
                <span style="margin-left: 1.125rem;">
                    <!-- <Icon src={RiSystemArrowDropRightLine}  size="23"  color="rgba(153, 164, 176, 0.6)"  /> -->
                </span>
            </button>
        </div>
    </div>
    {/if}

    {#if showDesc}
        <Description on:close={()=> showDesc= false}/>
    {/if}

    {#if loading}
        <div style="height: 70vh;">
            <Loader />
        </div>
    {/if}


  </div>

  
  
  <style>


  </style>
  