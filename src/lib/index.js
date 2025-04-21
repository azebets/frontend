import axios from "axios"
import { serverUrl } from "$lib/backendUrl";
import { handleResposeMessages, loading , isLoggin} from "$lib/store/activities";
import { user } from "$lib/store/profile";
import { changeotp } from "$lib/store/routes";
import { handleIsLogout } from "$lib/auth/hook"
import { browser } from '$app/environment';
import { handleAuthToken } from "$lib/store/routes";
import { coin_list, default_Wallet } from "$lib/store/coins";
import { goto } from "$app/navigation"

const handleAuthHeader = (()=>{
    let auth;
    handleAuthToken.subscribe((token) => {
        auth = token
    })
    return auth
})

export const handleUserProfile = (async(id)=>{
    let respose = ""
    await axios.get(`${serverUrl()}/api/profile/user-id/${id}`)
    .then((res)=>{
        respose = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return respose
})

export const handleProfile = (async(auth)=>{
    let response = ""
    loading.set(true)
    await axios.get(`${serverUrl()}/api/profile/user`,{
        headers:{
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        loading.set(false)
        isLoggin.set(true)
        user.set(response?.user)
        let wallet = response?.wallet
        coin_list.set(wallet)
        wallet.forEach(element => {
            if(element.is_active){
                default_Wallet.set(element)
            }
        });
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        handleIsLogout()
    })
})

export const handleChangePassword = (async(pass,id)=>{
    let response = ""
    let isLoading = true
    await axios.get(`${serverUrl()}/auth/password/${id}`,{
        password:pass
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success","Password changed")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {response, isLoading}
})

export const handleChangeEmailOtp = (async(id, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/email-top/${id}`,{
        emails: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        browser &&  sessionStorage.setItem('change-email', JSON.stringify(response));
        handleResposeMessages("success","Code is sent to your old email")
        changeotp.set(response)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {isLoading, response}
})

export const handleChangeEmail = (async(id, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/email/${id}`,{
        data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        user.set(response)
        browser && sessionStorage.removeItem("change-email");
        changeotp.set("")
        handleResposeMessages("success","Email changed successfully")
        setTimeout(()=>{
            handleResposeMessages("success","Verify your new Email")
            goto("/verification")
        },20000)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        isLoading = false
    })
    return {isLoading, response}
})

export const handleFetchLoginType = (async(auth)=>{
    let response = ""
    loading.set(true)
    await axios.get(`${serverUrl()}/api/profile/fetch-loginType`,{
        headers:{
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
})

export const handleGenerateSecrete = (async(email)=>{
    let response = ""
    loading.set(true)
    await axios.get(`${serverUrl()}/auth/generate-secret/${email}`)
    .then((res)=>{
        response = res.data
         loading.set(false)
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
})


export const handleverifyFA_Token = (async({token, secret}, id)=>{
    let response = ""
    loading.set(true)
    await axios.post(`${serverUrl()}/auth/verify-token/${id}`,{
        token, secret 
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
         handleResposeMessages("success","Two factor Authentication Enabled")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        loading.set(false)
    })
    return response
})

export const handleDeleteAuthentication = (async(token, id)=>{
    let response = ""
    loading.set(true)
    await axios.post(`${serverUrl()}/auth/delete-token/${id}`,{
         token
    })
    .then((res)=>{
        response = res.data
         loading.set(false)
         handleResposeMessages("success","Two factor Authentication Disabled")
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
         loading.set(false)
    })
    return response
})

export const handleChangeProflePicture = (async(image, auth)=>{
    let response = ""
    let error ;
    loading.set(true)
    await axios.post(`${serverUrl()}/api/profile/change-profile-img`,{
        image
    },{
        headers:{
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
         handleResposeMessages("success","Profile Picture changed")
         loading.set(false)
    })
    .catch((err)=>{
        console.log(err)
        error = err.response
        loading.set(false)
        handleResposeMessages("error", err.response?.data)
    })
    return {response, error}
})

export const fetchVistorsDevice = (async()=>{
    let response = ""
    await axios.get(`https://ipinfo.io/json?token=0d65c9c7910c63`)
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
})

export const createRefCode = (async(auth, code)=>{
    let response = ""
    let load = true
    await axios.post(`${serverUrl()}/api/profile/create-referralcode`,{
        code 
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Referral code created")
        load = false
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
        load = false
    })
    return {response, load}
})

export const referralCode = (async(auth)=>{
    let response = ""
    await axios.get(`${serverUrl()}/api/profile/referralcode`,{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
})

export const regsterReferralCode = (async(auth, code)=>{
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/register-referralcode`,{
        code
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
})

export const fetchSumsub = async(auth)=>{
    let response = ""
    await axios.get(`${serverUrl()}/api/profile/fetch-token`,{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
}

export const updateVerifiedStatus = (async(status)=>{
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/update-verify`,{
        status
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=>{
        handleResposeMessages("error", err.response?.data)
    })
    return response
})

export const handleEMailChange = (async(auth, emails)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/api/profile/check-email`,{
        emails
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handleChangeDefaultWallet = (async(auth, data)=>{
    let response = ""
    let isLoading = true
    if(data.coin_name === "Cyclix Points"){
        isLoading = false
        handleResposeMessages("error", "Wallet is view only, Select other wallet")
        return {response, isLoading}
    }
    await axios.post(`${serverUrl()}/api/profile/change-defaultwallet`,{
        data
    },
    {
    headers: {
        Authorization: `Bearer ${auth}`
    }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})


export const fetchWallet = (async(event)=>{
    let response = ""
    let isLoading = true
    await axios.get(`${serverUrl()}/api/profile/wallet/${event}`,{
        headers: {
            Authorization: `Bearer ${handleAuthHeader()}`
        }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return response
})