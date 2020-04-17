<script>
    import { onMount } from 'svelte'

    export let app
</script>

<style type="text/sass">
    h1
        background-color: white
</style>

<h1>hrasvaka v{app.version}</h1>