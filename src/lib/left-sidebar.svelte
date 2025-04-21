<script>
    import { browser} from '$app/environment';
    import { user } from "$lib/store/profile";
    import { isLoggin } from "$lib/store/activities"
    import { afterUpdate, tick , onMount} from "svelte";
    import { handleSocketConnection } from "$lib/socket/index";
    import { publicChat } from "$lib/store/profile";
    import "../styles/side-bar.css";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let sideHasExpand
    import { screen } from "$lib/store/screen";
    const badge = new URL('../lib/images/badges/bronze1.png', import.meta.url).href
 
 
let element;
let chatMessage = ""
const handleSendMessage = (async(e, name)=>{
    if ( (e.key === "Enter" && name.chatMessage) || e.type === "click" || e === "gifHit") {
      if (e.key === "Enter") {
         e.preventDefault();
      }
      if ($publicChat && element) {
        scrollToBottom(element);
      }
      let data = {
            msg_id: Math.floor(Math.random() * 230000000),
            user_id: $user.user_id,
            type: name.type,  
            text: name.chatMessage,
            gif: name.gif ? name.gif : ".",
            time: new Date(),
            profile: $user
        };
        const { handlePublicChat } = await handleSocketConnection()
        await handlePublicChat(data)
        chatMessage = ""
    }
})

let chatContainer;
onMount(() => {
  scrollToBottom();
});

afterUpdate(() => {
  scrollToBottom();
});

