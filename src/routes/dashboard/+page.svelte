<script>
    import CollectionsList from "../../lib/components/CollectionsList.svelte";
    import CollectionsView from "../../lib/components/CollectionsView.svelte";
    import Header from "../../lib/components/Header.svelte";
    import { currentPage, isAuthenticated, user, token, currentCollection } from "../../lib/stores.mjs";
    import { onMount } from "svelte";
    import { createClient } from "../../lib/authServices.mjs";
    import MobileMenu from "../../lib/components/MobileMenu.svelte";

    let client;

    onMount(async () => {
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());

        if(!$isAuthenticated){
            window.location.href = "/";
        }else{
            currentCollection.set("All Media");
            currentPage.set("dashboard");
        }
    })
</script>
<div id="dashboard">
    <Header />
    {#if $isAuthenticated}
    <div id="main-content">
        <CollectionsList />
        <CollectionsView />
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
    @media screen and (max-width:800px){
        #main-content{
            flex-direction: column;
        }
    }
</style>