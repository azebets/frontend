<script>
import { browser } from "$app/environment";
import { newScreen } from "$lib/store/screen";
import GameControls from "$lib/games/crash/GameControls.svelte";
import GameActions from "$lib/games/crash/GameActions.svelte";
import GameView from "$lib/games/crash/GameView.svelte";
import AllBets from "$lib/games/crash/AllBets.svelte";
import MyBets from "$lib/games/crash/MyBets.svelte";
import GameHeader from "$lib/games/crash/GameHeader.svelte";
import LiveBets from "$lib/games/crash/LiveBets.svelte";
import { crashGame } from "$lib/games/crash/store";
import { onMount } from "svelte";
import CrashGame from "$lib/games/crash/logics/CrashGame";

$: tabOffset = $newScreen > 1100 ? 0 : 1;
$: currentTab = !tabOffset && currentTab === 3 ? 1 : (currentTab || 1);
$: gameInit = false;

onMount(async () => {
  if (browser) {
    try {
      const gameInstance = new CrashGame();
      await gameInstance.initialize();
      crashGame.set(gameInstance);
      gameInit = true;
    } catch (error) {
      console.log("Error init game ", error);
    }
  }
})

</script>

<div id="game-crash" class="sc-haTkiu lmWKWf game-style1 sc-cBIieI ikZPEu">
  <GameHeader />
  <div class="game-area">
    <div class="game-main">
      <GameView />
      <GameControls />
      <GameActions />
    </div>
    {#if $newScreen > 1100}
      <LiveBets />
    {/if}
  </div>
  <div class="sc-cxpSdN kQfmQV tabs game-tabs len-3">
    <div class="tabs-navs">
    {#if Boolean(tabOffset)}
      <button on:click={() => (currentTab = 1)} class="tabs-nav {currentTab === 1 ? 'is-active' : ''}">All Bets</button>
    {/if}
    <button
      on:click={() => (currentTab = 1 + tabOffset)}
      class="tabs-nav {currentTab === 1 + tabOffset ? 'is-active' : ''}">My Bets</button><button
      on:click={() => (currentTab = 2 + tabOffset)}
        class="tabs-nav {currentTab === 2 + tabOffset ? 'is-active' : ''}">History</button>
      <div class="bg" style="width: {100 /(Boolean(tabOffset) ? 3 : 2)}%; left: {(Boolean(tabOffset) ? (100/3) : 50) * (Boolean(tabOffset) ? (currentTab - tabOffset) : currentTab - 1)}%;"></div>
    </div>
    <div class="tabs-view" style="transform: none;">
      {#if Boolean(tabOffset) && currentTab === 1}
        <LiveBets/>
      {/if}
      {#if currentTab === 1 + tabOffset}
        <MyBets />
      {:else if currentTab === 2 + tabOffset}
        <AllBets />
      {/if}
    </div>
  </div>
  <div class="sc-kTqLtj hsmSjD cFxmZX">
    <div class="intro-title">
      <p>Crash</p>
    </div>
    <div class="description">
      CRASH is an online multiplayer blockchain guessing game that made as an
      increasing curve that may crash at any time.
    </div>
    <button class="intro-detail">
      Details
        <svg xmlns:xlink="http://www.w3.org/1999/xlink"  class="sc-gsDKAQ hxODWG icon">
          <use xlink:href="#icon_Arrow"></use>
        </svg>
      </button>
  </div>
</div>

<style>
  
  .lmWKWf.game-style1 {
    max-width: 1368px;
    margin: 0px auto;
    padding: 1.25rem 0.625rem;
  }

  .lmWKWf {
    min-height: 90vh;
  }
  
  .lmWKWf.game-style1 .game-area{
    display: flex;
    flex-wrap: wrap;
  }
  .ikZPEu .game-main.game-main {
    min-height: auto;
  }

  .lmWKWf.game-style1 .game-main {
    min-height: 47.5rem;
  }

  .lmWKWf.game-style1 .game-main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    overflow: hidden;
  }

  .lmWKWf .game-main {
    position: relative;
    border-radius: 1.25rem;
    background-color: rgb(23, 24, 27);
  }
  :global(
      .lmWKWf.game-style0 .game-view,
      .lmWKWf.game-style1 .game-view,
      .lmWKWf.game-style-iframe .game-view
    ) {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
  }
  .lmWKWf .game-tabs {
    margin-top: 2.5rem;
  }
  .lmWKWf .game-tabs .tabs-navs {
    margin-bottom: 0.75rem;
    margin-left: 0.625rem;
    display: inline-flex;
  }

  .lmWKWf .game-tabs .tabs-navs .tabs-nav {
    width: 5.625rem;
  }
  
  .lmWKWf .game-tabs .tabs-view {
    background-color: rgb(30, 32, 36);
    border-radius: 1.25rem;
    padding: 1px 0px;
  }

  .kQfmQV .tabs-view {
    position: relative;
  }

.hsmSjD .intro-title {
    min-height: 5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
.hsmSjD .intro-title > p {
    font-size: 1rem;
    color: rgb(245, 246, 247);
    font-weight: 600;
    margin: 0px;
    white-space: nowrap;
}

.hsmSjD .description {
    margin-top: 0.75rem;
    line-height: 1.25rem;
}
.hsmSjD .intro-detail {
    width: 6.75rem;
    height: 2.5rem;
    margin-top: 2rem;
    border-radius: 1.25rem;
    background-color: rgba(49, 52, 60, 0.6);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.hsmSjD .intro-detail > svg {
    font-size: 0.5625rem;
    margin-left: 1.125rem;
}

</style>