function scrollToBottom() {
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
$: settings = false
$: rules = false

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
<svelte:body
  on:keypress={() => handleSendMessage(event, { chatMessage, type: "normal" })}
/>
<div class="css-1o06751" style="padding-bottom: 0px; z-index: 3; width:{sideHasExpand}px;">
    <div class="css-ubfyk9">
        <div class="css-1knbux5" style="margin: 0px -6px 0px -8px;">
        {#if $screen > 750}
            <div class="css-7vo7yq">
                <div class="css-gtbrz1">
                    <div class="css-8j08p8">
                        <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="15" top="1" class="css-1p1hout">
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
                </div>
            </div>
            <div class="css-1xat6c" style="display: none;">
                <button on:click={()=> dispatch("expand")} class="css-lui29e">
                    <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" class="css-rrpfla">
                        <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                    </svg>
                </button>
                <button on:click={()=> dispatch("close")} class="css-lui29e">
                    <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" class="css-8adv44">
                        <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                    </svg>
                </button>
            </div>
            </div>
       
        <div class="css-17rman">
            <button on:click={()=> dispatch( sideHasExpand === 248 ? "expand" : "ellapse")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="21" class=" {sideHasExpand === 248 ? "css-18dge23" : "css-4pv6ck"}">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6C4 5.44772 4.44772 5 5 5H6C6.55228 5 7 5.44772 7 6V18C7 18.5523 6.55228 19 6 19H5C4.44772 19 4 18.5523 4 18V6Z" fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11.5C20 10.9477 19.5523 10.5 19 10.5L13 10.5C12.4477 10.5 12 10.9477 12 11.5L12 12.5C12 13.0523 12.4477 13.5 13 13.5L19 13.5C19.5523 13.5 20 13.0523 20 12.5L20 11.5Z" fill="currentColor"></path>
                    <path d="M14.1464 6.85355C14.4614 6.53857 15 6.76165 15 7.20711V16.7929C15 17.2383 14.4614 17.4614 14.1464 17.1464L9.35355 12.3536C9.15829 12.1583 9.15829 11.8417 9.35355 11.6464L14.1464 6.85355Z" fill="currentColor"></path>
                </svg>
            </button>
           
            <button on:click={()=> dispatch("close")}>
                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="20" class="css-14rbbvk">
                    <title>cross</title>
                    <g id="cross" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                    </g>
                </svg>
            </button>
        </div>
        {/if}
    </div>
        <div  class="css-1q1bjed">
            <div bind:this={chatContainer} class="css-1l4lam1" style="margin: 0px -12px 16px -8px;">
                <!-- <div class="css-1deqcht">
                    <div class="css-1xldb71" size="13">
                        <div size="19.5" class="css-bdgncd">
                            <img src="https://rollbit.com/static/Icon%203%20(gold)-Cz9Y9AJt.png" alt="" scale="1" class="css-1ago99h">
                        </div>
                        <div class="css-o3tivt" style="color: white; font-weight: 600;">SWEETBONANZA🍭:</div>
                    </div>
                    <span class="css-1yabdyt">
                        <span color="white" class="css-eder7j">@365fz</span> 
                        faken real
                    </span>
                </div> -->
                {#each $publicChat as chat}
                    <div class="css-1deqcht">
                        <div class="css-1lphp3s" size="14">
                            <button  size="21" class="css-1f0zcjv">
                                <img src="{chat.profile?.profileImg}" alt="" style="border-radius: 5px;" scale="0.96" class="css-zipauw">
                            </button>
                                <button class="css-o3tivt" style="color: white; font-weight: 600;">{chat.profile?.username}:</button>
                            </div>
                        <span class="css-1nmmrxo">{chat?.text}</span>
                    </div>
                {/each}

            </div>


            <label style="cursor: text; margin: 0px;">
                <div class="css-14c5l9t">
                    <div class="rollbit-chat-input rollbit-chat-input--multiLine" style=" ">
                        <div class="rollbit-chat-input__control">
                            <div class="rollbit-chat-input__highlighter" style="position: relative; box-sizing: border-box; width: 100%; color: transparent; overflow: hidden; white-space: pre-wrap; overflow-wrap: break-word; border: 1px solid transparent; text-align: start;"> </div>
                            <textarea autocomplete="off" disabled={200 - chatMessage.length === 0 ? true : false} bind:value={chatMessage} placeholder="{$isLoggin ? "Say something..." : "Log in to chat"}" readonly={$isLoggin ? false : true} class="rollbit-chat-input__input" style="display: block; width: 100%; position: absolute; margin: 0px; top: 0px; left: 0px; box-sizing: border-box; background-color: transparent; font-family: inherit; font-size: 11px; letter-spacing: inherit; padding:10px; height: 100%; bottom: 0px; overflow: hidden; resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            </label>

            <div class="css-7vf9my">
                <!-- <img src="data:image/png;base64,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" alt="feelsokayman" style="height: 20px; margin-right: 10px; cursor: pointer;"> -->
               <div use:clickOutsde={()=> settings = false}>
                    <button on:click={()=> settings = !settings}>
                        <svg  width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="13" class="css-vl9u4l" style="margin-right: 10px; cursor: pointer;">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M10,13.3338462 C8.15846154,13.3338462 6.66615385,11.8415385 6.66615385,10 C6.66615385,8.15846154 8.15846154,6.66769231 10,6.66769231 C11.8415385,6.66769231 13.3338462,8.15846154 13.3338462,10 C13.3338462,11.8415385 11.8415385,13.3338462 10,13.3338462 M19,8.32307692 L17.4553846,8.00769231 C17.3076923,7.97846154 17.1923077,7.86769231 17.1476923,7.72461538 C17.02,7.32153846 16.8569231,6.93076923 16.66,6.55692308 C16.5892308,6.42307692 16.5938462,6.26307692 16.6769231,6.13692308 L17.5476923,4.82153846 C17.8753846,4.32615385 17.8092308,3.66769231 17.3892308,3.24769231 L16.7523077,2.61076923 C16.3323077,2.19076923 15.6753846,2.12461538 15.18,2.45230769 L13.8630769,3.32461538 C13.7369231,3.40615385 13.5769231,3.41076923 13.4430769,3.34 C13.0692308,3.14307692 12.68,2.98153846 12.2753846,2.85384615 C12.1323077,2.80769231 12.0230769,2.69230769 11.9938462,2.54461538 L11.6769231,1.00153846 C11.5584615,0.418461538 11.0476923,0 10.4523077,0 L9.54769231,0 C8.95230769,0 8.44153846,0.418461538 8.32307692,1.00153846 L8.00615385,2.54461538 C7.97692308,2.69230769 7.86769231,2.80769231 7.72461538,2.85384615 C7.32,2.98153846 6.93076923,3.14307692 6.55692308,3.34 C6.42307692,3.41076923 6.26307692,3.40615385 6.13692308,3.32461538 L4.82,2.45230769 C4.32461538,2.12461538 3.66769231,2.19076923 3.24769231,2.61076923 L2.61076923,3.24769231 C2.19076923,3.66769231 2.12461538,4.32615385 2.45230769,4.82153846 L3.32307692,6.13692308 C3.40615385,6.26307692 3.41076923,6.42307692 3.34,6.55692308 C3.14307692,6.93076923 2.98,7.32153846 2.85230769,7.72461538 C2.80769231,7.86769231 2.69230769,7.97846154 2.54461538,8.00769231 L1,8.32307692 C0.418461538,8.44153846 0,8.95384615 0,9.54769231 L0,10.4523077 C0,11.0476923 0.418461538,11.56 1,11.6784615 L2.54461538,11.9938462 C2.69230769,12.0230769 2.80769231,12.1323077 2.85230769,12.2753846 C2.98,12.68 3.14307692,13.0707692 3.34,13.4430769 C3.41076923,13.5784615 3.40615385,13.7369231 3.32307692,13.8630769 L2.45230769,15.18 C2.12461538,15.6753846 2.19076923,16.3323077 2.61076923,16.7523077 L3.24769231,17.3892308 C3.66769231,17.8092308 4.32461538,17.8753846 4.82,17.5476923 L6.13692308,16.6769231 C6.26307692,16.5938462 6.42307692,16.5907692 6.55692308,16.66 C6.93076923,16.8584615 7.32,17.02 7.72461538,17.1476923 C7.86769231,17.1923077 7.97692308,17.3076923 8.00615385,17.4553846 L8.32307692,19 C8.44153846,19.5830769 8.95230769,20 9.54769231,20 L10.4523077,20 C11.0476923,20 11.5584615,19.5830769 11.6769231,19 L11.9938462,17.4553846 C12.0230769,17.3076923 12.1323077,17.1923077 12.2753846,17.1476923 C12.68,17.02 13.0692308,16.8584615 13.4430769,16.66 C13.5769231,16.5907692 13.7369231,16.5938462 13.8630769,16.6769231 L15.18,17.5476923 C15.6753846,17.8753846 16.3323077,17.8092308 16.7523077,17.3892308 L17.3892308,16.7523077 C17.8092308,16.3323077 17.8753846,15.6753846 17.5476923,15.18 L16.6769231,13.8630769 C16.5938462,13.7369231 16.5892308,13.5784615 16.66,13.4430769 C16.8569231,13.0707692 17.02,12.68 17.1476923,12.2753846 C17.1923077,12.1323077 17.3076923,12.0230769 17.4553846,11.9938462 L19,11.6784615 C19.5815385,11.56 20,11.0476923 20,10.4523077 L20,9.54769231 C20,8.95384615 19.5815385,8.44153846 19,8.32307692" fill="currentColor" fill-rule="nonzero"></path>
                            </g>
                        </svg>
                    </button>
                    {#if settings}
                    <div id="rollbit-modal-popover-container">
                        <div class="css-den4gc" style=" bottom: 4.5%; right:7%;">
                            <div class="css-rymlxq">
                                <div style="padding: 20px; font-size:12px;">
                                    <div>
                                        <input type="checkbox" id="proof-checkbox-22130" class="css-11eskem" checked="">
                                        <label for="proof-checkbox-22130" class="css-ep1r8t">
                                            <div class="css-1jwtohg"></div>
                                            <div style="font-size: 12px;">Show mention notifications<div style="font-size: 12px;">when chat is closed</div></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/if}
               </div>
               
              <div class="css-dnlyp1" use:clickOutsde={()=> rules = false}>
                <button on:click={()=> rules = !rules} class="css-dnlyp1">Rules</button>
                {#if rules}
                    <div id="rollbit-modal-popover-container">
                        <div class="css-1nfl9e5" style="height: 296.562px; max-height: 296.562px; bottom: 6%; right: 5%;">
                            <div class="css-rymlxq">
                                <ul class="css-8sz5vj">
                                <li>Do not harass or insult other users</li>
                                <li>Do not beg, ask for loans, trivias or tips</li>
                                <li>Do not insinuate Cyclix has bad intent ("scam site" etc)</li>
                                <li>Do not spam or post non-Cyclix links</li>
                                <li>Do not advertise any form of trading, buying or selling services</li>
                                <li>Do not share or advertise your referral code</li><li>Do not ask to become a staff member</li>
                                <li>English only</li>
                                <li>Respect mods, admins and other users</li>
                                <!-- <li>Enter "/" to see available chat commands</li> -->
                            </ul>
                        </div>
                    </div>
                    </div>
                {/if}
              </div>
              
                <div class="css-1r39q8v">{ 200 - chatMessage.length}</div>
                <button class="css-njm7gi" on:click={() =>  handleSendMessage(event, { chatMessage, type: "normal" })} disabled="{$isLoggin && chatMessage ? false : true}">Send</button>
            </div>
        </div>
    </div>
</div>






<style>
   
</style>