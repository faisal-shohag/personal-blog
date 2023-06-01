<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    let params = $page.params.blogId;
    onMount(()=>{
        document.getElementById('link').click();
    })
</script>
<a id="link" href="/blog/{params}">Redirecting...</a>