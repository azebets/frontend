<script>
   import {crashGame } from "../store";
  import { browser } from "$app/environment";
  import { isLiveStat} from "$lib/store/activities";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import useFormatter from "$lib/game-hook/formatter";
  import useLiveStats from "$lib/game-hook/livestats";
  import { liveStats } from "../store";
  import {
    Chart,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Filler,
  } from "chart.js";
  Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Filler
  );
  $: chartContainer = null;
  const { removeTrailingZeros, getSuffix } = useFormatter();
  const { getStats, resetStats, recordGame } = useLiveStats(liveStats, "CRASH_LIVE_STATS");
  $: draggableContainer = null;
  $: stats = $liveStats || getStats();
  let chartInstance = null;
  let init = false;
  $: {
    const game = $crashGame;
    if (game && !init) {
      init = true;
      function handleBetResult({bets}) {
        bets.forEach(bet => {
          recordGame(bet.won, bet.wager, bet.profit, bet.currencyImage)
        });
      }
      game.on("user_bet_result", handleBetResult)
      onDestroy(() => {
        game.off("user_bet_result", handleBetResult)
      });
    }
    if (chartContainer && stats) {
      const ctx = chartContainer.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy(); // destroy the previous chart instance if it exists
      }
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: stats.points.length }, (_, i) => `${i}`),
          datasets: [
            {
              data: stats.points.map((p) => (p > 0 ? p : 0)),
              fill: true,
              backgroundColor: "#fb3d3d",
              borderColor: "#5da000",
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#FFFFFF",
              borderWidth: 3,
              tension: 0.3,
            },
            {
              data: stats.points.map((p) => (p < 0 ? p : 0)),
              fill: true,
              backgroundColor: "#fb3d3d68",
              borderColor: "#fb3d3d68",
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#FFFFFF",
              borderWidth: 3,
              tension: 0.3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              mode: "nearest",
              intersect: false,
              callbacks: {
                label: function (context) {
                  return !!context.parsed.y ? parseFloat(context.parsed.y).toFixed(4) : "";
                },
              },
            },
          },
          scales: {
            x: {
              display: false,
              stacked: true,
            },
            y: {
              display: false,
              stacked: true,
            },
          },
        },
      });
    }

    if (chartInstance && stats) {
      chartInstance.data.labels = Array.from(
        { length: stats.points.length },
        (_, i) => `${i}`
      );
      chartInstance.data.datasets[0].data = stats.points.map((p) =>
        p > 0 ? p : 0
      );
      chartInstance.data.datasets[1].data = stats.points.map((p) =>
        p < 0 ? p : 0
      );
      chartInstance.update();
    }
  }
  const handleResetStats = () => {
    resetStats(stats.token_img);
  };
  let initialX;

  let initialY;
  let x = window.innerWidth / 2 - 150;
  let y = window.innerHeight / 2 - 227;
  let maxX;
  let maxY;
  const dispatch = createEventDispatcher();
  $: dragging = false;
  const handlePointDown = (e) => {
    dragging = true;
    initialX = e.clientX - x;
    initialY = e.clientY - y;
    maxX = window.innerWidth - draggableContainer.clientWidth;
    maxY = window.innerHeight - draggableContainer.clientHeight;
  };
  const handlePointerMove = (e) => {
    if (dragging) {
      x = Math.min(Math.max(e.clientX - initialX, 0), maxX);
      y = Math.min(Math.max(e.clientY - initialY, 0), maxY);
    }
  };
  onMount(() => {
    const stopDragging = () => {
      dragging = false;
    };
    if (browser) {
      document.addEventListener("pointerup", stopDragging);
    }
    return () => {
      document.removeEventListener("pointerup", stopDragging);
    };
  });
</script>

<div
  bind:this={draggableContainer}
  on:pointermove={handlePointerMove}
  class="sc-dJjYzT JLcsN dragpop"
  style="left: {x}px; top: {y}px"
