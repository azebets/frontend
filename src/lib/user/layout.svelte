<script>
    import { screen} from "$lib/store/screen";
    import { handleUserProfile } from "$lib/index"
    import Favourite from "./favourite/favourite.svelte";
    import Statistics from "./stat/overview.svelte";
    import Stat from "./stat/statistics.svelte";
    import { goto } from "$app/navigation";
    import { user } from "$lib/store/profile";
    import { url } from "$lib/store/routes";
    import Profilepic from "./profilepic.svelte";
    import { onMount } from "svelte";
    import Loader from "$lib/loader.svelte";
    export let tab
    $: _user = {}
    $: loading = true
    $: joined = ""

    onMount(async()=>{
    loading = true
      const res =  await handleUserProfile(tab[2])
      loading = false
      if(res){
        _user = res?.user
        joined = res.joined_at
      }
    })

    function getFormattedDate(data) {
        const now = new Date(data);
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = now.getFullYear();

        return `${day}/${month}/${year}`;
    }



</script>

<div class="sc-bkkeKt kBjSXI">
    <div  class="dialog " style={`${$screen < 650 ? "transform: scale(1) translateZ(0px);" : "opacity: 1; width: 464px; height: 560px; margin-top: -285.5px; margin-left: -232px;"}`} >
        {#if tab[1] !== "profile"}
            <button on:click={()=> history.back()} class="dialog-back" style="opacity: 1; transform: none;">
                <svg xmlns="http://www.w3.org/2000/svg" class="sc-gsDKAQ hxODWG icon small" viewBox="0 0 221.14 133.14">
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <polygon class="cls-1" points="221.14 43.1 221.14 0 110.57 90.04 0 0 0 43.1 110.57 133.14 221.14 43.1"/>
                        </g>
                    </g>
                </svg>
            </button>
        {/if}

        <div class="dialog-head {tab[1] === "profile" ? "" : "has-back"} has-close">
            <div class="dialog-title">{tab[1] === "profile" ? "User Information" : tab[1] === "stat" ? "Details" : "Edit Your Avatar"}</div>
        </div>

        <button on:click={()=> goto($url)} class="sc-ieecCq fLASqZ close-icon dialog-close">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                <title>Close</title>
                <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                </g>
            </svg>
        </button>

        <div class="dialog-body no-style " style="z-index: 2; transform: none;">
            {#if !loading}
            <div class="sc-dkPtRN jScFby scroll-view sc-iiCSmI iwcAmf user__profile {tab[1] === "edit-avatar" ? "fkZkDP" : ""}">
                {#if tab[1] === "profile"}
                    <div class="sc-hqyYpk ftQhvA">
                        <div class="user-info">
                            {#if $user?.user_id === _user?.user_id}
                                <button  on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=user&modal=edit-avatar&id=${tab[2]}`)} class="button edit">
                                    <svg class="sc-gsDKAQ hxODWG icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M3 17.25V21h3.75L16.22 10.53l-3.75-3.75L3 17.25zm14.71-8.29L15.54 5.54a1.002 1.002 0 0 0-1.42 0L10 8.75l3.75 3.75 3.75-3.75a1.002 1.002 0 0 0 0-1.42z"/>
                                    </svg>
                                </button>
                            {/if}
                            <div class="avatar-box">
                                <img class="avatar " alt="" src={_user?.profileImg}>
                            </div>
                            <div class="name-box">
                                <div class="user-name">{_user?.username}</div>
                            </div>
                        </div>
                    </div>
                    <Statistics id={tab[2]}/>
                    <Favourite />
                    <div class="joined">Joined on&nbsp;{getFormattedDate(joined)}</div>
                {/if}
                {#if tab[1] === "stat"}
                    <Stat user={_user}/>
                {/if}
                {#if tab[1] === "edit-avatar"}
                    <Profilepic _user={_user}/>
                {/if}
            </div>
            {/if}

            {#if loading}
                <div style="height: 360px;">
                    <Loader />
                </div>
            {/if}
         
        </div>
        
    </div>
</div>