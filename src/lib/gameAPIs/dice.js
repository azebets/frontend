import {DiceEncription, dice_history,  HandleDicePoint, HandleHas_won, Handles_Loading} from '$lib/games/ClassicDice/store/index'
import axios from "axios"
import { default_Wallet } from "$lib/store/coins";
import { handleResposeMessages} from "$lib/store/activities";
import { serverUrl } from "$lib/backendUrl";

export const handleDiceGameEncrypt = (async(auth)=>{
    let response = ""
    let is_loading = true
    if(!auth){
        is_loading = true
        return
    }
    await axios.get(`${serverUrl()}/api/games/dice-game/encrypt`,{
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${auth}`
        }
    })
    .then((res)=>{
        is_loading = false
        response = res.data
        DiceEncription.set(res.data)
    })
    .catch((err)=>{
        is_loading = false
        console.log(err)
        handleResposeMessages("error",err.response?.data)
    })
    return is_loading 
})


export const DiceHistory = async(auth) => {
    let is_loading = true
    if(!auth){
        is_loading = false
        return
    }
  await axios.get(`${serverUrl()}/api/games/dice-game/dice-history`,{
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${auth}`
    }})
    .then((response)=>{
        dice_history.set(response.data)
    })
    .catch((err)=>{
        console.log(err)
        handleResposeMessages("error",err.response?.data)
    })
};

export const DiceBet = async(data, auth) => {
    let response = "";
    Handles_Loading.set(true);
    if(!auth){
        Handles_Loading.set(false);
        return
    }
    await axios.post(`${serverUrl()}/api/games/dice-game/bet`,{
        data
    },{
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${auth}`
        }
      })
    .then((res)=>{
        const fopp = res.data
        let wallet = {
            coin_name: fopp.token,
            coin_image: fopp.token_img,
            balance:  fopp.current_amount
         }
         default_Wallet.set(wallet)
        HandleDicePoint.set(fopp.cashout)
        if(fopp.has_won){
            HandleHas_won.set(true)
        }else{
            HandleHas_won.set(false)
        }
        Handles_Loading.set(false);
        response = fopp
    })
    .catch((err)=>{
        Handles_Loading.set(false);
        console.log(err)
    })
    return response 
};

export const handleDiceDetails = (async(data)=>{
    let loading = true
    let response = ""
    if(!data){
        loading = false
        handleResposeMessages("error", "Invalid Game ID")
        return { loading, response }
    }
    await axios.get(`${serverUrl()}/api/games/dice-game/historyByID/${data}`)
    .then((res)=>{
        loading = false
        response = res.data
    })
    .catch((err)=>{
        loading = false
        handleResposeMessages("error",err.response?.data)
    })
    return { loading, response }
})

export const handleSeedSettingAPI = (async(auth, {client, server,hash})=>{
    let response = ""
    let loading = true
    await axios.post(`${serverUrl()}/api/games/dice-game/seed-settings`,{
        client, server, hash
    },{
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${auth}`
        }
    })
    .then((res)=>{
        loading = false
        response = res.data
        DiceEncription.set(res.data)
        handleResposeMessages("success","New Seed Updated sucessfully")
    })
    .catch((err)=>{
        loading = false
      handleResposeMessages("error",err.response?.data)
    })
    return { loading, response }
})

export const GenerateSeed = (async(auth)=>{
    let load = true
    let response = ""
    await axios.get(`${serverUrl()}/api/games/dice-game/generate-seed`,{
        headers:{
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        load = false
        response = res.data
    })
    .catch((err)=>{
        load = false
      handleResposeMessages("error",err.response?.data)
    })
    return { load, response }
})

export const handleFetch = (async({server_seed, client_seed, nonce})=>{
    let load = true
    let result = ""
    await axios.post(`${serverUrl()}/api/games/dice-game/Verify-dice`,{
        server_seed, 
        client_seed,
        nonce
    })
    .then((res)=>{
        result = res.data
        load = false
    })
    .catch((err)=>{
        handleResposeMessages("error",err.response?.data)
        load = false
    })
    return { load, result }
})