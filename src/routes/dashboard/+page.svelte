<script> 
    import CollectionsList from "../../lib/components/CollectionsList.svelte";
    import Header from "../../lib/components/Header.svelte";
    import { currentPage, isAuthenticated, user } from "../../lib/stores.mjs";
    import { onMount } from "svelte";
    import { createClient } from "../../lib/authServices.mjs";

    let client;

    onMount(async () => {
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());
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