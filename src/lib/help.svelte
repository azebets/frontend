<script>
export let route
export let handleRoutes

</script>
<div class="menuee">
    {#each route as re}
        <button on:click={()=>handleRoutes(re?.route)} class={ re?.active ? "select" : ''} href="{re?.route}">{re?.name}</button>
    {/each}
</div>
