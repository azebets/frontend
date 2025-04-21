<script>
  import { crashGameType } from "./store";
  const changeGameType = (type) => {
    return (e) => {
        crashGameType.set(type)
    }
  }
</script>

<div class="sc-hKumaY FHHZH">
  <div class="sc-cxpSdN kQfmQV tabs">
    <div class="tabs-navs">
      <button on:click={changeGameType(1)} class="tabs-nav {$crashGameType === 1 ? 'is-active' : ''}">Classic</button>
      <button on:click={changeGameType(2)} class="tabs-nav {$crashGameType === 2 ? 'is-active' : ''}">Trenball</button>
      <div class="bg" style="left: {$crashGameType === 1 ? '0': '50'}%; right: {$crashGameType === 1 ? '50' : '0'}%;"></div>
    </div>
  </div>
</div>

<style>
  .FHHZH {
    margin: 0px 0.625rem 0.75rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .FHHZH .tabs {
    display: inline-flex;
    margin-right: auto;
  }

  .kQfmQV button.tabs-nav {
    width: 5.625rem;
  }

  .kQfmQV .tabs-nav.is-active {
    color: rgb(245, 246, 247);
    font-weight: bold;
  }

  .kQfmQV button.tabs-nav {
    width: 5.625rem;
  }


</style>
