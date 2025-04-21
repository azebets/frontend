<script>
    import { goto } from "$app/navigation";
    import { url } from "$lib/store/routes";
    export let id
</script>

<div class="sc-gXRojI sc-imVSVl bRYT jLwYYm">
    <div class="module-name">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon icon-name">
            <use xlink:href="#icon_Statistics"></use>
        </svg>
        Statistics
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=user&modal=stat&id=${id}`)} class="hover">
            Details
            <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon small" viewBox="0 0 221.14 133.14">
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/>
                    </g>
                </g>
            </svg>
        </button>
    </div>
    <div class="content">
        <div class="sc-bGaVxB gvTPwc">
            <div class="item">
                <div class="item-type darken">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon wins-icon">
                        <use xlink:href="#icon_Bet"></use>
                    </svg>
                    Total Wins
                </div>
                <div class="item-value">0</div>
            </div>
            <div class="item">
                <div class="item-type darken">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon bets-icon">
                        <use xlink:href="#icon_Coin"></use>
                    </svg>
                    Total Bets
                </div>
                <div class="item-value">0</div>
            </div>
            <div class="item">
                <div class="item-type darken">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon wagered-icon">
                        <use xlink:href="#icon_TotalWager"></use>
                    </svg>
                    Total Wagered
                </div>
                <div class="item-value">0 USD</div>
            </div>
        </div>
    </div>
</div>