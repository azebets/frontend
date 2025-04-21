<script>
import Help from "$lib/help.svelte";
import { url, seaser } from "$lib/store/routes";
import "../../styles/fair.css";
import { newScreen } from "$lib/store/screen";
import { goto } from "$app/navigation";

let active_route = ""
$: is_open = false

let routesEl = [
    {id:1, name: "Overview", route: "overview", active: $url === "/provably-fair/overview" ? true : false},
    {id:1, name: "Implementation", route: "implementation", active: $url === "/provably-fair/implementation" ? true :false},
    {id:1, name: "Conversions", route: "conversions", active: $url === "/provably-fair/conversions" ? true :false},
    {id:1, name: "Game Events", route: "game-events", active: $url === "/provably-fair/game-events" ? true :false},
    {id:1, name: "Calculation", route: "calculation", active: $url === "/provably-fair/calculation" ? true :false},
]

routesEl.forEach(element => {
    if(element.route === "overview"){
        active_route = element
    }
});

const handleRoutes = ((route)=>{
    goto(`${route}`)
    routesEl.forEach(element => {
        if(element.route === route){
                active_route = element
                element.active = true
        }else{
            element.active = false
        }
        routesEl = routesEl
    });
    is_open = false
})

</script>

<div class="sc-lhMiDA ePAxUv">
    <div id="helpcenter">
        <div class="sc-hKumaY dUhyFv">
            <p class="title">
                <!-- <Icon src={VscLaw}  size="24"  color="rgb(67, 179, 9)" className="custom-icon" title="arror" /> -->
                <span class="ttc">Provably Fair</span>
            </p>
            <button on:click={()=> goto('/')} class="sc-ieecCq fLASqZ close-icon ">
                <!-- <Icon src={IoCloseSharp}  size="18"  color="rgba(153, 164, 176, 0.6)" className="custom-icon" title="arror" /> -->
            </button>
        </div>
        {#if $newScreen < 1100}
        <div class="sc-jJoQJp gOHquD select {is_open ? "is-open" : ""} ">
            <button on:click={()=> is_open =! is_open} class="select-trigger">
                {active_route.name}
                <div class="arrow ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon" viewBox="0 0 221.14 133.14"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/></g></g></svg>
                </div>
            </button>
            {#if is_open}
                <div class="sc-hiCibw iVwWcQ select-options-wrap" style="opacity: 1; top: 100%; transform: none;">
                    <div class="sc-dkPtRN jScFby scroll-view select-options len-13">
                        {#each routesEl as route}
                            <button on:click={()=> handleRoutes(route.route)} class="select-option {route.active ? "active" : ""}">{route.name}</button>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
        <div class="sc-GEbAx hJFGXE pc">
            <div class="content-area">
                {#if $newScreen > 1100}
                    <Help route={routesEl} {handleRoutes}/>
                {/if}
                <div class="right-info">
                    <div style="transform: translate3d(0px, 0px, 0px); opacity: 1;">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>


 .select {
    width: 100%;
    padding-left: 0.5rem;
}
.gOHquD {
    position: relative;
    height: 2.5rem;
    opacity: 1;
}
.select .select-trigger {
    width: 15rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    color: rgb(245, 246, 247);
    font-weight: bold;
    background-color: rgba(203, 215, 255, 0.03)
}

.hJFGXE{
    margin-top: 0.875rem;
    border-radius: 1.25rem;
    margin-bottom: 2.25rem;
    min-height: 40vh;
}
.gOHquD.is-open .select-options-wrap {
    pointer-events: auto;
}
.iVwWcQ {
    position: absolute;
    padding: 0.3125rem 0px;
    width: 100%;
    left: 0px;
    z-index: 2;
    pointer-events: none;
}
.iVwWcQ .select-options {
    border-radius: 1.25rem;
    padding: 0.125rem 0.375rem;
    background-color: rgb(31, 35, 48);
    box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 8px 0px;
    height: auto;
    max-height: 16.25rem;
}
.iVwWcQ .select-option {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    padding: 0px 0.625rem;
    font-size: 0.875rem;
    height: 2rem;
    margin: 0.25rem 0px;
    border: 1px solid transparent;
    border-radius: 1.0625rem;
    cursor: pointer;
    width: 100%;
    color: rgba(153, 164, 176, 0.6);
    white-space: nowrap;
}
.iVwWcQ .select-options:not(.len-1) > .active {
    border-color: rgba(91, 174, 28, 0.4);
}
.select .select-options .select-option {
    height: 2.25rem;
    margin-top: 0.75rem;
    font-size: 0.875rem;
}
.iVwWcQ .select-options:not(.len-1) > .active::after {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    top: 50%;
    margin-top: -0.25rem;
    right: 0.625rem;
    background-color: rgb(67, 179, 9);
    box-shadow: rgba(91, 174, 28, 0.15) 0px 0px 0px 0.3125rem;
}
</style>