>
  <div  on:pointerdown={handlePointDown}
    class="dragpop-title {dragging ? 'grabbing' : ''}">
    Live Stats
  </div>
  <button on:click={() => isLiveStat.set(false)} class="dragpop-close fLASqZ hover">
    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
      <title>Close</title>
      <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
      </g>
  </svg>
    </button>
  <div class="dragpop-content">
    <div class="sc-dkPtRN jScFby scroll-view sc-eBTqsU eLzuEc">
      <div class="sc-zjkyB jElDBn">
        <div class="trigger flex-center m-item fold">
          <div class="current">Bet</div>
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="sc-gsDKAQ hxODWG icon"
            ><use xlink:href="#icon_Arrow"></use></svg>
        </div>
      </div>
      <div class="sc-jHwEXd dQxvCn m-item">
        <div class="title flex-center">
          <span>Bet</span><button on:click={handleResetStats} class="title-btn">
            <svg version="1.1"   class="sc-gsDKAQ hxODWG icon" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="95.396px" height="122.88px" viewBox="0 0 95.396 122.88" enable-background="new 0 0 95.396 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M0,93.349l30.717,29.531l0.002-19.008H85.11v-21.05h-0.002V68.516l0.002-0.413 l-0.004-18.861L64.06,69.475l0.002,13.348h-33.34l-0.004-19.008L0,93.349L0,93.349z M95.396,29.533L64.68,0l-0.002,19.011 l-28.031,0l-0.533-0.002l-25.827,0l-0.002,1.025v25.833l0.002,23.394h3.293l17.754-17.069v-5.794l0.002-0.535V40.06h33.34 l0.004,19.006L95.396,29.533L95.396,29.533L95.396,29.533z"/></g></svg>
            </button
          >
        </div>
        <div class="chart-cont">
          <div class="item-wrap wagered">
            <div class="item-label">Wagered</div>
            <div class="sc-Galmp erPQzq coin notranslate">
              <img alt="" class="coin-icon" src={stats.token_img} />
              <div class="amount">
                <span class="amount-str"
                  >{removeTrailingZeros(stats.wagered.toFixed(2))}<span
                    class="suffix">{getSuffix(stats.wagered.toFixed(2))}</span
                  ></span
                >
              </div>
            </div>
          </div>
          <div class="item-wrap profit">
            <div class="item-label">Profit</div>
            <div
              class="sc-Galmp erPQzq coin notranslate {stats.profit > 0
                ? 'cl-success'
                : 'cl-require'}"
            >
              <img alt="" class="coin-icon" src={stats.token_img} />
              <div class="amount">
                <span class="amount-str"
                  >{removeTrailingZeros(Math.abs(stats.profit).toFixed(2))}<span
                    class="suffix"
                    >{getSuffix(Math.abs(stats.profit).toFixed(2))}</span
                  ></span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="chart-wrap">
          <canvas bind:this={chartContainer}></canvas>
        </div>
        <div class="bet-wrap">
          <div class="bet-item win">
            <span class="txt ttc">win</span><span class="num cl-success"
              >{stats.wins}</span
            >
          </div>
          <div class="bet-item lose">
            <span class="txt ttc">lose</span><span class="num false"
              >{stats.loses}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dQxvCn .chart-cont {
    display: flex;
  }
  .JLcsN {
    position: fixed;
    z-index: 999;
    left: 0px;
    top: 0px;
    min-width: 12.5rem;
    min-height: 12.5rem;
    border-radius: 1.25rem;
    background-color: rgb(23, 24, 27);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0.25rem 0.5rem 0px;
  }
  .JLcsN .dragpop-title {
    flex: 1 1 0%;
    height: 3.125rem;
    line-height: 3.125rem;
    font-weight: bold;
    font-size: 1rem;
    color: rgb(245, 246, 247);
    text-align: center;
    touch-action: none;
    user-select: none;
    cursor: grab;
  }
  .JLcsN .dragpop-title.grabbing {
    cursor: grabbing;
  }
  .JLcsN .dragpop-close {
    position: absolute;
    right: 0px;
    top: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 3.125rem;
    height: 3.125rem;
  }
  .JLcsN .dragpop-close .icon {
    width: 0.875rem;
    height: 0.875rem;
  }
  .hxODWG {
    width: 1.4em;
    height: 1.4em;
    fill: rgba(153, 164, 176, 0.6);
  }
  .eLzuEc {
    font-size: 0.75rem;
    min-width: 300px;
    max-height: 70vh;
    margin-bottom: 1.125rem;
  }

  .jScFby {
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    touch-action: pan-y;
    overscroll-behavior: contain;
  }
  .jElDBn {
    position: relative;
  }
  .jElDBn .trigger {
    height: 2.5rem;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(245, 246, 247);
    cursor: pointer;
  }

  .eLzuEc .m-item {
    border-radius: 1.25rem;
    background: rgb(30, 32, 36);
    margin: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .jElDBn .trigger .icon {
    fill: rgba(245, 246, 247, 0.6);
    transform: rotate(0deg);
    transition: transform 200ms ease-in-out 0s;
  }

  .dQxvCn {
    width: 260px;
    height: 301.6px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    box-sizing: content-box;
    color: rgba(153, 164, 176, 0.6);
    padding-bottom: 1.25rem;
  }
  .eLzuEc .m-item > .title {
    height: 2.5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 600;
    color: rgb(245, 246, 247);
  }
  .dQxvCn > .title {
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
  .dQxvCn .chart-cont .item-wrap.wagered {
    flex: 1 1 0%;
  }
  .dQxvCn .chart-cont .item-wrap.wagered {
    flex: 1 1 0%;
  }
  .hover:hover svg {
    transform: rotate(-90deg);
    fill: rgb(245, 246, 247);
  }
  .erPQzq {
    display: inline-flex;
    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
  }
  .dQxvCn .chart-cont .item-wrap .coin-icon {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.3125rem;
  }
  .dQxvCn .chart-cont .item-wrap.wagered .amount {
    color: rgb(245, 246, 247);
  }

  .dQxvCn .chart-cont .item-wrap .amount {
    font-weight: 600;
  }
  .erPQzq .amount-str {
    width: 7em;
    display: inline-block;
  }
  .erPQzq .suffix {
    opacity: 0.5;
  }
  .dQxvCn .chart-cont .item-wrap .cl-require .amount {
    color: #fb3d3d !important;
  }

  .dQxvCn .chart-cont .item-wrap .cl-success .amount {
    color: rgb(67, 179, 9);
  }

  .dQxvCn .chart-cont .item-wrap.profit .amount {
    color: rgb(67, 179, 9);
  }
  .dQxvCn .chart-wrap {
    position: relative;
    width: 16.25rem;
    height: 10.9375rem;
  }
  .dQxvCn .bet-wrap {
    display: flex;
  }
  .dQxvCn .bet-wrap .win {
    flex: 1 1 0%;
  }
  .dQxvCn .bet-wrap .bet-item {
    display: flex;
  }
  .ttc {
    text-transform: capitalize;
  }
  .dQxvCn .bet-wrap .win .num {
    color: rgb(67, 179, 9);
  }

  .dQxvCn .bet-wrap .num {
    margin-left: 0.75rem;
    font-weight: 600;
  }
  .dQxvCn .bet-wrap .lose .num {
    color: #fb3d3d;
  }
 
</style>
