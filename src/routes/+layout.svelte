<script>
import '@skeletonlabs/skeleton/themes/theme-crimson.css';
import '@skeletonlabs/skeleton/styles/all.css';
import { LightSwitch, AppShell, AppRail, AppRailTile} from '@skeletonlabs/skeleton';
import { Navbar, NavBrand} from 'flowbite-svelte'
import "../app.postcss"
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { fstore } from '../firebase';
import { postStore } from '../stores/postStore'
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import Icon from '@iconify/svelte';

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
        p.push({
            ...doc.data(),
            mins: getReadTime(doc.data().content),
            createdAt: getDate(doc.data().createdAt)
        })
    });   
    postStore.set([...p])
    })
});
const storeValue = writable(0);

let sideOpen = false;

const openSide = () => {
  console.log('sideOpen');
    sideOpen = !sideOpen;
}
$: open = sideOpen
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/night-owl.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js"></script>
</svelte:head>

<Navbar  navClass="sticky top-0 flex justify-between items-center shadow-sm p-1 font-hind bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 border-1 border-gray-100" let:hidden let:toggle>
  <NavBrand>
    <div class="flex items-center md:hidden">
      <button on:click={openSide} class="lg:hidden btn btn-sm mr-4">
          <span>
              <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                  <rect rx="10px" ry="10px" stroke-linejoin="round" width="100" height="20" />
                  <rect rx="10px" ry="10px" stroke-linejoin="round"  y="30" width="100" height="20" />
                  <rect rx="10px" ry="10px" stroke-linejoin="round" y="60" width="100" height="20" />
              </svg>
          </span>
      </button>
  </div>
  
    <img
      src="https://cdn-icons-png.flaticon.com/512/534/534626.png"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-bold font-poppins dark:text-orange-600 text-orange-500">
      Faisal.
    </span>
    
  </NavBrand>
  
 <div><LightSwitch /></div>
</Navbar>



<AppShell slotSidebarLeft="{open ? 'max-sm:w-64 max-sm:left-0' : 'max-sm:w-0 max-sm:left-0'} transition-all duration-500 h-screen fixed transition">
  <svelte:fragment slot="sidebarLeft"> 
		<AppRail selected={storeValue}>
      <AppRailTile on:click={openSide} label="Home" tag="a" href={"/"} value={0}><Icon class="text-3xl" icon="line-md:home-simple-filled" /></AppRailTile>
      <AppRailTile on:click={openSide} label="Blogs" tag="a" href={"/"} value={1}><Icon class="text-3xl" icon="line-md:edit-twotone-full" /></AppRailTile>
      <AppRailTile on:click={openSide} label="Portfolio" tag="a" href={"/"} value={2}><Icon class="text-3xl" icon="line-md:buy-me-a-coffee-filled" /></AppRailTile>
      <AppRailTile on:click={openSide} label="About" tag="a" href={"/"} value={3}><Icon class="text-3xl" icon="line-md:heart-filled" /></AppRailTile>
    </AppRail>
	</svelte:fragment>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div  on:touchstart={()=>{
    return open? sideOpen =!sideOpen : open;
  }} class="container p-10 pt-4 space-y-4 max-sm:p-3  rounded-b-sm h-auto shadow-md">
    <slot />
  </div>
</AppShell>


