<script>
    import HeroSlider from "./HeroSlider.svelte";
    let rowOneImages = [
        "/Images/heroImages/1.jpeg",
        "/Images/heroImages/2.jpg",
        "/Images/heroImages/3.jpg",
        "/Images/heroImages/4.jpg",
        "/Images/heroImages/5.jpeg",
        "/Images/heroImages/6.jpg",
    ]
    let rowTwoImages = [
        "/Images/heroImages/7.jpg",
        "/Images/heroImages/8.jpeg",
        "/Images/heroImages/9.jpg",
        "/Images/heroImages/10.png",
        "/Images/heroImages/11.jpeg",
        "/Images/heroImages/12.jpeg",
    ]
    
</script>
<div id="hero-container">
    <HeroSlider direction="left" images={rowOneImages}/>
    <HeroSlider direction="right" images={rowTwoImages}/>
    <div id="cta">
        <h1>Famfolio</h1>
    </div>
</div>
<style>
    #hero-container{
        position:relative;
        width:100%;
        padding:.5rem 0;
    }
    #cta{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background-color:rgba(0,0,0,40%);
        display:flex;
        align-items: center;
        justify-content: center;
        color:white;
    }
</style>