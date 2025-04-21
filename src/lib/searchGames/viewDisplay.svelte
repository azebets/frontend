<script>
    export let tab
      import { handleListGame, slots , livGames, Buyslots} from "$lib/homeComponent/hook"
      const allGames = [...handleListGame(),...slots, ...livGames, ...Buyslots]
    $: displayView = tab === "all-game" ? allGames : tab === "slots" ? slots :  tab === "originals" ? handleListGame() : tab === "live-casino" || tab === "blackjack" ? livGames  : tab === "roulette" || tab === "game-shows" ? Buyslots : []
    let newdisplayViewList = []
     $: newdisplayViewList = [...displayView]
    
     const handleCountryFiltring = ((value)=>{
        newdisplayViewList = displayView.filter(i => i.name.toLowerCase().includes(value.toLowerCase()));
    })


</script>

<div class="css-1yx9de1">
    <h1 class="css-rhqiop">Select Game</h1>
    <div class="css-1y4bokc">
        <div class="css-1b3khn7">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="18" class="css-oluyn3" style="margin-right: 10px; color: rgb(94, 98, 111);">
                <title>search</title>
                <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(2.000000, 2.000000)" fill="currentColor" id="Search">
                        <path d="M10.8907486,1.88158344 C8.56851055,-0.456863326 4.86024486,-0.63790201 2.32381727,1.46334318 C-0.212610329,3.56458838 -0.747072288,7.26041735 1.08908942,10.0015429 C2.92525113,12.7426685 6.5310935,13.6319691 9.41939979,12.0560283 L13.2412484,15.70857 C13.6557604,16.1041785 14.3079901,16.0960217 14.7125973,15.6901693 L15.6934965,14.703431 C16.1021678,14.2898609 16.1021678,13.621943 15.6934965,13.208373 L11.9848285,9.47072793 C13.3299497,6.97621926 12.8848765,3.88894492 10.8907486,1.88158344 Z M8.99640128,9.04521142 C7.93947287,10.1089675 6.34957152,10.4274154 4.96820775,9.8520349 C3.58684398,9.27665439 2.6861184,7.92078373 2.6861184,6.41678442 C2.6861184,4.91278512 3.58684398,3.55691446 4.96820775,2.98153395 C6.34957152,2.40615343 7.93947287,2.72460133 8.99640128,3.78835743 C10.4351638,5.24178142 10.4351638,7.59178743 8.99640128,9.04521142 L8.99640128,9.04521142 Z"></path>
                    </g>
                </g>
            </svg>
            <input type="text" on:keyup={(e)=> handleCountryFiltring(e.target.value)} placeholder="Search games" value="">
        </div>
    </div>
    <div class="css-1l01j61">
        {#each newdisplayViewList as game}
        <div class="css-d6icxj">
            <img class="css-nyormw" src="{game.img}" alt="">
        </div>
        {/each}
        <div>
    </div>
    </div>
</div>

<style>
   
</style>