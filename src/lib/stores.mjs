import { writable } from "svelte/store";

export const user = writable({name: ""});
export const popupOpen = writable(false);
export const isAuthenticated = writable(false);
export const currentPage = writable();
export const token = writable();
export const myMedia = writable([]);
export const currentCollection = writable("");
export const currentUser = writable();