<script> 
    import CollectionsList from "../../lib/components/CollectionsList.svelte";
    import CollectionsView from "../../lib/components/CollectionsView.svelte";
    import Header from "../../lib/components/Header.svelte";
    import { currentPage, isAuthenticated, user, token } from "../../lib/stores.mjs";
    import { onMount } from "svelte";
    import { createClient } from "../../lib/authServices.mjs";

    let client;

    onMount(async () => {
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());

        if(!$isAuthenticated){
            window.location.href = "/";
        }else{
            currentPage.set("dashboard");
            token.set(await client.getTokenSilently())
            console.log($token);
            let media = await fetch("https://famfolioapi.onrender.com/media",{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${$token}`
                }
            })
            media = await media.json()
            console.log(media[2]);
            let category = await fetch(`https://famfolioapi.onrender.com/category/${media[2].category_id[0]}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${$token}`
                }
            })
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
</style>