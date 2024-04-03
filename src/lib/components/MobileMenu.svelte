<script>
    import CollectionsList from "./CollectionsList.svelte";

    let showCollections = true;

    function toggleCollections() {
        showCollections = !showCollections;
    }
</script>

<div class="header-content">
    <button class="hamburger" on:click={toggleCollections}> 
        <span>&#9776;</span> <!-- Hamburger icon -->
    </button>
    {#if showCollections}
        <div class="collections">
            <CollectionsList />
        </div>
    {/if}
</div>

<style>
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .hamburger {
        background-color: lightgray;
        border: none;
        padding: 10px;
        cursor: pointer;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
    }

    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }

        .collections {
            display: block;
        }
    }
</style>