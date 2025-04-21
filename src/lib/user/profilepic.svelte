<script>
    import { handleChangeProflePicture } from "$lib/index";
   import { url } from "$lib/store/routes";
   import { user } from "$lib/store/profile";
   import { goto } from "$app/navigation";
   import Loader from "$lib/loader.svelte";
   import { handleAuthToken } from "$lib/store/routes";
    export let _user
    $: activeImge = _user?.profileImg || ""
    let Images = [
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390192/avatar55_rtiys4.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390141/avatar44_ncyqcw.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720398516/avatar1_l6garj.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720398515/avatar2_ztgal3.png", active: true},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390128/avatar11_fbdw02.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390124/avatar33_gnrkq8.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720389924/avatar66_daptmu.png", active: false},
    { img: "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720389880/avatar88_enyz9d.png", active: false},
]
const handleUpdateImage = (async(event)=>{
      Images.forEach(element => {
         if(element.img === event.img){
            activeImge = element.img
            element.active = true
            Images = Images
         }else{
            element.active = false
         }
      });
   })

let image;
let imageUrl = '';
const previewImage = (event) => {
   const file = event.target.files[0];
   if (file) {
   const reader = new FileReader();
   reader.onload = (e) => {
      imageUrl = e.target.result;
      activeImge = imageUrl
   };
   reader.readAsDataURL(file);
   }
};

let loadImage = false
   const handleSaved = (async()=>{
      loadImage = true
         const {response} = await handleChangeProflePicture(activeImge, $handleAuthToken)
         if(response){
            user.set(response)
            goto($url)
            loadImage = false
         }
      loadImage = false
   })

</script>


<div class="crop-area" aria-disabled="false">
    <div data-testid="container" class="reactEasyCrop_Container">
        <img alt="" class="reactEasyCrop_Image reactEasyCrop_Contain" src="{activeImge}" style="transform: translate(0.46875px, 0px) rotate(0deg) scale(0.9375);">
        <div data-testid="cropper" class="reactEasyCrop_CropArea reactEasyCrop_CropAreaGrid croped-area" style="width: 300px; height: 300px;"></div>
    </div>
    <button  class="upload flex-center">
        <svg fill="#000000" style="width: 20px; height: 20px" class="sc-gsDKAQ hxODWG icon" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
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
    <input type="file"  on:change={previewImage} bind:this={image}>
    </button>
    <div class="pan-info flex-center">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_Gesture"></use>
        </svg>
    </div>
</div>

<div class="wrap-box">
    <div class="sc-ezbkAF kDuLvp input sc-kMyqmI blhZRw avatar-selecter">
        <div style="margin: 10px 0;" class="input-label">Default Avatar</div>
        <div class="buttons">
            {#each Images as img}
                <button on:click={()=> handleUpdateImage(img)} class="{img?.active ? "active" : ""}" style="opacity: 1; transform: none;">
                    <img alt="" src="{img?.img}">
                </button>
            {/each}
        </div>
    </div>
    <button disabled={loadImage} on:click={handleSaved} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal">
        <div class="button-inner">
            Submit
            {#if loadImage}
                <Loader />
            {/if}
        </div>
    </button>
</div>