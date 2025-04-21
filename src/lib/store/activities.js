import { writable} from "svelte/store"

let _error = null
export let error = writable(_error)

let _success = null
export let success = writable(_success)

let _message = []

export let message = writable(_message)

let _loading = false
export let loading = writable(_loading)

let _isLoggin = false
export let isLoggin = writable(_isLoggin)

let _isLiveStat = false
export let isLiveStat = writable(_isLiveStat)

export const handleResposeMessages = ((type, res)=>{
    message.set([{type: type, message: res}])
    loading.set(false)
    setTimeout(()=>{
        message.set([])
    },14000)
})