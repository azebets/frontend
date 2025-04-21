<script>
    export let wallet
    import Warning from "./warning.svelte";
   $: isVerified = false
</script>

<div>
    <h1 class="css-rhqiop">Deposit options</h1>
    <div class="css-1d5ntxf">
    {#each wallet as wa}
        <button on:click={()=> isVerified =! isVerified} class="css-1yhwmxl">
            <div class="css-tt41bp">
                <img src="{wa.coin_image}" alt="" size="32" class="css-bzek24">
            </div>
            <div class="css-1v92hyt">
                {wa.fullname}
                <div class="css-h7b5qw">{wa.coin_name}</div>
            </div>
        </button>
    {/each}
    </div>
</div>

{#if isVerified}
 <Warning on:close={()=> isVerified = false}/>
{/if}

<style>
   
</style>