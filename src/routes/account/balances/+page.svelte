<script>
    import { handleAuthToken} from "$lib/store/routes";
    import { handleChangeDefaultWallet } from "$lib/index"
    import { coin_list, default_Wallet } from "$lib/store/coins";
    import Loader from "$lib/loader.svelte";
    import { onMount } from "svelte";
    let loading = false
    $: totalBal = 0
    const selectDefaultWallet = (async(newItem)=>{
        loading = newItem
        const {response, isLoading} = await handleChangeDefaultWallet($handleAuthToken, newItem)
        if(response){
            coin_list.set(response)
            response.forEach(element => {
                if(element.is_active){
                    default_Wallet.set(element)
                }
            });
        }
        loading = isLoading
    })
    onMount(()=>{
        $coin_list.forEach(element => {
            totalBal += element.balance
        });
    })
</script>

<div class="css-t60dms">
    <div class="css-9sgg3p">
        <h3 class="css-qgoclk" style="margin: 0px auto 0px 0px;">Balances</h3>
        <!-- <button class="css-d9xzbh">Create Referral Balance</button> -->
    </div>
    <div class="css-1yx9de1">
        <div class="css-q0akof">
        <div class="css-1sg2lsz">
            Balance
        </div>
        {#if loading}
            <Loader color={"default"} />
        {/if}
        <div class="css-n4mkve">Total:<span>${(parseFloat(totalBal)).toFixed(2)}</span></div>
    </div>
    <div class="css-1e0k2gt">
        {#each $coin_list as coin}
            <button on:click={()=>selectDefaultWallet(coin)} class="css-ayxvns {coin?.is_active && "active"}">
                <div class="css-rx3rp4">
                    <div>
                        <label for="proof-radio-37235" class="css-13ahkye {coin?.is_active && "active"}">
                            <span class="css-dm6haw"></span>
                        </label>
                    </div>
                    <div class="css-cebha4">
                        <div class="css-15smzfl">{coin?.coin_name}</div>
                        <div class="css-1ooew8q">
                        <img src="{coin?.coin_image}" class="coin" alt="">
                            ${(parseFloat(coin?.balance)).toFixed(2)}
                        </div>
                    </div>
                </div>
            </button>
        {/each}
    </div>
</div>
</div>

<style>
   
</style>