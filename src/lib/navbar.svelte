<script>
    import "../styles/navbar.css";
    import { screen } from "$lib/store/screen";
    import { createEventDispatcher } from "svelte";
    import { isLoggin } from "$lib/store/activities";
    import { url } from "$lib/store/routes";
    import { browser} from '$app/environment';
    import { goto } from "$app/navigation"
    import { default_Wallet } from "$lib/store/coins";
    import Menu from "./homeNav/menu.svelte";
    import { user } from "$lib/store/profile";
    import Balance from "./homeComponent/balance.svelte";
    const dispatch = createEventDispatcher();

    const logo = new URL('../lib/images/Cyclix Games Casino Logo Updated.png', import.meta.url).href;
    const badge = new URL('../lib/images/profile pic/avatar44.png', import.meta.url).href;
    export let sideHasExpand;
    export let chat;
    export let menu;
    $: isMenu = false;
    $: showBalance = false;

    function clickOutsde(element, callbackFucntion){
        function onClick(event){
            if(!element.contains(event.target)){
                callbackFucntion()
            }
        }
        browser && document.body.addEventListener("click", onClick)
        return {
            update(newCallbackFunction){
                callbackFucntion = newCallbackFunction
            },
            destroy(){
                browser && document.body.removeEventListener("click", onClick)
            }
        }
    }

</script>


