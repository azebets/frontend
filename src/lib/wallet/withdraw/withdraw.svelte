<script>
    import { goto } from "$app/navigation"
    import { url } from "$lib/store/routes";

    import Detailed from "./detailed.svelte";
    export let wallet
    export let currency
    $: activeCoin = ""
    $:{
        if(currency){
            wallet.forEach(element => {
                if((element.coin_name).toLowerCase() === currency){
                    activeCoin = element
                }
            });
        }
    }
      
</script>

{#if !currency}
    <div>
        <h1 class="css-rhqiop">Withdrawal options</h1>
        <div class="css-1d5ntxf">
        {#each wallet as wa}
            <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=withdraw&cur=${(wa.coin_name).toLowerCase()}`)} class="css-1yhwmxl">
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
{/if}

{#if currency}
    <Detailed activeCoin={activeCoin}/>
{/if}

<style>
   
</style>