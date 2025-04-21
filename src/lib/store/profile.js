import { writable} from "svelte/store"

let _profile = null
export let user = writable(_profile)

let _publicChat = []
export let publicChat = writable(_publicChat)

let _device = []
export let device = writable(_device)