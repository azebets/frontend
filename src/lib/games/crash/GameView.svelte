<script context="module">
  import { connect } from "svelte-mobx";
</script>

<script>
  import TrendDialog from "./dialogs/trends/layout.svelte";
  import CrashInfoDialog from "./dialogs/GameInfoDialog.svelte";
  import { onMount, onDestroy } from "svelte";
  import { screen } from "$lib/store/screen";
  const { autorun } = connect();
  import Decimal from "decimal.js";
  import pkg from "lodash";
  const winImage = new URL('../../game-images/win (1).webp', import.meta.url).href;
  const { debounce } = pkg;
  import { crashGame } from "./store";
  function observeElementSizeChange(callback, delay = 0) {
    let isComponentMounted = false;
    let elementData = { width: 0, height: 0, el: null, fn: callback };
    elementData.fn =
      delay > 0
        ? debounce((size) => !isComponentMounted && callback(size), delay)
        : callback;

    function handleSizeChange({ width, height }) {
      if (height === elementData.height && width === elementData.width) return;
      Object.assign(elementData, { width, height });
      if (!isComponentMounted) elementData.fn({ width, height });
    }

    let observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        handleSizeChange(entry.contentRect);
      }
    });

    function observeElement(element) {
      if (elementData.el) observer.unobserve(elementData.el);
      if (element) {
        elementData.el = element;
        handleSizeChange({
          width: element.clientWidth,
          height: element.clientHeight,
        });
        observer.observe(element);
      } else {
        elementData.el = null;
      }
    }

    onMount(() => {
      isComponentMounted = true;
    });

    onDestroy(() => {
      observer.disconnect();
    });

    return observeElement;
  }
  let game = null;
  $: betsContainer = null;
  $: viewContainer = null;
  $: canvas = null;

  $: winData = null;
  $: gameHistory = [];
  $: showTrends = false;
  $: isMoon = false;
  let scrollTimeout;
  $: {
    const _game = $crashGame;
    if (!game && _game) {
      game = _game;
      autorun(() => {
        gameHistory = game.history.slice(-10);
        // console.log("Game History", gameHistory);
        if (betsContainer) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (betsContainer) {
              const { scrollLeft, scrollWidth } = betsContainer;
              if (scrollLeft === 0 || scrollLeft > 350) {
                betsContainer.scrollTo(scrollWidth, 0);
              }
            }
          }, 100);
        }
      });

      if (canvas) {
        game.graph.mountEffect(canvas);
      }
      if (viewContainer) {
        const observer = observeElementSizeChange(() => {
          game.graph.resize();
        }, 300);
        observer(viewContainer);
      }

      const handleEscapeSuccess = ({ amount, odds, currencyName }) => {
        if (odds > 1) {
          winData = {
            profitAmount: new Decimal(amount).times(odds).toFixed(4),
            currencyName: currencyName,
            odds: odds,
          };
          setTimeout(() => {
            winData = null;
          }, 3000);
        }
      };

      game.on("escapeSuccess", handleEscapeSuccess);

      onDestroy(() => {
        game.off("escapeSuccess", handleEscapeSuccess);
      });
    }
  }
  $: dialogData = null;
</script>

