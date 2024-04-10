<script>
    import LoginButton from "./LoginButton.svelte";
</script>

<header>
    <div class="logo">
        <a href="/">
            <img src="/Images/logo/logotextivory.svg" alt="famfolio">
        </a>
    </div>
    <LoginButton/>
</header>

<style>
    img{
        user-select: none;
        -webkit-user-drag: none;
        height:3rem;
    }
    header{
        background-color: #90323D;
        padding:1rem;
        display:flex;
        justify-content:space-between;
        box-shadow:0px -3px 10px 5px rgba(0, 0, 0, 70%);
        position:relative;
        align-items: center;
    }
</style>