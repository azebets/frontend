import { writable } from "svelte/store";

let sjbjb = false
export let screen = writable(sjbjb)

let newScreenEL = 0 
export let newScreen = writable(newScreenEL)
