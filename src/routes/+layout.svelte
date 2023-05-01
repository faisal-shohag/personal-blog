<script>
import '@skeletonlabs/skeleton/themes/theme-crimson.css';
import '@skeletonlabs/skeleton/styles/all.css';
import { LightSwitch } from '@skeletonlabs/skeleton';
import { AppShell } from '@skeletonlabs/skeleton';
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
import "../app.postcss"
import Navigation from '../lib/Navigation/Navigation.svelte';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { fstore } from '../firebase';
import { postStore } from '../stores/postStore'
import { onMount } from 'svelte';

const getReadTime = (s) => {
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n"); 
    let words =  s.split(' ').filter(function(str){return str!="";}).length;
    return parseInt(words/200);
}

const getDate = (date) => {
    date = (date.toDate()).toString();
    date = date.split(' ');
    return `${date[2]} ${date[1]} ${date[3]}`
}

onMount(async()=>{
    const q = query(collection(fstore, "posts"), orderBy("createdAt", "desc"), limit(10))
    
    onSnapshot(q, snapshot=>{
      let p = [];
        snapshot.forEach(doc=>{
        console.log(doc.data());
        // getDate(doc.data().createdAt);     
        p.push({
            ...doc.data(),
            mins: getReadTime(doc.data().content),
            createdAt: getDate(doc.data().createdAt)
        })
    });   
    postStore.set([...p])
    })
});
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/night-owl.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js"></script>
</svelte:head>



<!-- <div class="sticky top-0 flex justify-between items-center bg-gray-300 shadow-sm p-2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-1 border-gray-100 ">
<div class="flex items-center"><img height="40" width="40" src="https://cdn-icons-png.flaticon.com/512/534/534626.png" alt=""> <div class="font-hind font-bold text-2xl space-x-10"> Faisal's Blog</div></div>

<div>
  <div class=" flex items-center gap-2 cursor-pointer font-hind text-xl font-bold text-pink-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
    Login    
  </div>
</div>
</div> -->

<Navbar navClass="sticky top-0 flex justify-between items-center shadow-sm p-1 font-hind bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 border-1 border-gray-100" let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src="https://cdn-icons-png.flaticon.com/512/534/534626.png"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-bold font-poppins dark:text-orange-600 text-orange-500">
      Faisal.
    </span>
    
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/all">All Blogs</NavLi>
    <NavLi href="/porfolio">Portfolio</NavLi>
    <NavLi href="/ai">AI</NavLi>
    <NavLi href="/about">About</NavLi>
  </NavUl>
 <div class=" absolute top-4 right-5"><LightSwitch /></div>
</Navbar>



<AppShell slotSidebarLeft="bg-transparent w-0 lg:w-64 h-screen fixed">
	<!-- <svelte:fragment slot="sidebarLeft"> 
		<Navigation/>
	</svelte:fragment> -->

  <div class="container p-10 pt-4 space-y-4 max-sm:p-3  rounded-b-sm h-auto shadow-md">
    <slot />
  </div>
  

</AppShell>


