<script>
    import Country from "./country/country.svelte";
    import Day from "./day/index.svelte";
    import Month from "./month/month.svelte";
    import Year from "./year/year.svelte";
    import { handleKYCverification1 } from "../../hook";
    import { handleAuthToken } from "$lib/store/routes";
    import { loading } from "$lib/store/activities";
    import { allTimeZone } from "../components/country/country"
    import { user , device } from "$lib/store/profile";
    import { onMount } from "svelte"; 
    import { url } from "$lib/store/routes";
    import { goto } from "$app/navigation";

    let fname = ""
    let lname = ""
    let isDay = false
    let isMonth = false
    let isyear = false
    let day = 1
    let month = "January"
    let year = "2000"
    let address = ""
    let address2 = ""
    let city = ""
    let postcode = ""
    let country = "Algeria"
    let province = ""
    let isCountry = false

    onMount(()=>{
        let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
        if($device?.country){
            let ress = $device?.country
            let res = regionNamesInEnglish?.of(ress)
            country = res
        }
    })

$: track = !fname || !lname || !day || !month || !address || !city || !postcode || $loading

const handleSubmit = (async()=>{
    const inputs = {fname, lname, day, month, year, address, address2, city, country, province, postcode }
   let response = await handleKYCverification1(inputs, $handleAuthToken)
   if(response){
    goto($url)
   }
})

const handleDay = ((data)=>{
    day = data
    isDay =! isDay
})
const handleMonths = ((data)=>{
    month = data
    isMonth =! isMonth
})

const handleYears = ((data)=>{
    year = data
    isyear =! isyear
})

const handleCountries = ((data)=>{
    country = data
    isCountry =! isCountry
})



</script>


