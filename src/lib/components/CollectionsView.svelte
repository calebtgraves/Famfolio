<script>
    import { onMount } from "svelte";
    import MediaCard from "./MediaCard.svelte";
    import { isAuthenticated, token, user, myMedia, currentCollection, currentUser } from "../stores.mjs";
    import { createClient } from "../authServices.mjs";

    export let tabIndexCounter = 1; // set outside here and incremented within

    $:$myMedia, getCollections()
    $:$currentCollection, getCollections()
    let client
    let collections

    async function getCollections(){
        if($currentUser){
            collections = localStorage.getItem(`famfolio-collections-${$currentUser.userId}`);
            if(!collections){
                localStorage.setItem(`famfolio-collections-${$currentUser.userId}`,"{}")
                collections = {}
            }else{
                collections = JSON.parse(collections);
            }
        }
    }
    onMount(async ()=>{
        client = await createClient();
        user.set(await client.getUser());
        isAuthenticated.set(await client.isAuthenticated());

        token.set(await client.getTokenSilently())
        let thisUser = await fetch("https://famfolioapi.onrender.com/user/myself",{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${$token}`
            }
        })
        thisUser = await thisUser.json()
        currentUser.set(thisUser)
        let fetchedMedia = await fetch(`https://famfolioapi.onrender.com/media/my/${$currentUser.userId}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${$token}`
            }
        })
        myMedia.set(await fetchedMedia.json())
    })
</script>
<div id="collections-area">
    {#if $currentCollection != ""}
    {#each $myMedia as item}
        {#if $currentCollection == "All Media"}
            {#if item.category_id.length > 0 && item.url != "test"}
                <MediaCard mediaType={item.category_id[0]._id} media={{ url: item.url, title: item.title }} tabIndex={tabIndexCounter++}/>
            {/if}
        {:else}
            {#if collections[$currentCollection].includes(item._id)}
                <MediaCard mediaType={item.category_id[0]._id} media={{ url: item.url, title: item.title }} tabIndex={tabIndexCounter++}/>
            {/if}
        {/if}
    {/each}
    <MediaCard mediaType="addMedia" media="none" tabIndex = { tabIndexCounter++ }/>
    {:else}
    <div id="collection-placeholder">
        <h1>Select a collection from the sidebar to view its contents, or create a new one.</h1>
    </div>
    {/if}
</div>

<style>
    #collection-placeholder{
        flex:1;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    #collection-placeholder h1{
        height:fit-content;
    }
    #collections-area {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;
        justify-content: left;
        align-content: flex-start;
    }
</style>