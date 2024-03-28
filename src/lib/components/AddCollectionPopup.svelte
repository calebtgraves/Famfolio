<script>
    import { showPopup } from 'svelte/store';
    let collectionName = '';
    let collections = [];

    function addCollection(name) {
        collections.push(name)
        console.log("New collection added:", name);
        showPopup.set(false);
    }
</script>

{#if $showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>Add Collection</h2>
            <form on:submit|preventDefault={() => addCollection(collectionName)}>
                <label for="collectionName">Collection Name:</label>
                <input type="text" id="collectionName" bind:value={collectionName} />
                <button type="submit">Add Collection</button>
            </form>
        </div>
    </div>
{/if}

