import { writable } from "svelte/store"

let default_walletEl = null
let _usd = null
let _fun_coupon = null
let coin_listEl = []

export let coin_list = writable(coin_listEl)
export let usd = writable(_usd)
export let fun_coupon = writable(_fun_coupon)
export let default_Wallet = writable(default_walletEl)