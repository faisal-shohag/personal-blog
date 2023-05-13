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
  import { Navbar, NavBrand } from "flowbite-svelte";
  import "../app.postcss";
 
  // import { postStore } from "../stores/postStore";
  // import { onMount } from "svelte";
  // import { writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";

  // const l = $page.url.searchParams.get('l');
  // const r = $page.url.searchParams.get('r');
  // console.log(l);
  // console.log(r);



  // onMount(async () => {
    
  // });
  // const storeValue = writable(0);

  let sideOpen = false;

  const openSide = () => {
    console.log("sideOpen");
    sideOpen = !sideOpen;
  };
  $: open = sideOpen;
</script>

<svelte:head>
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
  <link
    href="https://cdn.quilljs.com/1.3.6/quill.bubble.css"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/kimbie.dark.min.css">

  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
  ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>
  <script>
     MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [ ["$$","$$"]],
                      processEscapes: false,
                      packages: {
                          '[+]': ['physics', 'color', 'bbox', 'cancel', 'mhchem', 'noundefined', ]
                      }
            },
            svg: {
              fontCache: 'global',
              scale: 1
            },
            chtml: {
              scale: 0.8
            },
            loader: {
                      load: ['[tex]/physics', '[tex]/color', '[tex]/bbox', '[tex]/cancel', '[tex]/mhchem', '[tex]/noundefined']
                    },
                    tags: 'ams'
        };
  </script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
  
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
      alt="Flowbite Logo"
    />
    <span
      class="max-sm:hidden self-center whitespace-nowrap text-xl font-bold font-poppins dark:text-orange-600 text-orange-500"
    >
      Faisal.
    </span>
  </NavBrand>

  <div><LightSwitch /></div>
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
      <AppRailTile
        on:click={openSide}
        label="Blogs"
        tag="a"
        href={"/blogs"}
        value={1}
        class="{'/blogs' === $page.url.pathname ? '!bg-primary-500' : ''}"
        ><Icon class="text-3xl" icon="line-md:edit-twotone-full" /></AppRailTile
      >
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
  </div>
</AppShell>

<style>
  .body{
    height: auto;
    min-height: 100vh;
  }
</style>