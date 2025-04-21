import { writable} from "svelte/store"

let route = ""
export let routes = writable(route)

let authToken = ''
export let handleAuthToken = writable(authToken)

let _tab = ""
export let tab = writable(_tab)

let _seaser = []
export let seaser = writable(_seaser)

let _otp = ""
export let otp = writable(_otp)

let _Changeotp = ""
export let changeotp = writable(_Changeotp)

let _url = ""
export let url = writable(_url)