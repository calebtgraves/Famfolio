<script>
    import { currentPage, isAuthenticated, user } from "../stores.mjs";
    import { createClient, loginWithPopup, logout } from "../authServices.mjs";
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

{#if $isAuthenticated}
<div id="logout-box">
    <p>{$user?.name}</p>
    {#if $currentPage == "home"}
    <a href="/dashboard">
        <button class="account-button">Dashboard</button>
    </a>
    {/if}
    <button class="account-button" on:click={ handleLogout }>Log Out</button>
</div>
{:else}
<button class="account-button" on:click={ handleLogin }>Log In</button>
{/if}

<style>
    .account-button {
        transition:.2s ease-in-out;
        margin:.5rem;
    }

    .account-button:hover {
        background-color: #5E0B15;
        filter:brightness(75%);
    }

    #logout-box{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    #logout-box p{
        margin-right:1rem;
        color:#fffce8;
    }
</style>