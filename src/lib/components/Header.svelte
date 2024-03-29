<script>
    import LoginButton from "./LoginButton.svelte";
</script>

<header>
    <div class="logo">
        <img src="/Images/logo/logotextivory.svg" alt="famfolio">
    </div>
    <LoginButton/>
</header>

<style>
    img{
        user-select: none;
        height:3rem;
    }
    header{
        background-color: #90323D;
        padding:1rem;
        display:flex;
        justify-content:space-between;
        box-shadow:0px -3px 10px 5px rgba(0, 0, 0, 70%);
        position:relative;
        z-index: 1;
        align-items: center;
    }
</style>