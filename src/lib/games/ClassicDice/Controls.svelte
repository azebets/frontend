<script>
import AutoControllers from "./AutoControllers.svelte";
import ManualControllers from "./ManualControllers.svelte";
import {Handles_alive} from "$lib/games/ClassicDice/store/index"
import { newScreen } from "$lib/store/screen";

let tab =  1
</script>

<div id="ClassicDice-control-0" class={`sc-hLVXRe cYiOHZ game-control ${$newScreen < 1200 ? "style1" : "style0" } `}>
    <div class="sc-iwjdpV ikWSlH radio game-control-switch">
        <button disabled={$Handles_alive} on:click={()=> tab = 1} class={`${tab === 1 && "is-active"}`}>
            <div class="label">Manual</div>
        </button>
        <button disabled={$Handles_alive}  on:click={()=> tab = 2} class={`${tab === 2  && "is-active"} `}>
            <div class="label">Auto</div>
        </button>
    </div>

    {#if tab === 1}
        <ManualControllers />
    {/if}
   {#if tab === 2}
        <AutoControllers />
    {/if}

</div>

<style>


</style>