<script>
import moment from 'moment'
import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

$: months = []
export let active

onMount(()=>{
    const data = moment.months()
   months = data
})

const handleSelect = ((data)=>{
   dispatch("month", data)
})

</script>

<div class="css-rryysx" style="height: 511.5px; max-height: 511.5px; top: 73.5px; left: 413px;">
    <div class="css-5n8nj5">
        <div class="css-1m251ly">
            <div class="css-1cbyvgq">
                <div class="css-14hgewr">
                    <input type="text" placeholder="Search..." value="">
                </div>
            </div>
            <div class="css-y4ur04">
                {#each months as month}
                    <button on:click={()=> handleSelect(month)} class="{month === active ? "css-r2sl12" : "css-1b5o7rl"}">{month}</button>
                {/each}  
            </div>
        </div>
    </div>
</div>
