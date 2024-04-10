<script>
    import { currentCollection, token, currentUser, myMedia } from "../stores.mjs";
    export let mediaType;
    export let media;
    export let container;

    let oldInfo = {title: media.title, url: media.url, category_id: mediaType};

    let mediaViewWindow;

    let mediaTitle = media.title;
    let mediaUrl = media.url;

    let changed = false;

    async function deleteMedia() {
        fetch(`https://famfolioapi.onrender.com/media/${media._id}`,{
            method: "DELETE",
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${$token}`
            },
            body: JSON.stringify({user: $currentUser.userId})
        }).then(async ()=>{
            let fetchedMedia = await fetch(`https://famfolioapi.onrender.com/media/my/${$currentUser.userId}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${$token}`
                }
            })
            myMedia.set(await fetchedMedia.json())
        })
        container.style.display = "none";
        changed = false;
    }

    async function updateMedia(){
        fetch(`https://famfolioapi.onrender.com/media/${media._id}`,{
            method: "PUT",
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${$token}`
            },
            body: JSON.stringify({title: mediaTitle, url: mediaUrl, category_id: [mediaType]})
        }).then(async ()=>{
            let fetchedMedia = await fetch(`https://famfolioapi.onrender.com/media/my/${$currentUser.userId}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${$token}`
                }
            })
        myMedia.set(await fetchedMedia.json())
        })
        container.style.display = "none";
        changed = false;
    }

    function cancel() {
        mediaTitle = oldInfo.title;
        mediaUrl = oldInfo.url;
        mediaType = oldInfo.category_id;
        container.style.display = "none";
        changed = false;
    }

</script>
<div class="window-background" bind:this={mediaViewWindow}>
    <div class="media-view-window">
        <h1>{oldInfo.title}</h1>
        <div class="media-view">
            {#if mediaType=="66032d2e2a998221084b7839"}
                <a href={oldInfo.url} target="_blank">
                    <img src={oldInfo.url} alt={oldInfo.title} class="mediaimg"/>
                </a>
            {:else if mediaType=="66032d624cf09a0af03d65f6"}
                <iframe title={oldInfo.title} src={oldInfo.url} width="100%" height="100%" frameborder="0"></iframe>
                <a href={oldInfo.url} target="_blank">Media Link</a>
            {:else if mediaType=="66032d4bb8973a0f4489ea23"}
                <audio controls>
                    <source src={oldInfo.url} type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>
            {:else}
                <a href={oldInfo.url} target="_blank">Media Link</a>
            {/if}
        </div>
            
        <div class="media-info">
            <label>
                Media Title
                <input type="text" bind:value={mediaTitle} on:input={()=>{changed=true}}/>
            </label>
            <label>
                Media Url
                <input type="text" bind:value={mediaUrl} on:input={()=>{changed=true}}/>
            </label>
            <label>
                Media Type
                <select name="mediaType" id="media-type" bind:value={mediaType} on:change={()=>{changed=true}}>
                    <option value="66032d2e2a998221084b7839">Image</option>
                    <option value="66032d624cf09a0af03d65f6">Text</option>
                    <option value="66032d4bb8973a0f4489ea23">Audio</option>
                    <option value="other">Other</option>
                </select>
            </label>
        </div>
        <div id="button-box">
            <button on:click={cancel}>Cancel</button>
            {#if changed}
                <button on:click={updateMedia}>Update</button>
            {:else}
                <button on:click={deleteMedia}>Delete</button>
            {/if}
        </div>
    </div>
</div>

<style>
    .window-background{
        position:fixed;
        top:0%;
        left:0%;
        right:0%;
        bottom:0%;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .mediaimg{
        height:25rem;
    }
    .media-view-window{
        border-radius:1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        background-color: var(--ivory);
        width:90%;
        padding:1rem;
        display:grid;
        grid-template-columns: 1fr 1fr;
        max-height:90%;
        overflow-y:auto;
    }
    .media-info{
        display:flex;
        flex-direction:column;
        justify-content: center;
    }
    iframe{
        height:25rem;
    }
    label{
        display:flex;
        flex-direction: column;
        padding:.5rem;
    }
    label, select, input{
        font-size:1.5rem;
    }
    h1{
        font-size:1.5rem;
        grid-column: 1/3;
    }
    #button-box{
        display:flex;
        justify-content: space-between;
        padding:.5rem;
        grid-column: 1/3;
    }
    @media screen and (max-width: 800px){
        .media-info,.media-view{
            grid-column:1/3;
        }
    }
</style>