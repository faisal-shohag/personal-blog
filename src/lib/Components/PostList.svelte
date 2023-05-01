<script>
    export let avatar;
    export let author;
    export let title;
    export let express;
    export let createdAt;
    export let tags;
    export let mins;

    console.log(avatar);
</script>

<div class="font-hind p-2 text-black dark:text-gray-400">
   <div class="flex space-x-2 items-center">
    <img class="w-5 h-5 rounded-full" src={avatar} alt="Rounded avatar">
    <div class="text-sm font-bold">{author}</div>
   </div>
   <div class="text-xl font-bold">{title}</div>
   <div class="text-md font-kalp">{express}</div>
   <div class="flex flex-wrap gap-2 mt-2 items-center text-gray-500 font-poppins text-sm">
    <div>{createdAt}</div>
    ·
    {mins} min read
    ·
    {#each tags as tag}
        <code>{tag}</code>
    {/each}
   </div>
</div>
<hr/>