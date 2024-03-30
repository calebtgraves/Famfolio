import { createAuth0Client } from "@auth0/auth0-spa-js"
import { isAuthenticated, user, popupOpen, token } from "./stores"

export async function createClient() {
    const client = await createAuth0Client({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        cacheLocation: "localstorage",
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE
        }
    })
    return client;
}

export async function loginWithPopup(client) {
    try {
        popupOpen.set(true);
        let result = await client.loginWithPopup();
        user.set(await client.getUser() || null);
        token.set(await client.getTokenSilently() || null)
        isAuthenticated.set(true);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error);
    } finally {
        popupOpen.set(false);
    }
}

export function logout(client) {
    client.logout();
    isAuthenticated.set(false);
    user.set(null);
}