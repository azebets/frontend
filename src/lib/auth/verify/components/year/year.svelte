<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let active
let years = Array.from(Array(new Date().getFullYear() - 1940), (_, i) => (i + 1950).toString())

const handleSelect = ((data)=>{
   dispatch("year", data)
})

</script>

<div class="css-rryysx" style="height: 575px; max-height: 575px; top: 10px; right: 30%;">
   <div class="css-5n8nj5">
        <div class="css-1m251ly">
            <div class="css-1cbyvgq">
                <div class="css-14hgewr">
                    <input type="text" placeholder="Search..." value="">
                </div>
            </div>
            <div class="css-y4ur04">
                {#each years as year}
                    <button on:click={()=>handleSelect(year)} class="{year === active ? "css-r2sl12" : "css-1b5o7rl"}">{year}</button>
                {/each}
            </div>
        </div>
   </div>
</div>

<style>
   
</style>