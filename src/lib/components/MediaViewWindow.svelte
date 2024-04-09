<script>
    import { currentCollection, token, currentUser, myMedia } from "../stores.mjs";
    export let mediaType;
    export let media;
    export let container;

    let mediaViewWindow;

    let mediaTitle = media.title;
    let mediaUrl = media.url;

    async function createNewMedia(){
        let newMedia = await fetch("https://famfolioapi.onrender.com/media",{
            method: "POST",
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${$token}`,
            },
            body: JSON.stringify({title: mediaTitle, url: mediaUrl, category_id: [mediaType]})
        });
        newMedia = await newMedia.json();
        let collections = localStorage.getItem(`famfolio-collections-${$currentUser.userId}`);
        if(collections) collections = JSON.parse(collections); else collections = {};
        if($currentCollection in collections){
            collections[$currentCollection].push(newMedia._id)
        }else{
            collections[$currentCollection] = [newMedia._id];
        }
        localStorage.setItem(`famfolio-collections-${$currentUser.userId}`,JSON.stringify(collections));
        container.style.display = "none";
        let fetchedMedia = await fetch(`https://famfolioapi.onrender.com/media/my/${$currentUser.userId}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${$token}`
                }
            })
        myMedia.set(await fetchedMedia.json())
        console.log($myMedia)
    }

    function deleteMedia() {
        fetch(`https://famfolioapi.onrender.com/media/${media._id}`,{
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${$token}`
            }
        }).then(data=>data.json()).then(console.log)
        container.style.display = "none";
    }

</script>
<div class="window-background" bind:this={mediaViewWindow}>
    <div class="media-view-window">
        <h1>Edit Media</h1>
        <label>
            Media Title
            <input type="text" bind:value={mediaTitle}/>
        </label>
        <label>
            Media Url
            <input type="text" bind:value={mediaUrl}/>
        </label>
        <label>
            Media Type
            <select name="mediaType" id="media-type" bind:value={mediaType}>
                <option value="66032d2e2a998221084b7839">Image</option>
                <option value="66032d624cf09a0af03d65f6">Text</option>
                <option value="66032d4bb8973a0f4489ea23">Audio</option>
                <option value="other">Other</option>
            </select>
        </label>
        <div id="button-box">
            <button on:click={()=>{container.style.display = "none"}}>Cancel</button>
            <button on:click={deleteMedia}>Delete</button>
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
    .media-view-window{
        border-radius:1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        background-color: var(--ivory);
        width:50%;
        display:flex;
        flex-direction:column;
        padding:1rem;
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
    }
    #button-box{
        display:flex;
        justify-content: space-between;
        padding:.5rem;
    }
</style>