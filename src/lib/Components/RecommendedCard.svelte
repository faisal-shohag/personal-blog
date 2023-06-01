<script>
    import {
    doc,
    query,
    orderBy,
    collection,
    onSnapshot,
    updateDoc,
    deleteDoc,
    addDoc, Timestamp,
    increment,
    where,
    getDocs
  } from "firebase/firestore";
  import { fstore } from "../../firebase";
  import Icon from "@iconify/svelte";
  import { common } from "../../stores/postStore";
  import { onMount } from "svelte";
  import {goto} from '$app/navigation';
  import { page} from "$app/stores";

    export let tags;
    export let currentId;
    let posts = [];
    const getRecommends = async () => {
        const q = query(collection(fstore, `posts`), where('tags', 'array-contains-any', tags));
    const snap = await getDocs(q);
    posts = [];
    snap.forEach((doc)=>{
        if(doc.id != currentId) {
            posts.push({...doc.data(), id: doc.id});
        }
    });
    posts = posts;
    }
  onMount(async()=>{
    getRecommends();
  })

  function removeEmojis(str) {
    var emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    str = str.replace(emojiRE, '');
    str = str. replace(/[0-9]/g, '');
    str = str. replace('.', '');
    str = str.trim();
    return str;
}


</script>
{#if posts.length>0}
<div class="text-2xl max-sm:text-[16px] font-bold font-Lato"> Post like this</div>
<div class="flex items-center gap-2 overflow-y-auto">
    {#each posts as post}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
   <a href="/blogRedirect/{post.id}"> <div class="card max-w-[300px] max-h-[130px] relative variant-ghost-primary flex gap-2">
        <div class="text-black dark:text-white rounded p-5 bg- w-[30%] h-full text-4xl font-bold flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700">{removeEmojis(post.title)[0]}</div>
        <div class="text-black dark:text-white flex flex-col items-start justify-start pt-2">
            <div class="text-lg font-bold truncate w-[200px]">{post.title}</div>
            <div class="text-sm flex items-center">{$common.getReadTime(post.content)} min read<Icon icon="bi:dot" /> <Icon icon="cil:comment-bubble" /> &nbsp; {post.comment}</div>
            <div class="text-sm">{$common.getDate(post.createdAt)}</div>
        </div>
    </div>
  </a>
    {/each}
</div>

{/if}
