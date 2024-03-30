<script> 
    import CollectionsList from "../../lib/components/CollectionsList.svelte";
    import Header from "../../lib/components/Header.svelte";
    import { currentPage, isAuthenticated, user, token } from "../../lib/stores.mjs";
    import { onMount } from "svelte";
    import { createClient } from "../../lib/authServices.mjs";

    let client;

    onMount(async () => {
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());
        token.set(await client.getTokenSilently())
        console.log($token);
        let media = await fetch("https://famfolioapi.onrender.com/media",{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${$token}`
            }
        })
        console.log(await media.json())
        if(!$isAuthenticated){
            currentPage.set("dashboard");
            window.location.href = "/";
        }
    })
</script>
<div id="dashboard">
    <Header />
    {#if $isAuthenticated}
    <div id="main-content">
        <CollectionsList />
    </div>
    {/if}
</div>
<style>
    #dashboard{
        height:100%;
        display: flex;
        flex-direction:column;
    }
    #main-content {
        flex:1;
        display:flex;
    }
</style>