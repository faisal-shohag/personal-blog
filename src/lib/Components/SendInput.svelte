<script>
    import {createEventDispatcher} from "svelte"
    import {goto} from '$app/navigation';
    import Icon from "@iconify/svelte";
    import { userStore } from "../../stores/userStore";
    export let commentText="";
    const dispatch = createEventDispatcher();
    const submit = () => {
        dispatch('submit');
    }


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div  class="input-group relative input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
    {#if $userStore.loggedIn == false}
    <div on:click={()=>goto('/auth')} class="font-poppins absolute h-full w-full variant-glass-error text-gray-100 font-bold flex">Sign In to comment</div>
    {/if}
    
    <button class="input-group-shim">
        {#if $userStore.photoURL}
        <img class="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[20px] rounded-full" src={$userStore.photoURL} alt="Rounded avatar">
        {:else}
        +
        {/if}
    </button>
	<textarea
        bind:value={commentText}
		class="bg-transparent border-0 ring-0 commentInput"
		name="prompt"
		id="prompt"
		placeholder="Write a comment..."
		rows="1"
	/>
	<button on:click={submit} class="variant-soft-primary text-[25px]"><Icon icon="ri:send-plane-fill" /></button>
</div>
					

<style>
    .commentInput {
        font-family: 'Lato', Kalpurush;
    }
</style>