import React from 'react'
import { AppContext } from '../../context/AppContext'
import {assets} from "../../constants"

export default function Profile() {
    const { user } = React.useContext(AppContext)
    const [loading, setLoad] = React.useState(false)
<<<<<<< HEAD
    const [profileHidden, setProfileHidden] = React.useState(false)
=======
    const profileHidden = false
>>>>>>> 1251001df890a7e0310bfc41a4d1fa797e63215b
    const [showPrivateContent, setShowPrivateContent] = React.useState(false)
    const handlePrivacy = (e) => {
        // Handle privacy change
        console.log("Privacy changed:", e.target.checked)
        setProfileHidden(e.target.checked)
        setProfileHidden(e.target.checked)
    }
    const handleSaved = () => {
        // Handle save action
        console.log("Profile saved")
    }
    const loadImage = false
    const handleUpdateImage = (img) => {
        // Handle image update
        console.log("Image updated:", img)
    }
    const goto = (url) => {
        // Navigate to the specified URL
        console.log("Navigating to:", url)
    }
    const Images = [
        { img: "image1.jpg", active: false },
        { img: "image2.jpg", active: true },
        { img: "image3.jpg", active: false }
    ]
    const badge = "badge.jpg"
    const username = "User123"
    const track = false
    const isEdit = false


  return (
    <>
        <div className="css-59u6fd">
            <div className="Onkensldmd">
                <div size="70" className="css-1d8gn0m">
                    {/* <!-- {#if !isEdit} -->
                        <button on:click={()=> goto(`${$url === "/" ? "" : $url}/?tab=user&modal=profile&id=${$user?.user_id}`)} className="iWksniw">View</button>
                    <!-- {/if} --> */}
                    {/* {#if isEdit}
                        <button on:click={handleSaved} className=" button iWksniw css-vmbe4r">
                        {#if loadImage}
                        Loading
                            <Loader />
                        {:else}
                            Save
                        {/if}

                        </button>
                    {/if} */}

                    <img src={user?.profileImg}  style={{borderRadius: "50%"}} alt="" scale="0.96" className="css-zipauw" />
                    {/* {#if isEdit}
                        <button className="upload flex-center">
                        <svg fill="#000000" className="sc-gsDKAQ hxODWG icon" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 487 487" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
                                    M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
                                    v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
                                    M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
                                    M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/>
                                </g>
                            </g>
                        </svg>
                        <input type="file" />
                        </button>
                    {/if} */}

                </div>
                <div className="css-gm62cp">
                    <div className="css-1axkvbk">{user?.username}</div>
                    <div color="#E5A480" className="css-116wgzz" style={{background: "linear-gradient(90deg, rgb(229, 164, 128) {$user?.level}%, rgb(229, 164, 128) 0%, rgba(203, 215, 255, 0.1) 0%, rgba(203, 215, 255, 0.1) 100%)"}}></div>
                    <div className="css-jc7iyq">
                        <div className="css-or2cg1">
                            <span className="css-n08hzl">{user?.current_level}</span>
                        </div>
                        <div className="css-or2cg1">
                            <span className="css-n08hzl">Next:</span>
                            <div size="24" className="css-qvw6u0">
                                <img src={assets?.badge?.one} alt="Bronze 1" scale="0.72" className="css-10qm6dq"/>
                            </div>
                                <div color="#E5A480" className="css-63t63w">{user?.next_level}</div>
                                <span className="css-n08hzl">$10,000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {#if isEdit}
                    <div className="Jonmsene">
                        {#each Images as img}
                            <button on:click={()=> handleUpdateImage(img)}>
                            <img src="{img.img}" style={{borderRadius: "50%"}} alt="" scale="0.96" className="css-OMksnee {img.active && "active"}">
                            </button>
                        {/each}
                    </div>
                {/if} */}
            </div>

            <div className="css-t60dms">
                <h3 className="css-1vqlzbx">
                    <div style={{marginRight: "auto"}}>Get Started</div>
                </h3>
                <div onClick={()=> goto("/verification")} disabled={user?.emailIsVerified} className="css-14nbrtk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" size="15" className="css-1h2lco0" style={{marginRight: "10px"}}>
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"></path>
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path>
                    </svg>
                    <div style={{marginRight: "auto"}}>Verify your email</div>
                    <div className="css-ov1ktg">
                        {/* {#if !$user?.emailIsVerified}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" color="currentColor" xml:space="preserve" size="16" className="css-1hu26ay" style="color: {$user?.emailIsVerified ? "#72f238" : "#5E626F"}; margin-right: 8px;">
                            <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
                            </svg>
                        {/if} */}

                        {/* {#if $user?.emailIsVerified}
                            <div color="#72f238" className="css-l0mt26">
                            <svg enableBackground="new 0 0 229.5 229.5" viewBox="0 0 229.5 229.5" xmlns="http://www.w3.org/2000/svg" size="15" className="css-1h2lco0">
                                <path d="m214.419 32.12c-.412-2.959-2.541-5.393-5.419-6.193l-92.24-25.652c-1.315-.366-2.704-.366-4.02 0l-92.24 25.652c-2.878.8-5.007 3.233-5.419 6.193-.535 3.847-12.74 94.743 18.565 139.961 31.268 45.164 77.395 56.738 79.343 57.209.579.14 1.169.209 1.761.209s1.182-.07 1.761-.209c1.949-.471 48.076-12.045 79.343-57.209 31.305-45.217 19.1-136.113 18.565-139.961zm-40.186 53.066-62.917 62.917c-1.464 1.464-3.384 2.197-5.303 2.197s-3.839-.732-5.303-2.197l-38.901-38.901c-1.407-1.406-2.197-3.314-2.197-5.303s.791-3.897 2.197-5.303l7.724-7.724c2.929-2.928 7.678-2.929 10.606 0l25.874 25.874 49.89-49.891c1.406-1.407 3.314-2.197 5.303-2.197s3.897.79 5.303 2.197l7.724 7.724c2.929 2.929 2.929 7.678 0 10.607z"></path>
                            </svg>
                            <span>
                                Completed
                            </span>
                            </div>
                        {/if} */}
                        <div>{user?.emailIsVerified ? "" : "Pending"}</div>
                    </div>
                </div>

                <button  onClick={()=> goto("/account/profile?tab=wallet&modal=deposit")} className="css-kbw4iw">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" size="18" left="-1.5" className="css-vp6koe" style={{marginRight: "8.5px"}}>
                        <path d="M2.63502 4.52031C1.41936 5.72796 0.666687 7.40109 0.666687 9.25002C0.666687 12.9319 3.65146 15.9167 7.33335 15.9167C8.50568 15.9167 9.60732 15.6141 10.5645 15.0827C6.0092 15.028 2.33338 11.3183 2.33338 6.75002C2.33338 5.97775 2.43843 5.23001 2.63502 4.52031Z" fill="currentColor"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.6667 13.4167C14.3486 13.4167 17.3333 10.4319 17.3333 6.75001C17.3333 3.06811 14.3486 0.0833435 10.6667 0.0833435C6.98478 0.0833435 4.00002 3.06811 4.00002 6.75001C4.00002 10.4319 6.98478 13.4167 10.6667 13.4167ZM12.1195 5.45927C11.9121 5.45927 11.8343 5.38149 11.8343 5.17408V4.94075C11.8343 4.5389 11.4065 4.39631 10.6676 4.39631C9.88987 4.39631 9.50098 4.5389 9.50098 4.92779V5.09631C9.50098 5.35556 9.73431 5.48519 9.95468 5.53705L12.1065 6.09445C13.0917 6.35371 13.6232 6.79445 13.6232 7.49445V8.12964C13.6232 8.88149 13.0528 9.58149 11.601 9.80186V10.5796C11.601 10.813 11.5102 10.9167 11.2899 10.9167H10.1102C9.8769 10.9167 9.78616 10.813 9.78616 10.5796V9.81482C8.23061 9.63334 7.63431 8.89445 7.63431 8.1426V7.85742C7.63431 7.66297 7.71209 7.57223 7.93246 7.57223H9.04727C9.26764 7.57223 9.33246 7.66297 9.33246 7.85742V8.06482C9.33246 8.46668 9.85098 8.60927 10.6288 8.60927C11.4584 8.60927 11.9251 8.46668 11.9251 8.07779V7.85742C11.9251 7.62408 11.7436 7.49445 11.3028 7.37779L9.20283 6.80742C8.48987 6.61297 7.82875 6.09445 7.82875 5.36853V4.94075C7.82875 4.1889 8.30839 3.42408 9.78616 3.21668V2.4389C9.78616 2.20556 9.8769 2.10186 10.1102 2.10186H11.2899C11.5102 2.10186 11.601 2.20556 11.601 2.4389V3.21668C13.0399 3.43705 13.5325 4.1889 13.5325 4.94075V5.17408C13.5325 5.38149 13.4547 5.45927 13.2343 5.45927H12.1195Z" fill="currentColor"></path>
                    </svg>
                    <div style={{marginRight: "auto"}}>Deposit</div>
                    <div className="css-ov1ktg">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" color="currentColor" xmlSpace="preserve" size="16" className="css-1hu26ay" style={{color:" rgb(94, 98, 111)", marginRight: "8px"}}>
                        <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
                        </svg>
                        <div>
                        Pending
                        </div>
                    </div>
                </button>

                <button onClick={()=> goto("/")} className="css-kbw4iw">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="15" className="css-1h2lco0" style={{marginRight: "10px"}}>
                        <title>flower</title>
                        <g id="flower" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path d="M11.1103319,8.80541057 C10.7777387,8.5082608 10.3288405,8.40859572 9.91081919,8.5042931 C9.37279207,5.01695231 9.86300108,2.51405935 11.3814462,0.995614214 C13.9406401,-1.56357964 16.9149324,1.41071267 16.7929991,3.20700087 C18.5892873,3.08506763 21.5635796,6.05935993 19.0043858,8.61855378 C18.6719245,8.95101505 18.2922704,9.23418427 17.8654233,9.46806147 C16.2715767,8.71339414 14.1003628,8.60005956 11.361732,9.10822215 C11.3201036,9.03923462 11.2716521,8.97332542 11.2163639,8.91144257 L11.1103319,8.80541057 Z M11.17438,10.7571571 C11.490835,10.4163051 11.6092918,9.96009902 11.5275651,9.54008726 C15.0192436,8.90752505 17.5010366,9.32719767 18.972944,10.7991051 C21.4593839,13.285545 18.398063,16.346866 16.6045448,16.2766948 C16.674716,18.070213 13.6133951,21.1315339 11.1269551,18.645094 C10.7547013,18.2728401 10.4497497,17.8359926 10.2121005,17.3345515 C10.8276086,15.7449322 10.9188713,13.6856447 10.5011164,11.1644344 C10.7075297,11.1092114 10.904882,11.0057611 11.0751096,10.8543437 L11.17438,10.7571571 Z M9.16743077,8.9466649 C8.87015292,9.28087287 8.7577662,9.71963489 8.83224174,10.1262491 C5.32374517,10.7671735 2.83129992,10.3494388 1.35490601,8.87304487 C-1.13153393,6.38660494 1.92978699,3.32528402 3.72330521,3.39545519 C3.65313404,1.60193697 6.71445496,-1.45938395 9.20089489,1.02705598 C9.52392423,1.35008532 9.79627368,1.72175482 10.0179432,2.14206449 C9.21427304,3.76402573 9.03984555,5.94890673 9.47456491,8.6858076 C9.40098874,8.73223077 9.33063914,8.78609836 9.26461741,8.84739449 L9.16743077,8.9466649 Z M9.24111224,10.865511 C9.46842923,11.0732646 9.75172494,11.1872837 10.0428794,11.208262 C10.6531749,14.845832 10.1783997,17.4445399 8.61855378,19.0043858 C6.05935993,21.5635796 3.08506763,18.5892873 3.20700087,16.7929991 C1.41071267,16.9149324 -1.56357964,13.9406401 0.995614214,11.3814462 C1.45482642,10.922234 2.0040757,10.5570637 2.64336205,10.2859354 C4.22447349,10.9686331 6.3438909,11.0536929 8.99264768,10.558989 C9.03852252,10.6371584 9.0930546,10.7115012 9.15626345,10.7806622 L9.24111224,10.865511 Z" id="Shape" fill="currentColor" fillRule="nonzero"></path>
                        </g>
                    </svg>
                    <div style={{marginRight: "auto"}}>Play a game</div>
                    <div className="css-ov1ktg">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" color="currentColor" xmlSpace="preserve" size="16" className="css-1hu26ay" style={{color: "rgb(94, 98, 111)", marginRight: "8px"}}>
                        <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
                        </svg>
                        <div>Pending</div>
                    </div>
                </button>
            </div>

            <div className="css-t60dms">
                <h3 className="css-qgoclk">Profile Settings</h3>
                {/* <form on:submit|preventDefault={handleChangeUsernameHook}>
                    <div>
                        <label htmlFor="rollbit-field-11108" className="css-1vec8iw">Change Username</label>
                        <div>
                            <div className="css-1f51ttt">
                            <input type="text" name="name" placeholder="{$user?.username}" id="rollbit-field-11108" bind:value={username}>
                            <button className="css-vmbe4r button" disabled={track} type="submit" style="margin-right: 4px;">{ $loading ? "Loading..." : "Change"}</button>
                            </div>
                        </div>
                    </div>
                </form> */}

            <div className="css-18bcdcq">
                <div>
                    <input type="checkbox" id="proof-checkbox-11111"  className="css-11eskem" checked={profileHidden} onChange={(e)=> handlePrivacy(e)} />
                    <label htmlFor="proof-checkbox-11111" className="css-ep1r8t">
                        <div className="css-1jwtohg"></div>
                        Private profile
                    </label>
                </div>
                <button onClick={()=> setShowPrivateContent(!showPrivateContent)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" size="15" color="hsl(225.70000000000005, 15.6%, 58.8%)" className="css-1h2lco0" style={{marginLeft: "8px"}}>
                        <path d="M2.313 2.313A7.896 7.896 0 1 0 13.48 13.479 7.896 7.896 0 0 0 2.312 2.313zm5.9 1c.666 0 1.2.55 1.2 1.216a1.22 1.22 0 0 1-1.2 1.217c-.667 0-1.217-.55-1.217-1.234 0-.666.55-1.2 1.216-1.2zm1.716 8.15a.79.79 0 0 1-.167.283c-.433.45-.966.716-1.6.716-.3 0-.583 0-.883-.05-.483-.066-1.1-.666-1.017-1.3l.2-1.3c.134-.75.267-1.516.4-2.266 0-.05.017-.1.017-.15 0-.317-.1-.433-.416-.467-.134-.017-.267-.033-.4-.066-.15-.05-.234-.184-.217-.3.016-.134.1-.217.267-.25.083-.017.183-.017.283-.017h2.3c.283 0 .45.133.45.417 0 .233-.034.466-.084.7-.15.866-.316 1.716-.466 2.583-.05.283-.117.566-.15.85-.017.133 0 .283.033.416.05.184.184.284.367.267.15-.017.3-.066.45-.133.117-.05.216-.134.333-.167.2-.066.35.05.3.234z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </button>

                {/* {#if showPrivateContent}
                    <div id="rollbit-modal-popover-container">
                        <div className="css-29gh6u" >
                            <div className="css-1nrrr26">
                            After making your profile private, other users won't see your user name alongside bets, etc.
                            <div className="css-97vfs4" style={{left: "140px"}}></div>
                            </div>
                        </div>
                    </div>
                {/if} */}

                <span style={{paddingLeft: "20px"}}>{loading ? "Loading..." : ""}</span>
            </div>
        </div>

            <div className="css-t60dms">
                <h3 className="css-qgoclk">Link Account</h3>
                <div className="css-33jtgb">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" size="18" className="css-oluyn3" style={{marginRight: "12px"}}>
                        <path fill="#fa455e" d="M16 0a16 16 0 110 32 16 16 0 010-32z"
                        ></path>
                        <path
                        fill="#fff"
                        d="M19.5 12.3c-.5-.5-1.1-.9-1.8-1a4.8 4.8 0 00-2-.2c-.9 0-1.7.4-2.3 1a5 5 0 00-2 4 5 5 0 004 4.8 5 5 0 001.6 0c.8 0 1.6-.3 2.2-.7.5-.4 1-.9 1.2-1.4l.3-.9v-.2h-4.4v-3.2h7.5l.2.1.1 1v1.2c0 .5 0 1-.2 1.6v-.1a7.4 7.4 0 01-1.4 3 7 7 0 01-3 2.4h-.1c-.6.2-1.2.4-1.9.4a8.8 8.8 0 01-1.9 0c-.8 0-1.5-.1-2.2-.4-.9-.4-1.6-.8-2.3-1.4-1-.8-1.9-2-2.4-3.2l-.5-1.9v-1.4-.1c0-.9.2-1.7.4-2.5.3-.7.7-1.4 1.2-2 1-1.4 2.5-2.5 4.3-3l1.5-.3a11.1 11.1 0 011.3 0 7.7 7.7 0 014.8 2l-.1.3-2 2h-.1z"
                        ></path>
                    </svg>
                    <div style={{marginRight: "auto"}}>Google</div>
                    {/* {#if $user?.emailIsLinked}
                        <div className="css-ov1ktg">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" color="currentColor" xml:space="preserve" size="16" className="css-1hu26ay" style="color: {$user?.emailIsVerified ? "#72f238" : "#5E626F"}; margin-right: 8px;">
                            <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z"></path>
                            </svg>
                            <div>{$user?.emailIsVerified ? "Completed" : "Pending"}</div>
                        </div>
                    {:else}
                        <button disabled={$user?.emailIsLinked || $loading} on:click={handleLinkEmail} className="css-vmbe4r button" type="button">{$user?.emailIsLinked ?"connected" : "Connect"}</button>
                    {/if} */}

                </div>
            </div>

    </>
  )
}
