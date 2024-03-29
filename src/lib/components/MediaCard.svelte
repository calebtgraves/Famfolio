<script>
  import { onMount } from "svelte";

    export let mediaType, media, tabIndex;

    let mediaCard;

    function getMediaId() {

    }

    function getMedia() {
        console.log("Media retrieved: ", media.title)
    }

    function getThumbnail() {
        let content;
        let title;
        if (mediaType === "img") {             // images just have a src and alt
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
        } else if (mediaType === "text") {     // use an iframe for the text content
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
        } else if (mediaType === "audio") {    // audio will have a play button to preview it
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
        } else if (mediaType === "link") {
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
        } else {                               // if the media type is undefined or unknown, only show a title
            title = document.createElement("h1");
            title.innerHTML = media.title ? media.title : "Unknown Media";
            mediaCard.appendChild(title);
        }
    }

    onMount( () => {
        getThumbnail();
    })
</script>


<div id="" class="media-card" bind:this={ mediaCard } role="button">
    
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