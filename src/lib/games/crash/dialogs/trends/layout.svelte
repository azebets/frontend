<script context="module">
  import { connect } from "svelte-mobx";
</script>

<script>
  const { autorun } = connect();
  import TrendBallDrawer from "../../logics/TrendBallDrawer";
  import { createEventDispatcher, onMount } from "svelte";
  import Draggable from "../../components/draggable.svelte";
  import { crashGame } from "../../store";
  import CrashInfoDialog from "../GameInfoDialog.svelte";
  let scrollTimeout;
  const oddsEngine = new TrendBallDrawer();
  const dispatch = createEventDispatcher();
  const handleClose = () => {
    dispatch("close", 5);
  };

  $: dotsContainer = null;
  $: renderedDots = [];
  function renderDots(history) {
    const oddsValues = history.slice(-192).map(({ odds }) => {
      if (odds < 2) return 1;
      if (odds < 10) return 2;
      return 3;
    });

    renderedDots = oddsEngine.render(oddsValues, 6, 32);
    // console.log("Dots ", renderedDots);
  }
  let game = null;
  $: {
    const _game = $crashGame;
    if (!game && _game) {
      game = _game;
      autorun(() => {
        renderDots([...game.history]);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (dotsContainer) {
            const { scrollLeft, scrollWidth } = dotsContainer;
            if (scrollLeft === 0 || scrollLeft > 350) {
              dotsContainer.scrollTo(scrollWidth, 0);
            }
          }
        }, 100);
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
<div id="main">
  <Draggable>
    <div class="sc-dJjYzT JLcsN dragpop"
      style="transform: translate3d(535.609px, 88px, 0px);" >
      <div class="dragpop-title">Trends</div>
      <button on:click={() => handleClose()} class="fLASqZ dragpop-close hover">
        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
          <title>Close</title>
          <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
          </g>
      </svg>
        </button>
      <div class="dragpop-content">
        <div class="sc-iJCbQK liaPil">
          <div class="dots-wrap" bind:this={dotsContainer}>
            <div class="dots">
              {#each renderedDots as dot, index (`${index}_${dot}`)}
                <div class="sc-fSDTwv grKOWb dot type-{dot}"></div>
              {/each}
            </div>
          </div>
          <button
            on:click={() => {
              dialogData = {
                startScreen: "Understanding Trend Chart",
              };
            }}
            class="sc-gDGHff cEhaBs"
            ><svg
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="sc-gsDKAQ hxODWG icon help-ico"
              ><use xlink:href="#icon_Help"></use></svg
            >
            <div>Understanding Trend Chart</div></button
          >
        </div>
      </div>
    </div>
  </Draggable>
</div>

<style>
  @media only screen and (min-width: 650px) {
    .JLcsN {
      position: fixed;
      z-index: 110;

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
    .dragpop-content .sc-iJCbQK {
      padding-top: 0px;
    }
    .liaPil {
      width: 430px;
      padding: 1rem;
    }
    .liaPil .dots-wrap {
      overflow: auto;
    }
    .cEhaBs {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
    }
    .liaPil .dots {
      width: 800px;
      display: grid;
      margin-bottom: 1rem;
      gap: 1px;
      grid-template-columns: repeat(32, 1fr);
    }
    .grKOWb {
      background-color: rgb(45, 48, 53);
      border-radius: 0.1875rem;
      position: relative;
    }
    .grKOWb::before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    .grKOWb.type-1::after {
      background-color: #fb3d3d;
    }
    .grKOWb::after {
      content: "";
      position: absolute;
      left: 15%;
      top: 15%;
      width: 70%;
      height: 70%;
      border-radius: 50%;
    }
    .grKOWb.type-3::after {
      background-color: rgb(246, 199, 34);
    }
    .grKOWb.type-2::after {
      background-color: rgb(67, 179, 9);
    }
    .grKOWb::after {
      content: "";
      position: absolute;
      left: 15%;
      top: 15%;
      width: 70%;
      height: 70%;
      border-radius: 50%;
    }
    .dots-wrap {
      overflow: auto;
    }
    .dots {
      width: 800px;
      display: grid;
      margin-bottom: 1rem;
      gap: 1px;
      grid-template-columns: repeat(32, 1fr);
    }
  }

  @media only screen and (max-width: 650px) {
    .dcGdSd {
      width: 100%;
      padding: 1rem;
      z-index: 1153;
      top: 26%;
    }
    .dots-wrap {
      overflow: auto;
    }
    .kFDPAv {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
    }
    .dots {
      width: 800px;
      display: grid;
      margin-bottom: 1rem;
      gap: 1px;
      grid-template-columns: repeat(32, 1fr);
    }
    .itetCR {
      background-color: rgb(45, 48, 53);
      border-radius: 0.1875rem;
      position: relative;
    }
    .itetCR::before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    .itetCR.type-2::after {
      background-color: rgb(67, 179, 9);
    }
    .itetCR::after {
      content: "";
      position: absolute;
      left: 15%;
      top: 15%;
      width: 70%;
      height: 70%;
      border-radius: 50%;
    }

    /* .itetCR.type-3::after {
    background-color: rgb(246, 199, 34);
} */
    .itetCR.type-1::after {
      background-color: #fb3d3d;
    }
    /* .JLcsN {
    position: fixed;
    z-index: 110;
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
.dragpop-content .sc-iJCbQK {
    padding-top: 0px;
}
.liaPil {
    width: 430px;
    padding: 1rem;
}
.liaPil .dots-wrap {
    overflow: auto;
}
.cEhaBs {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
.liaPil .dots {
    width: 800px;
    display: grid;
    margin-bottom: 1rem;
    gap: 1px;
    grid-template-columns: repeat(32, 1fr);
}
.grKOWb {
    background-color: rgb(45, 48, 53);
    border-radius: 0.1875rem;
    position: relative;
}
.grKOWb::before {
    content: "";
    display: block;
    padding-top: 100%;
}
.grKOWb.type-1::after {
    background-color: #fb3d3d;
}
.grKOWb::after {
    content: "";
    position: absolute;
    left: 15%;
    top: 15%;
    width: 70%;
    height: 70%;
    border-radius: 50%;
} */
    /* .grKOWb.type-3::after {
    background-color: rgb(246, 199, 34);
} */
    /* .grKOWb.type-2::after {
    background-color: rgb(67, 179, 9);
}

.dots-wrap {
    overflow: auto;
}
.dots {
    width: 800px;
    display: grid;
    margin-bottom: 1rem;
    gap: 1px;
    grid-template-columns: repeat(32, 1fr);
} */
  }
  .dragpop {
    z-index: 888;
  }
  .cEhaBs .help-ico {
    margin-right: 0.25rem;
    fill: rgb(67, 179, 9);
  }
  .hxODWG {
    width: 1.4em;
    height: 1.4em;
    fill: rgba(153, 164, 176, 0.6);
  }
</style>
