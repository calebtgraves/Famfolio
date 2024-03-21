import { writable } from "svelte/store";

export const user = writable({name: ""})
export const popupOpen = writable(false)
export const isAuthenticated = writable(false)