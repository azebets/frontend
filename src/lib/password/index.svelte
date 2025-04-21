<script>
    import { browser} from '$app/environment';
    import { createEventDispatcher } from "svelte";
    import { device } from "$lib/store/profile";
    const dispatch = createEventDispatcher()
    let password = "Keys2541?"
    $: pass = ""
    $: error = null
    $: isLoading = false
    $: country = ""

const handleSubmit = (()=>{
    isLoading = true
    if(pass === password){
        setTimeout(()=>{
            isLoading = false
            browser &&  sessionStorage.setItem('password', true);
            dispatch("close")
        },2000)
    }else{
        setTimeout(()=>{
            error = "Incorrect password"
            isLoading = false
            setTimeout(()=>{
                error = ""
            },5000)
        },2000)
    }
})

$:{
    let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    if($device?.country){
        let ress = $device?.country
        let res = regionNamesInEnglish?.of(ress)
       country = res
    }
}

</script>

<form action="" on:submit|preventDefault={handleSubmit}>
    <div class="keoirns Wenen">
        <div class="title" style="font-size: 13px"> This website is available in your country: <span>{country}</span> <br><br>
        You are using:<span style="color: green;">{$device?.timezone}</span>{$device?.timezone ? "Timezone" : "Network"}  <br>
       </div>
        <input type="password" placeholder="Enter website password" bind:value={pass}>
        <div style="padding: 5px; color: red">{error || ""}</div>
        <button on:click={handleSubmit}>{isLoading ? "Validating Password...." : "Proceed"}</button>
    </div>
</form>



<style>
.Wenen{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    background: #1a1d29;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100000000000000000;
}
.title{
    width:50%;
    padding: 10px;

    color: #ffff;
    font-weight: bold;
}
.title span{
    color: palevioletred;
    padding: 10px;
}
.Wenen input {
    width: 50%;
    padding: 18px;
    border-radius: 30px;

    font-weight: bold;
    color: black;
}
button{
    background: palevioletred;
    padding: 18px;
    margin: 20px;
    width: 50%;
    color: #ffff;
    border-radius: 30px;
}

@media only screen and (max-width: 700px){
.title{
    width: 90%;
    padding: 10px;
    color: #ffff;
    font-weight: bold;
}
.title span{
    color: palevioletred;
    padding: 10px;
}
.Wenen input {
    width: 90%;
    padding: 18px;
    border-radius: 30px;
    font-weight: bold;
    color: black;
}
button{
    background: palevioletred;
    padding: 18px;
    margin: 20px;
    width: 90%;
    color: #ffff;
    border-radius: 30px;
}
}
</style>