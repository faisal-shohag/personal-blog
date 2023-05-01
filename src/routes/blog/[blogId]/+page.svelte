<script>
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import { page } from "$app/stores";
    import {postStore} from '../../../stores/postStore'

    const params = $page.params.blogId;
    console.log(params)

let post;
let content;
let unsubscribe = postStore.subscribe(async data => {
    console.log(data);
    post = data[parseInt(params)];
    if(post)
    content = post.content.replaceAll('<br>', '\n');
});

    onMount(async()=>{
        document.querySelectorAll('pre').forEach(el=>{
         hljs.highlightElement(el);
          el.classList.add('p-3');
          el.classList.add('mt-3')
          el.classList.add('mb-3')
          el.classList.add('rounded-lg')
         });
      });
  
  
  
  </script>
   {#if post}
    
  
  <div class="flex gap-3 items-center md:float-right max-sm:hidden">
    {#each post.tags as tag}
    <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">{tag}</span>
    {/each}
  </div>
  <div class="text-2xl font-hind font-bold">{post.title}</div>
  <div class="flex gap-3 items-center md:hidden">
    {#each post.tags as tag}
    <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">{tag}</span>
    {/each}
  </div>
  <div class="m-0 p-0 flex items-center justify-between font-hind"> <div class="flex gap-1 items-center justify-between"><Icon icon="line-md:edit" /> <span class="strong">{post.author}</span></div> <div class="flex gap-1 items-center justify-between"><Icon icon="line-md:calendar" /> <span class="text-orange">{post.createdAt}</span></div></div>
  <hr />
  
  


  <div class="blog-content">
    <figure class="mb-5 max-w-screen-md font-hind mx-auto text-center">
      <svg aria-hidden="true" class="w-10 h-10 mx-auto mb-2 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
          <p class="text-2xl italic font-medium text-gray-900 dark:text-white">{post.qt}</p>
      <figcaption class="flex items-center justify-center mt-2 space-x-3">
          <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <cite class="pr-3 font-medium text-gray-900 dark:text-white">– {post.qta}</cite>
          </div>
      </figcaption>
  </figure>
  {@html content}
    
</div>


  
<hr/>
{/if}

<style>
  .blog-content{
    font-family: 'Poppins', Kalpurush;
  }
</style>