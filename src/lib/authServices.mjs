import { createAuth0Client } from "@auth0/auth0-spa-js"
import { isAuthenticated, user, popupOpen } from "./stores"

export async function createClient() {
    const client = await createAuth0Client({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        cacheLocation: "localstorage"
    })
    return client;
}

export async function loginWithPopup(client) {
    try {
        popupOpen.set(true);
        let result = await client.loginWithPopup();
        user.set(await client.getUser() || null);
        isAuthenticated.set(true);
    } catch (error) {
        console.log(error);
    } finally {
        popupOpen.set(false);
        window.location.href = "/dashboard";
    }
}

export function logout(client) {
    client.logout();
    isAuthenticated.set(false);
    user.set(null);
}