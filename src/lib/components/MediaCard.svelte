<script>
  import { onMount } from "svelte";
  import {openNewMediaWindow} from "../utils.mjs";
  import MediaViewWindow from "./MediaViewWindow.svelte";


    export let mediaType;
    export let tabIndex;
    export let media;

    let mediaCard;

    let mediaWindow;

    function getMediaId() {
        // will eventually link the card and its media to the page that displays it
    }

    function getMedia() {
        // will redirect the user to the media requested
        console.log("Media retrieved: ", media.title)
    }

    function getThumbnail() {
        let content;
        let title;
        if (mediaType === "img" || mediaType == "66032d2e2a998221084b7839") {             // images just have a src and alt
            if (media.url) {
                content = document.createElement("img");
                content.src = media.url;
                content.alt = media.title;
                mediaCard.appendChild(content);
                mediaCard.style.boxShadow =  "0 0 6px black";
                mediaCard.addEventListener("click", getMedia);
                mediaCard.tabIndex = tabIndex;
            } else {
                title = document.createElement("h1");
                title.innerHTML = media.title ? media.title : "No Title";
                title.addEventListener("click", getMedia);
                title.tabIndex = tabIndex;
                mediaCard.appendChild(title);
                content = document.createElement("p");
                content.innerHTML = "No image";
                mediaCard.appendChild(content);
                mediaCard.style.backgroundColor = "white";
                mediaCard.style.boxShadow =  "0 0 6px black";
            }
        } else if (mediaType === "text" || mediaType == "66032d624cf09a0af03d65f6") {     // use an iframe for the text content
            // title
            title = document.createElement("h1");
            title.innerHTML = media.title ? media.title : "No Title";
            title.addEventListener("click", getMedia);
            title.tabIndex = tabIndex;
            mediaCard.appendChild(title);

            // text content
            content = document.createElement("iframe");
            content.src = media.url ? media.url : "/Text/DEFAULT.txt";
            content.width = "100%";
            content.height = "100%";
            content.frameBorder = "0";
            mediaCard.appendChild(content);
            mediaCard.style.backgroundColor = "white";
            mediaCard.style.boxShadow =  "0 0 6px black";
        } else if (mediaType === "audio" || mediaType == "66032d4bb8973a0f4489ea23") {    // audio will have a play button to preview it
            // title
            title = document.createElement("h1");
            title.innerHTML = media.title ? media.title : "No Title";
            title.addEventListener("click", getMedia);
            title.tabIndex = tabIndex;
            mediaCard.appendChild(title);
            mediaCard.style.boxShadow =  "0 0 6px black";
            mediaCard.style.backgroundColor = "white";

            // audio content
            content = document.createElement("audio");
            content.src = media.url;
            content.preload = "auto";
            mediaCard.appendChild(content);
            let playButton = document.createElement("button");
            playButton.innerHTML = "&#x23F5;"; // play symbol
            playButton.addEventListener("click", () => {
                if (content.paused) {
                    content.play();
                    playButton.innerHTML = "&#x23F8"; // pause symbol
                } else {
                    content.pause();
                    playButton.innerHTML = "&#x23F5"; // play symbol
                }
            })
            mediaCard.appendChild(playButton);
            // Move this into the <style> tag eventually...
            playButton.style.cursor = "pointer";
            playButton.style.fontSize = "2.5rem";
            playButton.style.lineHeight = "2rem";
            playButton.style.width = "3rem";
            playButton.style.height = "3rem";
            playButton.style.border = "none";
            playButton.style.borderRadius = "50%";
            playButton.style.backgroundColor = "#011627";
            playButton.style.color = "#FFFCE8";
            playButton.style.padding = "0";
            // eventually put these in a class selector!
            playButton.style.display = "flex";
            playButton.style.justifyContent = "center";
            playButton.style.alignItems = "center";

            playButton.style.margin = "40px auto";
        } else if (mediaType === "addMedia") { // this is the "+" button that allows the user to add a new media
            content = document.createElement("p");
            mediaCard.classList.add("addMediaButton");
            mediaCard.classList.remove("media-card");
            mediaCard.tabIndex = tabIndex;
            content.innerHTML = "+";
            content.style.fontSize = "4rem";
            content.style.color = "gray";
            content.style.width = "fit-content";
            content.style.height = "fit-content";
            // follow same method as the other "Add Media +" button
            mediaCard.appendChild(content);
            mediaCard.style.border = "2px dashed gray";
            mediaCard.style.display = "flex";
            mediaCard.style.justifyContent = "center";
            mediaCard.style.alignItems = "center";
            mediaCard.onclick = openNewMediaWindow
        } else {
            content = document.createElement("a");
            content.innerHTML = media.title ? media.title : "No Title";
            content.href = media.url;
            content.target = "_blank";
            content.style.fontSize = "1.5rem";
            content.style.textAlign = "center";
            content.tabIndex = tabIndex;
            mediaCard.appendChild(content);
            mediaCard.style.boxShadow =  "0 0 6px black";
            mediaCard.style.backgroundColor = "white";
            mediaCard.style.display = "flex";
            mediaCard.style.justifyContent = "center";
            mediaCard.style.alignItems = "center";
        }
    }

    onMount( () => {
        getThumbnail();
    });

    function displayMediaWindow() {
        mediaWindow.style.display = "block";
    }

    function handleKeydown(e) {
        if (e.keyCode === 13) {
            displayMediaWindow();
        }
    }

</script>

<div class="media-window" bind:this={mediaWindow}>
    <MediaViewWindow bind:container={mediaWindow} mediaType={mediaType} media={media}></MediaViewWindow>
</div>

<div id="" class="media-card" bind:this={ mediaCard } title={media.title} tabindex={tabIndex} role="button" on:keydown={(e)=>{handleKeydown(e)}} on:click={displayMediaWindow}>
    
</div>


<style>
    div {
        overflow: hidden;
        border-radius: 25%;
        width: 200px;
        height: 200px;
        margin: 20px 20px;
        transition: 0.25s ease-in-out;
    }

    .media-window {
        display: none;
        position: fixed;
    }

    :global(.media-card:hover) {
        border-radius: 5%;
    }

    :global(.addMediaButton) {
        cursor: pointer;
    }

    :global(div img) {
        height: 100%;
        width: 100%;
        object-fit: cover;
        cursor: pointer;
    }

    :global(div h1) {
        text-align: center;
        padding: 10px 15px;
        font-size: 1.3rem;
        height: 30%;
        cursor: pointer;
    }

    :global(div iframe) {
        height: 70%;
    }
</style>