<script>
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";
  import AllPlayerScreen from "./players/layout.svelte";
  import DetailsScreen from "./bet-detail/layout.svelte";
  import HotKeys from "./hotkeys/layout.svelte";
  import TrendChart from "./trend-chart/layout.svelte";
  import ScriptsHelp from "./script-help/layout.svelte";
  import PreviewScripts from "./preview-script/layout.svelte";
  import CrashHelp from "./help/layout.svelte";
  import CrashHelpAbout from "./help/about.svelte";
  import CrashHelpFairness from "./help/fairness.svelte";
  import CrashHelpAutoCashout from "./help/autocashout.svelte";
  import CrashHelpTrendball from "./help/trendball.svelte";
  const dispatch = createEventDispatcher();
  export let launchConf;
  $: gameID = "";
  $: isBusy = false;
  $: betID = "";
  $: startScreen = "";
  $: currentScreen = "";
  $: dialogParams = null;
  $: {
    gameID = launchConf?.gameID;
    betID = launchConf?.betID;
    dialogParams = launchConf?.params;
    startScreen = launchConf?.startScreen;
    currentScreen = startScreen || "Details";
  }
  const handleShowDetails = ({ betID: bet_id }) => {
    if (bet_id) return;
    betID = bet_id;
    currentScreen = "Details";
  };
  const handleShowAllPlayers = (event) => {
    gameID = event.detail
    currentScreen = "All Players";
  };
  const handleClose = () => {
    if (isBusy) return;
    dispatch("close");
  };
</script>

{#if startScreen && currentScreen}
  <div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
    <div
      class="dialog"
      style="opacity: 1; width: 464px; height: 582px; margin-top: -291px; margin-left: -232px; transform: scale(1) translateZ(0px);"
    >
      {#if currentScreen !== startScreen}
        <button
          on:click={() => (currentScreen = startScreen)}
          class="dialog-back"
          style="opacity: 1; transform: none;"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
          </button
        >
      {/if}
      <div
        class="dialog-head has-close {currentScreen !== startScreen
          ? 'has-back'
          : ''}" >
        <div class="dialog-title">
          {currentScreen}
        </div>
      </div>
      <button
        on:click={handleClose}
        class="sc-ieecCq fLASqZ close-icon dialog-close">
        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
          <title>Close</title>
          <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
          </g>
      </svg>
          </button>
      {#if currentScreen === "All Players"}
        <div in:fly={{ x: -80, duration: 150, easing: cubicOut }}
          out:fly={{ x: -80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;">
          <AllPlayerScreen {gameID} on:gameDetail={handleShowDetails} on:close={handleClose}/>
        </div>
      {:else if currentScreen === "Details"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <DetailsScreen {betID} on:allPlayers={handleShowAllPlayers} />
        </div>
      {:else if currentScreen === "Understanding Trend Chart"}
        <div in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;" >
          <TrendChart />
        </div>
      {:else if currentScreen === "Help"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <CrashHelp on:click={(e) => (currentScreen = e.detail)} />
        </div>
      {:else if currentScreen === "What Game Is This?"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <CrashHelpAbout />
        </div>
      {:else if currentScreen === "Fairness"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <CrashHelpFairness />
        </div>
      {:else if currentScreen === "Auto cash out"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <CrashHelpAutoCashout />
        </div>
      {:else if currentScreen === "Trendball"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <CrashHelpTrendball />
        </div>
      {:else if currentScreen === "Hot keys"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <HotKeys />
        </div>
      {:else if currentScreen === "Script Help"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <ScriptsHelp />
        </div>
      {:else if currentScreen === "Preview the script"}
        <div
          in:fly={{ x: 80, duration: 150, easing: cubicOut }}
          out:fly={{ x: 80, duration: 150, easing: cubicOut }}
          class="dialog-body default-style"
          style="z-index: 2; transform: none;"
        >
          <PreviewScripts
            script={dialogParams}
            on:busy={(e) => (isBusy = e.detail)}
            on:close={handleClose} />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* .gfnHxc .icon:first-of-type {
    transform: rotate(180deg);
    margin-bottom: 0.125rem;
  } */
  :global(.default-style > div) {
    border-radius: 20px;
    background-color: rgb(30, 32, 36);
    padding: 1.25rem 1.25rem 0px;
  }

  :global(.dialog-body > div) {
    flex: 1 1 0%;
  }
</style>
