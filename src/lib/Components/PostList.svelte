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
   
   <div class="text-xl font-bold">{title}</div>
   <div class="text-md font-kalp">{express}</div>
   <div class="flex space-x-2 items-center">
    <img class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full" src={avatar} alt="Rounded avatar">
    <div class="text-sm font-bold max-sm:text-[10px]">{author}</div>
   </div>
   <div class="flex flex-wrap gap-2 mt-2 items-center text-gray-500 font-poppins text-sm max-sm:text-[10px]">
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