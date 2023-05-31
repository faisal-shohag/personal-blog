<script>
  import { onMount } from 'svelte';
  import { collection, addDoc, Timestamp, doc, onSnapshot, updateDoc } from 'firebase/firestore'
  import { ref, update } from 'firebase/database';
  import {fstore, db, app} from '../../../firebase';
  import Icon from '@iconify/svelte';
  import {page} from '$app/stores';
  import Draggable from '../../../lib/Components/Draggable.svelte';
  const params = $page.params.editId;
  let value = "";
  const getAction = (action) => {
    value = action;
  }  
  let title, tags, qt, qta, content, mtags = false, express;
  let problems = [];
  let pname, plink, powner;
  let post;
  onMount(async()=>{		
        let textarea = document.getElementById('textarea');
        let el = document.getElementsByClassName('optionClick');
        let takeAction = function (){
            let startPos = textarea.selectionStart;
            let endPos = textarea.selectionEnd;
            textarea.value = `${textarea.value.substring(0, startPos)}${value}${textarea.value.substring(endPos, textarea.value.length)}`
        }
        Array.from(el).forEach(function(el) {
          el.addEventListener('click', takeAction);
        });

        //getpost
        const docRef= doc(fstore, "posts", params)
        onSnapshot(docRef, (doc) => {
          post = doc.data();
          content = (post.content).trim();
          title = post.title;
          tags = post.tags.join(',');
          qt = post.qt;
          qta = post.qta;
          express = post.express;
          problems = post.problems;

          console.log(problems);

          setTimeout(()=>{
            document.querySelectorAll('pre code').forEach(el=>{
                hljs.highlightElement(el);
            });
            MathJax.typeset();
          }, 1000);
        });

    });


    

    const submitBlog = async () =>{
        try {
          const postRef = doc(fstore, "posts", params);
          await updateDoc(postRef, {
                title: title,
                tags: tags.split(','),
                qt: qt,
                qta: qta,
                content: content,
                express: express,
                content: content,
                updatedAt: Timestamp.fromDate(new Date()),
                author: 'Faisal Shohag',
                problems: [...problems]
            });
            console.log('Document updated!');
        } catch(err){
            console.log(err);
        }
    }

    const addProblem = ()=>{
      problems.push({
        name: pname,
        link: plink,
        owner: powner
      });
      console.log(problems);
      problems = problems
    }

    const processBlog =  () => {
      setTimeout(()=>{
        document.querySelectorAll('pre code').forEach(el=>{
        hljs.highlightElement(el);
       });
       MathJax.typeset(); 
      }, 300);
    }

    

</script>


<div class="text-2xl font-hind font-bold">Add Info.</div>
<div class="variant-glass p-5 rounded-md flex flex-col gap-2">
<input class="input" type="text" placeholder="Title" bind:value={title} />
<input class="input" type="text" placeholder="Tags" bind:value={tags}/>
<input class="input" type="text" placeholder="Quote" bind:value={qt}/>
<input class="input" type="text" placeholder="QuoteAuthor" bind:value={qta} />
<input class="input" type="text" placeholder="Express few words..." bind:value={express} />
</div>		
<!-- problem show -->
<div class="text-2xl font-hind font-bold">Related Problems</div>
{#if problems.length>0}
{#each problems as problem}
  <div class="p-2 bg-green-500 text-white rounded-full mt-2">{problem.name}</div>
{/each}
{/if}
<!-- problem adding -->
<div>
  <input class="input" type="text" placeholder="Problem Name" bind:value={pname}/>
  <input class="input mt-1" type="text" placeholder="Problem Owner" bind:value={powner}/>
  <input class="input mt-1" type="text" placeholder="Problem link" bind:value={plink}/>
  <button on:click={addProblem} class="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</button>
</div>
<Draggable>
<div class="text-2xl font-hind font-bold flex justify-center bg-white dark:text-white dark:bg-black">Editor</div>
<div class="flex items-center gap-2 text-lg justify-center bg-gray-200 p-3 rounded-md flex-wrap">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<h1></h1>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="material-symbols:format-h1-rounded" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<h2></h2>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="material-symbols:format-h2-rounded" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<h5></h5>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="material-symbols:format-h5-rounded" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<b></b>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="ooui:bold-b" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<i></i>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="ooui:italic-i" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<u></u>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="ooui:underline-u" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<p></p>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="tabler:letter-p" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<pre><code class="language-"></code></pre>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="mingcute:code-fill" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`$$`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="fluent:math-formula-16-filled" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`$\\mathrm{}$`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="mingcute:formula-fill" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<code></code>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="fluent:highlight-16-filled" /></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => getAction(`<br/>`)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="dashicons:editor-break" /></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => getAction(`
      <ul class="list-disc list-inside">
        <li>List Title
          <ol class="list-decimal list-inside">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ol>
      </li>
      </ul>
      `)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="la:list-ol" /></div>
    
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => getAction(`
          <ol class="list-decimal list-inside">
            <li>List Title
              <ul class="list-disc list-inside">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
          </li>
          </ol>
          `)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="typcn:th-list" /></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => getAction(`
    <ul class="max-w-md space-y-1 list-inside">
        <li class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Item 1
        </li>
        <li class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Item 2
        </li>
        <li class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            Item 3
        </li>
    </ul>
    
      `)} class="optionClick p-2 variant-filled-secondary hover:variant-filled-primary rounded-lg cursor-pointer"><Icon icon="iconoir:task-list" /></div>
</div>
<textarea id="textarea" class="w-full h-[300px] border-s-1 rounded-md border-gray-300 text-black dark:text-white bg-white dark:bg-black" on:keydown={processBlog} bind:value={content}></textarea>
</Draggable>
<div class="text-2xl font-hind font-bold">Preview</div>
<div class="flex gap-3 items-center md:float-right max-sm:hidden">
  <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">Stack</span>
  <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">Algo</span>
  <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">DSA</span>
  <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">Python</span>
</div>
<div class="text-2xl font-hind font-bold">{title ? title:'Title'}</div>
{#if mtags}
<div class="flex gap-3 items-center md:hidden">
  {#each tags as tag}
    <span class="badge variant-soft-primary cursor-pointer hover:variant-filled-primary">{tag}</span>
  {/each}
</div>
{/if}
<div class="m-0 p-0 flex items-center justify-between font-hind"> <div class="flex gap-1 items-center justify-between"><Icon icon="line-md:edit" /> <span class="strong">Faisal Shohag</span></div> <div class="flex gap-1 items-center justify-between"><Icon icon="line-md:calendar" /> <span class="text-orange">dd/mm/yy</span></div></div>
<hr />

<div class="blog">
  {@html content}
</div>

<button on:click={submitBlog} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Submit</button>

