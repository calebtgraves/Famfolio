<script>
    import Header from "../lib/components/Header.svelte";

    import Hero from "../lib/components/Hero.svelte";


</script>

<main>
    <div>
        <Header />
        <Hero />
    </div>
    <div id="wrapper">
        <div class="blueline"></div>
        <h1>Welcome to Famfolio: Your Family's Shared Media Platform</h1>
        <p>At Famfolio, we believe in the power of sharing memories and moments with your loved ones. That's why we've created a platform where families can upload and explore a variety of media, sharing their experiences and creating lasting connections. Whether it's photos from special occasions, videos of memorable moments, or documents of significance, Famfolio is your digital gallery for all things family-related.</p>
        <h2>Why Choose Famfolio?</h2>
        <ul>
            <li>
                <h3>Community Sharing</h3>
                <p>Share your family's media with a wider community of users. Explore content uploaded by other families and discover new inspiration for your own memories.</p>
            </li>
            <li>
                <h3>Inspiration Hub</h3>
                <p>Discover a wealth of inspiration for your family life. From fun home videos to delicious recipes and fun activities, Famfolio is packed with ideas to make every moment with your family special.</p>
            </li>
            <li>
                <h3>Connection Opportunities</h3>
                <p>Connect with other families from around the world. Share stories, exchange advice, and forge new friendships in a supportive and inclusive community.</p>
            </li>
            <li>
                <h3>Discover New Content</h3>
                <p>Explore a diverse range of media shared by families around the world. From heartwarming family portraits to creative DIY projects, there's always something new to discover on Famfolio.</p>
            </li>
            <li>
                <h3>Memory Preservation</h3>
                <p>Preserve and celebrate your family's precious memories. Famfolio provides tools and features to capture and immortalize your most cherished moments, creating a digital legacy for generations to come.</p>
            </li>
        </ul>
        <h2>Get Started with Famfolio Today</h2>
        <p>Join the growing community of families who use Famfolio to share and discover meaningful moments. Sign up today and start uploading your family's media to our shared platform. Connect with other families, explore new content, and celebrate the beauty of shared experiences. Welcome to Famfolio, where memories are shared and cherished by all.</p>
        <div class="blueline"></div>
    </div>
    <footer></footer>
</main>
<style>
    main{
        display: flex;
        flex-direction: column;
        background-color:#FFFCE8;
        min-height:100%;
    }
    footer{
        width: 100%;
        height:60px;
        background-color:#90323D;
        align-self:flex-end;
    }
    #wrapper{
        width:100%;
        max-width:1080px;
        margin:0 auto;
        flex:1;
    }
    .blueline{
        border:solid 3px #2F6690;
        border-radius:3px;
        margin:1rem 0;
    }
    h1{
        color: #2F6690;
        font-family:sans-serif;
        margin:2rem 0;
    }
    h2,h3{
        font-family:sans-serif;
    }
    h2{
        margin:1rem 0;
    }
    ul{
        list-style:none;
        margin-left:2rem;
    }
    li{
        margin:1rem 0;
    }
    ul h3{
        display:inline;
    }
    p{
        font-size:1.2rem;
        font-family:sans-serif
    }
</style>

