import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { serverUrl } from "$lib/backendUrl";
import { handleResposeMessages,  loading , isLoggin} from "$lib/store/activities";
import { coin_list } from "$lib/store/coins";
import { user } from "$lib/store/profile";
import { browser } from '$app/environment';
import { handleAuthToken, otp } from "$lib/store/routes";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfiguration } from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = firebaseConfiguration()
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const handleIsLogin = ((response)=>{
    handleAuthToken.set(response?.token)
    user.set(response?.user)
    coin_list.set(response?.wallet)
    browser && localStorage.setItem("drr", JSON.stringify(response?.token));
    loading.set(false)
    location.href = "/"
})

const handleGoogleAuthentication = (async(data)=>{
    let response = ""
    loading.set(true)
    await axios.post(`${serverUrl()}/auth/google`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        handleIsLogin(response)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleGoogleAuth = (async(device)=>{
    let response = "";
    loading.set(true);
    const auth = getAuth(app);
await signInWithPopup(auth, new GoogleAuthProvider())
    .then(async(res)=>{
        let user = res?.user
        response = await handleGoogleAuthentication({...user, device})
    })
    .catch((err)=>{
        handleResposeMessages("error",err.code.slice(5))
    })
    return response
})

export const handleIsLogout = (()=>{
    browser && localStorage.removeItem("drr");
    loading.set(false)
    isLoggin.set(false)
    browser && sessionStorage.removeItem("change-email");
    browser && sessionStorage.removeItem("otp");
    browser &&  sessionStorage.setItem('password', false);
    location.href = "/"
})

export const useSignupHook = (async(data)=> {
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/signup`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        handleIsLogin(response)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
}) 

export const handleLoginUser = (async(data)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/login`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        if(!response?.type){
            handleIsLogin(response)
        }
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleKYCverification1 = (async(data, auth)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/kyc-step1`,{
        auth: data
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Level 1 submitted successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleChangeUsername = (async(data, auth)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/username`,{
        username: data
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Username updated successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
        loading.set(false)
    })
    return response
})

export const handleChangeProfilePrivacy = (async(data, auth)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/privacy`,{
        private: data
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Your profile visibility is updated")
        user.set(response)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleLinkEmail = (async(data, auth)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/link-email`,{
        email: data
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Your email is linked to google successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleCreateOtp = (async(auth)=>{
    let response = ""
    await axios.get(`${serverUrl()}/api/profile/create-otp`,{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","Check your email for the one-time password")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})


export const handleVerifyEmail = (async(code, token, auth)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/api/profile/verify-email`,{
        code, token
    },{
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
    .then((res)=>{
        response = res.data
        user.set(response)
        handleResposeMessages("success","Your email is verified successfully")
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})


export const handleGoogleLink = (async(authi)=>{
    let response = "";
    loading.set(true);
    const auth = getAuth(app);
    await signInWithPopup(auth, new GoogleAuthProvider())
    .then(async(res)=>{
        response = await handleLinkEmail(res.user?.email, authi)
    })
    .catch((err)=>{
        handleResposeMessages("error",err.code.slice(5))
    })
    return response
})

export const handleSetGooglePassword = (async(auth, id)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/set-password/${id}`,{
        auth
    })
    .then((res)=>{
        response = res.data
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handleCreateNewPassword = (async(auth, id)=>{
    loading.set(true)
    let response = ""
    await axios.post(`${serverUrl()}/auth/create-password/${id}`,{
        auth
    })
    .then((res)=>{
        response = res.data
        handleResposeMessages("success","New password created successfully")
        setTimeout(()=>{
            handleIsLogout()
        },3000)
    })
    .catch((err)=> {
        handleResposeMessages("error",err.response?.data)
    })
    return response
})

export const handlePasswordValidation = (async(auth, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/api/profile/verify-password`,{
        auth: data
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

export const handlePasswordChange = (async(auth, data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/api/profile/change-password`,{
        auth: data
    },{
    headers: {
        Authorization: `Bearer ${auth}`
    }
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success","New password set successfully")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handleRequestForgetPassword = (async(data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/request-forget-password`,{
        email: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success", "Enter code from your email.")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})

export const handleResetPassword = (async(data)=>{
    let response = ""
    let isLoading = true
    await axios.post(`${serverUrl()}/auth/reset-password`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        isLoading = false
        handleResposeMessages("success", "You successfully reset your password.")
    })
    .catch((err)=>{
        isLoading = false
        handleResposeMessages("error", err.response?.data)
    })
    return {response, isLoading}
})