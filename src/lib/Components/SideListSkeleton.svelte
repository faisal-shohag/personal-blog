<script>
    import Icon from "@iconify/svelte";
    export let style = "";
</script>

<div class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden {style}">
<header class="previewer-header bg-surface-200-700-token p-2 flex justify-center items-center gap-1 font-poppins font-bold"><Icon class="text-[25px]" icon="openmoji:ringed-planet" /> Related Problems</header>
<div class="previewer-viewport space-y-4 bg-white/10 dark:bg-black/10">
    <ul class="list p-2">   
    <slot/>
    </ul>
</div>
</div>