<div class="css-pd9vm2">
    <div class="css-1dxqvt0">Provide your name, date of birth, and residential address</div>
    {#if !$user?.kyc1}
    <div class="css-3ld8i7">
        <form method="post" on:submit|preventDefault={handleSubmit}>
            <div class="css-1bfimjl">
                <div>
                    <label for="rollbit-field-10242" class="css-1vec8iw">First Name<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" name="first" id="rollbit-field-10242" bind:value={fname}></div>
                        </div>
                    </div>
                <div>
                    <label for="rollbit-field-10243" class="css-1vec8iw">Last Name<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" name="last" id="rollbit-field-10243" bind:value={lname}></div>
                        </div>
                    </div>
            </div>
                <div class="css-1bfimjl"><div>
                    <label for="rollbit-field-10244" class="css-1vec8iw">Day of Birth<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <button on:click={()=> isDay = true} class="css-h75r2v" type="button" style="width: 100%;">
                            <div class="css-xb95tu">{day}</div>
                            <span style="margin-left: auto;">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div>
                    <label for="rollbit-field-10245" class="css-1vec8iw">Month<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <button on:click={()=> isMonth = true} class="css-h75r2v" type="button" style="width: 100%;">
                            <div class="css-xb95tu">{month}</div>
                            <span style="margin-left: auto;">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div>
                    <label for="rollbit-field-10246" class="css-1vec8iw">Year<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <button on:click={()=> isyear = true} class="css-h75r2v" type="button" style="width: 100%;">
                            <div class="css-xb95tu">{year}</div>
                            <span style="margin-left: auto;">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="css-1bfimjl"><div>
                <label for="rollbit-field-10247" class="css-1vec8iw">Address Line<span class="css-1vr6qde"> *</span></label>
                <div>
                    <div class="css-14hgewr">
                        <input type="text" name="address1" id="rollbit-field-10247" bind:value={address}></div>
                    </div>
                </div>
            </div>
            <div class="css-1bfimjl"><div>
                <label for="rollbit-field-10248" class="css-1vec8iw">Address Line 2</label>
                <div>
                    <div class="css-14hgewr">
                        <input type="text" name="address2" id="rollbit-field-10248" bind:value={address2}></div>
                    </div>
                </div>
            </div>
            <div class="css-1bfimjl"><div>
                <label for="rollbit-field-10249" class="css-1vec8iw">City<span class="css-1vr6qde"> *</span></label>
                <div>
                    <div class="css-14hgewr">
                        <input type="text" name="city" id="rollbit-field-10249" bind:value={city}>
                    </div>
                </div>
            </div>
            <div>
                <label for="rollbit-field-10250" class="css-1vec8iw">Province</label>
                <div>
                    <div class="css-14hgewr">
                        <input type="text" name="province" id="rollbit-field-10250" bind:value={province}></div>
                    </div>
                </div>
            </div>
            <div class="css-1bfimjl" style="margin-bottom: 24px;">
                <div>
                    <label for="rollbit-field-10251" class="css-1vec8iw">Postal Code<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <div class="css-14hgewr">
                            <input type="text" name="postal" id="rollbit-field-10251" bind:value={postcode}>
                        </div>
                    </div>
                </div>
                <div style="max-width: calc(50% - 8px);">
                    <label for="rollbit-field-10252" class="css-1vec8iw">Country<span class="css-1vr6qde"> *</span></label>
                    <div>
                        <button on:click={()=> isCountry = true} class="css-h75r2v" type="button" style="width: 100%;">
                            <div class="css-xb95tu">{country}</div>
                            <span style="margin-left: auto;">
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" size="7" color="#B1B6C6" class="css-1vsy0ig" style="margin-left: 6px;">
                                    <path d="M0.934258 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445072 7.48177 0.77735L4.41602 5.37596C4.21811 5.67283 3.78189 5.67283 3.58397 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934258 -6.17707e-07Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <button class="css-1psueex button" disabled={track} type="submit" style="width: 100%;">{$loading ? "Loading..." : "Submit Information"}</button>
            <div class="css-1t5k0pl">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" size="14" class="css-ckrezq" style="margin-right: 8px;">
                    <path d="M2.313 2.313A7.896 7.896 0 1 0 13.48 13.479 7.896 7.896 0 0 0 2.312 2.313zm5.9 1c.666 0 1.2.55 1.2 1.216a1.22 1.22 0 0 1-1.2 1.217c-.667 0-1.217-.55-1.217-1.234 0-.666.55-1.2 1.216-1.2zm1.716 8.15a.79.79 0 0 1-.167.283c-.433.45-.966.716-1.6.716-.3 0-.583 0-.883-.05-.483-.066-1.1-.666-1.017-1.3l.2-1.3c.134-.75.267-1.516.4-2.266 0-.05.017-.1.017-.15 0-.317-.1-.433-.416-.467-.134-.017-.267-.033-.4-.066-.15-.05-.234-.184-.217-.3.016-.134.1-.217.267-.25.083-.017.183-.017.283-.017h2.3c.283 0 .45.133.45.417 0 .233-.034.466-.084.7-.15.866-.316 1.716-.466 2.583-.05.283-.117.566-.15.85-.017.133 0 .283.033.416.05.184.184.284.367.267.15-.017.3-.066.45-.133.117-.05.216-.134.333-.167.2-.066.35.05.3.234z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
                Level 1 details can be amended by providing further documentation at Level 2, 3, and 4
            </div>
        </form>
    </div> 
    {/if}

</div>

<div id="rollbit-modal-popover-container">
    {#if isDay}
        <Day active={day}  on:day={(e)=> handleDay(e.detail)}/>
    {/if}

    {#if isMonth}
        <Month active={month} on:month={(e)=> handleMonths(e.detail)}/>
    {/if}
    {#if isyear}
        <Year active={year} on:year={(e)=> handleYears(e.detail)}/>
    {/if}

    {#if isCountry}
        <Country active={country} allTimeZone={allTimeZone} on:country={(e)=> handleCountries(e.detail)}/>
    {/if}
   
</div>

<style>
   
</style>