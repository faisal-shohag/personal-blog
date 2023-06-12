<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import {goto} from '$app/navigation';
  import { common } from "../../../stores/postStore";
  import ship from '../../../images/space-shuttle.png';
  // import ship2 from '../../../images/astronaut.png';
  import SideList from "../../../lib/Components/SideList.svelte";
  import SideListSkeleton from "../../../lib/Components/SideListSkeleton.svelte";
  import {
    doc,
    query,
    orderBy,
    collection,
    onSnapshot,
    updateDoc,
    deleteDoc,
    addDoc, Timestamp,
    increment
  } from "firebase/firestore";
  import { fstore } from "../../../firebase";
  // import { push } from "firebase/database";
  import CommentCard from "../../../lib/Components/CommentCard.svelte";
  import SendInput from "../../../lib/Components/SendInput.svelte";
  import { userStore } from "../../../stores/userStore";
  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import { comment } from "svelte/internal";
  import RecommendedCard from "../../../lib/Components/RecommendedCard.svelte";
  let params = $page.params.blogId;
  // console.log(params);
  let icons = {
    "leetcode": "simple-icons:leetcode",
    "codeforces": "simple-icons:codeforces",
    "cn": "mdi:ninja"
  }
  let post;
  let content;
  let comments = [];



  //getpost
 function getPost(key){
     const docRef= doc(fstore, "posts", key)
     onSnapshot(docRef, (doc) => {
      post = doc.data();
      content = post.content.replaceAll("<br>", "\n");
      document.title = post.title;
    });
  }
 
  //getcomments
  function getComments (key) {
    const q = query(
      collection(fstore, `posts/${key}/comments`),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      comments = [];
      snapshot.forEach((doc) => {
        comments.push({...doc.data(), id: doc.id});
      });
      comments = comments;
    });
  }

  onMount(async () => {
    document.title = "Loading...";
    getPost(params);
    getComments(params);
    setTimeout(()=>{
      MathJax.typeset(); 
      document.querySelectorAll("pre").forEach((el) => {
        hljs.highlightElement(el);  
      });
    }, 2000);
  });


 let commentText = "";
const handleSubmit = async() => {
  try {
        const docRef = await addDoc(collection(fstore, `posts/${params}/comments`), {
                comment: commentText,
                createdAt: Timestamp.fromDate(new Date()),
                author: {
                  name: $userStore.displayName,
                  photoURL: $userStore.photoURL,
                  id: $userStore.uid
                },
            });
            console.log('Comment written with ID: ', docRef.id);
            await updateDoc(doc(fstore, "posts", params), {
              comment: increment(1)
            });
            commentText = "";
        } catch(err){
            console.log(err);
        }
  
}

const deleteMyComment = async(id) => {
    try{
        await deleteDoc(doc(fstore, "posts",`${params}`, "comments", `${id}`));
        await updateDoc(doc(fstore, "posts", params), {
              comment: increment(-1)
            });
    } catch(err) {
      console.log(err);
    }
}





</script>

<Toast/>

{#if post && post.problems}
{#if post.problems.length > 0}
<SideListSkeleton style="max-xl:hidden fixed right-10 min-w-[350px]">
  {#each post.problems as problem}
  <SideList name={problem.name} icon={icons[problem.owner]} link={problem.link}/>
  {/each}
</SideListSkeleton>
{/if}


<div class="ship max-sm:hidden max-md:hidden fixed bottom-0 right-0">
  <img class="h-[200px]" src={ship} alt="" />
</div>
  <div class="flex gap-3 items-center md:float-right max-sm:hidden">
    {#each post.tags as tag}
      <span
        class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary"
        >{tag}</span
      >
    {/each}
  </div>
  <div class="text-2xl flex items-center gap-3 font-hind font-bold">{post.title}
  {#if $userStore.uid == 'iO6NWstUISZXtTvTZdD9iiqWl2r2'}
  <a href="/edit/{params}"><Icon icon="basil:edit-solid" /></a>
  {/if}
  </div>
  <div class="flex gap-3 items-center md:hidden">
    {#each post.tags as tag}
      <span
        class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary"
        >{tag}</span
      >
    {/each}
  </div>
  <div class="m-0 p-0 flex gap-2 font-lato">
    <div class="flex gap-1 items-center justify-between">
      <img class="w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px] rounded-full" src="https://firebasestorage.googleapis.com/v0/b/blog-424dc.appspot.com/o/photo_2023-05-01_17-36-37.jpg?alt=media&amp;token=1b4d753d-3beb-4957-83cf-2a9f7650bd6e" alt="Rounded avatar">
    </div>
    <div class="">
      <div><span class="font-bold max-sm:text-[14px]">{post.author}</span></div>
      <div class="flex text-[14px] items-center text-gray-700 dark:text-gray-300 max-sm:text-[12px]"><span class="text-orange">{$common.getReadTime(content)} min read</span> <Icon icon="bi:dot" /> <span class="text-orange">{$common.getDate(post.createdAt)}</span> <Icon icon="bi:dot" /> <div class="flex items-center gap-1"> <Icon icon="cil:comment-bubble" /> {post.comment ? post.comment : "0"}</div></div>
    </div>
  </div>
  <hr />

  <div class="blog-content">
    {#if post.qt && post.qt !=="..."}
    <figure class="mb-5 max-w-screen-md font-hind mx-auto text-center">
      <svg
        aria-hidden="true"
        class="w-10 h-10 mx-auto mb-2 text-gray-400 dark:text-gray-600"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        /></svg
      >
      <p class="text-2xl italic font-medium text-gray-900 dark:text-white">
        {post.qt}
      </p>
      <figcaption class="flex items-center justify-center mt-2 space-x-3">
        <div
          class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
        >
          <cite class="pr-3 font-medium text-gray-900 dark:text-white"
            >– {post.qta}</cite
          >
        </div>
      </figcaption>
    </figure>
    {/if}
    <div>
    {@html content}
  </div>
  </div>
  {#if post.problems.length > 0}
<SideListSkeleton style="md:hidden">
  {#each post.problems as problem}
  <SideList name={problem.name} icon={icons[problem.owner]} link={problem.link}/>
  {/each}
</SideListSkeleton>
{/if}

<hr />

<!-- Recommended cards -->

<RecommendedCard tags={post.tags} currentId={params}/>

<hr/>



<!-- Comments -->
{#if comments.length > 0}
<div class="text-2xl max-sm:text-[16px] font-bold font-Lato"> Comments({comments.length})</div>
<SendInput  on:submit={handleSubmit} bind:commentText/>
{#each comments as c}
<CommentCard on:deleteComment={()=>deleteMyComment(c.id)} mycomment={c.author.id == $userStore.uid} photoUrl={c.author.photoURL} author={c.author.name} time={$common.getDate(c.createdAt)} comment={c.comment} like={c.like}/>
{/each}
{:else}
<div class="text-2xl max-sm:text-[16px] font-bold font-Lato"> Comments(0)</div>
<SendInput on:submit={handleSubmit} bind:commentText/>
{/if}

  {:else}
<div>Loading...</div>

{/if}





<style>
  .blog-content {
    font-family: "Lato", Kalpurush;
  }




</style>
