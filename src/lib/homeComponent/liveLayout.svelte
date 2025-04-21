<script>
let arras = [1,3,4,5,6,7,8,9,0,9,8,7,6,5,4,3,2,1,3]
$: tab = 0
</script>

<div class="css-tpc4x9">
    <div class="css-njdirk">
        <button on:click={()=> tab = 0} class="{!tab ? "css-1ezjk2y" : "css-ap4xiv"} ">
            <div class="css-e63igi" style="margin: 0px 6px -1px 0px;"></div>
            LIVE WINS
        </button>
        <button on:click={()=> tab = 1} class="{tab === 1 ? "css-1ezjk2y" : "css-ap4xiv"}">M</button>
        <button on:click={()=> tab = 2} class="{tab === 2 ? "css-1ezjk2y" : "css-ap4xiv"}">W</button>
        <button on:click={()=> tab = 3} class="{tab === 3 ? "css-1ezjk2y" : "css-ap4xiv"}">D</button>
    </div>
    
    <div class="css-1am9shg">
        <div class="css-1pylomy">
            {#each arras as arr}
            <div class="css-3ezs24">
                <a href="/">
                    <div class="css-e4tx6e">
                        <img class="css-18g7uso" src="https://cdn.softswiss.net/i/s4/nolimit/Beheaded.webp" alt="">
                    </div>
                </a>
                <a href="/">
                    <div class="css-3v2xup" size="10">
                        <div size="15" class="css-1holazi">
                        <img src="https://rollbit.com/static/Icon%205%20(platinum)-BAlv4mS-.png" alt="" scale="1" class="css-1ago99h"></div>
                        <div class="css-o3tivt" style="color: white; font-weight: 500;">MMHKB02</div>
                    </div>
                    <div class="css-1ypeake">$106.90</div>
                </a>
            </div>
            {/each}
        </div>
    </div>

</div>

<style>
   
</style>