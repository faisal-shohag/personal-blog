<script>
    import Icon from '@iconify/svelte';
    import sleep from '../../images/alien_cute2.png'
  import { onMount } from 'svelte';

// import { CodeBlock } from '@skeletonlabs/skeleton';
//   import Landing from '../../lib/Components/Landing.svelte';
    // let data = `<h1>Hello</h1>`
    onMount(()=>{
        document.title = "About";
    })
</script>
<div class="p-4 space-y-2 font-hind">
    <div class="head flex item-center gap-2 text-3xl max-sm:text-2xl uppercase font-bold"> 
        <img class="animate-pulse h-20 max-sm:h-10" alt="" src={sleep} />
        About
    </div>
    <hr/>
    <div class="p-4 inline-block items-center flex-wrap w-full variant-glass rounded-lg">
        This is a personal blog and portfolio website. I basically created it, in order to stay focus on study about <code class="mx-1">DS</code> , <code class="mx-1">Algo.</code> and <code class="mx-1">AI</code>.
        <div class="flex  flex-wrap items-center">
        This project is made with <Icon class="mx-1" icon="logos:svelte-kit" /> and <Icon icon="vscode-icons:file-type-firebase" />.</div> Svelte is my favourite framework (actually a compiler) because of it's tiny bundle size and blazing fast behaviour!
        <div class="flex flex-wrap text-sm items-center gap-1">You can find the entire project on<a target="__blank" href="https://github.com/faisal-shohag/personal-blog"><Icon icon="octicon:logo-github-16" /></a></div>
    </div>
</div>

<!-- <CodeBlock lineNumbers={true} language="html" code={`<div>This is meta</div>`}></CodeBlock>
<CodeBlock language="ts" code={`const skeleton: string = 'awesome';`}></CodeBlock> -->
<style>
.head{
    align-items: center;
}
</style>