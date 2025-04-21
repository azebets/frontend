<script>
	import axios from 'axios';
    import { onMount } from "svelte";
    import { serverUrl } from "$lib/backendUrl";
    import "../../styles/games.css"
    import Loader from "../loader.svelte";
    export let hash
    export let seed

    let hash_seed = hash || ""
    let salt = seed || ""
    $: point = null

    const VerifyHash = (async(data)=>{
        await axios.post(`${serverUrl()}/api/user/crash-game/verify`,{
                data
            })
            .then((res)=>{
                point = res.data
            })
        .catch((err)=>{ console.log(err.response.data)})
    })

    onMount(async()=>{
        if(hash_seed){
           await VerifyHash({hash_seed, salt})
        }
    })

    const handleSubmit = (async(data)=>{
       await VerifyHash(data)
    })

    $: track = !hash_seed
    
</script>

<div class="wrap svelte-1p93j4h">
    <label class="stacked svelte-1wzq4lo">
        <div class="input-wrap svelte-1u979cd">
            <div class="input-content svelte-1u979cd"> 
                <input autocomplete="on" class="input spacing-expanded svelte-1u979cd" maxlength="64" bind:value={hash_seed} type="text"> 
            </div>
        </div>
        <span class="label-content full-width svelte-1k9rtf3">
            <div class="label-left-wrapper svelte-1u979cd">
                <span >Hash</span> 
            </div> 
        </span>
    </label>
</div>

<div class="wrap svelte-1p93j4h">
    <label class="stacked svelte-1wzq4lo">
        <div class="input-wrap svelte-1u979cd">
            <div class="input-content svelte-1u979cd"> 
                <input autocomplete="on" class="input spacing-expanded svelte-1u979cd" bind:value={salt} type="text"> 
            </div>
        </div>
        <span class="label-content full-width svelte-1k9rtf3">
            <div class="label-left-wrapper svelte-1u979cd">
                <span>Salt</span> 
            </div> 
        </span>
    </label>
</div>

<button disabled={track} on:click={()=> handleSubmit({hash_seed,salt })} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button" style="margin: 20px 0;">
    <div class="button-inner"> Verify </div>
</button>

{#if !point}
    <div class="wrap svelte-1uf4dpw">
        <span class="weight-normal line-height-default align-left size-default text-size-default variant-subtle with-icon-space svelte-17v69ua" style="">More inputs are required to verify result</span>
        <div class="loader svelte-5ovsvp" style="height: 50px;">
            <Loader color={"default"}/>
        </div>
    </div>
{/if}

{#if point}
<div class="wrap svelte-1uf4dpw">
    <div class="wrapper svelte-5vfni3">
        <span class="weight-semibold line-height-default align-left size-2xl text-size-2xl variant-highlighted numeric with-icon-space svelte-17v69ua"
         style="color: #ffff; font-size:35px; font-weight: bold">{point}×</span>
    </div>
</div>
{/if}

{#if point}
    <div class="row-wrap svelte-16rgtah">
        <h2 class="weight-semibold line-height-default align-left size-default text-size-default variant-subtle with-icon-space svelte-17v69ua" style="">Final Result</h2>
        <div class="scrollX">
            <span class="weight-semibold line-height-default align-left size-medium text-size-medium variant-highlighted with-icon-space svelte-17v69ua" style="font-family: monospace;">{point}</span>
        </div>
    </div>
{/if}


{#if !point}
    <div class="loader svelte-5ovsvp" style="height: 190px;">
        <Loader color={"default"}/>
    </div>
{/if}



<style>

 h2.variant-subtle.svelte-17v69ua {
    color: #b1bad3;
}

span.align-left.svelte-17v69ua,  h2.align-left.svelte-17v69ua{
    text-align: left;
    font-size: 12px;
    justify-content: flex-start;
}
.row-wrap.svelte-16rgtah{
    margin-top: 16px;
}
</style>