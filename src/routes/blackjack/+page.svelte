<script>
    import "../../styles/home.css"
    import LiveLayout from "$lib/homeComponent/liveLayout.svelte";
    import NavTabs from "$lib/homeComponent/navTabs.svelte";
       import { Buyslots } from "$lib/homeComponent/hook"
</script>

<div class="css-7oel5t">
    <LiveLayout />
    <div style="height: 24px;"></div>
 
    <NavTabs />
    <div class="css-ojf8hg">
        <div class="css-1yx9de1">
           <div class="css-1y4bokc">
              <div class="css-1umk8r2">
                 <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="18" class="css-oluyn3" style="margin-right: 10px; color: rgb(94, 98, 111);">
                    <title>search</title>
                    <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                       <g transform="translate(2.000000, 2.000000)" fill="currentColor" id="Search">
                          <path d="M10.8907486,1.88158344 C8.56851055,-0.456863326 4.86024486,-0.63790201 2.32381727,1.46334318 C-0.212610329,3.56458838 -0.747072288,7.26041735 1.08908942,10.0015429 C2.92525113,12.7426685 6.5310935,13.6319691 9.41939979,12.0560283 L13.2412484,15.70857 C13.6557604,16.1041785 14.3079901,16.0960217 14.7125973,15.6901693 L15.6934965,14.703431 C16.1021678,14.2898609 16.1021678,13.621943 15.6934965,13.208373 L11.9848285,9.47072793 C13.3299497,6.97621926 12.8848765,3.88894492 10.8907486,1.88158344 Z M8.99640128,9.04521142 C7.93947287,10.1089675 6.34957152,10.4274154 4.96820775,9.8520349 C3.58684398,9.27665439 2.6861184,7.92078373 2.6861184,6.41678442 C2.6861184,4.91278512 3.58684398,3.55691446 4.96820775,2.98153395 C6.34957152,2.40615343 7.93947287,2.72460133 8.99640128,3.78835743 C10.4351638,5.24178142 10.4351638,7.59178743 8.99640128,9.04521142 L8.99640128,9.04521142 Z"></path>
                       </g>
                    </g>
                 </svg>
                 <input type="text" placeholder="Search originals" value=""></div>
                 <button class="css-ltx4sp" type="button">
                    <div class="css-xb95tu">Provider: <div class="css-18ifrrj">All</div>
                 </div>
                 <span style="margin-left: auto;">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                       <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                    </svg>
                 </span>
              </button>
              <button class="css-ltx4sp" type="button">
                 <div class="css-xb95tu">Sort by: 
                    <div class="css-18ifrrj">Popular</div>
                 </div>
                 <span style="margin-left: auto;">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                       <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                    </svg>
                 </span>
              </button>
           </div>
           <div class="css-1l01j61">
              {#each Buyslots as game}
                 <div>
                    <div class="css-d6icxj">
                       <img class="css-nyormw" src="{game.img}" alt="Mines">
                       <div class="css-1agvln2" style="display: none; background: rgba(39, 43, 56, 0.95);">
                          <div class="css-199grsv">Challenge Pool</div>
                          <div class="css-peshd1">$944.33</div>
                          <div class="css-199grsv">Effective RTP</div>
                          <div class="css-peshd1">99.20%</div>
                       </div>
                    </div>
                 </div>
              {/each}
             
           </div>
        </div>
     </div>
</div>

<style>
   
</style>