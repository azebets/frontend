<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import { onMount } from 'svelte';
    export let allTimeZone
    export let active
    $: newCountryList = []
    

    const handleSelect = ((data)=>{
       dispatch("country", data)
    })

    onMount(()=>{
        newCountryList = [...allTimeZone]
    })

    const handleCountryFiltring = ((value)=>{
        newCountryList = allTimeZone.filter(i => i.Name.toLowerCase().includes(value.toLowerCase()));
    })
    
</script>
    
    <div class="css-rryysx" style="height: 575px; max-height: 575px; top: 10px; left: 509.5px;">
       <div class="css-5n8nj5">
            <div class="css-1m251ly">
                <div class="css-1cbyvgq">
                    <div class="css-14hgewr">
                        <input type="text" on:keyup={(e)=> handleCountryFiltring(e.target.value)} placeholder="Search..." >
                    </div>
                </div>
                <div class="css-y4ur04">
                    {#each newCountryList as country}
                        <button on:click={()=>handleSelect(country?.Name)} class="{country === active ? "css-r2sl12" : "css-1b5o7rl"}">{country.Name}</button>
                    {/each}
                </div>
            </div>
       </div>
    </div>
    
    <style>
       
    </style>