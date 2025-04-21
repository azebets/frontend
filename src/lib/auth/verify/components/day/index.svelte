<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let active  = 1
    let days = [1, 2,3 ,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

    const handleSelectDay = ((day)=>{
        dispatch("day", day)
        active = day
    })
</script>

<div class="css-rryysx" style="height: 575px; max-height: 575px; top: 10px; left: 284.333px;">
    <div class="css-5n8nj5">
        <div class="css-1m251ly">
            <div class="css-1cbyvgq">
                <div class="css-14hgewr">
                    <input type="text" placeholder="Search..." value=""></div>
                </div>
            <div class="css-y4ur04">
                {#each days as day}
                    <button on:click={()=> handleSelectDay(day)} class=" {active === day ? "css-r2sl12" : "css-1b5o7rl"}">{day}</button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
   
</style>