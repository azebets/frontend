<script>
export let user
</script>

<div class="fc head">
    <div class="title">Statistics</div>
    <div class="sc-jJoQJp gOHquD select  is-open ">
        <div class="select-trigger">
            Global
            <div class="arrow right">
               <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon small" viewBox="0 0 221.14 133.14">
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <div class="sc-hiCibw iVwWcQ select-options-wrap" style="opacity: 1; top: 100%; transform: none;">
            <div class="sc-dkPtRN jScFby scroll-view select-options len-20">
                <div class="select-option active">Global</div>
                <div class="select-option">Crash</div>
            </div>
        </div>
    </div>
    <div class="user-info flex-center">
        <img class="avatar " alt="" src="{user?.profileImg}">
        <div class="flex-column">
            <div class="user-name">{user?.username}</div>
        </div>
    </div>
</div>

<div class="sc-gXRojI bRYT">
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
            <div class="item-value">1</div>
        </div>
        <div class="item">
            <div class="item-type darken">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon wagered-icon">
                    <use xlink:href="#icon_TotalWager"></use>
                </svg>
                Total Wagered
            </div>
            <div class="item-value">0.00 USD</div>
        </div>
    </div>
</div>

<div class="sc-gXRojI bRYT statistics__list">
    <div class="thead darken">
        <div class="th">Currency</div>
        <div class="th">Win</div>
        <div class="th">Bet</div>
        <div class="th">Wagered</div>
    </div>
    <div class="tbody">
        <div class="tr">
            <div class="td fc bold">
                <img class="coin-icon" alt="" src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1721026027/Fun_Coupon_-_Blue_c60t1j.jpg">CUB</div>
                <div class="td">0</div>
                <div class="td">1</div>
                <div class="td bold">
                    <div class="sc-Galmp erPQzq coin notranslate monospace">
                        <div class="amount">
                            <span class="amount-str">100.<span class="suffix">000000</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sc-cCcXHH dXTFyi pagination ">
        <div class="sc-cidDSM cIVSjY">Total 1</div>
        <div class="sc-jcFjpl sc-iUKqMP dORpLZ jrpAIs pages-wrap">
            <button class="active" disabled="">1</button>
        </div>
        <div class="sc-jcFjpl sc-iUKqMP dORpLZ jrpAIs page-pn">
            <button disabled="" class="disabled previous-btn">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon prev">
                    <use xlink:href="#icon_Arrow"></use>
                </svg>
            </button>
            <button disabled="" class="disabled next-page">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon next">
                    <use xlink:href="#icon_Arrow"></use>
                </svg>
            </button>
        </div>
    </div>
</div>