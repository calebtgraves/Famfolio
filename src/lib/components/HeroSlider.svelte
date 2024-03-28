<script>
    import { onMount } from "svelte";

    export let direction
    export let images

    let imageElements = [];
    onMount(()=>{
        imageElements.forEach((image,index) => {
            if(index>=images.length){
                image.style.backgroundImage = `url('${images[index-images.length]}')`
            }else{
                image.style.backgroundImage = `url('${images[index]}')`
            }
        });
    })
</script>
<div class="hero-row">
    <div data-direction = {direction} class="inner-slider">
        <div class="slide-img square-img" bind:this={imageElements[0]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[1]}></div>
        <div class="slide-img square-img" bind:this={imageElements[2]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[3]}></div>
        <div class="slide-img square-img" bind:this={imageElements[4]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[5]}></div>
        <div class="slide-img square-img" bind:this={imageElements[6]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[7]}></div>
        <div class="slide-img square-img" bind:this={imageElements[8]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[9]}></div>
        <div class="slide-img square-img" bind:this={imageElements[10]}></div>
        <div class="slide-img rect-img" bind:this={imageElements[11]}></div>
    </div>
</div>
<style>
    @keyframes slideLeft{
        to{
            transform: translateX(-50%);
        }
    }
    @keyframes slideRight{
        to{
            transform: translateX(0%);
        }
    }
    .inner-slider{
        width:max-content;
    }
    .inner-slider[data-direction="left"]{
        animation: slideLeft 250s linear infinite;
    }
    .inner-slider[data-direction="right"]{
        transform:translate(-50%);
        animation: slideRight 250s linear infinite;
    }
    *{
        box-sizing: border-box;
    }
    .hero-row{
        overflow:hidden;
        text-wrap:nowrap;
        mask:linear-gradient(90deg, transparent 0%,white 10%,white 90%, transparent 100%);
    }
    .slide-img{
        margin:.5rem;
        display:inline-block;
        background-size:cover;
        background-position: center;
        filter:brightness(50%);
    }
    .square-img{
        width:15rem;
        height:15rem;
    }
    .rect-img{
        width:30rem;
        height:15rem;
    }
</style>