<script>
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import home from '../images/cosmos1.png';
  import {
    LightSwitch,
    AppShell,
    AppRail,
    AppRailTile,
  } from "@skeletonlabs/skeleton";
  import { Navbar, NavBrand, Dropdown, DropdownItem, DropdownDivider, DropdownHeader, Chevron } from "flowbite-svelte";
  import "../app.postcss";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import {onAuthStateChanged, signOut} from 'firebase/auth'
  import { fauth, db } from "../firebase";
  import {onMount} from 'svelte';
  import {userStore} from "../stores/userStore"
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';
  import { storeHighlightJs } from '@skeletonlabs/skeleton';
  storeHighlightJs.set(hljs);

  let me;
  onMount(async () => {
    onAuthStateChanged(fauth, async(user) => {
        if(user) {
            userStore.set({...user, loggedIn: true});
            me = user;
        } else{
           me = false
            console.log('User Not Logged In!');
            userStore.set({loggedIn: false});
        }
       
    });
  
  });

  let sideOpen = false;

  const openSide = () => {
    // console.log("sideOpen");
    sideOpen = !sideOpen;
  };
  $: open = sideOpen;

  const logOut = async() =>{
      try {
          await signOut(fauth);
      } catch (err) {
        console.log(err);
      }
  }
</script>

<svelte:head>
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
  <!-- <link
    href="https://cdn.quilljs.com/1.3.6/quill.bubble.css"
    rel="stylesheet"
  /> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css" integrity="sha512-rO+olRTkcf304DQBxSWxln8JXCzTHlKnIdnMUwYvQa9/Jd4cQaNkItIUj6Z4nvW1dqK0SKXLbn9h4KwZTNtAyw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
  ></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

</svelte:head>



<Navbar
  navClass="sticky top-0 flex justify-between items-center shadow-sm p-1 font-hind bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 dark:bg-opacity-20 border-1 border-gray-100 z-[99]"
  let:hidden
  let:toggle
>
  <NavBrand>
    <div class="flex items-center md:hidden">
      <button on:click={openSide} class="lg:hidden btn btn-sm mr-4">
        <span>
          <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
            <rect
              rx="10px"
              ry="10px"
              stroke-linejoin="round"
              width="100"
              height="20"
            />
            <rect
              rx="10px"
              ry="10px"
              stroke-linejoin="round"
              y="30"
              width="100"
              height="20"
            />
            <rect
              rx="10px"
              ry="10px"
              stroke-linejoin="round"
              y="60"
              width="100"
              height="20"
            />
          </svg>
        </span>
      </button>
    </div>

    <img
      src="https://cdn-icons-png.flaticon.com/512/534/534626.png"
      class="mr-3 h-6 sm:h-9"
      alt="Logo"
    />
    <span
      class="max-sm:hidden self-center whitespace-nowrap text-xl font-bold font-poppins dark:text-orange-600 text-orange-500"
    >
      Faisal.
    </span>
  </NavBrand>
 
  {#if me}
  <Chevron aligned><div><img class="w-[30px] h-[30px] rounded-full s-nb_ptBq0IalQ" src={me.photoURL} alt="Rounded avatar"></div></Chevron>
  <Dropdown>
    <DropdownHeader>{me.displayName}</DropdownHeader>
    <DropdownItem><div class="flex justify-between items-center"><div class="flex gap-1 items-center"><Icon icon="mdi:theme-light-dark" /> Theme</div> <LightSwitch/></div></DropdownItem>
    <DropdownItem slot="footer" on:click={logOut}>Sign out</DropdownItem>
  </Dropdown>
  {:else}
  <div class="flex gap-2 items-center">
  <a href="/auth"><button type="button" class="btn variant-soft-primary max-sm:btn-sm">
    <span><Icon icon="bi:google" /></span>
    <span>Sign In</span>
  </button></a>
  <Chevron aligned><Icon icon="entypo:dots-three-vertical" /></Chevron>
  <Dropdown>
    <DropdownItem><div class="flex justify-between items-center"><div class="flex gap-1 items-center"><Icon icon="mdi:theme-light-dark" /> Theme</div> <LightSwitch/></div></DropdownItem>
  </Dropdown>
</div>
  {/if}
 

</Navbar>

<AppShell
  slotSidebarLeft="{open
    ? 'max-sm:w-64 max-sm:left-0'
    : 'max-sm:w-0 max-sm:left-0'} transition-all duration-500 h-screen fixed transition z-[99]"
>
  <svelte:fragment slot="sidebarLeft">
    <AppRail>
      <AppRailTile 
      on:click={openSide} 
      label="Home" tag="a" 
      href={"/"} 
      value={0}
      class="{'/' === $page.url.pathname ? '!bg-primary-500' : ''}"
        >
        <img class="h-10" src={home} alt=""/>
        </AppRailTile
      >
      <!-- <AppRailTile
        on:click={openSide}
        label="Blogs"
        tag="a"
        href={"/blogs"}
        value={1}
        class="{'/blogs' === $page.url.pathname ? '!bg-primary-500' : ''}"
        ><Icon class="text-3xl" icon="line-md:edit-twotone-full" /></AppRailTile
      > -->
      <AppRailTile
        on:click={openSide}
        label="Resume"
        tag="a"
        href={"/resume"}
        value={2}
        class="{'/resume' === $page.url.pathname ? '!bg-primary-500' : ''}"
        ><Icon class="text-3xl" icon="line-md:document-list" />
        </AppRailTile
      >
      <!-- <AppRailTile
        on:click={openSide}
        label="Portfolio"
        tag="a"
        href={"/resume"}
        value={2}
        class="{'/resume' === $page.url.pathname ? '!bg-primary-500' : ''}"
        ><Icon
          class="text-3xl"
          icon="line-md:buy-me-a-coffee-filled"
        /></AppRailTile
      > -->
      <AppRailTile
        on:click={openSide}
        label="About"
        tag="a"
        href={"/about"}
        value={3}
        class="{'/about' === $page.url.pathname ? '!bg-error-500' : ''}"
        ><Icon class="text-3xl" icon="line-md:heart-filled" /></AppRailTile
      >
    </AppRail>
  </svelte:fragment>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:touchstart={() => {
      return open ? (sideOpen = !sideOpen) : open;
    }}
    class="container lg:max-w-[1000px] body p-10 pt-4 space-y-4 max-sm:p-3 rounded-b-sm h-auto shadow-lg"
  >
    <slot />
  <hr/>
    <div class="w-full  mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://hellofaisal.netlify.app/" class="hover:underline">Faisal™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a target="__blank" href="https://github.com/faisal-shohag/personal-blog" class="mr-4 hover:underline md:mr-6 "><Icon icon="octicon:logo-github-16" /></a>
        </li>
    </ul>
    </div>
  </div>

   

</AppShell>

<style>
  .body{
    height: auto;
    min-height: 100vh;
  }
</style>