{#if $isLoggin}
    <div  class="css-1cn0dze" style="height: {$screen > 750 ? "64" : "112"}px;">
        {#if $screen > 750}
        <div class="css-1gjaexy">
            <div class="css-1orxpag">
                <a href="/">
                    <img src="{logo}" class="logo" alt="rollbit">
                </a>
            </div>
            <div class="css-1orxpag" style="margin-left: 0px;">
                <div  use:clickOutsde={()=>  showBalance = false}>
                    <button on:click={()=> showBalance =! showBalance}>
                        <div class="css-nq7c33">
                            <div class="css-12frltk">
                               <img src="{$default_Wallet?.coin_image}" alt="">
                            </div>
                            <div class="">${(parseFloat($default_Wallet?.balance)).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                            <div class="css-17wlo94">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="8" color="#B1B6C6" class="css-dkv1ld">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                    {#if showBalance}
                        <Balance on:close={()=> showBalance = false}/>
                    {/if}
                </div>
                <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=deposit`)} class="css-1psueex" style="padding: 0px 16px;">Cashier</button>
            </div>
            <div class="css-1v3z295">
                <!-- <button class="css-1fs5j72">
                    <img alt="" src="" size="26" class="css-p4ugjj">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="8" class="css-dkv1ld" style="color: rgb(177, 182, 198);">
                        <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                    </svg>
                </button> -->
                <div use:clickOutsde={()=> isMenu= false}>
                    <button on:click={()=> isMenu =! isMenu} class="css-8owx8k">
                        <div size="30" class="css-10uf4u5">
                            <img src="{$user?.profileImg}" alt="" scale="0.96" style="border-radius: 50%;" class="css-zipauw"></div>
                            <div style="margin: -2px 10px 0px 1px; min-width: 50px;">
                                <div class="css-dlpzwc">{$user?.username}</div>
                                <div color="#E5A480" class="css-116wgzz"></div>
                            </div>
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="8" class="css-dkv1ld" style="color: rgb(177, 182, 198);">
                                <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                            </svg>
                    </button>
                    {#if isMenu}
                        <Menu on:close={()=> isMenu = false}/>
                    {/if}
                </div>
               
                {#if $screen > 1000}
                <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?modal=search&tab=all-game`)} class="css-qik1t1">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="19" class="css-1duiatx">
                        <title>search</title>
                        <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(2.000000, 2.000000)" fill="currentColor" id="Search">
                                <path d="M10.8907486,1.88158344 C8.56851055,-0.456863326 4.86024486,-0.63790201 2.32381727,1.46334318 C-0.212610329,3.56458838 -0.747072288,7.26041735 1.08908942,10.0015429 C2.92525113,12.7426685 6.5310935,13.6319691 9.41939979,12.0560283 L13.2412484,15.70857 C13.6557604,16.1041785 14.3079901,16.0960217 14.7125973,15.6901693 L15.6934965,14.703431 C16.1021678,14.2898609 16.1021678,13.621943 15.6934965,13.208373 L11.9848285,9.47072793 C13.3299497,6.97621926 12.8848765,3.88894492 10.8907486,1.88158344 Z M8.99640128,9.04521142 C7.93947287,10.1089675 6.34957152,10.4274154 4.96820775,9.8520349 C3.58684398,9.27665439 2.6861184,7.92078373 2.6861184,6.41678442 C2.6861184,4.91278512 3.58684398,3.55691446 4.96820775,2.98153395 C6.34957152,2.40615343 7.93947287,2.72460133 8.99640128,3.78835743 C10.4351638,5.24178142 10.4351638,7.59178743 8.99640128,9.04521142 L8.99640128,9.04521142 Z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
                {#if sideHasExpand === 8}
                <button on:click={()=> dispatch("return")} class="css-qik1t1">
                    <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="15.5" top="1" class="css-ouqosf">
                        <title>global-chat</title>
                        <g id="\uD83D\uDCDD-Style-Guide" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                            <g id="Rollbit-StyleGuide" transform="translate(-332.000000, -3228.000000)">
                                <g id="Group-33" transform="translate(250.000000, 3192.000000)">
                                    <g id="global-chat" transform="translate(80.000000, 33.000000)"><g>
                                        <path d="M4,15 C2.8954305,15 2,14.1045695 2,13 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 L18,13 C18,14.1045695 17.1045695,15 16,15 L15,15 L15,17.5350238 C15,17.6299398 14.9662479,17.721763 14.9047757,17.7940832 C14.7617012,17.9624062 14.5092636,17.9828741 14.3409406,17.8397995 L14.3409406,17.8397995 L11,15 L4,15 Z" id="Combined-Shape" fill="currentColor"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                </button>
                {/if}
            {/if}
            </div>
        </div>
        {/if}

        {#if $screen < 750}
            <div class="css-1cfnue">
                <div class="css-15ztagm">
                    <a href="/" style="margin-right: auto;">
                        {#if $screen > 480}
                            <img src="{logo}" class="logo" alt="rollbit" style="margin-left: 10px;">
                        {/if}
                        {#if $screen < 480}
                            <img src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1719796036/Cas_najlrp_q9m22k.png" class="logo2" alt="rollbit" style="margin-left: 10px;">
                        {/if}
                    </a>
                    <button on:click={()=> showBalance =! showBalance}>
                        <div class="css-nq7c33">
                            <div class="css-12frltk">
                                <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" size="16" color="#B1B6C6" top="-1" class="css-djv53h">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 1.51182C0.5 1.29081 0.596945 1.0866 0.800946 1.00157C1.38377 0.758637 2.99924 0.333313 7.16667 0.333313C11.3341 0.333313 12.9496 0.758637 13.5324 1.00157C13.7364 1.0866 13.8333 1.29081 13.8333 1.51182V4.1548C13.8333 4.37582 13.7364 4.58002 13.5324 4.66506C12.9496 4.90799 11.3341 5.33331 7.16667 5.33331C2.99925 5.33331 1.38377 4.90799 0.800947 4.66506C0.596946 4.58002 0.5 4.37582 0.5 4.1548V1.51182ZM12.1667 1.58331C12.1667 1.81343 9.92809 1.99998 7.16667 1.99998C4.40524 1.99998 2.16667 1.81343 2.16667 1.58331C2.16667 1.35319 4.40524 1.16665 7.16667 1.16665C9.92809 1.16665 12.1667 1.35319 12.1667 1.58331Z" fill="currentColor"></path>
                                    <path d="M2.51933 5.91492C2.34491 5.89093 2.16667 5.99058 2.16667 6.16665V6.16665V8.32147C2.16667 8.54248 2.26361 8.74669 2.46761 8.83172C3.05044 9.07466 4.66591 9.49998 8.83333 9.49998C13.0008 9.49998 14.6162 9.07466 15.1991 8.83172C15.4031 8.74669 15.5 8.54248 15.5 8.32147V6.16665C15.5 5.70641 15.1269 5.33331 14.6667 5.33331H14.2695C14.1254 5.33331 13.9861 5.37878 13.853 5.43424V5.43424C13.1143 5.74213 11.3641 6.16665 7.16667 6.16665C5.06322 6.16665 3.57433 6.06004 2.51933 5.91492Z" fill="currentColor"></path>
                                    <path d="M2.147 9.60091C2.01393 9.54544 1.87464 9.49998 1.73047 9.49998H1.33333C0.873096 9.49998 0.5 9.87308 0.5 10.3333V12.4881C0.5 12.7091 0.596946 12.9134 0.800947 12.9984C1.38377 13.2413 2.99925 13.6666 7.16667 13.6666C11.3341 13.6666 12.9496 13.2413 13.5324 12.9984C13.7364 12.9134 13.8333 12.7091 13.8333 12.4881V10.3333V10.3333C13.8333 10.1572 13.6551 10.0576 13.4807 10.0816C12.4257 10.2267 10.9368 10.3333 8.83333 10.3333C4.63589 10.3333 2.88566 9.9088 2.147 9.60091V9.60091Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div class="">$0.00</div>
                            <div class="css-17wlo94">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="8" color="#B1B6C6" class="css-dkv1ld">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                    <button class="css-mdzzty">
                        <svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" size="16" top="-0.5" class="css-1fmr122">
                            <path d="M11.9296 2.04545H1.43051e-06C1.43051e-06 1.50297 0.214421 0.982697 0.596091 0.5991C0.97776 0.215503 1.49542 0 2.03518 0H9.89447C10.4342 0 10.9519 0.215503 11.3336 0.5991C11.7152 0.982697 11.9296 1.50297 11.9296 2.04545ZM16 7.5V10.2273H13.2864C12.9266 10.2273 12.5815 10.0836 12.327 9.82787C12.0726 9.57214 11.9296 9.2253 11.9296 8.86364C11.9296 8.50198 12.0726 8.15513 12.327 7.8994C12.5815 7.64367 12.9266 7.5 13.2864 7.5H16ZM10.5729 8.86364C10.5729 9.58695 10.8588 10.2806 11.3676 10.7921C11.8765 11.3036 12.5667 11.5909 13.2864 11.5909H16V12.9545C16 13.497 15.7856 14.0173 15.4039 14.4009C15.0222 14.7845 14.5046 15 13.9648 15H2.03518C1.49542 15 0.97776 14.7845 0.596091 14.4009C0.214421 14.0173 1.43051e-06 13.497 1.43051e-06 12.9545L0 3.83807C0 3.65724 0.0714732 3.48382 0.198696 3.35595C0.32592 3.22808 0.498471 3.15625 0.678392 3.15625H13.9648C14.5046 3.15625 15.0222 3.37175 15.4039 3.75535C15.7856 4.13895 16 4.65922 16 5.2017L16 6.13636H13.2864C12.5667 6.13636 11.8765 6.4237 11.3676 6.93516C10.8588 7.44663 10.5729 8.14032 10.5729 8.86364Z" fill="currentColor"></path>
                        </svg>
                    </button>
                    
                    <button on:click={()=> isMenu =! isMenu} class="{$screen > 470 ? "css-8owx8k" : "css-tziciz"}">
                        <div size="30" class="css-10uf4u5">
                            <img src="{$user?.profileImg}" alt="" scale="0.96" class="css-zipauw">
                        </div>
                        {#if $screen > 470}
                            <div style="margin: -2px 10px 0px 1px; min-width: 50px;">
                                <div class="css-dlpzwc">Account</div>
                                <div color="#E5A480" class="css-116wgzz"></div>
                            </div>
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="8" class="css-dkv1ld" style="color: rgb(177, 182, 198);">
                                <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                            </svg>
                        {/if}
                    </button>
                </div>
                <div class="css-15ztagm" style="margin-right: -10px;">
                    <a on:click={()=> dispatch("menu")} class="{menu ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                        <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" size="16" top="-1.3" class="css-ryl7dy">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91242 0.771813C10.1561 -0.264233 12.8053 0.591843 14.0327 2.74954C15.0869 4.60188 14.8103 6.93874 13.3527 8.49403L15.3124 11.9422C15.528 12.3234 15.3984 12.8102 15.0224 13.0317L14.1209 13.5593C13.7493 13.7761 13.2756 13.6547 13.0523 13.2854L10.9942 9.87718C8.59772 10.4617 6.16 9.10944 5.36252 6.75319C4.56503 4.39695 5.66878 1.80786 7.91242 0.771813ZM8.19956 7.4017C9.0879 8.09078 10.3006 8.16917 11.272 7.60032C12.5954 6.82204 13.0512 5.1094 12.2916 3.76921C11.7329 2.78757 10.6437 2.24502 9.53219 2.3946C8.42064 2.54418 7.50563 3.35643 7.21391 4.45251C6.92219 5.5486 7.31122 6.71263 8.19956 7.4017Z" fill="currentColor"></path>
                            <path d="M11.6328 13.6667L10.4826 11.7619H0.885376C0.626493 11.7619 0.416626 11.9751 0.416626 12.2381V13.1905C0.416626 13.4535 0.626493 13.6667 0.885376 13.6667H11.6328Z" fill="currentColor"></path>
                            <path d="M0.885376 8.9048H4.90513C4.53925 8.40287 4.24237 7.83721 4.03269 7.21769C4.00819 7.14529 3.98507 7.07273 3.96332 7.00004H0.885376C0.626493 7.00004 0.416626 7.21324 0.416626 7.47623V8.42861C0.416626 8.69161 0.626493 8.9048 0.885376 8.9048Z" fill="currentColor"></path>
                            <path d="M3.78445 4.1429C3.89618 3.47587 4.11366 2.83247 4.4258 2.23814H0.885376C0.626493 2.23814 0.416626 2.45133 0.416626 2.71433V3.66671C0.416626 3.9297 0.626493 4.1429 0.885376 4.1429H3.78445Z" fill="currentColor"></path>
                        </svg> 
                        Browse
                    </a>
                    <a class="{!menu && !chat ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" size="16" top="-1" class="css-djv53h">
                            <path d="m4.35514362 7.92721639c2.91007931-.66629828 4.44813965.97471551 4.3508 3.23924141-.10319138 2.4005741-1.94800517 4.3507793-4.3508 4.3507793s-4.2476-1.9502052-4.35079138-4.3507793c-.09733966-2.2645259 1.44072069-3.90553969 4.35079138-3.23924141zm3.6274931-.03738966c.7002931-.54673965 1.73978793-.75768276 3.08639998-.44887414 2.7725328-.63450172 4.237269.92980173 4.1444604 3.08638961-.0978759 2.2882311-1.8562293 4.1461937-4.1444604 4.1461937-.916142.0036007-1.80588854-.3066792-2.52110515-.8792126.48664578-.7831112.76167454-1.6791367.79817931-2.6004155.05232414-1.19472934-.30543448-2.25447245-1.00404483-2.9834759-.11162312-.11570699-.2317701-.22287617-.35942931-.32060517zm.83490862-7.85440862c.10442931-.15480172.62792931.23955.7506138.38031724.0588756.06766806.08845543.1559547.08223101.24543407-.00622442.08947938-.04774312.17282021-.11542067.2316849-.34479483.29998276-.67182931.60468793-.98477759.91256896-.00072241.00424138-.0004431.00841035-.00133103.01265173-.31438621 1.50385.62036379 2.65004483 1.52440694 3.75842586.3211948.3763426.6179392.7728841.8884086 1.18718621-.2941333-.0569208-.5921733-.09136574-.8915362-.10303621-.16120003-.21500862-.33937589-.43396207-.520969-.65664828-.79443965-.97404827-1.67392241-2.05685689-1.73426724-3.43637931-1.36350517 1.49199138-2.35765345 3.05372587-2.94072069 4.61642069-.17046724.02173276-.3431862.04895862-.51909138.08553621-.07228275-.01502241-.14352241-.02697759-.21494827-.03950517.60366552-1.75580517 1.69207758-3.50735862 3.21826034-5.16671035.15308659-.16496947.29482416-.34011798.42423966-.5242431.34505345-.49553104.69266034-.99636724 1.03490172-1.50370345zm.89024483 1.19877069c.30354653-.04891724 2.42520003.09100172 3.35097763.78911724 1.1285879.85105 1.0841086 1.17696897 1.5514758 3.41212414-1.2950707-.22524655-2.3635362-.29004828-3.7597258-1.53043448-.7561583-.67817159-1.17434952-1.65557681-1.14272763-2.6708069z"></path>
                        </svg> 
                        Home
                    </a>
    
                    <a  on:click={()=> dispatch("chat")} class="{chat ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                        <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="14.5" top="-0.7" class="css-62cmra">
                            <title>global-chat</title>
                            <g id="\uD83D\uDCDD-Style-Guide" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                                <g id="Rollbit-StyleGuide" transform="translate(-332.000000, -3228.000000)">
                                    <g id="Group-33" transform="translate(250.000000, 3192.000000)">
                                        <g id="global-chat" transform="translate(80.000000, 33.000000)"><g>
                                            <path d="M4,15 C2.8954305,15 2,14.1045695 2,13 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 L18,13 C18,14.1045695 17.1045695,15 16,15 L15,15 L15,17.5350238 C15,17.6299398 14.9662479,17.721763 14.9047757,17.7940832 C14.7617012,17.9624062 14.5092636,17.9828741 14.3409406,17.8397995 L14.3409406,17.8397995 L11,15 L4,15 Z" id="Combined-Shape" fill="currentColor"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg> 
                    Chat
                </a>
            </div>
            </div>
        {/if}
    </div>
{/if}

{#if !$isLoggin}
{#if $screen < 750}
<div class="css-1cn0dze" style="height: 112px;">
    <div class="css-1cfnue">
        <div class="css-15ztagm">
            <a href="/" style="margin-right: auto;">
                <img src="{logo}" alt="" class="logo" style="margin-left: 10px;"></a>
                <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=login`)} class="css-bt07qr" style="margin-left: 0px;">Login</button>
                <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=signup`)} class="css-vmbe4r">Join Now</button>
        </div>
         <div class="css-15ztagm" style="margin-right: -10px;">
                <a on:click={()=> dispatch("menu")} class="{menu ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                    <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" size="16" top="-1.3" class="css-ryl7dy">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91242 0.771813C10.1561 -0.264233 12.8053 0.591843 14.0327 2.74954C15.0869 4.60188 14.8103 6.93874 13.3527 8.49403L15.3124 11.9422C15.528 12.3234 15.3984 12.8102 15.0224 13.0317L14.1209 13.5593C13.7493 13.7761 13.2756 13.6547 13.0523 13.2854L10.9942 9.87718C8.59772 10.4617 6.16 9.10944 5.36252 6.75319C4.56503 4.39695 5.66878 1.80786 7.91242 0.771813ZM8.19956 7.4017C9.0879 8.09078 10.3006 8.16917 11.272 7.60032C12.5954 6.82204 13.0512 5.1094 12.2916 3.76921C11.7329 2.78757 10.6437 2.24502 9.53219 2.3946C8.42064 2.54418 7.50563 3.35643 7.21391 4.45251C6.92219 5.5486 7.31122 6.71263 8.19956 7.4017Z" fill="currentColor"></path>
                        <path d="M11.6328 13.6667L10.4826 11.7619H0.885376C0.626493 11.7619 0.416626 11.9751 0.416626 12.2381V13.1905C0.416626 13.4535 0.626493 13.6667 0.885376 13.6667H11.6328Z" fill="currentColor"></path>
                        <path d="M0.885376 8.9048H4.90513C4.53925 8.40287 4.24237 7.83721 4.03269 7.21769C4.00819 7.14529 3.98507 7.07273 3.96332 7.00004H0.885376C0.626493 7.00004 0.416626 7.21324 0.416626 7.47623V8.42861C0.416626 8.69161 0.626493 8.9048 0.885376 8.9048Z" fill="currentColor"></path>
                        <path d="M3.78445 4.1429C3.89618 3.47587 4.11366 2.83247 4.4258 2.23814H0.885376C0.626493 2.23814 0.416626 2.45133 0.416626 2.71433V3.66671C0.416626 3.9297 0.626493 4.1429 0.885376 4.1429H3.78445Z" fill="currentColor"></path>
                    </svg> 
                    Browse
                </a>
                <a class="{!menu && !chat ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" size="16" top="-1" class="css-djv53h">
                        <path d="m4.35514362 7.92721639c2.91007931-.66629828 4.44813965.97471551 4.3508 3.23924141-.10319138 2.4005741-1.94800517 4.3507793-4.3508 4.3507793s-4.2476-1.9502052-4.35079138-4.3507793c-.09733966-2.2645259 1.44072069-3.90553969 4.35079138-3.23924141zm3.6274931-.03738966c.7002931-.54673965 1.73978793-.75768276 3.08639998-.44887414 2.7725328-.63450172 4.237269.92980173 4.1444604 3.08638961-.0978759 2.2882311-1.8562293 4.1461937-4.1444604 4.1461937-.916142.0036007-1.80588854-.3066792-2.52110515-.8792126.48664578-.7831112.76167454-1.6791367.79817931-2.6004155.05232414-1.19472934-.30543448-2.25447245-1.00404483-2.9834759-.11162312-.11570699-.2317701-.22287617-.35942931-.32060517zm.83490862-7.85440862c.10442931-.15480172.62792931.23955.7506138.38031724.0588756.06766806.08845543.1559547.08223101.24543407-.00622442.08947938-.04774312.17282021-.11542067.2316849-.34479483.29998276-.67182931.60468793-.98477759.91256896-.00072241.00424138-.0004431.00841035-.00133103.01265173-.31438621 1.50385.62036379 2.65004483 1.52440694 3.75842586.3211948.3763426.6179392.7728841.8884086 1.18718621-.2941333-.0569208-.5921733-.09136574-.8915362-.10303621-.16120003-.21500862-.33937589-.43396207-.520969-.65664828-.79443965-.97404827-1.67392241-2.05685689-1.73426724-3.43637931-1.36350517 1.49199138-2.35765345 3.05372587-2.94072069 4.61642069-.17046724.02173276-.3431862.04895862-.51909138.08553621-.07228275-.01502241-.14352241-.02697759-.21494827-.03950517.60366552-1.75580517 1.69207758-3.50735862 3.21826034-5.16671035.15308659-.16496947.29482416-.34011798.42423966-.5242431.34505345-.49553104.69266034-.99636724 1.03490172-1.50370345zm.89024483 1.19877069c.30354653-.04891724 2.42520003.09100172 3.35097763.78911724 1.1285879.85105 1.0841086 1.17696897 1.5514758 3.41212414-1.2950707-.22524655-2.3635362-.29004828-3.7597258-1.53043448-.7561583-.67817159-1.17434952-1.65557681-1.14272763-2.6708069z"></path>
                    </svg> 
                    Home
                </a>

                <a  on:click={()=> dispatch("chat")} class="{chat ? "css-1iygkbm" : "css-gurcvp"}" href="/">
                    <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="14.5" top="-0.7" class="css-62cmra">
                        <title>global-chat</title>
                        <g id="\uD83D\uDCDD-Style-Guide" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                            <g id="Rollbit-StyleGuide" transform="translate(-332.000000, -3228.000000)">
                                <g id="Group-33" transform="translate(250.000000, 3192.000000)">
                                    <g id="global-chat" transform="translate(80.000000, 33.000000)"><g>
                                        <path d="M4,15 C2.8954305,15 2,14.1045695 2,13 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 L18,13 C18,14.1045695 17.1045695,15 16,15 L15,15 L15,17.5350238 C15,17.6299398 14.9662479,17.721763 14.9047757,17.7940832 C14.7617012,17.9624062 14.5092636,17.9828741 14.3409406,17.8397995 L14.3409406,17.8397995 L11,15 L4,15 Z" id="Combined-Shape" fill="currentColor"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg> 
                Chat
            </a>
        </div>
    </div>
</div>
{:else}
<div class="css-1cn0dze" style="height: 64px;">
<div class="css-jbqya4">
    <a href="/" style="margin-right: auto;">
        <img src="{logo}" class="logo" alt="cyclix">
    </a>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=login`)} class="css-1wkotyo">Login</button>
        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=auth&modal=signup`)} class="css-1psueex">Join Now</button>
        {#if $screen > 1000}
            <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?modal=search&tab=all-game`)} class="css-qik1t1">
                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="19" class="css-1duiatx">
                    <title>search</title>
                    <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(2.000000, 2.000000)" fill="currentColor" id="Search">
                            <path d="M10.8907486,1.88158344 C8.56851055,-0.456863326 4.86024486,-0.63790201 2.32381727,1.46334318 C-0.212610329,3.56458838 -0.747072288,7.26041735 1.08908942,10.0015429 C2.92525113,12.7426685 6.5310935,13.6319691 9.41939979,12.0560283 L13.2412484,15.70857 C13.6557604,16.1041785 14.3079901,16.0960217 14.7125973,15.6901693 L15.6934965,14.703431 C16.1021678,14.2898609 16.1021678,13.621943 15.6934965,13.208373 L11.9848285,9.47072793 C13.3299497,6.97621926 12.8848765,3.88894492 10.8907486,1.88158344 Z M8.99640128,9.04521142 C7.93947287,10.1089675 6.34957152,10.4274154 4.96820775,9.8520349 C3.58684398,9.27665439 2.6861184,7.92078373 2.6861184,6.41678442 C2.6861184,4.91278512 3.58684398,3.55691446 4.96820775,2.98153395 C6.34957152,2.40615343 7.93947287,2.72460133 8.99640128,3.78835743 C10.4351638,5.24178142 10.4351638,7.59178743 8.99640128,9.04521142 L8.99640128,9.04521142 Z"></path>
                        </g>
                    </g>
                </svg>
            </button>
            {#if sideHasExpand === 8}
            <button on:click={()=> dispatch("return")} class="css-qik1t1">
                <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="15.5" top="1" class="css-ouqosf">
                    <title>global-chat</title>
                    <g id="\uD83D\uDCDD-Style-Guide" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                        <g id="Rollbit-StyleGuide" transform="translate(-332.000000, -3228.000000)">
                            <g id="Group-33" transform="translate(250.000000, 3192.000000)">
                                <g id="global-chat" transform="translate(80.000000, 33.000000)"><g>
                                    <path d="M4,15 C2.8954305,15 2,14.1045695 2,13 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 L18,13 C18,14.1045695 17.1045695,15 16,15 L15,15 L15,17.5350238 C15,17.6299398 14.9662479,17.721763 14.9047757,17.7940832 C14.7617012,17.9624062 14.5092636,17.9828741 14.3409406,17.8397995 L14.3409406,17.8397995 L11,15 L4,15 Z" id="Combined-Shape" fill="currentColor"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            </button>
            {/if}
        {/if}
</div>
</div>
{/if}
{/if}



<style>
   
</style>