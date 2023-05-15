<script>
    import {createEventDispatcher} from "svelte";
    import Icon from '@iconify/svelte';
    export let author;
    export let time;
    export let comment;
    export let like;
    export let photoUrl;
    export let mycomment;

    const dispatch = createEventDispatcher();
    const likeHandle = () => {
        dispatch('likePlus');
    }

    const deleteComment = () =>{
        dispatch('deleteComment');
    }

</script>
<div class="p-0 commentCard previewer rounded-container-token overflow-hidden card">
    {#if mycomment}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={deleteComment} class="float-right cursor-pointer p-1 text-[20px] rounded-full text-red-700"><Icon icon="ic:sharp-close" /></div>
    {/if}
<div class="flex gap-2 p-3 align-top">
    <div class="">
        <img class="w-[40px] h-[40px]  rounded-full s-nb_ptBq0IalQ" src={photoUrl} alt="Rounded avatar">
    </div>
    <div class="flex flex-col">
        <div class=""><b>{author}</b>・<spanc class="text-sm">{time}</spanc></div>
        <div class="">{comment}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div style="display: none;" on:click={likeHandle} class="mt-2 variant-filled-error like gap-2 pl-1 pr-3 w-[50px] font-poppins cursor-pointer hover:variant-filled-error rounded-full">
            <span class="text-[15px]">🤍 </span>
            {#if like<0}
            <span class="text-[15px]">❤️ </span>
            {/if}

            <span class="text-[14px]">0</span>
            
        </div>
    </div>
    
</div>


</div>

<style>
    .like{
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }

    .commentCard {
        font-family: 'Lato', Kalpurush;
    }
</style>


