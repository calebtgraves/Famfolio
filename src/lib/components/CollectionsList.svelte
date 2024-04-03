<script>
    import { writable } from 'svelte/store';
    import { currentCollection } from '../stores.mjs';
    let showPopup = writable(false);
    let collectionName = '';
    let collections = writable([]);
    let allCollections = localStorage.getItem("famfolio-collections");
    if(allCollections){
        let collectionNames = []
        let parsed = JSON.parse(allCollections);
        for (let collection in parsed) {
            collectionNames.push(collection);
        };
        collections.set(collectionNames);
    }else{
        localStorage.setItem("famfolio-collections","{}");
    }

    function addCollection() {
        if (collectionName.trim() !== '') {
            $collections = [...$collections, collectionName];
            currentCollection.set(collectionName);
            let myCollections
            allCollections = localStorage.getItem("famfolio-collections");
            if(allCollections){
                myCollections = JSON.parse(allCollections);
                myCollections[collectionName] = []
            }else{
                myCollections = {collectionName:[]}
            }
            localStorage.setItem('famfolio-collections',JSON.stringify(myCollections));
            showPopup.set(false);
            collectionName = '';
        }
    }
</script>

<div class="sidebar">
    <div class="title-container">
        <h2>Collections</h2>
        {#if !$showPopup}
            <button class="add-button" on:click={() => showPopup.set(true)}>+</button>
        {/if}
    </div>
    {#if $showPopup}
        <div class="popup">
            <input bind:value={collectionName} placeholder="Collection Name" />
            <button on:click={addCollection}>Add Collection</button>
            <button on:click={() => showPopup.set(false)}>Cancel</button>
        </div>
    {/if}
    {#if $currentCollection == "All Media"}
            <div class="collection-list selected"><button>All Media</button></div>
        {:else}
            <div class="collection-list"><button on:click={()=>{currentCollection.set("All Media")}}>All Media</button></div>
        {/if}
    {#each $collections as collection}
        {#if $currentCollection == collection}
            <div class="collection-list selected"><button>{collection}</button></div>
        {:else}
            <div class="collection-list"><button on:click={()=>{currentCollection.set(collection)}}>{collection}</button></div>
        {/if}
    {/each} 
</div>

<style>

.sidebar {
    width: 300px;
    background-color: #f5f5f5; /* Light grey background */
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    position:relative;
}

.collection-list {
    position: relative;
    border: 1px solid #ddd; /* Light grey border */
    width: 105%;
    background-color: #fff; /* White background */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    transition: box-shadow 0.3s ease, transform 0.3 ease; /* Add a transition for the hover effect */
    overflow: hidden;
    margin:.5rem;
}

.collection-list:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Darken the shadow when hovered */
}

.collection-list button {
    display: block; /* Make the button take up the full width of the collection list */
    border-radius: 0;
    width:100%;
    margin: 0;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    padding: .5rem;
    color: #333; /* Dark grey text */
    background-color: transparent;
    transition: color 0.3s ease; /* Add a transition for the hover effect */
}

.collection-list:hover::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -6%; /* Position the triangle on the right side of the collection list */
    transform: translateY(-50%) rotate(45deg); /* Rotate the square to create a triangle */
    width: 30px;
    height: 30px;
    background-color: darkgrey;
    transition: all 0.3s ease;
}

.selected::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -6%; /* Position the triangle on the right side of the collection list */
    transform: translateY(-50%) rotate(45deg); /* Rotate the square to create a triangle */
    width: 30px;
    height: 30px;
    background-color: #2F6690 !important;
    transition: all 0.3s ease;
}

.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title-container h2{
    margin: 1rem 0;
}

.add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2F6690;
    color: #fff;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease; 
}

.add-button:hover {
    background-color: #1E4D70;
}

.popup {
    position: absolute;
    top: 20%;
    left: 120%;
    transform: translate(-50%, -50%);
    width: 300px; /* Adjust as needed */
    padding: 20px; /* Adjust as needed */
    background-color: #fff;
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index:1;
}

.popup input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.popup button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: none;
    background-color: #2F6690;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.popup button:hover {
    background-color: #1E4D70;
}

</style>