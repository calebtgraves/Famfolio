<script>
    import { isAuthenticated, user } from "../stores.mjs";
    import { createClient, loginWithPopup, logout } from "../authService.mjs";
    import { onMount } from "svelte";

    let client;

    onMount(async () => {
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());
    })

    function handleLogin() {
        loginWithPopup(client);
    }

    function handleLogout() {
        logout(client);
    }
</script>

<button class="account-button" on:click={ handleLogin }>Log In</button>