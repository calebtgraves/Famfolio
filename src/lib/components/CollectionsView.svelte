<script>
    import MediaCard from "./MediaCard.svelte";

    export let tabIndexCounter = 1; // set outside here and incremented within
</script>

<div id="collections-area">
    <!-- Example cards -->
    <MediaCard mediaType="img" media={{ url: "/Images/heroImages/2.jpg", title: "Happy family" }} tabindex = { tabIndexCounter++ }/>
    <MediaCard mediaType="text" media={{ url: "/Text/myFavoriteMemory.txt", title: "My Favorite Memory" }} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="text" media={{ url: "/Text/temp.txt", title: "My Fridge Era"}} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="img" media={{ url: "/Images/heroImages/8.jpeg", title: "My Beautiful Sparrow" }} tabindex = { tabIndexCounter++ }/>
    <MediaCard mediaType="text" media={{ url: "/Text/myWill.txt", title: "My Last Will and Testament" }} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="audio" media={{ url: "/Audio/AnswertheCall.mp3", title: "Hope Works - Abe Mills" }} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="text" media={{ title: "Remember to Take Out the Trash!" }} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="audio" media={{ url: "/Audio/PillarofLight.mp3", title: "EFY - Pillar of Light" }} tabIndex = { tabIndexCounter++ }/>
    <MediaCard mediaType="link" media={{ url: "https://www.youtube.com/watch?v=z8VIhIIq-kk", title: "Listen at your Own Risk O.O" }} tabIndex = { tabIndexCounter++ }/>
    <!-- End example cards -->
    <MediaCard mediaType="addMedia" tabIndex = { tabIndexCounter++ }/>
</div>

<style>
    #collections-area {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-content: space-between;
        margin-top: 10px;
    }
</style>