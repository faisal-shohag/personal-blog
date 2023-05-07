<script>
    import { onDestroy, onMount } from "svelte";
    import PostList from "../../lib/Components/PostList.svelte";
    import { postStore } from "../../stores/postStore";
    import PostSkeleton from "../../lib/Components/PostSkeleton.svelte";
    import Landing from "../../lib/Components/Landing.svelte";
    import venus from '../../images/venus.svg';
    import bottom from '../../images/alien_cute.png';
    import SectionHead from "../../lib/Components/SectionHead.svelte";
    let posts = [];
    let unsubscribe = postStore.subscribe(async (data) => {
      posts = data;
    });
  
    onDestroy(unsubscribe);
  </script>
  
  <Landing/>
  
  <div class="absolute z-[-1] lg:left-[0] lg:top-[10px] top-[50px] md:top-10 md:left-[250px]">
    <img class="lg:animate-pulse max-sm:max-h-[300px] lg:h-[350px] md:h-[200px]" src={venus} alt=""/>
  </div>
  
  
  {#if posts.length > 0}
  <SectionHead title="All Posts"/>
    {#each posts as post, index}
      <a href="/blog/{index}">
        <PostList
          author={post.author}
          title={post.title}
          express={post.express}
          tags={post.tags}
          createdAt={post.createdAt}
          mins={post.mins}
          avatar="https://firebasestorage.googleapis.com/v0/b/blog-424dc.appspot.com/o/photo_2023-05-01_17-36-37.jpg?alt=media&token=1b4d753d-3beb-4957-83cf-2a9f7650bd6e"
        />
      </a>
    {/each}
  {:else}
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  {/if}
  