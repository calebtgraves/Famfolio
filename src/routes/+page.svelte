<script>
  import CollectionsView from "../lib/components/CollectionsView.svelte";
    import Header from "../lib/components/Header.svelte";
    import Hero from "../lib/components/Hero.svelte";


</script>

<main>
    <div>
        <Header />
        <Hero />
    </div>
    <div id="wrapper">
    </div>
    <footer></footer>
</main>
<style>
    main{
        display: flex;
        flex-direction: column;
        background-color:#FFFCE8;
        min-height:100vh;
        justify-content: space-between;
    }
    footer{
        width: 100%;
        height:60px;
        background-color:#90323D;
    }
    #wrapper{
        width:100%;
        max-width:1080px;
        height:100%;
    }
</style>