{#if Boolean(dialogData)}
  <CrashInfoDialog
    launchConf={dialogData}
    on:close={() => (dialogData = null)}
  />
{/if}
{#if showTrends}
  <TrendDialog on:close={() => (showTrends = false)} />
{/if}
<div class="game-view">
  <div class="sc-hoHwyw fIoiVG game-recent sc-bjztik kQtbd">
    <div bind:this={betsContainer} class="recent-list-wrap">
      <div class="recent-list" style="transform: translate(0%, 0px);">
        {#each gameHistory as game, index (`${index}_${game.gameId}`)}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore missing-declaration -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={() => {
              dialogData = {
                startScreen: "All Players",
                gameID: game.gameId,
              } }}
            class="game-item {game.odds >= 10
              ? 'is-moon'
              : game.odds >= 2
                ? 'is-double'
                : ''}"
            style="">
            <div class="dot"></div>
            <div>
              <div class="issus">{game.gameId}</div>
              <div>{(parseFloat(game.odds)).toFixed(2)}x</div>
            </div>
          </div>
        {/each}
        {#if !Boolean(gameHistory.length)}
          <div class="empty-item">
            <p>Game results will be displayed here.</p>
          </div>
        {/if}
      </div>
    </div>
    {#if $screen > 650}
    <button on:click={() => (showTrends = !showTrends)}
      class="sc-iLOkMM kCvsnZ flex-center">
      <svg version="1.1" id="Layer_1" fill="currentColor" class="sc-gsDKAQ hxODWG icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 95.07"  xml:space="preserve">
        <g>
          <path class="st0" d="M46.06,26.43c21.77,0,55.05,0,76.82,0v15.8l-76.82,0V26.43L46.06,26.43L46.06,26.43z M7.47,48.01l23.24,22.35 V25.66L7.47,48.01L7.47,48.01z M122.88,79.28c-41.01,0-81.87,0-122.87,0L0,95.07c41.01,0,81.87,0,122.88,0V79.28L122.88,79.28z M122.88,52.85c-17.23,0-59.11,0-76.34,0l0,15.8h76.34V52.85L122.88,52.85z M122.88,0C97.46,0,25.44,0,0.02,0l0,15.8 c25.42,0,97.44,0,122.87,0L122.88,0L122.88,0L122.88,0z"/>
        </g>
      </svg>
      <div>
        Trends
      </div>
    </button>
    {/if}

  </div>
  <div class="sc-hcupDf dqwCNK game-box sc-eZKLwX gcZuwC">
    <div class="sc-gLDmcm gnjHQb house-edge">
      <span>House Edge 1%</span>
    </div>
    <div bind:this={viewContainer} class="sc-eTwdGJ dgiRGq">
      {#if winData}
        <div class="Le">
          <div class="msg">
            <span>Won</span>
            <span class="amount"
              >{winData.profitAmount} {winData.currencyName}</span
            >
          </div>
          <img  alt="" src="{winImage}" />
        </div>
      {/if}
      {#if isMoon}
        <div class="sc-eTwdGJ eSrhSC" style="background-position-y: -186px;"></div>
      {/if}
      <canvas bind:this={canvas} class="" width="1054" height="422"></canvas>
    </div>
    <svg class="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46">
      <defs><linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%"
          ><stop offset="0%" stop-color="#31343C"></stop><stop
            offset="100%"
            stop-color="#1E2024"
            stop-opacity="0"
          ></stop></linearGradient>
          </defs>
          <g opacity=".899">
          <path
          fill="url(#gcardBg)"
          fill-rule="evenodd"
          d="M0 0h996L892 46H96z"
          opacity=".598"
          transform="rotate(-180 498 23)"
        ></path></g></svg
    >
  </div>
</div>

<style>
  .Le {
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 200px;
  }
  .Le .msg {
    font-size: 24px;
    line-height: 1;
    color: #faaf00;
    white-space: nowrap;
  }
  .Le .amount {
    margin-left: 5px;
    color: #ffffff;
  }
  .Le img {
    width: 270px;
    height: 153px;
  }

  .fIoiVG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 2.75rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
  }
  .kQtbd .recent-list-wrap {
    background-color: rgba(49, 52, 60, 0.4);
    /* border-radius: 1.375rem; */
    padding: 0px 0.625rem;
    margin: 0px 0.625rem;
  }
  .fIoiVG .recent-list-wrap {
    flex: 1 1 auto;
    height: 100%;
    margin: 0px 1.5rem;
    overflow: hidden;
    position: relative;
    /* border-radius: 1.375rem; */
  }
  .fIoiVG .recent-list {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    padding: 0 20px;
    justify-content: flex-end;
  }
  .kQtbd .game-item.is-double {
    color: rgb(67, 179, 9);
  }
  .kQtbd .game-item.is-double .dot {
    background-color: rgb(67, 179, 9) !important;
  }
  .kQtbd .game-item.is-moon .dot {
    background-color: rgb(246, 199, 34) !important;
  }
  .kQtbd .game-item.is-moon {
    color: rgb(246, 199, 34);
  }
  .kQtbd .game-item {
    cursor: pointer;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    line-height: 0.875rem;
    background-color: transparent;
    position: relative;
    padding: 0 10px;
    color: #fb3d3d;
    text-align: left;
    gap: 3px;
    align-items: center;
    height: 100%;
  }
  .kQtbd .game-item .dot {
    width: .8rem;
    height: .8rem;
    border-radius: 0.1rem;
    background-color: #fb3d3d;
  }
  .kQtbd .game-item:hover::after {
    content: "";
    background-color: rgba(131, 125, 125, 0.089);
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }
  .kQtbd .game-item .issus {
    font-size: 0.7rem;
    font-weight: normal;
    margin-bottom: 0.125rem;
    color: rgba(153, 164, 176, 0.5);
  }
  .kQtbd .game-item > div:not(.dot) {
    flex: 0 0 auto;
    width: fit-content;
  }
  .kQtbd .game-item > div:not(.dot) > div:not(.issus) {
    width: fit-content;
  }
  .kCvsnZ {
    margin-right: 1.5rem;
    color: rgba(153, 164, 176, 0.6);
    min-height: 1.875rem;
    font-size: 1rem;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .kCvsnZ .icon {
    margin-right: 0.375rem;
  }

  .hxODWG {
    width: 1.4em;
    height: 1.4em;
    fill: rgba(153, 164, 176, 0.6);
  }
  .gcZuwC {
    position: relative;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
  }
  .dgiRGq {
    position: relative;
    margin-top: 1.875rem;
    margin-bottom: 1.25rem;
    min-height: 300px;
    height: 100%;
  }
  @media only screen and (max-width:650px){
      .dgiRGq {
      position: relative;
      margin-top: 1.875rem;
      margin-bottom: 1.25rem;
      min-height: 220px;
      height: 100%;
    }
  }
  @media only screen and (min-width:650px){
    .gcZuwC {
      padding: 0px 1.875rem 1.875rem;
    }
      .dgiRGq {
      position: relative;
      margin-top: 1.875rem;
      margin-bottom: 1.25rem;
      min-height: 300px;
      height: 100%;
    }
  }
  .dqwCNK {
    position: relative;
  }
  .gnjHQb {
    position: absolute;
    z-index: 2;
    right: 1.5rem;
    bottom: 1.25rem;
    font-weight: 500;
    min-width: 8.75rem;
    padding: 0px 1.125rem;
    border-radius: 1.125rem;
    height: 2.25rem;
    line-height: 2.25rem;
    color: rgba(153, 164, 176, 0.6);
    background-color: rgba(49, 52, 60, 0.4);
  }

  .dgiRGq > canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    transition: opacity 0.5s ease 0s;
  }
  canvas {
    user-select: none;
  }
  .dqwCNK .box-bg {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -1px;
    width: 100%;
  }
  .empty-item {
    text-align: center;
    display: flex;
    padding: 7px 120px 0 9px;
    justify-content: center;
  }
</style>
