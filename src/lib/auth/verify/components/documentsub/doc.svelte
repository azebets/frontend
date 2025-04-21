<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
import { onMount } from "svelte";
import { allTimeZone } from "../country/country"
$: showCountries = false
$: activeCountry = "Nigeria"
$: newCountryList = []
onMount(()=>{
    newCountryList = [...allTimeZone]
})
const handleCountryFiltring = ((value)=>{
    newCountryList = allTimeZone.filter(i => i.Name.toLowerCase().includes(value.toLowerCase()));
})

const selectCountries = ((cou)=>{
  activeCountry = cou.Name
  showCountries = false
})

$: chooseIDtype = false
$: selectMobileOrDesktop = true
$: isDestop = false
$: isMobile = false


function handleClickOutsideCountry(event) {
  if (!event.target.closest('.GiDropdown-card')) {
      showCountries = false
  }
}



</script>

<div id="rollbit-modal-popover-container">
    <div class="css-1yogdko" >
        <button class="css-xzyayo" >
            <div class="css-1bws6us" width="600">
                <div class="css-1nc5kzu">
                    <button on:click={()=> dispatch("close")} class="css-1ou4ub2">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-1cvv4jt">
                            <title>Close</title>
                            <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div id="rollbit-getid-component">
                    <div class="scrollable" style="width: 100%;">
                            <div id="getid-main" class="getid-root getid-main-wrapper" data-role="container"
                             data-screen-name="ChangeDevice" style="--gi-inner-height-mobile: 945px; --gi-inner-height-desktop: 600px; --gi-primary-text-color: #FFFFFFFF; --gi-secondary-text-color: #6C6C66FF; --gi-primary-background-color: #1F2330ff; --gi-accent-color: #f10fff; --gi-contrasting-to-accent-color: #fff; --gi-border-color: #222222FF; --gi-primary-button-text-color: #fff; --gi-primary-button-background-color: #f10fff; --gi-primary-button-hover-background-color: #E3B640FF; --gi-secondary-button-text-color: #222222FF; --gi-secondary-button-background-color: #9F9F99FF; --gi-secondary-button-hover-background-color: #6C6C66FF; --gi-link-button-text-color: #FFFFFFFF; --gi-link-button-hover-text-color: #f10fff; --gi-mobile-camera-background-color: #fff; --gi-mobile-camera-button-color: #FFFFFFFF; --gi-button-box-shadow-hover: 0 8px 16px #0F154E10; --gi-button-border-radius: 20px; --gi-input-placeholder-color: #6C6C66FF; --gi-input-text-color: #FFFFFFFF; --gi-input-background-color: #191919FF; --gi-input-border-color: #222222FF; --gi-input-hover-border-color: #6C6C66FF; --gi-input-active-border-color: #f10fff; --gi-input-border-radius: 30px; --gi-error-color: #EC3A8DFF; --gi-warning-color: #FF7700FF; --gi-success-color: #21DE1CFF; --gi-header-font-size: 24px; --gi-subheader-font-size: 16px; --gi-button-font-size: 16px; --gi-font-size: 14px; --gi-small-font-size: 12px; --gi-font-weight: 400; --gi-bold-font-weight: 700; --gi-button-font-weight: 500; --gi-transition: all 0.15s ease-in-out; --gi-font-family: roboto; --gi-container-max-width: 540px; 
                             --gi-container-min-width: 320px; --gi-container-border-radius: 8px; --gi-container-overlay-background-color: #222222B3; --gi-camera-overlay-background-color: #0E1C2C80; --gi-camera-overlay-text-color: #FFFFFFFF; --gi-outline-color: #333A4FFF; --gi-primary-button-border-color: #f10fff; --gi-primary-button-border-color-hover: #E3B640FF; --gi-secondary-button-border-color: #9F9F99FF; --gi-secondary-button-border-color-hover: #6C6C66FF; --gi-button-border-width: 1px; --gi-icon-button-background-color: #9F9F99FF; --gi-icon-button-hover-background-color: #6C6C66FF; --gi-icon-button-border-radius: 4px; --gi-font-title1-size: 24px; --gi-font-title1-weight: 700; --gi-font-title2-size: 16px; --gi-font-title2-weight: 700; --gi-font-title3-size: 14px; --gi-font-title3-weight: 700; --gi-font-body1-size: 14px; --gi-font-body1-weight: 400; --gi-font-body2-size: 14px; --gi-font-body2-weight: 400; --gi-font-button-size: 16px; --gi-font-button-weight: 500; --gi-font-caption-size: 12px; --gi-font-caption-weight: 400; --gi-wrapper-max-width: 960px; --gi-image-overlay-background: #1F2330D9; --gi-primary-overlay-background: #FFBE1933; --gi-foreground: #252A39FF;
                              --gi-secondary-background: #292E3FFF; --gi-on-feedback-color: #FFFFFFFF;">
                              <div class="GiMainContainer">
                                <div class="GiError-landscape">
                                    <div class="GiTypography-title1">
                                        <span data-role="mobileCamera_landscape" class="GiTranslation">For a more convenient user experience, we ask you to turn the phone into portrait mode</span>
                                    </div>
                                    <div class="GiError-landscape_icon">
                                        <svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="44.16" y=".5" width="55.34" height="99" rx="6.5" stroke="currentColor"></rect>
                                            <mask id="a" fill="#fff">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5 4.23a4 4 0 00-4 4v83.54a4 4 0 004 4h40.66a4 4 0 004-4V8.23a4 4 0 00-4-4h-6.24v2.22a2 2 0 01-2 2H59.75a2 2 0 01-2-2V4.23H51.5z"></path>
                                            </mask>
                                            <path d="M47.5 8.23h-1 1zm4-4v-1 1zm-4 87.54h1-1zm4 4v1-1zm40.66 0v-1 1zm4-4h1-1zM85.92 4.23v-1h-1v1h1zm-2 4.22v1-1zm-24.17 0v-1 1zm-2-4.22h1v-1h-1v1zm-9.25 4a3 3 0 013-3v-2a5 5 0 00-5 5h2zm0 83.54V8.23h-2v83.54h2zm3 3a3 3 0 01-3-3h-2a5 5 0 005 5v-2zm40.66 0H51.5v2h40.66v-2zm3-3a3 3 0 01-3 3v2a5 5 0 005-5h-2zm0-83.54v83.54h2V8.23h-2zm-3-3a3 3 0 013 3h2a5 5 0 00-5-5v2zm-6.24 0h6.24v-2h-6.24v2zm-1-1v2.22h2V4.23h-2zm0 2.22a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1 1H59.75v2h24.17v-2zm-24.17 0a1 1 0 01-1-1h-2a3 3 0 003 3v-2zm-1-1V4.23h-2v2.22h2zM51.5 5.23h6.25v-2H51.5v2z" fill="currentColor" mask="url(#a)"></path>
                                            <g opacity=".3">
                                                <rect x=".5" y="99.5" width="55.34" height="99" rx="6.5" transform="rotate(-90 .5 99.5)" stroke="currentColor"></rect>
                                                <mask id="b" fill="#fff">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.23 92.16a4 4 0 004 4h83.54a4 4 0 004-4V51.5a4 4 0 00-4-4H8.23a4 4 0 00-4 4v6.25h2.22a2 2 0 012 2v24.17a2 2 0 01-2 2H4.23v6.24z"></path>
                                                </mask>
                                                <path d="M8.23 96.16v1-1zm-4-4h-1 1zm87.54 4v-1 1zm4-4h1-1zm0-40.66h-1 1zm-4-4v1-1zm-83.54 0v-1 1zm-4 10.25h-1v1h1v-1zm2.22 0v-1 1zm0 28.17v-1 1zm-2.22 0v-1h-1v1h1zm4 9.24a3 3 0 01-3-3h-2a5 5 0 005 5v-2zm83.54 0H8.23v2h83.54v-2zm3-3a3 3 0 01-3 3v2a5 5 0 005-5h-2zm0-40.66v40.66h2V51.5h-2zm-3-3a3 3 0 013 3h2a5 5 0 00-5-5v2zm-83.54 0h83.54v-2H8.23v2zm-3 3a3 3 0 013-3v-2a5 5 0 00-5 5h2zm0 6.25V51.5h-2v6.25h2zm-1 1h2.22v-2H4.23v2zm2.22 0a1 1 0 011 1h2a3 3 0 00-3-3v2zm1 1v24.17h2V59.75h-2zm0 24.17a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1 1H4.23v2h2.22v-2zm-1.22 7.24v-6.24h-2v6.24h2z" fill="currentColor" mask="url(#b)"></path>
                                            </g>
                                            <path d="M35.21 14.08H31a15.5 15.5 0 00-15.5 15.5v5.63" stroke="currentColor"></path>
                                            <path d="M30.99 9.86l4.22 4.22L31 18.31M19.72 30.99l-4.23 4.22L11.27 31" stroke="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="GiScreen">
                                    <header data-role="header-line" class="GiHeader">
                                        <div class="GiHeader-aside">
                                            <button on:click={()=> showCountries = true} type="button" class="GiCountrySelect GiTypography-body2">
                                                <!-- <img class="GiCountrySelect-flag" src="https://cdn.getid.cloud/assets/flags/NGA.svg" alt="NGA flag"> -->
                                                <span>{activeCountry}</span>
                                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.77 9.85L12 12.63 9.22 9.85a.71.71 0 10-1.01 1.01l3.29 3.29c.27.28.73.28 1 0l3.3-3.29a.71.71 0 000-1 .73.73 0 00-1.03 0z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            {#if showCountries}
                                                <button on:click={handleClickOutsideCountry} class="GiBackdrop" tabindex="0"></button>
                                                <div role="button" tabindex="0" class="GiDropdown-container">
                                                    <button on:click={handleClickOutsideCountry} class="GiDropdown-auxiliaryWrapper" style="min-height: calc(100% + 24px);">
                                                        <div class="GiDropdown-card" style="margin-top: 0px; min-height: calc(100% + 24px);">
                                                            <div role="button" tabindex="0" class="GiMobileThumb"></div>
                                                            <div class="GiCountrySelect-search GiCountrySelect-canScrollTop" role="button" tabindex="0">
                                                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.76 14.26h-.8l-.28-.28a6.5 6.5 0 10-.7.7l.28.29v.79l5 4.99 1.48-1.5-4.98-5zm-6 0a4.5 4.5 0 11-.02-9 4.5 4.5 0 01.02 9z" fill="currentColor"></path>
                                                                </svg>
                                                                <input class="GiCountrySelect-search-input GiTypography-body1" on:keyup={(e)=> handleCountryFiltring(e.target.value)} type="search" placeholder="Search country">
                                                            </div>
                                                            <div class="GiCountrySelect-scrollableContainer" role="button" tabindex="0">
                                                                <p class="GiCountrySelect-separator GiTypography-body2">A</p>
                                                                {#each newCountryList as country}
                                                                    <button on:click={()=> selectCountries(country)} type="button" class="GiCountrySelect-item GiTypography-body1">
                                                                        <span>{country.Name}</span>
                                                                    </button>
                                                                {/each}
                                                            </div>
                                                        </div>
                                                        <div class="GiDropdown-substrate"></div>
                                                    </button>
                                                  </div>
                                            {/if}
                                            <!-- <button type="button" class="GiLocaleSelect">
                                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="GiLocaleSelect-langIcon">
                                                    <path d="M7.5 4v3M20.5 20l-4-9-4 9M13.39 18h6.22M3.5 15a9 9 0 008-8h-8M11.5 15a5.63 5.63 0 01-5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button> -->
                                        </div>
                                    </header>
                                    <div class="GiTitle GiAppearance" data-role="header_ChangeDevice">
                                        <h2 class="GiTitle-title GiTypography-title1" data-role="header-big">
                                            <span data-role="Welcome_camera_document_scanning_header" class="GiTranslation">Scan document</span>
                                        </h2>
                                    </div>
                                    
                                  {#if selectMobileOrDesktop && !isDestop}
                                      <div data-role="content" class="GiContent">
                                          <div class="GiChangeDevice">
                                          <button type="button" class="GiChangeDevice-button">
                                              <div class="GiChangeDevice-badge GiTypography-caption">
                                                  <span data-role="welcome__recommended" class="GiTranslation">Recommended</span>
                                              </div>
                                              <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg" class="GiChangeDevice-icon">
                                                  <path d="M28.5 8.99v5.4c0 1 .67 1.8 1.5 1.8h12c.83 0 1.5-.8 1.5-1.8V9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                  <path clip-rule="evenodd" d="M24 8.99h24a6 6 0 016 6v42.02a6 6 0 01-6 6H24a6 6 0 01-6-6V14.99a6 6 0 016-6z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                  <path clip-rule="evenodd" d="M30 30h4v4h-4v-4zM30 38h4v4h-4v-4zM42 34h-4v-4h4v4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                  <path d="M40.04 39.96a.05.05 0 11-.08.08.05.05 0 01.08-.08M38.04 37.96a.05.05 0 11-.08.08.05.05 0 01.08-.08M38.04 41.96a.05.05 0 11-.08.08.05.05 0 01.08-.08M42.04 41.96a.05.05 0 11-.08.08.05.05 0 01.08-.08M45.5 31.98V28.5a2 2 0 00-2-2h-3.48M31.98 26.5H28.5a2 2 0 00-2 2v3.48M26.5 40.02v3.48c0 1.1.9 2 2 2h3.48M40.02 45.5h3.48a2 2 0 002-2v-3.48M42.04 37.96a.05.05 0 11-.08.08.05.05 0 01.08-.08" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                              </svg>
                                              <h4 class="GiChangeDevice-title GiTypography-title2">
                                                  <span data-role="welcome__switch" class="GiTranslation">Switch to mobile</span>
                                              </h4>
                                              <p class="GiChangeDevice-description GiTypography-body2">
                                                  <span data-role="welcome__for_better_quality" class="GiTranslation">For better photo quality</span></p>
                                            </button>
                                            <button on:click={()=> isDestop = true} type="button" class="GiChangeDevice-button">
                                                  <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg" class="GiChangeDevice-icon">
                                                      <path clip-rule="evenodd" d="M57 51H15a6 6 0 01-6-6V15a6 6 0 016-6h42a6 6 0 016 6v30a6 6 0 01-6 6z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                      <path d="M42 51l1.5 12M30 51l-1.5 12M21.6 63h28.8M63 40.5H9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                  </svg>
                                                  <h4 class="GiChangeDevice-title GiTypography-title2">
                                                      <span data-role="welcome__continue_on_this_device" class="GiTranslation">Continue on this device</span>
                                                  </h4>
                                                  <p class="GiChangeDevice-description GiTypography-body2">
                                                      <span data-role="Welcome_camera_access" class="GiTranslation">Camera access required</span>
                                                  </p>
                                              </button>
                                          </div>
                                      </div>
                                  {/if}
                                  
                                  {#if isDestop}
                                    <div data-role="content" class="GiContent">
                                      <div data-role="guide" style="display: flex; flex-direction: column; width: 100%;">
                                        <div class="GiGuide GiGuide-supportedDocs" data-role="guide-block">
                                          <div class="GiGuide-container">
                                            <div class="GiDocumentCorners-wrapper">
                                              <div class="GiDocumentBorder GiSlideDocumentUp">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" width="259" height="152" viewBox="0 0 259 152">
                                                  <g id="gi-svg-doc-front-content-text-lines" transform="translate(188.583, 75.949) translate(-46.5, -48.281)">
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M1.75 3.25 C1.75,3.25 65.35,3.25 65.35,3.25 C66.18,3.25 66.85,2.58 66.85,1.75 C66.85,0.92 66.18,0.25 65.35,0.25 C65.35,0.25 1.75,0.25 1.75,0.25 C0.92,0.25 0.25,0.92 0.25,1.75 C0.25,2.58 0.92,3.25 1.75,3.25z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M1.75 21.86 C1.75,21.86 83.85,21.86 83.85,21.86 C84.68,21.86 85.35,21.19 85.35,20.36 C85.35,19.53 84.68,18.86 83.85,18.86 C83.85,18.86 1.75,18.86 1.75,18.86 C0.92,18.86 0.25,19.53 0.25,20.36 C0.25,21.19 0.92,21.86 1.75,21.86z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M1.75 40.48 C1.75,40.48 65.35,40.48 65.35,40.48 C66.18,40.48 66.85,39.8 66.85,38.98 C66.85,38.15 66.18,37.48 65.35,37.48 C65.35,37.48 1.75,37.48 1.75,37.48 C0.92,37.48 0.25,38.15 0.25,38.98 C0.25,39.8 0.92,40.48 1.75,40.48z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M91.25 56.09 C91.25,56.09 1.75,56.09 1.75,56.09 C0.92,56.09 0.25,56.76 0.25,57.59 C0.25,58.42 0.92,59.09 1.75,59.09 C1.75,59.09 91.25,59.09 91.25,59.09 C92.08,59.09 92.75,58.42 92.75,57.59 C92.75,56.76 92.08,56.09 91.25,56.09z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M35.75 93.31 C35.75,93.31 1.75,93.31 1.75,93.31 C0.92,93.31 0.25,93.98 0.25,94.81 C0.25,95.64 0.92,96.31 1.75,96.31 C1.75,96.31 35.75,96.31 35.75,96.31 C36.58,96.31 37.25,95.64 37.25,94.81 C37.25,93.98 36.58,93.31 35.75,93.31z "></path>
                                                  </g>
                                                  <g id="gi-svg-doc-front-content-photo" transform="translate(66.791, 76) translate(-54.208, -63.842)">
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M95.53 0.25 C95.53,0.25 12.88,0.25 12.88,0.25 C5.91,0.25 0.25,5.92 0.25,12.92 C0.25,12.92 0.25,114.77 0.25,114.77 C0.25,121.76 5.91,127.43 12.88,127.43 C12.88,127.43 95.53,127.43 95.53,127.43 C102.51,127.43 108.17,121.76 108.17,114.77 C108.17,114.77 108.17,12.92 108.17,12.92 C108.17,5.92 102.51,0.25 95.53,0.25z  M26.02 66.66 C23.8,66.04 22.16,63.98 22.16,61.54 C22.16,59.13 23.76,57.09 25.95,56.44 C25.95,56.44 25.95,64.57 25.95,64.57 C25.95,65.27 25.98,65.97 26.02,66.66z  M49.23 25.02 C48.61,24.47 47.67,24.53 47.12,25.15 C47.12,25.15 46.75,25.57 46.75,25.57 C44.32,28.33 40.3,29.17 36.97,27.62 C34.06,26.25 30.69,26.2 27.73,27.47 C27.46,27.59 27.2,27.71 26.94,27.85 C28.67,23.2 32.87,19.93 39.47,18.1 C46.02,16.28 52.98,16.51 59.61,18.78 C59.61,18.78 68.48,21.81 68.48,21.81 C68.48,21.81 68.6,29.56 68.6,29.56 C64.65,34.96 58.88,38.62 52.32,39.88 C45.59,41.17 38.73,39.8 33,36.04 C30.2,34.2 26.67,34.28 23.99,36.12 C23.99,36.12 24.28,35.26 24.28,35.26 C25.04,33 26.72,31.17 28.9,30.23 C31.08,29.29 33.57,29.33 35.72,30.34 C40.23,32.45 45.69,31.31 48.99,27.55 C48.99,27.55 49.36,27.13 49.36,27.13 C49.9,26.51 49.84,25.57 49.23,25.02z  M28.93 37.72 C29.78,37.78 30.62,38.06 31.37,38.55 C37.75,42.74 45.39,44.26 52.87,42.83 C58.95,41.66 64.41,38.65 68.6,34.21 C68.6,34.21 68.6,38.28 68.6,38.28 C68.6,44.79 73.49,50.18 79.77,50.92 C79.77,50.92 79.77,64.85 79.77,64.85 C79.77,71.68 77.12,78.1 72.32,82.93 C67.52,87.76 61.14,90.42 54.35,90.42 C54.35,90.42 54.35,90.42 54.35,90.42 C47.56,90.42 41.17,87.72 36.37,82.82 C31.57,77.92 28.93,71.44 28.93,64.57 C28.93,64.57 28.93,37.72 28.93,37.72z  M71.46 21.79 C73.28,21.31 75.18,21.62 76.79,22.7 C78.68,23.96 79.77,25.99 79.77,28.27 C79.77,28.27 79.77,47.9 79.77,47.9 C75.14,47.17 71.59,43.14 71.59,38.28 C71.59,38.28 71.46,21.79 71.46,21.79z  M47.76 98.47 C47.76,98.47 47.76,92.64 47.76,92.64 C49.9,93.15 52.1,93.42 54.35,93.42 C54.35,93.42 54.35,93.42 54.35,93.42 C56.65,93.42 58.9,93.15 61.07,92.62 C61.07,92.62 61.07,98.47 61.07,98.47 C61.07,98.59 61.09,98.71 61.11,98.82 C58.91,98.59 56.65,98.47 54.34,98.47 C52.09,98.47 49.88,98.59 47.72,98.8 C47.75,98.7 47.76,98.58 47.76,98.47z  M54.34 101.63 C65.01,101.63 74.6,104.3 81.47,108.52 C88.34,112.74 92.27,118.35 92.3,124.27 C92.3,124.27 16.4,124.27 16.4,124.27 C16.43,118.35 20.35,112.74 27.22,108.52 C34.08,104.3 43.67,101.63 54.34,101.63z  M105.01 114.77 C105.01,120.01 100.77,124.27 95.53,124.27 C95.53,124.27 95.45,124.27 95.45,124.27 C95.42,116.84 90.51,110.36 83.12,105.82 C77.9,102.62 71.34,100.3 64.05,99.19 C64.16,98.98 64.23,98.73 64.23,98.47 C64.23,98.47 64.23,91.69 64.23,91.69 C64.23,91.68 64.23,91.66 64.23,91.65 C68.01,90.24 71.49,88.01 74.43,85.06 C78.62,80.84 81.34,75.54 82.33,69.79 C86.38,69.26 89.52,65.76 89.52,61.54 C89.52,57.47 86.6,54.07 82.75,53.36 C82.75,53.36 82.75,28.27 82.75,28.27 C82.75,25.01 81.14,22 78.44,20.2 C75.91,18.51 72.77,18.12 69.92,19.13 C69.92,19.13 60.57,15.94 60.57,15.94 C53.37,13.48 45.8,13.23 38.67,15.21 C29.34,17.8 23.99,23.28 23.16,31.07 C22.43,32.04 21.85,33.13 21.45,34.3 C21.45,34.3 20.73,36.46 20.73,36.46 C20.34,37.62 20.77,38.84 21.8,39.5 C22.83,40.15 24.11,40.02 24.98,39.17 C25.28,38.88 25.61,38.63 25.95,38.43 C25.95,38.43 25.95,53.36 25.95,53.36 C22.1,54.07 19.17,57.47 19.17,61.54 C19.17,65.78 22.34,69.28 26.42,69.79 C27.44,75.48 30.13,80.73 34.24,84.92 C37.23,87.97 40.76,90.25 44.6,91.68 C44.6,91.68 44.6,91.69 44.6,91.69 C44.6,91.69 44.6,98.47 44.6,98.47 C44.6,98.72 44.67,98.96 44.77,99.17 C37.42,100.27 30.81,102.59 25.57,105.82 C18.18,110.36 13.27,116.84 13.24,124.27 C13.24,124.27 12.88,124.27 12.88,124.27 C7.65,124.27 3.41,120.01 3.41,114.77 C3.41,114.77 3.41,12.92 3.41,12.92 C3.41,7.67 7.65,3.42 12.88,3.42 C12.88,3.42 95.53,3.42 95.53,3.42 C100.77,3.42 105.01,7.67 105.01,12.92 C105.01,12.92 105.01,114.77 105.01,114.77z  M82.69 66.66 C82.73,66.06 82.75,65.46 82.75,64.85 C82.75,64.85 82.75,56.44 82.75,56.44 C84.94,57.09 86.54,59.13 86.54,61.54 C86.54,63.97 84.91,66.03 82.69,66.66z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M38.91 65.79 C40.46,65.79 41.7,64.54 41.7,62.99 C41.7,61.44 40.46,60.18 38.91,60.18 C37.37,60.18 36.12,61.44 36.12,62.99 C36.12,64.54 37.37,65.79 38.91,65.79z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M69.79 60.18 C68.24,60.18 66.99,61.44 66.99,62.99 C66.99,64.54 68.24,65.8 69.79,65.8 C71.33,65.8 72.58,64.54 72.58,62.99 C72.58,61.44 71.33,60.18 69.79,60.18z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M38.91 56.98 C39.64,56.98 40.33,57.27 40.84,57.79 C41.13,58.08 41.51,58.23 41.9,58.23 C42.28,58.23 42.66,58.08 42.95,57.79 C43.53,57.2 43.53,56.25 42.95,55.67 C41.87,54.58 40.44,53.98 38.91,53.98 C37.39,53.98 35.96,54.58 34.88,55.67 C34.3,56.25 34.3,57.2 34.88,57.79 C35.46,58.37 36.41,58.37 36.99,57.79 C37.5,57.27 38.19,56.98 38.91,56.98z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M67.86 57.79 C68.92,56.72 70.65,56.72 71.71,57.79 C72,58.08 72.38,58.23 72.77,58.23 C73.15,58.23 73.53,58.08 73.82,57.79 C74.4,57.2 74.4,56.25 73.82,55.67 C71.6,53.43 67.97,53.43 65.75,55.67 C65.17,56.25 65.17,57.2 65.75,57.79 C66.33,58.37 67.28,58.37 67.86,57.79z "></path>
                                                    <path fill="#6C6C66FF" fill-opacity="1" fill-rule="nonzero" d=" M54.35 79.1 C56.23,79.1 58,78.37 59.33,77.03 C59.91,76.44 59.91,75.49 59.33,74.91 C58.75,74.32 57.8,74.32 57.22,74.91 C56.45,75.68 55.43,76.1 54.35,76.1 C53.26,76.1 52.25,75.68 51.48,74.91 C50.9,74.32 49.95,74.32 49.37,74.91 C48.79,75.49 48.79,76.44 49.37,77.03 C50.7,78.37 52.47,79.1 54.35,79.1z "></path>
                                                  </g>
                                                </svg>
                                              </div>
                                              <div class="GiDocumentScanAnimation">
                                                <div class="GiDocumentAnimation-gradientLine"></div>
                                                <div class="GiDocumentAnimation-line"></div>
                                              </div>
                                              <svg class="GiDocumentAnimation-Corners" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" width="303" height="188" viewBox="0 0 303 188">
                                                <g transform=" translate(151.5, 94) translate(-152.5, -95)">
                                                  <path id="gi-svg-doc-top-left-corner" stroke="#21DE1CFF" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3" stroke-opacity="1" d=" M27 3 C27,3 11,3 11,3 C6.58,3 3,6.58 3,11 C3,11 3,27 3,27 "></path>
                                                  <path id="gi-svg-doc-top-right-corner" stroke="#21DE1CFF" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3" stroke-opacity="1" d=" M278 3 C278,3 294,3 294,3 C298.42,3 302,6.58 302,11 C302,11 302,27 302,27 "></path>
                                                  <path id="gi-svg-doc-bottom-left-corner" stroke="#21DE1CFF" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3" stroke-opacity="1" d=" M3 163 C3,163 3,179 3,179 C3,183.42 6.58,187 11,187 C11,187 27,187 27,187 "></path>
                                                  <path id="gi-svg-doc-bottom-right-corner" stroke="#21DE1CFF" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3" stroke-opacity="1" d=" M302 163 C302,163 302,179 302,179 C302,183.42 298.42,187 294,187 C294,187 278,187 278,187 "></path>
                                                </g>
                                              </svg>
                                            </div>
                                          </div>
                                          <div class="GiSupportedDocs">
                                            <div class="GiDocsList" role="button" tabindex="0">
                                              <div class="GiDocsList-container">
                                                <div class="GiDocsList-item">
                                                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE3NDVfMzc4NzEpIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxXzE3NDVfMzc4NzEpIj4KPHBhdGggZD0iTTAgNi45NDcyN0gzOFYzMC45NDczSDBWNi45NDcyN1oiIGZpbGw9IiNENUQ3REQiLz4KPHBhdGggZD0iTTAgNi45NDcyN0gzOFYzMC45NDczSDBWNi45NDcyN1oiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNzQ1XzM3ODcxKSIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHJlY3QgeT0iNyIgd2lkdGg9IjM4IiBoZWlnaHQ9IjUiIGZpbGw9IiNCNEI3QzAiLz4KPGxpbmUgb3BhY2l0eT0iMC44IiB4MT0iMTguNDE3NyIgeTE9IjE5LjQ0MzYiIHgyPSIyOS4zNjg2IiB5Mj0iMTkuNDQzNiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMTguNDE3NyIgeTE9IjIzLjQyNjEiIHgyPSIyMy4zOTU0IiB5Mj0iMjMuNDI2MSIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC44IiB4MT0iMTguNDE3NyIgeTE9IjI3LjQwODUiIHgyPSIyOS4zNjg2IiB5Mj0iMjcuNDA4NSIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMTguNDE3NyIgeTE9IjE1LjQ2MTIiIHgyPSIyMy4zOTU0IiB5Mj0iMTUuNDYxMiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMjUuMzg1NSIgeTE9IjkuNDg4NTYiIHgyPSIzNC4zNDUzIiB5Mj0iOS40ODg1NiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGcgb3BhY2l0eT0iMC44Ij4KPG1hc2sgaWQ9Im1hc2swXzE3NDVfMzc4NzEiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjIiIHk9IjE0IiB3aWR0aD0iMTMiIGhlaWdodD0iMTMiPgo8cmVjdCB4PSIyIiB5PSIxNCIgd2lkdGg9IjEyLjk0MiIgaGVpZ2h0PSIxMi45NDIiIGZpbGw9IiNEOUQ5RDkiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzE3NDVfMzc4NzEpIj4KPHBhdGggZD0iTTQuNjUyMzggMTYuNDk0QzQuNzQyNTggMTYuMTczMiA1LjA4MTY3IDE1Ljk3NzggNS40MDQ4OSAxNi4wMDJDNy40NjUzNCAxNi4wMDI5IDkuNTI2NjMgMTUuOTk4NyAxMS41ODcxIDE2LjAwMzdDMTEuODg1MiAxNS45OTc4IDEyLjE4NDIgMTYuMTkyNCAxMi4yNzE5IDE2LjQ4MjNDMTIuNjIyNyAxNy40NjYxIDEyLjk2NDMgMTguNDU0MiAxMy4zMTc2IDE5LjQzNzJDMTMuMzgxOSAxOS42MjM1IDEzLjQ3MzggMTkuODA4OSAxMy40NjU1IDIwLjAxMUMxMy40NjQ2IDIxLjQzMzQgMTMuNDYzOCAyMi44NTU3IDEzLjQ2NTUgMjQuMjc4MUMxMy41MDQ3IDI0LjU0MjggMTMuMjY3NSAyNC43OTE3IDEzLjAwNTMgMjQuNzg2N0MxMi42NzEyIDI0LjgxNDMgMTIuMjA0MyAyNC44NTg1IDEyLjA1MDYgMjQuNDc5M0MxMi4wMTg5IDI0LjIwMjEgMTIuMDQ0OCAyMy45MjE0IDEyLjAzMzEgMjMuNjQzM0M5LjY1NTI1IDIzLjYyOTEgNy4yNzY1OSAyMy42MzI0IDQuODk3OTMgMjMuNjQxNkM0Ljg4NTQgMjMuOTI2NCA0LjkzMDUgMjQuMjE4OCA0Ljg2ODY5IDI0LjQ5ODZDNC43MDE2NSAyNC44Nzk0IDQuMjIxNDEgMjQuODAwOSAzLjg4NjQ5IDI0Ljc3NDJDMy42NjE4MiAyNC43Nzc1IDMuNDQ4ODUgMjQuNTgwNCAzLjQ3NTU3IDI0LjM0OTFDMy40NjYzOSAyMi45NTY4IDMuNDc4MDggMjEuNTY1MyAzLjQ2OTczIDIwLjE3MzlDMy40NzIyMyAyMC4wMDg1IDMuNDYwNTQgMTkuODM4MSAzLjUyMDY3IDE5LjY4MTFDMy45MDQ4NyAxOC42MjEyIDQuMjc2NTMgMTcuNTU2MyA0LjY1MjM4IDE2LjQ5NFpNNS40MjQ5NCAxNi44NTIzQzUuMTgxMDYgMTcuNTA5NiA0Ljk0OTcxIDE4LjE3MTkgNC43MjI1MyAxOC44MzU5QzcuMjEyMjggMTguODQ5MiA5LjcwMjAyIDE4LjgzNzUgMTIuMTkwOSAxOC44NDA5QzExLjk5MyAxOC4xNjYgMTEuNzQzMyAxNy41MDU0IDExLjQ5NzcgMTYuODQ2NEM5LjQ3MzE4IDE2Ljg0NjQgNy40NDg2NCAxNi44MzM5IDUuNDI0OTQgMTYuODUyM1pNNC4zMTkxMyAxOS42Nzc4QzQuMzA4MjcgMjAuNzE0MiA0LjMxODI5IDIxLjc1MTYgNC4zMTQxMiAyMi43ODg5QzcuMDc3ODEgMjIuNzkzMSA5Ljg0MDY2IDIyLjc5NTYgMTIuNjAzNSAyMi43ODcyQzEyLjYxMSAyMS43NTA3IDEyLjYxNTIgMjAuNzEyNiAxMi42MDE5IDE5LjY3NjFDOS44NDA2NyAxOS42NzY5IDcuMDgwMzEgMTkuNjcyNyA0LjMxOTEzIDE5LjY3NzhaIiBmaWxsPSIjMUUyNjNCIi8+CjxwYXRoIGQ9Ik01LjY5MDU2IDIwLjU1NzJDNi4xNjI0NSAyMC40MDAyIDYuNzAyODIgMjAuODQ3MSA2LjU5NTkyIDIxLjM0NDhDNi41MzQ5NSAyMS44OTExIDUuNzkyNDUgMjIuMTQyNSA1LjQwNDkyIDIxLjc1NzRDNC45OTY1IDIxLjQxNSA1LjE3Nzc0IDIwLjY4MDggNS42OTA1NiAyMC41NTcyWiIgZmlsbD0iIzFFMjYzQiIvPgo8cGF0aCBkPSJNMTAuODU1NCAyMC41NTM4QzExLjM4MDggMjAuMzgzNCAxMS45MzEyIDIwLjk3MTQgMTEuNzA4MiAyMS40ODQyQzExLjU0MiAyMS45ODI5IDEwLjgwMDMgMjIuMTA1NiAxMC40ODQ2IDIxLjY4NzJDMTAuMTQ4IDIxLjMxNzIgMTAuMzYxIDIwLjY1MzIgMTAuODU1NCAyMC41NTM4WiIgZmlsbD0iIzFFMjYzQiIvPgo8L2c+CjwvZz4KPC9nPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTc0NV8zNzg3MSIgeDE9IjAiIHkxPSIxOC45NDczIiB4Mj0iMzgiIHkyPSIxOC45NDczIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNCNEI3QzAiLz4KPHN0b3Agb2Zmc2V0PSIwLjQ4MzU0OCIgc3RvcC1jb2xvcj0iI0Y1RjhGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNCNEI3QzAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNzQ1XzM3ODcxIj4KPHJlY3Qgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAxXzE3NDVfMzc4NzEiPgo8cmVjdCB5PSI3IiB3aWR0aD0iMzgiIGhlaWdodD0iMjMuNzUiIHJ4PSIyLjAzNTcxIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="">
                                                  <p class="GiDocsList-itemTitle GiTypography-caption">Driver's License</p>
                                                </div>
                                                <div class="GiDocsList-item">
                                                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE3NDVfMzc4NjkpIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxXzE3NDVfMzc4NjkpIj4KPHBhdGggZD0iTTAgNi45NDcyN0gzOFYzMC45NDczSDBWNi45NDcyN1oiIGZpbGw9IiNENUQ3REQiLz4KPHBhdGggZD0iTTAgNi45NDcyN0gzOFYzMC45NDczSDBWNi45NDcyN1oiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNzQ1XzM3ODY5KSIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHJlY3QgeT0iNyIgd2lkdGg9IjM4IiBoZWlnaHQ9IjUiIGZpbGw9IiNCNEI3QzAiLz4KPGxpbmUgb3BhY2l0eT0iMC44IiB4MT0iMTguNDE3NyIgeTE9IjE5LjQ0MzYiIHgyPSIyOS4zNjg2IiB5Mj0iMTkuNDQzNiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMTguNDE3NyIgeTE9IjIzLjQyNjEiIHgyPSIyMy4zOTU0IiB5Mj0iMjMuNDI2MSIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC44IiB4MT0iMTguNDE3NyIgeTE9IjI3LjQwODUiIHgyPSIyOS4zNjg2IiB5Mj0iMjcuNDA4NSIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMTguNDE3NyIgeTE9IjE1LjQ2MTIiIHgyPSIyMy4zOTU0IiB5Mj0iMTUuNDYxMiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggb3BhY2l0eT0iMC44IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjQ0MzkgMTcuOTUxQzEyLjQ0MzkgMTkuNjAwNCAxMS4xMDY3IDIwLjkzNzYgOS40NTcyOCAyMC45Mzc2QzcuODA3ODIgMjAuOTM3NiA2LjQ3MDY3IDE5LjYwMDQgNi40NzA2NyAxNy45NTFDNi40NzA2NyAxNi4zMDE1IDcuODA3ODIgMTQuOTY0NCA5LjQ1NzI4IDE0Ljk2NDRDMTEuMTA2NyAxNC45NjQ0IDEyLjQ0MzkgMTYuMzAxNSAxMi40NDM5IDE3Ljk1MVpNMTMuNDM5NCAxNy45NTFDMTMuNDM5NCAyMC4xNTAyIDExLjY1NjYgMjEuOTMzMSA5LjQ1NzI4IDIxLjkzMzFDNy4yNTggMjEuOTMzMSA1LjQ3NTE0IDIwLjE1MDIgNS40NzUxNCAxNy45NTFDNS40NzUxNCAxNS43NTE3IDcuMjU4IDEzLjk2ODggOS40NTcyOCAxMy45Njg4QzExLjY1NjYgMTMuOTY4OCAxMy40Mzk0IDE1Ljc1MTcgMTMuNDM5NCAxNy45NTFaTTQuOTc2OTcgMjYuOTEwNEM0Ljk3Njk3IDI0Ljk4NiA2LjUzNjk4IDIzLjQyNiA4LjQ2MTM0IDIzLjQyNkgxMC40NTI0QzEyLjM3NjggMjMuNDI2IDEzLjkzNjggMjQuOTg2IDEzLjkzNjggMjYuOTEwNFYyNy45MDU5QzEzLjkzNjggMjguMTgwOCAxNC4xNTk2IDI4LjQwMzcgMTQuNDM0NiAyOC40MDM3QzE0LjcwOTUgMjguNDAzNyAxNC45MzIzIDI4LjE4MDggMTQuOTMyMyAyNy45MDU5VjI2LjkxMDRDMTQuOTMyMyAyNC40MzYyIDEyLjkyNjYgMjIuNDMwNSAxMC40NTI0IDIyLjQzMDVIOC40NjEzNEM1Ljk4NzE2IDIyLjQzMDUgMy45ODE0MyAyNC40MzYyIDMuOTgxNDMgMjYuOTEwNFYyNy45MDU5QzMuOTgxNDMgMjguMTgwOCA0LjIwNDI5IDI4LjQwMzcgNC40NzkyIDI4LjQwMzdDNC43NTQxMSAyOC40MDM3IDQuOTc2OTcgMjguMTgwOCA0Ljk3Njk3IDI3LjkwNTlWMjYuOTEwNFoiIGZpbGw9IiMxRTI2M0IiLz4KPGxpbmUgb3BhY2l0eT0iMC41IiB4MT0iMjUuMzg2NCIgeTE9IjkuNDg4NTYiIHgyPSIzNC4zNDYzIiB5Mj0iOS40ODg1NiIgc3Ryb2tlPSIjMUUyNjNCIiBzdHJva2Utd2lkdGg9IjAuOTk1NTM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9nPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTc0NV8zNzg2OSIgeDE9IjAiIHkxPSIxOC45NDczIiB4Mj0iMzgiIHkyPSIxOC45NDczIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNCNEI3QzAiLz4KPHN0b3Agb2Zmc2V0PSIwLjQ4MzU0OCIgc3RvcC1jb2xvcj0iI0Y1RjhGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNCNEI3QzAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNzQ1XzM3ODY5Ij4KPHJlY3Qgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAxXzE3NDVfMzc4NjkiPgo8cmVjdCB5PSI3IiB3aWR0aD0iMzgiIGhlaWdodD0iMjMuNzUiIHJ4PSIyLjAzNTcxIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="">
                                                  <p class="GiDocsList-itemTitle GiTypography-caption">ID Card</p>
                                                </div>
                                                <div class="GiDocsList-item">
                                                  <img src="https://cdn.getid.cloud/sdk/assets/passport-8f125f87e046ff76fc4b.svg" alt="">
                                                  <p class="GiDocsList-itemTitle GiTypography-caption">Passport</p>
                                                </div>
                                              </div>
                                              <div class="GiSupportedDocs-divider"></div>
                                              <p class="GiDocsList-button GiTypography-caption GiIsDesktop">See all</p>
                                              <p class="GiDocsList-button GiTypography-caption GiIsMobile">All supported documents</p>
                                            </div>
                                          </div>
                                        </div>
                                        <input class="GiHidden-input" type="file" accept="image/x-png,image/png,image/jpeg,image/jpg">
                                        <input class="GiHidden-input" type="file" name="image" accept="image/*" capture="environment"></div>
                                        <div data-role="preview" style="display: none; flex-direction: column;"></div>
                                        <div class="GiCameraStep-retake" data-role="retake" style="display: none; flex-direction: column;">
                                          <div class="GiError">
                                            <span data-role="retake_description_" class="GiTranslation GiTypography-title1 GiError-title"></span>
                                          </div>
                                          <p class="GiTypography-body1 GiStatus-description"></p>
                                        </div>
                                    </div>
                                    <footer data-role="footer" class="GiFooter">
                                      <button type="button" data-role="main-button" class="GiButton GiTypography-button GiButton-containedPrimary" id="main">
                                        <span data-role="IdCapture_guide_next" class="GiTranslation">Continue</span>
                                      </button>
                                    </footer>
                                  {/if}
                                   
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
</div>

<style>
    #getid-main,
        #getid-button {
          /* === Main colors === */
          --gi-primary-text-color: #0f154e;
          --gi-secondary-text-color: #555555;
          --gi-primary-background-color: #ffffff;
          --gi-accent-color: #9c77e0;
          --gi-contrasting-to-accent-color: #ffffff;
          --gi-border-color: #e5e8f2;
          --gi-secondary-color: #555555;
          --gi-country-specific-color: rgba(227, 100, 118, 0.7);
        
          /* === Button's properties === */
        
          /* === Primary button === */
          --gi-primary-button-text-color: var(--gi-contrasting-to-accent-color);
          --gi-primary-button-background-color: var(--gi-accent-color);
          --gi-primary-button-hover-background-color: #ad8fe5;
        
          /* === Secondary button === */
          --gi-secondary-button-text-color: #0f154e;
          --gi-secondary-button-background-color: #e5e8f2;
          --gi-secondary-button-hover-background-color: #f1f2f8;
        
          /* === Text button === */
          --gi-link-button-text-color: var(--gi-primary-text-color); /* not used */
          --gi-link-button-hover-text-color: var(--gi-accent-color); /* not used */
        
          /* === Button's other properties === */
          --gi-button-box-shadow-hover: 0 8px 16px rgba(15, 21, 78, 0.16);
          --gi-button-border-radius: 4px;
        
          /* === Input's properties === all block is not used to new design */
          --gi-input-placeholder-color: var(--gi-secondary-text-color);
          --gi-input-text-color: var(--gi-primary-text-color);
          --gi-input-background-color: transparent;
          --gi-input-border-color: #ececec;
          --gi-input-hover-border-color: var(--gi-secondary-text-color);
          --gi-input-active-border-color: var(--gi-accent-color);
          --gi-input-border-radius: 4px;
        
          /* === Feedback colors === */
          --gi-error-color: #f05a7e;
          --gi-success-color: #47daae;
          --gi-warning-color: #f6bc25;
        
          /* === Fonts === */
          --gi-header-font-size: 24px; /* not used, title1 */
          --gi-subheader-font-size: 16px; /* not used,  title2 */
          --gi-button-font-size: 16px; /* not used, button */
          --gi-font-size: 14px; /* not used, body1, fact - body2 */
          --gi-small-font-size: 12px; /* not used, caption */
          --gi-font-weight: 400;
          --gi-bold-font-weight: 700;
          --gi-button-font-weight: var(--gi-bold-font-weight);
          --gi-transition: all 0.15s ease-in-out;
          --gi-font-family: roboto;
        
          /* === Container's properties === */
          --gi-container-max-width: 560px;
          --gi-container-min-width: 320px;
          --gi-container-border-radius: 8px;
          --gi-container-overlay-background-color: rgba(0, 0, 0, 0.4);
          --gi-camera-overlay-background-color: rgba(14, 28, 44, 0.5);
          --gi-camera-overlay-text-color: #ffffff;
        }
        #getid-main,
        #getid-button {
          /* === Main colors === */
          --gi-text-primary-color: var(--gi-primary-text-color);
          --gi-text-secondary-color: var(--gi-secondary-text-color);
          --gi-background-color: var(--gi-primary-background-color);
          --gi-primary-color: var(--gi-accent-color);
          --gi-secondary-color: var(--gi-secondary-text-color);
          --gi-on-primary-color: var(--gi-contrasting-to-accent-color);
          --gi-outline-color: var(--gi-border-color); /*  --gi-background-color HSL L=-10%/+10% */ /* new */
        
          /* === Feedback colors === */
          --gi-error-color: var(--gi-error-color);
          --gi-success-color: var(--gi-success-color);
          --gi-warning-color: var(--gi-warning-color);
        
          /* === Button's properties === */
        
          /* === Primary button === */
          --gi-primary-button-text-color: var(--gi-primary-button-text-color);
          --gi-primary-button-background-color: var(--gi-primary-button-background-color);
          --gi-primary-button-hover-background-color: var(--gi-primary-button-hover-background-color);
          --gi-primary-button-border-color: var(--gi-primary-button-background-color);  /* new */
          --gi-primary-button-border-color-hover: var(--gi-primary-button-hover-background-color);  /* new */
        
          /* === Secondary button === */
          --gi-secondary-button-text-color: var(--gi-secondary-button-text-color);
          --gi-secondary-button-background-color: var(--gi-secondary-button-background-color);
          --gi-secondary-button-hover-background-color: var(--gi-secondary-button-hover-background-color);
          --gi-secondary-button-border-color: var(--gi-secondary-button-background-color);  /* new */
          --gi-secondary-button-border-color-hover: var(--gi-secondary-button-hover-background-color);  /* new */
        
          /* === Button's other properties === */
          --gi-button-hover-box-shadow: var(--gi-button-box-shadow-hover);
          --gi-button-border-width: 1px;  /* new */
          --gi-button-border-radius: var(--gi-button-border-radius);
        
          /* === Icon Button === */
          --gi-icon-button-text-color: var(--gi-secondary-button-text-color);  /* new */
          --gi-icon-button-background-color: var(--gi-secondary-button-background-color);  /* new */
          --gi-icon-button-hover-background-color: var(--gi-secondary-button-hover-background-color);  /* new */
          --gi-icon-button-border-radius: 4px;  /* new */
        
          /* === Input's properties === all block is not used to new design */
          --gi-input-placeholder-color: var(--gi-input-placeholder-color);
          --gi-input-text-color: var(--gi-input-text-color);
          --gi-input-background-color: var(--gi-input-background-color);
          --gi-input-border-color: var(--gi-input-border-color);
          --gi-input-hover-border-color: var(--gi-input-hover-border-color);
          --gi-input-active-border-color: var(--gi-input-active-border-color);
          --gi-input-border-radius: var(--gi-input-border-radius);
        
          /* === Fonts === */
          --gi-font-family: var(--gi-font-family);
          --gi-font-title1-size: var(--gi-header-font-size);
          --gi-font-title1-weight: var(--gi-bold-font-weight);
          --gi-font-title1-line-height: 28px;
          --gi-font-title2-size: var(--gi-subheader-font-size);
          --gi-font-title2-weight: var(--gi-bold-font-weight);
          --gi-font-title2-line-height: 20px;
          --gi-font-title3-size: var(--gi-font-size);
          --gi-font-title3-weight: var(--gi-bold-font-weight);
          --gi-font-title3-line-height: 20px;
          --gi-font-body1-size: var(--gi-font-size);
          --gi-font-body1-weight: var(--gi-font-weight);
          --gi-font-body1-line-height: 20px;
          --gi-font-body2-size: 14px; /* body1-size - 2px */  /* new */
          --gi-font-body2-weight: var(--gi-font-weight);
          --gi-font-body2-line-height: 20px;
          --gi-font-button-size: var(--gi-button-font-size);
          --gi-font-button-weight: var(--gi-button-font-weight);
          --gi-font-button-line-height: 24px;
          --gi-font-caption-size: var(--gi-small-font-size);
          --gi-font-caption-weight: var(--gi-font-weight);
          --gi-font-caption-line-height: 16px;
        
          /* === Container's properties === */
          --gi-container-max-width: var(--gi-container-max-width);
          --gi-container-min-width: var(--gi-container-min-width);
          --gi-wrapper-max-width: 960px;  /* new */
          --gi-container-border-color: var(--gi-border-color);
          --gi-container-border-radius: var(--gi-container-border-radius);
          --gi-container-overlay-background-color: var(--gi-container-overlay-background-color);
          --gi-camera-overlay-background-color: var(--gi-camera-overlay-background-color);
          --gi-camera-overlay-text-color: var(--gi-camera-overlay-text-color);
          --gi-camera-border-radius: 8px;
          --gi-image-overlay-background: hsla(0, 0%, 100%, 0.85);  /* new inner */
          --gi-primary-overlay-background: hsla(211, 100%, 50%, 0.2);  /* new inner */
          --gi-transition: var(--gi-transition);
          --gi-on-feedback-color: #ffffff;
          --gi-foreground: hsla(234, 15%, 59%, 0.1);  /* new inner */
          --gi-secondary-background: hsl(0, 0%, 95%);
        
          /* === Inner, not for customers === */
          --gi-inner-height-desktop: 600px;
          --gi-inner-height-mobile: 100vh;
          --gi-inner-height-header: calc(var(--gi-inner-height-title) + var(--gi-inner-height-head-line));
          --gi-inner-height-title: 72px;
          --gi-inner-height-head-line: 48px;
          --gi-inner-height-footer: 104px;
          --gi-inner-z-index: 1000;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main,
          #getid-button {
            --gi-inner-height-footer: 160px;
          }
        }
        
        @media only screen and (max-height: 600px) and (max-device-width: 600px) {
          #getid-main,
          #getid-button {
            --gi-inner-height-header: 120px;
            --gi-inner-height-title: 72px;
            --gi-font-title1-size: 20px;
            --gi-font-title1-line-height: 24px;
          }
        
          .GiWelcome-scrollableContainer,
          .GiFooter-fixedHeight {
            --gi-inner-height-footer: 70px;
          }
        }
        #getid-button *,
        #getid-main *:not(svg *) {
          display: initial;
          width: auto;
          min-width: auto;
          max-width: none;
          height: auto;
          min-height: auto;
          max-height: none;
          margin: 0;
          padding: 0;
          border-collapse: collapse;
          border-spacing: 0;
          font-family: var(--gi-font-family), arial, serif;
          font-size: inherit;
          font-weight: normal;
          font-style: normal;
          font-variant: normal;
          line-height: 1.3;
          vertical-align: baseline;
          color: unset;
          text-decoration: none;
          letter-spacing: normal;
          background: none;
          border: 0;
          border-radius: 0;
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          opacity: initial;
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
        }
        
        #getid-main style {
          display: none;
        }
        
        #getid-main span {
          font-size: inherit;
          font-weight: inherit;
          font-style: inherit;
          font-variant: inherit;
          line-height: inherit;
          color: inherit;
          letter-spacing: inherit;
        }
        
        #getid-main button {
          cursor: pointer;
          -webkit-appearance: button;
          -moz-appearance: button;
          appearance: auto;
        }
        
        #getid-main video {
          width: 100%;
        }
        
        #getid-main li {
          display: list-item;
        }
        
        #getid-main *::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        
        #getid-main * {
          scrollbar-width: none;
        }
        #getid-main .GiTypography-title1 {
          font-size: var(--gi-font-title1-size);
          font-weight: var(--gi-font-title1-weight);
          line-height: var(--gi-font-title1-line-height);
        }
        
        #getid-main .GiTypography-title2 {
          font-size: var(--gi-font-title2-size);
          font-weight: var(--gi-font-title2-weight);
          line-height: var(--gi-font-title2-line-height);
        }
        
        #getid-main .GiTypography-title3 {
          font-size: var(--gi-font-title3-size);
          font-weight: var(--gi-font-title3-weight);
          line-height: var(--gi-font-title3-line-height);
        }
        
        #getid-main .GiTypography-body1 {
          font-size: var(--gi-font-body1-size);
          font-weight: var(--gi-font-body1-weight);
          line-height: var(--gi-font-body1-line-height);
        }
        
        #getid-main .GiTypography-body2 {
          font-size: var(--gi-font-body2-size);
          font-weight: var(--gi-font-body2-weight);
          line-height: var(--gi-font-body2-line-height);
        }
        
        #getid-main .GiTypography-button {
          font-size: var(--gi-font-button-size);
          font-weight: var(--gi-font-button-weight);
          line-height: var(--gi-font-button-line-height);
        }
        
        #getid-main .GiTypography-caption {
          font-size: var(--gi-font-caption-size);
          font-weight: var(--gi-font-caption-weight);
          line-height: var(--gi-font-caption-line-height);
        }
        #getid-main .GiHeader {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          min-height: var(--gi-inner-height-head-line);
          padding: 8px 16px;
          gap: 8px;
        }
        
        #getid-main.GiRtl .GiHeader,
        #getid-main .GiRtl .GiHeader {
          -webkit-box-orient: horizontal;
          -webkit-box-direction: reverse;
              -ms-flex-direction: row-reverse;
                  flex-direction: row-reverse;
        }
        
        #getid-main .GiHeader-aside {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          margin-left: auto;
          gap: 8px;
        }
        
        #getid-main.GiRtl .GiHeader-aside,
        #getid-main .GiRtl .GiHeader-aside {
          -webkit-box-orient: horizontal;
          -webkit-box-direction: reverse;
              -ms-flex-direction: row-reverse;
                  flex-direction: row-reverse;
        }
        
        #getid-main .GiLocaleSelect {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          padding: 3px;
          color: var(--gi-text-secondary-color);
          border: 1px solid var(--gi-outline-color);
          border-radius: 4px;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiLocaleSelect:hover {
          background: var(--gi-foreground);
        }
        
        #getid-main .GiLocaleSelect-langIcon {
          width: 24px;
          height: 24px;
        }
        #getid-main .getid-pseudo-input__container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          padding: 48px;
        }
        
        #getid-main .getid-pseudo-input__generic {
          position: absolute;
          width: 0.1px;
          height: 0.1px;
          overflow: hidden;
          opacity: 0;
          z-index: -1;
        }
        
        #getid-main .getid-pseudo-input {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          min-height: 50px;
          margin: 32px auto 0;
          padding: 12px 16px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
             text-overflow: ellipsis;
          background: var(--gi-input-background-color);
          border: 1px solid var(--gi-outline-color);
          border-radius: var(--gi-input-border-radius);
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          z-index: 1;
        }
        
        @media (hover: hover) {
          #getid-main .getid-pseudo-input:hover {
            border: 1px solid var(--gi-input-hover-border-color);
          }
        
          #getid-main .getid-pseudo-input:hover .getid-pseudo-input__icon {
            color: var(--gi-primary-color);
          }
        }
        
        #getid-main .getid-pseudo-input:focus,
        #getid-main .getid-pseudo-input:active {
          border: 1px solid var(--gi-input-active-border-color);
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
        
        #getid-main .getid-pseudo-input__placeholder-container {
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          width: 100%;
          margin-right: 16px;
          overflow: hidden;
          font-size: var(--gi-font-body2-size);
          text-align: justify;
          color: var(--gi-input-placeholder-color);
          white-space: nowrap;
          -o-text-overflow: ellipsis;
             text-overflow: ellipsis;
          border: none;
          cursor: pointer;
        }
        
        #getid-main.GiRtl .getid-pseudo-input__placeholder-container,
        #getid-main .GiRtl .getid-pseudo-input__placeholder-container {
          margin-left: 16px;
          margin-right: 0;
        }
        
        #getid-main .getid-pseudo-input__placeholder {
          color: var(--gi-text-secondary-color);
          opacity: 1;
        }
        
        #getid-main .getid-pseudo-input__icon p {
          font-size: var(--gi-font-title3-size);
          font-weight: var(--gi-font-title3-weight);
          line-height: 24px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main select {
          cursor: pointer;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
        }
        
        #getid-main .getid-form__input,
        #getid-main .GiSelect {
          display: block;
          width: 100%;
          margin: 0 auto;
          padding: 11px;
          text-align: left;
          color: var(--gi-input-text-color);
          background: var(--gi-input-background-color);
          border: 1px solid var(--gi-input-border-color);
          border-radius: var(--gi-input-border-radius);
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          z-index: 1;
        }
        
        #getid-main .GiSelect-empty {
          color: var(--gi-input-placeholder-color);
        }
        
        #getid-main.GiRtl .getid-form__input,
        #getid-main .GiRtl .getid-form__input,
        #getid-main.GiRtl .GiSelect,
        #getid-main .GiRtl .GiSelect {
          text-align: right;
        }
        
        #getid-main .getid-form__input {
          margin-top: 8px;
        }
        
        #getid-main .GiSelect-container {
          position: relative;
          display: block;
          cursor: pointer;
        }
        
        #getid-main .GiSelect-arrowDown {
          position: absolute;
          top: 50%;
          right: 14px;
          color: var(--gi-secondary-text-color, #000000);
          -webkit-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
                  transform: translateY(-50%);
        }
        
        #getid-main.GiRtl .GiSelect-arrowDown,
        #getid-main .GiRtl .GiSelect-arrowDown {
          right: auto;
        }
        
        @media (hover: hover) {
          #getid-main .GiSelect-arrowDown:hover {
            border-color: var(--gi-primary-color);
          }
        
          #getid-main .getid-form__input:hover,
          #getid-main .GiSelect:hover {
            border: 1px solid var(--gi-input-hover-border-color);
          }
        }
        
        #getid-main .GiSelect:focus,
        #getid-main .getid-form__input:focus,
        #getid-main .getid-form__input:active {
          border: 1px solid var(--gi-input-active-border-color);
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
        
        #getid-main ::-webkit-input-placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--gi-input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        
        #getid-main ::-moz-placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--gi-input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        
        #getid-main :-ms-input-placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--gi-input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        
        #getid-main ::-ms-input-placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--gi-input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        
        #getid-main ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--gi-input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        
        #getid-main .getid-form__wrapper {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 100%;
        }
        
        #getid-main .getid-form__wrapper--mobile {
          width: 100vw;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
        }
        
        
        #getid-main .getid-form__content.getid-form__content {
          display: block;
          overflow: auto;
        }
        
        #getid-main .getid-form__body {
          display: block;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }
        
        #getid-main .getid-form__element-wrapper {
          /* position: relative; */
          display: block;
          margin-top: 8px;
        }
        
        #getid-main .getid-form__input-hidden {
          visibility: hidden;
        }
        
        #getid-main .getid-form__input-label {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          font-size: var(--gi-font-body2-size);
          font-weight: var(--gi-font-title3-weight);
          font-style: normal;
          text-align: left;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main.GiRtl .getid-form__input-label,
        #getid-main .GiRtl .getid-form__input-label {
          text-align: right;
        }
        
        #getid-main .getid-form__input-label + * {
          margin-top: 8px;
        }
        
        #getid-main .getid-form__input-action {
          margin-left: 10px;
          color: var(--gi-input-active-border-color);
          text-decoration: underline;
        }
        
        #getid-main.GiRtl .getid-form__input-action,
        #getid-main .GiRtl .getid-form__input-action {
          margin-left: 10px;
          margin-right: 0;
        }
        
        #getid-main .getid-form__date-input {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        
        #getid-main .getid-form__date-input .GiSelect-container {
          display: inline-block;
          margin-right: 10px;
        }
        
        #getid-main.GiRtl .getid-form__date-input .GiSelect-container,
        #getid-main .GiRtl .getid-form__date-input .GiSelect-container {
          margin-left: 10px;
          margin-right: 0;
        }
        
        #getid-main .getid-form__date-input > .GiSelect-container:first-child {
          width: 26%;
        }
        
        #getid-main .getid-form__date-input > .GiSelect-container:nth-child(2) {
          width: 40%;
        }
        
        #getid-main .getid-form__date-input > .GiSelect-container:last-child {
          width: 27%;
          margin-right: 0;
        }
        
        #getid-main.GiRtl .getid-form__date-input > .GiSelect-container:last-child,
        #getid-main .GiRtl .getid-form__date-input > .GiSelect-container:last-child {
          margin-left: 0;
        }
        
        #getid-main .GiHint {
          display: block;
          text-align: left;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main.GiRtl .GiHint,
        #getid-main .GiRtl .GiHint {
          text-align: right;
        }
        
        #getid-main .GiHint.GiHint-error {
          min-height: 16px;
          margin-top: 2px;
          color: var(--gi-error-color);
          visibility: hidden;
        }
        
        #getid-main .GiHint-showHint.GiHint-error,
        #getid-main .getid-show-all-errors .GiHint-error {
          visibility: visible;
        }
        
        #getid-main .getid-pseudo-input.GiHint-showForOneElement,
        #getid-main .getid-form__input.GiHint-showForOneElement,
        #getid-main .GiSelect.GiHint-showForOneElement,
        #getid-main .getid-show-all-errors .GiHint-showForAllElements {
          border: 1px solid var(--gi-error-color);
        }
        
        #getid-main .GiForm-tooltipContent {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
          padding: 32px;
          gap: 16px;
        }
        
        #getid-main .GiForm-tooltipContentBody {
          text-align: left;
        }
        
        #getid-main.GiRtl .GiForm-tooltipContentBody,
        #getid-main .GiRtl .GiForm-tooltipContentBody {
          text-align: right;
        }
        
        #getid-main .GiUtil-hidden {
          display: none;
        }
        #getid-main .GiImage {
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          height: 100%;
          min-height: 150px;
          max-height: 244px;
          margin: 0 auto;
        }
        
        #getid-main .GiImage-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 100%;
          background-color: var(--gi-image-overlay-background);
          z-index: 1;
        }
        #getid-main .GiContent {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          width: var(--gi-container-max-width);
          min-width: var(--gi-container-min-width);
          max-width: 100%;
          overflow: hidden;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
        }
        
        #getid-main .SignatureRulesScreen {
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
        }
        
        #getid-main .GiAppearance {
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
        }
        
        #getid-main .getid-content__container {
          width: 100%;
          max-width: 520px;
          max-height: 100%;
          margin: 0 auto;
          padding: 0 16px;
        }
        
        #getid-main .getid-content__container .getid-content__container {
          padding: 0;
        }
        #getid-main .GiBackdrop {
          position: fixed;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          overflow: auto;
          background: var(--gi-container-overlay-background-color);
          z-index: var(--gi-inner-z-index);
        }
        
        #getid-main .GiMobileThumb {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 24px;
        }
        
        #getid-main .GiMobileThumb::before,
        #getid-main .GiMobileThumb::after {
          content: '';
          position: absolute;
          display: block;
          width: 16px;
          height: 4px;
          margin: 0 auto;
          background: var(--gi-outline-color);
          border-radius: 2px;
          -webkit-transition: all 0.5s;
          -o-transition: all 0.5s;
          transition: all 0.5s;
        }
        
        #getid-main .GiMobileThumb::before {
          left: 14px;
          right: 0;
        }
        
        #getid-main .GiMobileThumb::after {
          left: 0;
          right: 14px;
        }
        
        #getid-main .GiMobileThumb.GiMobileThumbSlide::before,
        #getid-main .GiMobileThumb.GiMobileThumbSlide::after {
          width: 15px;
        }
        
        #getid-main .GiMobileThumb.GiMobileThumbSlide::before {
          left: 14px;
          right: 5px;
          -webkit-transform: rotate(-35deg);
              -ms-transform: rotate(-35deg);
                  transform: rotate(-35deg);
        }
        
        #getid-main .GiMobileThumb.GiMobileThumbSlide::after {
          left: 5px;
          right: 14px;
          -webkit-transform: rotate(35deg);
              -ms-transform: rotate(35deg);
                  transform: rotate(35deg);
        }
        
        #getid-main .GiDropdown-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: var(--gi-container-max-width);
          max-width: 100%;
          height: 100%;
          margin: 0 auto;
          overflow: scroll;
          overflow-x: hidden;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          -webkit-animation: fade-in 0.3s backwards 0.15s;
                  animation: fade-in 0.3s backwards 0.15s;
          z-index: calc(var(--gi-inner-z-index) + 1);
          -webkit-overflow-scrolling: touch;
        }
        
        #getid-main .GiDropdown-container::after {
          content: '';
          position: sticky;
          bottom: -15px;
          display: block;
          width: var(--gi-container-max-width);
          max-width: 100%;
          height: 0;
          background: transparent;
          -webkit-box-shadow: 0 -20px 20px 16px rgba(0, 0, 0, 0.08);
                  box-shadow: 0 -20px 20px 16px rgba(0, 0, 0, 0.08);
          z-index: inherit;
        }
        
        @-webkit-keyframes fade-in {
          from {
            -webkit-transform: translateY(70px);
                    transform: translateY(70px);
            opacity: 0;
          }
        
          to {
            -webkit-transform: translateY(0);
                    transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            -webkit-transform: translateY(70px);
                    transform: translateY(70px);
            opacity: 0;
          }
        
          to {
            -webkit-transform: translateY(0);
                    transform: translateY(0);
            opacity: 1;
          }
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiDropdown-container {
            top: auto;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
          }
        }
        
        #getid-main .GiDropdown-auxiliaryWrapper {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
          width: var(--gi-container-max-width);
          min-width: 100%;
          margin: 150px auto 0;
        }
        
        #getid-main .GiDropdown-card {
          display: block;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          background: var(--gi-background-color);
          border-radius: 24px 24px 0 0;
        }
        
        #getid-main .GiDropdown-substrate {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -50px;
          width: 100%;
          height: 300px;
          background: var(--gi-background-color);
          z-index: -1;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiDropdown-substrate {
            position: fixed;
          }
        }
        
        @media (hover: hover) {
          #getid-main .GiDropdownList:hover {
            border: 1px solid var(--gi-input-hover-border-color);
          }
        }
        
        #getid-main .GiDropdownList:focus {
          border: 1px solid var(--gi-input-active-border-color);
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
        
        #getid-main .GiDropdownList-list {
          display: block;
        }
        
        #getid-main .GiDropdownList-option {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          height: 70px;
          padding-left: 4px;
          color: var(--gi-primary-text-color);
          border-bottom: 1px solid var(--gi-outline-color, #e5e8f2);
          cursor: pointer;
          gap: 8px;
        }
        
        #getid-main .GiDropdownList-optionIcon {
          color: var(--gi-primary-color);
          visibility: hidden;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiDropdownList-optionIcon__selected {
          visibility: visible;
        }
        
        
        #getid-main .GiDropdownList-separator {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          padding: 8px 8px 8px 32px;
          color: var(--gi-text-secondary-color);
          background: var(--gi-secondary-background);
          cursor: auto;
        }
        
        #getid-main.GiRtl .GiDropdownList-separator,
        #getid-main .GiRtl .GiDropdownList-separator {
          padding: 8px 32px 8px 8px;
        }
        #getid-main .GiIconButton {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -ms-flex-negative: 0;
              flex-shrink: 0;
          width: 32px;
          height: 32px;
          color: var(--gi-icon-button-text-color);
          background: var(--gi-icon-button-background-color);
          border-radius: var(--gi-icon-button-border-radius);
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiIconButton:hover {
          background: var(--gi-icon-button-hover-background-color);
        }
        
        #getid-main .GiIconButton:disabled,
        #getid-main .GiIconButton:disabled:hover {
          background: transparent;
          opacity: 0.38;
        }
        #getid-main .GiButton {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          min-height: 56px;
          padding: calc(16px - var(--gi-button-border-width)) calc(24px - var(--gi-button-border-width));
          text-align: center;
          white-space: nowrap;
          border: var(--gi-button-border-width) solid;
          border-radius: var(--gi-button-border-radius);
          cursor: pointer;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          gap: 8px;
        }
        
        @media screen and (max-device-width: 480px) {
          #getid-main .GiButton {
            width: 100%;
          }
        }
        
        #getid-main .GiButton-fixedWidth {
          min-width: 240px;
        }
        
        /* Contained and primary */
        #getid-main .GiButton-containedPrimary {
          color: var(--gi-primary-button-text-color);
          background: var(--gi-primary-button-background-color);
          border-color: var(--gi-primary-button-border-color);
        }
        
        @media (hover: hover) {
          #getid-main .GiButton-containedPrimary:hover {
            background: var(--gi-primary-button-hover-background-color);
            border-color: var(--gi-primary-button-border-color-hover);
            -webkit-box-shadow: var(--gi-button-hover-box-shadow);
                    box-shadow: var(--gi-button-hover-box-shadow);
          }
        }
        
        #getid-main .GiButton-containedPrimary:disabled:hover {
          color: var(--gi-primary-button-text-color);
          background: var(--gi-primary-button-background-color);
          border-color: var(--gi-primary-button-border-color);
        }
        
        /* Contained and secondary */
        #getid-main .GiButton-containedSecondary {
          color: var(--gi-secondary-button-text-color);
          background: var(--gi-secondary-button-background-color);
          border-color: var(--gi-secondary-button-border-color);
        }
        
        #getid-main .GiButton-containedSecondary:disabled:hover {
          color: var(--gi-secondary-button-text-color);
          background: var(--gi-secondary-button-background-color);
          border-color: var(--gi-secondary-button-border-color);
        }
        
        @media (hover: hover) {
          #getid-main .GiButton-containedSecondary:hover {
            background: var(--gi-secondary-button-hover-background-color);
            border-color: var(--gi-secondary-button-border-color-hover);
            -webkit-box-shadow: var(--gi-button-hover-box-shadow);
                    box-shadow: var(--gi-button-hover-box-shadow);
          }
        }
        
        /* Text and secondary */
        #getid-main .GiButton-textSecondary {
          color: var(--gi-secondary-button-text-color);
          background: var(--gi-secondary-button-background-color);
          border-color: var(--gi-secondary-button-border-color);
        }
        
        #getid-main .GiButton-textSecondary:disabled:hover {
          color: var(--gi-secondary-button-text-color);
          background: var(--gi-secondary-button-background-color);
          border-color: var(--gi-secondary-button-border-color);
        }
        
        @media (hover: hover) {
          #getid-main .GiButton-textSecondary:hover {
            background: var(--gi-secondary-button-hover-background-color);
            border-color: var(--gi-secondary-button-border-color-hover);
          }
        }
        
        /* states */
        #getid-main .GiButton:disabled,
        #getid-main .GiButton:disabled:hover {
          -webkit-box-shadow: none;
                  box-shadow: none;
          cursor: default;
          opacity: 0.38;
        }
        
        #getid-main .GiButton:active,
        #getid-main .GiButton:focus {
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
        
        #getid-main .GiButton-loading.GiButton:disabled {
          color: transparent;
          opacity: 1;
        }
        
        
        #getid-main .GiButton-spinner {
          position: absolute;
          width: 24px;
          height: 24px;
          -webkit-animation: rotateButton 2s linear infinite;
                  animation: rotateButton 2s linear infinite;
          z-index: 2;
        }
        
        #getid-main .GiButton-spinnerPath {
          -webkit-animation: dashButton 1.5s ease-in-out infinite;
                  animation: dashButton 1.5s ease-in-out infinite;
          stroke-width: 2px;
          fill: none;
          stroke: var(--gi-on-primary-color);
          stroke-linecap: round;
        }
        
        @-webkit-keyframes rotateButton {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @keyframes rotateButton {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @-webkit-keyframes dashButton {
          0% {
            stroke-dasharray: 1, 75;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -17;
          }
        
          100% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -62;
          }
        }
        
        @keyframes dashButton {
          0% {
            stroke-dasharray: 1, 75;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -17;
          }
        
          100% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -62;
          }
        }
        #getid-main.getid-main-wrapper,
        #getid-main .getid-main-wrapper {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: var(--gi-wrapper-max-width);
          min-width: var(--gi-container-min-width);
          max-width: 100%;
          margin: 0 auto;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main.getid-main-wrapper.GiRtl,
        #getid-main .getid-main-wrapper.GiRtl {
          direction: rtl;
        }
        #getid-main .GiMainContainer {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: var(--gi-inner-height-desktop);
          overflow: hidden;
          text-align: center;
          background: var(--gi-background-color);
          border: 1px solid var(--gi-container-border-color);
          border-radius: var(--gi-container-border-radius);
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiMainContainer {
            height: var(--gi-inner-height-mobile);
            border: none;
            border-radius: 0;
          }
        }
        
        #getid-main .GiScreen {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 100%;
        }
        #getid-main .getid-popup__container .getid-main-wrapper {
          margin-top: 20px;
        }
        
        #getid-button .getid-popup__open-button {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          min-width: initial;
          max-width: 250px;
          padding: 0 20px;
        }
        
        #getid-button .getid-popup__open-button-delimeter {
          height: 2em;
          margin: 0 20px;
          border-right: solid 1px;
          opacity: 0.5;
        }
        
        #getid-main .getid-popup__container {
          position: fixed;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: var(--gi-container-overlay-background-color);
          z-index: 2147483647;
        }
        
        #getid-main .GiError-browsers {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
              -ms-flex-direction: row;
                  flex-direction: row;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          width: 100%;
          max-width: 300px;
          margin: 20px auto 0;
        }
        
        #getid-main .GiError-browserButton {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 33%;
        }
        
        #getid-main .GiError-browserButton-text {
          margin: 8px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiFooter {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
              -ms-flex-flow: row nowrap;
                  flex-flow: row nowrap;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: var(--gi-container-max-width);
          min-width: var(--gi-container-min-width);
          max-width: 100%;
          height: var(--gi-inner-height-footer);
          padding: 16px 32px 16px;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
          z-index: 1;
          gap: 8px;
        }
        
        #getid-main .GiFooter .GiFooterLink {
          font-size: 12px;
          color: var(--gi-text-secondary-color);
          min-height: 56px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          padding: 0 16px;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
        } 
        
        #getid-main .GiFooter .GiFooterLink a {
          font-size: 12px;
          color: var(--gi-accent-color);
          cursor: pointer;
        } 
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiFooter {
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            -webkit-box-align: end;
                -ms-flex-align: end;
                    align-items: flex-end;
            padding: 16px 32px 24px;
          }
        }
        
        @media only screen and (max-height: 600px) and (max-device-width: 600px) {
          #getid-main .GiFooter {
            min-height: 68px;
            padding: 6px 32px;
          }
        }
        
        #getid-main .GiTranslation {
          white-space: break-spaces;
        }
        #getid-main .GiTitle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -ms-flex-negative: 0;
              flex-shrink: 0;
          width: var(--gi-container-max-width);
          min-width: var(--gi-container-min-width);
          max-width: 100%;
          height: var(--gi-inner-height-title);
          padding: 8px 16px;
        }
        
        #getid-main .GiTitle-title {
          text-align: center;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiTitle-subtitle {
          margin-top: 10px;
          text-align: center;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiGuide {
          position: relative;
          display: block;
          width: 100%;
        }
        
        #getid-main .GiGuide-supportedDocs {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
          height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiGuide-supportedDocs {
            height: calc(var(--gi-inner-height-mobile) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
          }
        }
        
        #getid-main .GiGuide-signature-container {
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
          height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiGuide-signature-container {
            height: calc(var(--gi-inner-height-mobile) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
          }
        }
        
        #getid-main .GiGuide-container {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          max-width: 270px;
          margin: 0 auto;
        }
        
        @media only screen and (max-height: 600px) and (max-device-width: 600px) {
          #getid-main .GiGuide-container {
            max-width: 200px;
          }
        }
        
        #getid-main .GiGuide-image {
          width: 100%;
        }
        
        #getid-main .GiSupportedDocs {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          margin-top: 16px;
        }
        
        #getid-main .GiSupportedDocs-text {
          display: none;
          color: var(--gi-text-secondary-color);
          white-space: nowrap;
        }
        
        #getid-main .GiDocsList {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          height: 82px;
          padding: 0 8px;
          background: var(--gi-foreground);
          border-radius: 8px;
          cursor: pointer;
          gap: 8px;
        }
        
        #getid-main .GiDocsList-container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
        }
        
        #getid-main .GiDocsList-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: end;
              -ms-flex-pack: end;
                  justify-content: flex-end;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100px;
          padding: 4px;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          gap: 4px;
        }
        
        #getid-main .GiSupportedDocs-divider {
          display: block;
          width: 1px;
          height: 38px;
          background: var(--gi-secondary-background);
        }
        
        #getid-main .GiDocsList-itemImage {
          width: 38px;
          height: 38px;
        }
        
        #getid-main .GiDocsList-itemTitle {
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiDocsList-button {
          width: 100px;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiIsMobile {
          display: none;
        }
        
        #getid-main .GiIsDesktop {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
        }
        
        #getid-main .GiDocumentCorners-wrapper {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          overflow: hidden;
        }
        
        #getid-main .GiDocumentAnimation-Corners {
          width: 100%;
        }
        
        #getid-main .GiDocumentBorder {
          position: absolute;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 86%;
          border: solid 3px var(--gi-secondary-color);
          border-radius: 22px;
        }
        
        #getid-main .GiSlideDocumentUp {
          -webkit-animation: slideDocumentBeforeScanning 0.3s linear;
                  animation: slideDocumentBeforeScanning 0.3s linear;
          animation-direction: reverse;
        }
        
        #getid-main .GiFlipFromBackToFront {
          position: absolute;
          width: 100%;
          border: solid 3px var(--gi-secondary-color);
          border-radius: 22px;
          -webkit-transform: rotateY(180deg);
                  transform: rotateY(180deg);
          visibility: hidden;
          -webkit-animation: showDoc 0.5s ease-in 0.5s;
                  animation: showDoc 0.5s ease-in 0.5s;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards;
        }
        
        #getid-main .GiFlipFromFrontToBack {
          position: absolute;
          border: solid 3px var(--gi-secondary-color);
          border-radius: 22px;
          -webkit-animation: hideDoc 0s ease-in 0.5s;
                  animation: hideDoc 0s ease-in 0.5s;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards;
        }
        
        #getid-main .GiFlipFromBackToFront svg {
          width: 100%;
        }
        
        #getid-main .GiFlipDocument {
          position: absolute;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 86%;
          height: 100%;
          -webkit-animation: rotateFront 1s linear;
                  animation: rotateFront 1s linear;
          -webkit-animation-fill-mode: forwards;
                  animation-fill-mode: forwards;
        }
        
        #getid-main .GiDocumentAnimation-line {
          position: absolute;
          left: 21px;
          width: 3px;
          height: 100%;
          background-color: var(--gi-success-color);
        }
        
        #getid-main .GiDocumentAnimation-gradientLine {
          position: absolute;
          left: 4px;
          width: 19px;
          height: 100%;
          background:
            -o-linear-gradient(
              right,
              var(--gi-success-color) 10%,
              rgba(255, 255, 255, 0) 100%
            );
          background:
            -webkit-gradient(
              linear,
              right top, left top,
              color-stop(10%, var(--gi-success-color)),
              to(rgba(255, 255, 255, 0))
            );
          background:
            linear-gradient(
              270deg,
              var(--gi-success-color) 10%,
              rgba(255, 255, 255, 0) 100%
            );
          opacity: 0.47;
        }
        
        #getid-main .GiDocumentScanAnimation {
          position: absolute;
          width: 100%;
          height: 91%;
          visibility: hidden;
          -webkit-animation: scanDocument 2s ease-in-out 1s infinite;
                  animation: scanDocument 2s ease-in-out 1s infinite;
        }
        
        @-webkit-keyframes slideDocumentBeforeScanning {
          to {
            -webkit-transform: translate(0, 200px) rotate(-15deg);
                    transform: translate(0, 200px) rotate(-15deg);
          }
        }
        
        @keyframes slideDocumentBeforeScanning {
          to {
            -webkit-transform: translate(0, 200px) rotate(-15deg);
                    transform: translate(0, 200px) rotate(-15deg);
          }
        }
        
        @-webkit-keyframes scanDocument {
          0% {
            visibility: visible;
          }
        
          30% {
            -webkit-transform: translate(84%);
                    transform: translate(84%);
          }
        
          30%,
          100% {
            visibility: hidden;
          }
        }
        
        @keyframes scanDocument {
          0% {
            visibility: visible;
          }
        
          30% {
            -webkit-transform: translate(84%);
                    transform: translate(84%);
          }
        
          30%,
          100% {
            visibility: hidden;
          }
        }
        
        @-webkit-keyframes rotateFront {
          100% {
            -webkit-transform: rotateY(180deg);
                    transform: rotateY(180deg);
          }
        }
        
        @keyframes rotateFront {
          100% {
            -webkit-transform: rotateY(180deg);
                    transform: rotateY(180deg);
          }
        }
        
        @-webkit-keyframes hideDoc {
          to {
            visibility: hidden;
          }
        }
        
        @keyframes hideDoc {
          to {
            visibility: hidden;
          }
        }
        
        @-webkit-keyframes showDoc {
          to {
            visibility: visible;
          }
        }
        
        @keyframes showDoc {
          to {
            visibility: visible;
          }
        }
        
        @media screen and (max-width: 600px) {
          #getid-main .GiIsMobile {
            display: block;
          }
        
          #getid-main .GiDocsList {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            min-height: 120px;
            padding: 8px 16px;
          }
        
          #getid-main .GiIsDesktop,
          #getid-main .GiSupportedDocs-divider {
            display: none;
          }
        
          #getid-main .GiDocsList-button {
            width: auto;
          }
        }
        #getid-main .GiDocsModal-header {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          height: 72px;
          padding: 0 20px 0;
          gap: 16px;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main.GiRtl .GiDocsModal-header,
          #getid-main .GiRtl .GiDocsModal-header,
          #getid-main .GiDocsModal-header {
            padding: 0 20px;
          }
        }
        
        #getid-main .GiDocsModal-title {
          width: 100%;
          color: var(--gi-text-primary-color);
        }
        
        
        #getid-main .GiDocsModal-list {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 100%;
        }
        
        #getid-main .GiDocsModal-item {
          display: grid;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--gi-outline-color);
          gap: 32px;
          grid-template-columns: minmax(100px, 40%) minmax(146px, 1fr);
        }
        
        #getid-main .GiDocsModal-item:first-of-type {
          padding: 0 24px 24px;
        }
        
        #getid-main .GiDocsModal-itemImage {
          width: 100%;
          max-width: 128px;
          max-height: 120px;
          justify-self: flex-end;
        }
        
        #getid-main .GiDocsModal-itemDescription {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
          gap: 4px;
        }
        
        #getid-main .GiDocsModal-itemDescription-title {
          text-align: left;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiDocsModal-itemDescription-subtitle {
          text-align: left;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main.GiRtl .GiDocsModal-itemDescription-title,
        #getid-main .GiRtl .GiDocsModal-itemDescription-title,
        #getid-main.GiRtl .GiDocsModal-itemDescription-subtitle,
        #getid-main .GiRtl .GiDocsModal-itemDescription-subtitle {
          text-align: right;
        }
        #getid-main .GiLoader {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 76px;
          height: 76px;
        }
        
        #getid-main .GiSpinner {
          position: absolute;
          width: 76px;
          height: 76px;
          -webkit-animation: rotate 2s linear infinite;
                  animation: rotate 2s linear infinite;
          z-index: 2;
        }
        
        #getid-main .GiSpinner-path {
          -webkit-animation: dash 1.5s ease-in-out infinite;
                  animation: dash 1.5s ease-in-out infinite;
          stroke: var(--gi-primary-color);
          stroke-linecap: round;
        }
        
        @-webkit-keyframes rotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @keyframes rotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @-webkit-keyframes dash {
          0% {
            stroke-dasharray: 1, 300;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -55;
          }
        
          100% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -184;
          }
        }
        
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 300;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -55;
          }
        
          100% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -184;
          }
        }
        #getid-main .getid-autocomplete {
          position: relative;
          display: block;
          width: 100%;
          resize: none;
        }
        
        #getid-main .getid-autocomplete-items {
          width: 100%;
          list-style-type: none;
          background-color: var(--gi-background-color);
          border-top: none;
          border-bottom: none;
          z-index: 99;
        }
        
        #getid-main .getid-autocomplete-items li {
          position: relative;
          display: list-item;
          width: 100%;
          height: 100%;
          color: var(--gi-text-secondary-color);
          cursor: pointer;
        }
        
        #getid-main .getid-autocomplete-items li strong {
          font-weight: var(--gi-font-title3-weight);
        }
        
        #getid-main .getid-autocomplete-items span {
          text-align: start;
        }
        
        #getid-main .getid-autocomplete-content {
          position: absolute;
          left: 0;
          width: 100%;
          margin-top: -1rem;
          text-align: start;
          background-color: var(--gi-background-color);
          z-index: 200;
        }
        
        #getid-main .getid-autocomplete-items-bg {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          background-color: var(--gi-primary-color);
          opacity: 0.05;
        }
        
        #getid-main .getid-autocomplete-items-bg:hover {
          opacity: 0.15;
        }
        
        #getid-main .getid-autocomplete-items-bg.active {
          opacity: 0.15;
        }
        
        #getid-main .wrapper-value {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 100%;
          padding: 10px;
          pointer-events: none;
        }
        
        #getid-main .wrapper-item {
          position: relative;
          width: 100%;
          height: 100%;
        }
        #getid-main .getid-tooltip-wrapper {
          position: relative;
        }
        
        #getid-main .getid-tooltip-wrapper input {
          display: inline;
        }
        
        #getid-main .getid-tooltip-wrapper .getid-tooltip-question {
          position: absolute;
          top: 50%;
          right: 12px;
          color: var(--gi-secondary-text-color);
          -webkit-transform: translateY(-40%);
              -ms-transform: translateY(-40%);
                  transform: translateY(-40%);
        }
        
        #getid-main.GiRtl .getid-tooltip-wrapper .getid-tooltip-question {
          position: absolute;
          top: 50%;
          left: 12px;
          right: unset;
          color: var(--gi-secondary-text-color);
          -webkit-transform: translateY(-40%);
              -ms-transform: translateY(-40%);
                  transform: translateY(-40%);
        }
        #getid-main .getid-form__checkbox {
          display: block;
          min-height: 50px;
          padding-top: 12px;
          -webkit-box-sizing: content-box;
                  box-sizing: content-box;
        }
        
        #getid-main .getid-checkbox__label {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          margin: 0;
          text-align: left;
          color: var(--gi-text-secondary-color);
          cursor: pointer;
        }
        
        #getid-main.GiRtl .getid-checkbox__label,
        #getid-main .GiRtl .getid-checkbox__label {
          text-align: right;
        }
        
        #getid-main input[type='checkbox'] {
          position: absolute;
          cursor: pointer;
          opacity: 0;
        }
        
        #getid-main .getid-checkbox__input {
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 20px;
          min-width: 20px;
          height: 20px;
          margin-right: 12px;
          background-color: transparent;
          border: 1px solid var(--gi-text-secondary-color);
          border-radius: 4px;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          cursor: pointer;
          opacity: 0.4;
        }
        
        #getid-main.GiRtl .getid-checkbox__input,
        #getid-main .GiRtl .getid-checkbox__input {
          margin-left: 12px;
          margin-right: 0;
        }
        
        @media (hover: hover) {
          #getid-main .getid-checkbox__label:hover input ~ .getid-checkbox__input {
            border-color: var(--gi-input-hover-border-color);
            opacity: 1;
          }
        }
        
        #getid-main .getid-checkbox__label input:checked ~ .getid-checkbox__input {
          background-color: var(--gi-primary-color);
          border: 1px solid var(--gi-primary-color);
          opacity: 1;
        }
        
        #getid-main .getid-checkbox__input::after {
          content: '';
          display: block;
          width: 5px;
          height: 10px;
          margin-bottom: 2px;
          border: 2px solid transparent;
          border-top: 0;
          border-left: 0;
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
        }
        
        /* #getid-main.GiRtl .getid-checkbox__input::after,
        #getid-main .GiRtl .getid-checkbox__input::after {
            transform: rotate(-45deg) scaleX(-1);
        } */
        
        #getid-main .getid-checkbox__label input:checked ~ .getid-checkbox__input::after {
          display: block;
          border-color: var(--gi-on-primary-color);
        }
        #getid-main .GiRadioButton-label {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: nowrap;
              flex-wrap: nowrap;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          margin: 0 auto;
          padding: 9px 15px;
          color: var(--gi-input-text-color);
          background: var(--gi-input-background-color);
          border: 1px solid var(--gi-input-border-color);
          border-radius: var(--gi-input-border-radius);
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          cursor: pointer;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          gap: 10px;
        }
        
        @media (hover: hover) {
          #getid-main .GiRadioButton-label:hover {
            border: 1px solid var(--gi-input-hover-border-color);
          }
        }
        
        #getid-main .GiRadioButton-label:active {
          border: 1px solid var(--gi-input-active-border-color);
        }
        
        #getid-main .GiRadioButton-input {
          position: absolute;
          cursor: pointer;
          opacity: 0;
        }
        
        #getid-main .GiRadioButton-tumbler {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 20px;
          height: 20px;
          background-color: transparent;
          border: 1px solid var(--gi-text-secondary-color);
          border-radius: 50%;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          opacity: 0.4;
        }
        
        #getid-main.GiRtl .GiRadioButton-tumbler,
        #getid-main .GiRtl .GiRadioButton-tumbler {
          margin-left: 10px;
          margin-right: 0;
        }
        
        #getid-main .GiRadioButton-label:hover .GiRadioButton-input ~ .GiRadioButton-tumbler {
          border-color: var(--gi-input-hover-border-color);
          opacity: 1;
        }
        
        #getid-main .GiRadioButton-label .GiRadioButton-input:checked ~ .GiRadioButton-tumbler {
          border: 1px solid var(--gi-primary-color);
          opacity: 1;
        }
        
        #getid-main .GiRadioButton-tumbler::after {
          content: '';
          display: none;
          width: 12px;
          min-width: 12px;
          height: 12px;
          background: var(--gi-primary-color);
          border-radius: 50%;
        }
        
        #getid-main .GiRadioButton-label .GiRadioButton-input:checked ~ .GiRadioButton-tumbler::after {
          display: block;
        }
        #getid-main .getid-fade-out {
          visibility: hidden;
          opacity: 0;
          -webkit-transition: visibility 0s linear 300ms, opacity 300ms;
          -o-transition: visibility 0s linear 300ms, opacity 300ms;
          transition: visibility 0s linear 300ms, opacity 300ms;
        }
        
        #getid-main .getid-fade-in {
          visibility: visible;
          opacity: 1;
          -webkit-transition: visibility 0s linear 0s, opacity 300ms;
          -o-transition: visibility 0s linear 0s, opacity 300ms;
          transition: visibility 0s linear 0s, opacity 300ms;
        }
        
        #getid-main .getid-tooltip-content-wrapper-upper-input {
          position: absolute;
          bottom: 56px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          z-index: 200;
        }
        
        #getid-main .getid-tooltip-content-upper-input {
          width: 100%;
          padding: 16px;
          text-align: start;
          color: var(--gi-text-secondary-color);
          white-space: pre-wrap;
          word-break: break-word;
          background: var(--gi-background-color);
          border-radius: 8px;
          -webkit-box-shadow: var(--gi-text-secondary-color) 0 4px 10px;
                  box-shadow: var(--gi-text-secondary-color) 0 4px 10px;
        }
        
        #getid-main .getid-tooltip-arrow-upper-input {
          position: absolute;
          right: 1.1em;
          bottom: -6px;
          width: 12px;
          height: 12px;
          background-color: var(--gi-background-color);
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          -webkit-transform-origin: center;
              -ms-transform-origin: center;
                  transform-origin: center;
          z-index: 1;
        }
        
        #getid-main.getid-rtl .getid-tooltip-arrow-upper-input {
          position: absolute;
          left: 1.1em;
          right: unset;
          bottom: -6px;
          width: 12px;
          height: 12px;
          background-color: var(--gi-background-color);
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          -webkit-transform-origin: center;
              -ms-transform-origin: center;
                  transform-origin: center;
          z-index: 1;
        }
        
        #getid-main .getid-tooltip-content-wrapper-under-input {
          position: absolute;
          top: 56px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          margin-top: unset;
          z-index: 200;
        }
        
        #getid-main .getid-tooltip-content-under-input {
          width: 100%;
          padding: 16px;
          text-align: start;
          color: var(--gi-text-secondary-color);
          white-space: pre-wrap;
          word-break: break-word;
          background: var(--gi-background-color);
          border-radius: 8px;
          -webkit-box-shadow: var(--gi-text-secondary-color) 0 -4px 10px;
                  box-shadow: var(--gi-text-secondary-color) 0 -4px 10px;
        }
        
        #getid-main .getid-tooltip-arrow-under-input {
          position: absolute;
          top: -6px;
          right: 1.1em;
          width: 12px;
          height: 12px;
          background-color: var(--gi-background-color);
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          -webkit-transform-origin: center;
              -ms-transform-origin: center;
                  transform-origin: center;
          z-index: 1;
        }
        
        #getid-main.getid-rtl .getid-tooltip-arrow-under-input {
          position: absolute;
          top: -6px;
          left: 1.1em;
          right: unset;
          width: 12px;
          height: 12px;
          background-color: var(--gi-background-color);
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          -webkit-transform-origin: center;
              -ms-transform-origin: center;
                  transform-origin: center;
          z-index: 1;
        }
        #getid-main .GiCustomSelect-container {
          position: relative;
          display: block;
          width: 100%;
          padding: 0 24px;
        }
        
        #getid-main .GiCustomSelect-container::after {
          content: '';
          position: absolute;
          top: calc(50% - 2px);
          right: 48px;
          display: inline-block;
          padding: 2px;
          border: solid var(--gi-input-placeholder-color);
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          z-index: 1;
        }
        
        #getid-main.GiRtl .GiCustomSelect-container::after,
        #getid-main .GiRtl .GiCustomSelect-container::after {
          left: 24px;
          right: auto;
        }
        
        #getid-main .GiCustomSelect {
          display: block;
          width: 100%;
          margin: 0 auto;
          padding: 24px 48px 24px 24px;
          text-align: left;
          color: var(--gi-input-text-color);
          background: var(--gi-input-background-color);
          border: 1px solid var(--gi-input-border-color);
          border-radius: var(--gi-input-border-radius);
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          cursor: pointer;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          z-index: 1;
        }
        
        @media (hover: hover) {
          #getid-main .GiCustomSelect-container:hover::after {
            border-color: var(--gi-primary-color);
          }
        }
        #getid-main .GiMagicLink-content-withFooter {
          max-height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
        }
        
        #getid-main .GiMagicLink-content-withoutFooter {
          max-height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header));
        }
        
        #getid-main .GiMagicLink-qrCode-container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          margin-top: 24px;
        }
        
        #getid-main .GiMagicLink-qrCode {
          min-width: 220px;
          border-radius: 8px;
        }
        
        #getid-main .GiMagicLink-loader {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          color: var(--gi-text-primary-color);
          gap: 16px;
        }
        
        #getid-main .GiMagicLink-description {
          display: block;
          margin-top: 24px;
          padding: 24px 32px;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiMagicLink-copy-container {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          padding: 32px;
        }
        
        #getid-main .GiMagicLink-copy-generic {
          position: absolute;
          width: 0.1px;
          height: 0.1px;
          overflow: hidden;
          opacity: 0;
          z-index: -1;
        }
        
        #getid-main .GiMagicLink-copy {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          min-height: 48px;
          padding-left: 16px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
             text-overflow: ellipsis;
          background: transparent;
          border: 1px solid var(--gi-outline-color);
          border-radius: var(--gi-input-border-radius);
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          z-index: 1;
          gap: 16px;
        }
        
        #getid-main.GiRtl .GiMagicLink-copy,
        #getid-main .GiRtl .GiMagicLink-copy {
          padding-left: 0;
          padding-right: 16px;
        }
        
        #getid-main .GiMagicLink-copy:focus,
        #getid-main .GiMagicLink-copy:active {
          outline: none;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
        
        #getid-main .GiMagicLink-copy-placeholder {
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          width: 100%;
          overflow: hidden;
          text-align: justify;
          color: var(--gi-text-secondary-color);
          white-space: nowrap;
          -o-text-overflow: ellipsis;
             text-overflow: ellipsis;
          border: none;
          cursor: pointer;
        }
        
        #getid-main .GiMagicLink-copy-iconContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -ms-flex-negative: 0;
              flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: 4px;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiMagicLink-copy-icon {
          color: var(--gi-success-color);
        }
        
        #getid-main .GiMagicLink-copy-button {
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiMagicLink-copy:hover .GiMagicLink-copy-button {
          background: var(--gi-foreground);
        }
        #getid-main .GiStatus-description {
          text-align: left;
        }
        
        #getid-main.GiRtl .GiStatus-description,
        #getid-main .GiRtl .GiStatus-description {
          text-align: right;
        }
        
        #getid-main .getid-status__message_header {
          display: block;
          margin-top: 16px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiCountrySelect-canScrollTop {
          -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.04);
                  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.04);
        }
        
        #getid-main .GiCountrySelect-scrollableContainer {
          display: block;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          overflow: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }
        
        #getid-main .GiCountrySelect {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          min-width: 120px;
          padding: 3px 4px 3px 8px;
          color: var(--gi-text-secondary-color);
          background: var(--gi-background-color);
          border: 1px solid var(--gi-outline-color);
          border-radius: 4px;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
        }
        
        #getid-main.GiRtl .GiCountrySelect,
        #getid-main .GiRtl .GiCountrySelect {
          padding: 3px 8px 3px 4px;
        }
        
        #getid-main .GiCountrySelect:hover {
          background: var(--gi-foreground);
        }
        
        #getid-main .GiCountrySelect-flag {
          width: 24px;
          height: 18px;
          margin-right: 8px;
        }
        
        #getid-main.GiRtl .GiCountrySelect-flag,
        #getid-main .GiRtl .GiCountrySelect-flag {
          margin-left: 8px;
          margin-right: 0;
        }
        
        #getid-main .GiCountrySelect-search {
          position: sticky;
          top: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-negative: 0;
              flex-shrink: 0;
          padding: 24px 32px;
          color: var(--gi-text-primary-color);
          background: var(--gi-background-color);
          border-bottom: 1px solid var(--gi-outline-color);
          cursor: auto;
          z-index: 1;
        }
        
        #getid-main .GiCountrySelect-search-input {
          width: 100%;
          margin-left: 16px;
          -webkit-touch-callout: none;
        }
        
        #getid-main.GiRtl .GiCountrySelect-search-input,
        #getid-main .GiRtl .GiCountrySelect-search-input {
          margin-left: 0;
          margin-right: 16px;
        }
        
        #getid-main .GiCountrySelect-search-input::-webkit-search-decoration,
        #getid-main .GiCountrySelect-search-input::-webkit-search-cancel-button,
        #getid-main .GiCountrySelect-search-input::-webkit-search-results-button,
        #getid-main .GiCountrySelect-search-input::-webkit-search-results-decoration {
          display: none;
        }
        
        #getid-main .GiCountrySelect-search-input::-webkit-input-placeholder {
          color: var(--gi-text-secondary-color);
          -webkit-touch-callout: none;
        }
        
        #getid-main .GiCountrySelect-search-input::-moz-placeholder {
          color: var(--gi-text-secondary-color);
          -webkit-touch-callout: none;
        }
        
        #getid-main .GiCountrySelect-search-input:-ms-input-placeholder {
          color: var(--gi-text-secondary-color);
          -webkit-touch-callout: none;
        }
        
        #getid-main .GiCountrySelect-search-input::-ms-input-placeholder {
          color: var(--gi-text-secondary-color);
          -webkit-touch-callout: none;
        }
        
        #getid-main .GiCountrySelect-search-input::placeholder {
          color: var(--gi-text-secondary-color);
          -webkit-touch-callout: none;
        }
        
        #getid-main .GiCountrySelect-priorityContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          padding: 16px 0;
        }
        
        #getid-main .GiCountrySelect-priorityCountry {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          padding: 8px 8px 8px 32px;
          text-align: left;
          color: var(--gi-text-primary-color);
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
          gap: 16px;
        }
        
        #getid-main.GiRtl .GiCountrySelect-priorityCountry,
        #getid-main .GiRtl .GiCountrySelect-priorityCountry {
          padding: 8px 32px 8px 8px;
          text-align: right;
        }
        
        #getid-main .GiCountrySelect-priorityCountry-flag {
          width: 24px;
          height: 18px;
        }
        
        #getid-main .GiCountrySelect-separator {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          padding: 8px 8px 8px 32px;
          color: var(--gi-text-secondary-color);
          background: var(--gi-secondary-background);
          cursor: auto;
        }
        
        #getid-main.GiRtl .GiCountrySelect-separator,
        #getid-main .GiRtl .GiCountrySelect-separator {
          padding: 8px 32px 8px 8px;
        }
        
        #getid-main .GiCountrySelect-item {
          width: 100%;
          padding: 12px 12px 12px 32px;
          text-align: left;
          color: var(--gi-text-primary-color);
          cursor: pointer;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main.GiRtl .GiCountrySelect-item,
        #getid-main .GiRtl .GiCountrySelect-item {
          padding: 12px 32px 12px 12px;
          text-align: right;
        }
        
        #getid-main .GiCountrySelect-item.GiCountrySelect-active {
          color: var(--gi-primary-color);
        }
        
        #getid-main .GiCountrySelect-priorityCountry:hover,
        #getid-main .GiCountrySelect-item:hover {
          background: var(--gi-foreground);
        }
        
        #getid-main .GiCountrySelect-highlight {
          color: var(--gi-primary-color);
        }
        #getid-main .GiLocaleSelect-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          padding: 12px 8px;
          text-align: left;
          color: var(--gi-text-primary-color);
          gap: 4px;
        }
        
        #getid-main.GiRtl .GiLocaleSelect-item,
        #getid-main .GiRtl .GiLocaleSelect-item {
          text-align: right;
        }
        
        #getid-main .GiLocaleSelect-item:hover {
          background: var(--gi-foreground);
        }
        
        #getid-main .GiLocaleSelect-icon {
          color: var(--gi-primary-color);
          visibility: hidden;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiLocaleSelect-active {
          visibility: visible;
        }
        #getid-main .GiFader {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        #getid-main .GiFader--top {
          bottom: auto;
          width: 100%;
          height: 18px;
          background-image: -o-linear-gradient(rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0.001));
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.12)), to(rgba(255, 255, 255, 0.001)));
          background-image: linear-gradient(rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0.001));
        }
        
        #getid-main .GiFader-lite--top {
          bottom: auto;
          width: 100%;
          height: 3px;
          background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 51.62%, rgba(0, 0, 0, 0) 100.9%);
          background: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0)), color-stop(51.62%, rgba(0, 0, 0, 0.2)), color-stop(100.9%, rgba(0, 0, 0, 0)));
          background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 51.62%, rgba(0, 0, 0, 0) 100.9%);
          -webkit-filter: blur(2px);
                  filter: blur(2px);
        }
        
        
        #getid-main .GiFader--bottom {
          top: auto;
          width: 100%;
          height: 18px;
          background-image: -o-linear-gradient(rgba(255, 255, 255, 0.001), rgba(0, 0, 0, 0.12));
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.001)), to(rgba(0, 0, 0, 0.12)));
          background-image: linear-gradient(rgba(255, 255, 255, 0.001), rgba(0, 0, 0, 0.12));
        }
        
        #getid-main .GiFader-lite--bottom {
          top: auto;
          width: 100%;
          height: 3px;
          background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 51.62%, rgba(0, 0, 0, 0) 100.9%);
          background: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0)), color-stop(51.62%, rgba(0, 0, 0, 0.2)), color-stop(100.9%, rgba(0, 0, 0, 0)));
          background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 51.62%, rgba(0, 0, 0, 0) 100.9%);
          -webkit-filter: blur(2px);
                  filter: blur(2px);
        }
        
        
        #getid-main .GiFader--left {
          right: auto;
          width: 18px;
          height: 100%;
          background-image:
            -o-linear-gradient(
              right,
              rgba(255, 255, 255, 0.001),
              rgba(0, 0, 0, 0.12)
            );
          background-image:
            -webkit-gradient(
              linear,
              right top, left top,
              from(rgba(255, 255, 255, 0.001)),
              to(rgba(0, 0, 0, 0.12))
            );
          background-image:
            linear-gradient(
              to left,
              rgba(255, 255, 255, 0.001),
              rgba(0, 0, 0, 0.12)
            );
        }
        
        #getid-main .GiFader--right {
          left: auto;
          width: 18px;
          height: 100%;
          background-image:
            -o-linear-gradient(
              left,
              rgba(0, 0, 0, 0.12),
              rgba(255, 255, 255, 0.001)
            );
          background-image:
            -webkit-gradient(
              linear,
              left top, right top,
              from(rgba(0, 0, 0, 0.12)),
              to(rgba(255, 255, 255, 0.001))
            );
          background-image:
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.12),
              rgba(255, 255, 255, 0.001)
            );
        }
        
        #getid-main .GiScrollable {
          position: relative;
          display: block;
          height: 100%;
          overflow: hidden;
        }
        
        #getid-main .GiScrollable-content {
          display: block;
          height: 100%;
          overflow: auto;
        }
        
        #getid-main .GiScrollable-fader {
          opacity: 0;
        }
        
        #getid-main .GiScrollable-fader--visible {
          opacity: 1;
          -webkit-animation-name: fadeInOpacity;
                  animation-name: fadeInOpacity;
          -webkit-animation-duration: 0.1s;
                  animation-duration: 0.1s;
          -webkit-animation-timing-function: linear;
                  animation-timing-function: linear;
          -webkit-animation-iteration-count: 1;
                  animation-iteration-count: 1;
        }
        
        #getid-main .GiScrollable-fader--not-visible {
          opacity: 0;
          -webkit-animation-name: fadeOutOpacity;
                  animation-name: fadeOutOpacity;
          -webkit-animation-duration: 0.1s;
                  animation-duration: 0.1s;
          -webkit-animation-timing-function: linear;
                  animation-timing-function: linear;
          -webkit-animation-iteration-count: 1;
                  animation-iteration-count: 1;
        }
        
        @-webkit-keyframes fadeInOpacity {
          0% {
            opacity: 0;
          }
        
          100% {
            opacity: 1;
          }
        }
        
        @keyframes fadeInOpacity {
          0% {
            opacity: 0;
          }
        
          100% {
            opacity: 1;
          }
        }
        
        @-webkit-keyframes fadeOutOpacity {
          0% {
            opacity: 1;
          }
        
          100% {
            opacity: 0;
          }
        }
        
        @keyframes fadeOutOpacity {
          0% {
            opacity: 1;
          }
        
          100% {
            opacity: 0;
          }
        }
        #getid-main .GiFooterDisclaimer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 100%;
          max-width: var(--gi-container-max-width);
          padding: 0 24px 24px;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
          gap: 8px;
        }
        
        @media only screen and (max-height: 600px) and (max-device-width: 600px) {
          #getid-main .GiFooterDisclaimer {
            padding: 18px 8px 8px;
          }
        }
        
        #getid-main .GiFooterDisclaimer-description {
          display: block;
          text-align: center;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiFooterDisclaimer-icons {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          gap: 16px;
        }
        #getid-main .GiError-landscape {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: none;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          padding: 32px;
          background: var(--gi-background-color);
          z-index: var(--gi-inner-z-index);
          gap: 32px;
        }
        
        #getid-main .GiError-landscape_icon {
          margin-top: 50px;
          color: var(--gi-accent-color);
          -webkit-transform: scale(2);
              -ms-transform: scale(2);
                  transform: scale(2);
        }
        
        @media screen and (orientation: landscape) and (max-height: 499px) and (min-width: 400px) {
          #getid-main .GiError-landscape {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }
        }
        @-webkit-keyframes appearDisappearFinger {
          0%,
          30% {
            background-color: var(--gi-error-color);
            -webkit-transform: rotate(180deg) scale(-1, 1);
                    transform: rotate(180deg) scale(-1, 1);
            opacity: 1;
          }
        
          30%,
          50% {
            opacity: 0;
          }
        
          50%,
          75% {
            -webkit-transform: rotate(0deg) scale(1, 1);
                    transform: rotate(0deg) scale(1, 1);
            opacity: 0;
          }
        
          75%,
          100% {
            background-color: var(--gi-success-color);
            opacity: 1;
          }
        }
        
        @keyframes appearDisappearFinger {
          0%,
          30% {
            background-color: var(--gi-error-color);
            -webkit-transform: rotate(180deg) scale(-1, 1);
                    transform: rotate(180deg) scale(-1, 1);
            opacity: 1;
          }
        
          30%,
          50% {
            opacity: 0;
          }
        
          50%,
          75% {
            -webkit-transform: rotate(0deg) scale(1, 1);
                    transform: rotate(0deg) scale(1, 1);
            opacity: 0;
          }
        
          75%,
          100% {
            background-color: var(--gi-success-color);
            opacity: 1;
          }
        }
        
        @-webkit-keyframes appearance {
          0% {
            opacity: 0;
          }
        
          100% {
            opacity: 1;
          }
        }
        
        @keyframes appearance {
          0% {
            opacity: 0;
          }
        
          100% {
            opacity: 1;
          }
        }
        #getid-main .GiDragAndDropZone {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 100%;
          text-align: center;
        }
        
        #getid-main .GiDragAndDropZone-label {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          height: 100%;
          background-color: var(--gi-primary-background-color, #ffffff);
          border: 1px dashed var(--gi-outline-color);
          border-radius: 10px;
        }
        
        #getid-main .GiDragAndDropZone-label--dragActive {
          background-color: var(--gi-primary-overlay-background, hsla(211, 100%, 50%, 0.2));
          border-color: var(--gi-primary-color, #007aff);
        }
        
        #getid-main .GiDragAndDropZone-icon {
          width: 48px;
          color: var(--gi-secondary-text-color, #555555);
        }
        
        #getid-main .GiDragAndDropZone-label--error {
          border-color: var(--gi-error-color, #f05a7e);
        }
        
        #getid-main .GiDragAndDropZone-content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          min-height: 320px;
        }
        
        #getid-main .GiDragAndDropZone-header {
          max-width: 350px;
          padding-top: 24px;
        }
        
        #getid-main .GiDragAndDropZone-body {
          padding-top: 12px;
        }
        
        #getid-main .GiDragAndDropZone-hiddenInput {
          display: none;
        }
        
        #getid-main .GiDragAndDropZone-dragFileElement {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
        }
        
        #getid-main .GiDragAndDropZone-iconContainer {
          position: relative;
          width: 92px;
          height: 92px;
        }
        
        #getid-main .GiDragAndDropZone-iconActive {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 92px;
          height: 92px;
          color: var(--gi-primary-color, #007aff);
        }
        
        #getid-main .GiDragAndDropZone-arrowAnimation {
          -webkit-animation: moveArrow infinite ease-in-out 1s;
                  animation: moveArrow infinite ease-in-out 1s;
        }
        
        @-webkit-keyframes moveArrow {
          from {
            top: 0;
          }
        
          50% {
            top: 8px;
          }
        
          to {
            top: 0;
          }
        }
        
        @keyframes moveArrow {
          from {
            top: 0;
          }
        
          50% {
            top: 8px;
          }
        
          to {
            top: 0;
          }
        }
        #getid-main .GiWelcome-scrollableContainer {
          margin-top: 8px;
        }
        
        #getid-main .GiWelcome {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          -webkit-box-align: baseline;
              -ms-flex-align: baseline;
                  align-items: baseline;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          margin: 0 auto;
          padding: 0 32px;
          gap: 16px;
        }
        
        #getid-main .GiWelcome-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          text-align: center;
          gap: 24px;
        }
        
        #getid-main .GiWelcome-item-image {
          width: 32px;
        }
        
        #getid-main .GiWelcome-item-text {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
          gap: 4px;
        }
        
        #getid-main .GiWelcome-item-title {
          text-align: left;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiWelcome-item-description {
          text-align: left;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main.GiRtl .GiWelcome-item-title,
        #getid-main .GiRtl .GiWelcome-item-title,
        #getid-main.GiRtl .GiWelcome-item-description,
        #getid-main .GiRtl .GiWelcome-item-description {
          text-align: right;
        }
        
        #getid-main .GiWelcome-footer {
          -webkit-box-flex: 0;
              -ms-flex: 0;
                  flex: 0;
        }
        #getid-main .GiPoa-content {
          position: static;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
        }
        
        #getid-main .GiPoa-pdfPreview {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          width: 100%;
          padding: 16px;
          text-align: start;
          white-space: pre-wrap;
          word-break: break-word;
          background: var(--gi-secondary-background);
          border-radius: 8px;
        }
        
        #getid-main .GiPoa-ruleList {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          padding-left: 48px;
          list-style: none;
          text-align: left;
          color: var(--gi-text-secondary-color);
          gap: 8px;
        }
        
        #getid-main.GiRtl .GiPoa-ruleList,
        #getid-main .GiRtl .GiPoa-ruleList {
          padding-left: 0;
          padding-right: 48px;
          text-align: right;
        }
        
        #getid-main .GiPoa-guide {
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
        }
        
        #getid-main .GiPoa-guideDescription {
          text-align: center;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiPoa-dragAndDrop {
          padding: 8px 24px 48px;
        }
        
        /* todo remove it after poa flow implementation */
        #getid-main .getid-content__done {
          padding-top: 20px;
        }
        
        #getid-main .GiPoa-pdfGenericPreview {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          height: 100%;
          color: var(--gi-success-color);
          background-color: var(--gi-primary-background-color, #ffffff);
          border: 1px solid var(--gi-success-color);
          border-radius: 10px;
          gap: 24px;
        }
        
        #getid-main .GiPoa-pdfGenericPreview-title {
          color: var(--gi-primary-text-color);
        }
        
        #getid-main .GiPoa-addressLayout {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          gap: 8px;
        }
        
        #getid-main .GiPoa-addressLayout-city {
          -webkit-box-flex: 3;
              -ms-flex: 3;
                  flex: 3;
        }
        
        #getid-main .GiPoa-addressLayout-postalcode {
          -webkit-box-flex: 2;
              -ms-flex: 2;
                  flex: 2;
        }
        
        #getid-main .GiPoa-documentMobile-content {
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
        }
        
        #getid-main .GiPoa-contentPdfGenericPreview {
          padding: 0 32px;
        }
        
        #getid-main .GiPoa-hidden {
          visibility: hidden;
        }
        
        #getid-main .GiDocumentPoa {
          position: absolute;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
        }
        #getid-main .GiBank-content {
          position: static;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
        }
        
        #getid-main .GiBank-pdfPreview {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          width: 100%;
          padding: 16px;
          text-align: start;
          white-space: pre-wrap;
          word-break: break-word;
          background: var(--gi-secondary-background);
          border-radius: 8px;
        }
        
        #getid-main .GiBank-guide {
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
        }
        
        #getid-main .GiBank-guideDescription {
          margin-top: 20px;
          text-align: center;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiBank-pdfGenericPreview {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          height: 100%;
          color: var(--gi-success-color);
          background-color: var(--gi-primary-background-color, #ffffff);
          border: 1px solid var(--gi-success-color);
          border-radius: 10px;
          gap: 24px;
        }
        
        #getid-main .GiBank-pdfGenericPreview-title {
          color: var(--gi-primary-text-color);
        }
        
        #getid-main .GiBank-documentMobile-content {
          -webkit-box-pack: space-evenly;
              -ms-flex-pack: space-evenly;
                  justify-content: space-evenly;
        }
        
        #getid-main .GiBank-contentPdfGenericPreview {
          padding: 0 32px;
        }
        
        #getid-main .GiDocumentBank {
          position: absolute;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
        }
        #getid-main .getid-consent {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          max-width: 100%;
          padding: 0 24px;
        }
        
        #getid-main .getid-consent__body {
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          max-height: 350px;
          overflow: auto;
          font-size: var(--gi-font-title2-size);
          font-weight: var(--gi-font-body1-weight);
          line-height: 1.5;
          text-align: start;
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .getid-consent__agree {
          margin-top: 50px;
        }
        #getid-main .GiRules {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 90%;
          max-width: var(--gi-container-max-width);
          padding-left: 16%;
          list-style: none;
          gap: 18px;
        }
        
        #getid-main.GiRtl .GiRules,
        #getid-main .GiRtl .GiRules {
          padding-left: 0;
          padding-right: 16%;
        }
        
        @media only screen and (max-width: 568px) {
          #getid-main .GiRules {
            padding-left: 0;
          }
        
          #getid-main.GiRtl .GiRules,
          #getid-main .GiRtl .GiRules {
            padding-right: 0;
          }
        }
        
        #getid-main .GiRules-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
              -ms-flex-direction: row;
                  flex-direction: row;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          color: var(--gi-text-secondary-color);
          gap: 12px;
        }
        
        #getid-main .GiRules-image {
          max-width: 85px;
        }
        
        #getid-main .GiRules-description {
          color: var(--gi-secondary-color);
        }
        
        #getid-main .GIRulesList-itemIcon {
          -ms-flex-negative: 0;
              flex-shrink: 0;
          color: var(--gi-primary-color);
        }
        
        #getid-main.GiRtl .GIRulesList-itemIcon,
        #getid-main .GiRtl .GIRulesList-itemIcon {
          margin-left: 8px;
          margin-right: 0;
        }
        
        #getid-main.GiRtl .GIRulesList,
        #getid-main .GiRtl .GIRulesList {
          padding-right: 0;
        }
        
        #getid-main .GIRulesList {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          max-height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header) - var(--gi-inner-height-footer) - 150px);
          margin: 16px 16px 0;
          padding: 0;
          overflow: auto;
          list-style: none;
          text-align: left;
          color: var(--gi-text-secondary-color);
          gap: 6px;
        }
        
        #getid-main.GiRtl .GIRulesList,
        #getid-main .GiRtl .GIRulesList {
          text-align: right;
        }
        
        #getid-main .GIRulesList-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          gap: 8px;
        }
        
        #getid-main .GIRulesList-title {
          margin: 0 16px;
          text-align: left;
          color: var(--gi-text-primary-color);
        }
        #getid-main .GiWaiting-resultList {
          list-style-type: none;
        }
        
        #getid-main .GiWaiting-resultList-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          margin-top: 1.1em;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiWaiting-icon {
          position: relative;
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
        
        #getid-main.GiRtl .GiWaiting-icon,
        #getid-main .GiRtl .GiWaiting-icon {
          margin-left: 12px;
          margin-right: 0;
        }
        
        #getid-main .GiWaiting-pendingText {
          color: var(--gi-text-secondary-color);
        }
        
        #getid-main .GiWaiting-spinner {
          position: absolute;
          width: 24px;
          height: 24px;
          -webkit-animation: rotateWait 2s linear infinite;
                  animation: rotateWait 2s linear infinite;
          z-index: 2;
        }
        
        #getid-main .GiWaiting-spinnerPath {
          -webkit-animation: dashWait 1.5s ease-in-out infinite;
                  animation: dashWait 1.5s ease-in-out infinite;
          stroke-width: 2px;
          fill: none;
          stroke: var(--gi-primary-color);
          stroke-linecap: round;
        }
        
        @-webkit-keyframes rotateWait {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @keyframes rotateWait {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        
        @-webkit-keyframes dashWait {
          0% {
            stroke-dasharray: 1, 75;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -17;
          }
        
          100% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -62;
          }
        }
        
        @keyframes dashWait {
          0% {
            stroke-dasharray: 1, 75;
            stroke-dashoffset: 0;
          }
        
          50% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -17;
          }
        
          100% {
            stroke-dasharray: 45, 75;
            stroke-dashoffset: -62;
          }
        }
        /* #getid-main .camera-message {
          top: 0;
          align-items: center;
          width: fit-content;
          margin: auto;
        } */
        #getid-main .GiError {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          width: 100%;
        }
        
        #getid-main .GiError-title {
          font-family: var(--gi-font-family);
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiError-description {
          margin-top: 80px;
          color: var(--gi-primary-color);
          cursor: pointer;
        }
        
        #getid-main .GiError-description-missingFields {
          margin-top: 30px;
          list-style: none;
        }
        
        #getid-main .GiError-descriptionItem {
          position: relative;
          text-align: left;
        }
        
        #getid-main .GiError-descriptionText {
          color: var(--gi-secondary-color);
        }
        
        #getid-main .GiError-descriptionItem::before {
          content: '·';
          position: absolute;
          left: -12px;
          bottom: 1px;
          margin-right: 8px;
          font-size: var(--gi-font-body1-size);
          color: var(--gi-secondary-color);
        }
        
        #getid-main .GiError-link {
          margin-top: 20px;
          font-weight: 700;
          color: var(--gi-secondary-color);
        }
        #getid-main .GiHidden-input {
          display: none;
        }
        
        #getid-main .GiCamera-container {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          width: 100%;
          max-width: 100%;
          height:
            calc(
              var(--gi-inner-height-desktop) - var(--gi-inner-height-header) -
              var(--gi-inner-height-footer) - 2px
            );
          overflow: hidden;
          line-height: 0;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiCamera-container {
            height:
              calc(
                var(--gi-inner-height-mobile) - var(--gi-inner-height-header) - 96px
              );
          }
        }
        
        #getid-main .GiPreview-container {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          max-width: 100%;
          height:
            calc(
              var(--gi-inner-height-desktop) - var(--gi-inner-height-header) -
              var(--gi-inner-height-footer) - 2px
            );
          overflow: hidden;
          line-height: 0;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiPreview-container {
            height:
              calc(
                var(--gi-inner-height-mobile) - var(--gi-inner-height-header) -
                var(--gi-inner-height-footer)
              );
          }
        }
        
        #getid-main .GiPreview {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: start;
              -ms-flex-align: start;
                  align-items: flex-start;
          width: 100%;
          max-width: var(--gi-container-max-width);
          max-height: 100%;
          overflow: auto;
          image-orientation: none;
        }
        
        #getid-main .GiCamera-content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        #getid-main.GiRtl .GiCamera-content,
        #getid-main .GiRtl .GiCamera-content {
          left: auto;
          right: 0;
        }
        
        #getid-main .GiCamera-video {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          image-orientation: none;
        }
        
        #getid-main .GiCamera-image {
          width: 100%;
        }
        
        #getid-main .GiCamera-overlay {
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          opacity: 0.7;
          z-index: 1;
          image-orientation: none;
        }
        
        #getid-main .GiCamera-overlayMask svg {
          width: 100%;
          height: 100%;
        }
        
        #getid-main .GiCamera-overlayContainer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-transform: translateZ(0);
                  transform: translateZ(0);
        }
        
        #getid-main .GiDocumentCamera-overlay-error {
          fill: var(--gi-error-color);
        }
        
        #getid-main .GiDocumentCamera-overlay-success {
          fill: var(--gi-success-color);
        }
        
        #getid-main .GiDocumentCamera-overlay-neutral {
          fill: var(--gi-secondary-color);
        }
        
        #getid-main .GiCamera-request {
          position: absolute;
          top: 5px;
          right: 5px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 40px;
          height: 40px;
          color: var(--gi-on-primary-color);
          background: var(--gi-secondary-color);
          border-radius: 4px;
          cursor: pointer;
          z-index: 100;
        }
        
        #getid-main.GiRtl .GiCamera-request,
        #getid-main .GiRtl .GiCamera-request {
          left: 5px;
          right: auto;
        }
        
        #getid-main .GiCamera-request:active {
          border: none;
          outline: none;
        }
        
        #getid-main .GiCamera {
          position: relative;
          line-height: 0;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
        }
        
        #getid-main .GiCamera-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          -webkit-backdrop-filter: blur(20px);
                  backdrop-filter: blur(20px);
        }
        
        #getid-main .GiLivenessCamera {
          max-height: 100vw;
        }
        
        #getid-main .GiSignature-text {
          color: var(--gi-secondary-text-color);
        }
        
        #getid-main .GiCameraStep-retake {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height:
            calc(
              var(--gi-inner-height-desktop) - var(--gi-inner-height-header) -
              var(--gi-inner-height-footer) - 2px
            );
          padding: 0 32px;
          overflow: auto;
          -webkit-animation: appearance ease-in 0.3s;
                  animation: appearance ease-in 0.3s;
          gap: 16px;
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiCameraStep-retake {
            height:
              calc(
                var(--gi-inner-height-mobile) - var(--gi-inner-height-header) -
                var(--gi-inner-height-footer)
              );
          }
        }
        
        #getid-main .GiImage-overlayText {
          display: block;
          margin-top: 16px;
          padding: 12px 16px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiCommand-container {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          z-index: 2;
        }
        
        #getid-main .GiCommand-maskContainer {
          position: absolute;
          top: 0;
          bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          height: 100%;
          margin: auto;
        }
        
        #getid-main .GiOverlayBorder {
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          border: solid 3px var(--gi-success-color);
          border-radius: 22px;
          -webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
                  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
          justify-items: center;
          aspect-ratio: 259/152;
        }
        
        #getid-main .GiCommand-container__documentPhoto {
          top: 0;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          margin: auto;
        }
        
        #getid-main .GiCommand-container__documentPhoto .GiCommand {
          border-radius: var(--gi-camera-border-radius);
        }
        
        #getid-main .GiCommand {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
              -ms-flex-direction: row;
                  flex-direction: row;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 100%;
          min-height: 80px;
          padding: 12px;
          overflow: hidden;
          text-align: left;
          color: var(--gi-camera-overlay-text-color);
          background: var(--gi-camera-overlay-background-color);
          -webkit-backdrop-filter: blur(20px);
                  backdrop-filter: blur(20px);
          gap: 16px;
        }
        
        #getid-main.GiRtl .GiCommand,
        #getid-main .GiRtl .GiCommand {
          text-align: right;
        }
        
        #getid-main .GiCommand-taskIcon {
          width: 56px;
          height: 56px;
          background-color: var(--gi-camera-overlay-text-color);
          -webkit-mask-size: 56px 56px;
                  mask-size: 56px 56px;
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-smile {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMy4wMjQ1IDE3LjAzNzlMMzYuMzA2OCAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjIuNzUxIDE3LjAzNzlMMTkuNDY4OCAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjYuNzcxNiAyNy40NDcxTDI4LjU1MTIgMjYuMTk0OUMyOC44MTE1IDI2LjAxMTcgMjguODgwOCAyNS42NDIxIDI4LjcyMzcgMjUuMzU2NUMyNy45NDA3IDIzLjkzMzcgMjcuNjQ1OCAyMi41NjA1IDI3LjcxNjQgMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjE0OTUgMzAuNzA1NkMyOS4yNDU3IDMxLjU1OTQgMjYuOTkwOSAzMS41MzYzIDIzLjc5MzUgMzAuNjQwM0MyMy4wMzI5IDMwLjQyNzIgMjIuNCAzMS4wODI0IDIyLjg1NzQgMzEuNzI2M0MyMy42OTY4IDMyLjkwNzYgMjUuMzI3MiAzNC4zIDI4LjM1IDM0LjNDMzAuOTA4NCAzNC4zIDMyLjM2MDIgMzIuOTcyMSAzMy4xNDEgMzEuODA5N0MzMy41ODk4IDMxLjE0MTYgMzIuOTIxNSAzMC40Nzg1IDMyLjE0OTUgMzAuNzA1NloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzQuMzM2NyAyMy45ODQyQzM1LjA0NiAyMy45ODQyIDM1LjYyMSAyMy40MDkyIDM1LjYyMSAyMi42OTk5QzM1LjYyMSAyMS45OTA2IDM1LjA0NiAyMS40MTU2IDM0LjMzNjcgMjEuNDE1NkMzMy42Mjc0IDIxLjQxNTYgMzMuMDUyNCAyMS45OTA2IDMzLjA1MjQgMjIuNjk5OUMzMy4wNTI0IDIzLjQwOTIgMzMuNjI3NCAyMy45ODQyIDM0LjMzNjcgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjEuMzEzMyAyMy45ODQyQzIyLjAyMjYgMjMuOTg0MiAyMi41OTc2IDIzLjQwOTIgMjIuNTk3NiAyMi42OTk5QzIyLjU5NzYgMjEuOTkwNiAyMi4wMjI2IDIxLjQxNTYgMjEuMzEzMyAyMS40MTU2QzIwLjYwNDEgMjEuNDE1NiAyMC4wMjkxIDIxLjk5MDYgMjAuMDI5MSAyMi42OTk5QzIwLjAyOTEgMjMuNDA5MiAyMC42MDQxIDIzLjk4NDIgMjEuMzEzMyAyMy45ODQyWiIKICAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik00MS4xMDg5IDE3LjQzNzJWMTguMTAzMU0xNy42Mzk3IDExLjUyNjFDMTQuNTI2IDExLjUyNjEgMTQuNTI3NCAxNC42OTA3IDE0LjU1NzYgMTUuNjEwOVYxOC4xMDMxTTQxLjEwODkgMjUuMjQwN1YyNi4yNTYzQzQxLjEwODkgMzMuMjQ0OSAzNS4xNjUxIDM4LjkxMDIgMjcuODMzMiAzOC45MTAyQzIwLjUwMTMgMzguOTEwMiAxNC41NTc2IDMzLjI0NDkgMTQuNTU3NiAyNi4yNTYzVjI1LjI0MDdNNDEuMTA4OSAyNS4yNDA3QzQxLjEwODkgMjUuMjQwNyA0My45MDk1IDI0LjcyOTMgNDMuOTA5NSAyMS42NzE5QzQzLjkwOTUgMTguOTM5NyA0MS4xMDg5IDE4LjEwMzEgNDEuMTA4OSAxOC4xMDMxTTQxLjEwODkgMjUuMjQwN1YxOC4xMDMxTTE0LjU1NzYgMTguMTAzMVYyNS4yNDA3TTE0LjU1NzYgMTguMTAzMUMxNC41NTc2IDE4LjEwMzEgMTEuNjQ3NSAxOC40MjgzIDExLjY0NzUgMjEuNjcxOUMxMS42NDc1IDI0Ljk3NDggMTQuNTU3NiAyNS4yNDA3IDE0LjU1NzYgMjUuMjQwNyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM2LjMyMjYgNC41NjkzM1YzLjgxMzJDNDEuNDU5NCAzLjgxMzIgNDEuODk5IDYuNjY5NzEgNDEuOTg2OCA4LjA5Nzk3VjE3Ljg3NzZDMzcuNTc2NCAxNy44Nzc2IDM2LjM3MyAxNC45NzA3IDM2LjMyMjYgMTMuNTE3MlY5LjQ4NDcyTTM2LjMyMjYgNC41NjkzM1Y5LjQ4NDcyTTM2LjMyMjYgNC41NjkzM0MzMS4xOTQyIDIuMjI1MjQgMTkuODIzNSAtMC41ODU0NTEgMTUuMzQ1NSA3LjMxMTdDMTQuNzI1IDguNTI3NDYgMTUuMTU1OCA4Ljc4MjYxIDE1LjE1NTggOC43ODI2MU0zNi4zMjI2IDkuNDg0NzJDMzQuOTIyMiAxMC45NTUgMzEuMTk4NSAxMy45MjA4IDI3LjUwNTYgMTQuMDIxNkMyMi44ODk1IDE0LjE0NzcgMTkuODU2MSAxMS40NzU5IDE2LjkwMTggMTEuNTI2M0MxNC41Mzg0IDExLjU2NjcgMTMuOTY1MSAxMi4yODI1IDEzLjk3MzkgMTIuNjM1M0MxMy42ODM3IDExLjU3MzIgMTMuNjk3IDkuNzY1MTMgMTUuMTU1OCA4Ljc4MjYxTTE1LjE1NTggOC43ODI2MUMxNS43NzQzIDguMzY2MTEgMTYuNjUyNiA4LjA5Nzk3IDE3Ljg3NzcgOC4wOTc5N0MyMy4wMjE0IDguMDk3OTcgMjIuMTc3MyA5LjgzNzU4IDI2LjI2NTkgNi45ODk0IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICBzdHJva2UtbGluZWpvaW49InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMxLjg3NDcgNDMuMTYwOEMzMS4zOTQzIDQ0LjczMjQgMjkuODg5OSA0NS41NTE0IDI4LjIyMTggNDUuNTM5MkMyNi41MzcgNDUuNTI2OSAyNC45NDM4IDQ0LjY2MzggMjQuMzc4NCA0My4xNDA4VjM4LjQ5OTJDMjUuNjg0MSAzOC44MDQ5IDI2LjgyNDggMzguOTYzNSAyOC4wMDQ5IDM4Ljk2MzVDMjkuMjA3NCAzOC45NjM2IDMwLjQyNTYgMzguNzk5MiAzMS44NzQ3IDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMS4yMTUgNDQuOTMwM0MxMy4wODMgNDMuODQ3IDE2LjgzNzggNDMuMDQ2OCAyMy4yMDM4IDQzLjAwOUMyNC4xMTUyIDQ0Ljk5NzEgMjYuMjI4NSA0NS45NzE4IDI4LjIxMTYgNDUuOTg2M0MzMC4xODExIDQ2LjAwMDcgMzIuMjQ5NCA0NS4wNjU3IDMzLjA3NTcgNDMuMDA5MUMzNi4yNyA0My4wMjc3IDM4LjgxOTEgNDMuMjI1MSA0MC44MDkzIDQzLjU1M0M0Mi45MTE1IDQzLjg5OTQgNDQuMzQ3MiA0NC4zODQ3IDQ1LjI1NjcgNDQuOTI2MkM0Ni4xNTkxIDQ1LjQ2MzUgNDYuNDY0NyA0Ni4wMDI2IDQ2LjUxMTIgNDYuNDYyN0M0Ni41NjA2IDQ2Ljk1MTUgNDYuMzQyOSA0Ny41NzQ3IDQ1LjcyMzUgNDguMzEyM0M0NC40ODMzIDQ5Ljc4OTIgNDEuOTM5OSA1MS4zNDk5IDM4LjcyODYgNTIuNTQzOUMzNS41MzkzIDUzLjcyOTcgMzEuNzg4OCA1NC41MTcyIDI4LjIxNjcgNTQuNTE3MkMyNC4yNjU5IDU0LjUxNzIgMjAuMzc3OSA1My43MjcgMTcuMTg0IDUyLjU0MzZDMTMuOTYzNSA1MS4zNTA0IDExLjU0OTcgNDkuNzk1NCAxMC40NDQ5IDQ4LjMzOTNDOS44OTg1MSA0Ny42MTkxIDkuNzM0MDEgNDcuMDA4NSA5LjgyMjcgNDYuNTE2NEM5LjkwOTgxIDQ2LjAzMzEgMTAuMjc1OSA0NS40NzQ5IDExLjIxNSA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+Cjwvc3ZnPgo=);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMy4wMjQ1IDE3LjAzNzlMMzYuMzA2OCAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjIuNzUxIDE3LjAzNzlMMTkuNDY4OCAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjYuNzcxNiAyNy40NDcxTDI4LjU1MTIgMjYuMTk0OUMyOC44MTE1IDI2LjAxMTcgMjguODgwOCAyNS42NDIxIDI4LjcyMzcgMjUuMzU2NUMyNy45NDA3IDIzLjkzMzcgMjcuNjQ1OCAyMi41NjA1IDI3LjcxNjQgMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjE0OTUgMzAuNzA1NkMyOS4yNDU3IDMxLjU1OTQgMjYuOTkwOSAzMS41MzYzIDIzLjc5MzUgMzAuNjQwM0MyMy4wMzI5IDMwLjQyNzIgMjIuNCAzMS4wODI0IDIyLjg1NzQgMzEuNzI2M0MyMy42OTY4IDMyLjkwNzYgMjUuMzI3MiAzNC4zIDI4LjM1IDM0LjNDMzAuOTA4NCAzNC4zIDMyLjM2MDIgMzIuOTcyMSAzMy4xNDEgMzEuODA5N0MzMy41ODk4IDMxLjE0MTYgMzIuOTIxNSAzMC40Nzg1IDMyLjE0OTUgMzAuNzA1NloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzQuMzM2NyAyMy45ODQyQzM1LjA0NiAyMy45ODQyIDM1LjYyMSAyMy40MDkyIDM1LjYyMSAyMi42OTk5QzM1LjYyMSAyMS45OTA2IDM1LjA0NiAyMS40MTU2IDM0LjMzNjcgMjEuNDE1NkMzMy42Mjc0IDIxLjQxNTYgMzMuMDUyNCAyMS45OTA2IDMzLjA1MjQgMjIuNjk5OUMzMy4wNTI0IDIzLjQwOTIgMzMuNjI3NCAyMy45ODQyIDM0LjMzNjcgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjEuMzEzMyAyMy45ODQyQzIyLjAyMjYgMjMuOTg0MiAyMi41OTc2IDIzLjQwOTIgMjIuNTk3NiAyMi42OTk5QzIyLjU5NzYgMjEuOTkwNiAyMi4wMjI2IDIxLjQxNTYgMjEuMzEzMyAyMS40MTU2QzIwLjYwNDEgMjEuNDE1NiAyMC4wMjkxIDIxLjk5MDYgMjAuMDI5MSAyMi42OTk5QzIwLjAyOTEgMjMuNDA5MiAyMC42MDQxIDIzLjk4NDIgMjEuMzEzMyAyMy45ODQyWiIKICAgIGZpbGw9ImN1cnJlbnRDb2xvciIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik00MS4xMDg5IDE3LjQzNzJWMTguMTAzMU0xNy42Mzk3IDExLjUyNjFDMTQuNTI2IDExLjUyNjEgMTQuNTI3NCAxNC42OTA3IDE0LjU1NzYgMTUuNjEwOVYxOC4xMDMxTTQxLjEwODkgMjUuMjQwN1YyNi4yNTYzQzQxLjEwODkgMzMuMjQ0OSAzNS4xNjUxIDM4LjkxMDIgMjcuODMzMiAzOC45MTAyQzIwLjUwMTMgMzguOTEwMiAxNC41NTc2IDMzLjI0NDkgMTQuNTU3NiAyNi4yNTYzVjI1LjI0MDdNNDEuMTA4OSAyNS4yNDA3QzQxLjEwODkgMjUuMjQwNyA0My45MDk1IDI0LjcyOTMgNDMuOTA5NSAyMS42NzE5QzQzLjkwOTUgMTguOTM5NyA0MS4xMDg5IDE4LjEwMzEgNDEuMTA4OSAxOC4xMDMxTTQxLjEwODkgMjUuMjQwN1YxOC4xMDMxTTE0LjU1NzYgMTguMTAzMVYyNS4yNDA3TTE0LjU1NzYgMTguMTAzMUMxNC41NTc2IDE4LjEwMzEgMTEuNjQ3NSAxOC40MjgzIDExLjY0NzUgMjEuNjcxOUMxMS42NDc1IDI0Ljk3NDggMTQuNTU3NiAyNS4yNDA3IDE0LjU1NzYgMjUuMjQwNyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM2LjMyMjYgNC41NjkzM1YzLjgxMzJDNDEuNDU5NCAzLjgxMzIgNDEuODk5IDYuNjY5NzEgNDEuOTg2OCA4LjA5Nzk3VjE3Ljg3NzZDMzcuNTc2NCAxNy44Nzc2IDM2LjM3MyAxNC45NzA3IDM2LjMyMjYgMTMuNTE3MlY5LjQ4NDcyTTM2LjMyMjYgNC41NjkzM1Y5LjQ4NDcyTTM2LjMyMjYgNC41NjkzM0MzMS4xOTQyIDIuMjI1MjQgMTkuODIzNSAtMC41ODU0NTEgMTUuMzQ1NSA3LjMxMTdDMTQuNzI1IDguNTI3NDYgMTUuMTU1OCA4Ljc4MjYxIDE1LjE1NTggOC43ODI2MU0zNi4zMjI2IDkuNDg0NzJDMzQuOTIyMiAxMC45NTUgMzEuMTk4NSAxMy45MjA4IDI3LjUwNTYgMTQuMDIxNkMyMi44ODk1IDE0LjE0NzcgMTkuODU2MSAxMS40NzU5IDE2LjkwMTggMTEuNTI2M0MxNC41Mzg0IDExLjU2NjcgMTMuOTY1MSAxMi4yODI1IDEzLjk3MzkgMTIuNjM1M0MxMy42ODM3IDExLjU3MzIgMTMuNjk3IDkuNzY1MTMgMTUuMTU1OCA4Ljc4MjYxTTE1LjE1NTggOC43ODI2MUMxNS43NzQzIDguMzY2MTEgMTYuNjUyNiA4LjA5Nzk3IDE3Ljg3NzcgOC4wOTc5N0MyMy4wMjE0IDguMDk3OTcgMjIuMTc3MyA5LjgzNzU4IDI2LjI2NTkgNi45ODk0IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICBzdHJva2UtbGluZWpvaW49InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMxLjg3NDcgNDMuMTYwOEMzMS4zOTQzIDQ0LjczMjQgMjkuODg5OSA0NS41NTE0IDI4LjIyMTggNDUuNTM5MkMyNi41MzcgNDUuNTI2OSAyNC45NDM4IDQ0LjY2MzggMjQuMzc4NCA0My4xNDA4VjM4LjQ5OTJDMjUuNjg0MSAzOC44MDQ5IDI2LjgyNDggMzguOTYzNSAyOC4wMDQ5IDM4Ljk2MzVDMjkuMjA3NCAzOC45NjM2IDMwLjQyNTYgMzguNzk5MiAzMS44NzQ3IDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMS4yMTUgNDQuOTMwM0MxMy4wODMgNDMuODQ3IDE2LjgzNzggNDMuMDQ2OCAyMy4yMDM4IDQzLjAwOUMyNC4xMTUyIDQ0Ljk5NzEgMjYuMjI4NSA0NS45NzE4IDI4LjIxMTYgNDUuOTg2M0MzMC4xODExIDQ2LjAwMDcgMzIuMjQ5NCA0NS4wNjU3IDMzLjA3NTcgNDMuMDA5MUMzNi4yNyA0My4wMjc3IDM4LjgxOTEgNDMuMjI1MSA0MC44MDkzIDQzLjU1M0M0Mi45MTE1IDQzLjg5OTQgNDQuMzQ3MiA0NC4zODQ3IDQ1LjI1NjcgNDQuOTI2MkM0Ni4xNTkxIDQ1LjQ2MzUgNDYuNDY0NyA0Ni4wMDI2IDQ2LjUxMTIgNDYuNDYyN0M0Ni41NjA2IDQ2Ljk1MTUgNDYuMzQyOSA0Ny41NzQ3IDQ1LjcyMzUgNDguMzEyM0M0NC40ODMzIDQ5Ljc4OTIgNDEuOTM5OSA1MS4zNDk5IDM4LjcyODYgNTIuNTQzOUMzNS41MzkzIDUzLjcyOTcgMzEuNzg4OCA1NC41MTcyIDI4LjIxNjcgNTQuNTE3MkMyNC4yNjU5IDU0LjUxNzIgMjAuMzc3OSA1My43MjcgMTcuMTg0IDUyLjU0MzZDMTMuOTYzNSA1MS4zNTA0IDExLjU0OTcgNDkuNzk1NCAxMC40NDQ5IDQ4LjMzOTNDOS44OTg1MSA0Ny42MTkxIDkuNzM0MDEgNDcuMDA4NSA5LjgyMjcgNDYuNTE2NEM5LjkwOTgxIDQ2LjAzMzEgMTAuMjc1OSA0NS40NzQ5IDExLjIxNSA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+Cjwvc3ZnPgo=);
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-turnLeft {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMS4zMjY3IDE3LjAzNzlMMzQuNjA4OSAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjMuODUzMyAxNy4wMzc5TDIwLjU3MTEgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3Ljg3MzIgMjcuNDQ3MUwyNS45OTg2IDI2LjE5NDlDMjUuNzI0NSAyNi4wMTE3IDI1LjY1MTUgMjUuNjQyMSAyNS44MTY5IDI1LjM1NjVDMjYuNjQxNyAyMy45MzM3IDI2Ljk1MjMgMjIuNTYwNSAyNi44NzggMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI2LjE4ODUgMzIuNzQwN0MyNi4xODg1IDMyLjc0MDcgMjcuNTI2OCAzMy4zMTM3IDI5LjI2MDggMzMuMzEzN0MzMC45OTQ3IDMzLjMxMzcgMzIuMzMzIDMyLjc0MDcgMzIuMzMzIDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMi42MzgxIDIzLjk4NDJDMzMuMzQ3NCAyMy45ODQyIDMzLjkyMjQgMjMuNDA5MiAzMy45MjI0IDIyLjY5OTlDMzMuOTIyNCAyMS45OTA2IDMzLjM0NzQgMjEuNDE1NiAzMi42MzgxIDIxLjQxNTZDMzEuOTI4OCAyMS40MTU2IDMxLjM1MzggMjEuOTkwNiAzMS4zNTM4IDIyLjY5OTlDMzEuMzUzOCAyMy40MDkyIDMxLjkyODggMjMuOTg0MiAzMi42MzgxIDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIyLjQxNDkgMjMuOTg0MkMyMy4xMjQyIDIzLjk4NDIgMjMuNjk5MiAyMy40MDkyIDIzLjY5OTIgMjIuNjk5OUMyMy42OTkyIDIxLjk5MDYgMjMuMTI0MiAyMS40MTU2IDIyLjQxNDkgMjEuNDE1NkMyMS43MDU2IDIxLjQxNTYgMjEuMTMwNiAyMS45OTA2IDIxLjEzMDYgMjIuNjk5OUMyMS4xMzA2IDIzLjQwOTIgMjEuNzA1NiAyMy45ODQyIDIyLjQxNDkgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDcuMTEwNSAxNy40MzcyVjE4LjEwMzFNMjMuNjQxMyAxMS41MjYxQzIwLjUyNzYgMTEuNTI2MSAyMC41MjkgMTQuNjkwNyAyMC41NTkyIDE1LjYxMDlWMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdWMjYuMjU2M0M0Ny4xMTA1IDMzLjI0NDkgNDEuMTY2NyAzOC45MTAyIDMzLjgzNDggMzguOTEwMkMyNi41MDI5IDM4LjkxMDIgMjAuNTU5MiAzMy4yNDQ5IDIwLjU1OTIgMjYuMjU2M1YyNS4yNDA3TTQ3LjExMDUgMjUuMjQwN0M0Ny4xMTA1IDI1LjI0MDcgNDkuOTExIDI0LjcyOTMgNDkuOTExIDIxLjY3MTlDNDkuOTExIDE4LjkzOTcgNDcuMTEwNSAxOC4xMDMxIDQ3LjExMDUgMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdDNDcuMTEwNSAyNS4yNDA3IDQ1LjA3NSAyNC42OTE3IDQ1LjA3NSAyMS42NzE5QzQ1LjA3NSAxOC42NTIxIDQ3LjExMDUgMTguMTAzMSA0Ny4xMTA1IDE4LjEwMzFNMjAuNTU5MiAxOC4xMDMxVjI1LjI0MDdNMjAuNTU5MiAxOC4xMDMxQzIwLjU1OTIgMTguMTAzMSAyMC41NTkxIDE4LjQyODMgMjAuNTU5MSAyMS42NzE5QzIwLjU1OTEgMjQuOTc0OCAyMC41NTkyIDI1LjI0MDcgMjAuNTU5MiAyNS4yNDA3IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDIuMzI0MiA0LjU2OTMzVjMuODEzMkM0Ny40NjA5IDMuODEzMiA0Ny45MDA2IDYuNjY5NzEgNDcuOTg4NCA4LjA5Nzk3VjE3Ljg3NzZDNDMuNTc4IDE3Ljg3NzYgNDIuMzc0NiAxNC45NzA3IDQyLjMyNDIgMTMuNTE3MlY5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM1Y5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM0MzNy4xOTU4IDIuMjI1MjQgMjUuODI1MSAtMC41ODU0NTEgMjEuMzQ3MSA3LjMxMTdDMjAuNzI2NiA4LjUyNzQ2IDIxLjE1NzQgOC43ODI2MSAyMS4xNTc0IDguNzgyNjFNNDIuMzI0MiA5LjQ4NDcyQzQwLjkyMzggMTAuOTU1IDM3LjIwMDEgMTMuOTIwOCAzMy41MDcyIDE0LjAyMTZDMjguODkxMSAxNC4xNDc3IDI1Ljg1NzcgMTEuNDc1OSAyMi45MDM0IDExLjUyNjNDMjAuNTQgMTEuNTY2NyAxOS45NjY3IDEyLjI4MjUgMTkuOTc1NSAxMi42MzUzQzE5LjY4NTIgMTEuNTczMiAxOS42OTg2IDkuNzY1MTMgMjEuMTU3NCA4Ljc4MjYxTTIxLjE1NzQgOC43ODI2MUMyMS43NzU5IDguMzY2MTEgMjIuNjU0MiA4LjA5Nzk3IDIzLjg3OTMgOC4wOTc5N0MyOS4wMjMgOC4wOTc5NyAyOC4xNzg5IDkuODM3NTggMzIuMjY3NSA2Ljk4OTQiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzcuODc2MyA0My4xNjA4QzM3LjM5NTkgNDQuNzMyNCAzNS44OTE1IDQ1LjU1MTQgMzQuMjIzNCA0NS41MzkyQzMyLjUzODYgNDUuNTI2OSAzMC45NDU0IDQ0LjY2MzggMzAuMzggNDMuMTQwOFYzOC40OTkyQzMxLjY4NTYgMzguODA0OSAzMi44MjY0IDM4Ljk2MzUgMzQuMDA2NSAzOC45NjM1QzM1LjIwOSAzOC45NjM2IDM2LjQyNzIgMzguNzk5MiAzNy44NzYzIDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy4yMTY2IDQ0LjkzMDNDMTkuMDg0NiA0My44NDcgMjIuODM5NCA0My4wNDY4IDI5LjIwNTQgNDMuMDA5QzMwLjExNjggNDQuOTk3MSAzMi4yMzAxIDQ1Ljk3MTggMzQuMjEzMiA0NS45ODYzQzM2LjE4MjcgNDYuMDAwNyAzOC4yNTEgNDUuMDY1NyAzOS4wNzczIDQzLjAwOTFDNDIuMjcxNSA0My4wMjc3IDQ0LjgyMDcgNDMuMjI1MSA0Ni44MTA5IDQzLjU1M0M0OC45MTMxIDQzLjg5OTQgNTAuMzQ4OCA0NC4zODQ3IDUxLjI1ODMgNDQuOTI2MkM1Mi4xNjA3IDQ1LjQ2MzUgNTIuNDY2MyA0Ni4wMDI2IDUyLjUxMjcgNDYuNDYyN0M1Mi41NjIyIDQ2Ljk1MTUgNTIuMzQ0NSA0Ny41NzQ3IDUxLjcyNTEgNDguMzEyM0M1MC40ODQ5IDQ5Ljc4OTIgNDcuOTQxNSA1MS4zNDk5IDQ0LjczMDEgNTIuNTQzOUM0MS41NDA5IDUzLjcyOTcgMzcuNzkwNCA1NC41MTcyIDM0LjIxODMgNTQuNTE3MkMzMC4yNjc0IDU0LjUxNzIgMjYuMzc5NCA1My43MjcgMjMuMTg1NiA1Mi41NDM2QzE5Ljk2NTEgNTEuMzUwNCAxNy41NTEzIDQ5Ljc5NTQgMTYuNDQ2NSA0OC4zMzkzQzE1LjkwMDEgNDcuNjE5MSAxNS43MzU2IDQ3LjAwODUgMTUuODI0MyA0Ni41MTY0QzE1LjkxMTQgNDYuMDMzMSAxNi4yNzc1IDQ1LjQ3NDkgMTcuMjE2NiA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8bGluZQogICAgeDE9IjEzLjA5MjkiCiAgICB5MT0iMjkuODkxNCIKICAgIHgyPSI0LjUwMTYiCiAgICB5Mj0iMjkuODkxNCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTYuODQ3NTMgMjUuNTA2OUwyLjgwMDA0IDI5LjU1NDRMNi44NDc1MyAzMy42MDE5IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KPC9zdmc+Cg==);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMS4zMjY3IDE3LjAzNzlMMzQuNjA4OSAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjMuODUzMyAxNy4wMzc5TDIwLjU3MTEgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3Ljg3MzIgMjcuNDQ3MUwyNS45OTg2IDI2LjE5NDlDMjUuNzI0NSAyNi4wMTE3IDI1LjY1MTUgMjUuNjQyMSAyNS44MTY5IDI1LjM1NjVDMjYuNjQxNyAyMy45MzM3IDI2Ljk1MjMgMjIuNTYwNSAyNi44NzggMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI2LjE4ODUgMzIuNzQwN0MyNi4xODg1IDMyLjc0MDcgMjcuNTI2OCAzMy4zMTM3IDI5LjI2MDggMzMuMzEzN0MzMC45OTQ3IDMzLjMxMzcgMzIuMzMzIDMyLjc0MDcgMzIuMzMzIDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMi42MzgxIDIzLjk4NDJDMzMuMzQ3NCAyMy45ODQyIDMzLjkyMjQgMjMuNDA5MiAzMy45MjI0IDIyLjY5OTlDMzMuOTIyNCAyMS45OTA2IDMzLjM0NzQgMjEuNDE1NiAzMi42MzgxIDIxLjQxNTZDMzEuOTI4OCAyMS40MTU2IDMxLjM1MzggMjEuOTkwNiAzMS4zNTM4IDIyLjY5OTlDMzEuMzUzOCAyMy40MDkyIDMxLjkyODggMjMuOTg0MiAzMi42MzgxIDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIyLjQxNDkgMjMuOTg0MkMyMy4xMjQyIDIzLjk4NDIgMjMuNjk5MiAyMy40MDkyIDIzLjY5OTIgMjIuNjk5OUMyMy42OTkyIDIxLjk5MDYgMjMuMTI0MiAyMS40MTU2IDIyLjQxNDkgMjEuNDE1NkMyMS43MDU2IDIxLjQxNTYgMjEuMTMwNiAyMS45OTA2IDIxLjEzMDYgMjIuNjk5OUMyMS4xMzA2IDIzLjQwOTIgMjEuNzA1NiAyMy45ODQyIDIyLjQxNDkgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDcuMTEwNSAxNy40MzcyVjE4LjEwMzFNMjMuNjQxMyAxMS41MjYxQzIwLjUyNzYgMTEuNTI2MSAyMC41MjkgMTQuNjkwNyAyMC41NTkyIDE1LjYxMDlWMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdWMjYuMjU2M0M0Ny4xMTA1IDMzLjI0NDkgNDEuMTY2NyAzOC45MTAyIDMzLjgzNDggMzguOTEwMkMyNi41MDI5IDM4LjkxMDIgMjAuNTU5MiAzMy4yNDQ5IDIwLjU1OTIgMjYuMjU2M1YyNS4yNDA3TTQ3LjExMDUgMjUuMjQwN0M0Ny4xMTA1IDI1LjI0MDcgNDkuOTExIDI0LjcyOTMgNDkuOTExIDIxLjY3MTlDNDkuOTExIDE4LjkzOTcgNDcuMTEwNSAxOC4xMDMxIDQ3LjExMDUgMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdDNDcuMTEwNSAyNS4yNDA3IDQ1LjA3NSAyNC42OTE3IDQ1LjA3NSAyMS42NzE5QzQ1LjA3NSAxOC42NTIxIDQ3LjExMDUgMTguMTAzMSA0Ny4xMTA1IDE4LjEwMzFNMjAuNTU5MiAxOC4xMDMxVjI1LjI0MDdNMjAuNTU5MiAxOC4xMDMxQzIwLjU1OTIgMTguMTAzMSAyMC41NTkxIDE4LjQyODMgMjAuNTU5MSAyMS42NzE5QzIwLjU1OTEgMjQuOTc0OCAyMC41NTkyIDI1LjI0MDcgMjAuNTU5MiAyNS4yNDA3IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDIuMzI0MiA0LjU2OTMzVjMuODEzMkM0Ny40NjA5IDMuODEzMiA0Ny45MDA2IDYuNjY5NzEgNDcuOTg4NCA4LjA5Nzk3VjE3Ljg3NzZDNDMuNTc4IDE3Ljg3NzYgNDIuMzc0NiAxNC45NzA3IDQyLjMyNDIgMTMuNTE3MlY5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM1Y5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM0MzNy4xOTU4IDIuMjI1MjQgMjUuODI1MSAtMC41ODU0NTEgMjEuMzQ3MSA3LjMxMTdDMjAuNzI2NiA4LjUyNzQ2IDIxLjE1NzQgOC43ODI2MSAyMS4xNTc0IDguNzgyNjFNNDIuMzI0MiA5LjQ4NDcyQzQwLjkyMzggMTAuOTU1IDM3LjIwMDEgMTMuOTIwOCAzMy41MDcyIDE0LjAyMTZDMjguODkxMSAxNC4xNDc3IDI1Ljg1NzcgMTEuNDc1OSAyMi45MDM0IDExLjUyNjNDMjAuNTQgMTEuNTY2NyAxOS45NjY3IDEyLjI4MjUgMTkuOTc1NSAxMi42MzUzQzE5LjY4NTIgMTEuNTczMiAxOS42OTg2IDkuNzY1MTMgMjEuMTU3NCA4Ljc4MjYxTTIxLjE1NzQgOC43ODI2MUMyMS43NzU5IDguMzY2MTEgMjIuNjU0MiA4LjA5Nzk3IDIzLjg3OTMgOC4wOTc5N0MyOS4wMjMgOC4wOTc5NyAyOC4xNzg5IDkuODM3NTggMzIuMjY3NSA2Ljk4OTQiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzcuODc2MyA0My4xNjA4QzM3LjM5NTkgNDQuNzMyNCAzNS44OTE1IDQ1LjU1MTQgMzQuMjIzNCA0NS41MzkyQzMyLjUzODYgNDUuNTI2OSAzMC45NDU0IDQ0LjY2MzggMzAuMzggNDMuMTQwOFYzOC40OTkyQzMxLjY4NTYgMzguODA0OSAzMi44MjY0IDM4Ljk2MzUgMzQuMDA2NSAzOC45NjM1QzM1LjIwOSAzOC45NjM2IDM2LjQyNzIgMzguNzk5MiAzNy44NzYzIDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy4yMTY2IDQ0LjkzMDNDMTkuMDg0NiA0My44NDcgMjIuODM5NCA0My4wNDY4IDI5LjIwNTQgNDMuMDA5QzMwLjExNjggNDQuOTk3MSAzMi4yMzAxIDQ1Ljk3MTggMzQuMjEzMiA0NS45ODYzQzM2LjE4MjcgNDYuMDAwNyAzOC4yNTEgNDUuMDY1NyAzOS4wNzczIDQzLjAwOTFDNDIuMjcxNSA0My4wMjc3IDQ0LjgyMDcgNDMuMjI1MSA0Ni44MTA5IDQzLjU1M0M0OC45MTMxIDQzLjg5OTQgNTAuMzQ4OCA0NC4zODQ3IDUxLjI1ODMgNDQuOTI2MkM1Mi4xNjA3IDQ1LjQ2MzUgNTIuNDY2MyA0Ni4wMDI2IDUyLjUxMjcgNDYuNDYyN0M1Mi41NjIyIDQ2Ljk1MTUgNTIuMzQ0NSA0Ny41NzQ3IDUxLjcyNTEgNDguMzEyM0M1MC40ODQ5IDQ5Ljc4OTIgNDcuOTQxNSA1MS4zNDk5IDQ0LjczMDEgNTIuNTQzOUM0MS41NDA5IDUzLjcyOTcgMzcuNzkwNCA1NC41MTcyIDM0LjIxODMgNTQuNTE3MkMzMC4yNjc0IDU0LjUxNzIgMjYuMzc5NCA1My43MjcgMjMuMTg1NiA1Mi41NDM2QzE5Ljk2NTEgNTEuMzUwNCAxNy41NTEzIDQ5Ljc5NTQgMTYuNDQ2NSA0OC4zMzkzQzE1LjkwMDEgNDcuNjE5MSAxNS43MzU2IDQ3LjAwODUgMTUuODI0MyA0Ni41MTY0QzE1LjkxMTQgNDYuMDMzMSAxNi4yNzc1IDQ1LjQ3NDkgMTcuMjE2NiA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8bGluZQogICAgeDE9IjEzLjA5MjkiCiAgICB5MT0iMjkuODkxNCIKICAgIHgyPSI0LjUwMTYiCiAgICB5Mj0iMjkuODkxNCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTYuODQ3NTMgMjUuNTA2OUwyLjgwMDA0IDI5LjU1NDRMNi44NDc1MyAzMy42MDE5IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KPC9zdmc+Cg==);
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-tiltLeft {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMS4zMjY3IDE3LjAzNzlMMzQuNjA4OSAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjMuODUzMyAxNy4wMzc5TDIwLjU3MTEgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3Ljg3MzIgMjcuNDQ3MUwyNS45OTg2IDI2LjE5NDlDMjUuNzI0NSAyNi4wMTE3IDI1LjY1MTUgMjUuNjQyMSAyNS44MTY5IDI1LjM1NjVDMjYuNjQxNyAyMy45MzM3IDI2Ljk1MjMgMjIuNTYwNSAyNi44NzggMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI2LjE4ODUgMzIuNzQwN0MyNi4xODg1IDMyLjc0MDcgMjcuNTI2OCAzMy4zMTM3IDI5LjI2MDggMzMuMzEzN0MzMC45OTQ3IDMzLjMxMzcgMzIuMzMzIDMyLjc0MDcgMzIuMzMzIDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMi42MzgxIDIzLjk4NDJDMzMuMzQ3NCAyMy45ODQyIDMzLjkyMjQgMjMuNDA5MiAzMy45MjI0IDIyLjY5OTlDMzMuOTIyNCAyMS45OTA2IDMzLjM0NzQgMjEuNDE1NiAzMi42MzgxIDIxLjQxNTZDMzEuOTI4OCAyMS40MTU2IDMxLjM1MzggMjEuOTkwNiAzMS4zNTM4IDIyLjY5OTlDMzEuMzUzOCAyMy40MDkyIDMxLjkyODggMjMuOTg0MiAzMi42MzgxIDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIyLjQxNDkgMjMuOTg0MkMyMy4xMjQyIDIzLjk4NDIgMjMuNjk5MiAyMy40MDkyIDIzLjY5OTIgMjIuNjk5OUMyMy42OTkyIDIxLjk5MDYgMjMuMTI0MiAyMS40MTU2IDIyLjQxNDkgMjEuNDE1NkMyMS43MDU2IDIxLjQxNTYgMjEuMTMwNiAyMS45OTA2IDIxLjEzMDYgMjIuNjk5OUMyMS4xMzA2IDIzLjQwOTIgMjEuNzA1NiAyMy45ODQyIDIyLjQxNDkgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDcuMTEwNSAxNy40MzcyVjE4LjEwMzFNMjMuNjQxMyAxMS41MjYxQzIwLjUyNzYgMTEuNTI2MSAyMC41MjkgMTQuNjkwNyAyMC41NTkyIDE1LjYxMDlWMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdWMjYuMjU2M0M0Ny4xMTA1IDMzLjI0NDkgNDEuMTY2NyAzOC45MTAyIDMzLjgzNDggMzguOTEwMkMyNi41MDI5IDM4LjkxMDIgMjAuNTU5MiAzMy4yNDQ5IDIwLjU1OTIgMjYuMjU2M1YyNS4yNDA3TTQ3LjExMDUgMjUuMjQwN0M0Ny4xMTA1IDI1LjI0MDcgNDkuOTExIDI0LjcyOTMgNDkuOTExIDIxLjY3MTlDNDkuOTExIDE4LjkzOTcgNDcuMTEwNSAxOC4xMDMxIDQ3LjExMDUgMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdDNDcuMTEwNSAyNS4yNDA3IDQ1LjA3NSAyNC42OTE3IDQ1LjA3NSAyMS42NzE5QzQ1LjA3NSAxOC42NTIxIDQ3LjExMDUgMTguMTAzMSA0Ny4xMTA1IDE4LjEwMzFNMjAuNTU5MiAxOC4xMDMxVjI1LjI0MDdNMjAuNTU5MiAxOC4xMDMxQzIwLjU1OTIgMTguMTAzMSAyMC41NTkxIDE4LjQyODMgMjAuNTU5MSAyMS42NzE5QzIwLjU1OTEgMjQuOTc0OCAyMC41NTkyIDI1LjI0MDcgMjAuNTU5MiAyNS4yNDA3IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDIuMzI0MiA0LjU2OTMzVjMuODEzMkM0Ny40NjA5IDMuODEzMiA0Ny45MDA2IDYuNjY5NzEgNDcuOTg4NCA4LjA5Nzk3VjE3Ljg3NzZDNDMuNTc4IDE3Ljg3NzYgNDIuMzc0NiAxNC45NzA3IDQyLjMyNDIgMTMuNTE3MlY5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM1Y5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM0MzNy4xOTU4IDIuMjI1MjQgMjUuODI1MSAtMC41ODU0NTEgMjEuMzQ3MSA3LjMxMTdDMjAuNzI2NiA4LjUyNzQ2IDIxLjE1NzQgOC43ODI2MSAyMS4xNTc0IDguNzgyNjFNNDIuMzI0MiA5LjQ4NDcyQzQwLjkyMzggMTAuOTU1IDM3LjIwMDEgMTMuOTIwOCAzMy41MDcyIDE0LjAyMTZDMjguODkxMSAxNC4xNDc3IDI1Ljg1NzcgMTEuNDc1OSAyMi45MDM0IDExLjUyNjNDMjAuNTQgMTEuNTY2NyAxOS45NjY3IDEyLjI4MjUgMTkuOTc1NSAxMi42MzUzQzE5LjY4NTIgMTEuNTczMiAxOS42OTg2IDkuNzY1MTMgMjEuMTU3NCA4Ljc4MjYxTTIxLjE1NzQgOC43ODI2MUMyMS43NzU5IDguMzY2MTEgMjIuNjU0MiA4LjA5Nzk3IDIzLjg3OTMgOC4wOTc5N0MyOS4wMjMgOC4wOTc5NyAyOC4xNzg5IDkuODM3NTggMzIuMjY3NSA2Ljk4OTQiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzcuODc2MyA0My4xNjA4QzM3LjM5NTkgNDQuNzMyNCAzNS44OTE1IDQ1LjU1MTQgMzQuMjIzNCA0NS41MzkyQzMyLjUzODYgNDUuNTI2OSAzMC45NDU0IDQ0LjY2MzggMzAuMzggNDMuMTQwOFYzOC40OTkyQzMxLjY4NTYgMzguODA0OSAzMi44MjY0IDM4Ljk2MzUgMzQuMDA2NSAzOC45NjM1QzM1LjIwOSAzOC45NjM2IDM2LjQyNzIgMzguNzk5MiAzNy44NzYzIDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy4yMTY2IDQ0LjkzMDNDMTkuMDg0NiA0My44NDcgMjIuODM5NCA0My4wNDY4IDI5LjIwNTQgNDMuMDA5QzMwLjExNjggNDQuOTk3MSAzMi4yMzAxIDQ1Ljk3MTggMzQuMjEzMiA0NS45ODYzQzM2LjE4MjcgNDYuMDAwNyAzOC4yNTEgNDUuMDY1NyAzOS4wNzczIDQzLjAwOTFDNDIuMjcxNSA0My4wMjc3IDQ0LjgyMDcgNDMuMjI1MSA0Ni44MTA5IDQzLjU1M0M0OC45MTMxIDQzLjg5OTQgNTAuMzQ4OCA0NC4zODQ3IDUxLjI1ODMgNDQuOTI2MkM1Mi4xNjA3IDQ1LjQ2MzUgNTIuNDY2MyA0Ni4wMDI2IDUyLjUxMjcgNDYuNDYyN0M1Mi41NjIyIDQ2Ljk1MTUgNTIuMzQ0NSA0Ny41NzQ3IDUxLjcyNTEgNDguMzEyM0M1MC40ODQ5IDQ5Ljc4OTIgNDcuOTQxNSA1MS4zNDk5IDQ0LjczMDEgNTIuNTQzOUM0MS41NDA5IDUzLjcyOTcgMzcuNzkwNCA1NC41MTcyIDM0LjIxODMgNTQuNTE3MkMzMC4yNjc0IDU0LjUxNzIgMjYuMzc5NCA1My43MjcgMjMuMTg1NiA1Mi41NDM2QzE5Ljk2NTEgNTEuMzUwNCAxNy41NTEzIDQ5Ljc5NTQgMTYuNDQ2NSA0OC4zMzkzQzE1LjkwMDEgNDcuNjE5MSAxNS43MzU2IDQ3LjAwODUgMTUuODI0MyA0Ni41MTY0QzE1LjkxMTQgNDYuMDMzMSAxNi4yNzc1IDQ1LjQ3NDkgMTcuMjE2NiA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8bGluZQogICAgeDE9IjEzLjA5MjkiCiAgICB5MT0iMjkuODkxNCIKICAgIHgyPSI0LjUwMTYiCiAgICB5Mj0iMjkuODkxNCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTYuODQ3NTMgMjUuNTA2OUwyLjgwMDA0IDI5LjU1NDRMNi44NDc1MyAzMy42MDE5IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KPC9zdmc+Cg==);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMS4zMjY3IDE3LjAzNzlMMzQuNjA4OSAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMjMuODUzMyAxNy4wMzc5TDIwLjU3MTEgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3Ljg3MzIgMjcuNDQ3MUwyNS45OTg2IDI2LjE5NDlDMjUuNzI0NSAyNi4wMTE3IDI1LjY1MTUgMjUuNjQyMSAyNS44MTY5IDI1LjM1NjVDMjYuNjQxNyAyMy45MzM3IDI2Ljk1MjMgMjIuNTYwNSAyNi44NzggMjAuNDI2NSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI2LjE4ODUgMzIuNzQwN0MyNi4xODg1IDMyLjc0MDcgMjcuNTI2OCAzMy4zMTM3IDI5LjI2MDggMzMuMzEzN0MzMC45OTQ3IDMzLjMxMzcgMzIuMzMzIDMyLjc0MDcgMzIuMzMzIDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMi42MzgxIDIzLjk4NDJDMzMuMzQ3NCAyMy45ODQyIDMzLjkyMjQgMjMuNDA5MiAzMy45MjI0IDIyLjY5OTlDMzMuOTIyNCAyMS45OTA2IDMzLjM0NzQgMjEuNDE1NiAzMi42MzgxIDIxLjQxNTZDMzEuOTI4OCAyMS40MTU2IDMxLjM1MzggMjEuOTkwNiAzMS4zNTM4IDIyLjY5OTlDMzEuMzUzOCAyMy40MDkyIDMxLjkyODggMjMuOTg0MiAzMi42MzgxIDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIyLjQxNDkgMjMuOTg0MkMyMy4xMjQyIDIzLjk4NDIgMjMuNjk5MiAyMy40MDkyIDIzLjY5OTIgMjIuNjk5OUMyMy42OTkyIDIxLjk5MDYgMjMuMTI0MiAyMS40MTU2IDIyLjQxNDkgMjEuNDE1NkMyMS43MDU2IDIxLjQxNTYgMjEuMTMwNiAyMS45OTA2IDIxLjEzMDYgMjIuNjk5OUMyMS4xMzA2IDIzLjQwOTIgMjEuNzA1NiAyMy45ODQyIDIyLjQxNDkgMjMuOTg0MloiCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDcuMTEwNSAxNy40MzcyVjE4LjEwMzFNMjMuNjQxMyAxMS41MjYxQzIwLjUyNzYgMTEuNTI2MSAyMC41MjkgMTQuNjkwNyAyMC41NTkyIDE1LjYxMDlWMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdWMjYuMjU2M0M0Ny4xMTA1IDMzLjI0NDkgNDEuMTY2NyAzOC45MTAyIDMzLjgzNDggMzguOTEwMkMyNi41MDI5IDM4LjkxMDIgMjAuNTU5MiAzMy4yNDQ5IDIwLjU1OTIgMjYuMjU2M1YyNS4yNDA3TTQ3LjExMDUgMjUuMjQwN0M0Ny4xMTA1IDI1LjI0MDcgNDkuOTExIDI0LjcyOTMgNDkuOTExIDIxLjY3MTlDNDkuOTExIDE4LjkzOTcgNDcuMTEwNSAxOC4xMDMxIDQ3LjExMDUgMTguMTAzMU00Ny4xMTA1IDI1LjI0MDdDNDcuMTEwNSAyNS4yNDA3IDQ1LjA3NSAyNC42OTE3IDQ1LjA3NSAyMS42NzE5QzQ1LjA3NSAxOC42NTIxIDQ3LjExMDUgMTguMTAzMSA0Ny4xMTA1IDE4LjEwMzFNMjAuNTU5MiAxOC4xMDMxVjI1LjI0MDdNMjAuNTU5MiAxOC4xMDMxQzIwLjU1OTIgMTguMTAzMSAyMC41NTkxIDE4LjQyODMgMjAuNTU5MSAyMS42NzE5QzIwLjU1OTEgMjQuOTc0OCAyMC41NTkyIDI1LjI0MDcgMjAuNTU5MiAyNS4yNDA3IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNNDIuMzI0MiA0LjU2OTMzVjMuODEzMkM0Ny40NjA5IDMuODEzMiA0Ny45MDA2IDYuNjY5NzEgNDcuOTg4NCA4LjA5Nzk3VjE3Ljg3NzZDNDMuNTc4IDE3Ljg3NzYgNDIuMzc0NiAxNC45NzA3IDQyLjMyNDIgMTMuNTE3MlY5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM1Y5LjQ4NDcyTTQyLjMyNDIgNC41NjkzM0MzNy4xOTU4IDIuMjI1MjQgMjUuODI1MSAtMC41ODU0NTEgMjEuMzQ3MSA3LjMxMTdDMjAuNzI2NiA4LjUyNzQ2IDIxLjE1NzQgOC43ODI2MSAyMS4xNTc0IDguNzgyNjFNNDIuMzI0MiA5LjQ4NDcyQzQwLjkyMzggMTAuOTU1IDM3LjIwMDEgMTMuOTIwOCAzMy41MDcyIDE0LjAyMTZDMjguODkxMSAxNC4xNDc3IDI1Ljg1NzcgMTEuNDc1OSAyMi45MDM0IDExLjUyNjNDMjAuNTQgMTEuNTY2NyAxOS45NjY3IDEyLjI4MjUgMTkuOTc1NSAxMi42MzUzQzE5LjY4NTIgMTEuNTczMiAxOS42OTg2IDkuNzY1MTMgMjEuMTU3NCA4Ljc4MjYxTTIxLjE1NzQgOC43ODI2MUMyMS43NzU5IDguMzY2MTEgMjIuNjU0MiA4LjA5Nzk3IDIzLjg3OTMgOC4wOTc5N0MyOS4wMjMgOC4wOTc5NyAyOC4xNzg5IDkuODM3NTggMzIuMjY3NSA2Ljk4OTQiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzcuODc2MyA0My4xNjA4QzM3LjM5NTkgNDQuNzMyNCAzNS44OTE1IDQ1LjU1MTQgMzQuMjIzNCA0NS41MzkyQzMyLjUzODYgNDUuNTI2OSAzMC45NDU0IDQ0LjY2MzggMzAuMzggNDMuMTQwOFYzOC40OTkyQzMxLjY4NTYgMzguODA0OSAzMi44MjY0IDM4Ljk2MzUgMzQuMDA2NSAzOC45NjM1QzM1LjIwOSAzOC45NjM2IDM2LjQyNzIgMzguNzk5MiAzNy44NzYzIDM4LjQ4MjJWNDMuMTYwOFoiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy4yMTY2IDQ0LjkzMDNDMTkuMDg0NiA0My44NDcgMjIuODM5NCA0My4wNDY4IDI5LjIwNTQgNDMuMDA5QzMwLjExNjggNDQuOTk3MSAzMi4yMzAxIDQ1Ljk3MTggMzQuMjEzMiA0NS45ODYzQzM2LjE4MjcgNDYuMDAwNyAzOC4yNTEgNDUuMDY1NyAzOS4wNzczIDQzLjAwOTFDNDIuMjcxNSA0My4wMjc3IDQ0LjgyMDcgNDMuMjI1MSA0Ni44MTA5IDQzLjU1M0M0OC45MTMxIDQzLjg5OTQgNTAuMzQ4OCA0NC4zODQ3IDUxLjI1ODMgNDQuOTI2MkM1Mi4xNjA3IDQ1LjQ2MzUgNTIuNDY2MyA0Ni4wMDI2IDUyLjUxMjcgNDYuNDYyN0M1Mi41NjIyIDQ2Ljk1MTUgNTIuMzQ0NSA0Ny41NzQ3IDUxLjcyNTEgNDguMzEyM0M1MC40ODQ5IDQ5Ljc4OTIgNDcuOTQxNSA1MS4zNDk5IDQ0LjczMDEgNTIuNTQzOUM0MS41NDA5IDUzLjcyOTcgMzcuNzkwNCA1NC41MTcyIDM0LjIxODMgNTQuNTE3MkMzMC4yNjc0IDU0LjUxNzIgMjYuMzc5NCA1My43MjcgMjMuMTg1NiA1Mi41NDM2QzE5Ljk2NTEgNTEuMzUwNCAxNy41NTEzIDQ5Ljc5NTQgMTYuNDQ2NSA0OC4zMzkzQzE1LjkwMDEgNDcuNjE5MSAxNS43MzU2IDQ3LjAwODUgMTUuODI0MyA0Ni41MTY0QzE1LjkxMTQgNDYuMDMzMSAxNi4yNzc1IDQ1LjQ3NDkgMTcuMjE2NiA0NC45MzAzWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8bGluZQogICAgeDE9IjEzLjA5MjkiCiAgICB5MT0iMjkuODkxNCIKICAgIHgyPSI0LjUwMTYiCiAgICB5Mj0iMjkuODkxNCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTYuODQ3NTMgMjUuNTA2OUwyLjgwMDA0IDI5LjU1NDRMNi44NDc1MyAzMy42MDE5IgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KPC9zdmc+Cg==);
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-turnRight {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0yMy45OTI5IDE3LjAzNzlMMjAuNzEwNyAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzEuNDY2MyAxNy4wMzc5TDM0Ljc0ODUgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3LjQ0NjQgMjcuNDQ3MUwyOS4zMjA5IDI2LjE5NDlDMjkuNTk1MSAyNi4wMTE3IDI5LjY2ODEgMjUuNjQyMSAyOS41MDI2IDI1LjM1NjVDMjguNjc3OSAyMy45MzM3IDI4LjM2NzMgMjIuNTYwNSAyOC40NDE2IDIwLjQyNjUiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yOS4xMzExIDMyLjc0MDdDMjkuMTMxMSAzMi43NDA3IDI3Ljc5MjggMzMuMzEzNyAyNi4wNTg4IDMzLjMxMzdDMjQuMzI0OCAzMy4zMTM3IDIyLjk4NjYgMzIuNzQwNyAyMi45ODY2IDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi42ODE1IDIzLjk4NDJDMjEuOTcyMiAyMy45ODQyIDIxLjM5NzIgMjMuNDA5MiAyMS4zOTcyIDIyLjY5OTlDMjEuMzk3MiAyMS45OTA2IDIxLjk3MjIgMjEuNDE1NiAyMi42ODE1IDIxLjQxNTZDMjMuMzkwOCAyMS40MTU2IDIzLjk2NTggMjEuOTkwNiAyMy45NjU4IDIyLjY5OTlDMjMuOTY1OCAyMy40MDkyIDIzLjM5MDggMjMuOTg0MiAyMi42ODE1IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjkwNDcgMjMuOTg0MkMzMi4xOTU0IDIzLjk4NDIgMzEuNjIwNCAyMy40MDkyIDMxLjYyMDQgMjIuNjk5OUMzMS42MjA0IDIxLjk5MDYgMzIuMTk1NCAyMS40MTU2IDMyLjkwNDcgMjEuNDE1NkMzMy42MTQgMjEuNDE1NiAzNC4xODkgMjEuOTkwNiAzNC4xODkgMjIuNjk5OUMzNC4xODkgMjMuNDA5MiAzMy42MTQgMjMuOTg0MiAzMi45MDQ3IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTguMjA5MTIgMTcuNDM3MlYxOC4xMDMxTTMxLjY3ODMgMTEuNTI2MUMzNC43OTE5IDExLjUyNjEgMzQuNzkwNiAxNC42OTA3IDM0Ljc2MDQgMTUuNjEwOVYxOC4xMDMxTTguMjA5MTIgMjUuMjQwN1YyNi4yNTYzQzguMjA5MTIgMzMuMjQ0OSAxNC4xNTI5IDM4LjkxMDIgMjEuNDg0OCAzOC45MTAyQzI4LjgxNjcgMzguOTEwMiAzNC43NjA0IDMzLjI0NDkgMzQuNzYwNCAyNi4yNTYzVjI1LjI0MDdNOC4yMDkxMiAyNS4yNDA3QzguMjA5MTIgMjUuMjQwNyA1LjQwODUzIDI0LjcyOTMgNS40MDg1MyAyMS42NzE5QzUuNDA4NTMgMTguOTM5NyA4LjIwOTEyIDE4LjEwMzEgOC4yMDkxMiAxOC4xMDMxTTguMjA5MTIgMjUuMjQwN0M4LjIwOTEyIDI1LjI0MDcgMTAuMjQ0NiAyNC42OTE3IDEwLjI0NDYgMjEuNjcxOUMxMC4yNDQ2IDE4LjY1MjEgOC4yMDkxMiAxOC4xMDMxIDguMjA5MTIgMTguMTAzMU0zNC43NjA0IDE4LjEwMzFWMjUuMjQwN00zNC43NjA0IDE4LjEwMzFDMzQuNzYwNCAxOC4xMDMxIDM0Ljc2MDUgMTguNDI4MyAzNC43NjA1IDIxLjY3MTlDMzQuNzYwNSAyNC45NzQ4IDM0Ljc2MDQgMjUuMjQwNyAzNC43NjA0IDI1LjI0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMi45OTU0IDQuNTY5MzNWMy44MTMyQzcuODU4NjQgMy44MTMyIDcuNDE5MDMgNi42Njk3MSA3LjMzMTIgOC4wOTc5N1YxNy44Nzc2QzExLjc0MTYgMTcuODc3NiAxMi45NDUgMTQuOTcwNyAxMi45OTU0IDEzLjUxNzJWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNDMTguMTIzOCAyLjIyNTI0IDI5LjQ5NDUgLTAuNTg1NDUxIDMzLjk3MjUgNy4zMTE3QzM0LjU5MyA4LjUyNzQ2IDM0LjE2MjIgOC43ODI2MSAzNC4xNjIyIDguNzgyNjFNMTIuOTk1NCA5LjQ4NDcyQzE0LjM5NTggMTAuOTU1IDE4LjExOTUgMTMuOTIwOCAyMS44MTI0IDE0LjAyMTZDMjYuNDI4NSAxNC4xNDc3IDI5LjQ2MTkgMTEuNDc1OSAzMi40MTYyIDExLjUyNjNDMzQuNzc5NiAxMS41NjY3IDM1LjM1MjkgMTIuMjgyNSAzNS4zNDQxIDEyLjYzNTNDMzUuNjM0MyAxMS41NzMyIDM1LjYyMSA5Ljc2NTEzIDM0LjE2MjIgOC43ODI2MU0zNC4xNjIyIDguNzgyNjFDMzMuNTQzNyA4LjM2NjExIDMyLjY2NTQgOC4wOTc5NyAzMS40NDAzIDguMDk3OTdDMjYuMjk2NiA4LjA5Nzk3IDI3LjE0MDcgOS44Mzc1OCAyMy4wNTIxIDYuOTg5NCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy40NDMzIDQzLjE2MDhDMTcuOTIzNyA0NC43MzI0IDE5LjQyODEgNDUuNTUxNCAyMS4wOTYyIDQ1LjUzOTJDMjIuNzgxIDQ1LjUyNjkgMjQuMzc0MiA0NC42NjM4IDI0LjkzOTYgNDMuMTQwOFYzOC40OTkyQzIzLjYzMzkgMzguODA0OSAyMi40OTMyIDM4Ljk2MzUgMjEuMzEzMSAzOC45NjM1QzIwLjExMDYgMzguOTYzNiAxOC44OTIzIDM4Ljc5OTIgMTcuNDQzMyAzOC40ODIyVjQzLjE2MDhaIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzguMTAzIDQ0LjkzMDNDMzYuMjM1IDQzLjg0NyAzMi40ODAyIDQzLjA0NjggMjYuMTE0MiA0My4wMDlDMjUuMjAyOCA0NC45OTcxIDIzLjA4OTUgNDUuOTcxOCAyMS4xMDY0IDQ1Ljk4NjNDMTkuMTM2OSA0Ni4wMDA3IDE3LjA2ODYgNDUuMDY1NyAxNi4yNDIzIDQzLjAwOTFDMTMuMDQ4IDQzLjAyNzcgMTAuNDk4OSA0My4yMjUxIDguNTA4NjggNDMuNTUzQzYuNDA2NTEgNDMuODk5NCA0Ljk3MDgxIDQ0LjM4NDcgNC4wNjEzIDQ0LjkyNjJDMy4xNTg4NiA0NS40NjM1IDIuODUzMzEgNDYuMDAyNiAyLjgwNjgzIDQ2LjQ2MjdDMi43NTc0MSA0Ni45NTE1IDIuOTc1MTEgNDcuNTc0NyAzLjU5NDQ3IDQ4LjMxMjNDNC44MzQ2NiA0OS43ODkyIDcuMzc4MTEgNTEuMzQ5OSAxMC41ODk0IDUyLjU0MzlDMTMuNzc4NyA1My43Mjk3IDE3LjUyOTIgNTQuNTE3MiAyMS4xMDEzIDU0LjUxNzJDMjUuMDUyMSA1NC41MTcyIDI4Ljk0MDEgNTMuNzI3IDMyLjEzNCA1Mi41NDM2QzM1LjM1NDUgNTEuMzUwNCAzNy43NjgyIDQ5Ljc5NTQgMzguODczMSA0OC4zMzkzQzM5LjQxOTUgNDcuNjE5MSAzOS41ODQgNDcuMDA4NSAzOS40OTUzIDQ2LjUxNjRDMzkuNDA4MiA0Ni4wMzMxIDM5LjA0MjEgNDUuNDc0OSAzOC4xMDMgNDQuOTMwM1oiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPGxpbmUKICAgIHgxPSIxIgogICAgeTE9Ii0xIgogICAgeDI9IjkuNTkxMyIKICAgIHkyPSItMSIKICAgIHRyYW5zZm9ybT0ibWF0cml4KDEgMS4yNDg4OWUtMDcgNi4xMTk1OGUtMDggLTEgNDEuMjI2NyAyOC44OTE0KSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQ4LjQ3MiAyNS41MDY5TDUyLjUxOTUgMjkuNTU0NEw0OC40NzIgMzMuNjAxOSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+Cjwvc3ZnPgo=);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0yMy45OTI5IDE3LjAzNzlMMjAuNzEwNyAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzEuNDY2MyAxNy4wMzc5TDM0Ljc0ODUgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3LjQ0NjQgMjcuNDQ3MUwyOS4zMjA5IDI2LjE5NDlDMjkuNTk1MSAyNi4wMTE3IDI5LjY2ODEgMjUuNjQyMSAyOS41MDI2IDI1LjM1NjVDMjguNjc3OSAyMy45MzM3IDI4LjM2NzMgMjIuNTYwNSAyOC40NDE2IDIwLjQyNjUiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yOS4xMzExIDMyLjc0MDdDMjkuMTMxMSAzMi43NDA3IDI3Ljc5MjggMzMuMzEzNyAyNi4wNTg4IDMzLjMxMzdDMjQuMzI0OCAzMy4zMTM3IDIyLjk4NjYgMzIuNzQwNyAyMi45ODY2IDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi42ODE1IDIzLjk4NDJDMjEuOTcyMiAyMy45ODQyIDIxLjM5NzIgMjMuNDA5MiAyMS4zOTcyIDIyLjY5OTlDMjEuMzk3MiAyMS45OTA2IDIxLjk3MjIgMjEuNDE1NiAyMi42ODE1IDIxLjQxNTZDMjMuMzkwOCAyMS40MTU2IDIzLjk2NTggMjEuOTkwNiAyMy45NjU4IDIyLjY5OTlDMjMuOTY1OCAyMy40MDkyIDIzLjM5MDggMjMuOTg0MiAyMi42ODE1IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjkwNDcgMjMuOTg0MkMzMi4xOTU0IDIzLjk4NDIgMzEuNjIwNCAyMy40MDkyIDMxLjYyMDQgMjIuNjk5OUMzMS42MjA0IDIxLjk5MDYgMzIuMTk1NCAyMS40MTU2IDMyLjkwNDcgMjEuNDE1NkMzMy42MTQgMjEuNDE1NiAzNC4xODkgMjEuOTkwNiAzNC4xODkgMjIuNjk5OUMzNC4xODkgMjMuNDA5MiAzMy42MTQgMjMuOTg0MiAzMi45MDQ3IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTguMjA5MTIgMTcuNDM3MlYxOC4xMDMxTTMxLjY3ODMgMTEuNTI2MUMzNC43OTE5IDExLjUyNjEgMzQuNzkwNiAxNC42OTA3IDM0Ljc2MDQgMTUuNjEwOVYxOC4xMDMxTTguMjA5MTIgMjUuMjQwN1YyNi4yNTYzQzguMjA5MTIgMzMuMjQ0OSAxNC4xNTI5IDM4LjkxMDIgMjEuNDg0OCAzOC45MTAyQzI4LjgxNjcgMzguOTEwMiAzNC43NjA0IDMzLjI0NDkgMzQuNzYwNCAyNi4yNTYzVjI1LjI0MDdNOC4yMDkxMiAyNS4yNDA3QzguMjA5MTIgMjUuMjQwNyA1LjQwODUzIDI0LjcyOTMgNS40MDg1MyAyMS42NzE5QzUuNDA4NTMgMTguOTM5NyA4LjIwOTEyIDE4LjEwMzEgOC4yMDkxMiAxOC4xMDMxTTguMjA5MTIgMjUuMjQwN0M4LjIwOTEyIDI1LjI0MDcgMTAuMjQ0NiAyNC42OTE3IDEwLjI0NDYgMjEuNjcxOUMxMC4yNDQ2IDE4LjY1MjEgOC4yMDkxMiAxOC4xMDMxIDguMjA5MTIgMTguMTAzMU0zNC43NjA0IDE4LjEwMzFWMjUuMjQwN00zNC43NjA0IDE4LjEwMzFDMzQuNzYwNCAxOC4xMDMxIDM0Ljc2MDUgMTguNDI4MyAzNC43NjA1IDIxLjY3MTlDMzQuNzYwNSAyNC45NzQ4IDM0Ljc2MDQgMjUuMjQwNyAzNC43NjA0IDI1LjI0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMi45OTU0IDQuNTY5MzNWMy44MTMyQzcuODU4NjQgMy44MTMyIDcuNDE5MDMgNi42Njk3MSA3LjMzMTIgOC4wOTc5N1YxNy44Nzc2QzExLjc0MTYgMTcuODc3NiAxMi45NDUgMTQuOTcwNyAxMi45OTU0IDEzLjUxNzJWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNDMTguMTIzOCAyLjIyNTI0IDI5LjQ5NDUgLTAuNTg1NDUxIDMzLjk3MjUgNy4zMTE3QzM0LjU5MyA4LjUyNzQ2IDM0LjE2MjIgOC43ODI2MSAzNC4xNjIyIDguNzgyNjFNMTIuOTk1NCA5LjQ4NDcyQzE0LjM5NTggMTAuOTU1IDE4LjExOTUgMTMuOTIwOCAyMS44MTI0IDE0LjAyMTZDMjYuNDI4NSAxNC4xNDc3IDI5LjQ2MTkgMTEuNDc1OSAzMi40MTYyIDExLjUyNjNDMzQuNzc5NiAxMS41NjY3IDM1LjM1MjkgMTIuMjgyNSAzNS4zNDQxIDEyLjYzNTNDMzUuNjM0MyAxMS41NzMyIDM1LjYyMSA5Ljc2NTEzIDM0LjE2MjIgOC43ODI2MU0zNC4xNjIyIDguNzgyNjFDMzMuNTQzNyA4LjM2NjExIDMyLjY2NTQgOC4wOTc5NyAzMS40NDAzIDguMDk3OTdDMjYuMjk2NiA4LjA5Nzk3IDI3LjE0MDcgOS44Mzc1OCAyMy4wNTIxIDYuOTg5NCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy40NDMzIDQzLjE2MDhDMTcuOTIzNyA0NC43MzI0IDE5LjQyODEgNDUuNTUxNCAyMS4wOTYyIDQ1LjUzOTJDMjIuNzgxIDQ1LjUyNjkgMjQuMzc0MiA0NC42NjM4IDI0LjkzOTYgNDMuMTQwOFYzOC40OTkyQzIzLjYzMzkgMzguODA0OSAyMi40OTMyIDM4Ljk2MzUgMjEuMzEzMSAzOC45NjM1QzIwLjExMDYgMzguOTYzNiAxOC44OTIzIDM4Ljc5OTIgMTcuNDQzMyAzOC40ODIyVjQzLjE2MDhaIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzguMTAzIDQ0LjkzMDNDMzYuMjM1IDQzLjg0NyAzMi40ODAyIDQzLjA0NjggMjYuMTE0MiA0My4wMDlDMjUuMjAyOCA0NC45OTcxIDIzLjA4OTUgNDUuOTcxOCAyMS4xMDY0IDQ1Ljk4NjNDMTkuMTM2OSA0Ni4wMDA3IDE3LjA2ODYgNDUuMDY1NyAxNi4yNDIzIDQzLjAwOTFDMTMuMDQ4IDQzLjAyNzcgMTAuNDk4OSA0My4yMjUxIDguNTA4NjggNDMuNTUzQzYuNDA2NTEgNDMuODk5NCA0Ljk3MDgxIDQ0LjM4NDcgNC4wNjEzIDQ0LjkyNjJDMy4xNTg4NiA0NS40NjM1IDIuODUzMzEgNDYuMDAyNiAyLjgwNjgzIDQ2LjQ2MjdDMi43NTc0MSA0Ni45NTE1IDIuOTc1MTEgNDcuNTc0NyAzLjU5NDQ3IDQ4LjMxMjNDNC44MzQ2NiA0OS43ODkyIDcuMzc4MTEgNTEuMzQ5OSAxMC41ODk0IDUyLjU0MzlDMTMuNzc4NyA1My43Mjk3IDE3LjUyOTIgNTQuNTE3MiAyMS4xMDEzIDU0LjUxNzJDMjUuMDUyMSA1NC41MTcyIDI4Ljk0MDEgNTMuNzI3IDMyLjEzNCA1Mi41NDM2QzM1LjM1NDUgNTEuMzUwNCAzNy43NjgyIDQ5Ljc5NTQgMzguODczMSA0OC4zMzkzQzM5LjQxOTUgNDcuNjE5MSAzOS41ODQgNDcuMDA4NSAzOS40OTUzIDQ2LjUxNjRDMzkuNDA4MiA0Ni4wMzMxIDM5LjA0MjEgNDUuNDc0OSAzOC4xMDMgNDQuOTMwM1oiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPGxpbmUKICAgIHgxPSIxIgogICAgeTE9Ii0xIgogICAgeDI9IjkuNTkxMyIKICAgIHkyPSItMSIKICAgIHRyYW5zZm9ybT0ibWF0cml4KDEgMS4yNDg4OWUtMDcgNi4xMTk1OGUtMDggLTEgNDEuMjI2NyAyOC44OTE0KSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQ4LjQ3MiAyNS41MDY5TDUyLjUxOTUgMjkuNTU0NEw0OC40NzIgMzMuNjAxOSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+Cjwvc3ZnPgo=);
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-tiltRight {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0yMy45OTI5IDE3LjAzNzlMMjAuNzEwNyAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzEuNDY2MyAxNy4wMzc5TDM0Ljc0ODUgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3LjQ0NjQgMjcuNDQ3MUwyOS4zMjA5IDI2LjE5NDlDMjkuNTk1MSAyNi4wMTE3IDI5LjY2ODEgMjUuNjQyMSAyOS41MDI2IDI1LjM1NjVDMjguNjc3OSAyMy45MzM3IDI4LjM2NzMgMjIuNTYwNSAyOC40NDE2IDIwLjQyNjUiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yOS4xMzExIDMyLjc0MDdDMjkuMTMxMSAzMi43NDA3IDI3Ljc5MjggMzMuMzEzNyAyNi4wNTg4IDMzLjMxMzdDMjQuMzI0OCAzMy4zMTM3IDIyLjk4NjYgMzIuNzQwNyAyMi45ODY2IDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi42ODE1IDIzLjk4NDJDMjEuOTcyMiAyMy45ODQyIDIxLjM5NzIgMjMuNDA5MiAyMS4zOTcyIDIyLjY5OTlDMjEuMzk3MiAyMS45OTA2IDIxLjk3MjIgMjEuNDE1NiAyMi42ODE1IDIxLjQxNTZDMjMuMzkwOCAyMS40MTU2IDIzLjk2NTggMjEuOTkwNiAyMy45NjU4IDIyLjY5OTlDMjMuOTY1OCAyMy40MDkyIDIzLjM5MDggMjMuOTg0MiAyMi42ODE1IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjkwNDcgMjMuOTg0MkMzMi4xOTU0IDIzLjk4NDIgMzEuNjIwNCAyMy40MDkyIDMxLjYyMDQgMjIuNjk5OUMzMS42MjA0IDIxLjk5MDYgMzIuMTk1NCAyMS40MTU2IDMyLjkwNDcgMjEuNDE1NkMzMy42MTQgMjEuNDE1NiAzNC4xODkgMjEuOTkwNiAzNC4xODkgMjIuNjk5OUMzNC4xODkgMjMuNDA5MiAzMy42MTQgMjMuOTg0MiAzMi45MDQ3IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTguMjA5MTIgMTcuNDM3MlYxOC4xMDMxTTMxLjY3ODMgMTEuNTI2MUMzNC43OTE5IDExLjUyNjEgMzQuNzkwNiAxNC42OTA3IDM0Ljc2MDQgMTUuNjEwOVYxOC4xMDMxTTguMjA5MTIgMjUuMjQwN1YyNi4yNTYzQzguMjA5MTIgMzMuMjQ0OSAxNC4xNTI5IDM4LjkxMDIgMjEuNDg0OCAzOC45MTAyQzI4LjgxNjcgMzguOTEwMiAzNC43NjA0IDMzLjI0NDkgMzQuNzYwNCAyNi4yNTYzVjI1LjI0MDdNOC4yMDkxMiAyNS4yNDA3QzguMjA5MTIgMjUuMjQwNyA1LjQwODUzIDI0LjcyOTMgNS40MDg1MyAyMS42NzE5QzUuNDA4NTMgMTguOTM5NyA4LjIwOTEyIDE4LjEwMzEgOC4yMDkxMiAxOC4xMDMxTTguMjA5MTIgMjUuMjQwN0M4LjIwOTEyIDI1LjI0MDcgMTAuMjQ0NiAyNC42OTE3IDEwLjI0NDYgMjEuNjcxOUMxMC4yNDQ2IDE4LjY1MjEgOC4yMDkxMiAxOC4xMDMxIDguMjA5MTIgMTguMTAzMU0zNC43NjA0IDE4LjEwMzFWMjUuMjQwN00zNC43NjA0IDE4LjEwMzFDMzQuNzYwNCAxOC4xMDMxIDM0Ljc2MDUgMTguNDI4MyAzNC43NjA1IDIxLjY3MTlDMzQuNzYwNSAyNC45NzQ4IDM0Ljc2MDQgMjUuMjQwNyAzNC43NjA0IDI1LjI0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMi45OTU0IDQuNTY5MzNWMy44MTMyQzcuODU4NjQgMy44MTMyIDcuNDE5MDMgNi42Njk3MSA3LjMzMTIgOC4wOTc5N1YxNy44Nzc2QzExLjc0MTYgMTcuODc3NiAxMi45NDUgMTQuOTcwNyAxMi45OTU0IDEzLjUxNzJWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNDMTguMTIzOCAyLjIyNTI0IDI5LjQ5NDUgLTAuNTg1NDUxIDMzLjk3MjUgNy4zMTE3QzM0LjU5MyA4LjUyNzQ2IDM0LjE2MjIgOC43ODI2MSAzNC4xNjIyIDguNzgyNjFNMTIuOTk1NCA5LjQ4NDcyQzE0LjM5NTggMTAuOTU1IDE4LjExOTUgMTMuOTIwOCAyMS44MTI0IDE0LjAyMTZDMjYuNDI4NSAxNC4xNDc3IDI5LjQ2MTkgMTEuNDc1OSAzMi40MTYyIDExLjUyNjNDMzQuNzc5NiAxMS41NjY3IDM1LjM1MjkgMTIuMjgyNSAzNS4zNDQxIDEyLjYzNTNDMzUuNjM0MyAxMS41NzMyIDM1LjYyMSA5Ljc2NTEzIDM0LjE2MjIgOC43ODI2MU0zNC4xNjIyIDguNzgyNjFDMzMuNTQzNyA4LjM2NjExIDMyLjY2NTQgOC4wOTc5NyAzMS40NDAzIDguMDk3OTdDMjYuMjk2NiA4LjA5Nzk3IDI3LjE0MDcgOS44Mzc1OCAyMy4wNTIxIDYuOTg5NCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy40NDMzIDQzLjE2MDhDMTcuOTIzNyA0NC43MzI0IDE5LjQyODEgNDUuNTUxNCAyMS4wOTYyIDQ1LjUzOTJDMjIuNzgxIDQ1LjUyNjkgMjQuMzc0MiA0NC42NjM4IDI0LjkzOTYgNDMuMTQwOFYzOC40OTkyQzIzLjYzMzkgMzguODA0OSAyMi40OTMyIDM4Ljk2MzUgMjEuMzEzMSAzOC45NjM1QzIwLjExMDYgMzguOTYzNiAxOC44OTIzIDM4Ljc5OTIgMTcuNDQzMyAzOC40ODIyVjQzLjE2MDhaIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzguMTAzIDQ0LjkzMDNDMzYuMjM1IDQzLjg0NyAzMi40ODAyIDQzLjA0NjggMjYuMTE0MiA0My4wMDlDMjUuMjAyOCA0NC45OTcxIDIzLjA4OTUgNDUuOTcxOCAyMS4xMDY0IDQ1Ljk4NjNDMTkuMTM2OSA0Ni4wMDA3IDE3LjA2ODYgNDUuMDY1NyAxNi4yNDIzIDQzLjAwOTFDMTMuMDQ4IDQzLjAyNzcgMTAuNDk4OSA0My4yMjUxIDguNTA4NjggNDMuNTUzQzYuNDA2NTEgNDMuODk5NCA0Ljk3MDgxIDQ0LjM4NDcgNC4wNjEzIDQ0LjkyNjJDMy4xNTg4NiA0NS40NjM1IDIuODUzMzEgNDYuMDAyNiAyLjgwNjgzIDQ2LjQ2MjdDMi43NTc0MSA0Ni45NTE1IDIuOTc1MTEgNDcuNTc0NyAzLjU5NDQ3IDQ4LjMxMjNDNC44MzQ2NiA0OS43ODkyIDcuMzc4MTEgNTEuMzQ5OSAxMC41ODk0IDUyLjU0MzlDMTMuNzc4NyA1My43Mjk3IDE3LjUyOTIgNTQuNTE3MiAyMS4xMDEzIDU0LjUxNzJDMjUuMDUyMSA1NC41MTcyIDI4Ljk0MDEgNTMuNzI3IDMyLjEzNCA1Mi41NDM2QzM1LjM1NDUgNTEuMzUwNCAzNy43NjgyIDQ5Ljc5NTQgMzguODczMSA0OC4zMzkzQzM5LjQxOTUgNDcuNjE5MSAzOS41ODQgNDcuMDA4NSAzOS40OTUzIDQ2LjUxNjRDMzkuNDA4MiA0Ni4wMzMxIDM5LjA0MjEgNDUuNDc0OSAzOC4xMDMgNDQuOTMwM1oiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPGxpbmUKICAgIHgxPSIxIgogICAgeTE9Ii0xIgogICAgeDI9IjkuNTkxMyIKICAgIHkyPSItMSIKICAgIHRyYW5zZm9ybT0ibWF0cml4KDEgMS4yNDg4OWUtMDcgNi4xMTk1OGUtMDggLTEgNDEuMjI2NyAyOC44OTE0KSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQ4LjQ3MiAyNS41MDY5TDUyLjUxOTUgMjkuNTU0NEw0OC40NzIgMzMuNjAxOSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+Cjwvc3ZnPgo=);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0yMy45OTI5IDE3LjAzNzlMMjAuNzEwNyAxNy4zMTYyIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzEuNDY2MyAxNy4wMzc5TDM0Ljc0ODUgMTcuMzE2MiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI3LjQ0NjQgMjcuNDQ3MUwyOS4zMjA5IDI2LjE5NDlDMjkuNTk1MSAyNi4wMTE3IDI5LjY2ODEgMjUuNjQyMSAyOS41MDI2IDI1LjM1NjVDMjguNjc3OSAyMy45MzM3IDI4LjM2NzMgMjIuNTYwNSAyOC40NDE2IDIwLjQyNjUiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yOS4xMzExIDMyLjc0MDdDMjkuMTMxMSAzMi43NDA3IDI3Ljc5MjggMzMuMzEzNyAyNi4wNTg4IDMzLjMxMzdDMjQuMzI0OCAzMy4zMTM3IDIyLjk4NjYgMzIuNzQwNyAyMi45ODY2IDMyLjc0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi42ODE1IDIzLjk4NDJDMjEuOTcyMiAyMy45ODQyIDIxLjM5NzIgMjMuNDA5MiAyMS4zOTcyIDIyLjY5OTlDMjEuMzk3MiAyMS45OTA2IDIxLjk3MjIgMjEuNDE1NiAyMi42ODE1IDIxLjQxNTZDMjMuMzkwOCAyMS40MTU2IDIzLjk2NTggMjEuOTkwNiAyMy45NjU4IDIyLjY5OTlDMjMuOTY1OCAyMy40MDkyIDIzLjM5MDggMjMuOTg0MiAyMi42ODE1IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTMyLjkwNDcgMjMuOTg0MkMzMi4xOTU0IDIzLjk4NDIgMzEuNjIwNCAyMy40MDkyIDMxLjYyMDQgMjIuNjk5OUMzMS42MjA0IDIxLjk5MDYgMzIuMTk1NCAyMS40MTU2IDMyLjkwNDcgMjEuNDE1NkMzMy42MTQgMjEuNDE1NiAzNC4xODkgMjEuOTkwNiAzNC4xODkgMjIuNjk5OUMzNC4xODkgMjMuNDA5MiAzMy42MTQgMjMuOTg0MiAzMi45MDQ3IDIzLjk4NDJaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTguMjA5MTIgMTcuNDM3MlYxOC4xMDMxTTMxLjY3ODMgMTEuNTI2MUMzNC43OTE5IDExLjUyNjEgMzQuNzkwNiAxNC42OTA3IDM0Ljc2MDQgMTUuNjEwOVYxOC4xMDMxTTguMjA5MTIgMjUuMjQwN1YyNi4yNTYzQzguMjA5MTIgMzMuMjQ0OSAxNC4xNTI5IDM4LjkxMDIgMjEuNDg0OCAzOC45MTAyQzI4LjgxNjcgMzguOTEwMiAzNC43NjA0IDMzLjI0NDkgMzQuNzYwNCAyNi4yNTYzVjI1LjI0MDdNOC4yMDkxMiAyNS4yNDA3QzguMjA5MTIgMjUuMjQwNyA1LjQwODUzIDI0LjcyOTMgNS40MDg1MyAyMS42NzE5QzUuNDA4NTMgMTguOTM5NyA4LjIwOTEyIDE4LjEwMzEgOC4yMDkxMiAxOC4xMDMxTTguMjA5MTIgMjUuMjQwN0M4LjIwOTEyIDI1LjI0MDcgMTAuMjQ0NiAyNC42OTE3IDEwLjI0NDYgMjEuNjcxOUMxMC4yNDQ2IDE4LjY1MjEgOC4yMDkxMiAxOC4xMDMxIDguMjA5MTIgMTguMTAzMU0zNC43NjA0IDE4LjEwMzFWMjUuMjQwN00zNC43NjA0IDE4LjEwMzFDMzQuNzYwNCAxOC4xMDMxIDM0Ljc2MDUgMTguNDI4MyAzNC43NjA1IDIxLjY3MTlDMzQuNzYwNSAyNC45NzQ4IDM0Ljc2MDQgMjUuMjQwNyAzNC43NjA0IDI1LjI0MDciCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xMi45OTU0IDQuNTY5MzNWMy44MTMyQzcuODU4NjQgMy44MTMyIDcuNDE5MDMgNi42Njk3MSA3LjMzMTIgOC4wOTc5N1YxNy44Nzc2QzExLjc0MTYgMTcuODc3NiAxMi45NDUgMTQuOTcwNyAxMi45OTU0IDEzLjUxNzJWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNWOS40ODQ3Mk0xMi45OTU0IDQuNTY5MzNDMTguMTIzOCAyLjIyNTI0IDI5LjQ5NDUgLTAuNTg1NDUxIDMzLjk3MjUgNy4zMTE3QzM0LjU5MyA4LjUyNzQ2IDM0LjE2MjIgOC43ODI2MSAzNC4xNjIyIDguNzgyNjFNMTIuOTk1NCA5LjQ4NDcyQzE0LjM5NTggMTAuOTU1IDE4LjExOTUgMTMuOTIwOCAyMS44MTI0IDE0LjAyMTZDMjYuNDI4NSAxNC4xNDc3IDI5LjQ2MTkgMTEuNDc1OSAzMi40MTYyIDExLjUyNjNDMzQuNzc5NiAxMS41NjY3IDM1LjM1MjkgMTIuMjgyNSAzNS4zNDQxIDEyLjYzNTNDMzUuNjM0MyAxMS41NzMyIDM1LjYyMSA5Ljc2NTEzIDM0LjE2MjIgOC43ODI2MU0zNC4xNjIyIDguNzgyNjFDMzMuNTQzNyA4LjM2NjExIDMyLjY2NTQgOC4wOTc5NyAzMS40NDAzIDguMDk3OTdDMjYuMjk2NiA4LjA5Nzk3IDI3LjE0MDcgOS44Mzc1OCAyMy4wNTIxIDYuOTg5NCIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0xNy40NDMzIDQzLjE2MDhDMTcuOTIzNyA0NC43MzI0IDE5LjQyODEgNDUuNTUxNCAyMS4wOTYyIDQ1LjUzOTJDMjIuNzgxIDQ1LjUyNjkgMjQuMzc0MiA0NC42NjM4IDI0LjkzOTYgNDMuMTQwOFYzOC40OTkyQzIzLjYzMzkgMzguODA0OSAyMi40OTMyIDM4Ljk2MzUgMjEuMzEzMSAzOC45NjM1QzIwLjExMDYgMzguOTYzNiAxOC44OTIzIDM4Ljc5OTIgMTcuNDQzMyAzOC40ODIyVjQzLjE2MDhaIgogICAgc3Ryb2tlPSJjdXJyZW50Q29sb3IiCiAgICBzdHJva2Utd2lkdGg9IjIiCiAgLz4KICAgIDxwYXRoCiAgICBkPSJNMzguMTAzIDQ0LjkzMDNDMzYuMjM1IDQzLjg0NyAzMi40ODAyIDQzLjA0NjggMjYuMTE0MiA0My4wMDlDMjUuMjAyOCA0NC45OTcxIDIzLjA4OTUgNDUuOTcxOCAyMS4xMDY0IDQ1Ljk4NjNDMTkuMTM2OSA0Ni4wMDA3IDE3LjA2ODYgNDUuMDY1NyAxNi4yNDIzIDQzLjAwOTFDMTMuMDQ4IDQzLjAyNzcgMTAuNDk4OSA0My4yMjUxIDguNTA4NjggNDMuNTUzQzYuNDA2NTEgNDMuODk5NCA0Ljk3MDgxIDQ0LjM4NDcgNC4wNjEzIDQ0LjkyNjJDMy4xNTg4NiA0NS40NjM1IDIuODUzMzEgNDYuMDAyNiAyLjgwNjgzIDQ2LjQ2MjdDMi43NTc0MSA0Ni45NTE1IDIuOTc1MTEgNDcuNTc0NyAzLjU5NDQ3IDQ4LjMxMjNDNC44MzQ2NiA0OS43ODkyIDcuMzc4MTEgNTEuMzQ5OSAxMC41ODk0IDUyLjU0MzlDMTMuNzc4NyA1My43Mjk3IDE3LjUyOTIgNTQuNTE3MiAyMS4xMDEzIDU0LjUxNzJDMjUuMDUyMSA1NC41MTcyIDI4Ljk0MDEgNTMuNzI3IDMyLjEzNCA1Mi41NDM2QzM1LjM1NDUgNTEuMzUwNCAzNy43NjgyIDQ5Ljc5NTQgMzguODczMSA0OC4zMzkzQzM5LjQxOTUgNDcuNjE5MSAzOS41ODQgNDcuMDA4NSAzOS40OTUzIDQ2LjUxNjRDMzkuNDA4MiA0Ni4wMzMxIDM5LjA0MjEgNDUuNDc0OSAzOC4xMDMgNDQuOTMwM1oiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAvPgogICAgPGxpbmUKICAgIHgxPSIxIgogICAgeTE9Ii0xIgogICAgeDI9IjkuNTkxMyIKICAgIHkyPSItMSIKICAgIHRyYW5zZm9ybT0ibWF0cml4KDEgMS4yNDg4OWUtMDcgNi4xMTk1OGUtMDggLTEgNDEuMjI2NyAyOC44OTE0KSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQ4LjQ3MiAyNS41MDY5TDUyLjUxOTUgMjkuNTU0NEw0OC40NzIgMzMuNjAxOSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+Cjwvc3ZnPgo=);
        }
        
        #getid-main .GiCommand-taskIcon.GiCommand-closeEyes {
          -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMy4wMjUzIDIwLjA2MDhMMzYuMzA3NSAyMC4zMzkiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi43NTE3IDIwLjA2MDhMMTkuNDY5NSAyMC4zMzkiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yNi43NzE2IDI2Ljk3TDI4LjU1MTIgMjUuNzE3OEMyOC44MTE1IDI1LjUzNDYgMjguODgwOCAyNS4xNjQ5IDI4LjcyMzcgMjQuODc5NEMyNy45NDA3IDIzLjQ1NjYgMjcuNjQ1OCAyMi4wODM0IDI3LjcxNjQgMTkuOTQ5MyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI1LjA4NjggMzIuMjAwN0MyNS4wODY4IDMyLjIwMDcgMjYuNDI1MSAzMi43NzM2IDI4LjE1OTEgMzIuNzczNkMyOS44OTMxIDMyLjc3MzYgMzEuMjMxMyAzMi4yMDA3IDMxLjIzMTMgMzIuMjAwNyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM0LjMzNjYgMjIuNTI4N0MzNS4yOTA5IDIyLjUyODcgMzYuMDY0NSAyMi4zOTIgMzYuMDY0NSAyMi4yMjM0QzM2LjA2NDUgMjIuMDU0OCAzNS4yOTA5IDIxLjkxODEgMzQuMzM2NiAyMS45MTgxQzMzLjM4MjQgMjEuOTE4MSAzMi42MDg4IDIyLjA1NDggMzIuNjA4OCAyMi4yMjM0QzMyLjYwODggMjIuMzkyIDMzLjM4MjQgMjIuNTI4NyAzNC4zMzY2IDIyLjUyODdaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIxLjMxMzQgMjIuNTI4N0MyMi4zNjU1IDIyLjUyODcgMjMuMjE4NSAyMi4zOTIgMjMuMjE4NSAyMi4yMjM0QzIzLjIxODUgMjIuMDU0OCAyMi4zNjU1IDIxLjkxODEgMjEuMzEzNCAyMS45MTgxQzIwLjI2MTIgMjEuOTE4MSAxOS40MDgyIDIyLjA1NDggMTkuNDA4MiAyMi4yMjM0QzE5LjQwODIgMjIuMzkyIDIwLjI2MTIgMjIuNTI4NyAyMS4zMTM0IDIyLjUyODdaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQxLjEwOSAxNi45NjAxVjE3LjYyNTlNMTcuNjM5OCAxMS4wNDlDMTQuNTI2MiAxMS4wNDg5IDE0LjUyNzUgMTQuMjEzNiAxNC41NTc3IDE1LjEzMzdWMTcuNjI1OU00MS4xMDkgMjQuNzYzNlYyNS43NzkyQzQxLjEwOSAzMi43Njc3IDM1LjE2NTMgMzguNDMzIDI3LjgzMzMgMzguNDMzQzIwLjUwMTQgMzguNDMzIDE0LjU1NzcgMzIuNzY3NyAxNC41NTc3IDI1Ljc3OTJWMjQuNzYzNk00MS4xMDkgMjQuNzYzNkM0MS4xMDkgMjQuNzYzNiA0My45MDk2IDI0LjI1MjEgNDMuOTA5NiAyMS4xOTQ4QzQzLjkwOTYgMTguNDYyNiA0MS4xMDkgMTcuNjI1OSA0MS4xMDkgMTcuNjI1OU00MS4xMDkgMjQuNzYzNlYxNy42MjU5TTE0LjU1NzcgMTcuNjI1OVYyNC43NjM2TTE0LjU1NzcgMTcuNjI1OUMxNC41NTc3IDE3LjYyNTkgMTEuNjQ3NiAxNy45NTExIDExLjY0NzYgMjEuMTk0OEMxMS42NDc2IDI0LjQ5NzYgMTQuNTU3NyAyNC43NjM2IDE0LjU1NzcgMjQuNzYzNiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM2LjMyMjcgNC4wOTIxOVYzLjMzNjA2QzQxLjQ1OTUgMy4zMzYwNiA0MS44OTkxIDYuMTkyNTcgNDEuOTg2OSA3LjYyMDgyVjE3LjQwMDVDMzcuNTc2NiAxNy40MDA1IDM2LjM3MzEgMTQuNDkzNSAzNi4zMjI3IDEzLjA0MDFWOS4wMDc1N00zNi4zMjI3IDQuMDkyMTlWOS4wMDc1N00zNi4zMjI3IDQuMDkyMTlDMzEuMTk0NCAxLjc0ODEgMTkuODIzNiAtMS4wNjI1OSAxNS4zNDU2IDYuODM0NTZDMTQuNzI1MSA4LjA1MDMyIDE1LjE1NTkgOC4zMDU0NyAxNS4xNTU5IDguMzA1NDdNMzYuMzIyNyA5LjAwNzU3QzM0LjkyMjMgMTAuNDc3OSAzMS4xOTg2IDEzLjQ0MzcgMjcuNTA1NyAxMy41NDQ1QzIyLjg4OTYgMTMuNjcwNiAxOS44NTYyIDEwLjk5ODggMTYuOTAxOSAxMS4wNDkyQzE0LjUzODUgMTEuMDg5NSAxMy45NjUyIDExLjgwNTMgMTMuOTc0IDEyLjE1ODJDMTMuNjgzOCAxMS4wOTYgMTMuNjk3MSA5LjI4Nzk5IDE1LjE1NTkgOC4zMDU0N00xNS4xNTU5IDguMzA1NDdDMTUuNzc0NCA3Ljg4ODk3IDE2LjY1MjcgNy42MjA4MiAxNy44Nzc5IDcuNjIwODJDMjMuMDIxNSA3LjYyMDgyIDIyLjE3NzQgOS4zNjA0NCAyNi4yNjYgNi41MTIyNSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMS44NzQ4IDQyLjY4MzdDMzEuMzk0NCA0NC4yNTUyIDI5Ljg5IDQ1LjA3NDIgMjguMjIyIDQ1LjA2MkMyNi41MzcxIDQ1LjA0OTcgMjQuOTQzOSA0NC4xODY2IDI0LjM3ODUgNDIuNjYzN1YzOC4wMjIxQzI1LjY4NDIgMzguMzI3OCAyNi44MjQ5IDM4LjQ4NjMgMjguMDA1IDM4LjQ4NjRDMjkuMjA3NSAzOC40ODY1IDMwLjQyNTggMzguMzIyIDMxLjg3NDggMzguMDA1MVY0Mi42ODM3WiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTExLjIxNSA0NC40NTMxQzEzLjA4MyA0My4zNjk4IDE2LjgzNzggNDIuNTY5NyAyMy4yMDM4IDQyLjUzMTlDMjQuMTE1MiA0NC41MiAyNi4yMjg1IDQ1LjQ5NDcgMjguMjExNiA0NS41MDkyQzMwLjE4MTEgNDUuNTIzNiAzMi4yNDk0IDQ0LjU4ODUgMzMuMDc1NyA0Mi41MzE5QzM2LjI3IDQyLjU1MDUgMzguODE5MSA0Mi43NDc5IDQwLjgwOTMgNDMuMDc1OUM0Mi45MTE1IDQzLjQyMjMgNDQuMzQ3MiA0My45MDc2IDQ1LjI1NjcgNDQuNDQ5MUM0Ni4xNTkxIDQ0Ljk4NjMgNDYuNDY0NyA0NS41MjU1IDQ2LjUxMTIgNDUuOTg1NkM0Ni41NjA2IDQ2LjQ3NDQgNDYuMzQyOSA0Ny4wOTc1IDQ1LjcyMzUgNDcuODM1MUM0NC40ODMzIDQ5LjMxMjEgNDEuOTM5OSA1MC44NzI4IDM4LjcyODYgNTIuMDY2OEMzNS41MzkzIDUzLjI1MjYgMzEuNzg4OCA1NC4wNDAxIDI4LjIxNjcgNTQuMDQwMUMyNC4yNjU5IDU0LjA0MDEgMjAuMzc3OSA1My4yNDk4IDE3LjE4NCA1Mi4wNjY1QzEzLjk2MzUgNTAuODczMyAxMS41NDk3IDQ5LjMxODMgMTAuNDQ0OSA0Ny44NjIxQzkuODk4NTEgNDcuMTQyIDkuNzM0MDEgNDYuNTMxNCA5LjgyMjcgNDYuMDM5M0M5LjkwOTgxIDQ1LjU1NTkgMTAuMjc1OSA0NC45OTc3IDExLjIxNSA0NC40NTMxWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+Cjwvc3ZnPgo=);
                  mask-image: url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1NiIKICBoZWlnaHQ9IjU2IgogIHZpZXdCb3g9IjAgMCA1NiA1NiIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogICAgPHBhdGgKICAgIGQ9Ik0zMy4wMjUzIDIwLjA2MDhMMzYuMzA3NSAyMC4zMzkiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yMi43NTE3IDIwLjA2MDhMMTkuNDY5NSAyMC4zMzkiCiAgICBzdHJva2U9ImN1cnJlbnRDb2xvciIKICAgIHN0cm9rZS13aWR0aD0iMiIKICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0yNi43NzE2IDI2Ljk3TDI4LjU1MTIgMjUuNzE3OEMyOC44MTE1IDI1LjUzNDYgMjguODgwOCAyNS4xNjQ5IDI4LjcyMzcgMjQuODc5NEMyNy45NDA3IDIzLjQ1NjYgMjcuNjQ1OCAyMi4wODM0IDI3LjcxNjQgMTkuOTQ5MyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTI1LjA4NjggMzIuMjAwN0MyNS4wODY4IDMyLjIwMDcgMjYuNDI1MSAzMi43NzM2IDI4LjE1OTEgMzIuNzczNkMyOS44OTMxIDMyLjc3MzYgMzEuMjMxMyAzMi4yMDA3IDMxLjIzMTMgMzIuMjAwNyIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM0LjMzNjYgMjIuNTI4N0MzNS4yOTA5IDIyLjUyODcgMzYuMDY0NSAyMi4zOTIgMzYuMDY0NSAyMi4yMjM0QzM2LjA2NDUgMjIuMDU0OCAzNS4yOTA5IDIxLjkxODEgMzQuMzM2NiAyMS45MTgxQzMzLjM4MjQgMjEuOTE4MSAzMi42MDg4IDIyLjA1NDggMzIuNjA4OCAyMi4yMjM0QzMyLjYwODggMjIuMzkyIDMzLjM4MjQgMjIuNTI4NyAzNC4zMzY2IDIyLjUyODdaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTIxLjMxMzQgMjIuNTI4N0MyMi4zNjU1IDIyLjUyODcgMjMuMjE4NSAyMi4zOTIgMjMuMjE4NSAyMi4yMjM0QzIzLjIxODUgMjIuMDU0OCAyMi4zNjU1IDIxLjkxODEgMjEuMzEzNCAyMS45MTgxQzIwLjI2MTIgMjEuOTE4MSAxOS40MDgyIDIyLjA1NDggMTkuNDA4MiAyMi4yMjM0QzE5LjQwODIgMjIuMzkyIDIwLjI2MTIgMjIuNTI4NyAyMS4zMTM0IDIyLjUyODdaIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTQxLjEwOSAxNi45NjAxVjE3LjYyNTlNMTcuNjM5OCAxMS4wNDlDMTQuNTI2MiAxMS4wNDg5IDE0LjUyNzUgMTQuMjEzNiAxNC41NTc3IDE1LjEzMzdWMTcuNjI1OU00MS4xMDkgMjQuNzYzNlYyNS43NzkyQzQxLjEwOSAzMi43Njc3IDM1LjE2NTMgMzguNDMzIDI3LjgzMzMgMzguNDMzQzIwLjUwMTQgMzguNDMzIDE0LjU1NzcgMzIuNzY3NyAxNC41NTc3IDI1Ljc3OTJWMjQuNzYzNk00MS4xMDkgMjQuNzYzNkM0MS4xMDkgMjQuNzYzNiA0My45MDk2IDI0LjI1MjEgNDMuOTA5NiAyMS4xOTQ4QzQzLjkwOTYgMTguNDYyNiA0MS4xMDkgMTcuNjI1OSA0MS4xMDkgMTcuNjI1OU00MS4xMDkgMjQuNzYzNlYxNy42MjU5TTE0LjU1NzcgMTcuNjI1OVYyNC43NjM2TTE0LjU1NzcgMTcuNjI1OUMxNC41NTc3IDE3LjYyNTkgMTEuNjQ3NiAxNy45NTExIDExLjY0NzYgMjEuMTk0OEMxMS42NDc2IDI0LjQ5NzYgMTQuNTU3NyAyNC43NjM2IDE0LjU1NzcgMjQuNzYzNiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTM2LjMyMjcgNC4wOTIxOVYzLjMzNjA2QzQxLjQ1OTUgMy4zMzYwNiA0MS44OTkxIDYuMTkyNTcgNDEuOTg2OSA3LjYyMDgyVjE3LjQwMDVDMzcuNTc2NiAxNy40MDA1IDM2LjM3MzEgMTQuNDkzNSAzNi4zMjI3IDEzLjA0MDFWOS4wMDc1N00zNi4zMjI3IDQuMDkyMTlWOS4wMDc1N00zNi4zMjI3IDQuMDkyMTlDMzEuMTk0NCAxLjc0ODEgMTkuODIzNiAtMS4wNjI1OSAxNS4zNDU2IDYuODM0NTZDMTQuNzI1MSA4LjA1MDMyIDE1LjE1NTkgOC4zMDU0NyAxNS4xNTU5IDguMzA1NDdNMzYuMzIyNyA5LjAwNzU3QzM0LjkyMjMgMTAuNDc3OSAzMS4xOTg2IDEzLjQ0MzcgMjcuNTA1NyAxMy41NDQ1QzIyLjg4OTYgMTMuNjcwNiAxOS44NTYyIDEwLjk5ODggMTYuOTAxOSAxMS4wNDkyQzE0LjUzODUgMTEuMDg5NSAxMy45NjUyIDExLjgwNTMgMTMuOTc0IDEyLjE1ODJDMTMuNjgzOCAxMS4wOTYgMTMuNjk3MSA5LjI4Nzk5IDE1LjE1NTkgOC4zMDU0N00xNS4xNTU5IDguMzA1NDdDMTUuNzc0NCA3Ljg4ODk3IDE2LjY1MjcgNy42MjA4MiAxNy44Nzc5IDcuNjIwODJDMjMuMDIxNSA3LjYyMDgyIDIyLjE3NzQgOS4zNjA0NCAyNi4yNjYgNi41MTIyNSIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAvPgogICAgPHBhdGgKICAgIGQ9Ik0zMS44NzQ4IDQyLjY4MzdDMzEuMzk0NCA0NC4yNTUyIDI5Ljg5IDQ1LjA3NDIgMjguMjIyIDQ1LjA2MkMyNi41MzcxIDQ1LjA0OTcgMjQuOTQzOSA0NC4xODY2IDI0LjM3ODUgNDIuNjYzN1YzOC4wMjIxQzI1LjY4NDIgMzguMzI3OCAyNi44MjQ5IDM4LjQ4NjMgMjguMDA1IDM4LjQ4NjRDMjkuMjA3NSAzOC40ODY1IDMwLjQyNTggMzguMzIyIDMxLjg3NDggMzguMDA1MVY0Mi42ODM3WiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+CiAgICA8cGF0aAogICAgZD0iTTExLjIxNSA0NC40NTMxQzEzLjA4MyA0My4zNjk4IDE2LjgzNzggNDIuNTY5NyAyMy4yMDM4IDQyLjUzMTlDMjQuMTE1MiA0NC41MiAyNi4yMjg1IDQ1LjQ5NDcgMjguMjExNiA0NS41MDkyQzMwLjE4MTEgNDUuNTIzNiAzMi4yNDk0IDQ0LjU4ODUgMzMuMDc1NyA0Mi41MzE5QzM2LjI3IDQyLjU1MDUgMzguODE5MSA0Mi43NDc5IDQwLjgwOTMgNDMuMDc1OUM0Mi45MTE1IDQzLjQyMjMgNDQuMzQ3MiA0My45MDc2IDQ1LjI1NjcgNDQuNDQ5MUM0Ni4xNTkxIDQ0Ljk4NjMgNDYuNDY0NyA0NS41MjU1IDQ2LjUxMTIgNDUuOTg1NkM0Ni41NjA2IDQ2LjQ3NDQgNDYuMzQyOSA0Ny4wOTc1IDQ1LjcyMzUgNDcuODM1MUM0NC40ODMzIDQ5LjMxMjEgNDEuOTM5OSA1MC44NzI4IDM4LjcyODYgNTIuMDY2OEMzNS41MzkzIDUzLjI1MjYgMzEuNzg4OCA1NC4wNDAxIDI4LjIxNjcgNTQuMDQwMUMyNC4yNjU5IDU0LjA0MDEgMjAuMzc3OSA1My4yNDk4IDE3LjE4NCA1Mi4wNjY1QzEzLjk2MzUgNTAuODczMyAxMS41NDk3IDQ5LjMxODMgMTAuNDQ0OSA0Ny44NjIxQzkuODk4NTEgNDcuMTQyIDkuNzM0MDEgNDYuNTMxNCA5LjgyMjcgNDYuMDM5M0M5LjkwOTgxIDQ1LjU1NTkgMTAuMjc1OSA0NC45OTc3IDExLjIxNSA0NC40NTMxWiIKICAgIHN0cm9rZT0iY3VycmVudENvbG9yIgogICAgc3Ryb2tlLXdpZHRoPSIyIgogIC8+Cjwvc3ZnPgo=);
        }
        
        #getid-main .GiCommand-feedbackIcon {
          position: relative;
          width: 40px;
          min-width: 40px;
          max-height: 40px;
        }
        
        #getid-main .getid-success,
        #getid-main .GiCommand-feedbackIcon.getid-success {
          color: var(--gi-success-color);
        }
        
        #getid-main .getid-warning,
        #getid-main .GiCommand-feedbackIcon.getid-warning {
          color: var(--gi-warning-color);
        }
        
        #getid-main .getid-error,
        #getid-main .GiCommand-feedbackIcon.getid-error {
          color: var(--gi-error-color);
        }
        
        #getid-main .GiChangeDevice {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          width: 100%;
          padding: 24px 48px;
          gap: 24px;
        }
        
        #getid-main .GiChangeDevice-button {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: calc(50% - 12px);
          height: 260px;
          padding: 12px;
          border: 1px solid var(--gi-outline-color);
          border-radius: 8px;
          cursor: pointer;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiChangeDevice-button:hover {
          background: var(--gi-foreground);
        }
        
        #getid-main .GiChangeDevice-badge {
          position: absolute;
          top: -15px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          margin: 0 auto;
          padding: 8px 12px;
          color: var(--gi-on-feedback-color);
          background: var(--gi-success-color);
          border-radius: 4px;
        }
        
        #getid-main .GiChangeDevice-icon {
          color: var(--gi-secondary-color);
        }
        
        #getid-main .GiChangeDevice-title {
          margin-top: 16px;
          color: var(--gi-text-primary-color);
        }
        
        #getid-main .GiChangeDevice-description {
          margin-top: 8px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiAudio {
          display: none;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          gap: 16px;
        }
        
        #getid-main .GiAudio-text {
          text-align: right;
          color: var(--gi-text-secondary-color);
          white-space: nowrap;
        }
        
        #getid-main .GiSwitcher {
          position: relative;
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -ms-flex-negative: 0;
              flex-shrink: 0;
          width: 50px;
          height: 32px;
        }
        
        #getid-main .GiSwitcher-hiddenInput {
          display: none;
        }
        
        #getid-main .GiSwitcher-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color: var(--gi-text-secondary-color);
          background-color: var(--gi-foreground);
          border-radius: 34px;
          cursor: pointer;
        }
        
        #getid-main .GiSwitcher-thumb {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          width: 28px;
          height: 28px;
          background-color: var(--gi-background-color);
          border-radius: 50%;
          -webkit-transition: var(--gi-transition);
          -o-transition: var(--gi-transition);
          transition: var(--gi-transition);
        }
        
        #getid-main .GiSwitcher-hiddenInput:checked + .GiSwitcher-track {
          color: var(--gi-success-color);
          background-color: var(--gi-success-color);
        }
        
        #getid-main .GiSwitcher-hiddenInput:focus + .GiSwitcher-track {
          -webkit-box-shadow: 0 0 1px var(--gi-success-color);
                  box-shadow: 0 0 1px var(--gi-success-color);
        }
        
        #getid-main .GiSwitcher-hiddenInput:checked + .GiSwitcher-track .GiSwitcher-thumb {
          -webkit-transform: translateX(18px);
              -ms-transform: translateX(18px);
                  transform: translateX(18px);
        }
        #getid-main .GiLivenessGuide-container {
          max-height: calc(var(--gi-inner-height-desktop) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
        }
        
        @media screen and (max-device-width: 1024px) {
          #getid-main .GiLivenessGuide-container {
            max-height: calc(var(--gi-inner-height-mobile) - var(--gi-inner-height-header) - var(--gi-inner-height-footer));
          }
        }
        
        #getid-main .GiLivenessGuide-text {
          padding: 16px 16px 8px;
          color: var(--gi-text-secondary-color);
        }
        #getid-main .GiThankYou {
          color: var(--gi-text-primary-color);
          gap: 16px;
        }
        
        #getid-main .GiThankYou-image {
          display: block;
          width: 96px;
          height: 96px;
        }
        #getid-main .GiChooseCountryAndDocType {
          position: static;
          -webkit-box-pack: start;
              -ms-flex-pack: start;
                  justify-content: flex-start;
          padding-top: 24px;
        }
        
        #getid-main .GiChooseCountryAndDocType-container {
          width: 300px;
        }
        /* ----------- GetID variables --------- */
        
        /* ----------- Reset CSS --------- */
        
        /* ----------- Reusable modules --------- */
        
        /* ----------- Design system --------- */
        
        /* ----------- Components local modules --------- */
        
        /* ----------- Layouts local modules --------- */
    </style>