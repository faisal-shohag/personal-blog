<script>
import { onDestroy, onMount } from 'svelte';
import PostList from '../lib/Components/PostList.svelte'
import {postStore} from '../stores/postStore'
import Icon from '@iconify/svelte';
  import PostSkeleton from '../lib/Components/PostSkeleton.svelte';

let posts = [];
let unsubscribe = postStore.subscribe(async data => {
    posts = data;
});



</script>

<!-- <PostList mins={4} title="STACK - স্তুপের গল্প" express="আমরা যখন একটা বই আরেকটা বইয়ের উপর রেখে একটা স্তুপ বানাই ফেলি সেটাকে আমরা stack of books বলতে পারি।" tags={tags} author={"Faisal Shohag"} avatar="https://firebasestorage.googleapis.com/v0/b/blog-424dc.appspot.com/o/photo_2023-05-01_17-36-37.jpg?alt=media&token=1b4d753d-3beb-4957-83cf-2a9f7650bd6e"/> -->

{#if posts.length > 0}
{#each posts as post, index}
<a href="/blog/{index}">
<PostList author={post.author} title={post.title} express={post.express} tags={post.tags} createdAt={post.createdAt} mins={post.mins} avatar="https://firebasestorage.googleapis.com/v0/b/blog-424dc.appspot.com/o/photo_2023-05-01_17-36-37.jpg?alt=media&token=1b4d753d-3beb-4957-83cf-2a9f7650bd6e"/>
</a>
{/each}
{:else}
<PostSkeleton/>
<PostSkeleton/>
<PostSkeleton/>
<PostSkeleton/>
{/if}
    



