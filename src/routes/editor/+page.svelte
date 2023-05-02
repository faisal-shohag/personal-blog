<script>
  import { onMount } from 'svelte';
  import { collection, addDoc, Timestamp } from 'firebase/firestore'
  import { ref, update } from 'firebase/database';
  import {fstore, db, app} from '../../firebase';
  import Icon from '@iconify/svelte';
    let editor;
    export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }, { header: 5 }, { header: 6 },"blockquote", "link", "image", "code-block", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];

    let quill
    onMount(async()=>{
        const { default: Quill } = await import("quill");
        quill = new Quill(editor, {
        modules: {
            toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: "Write your story..."
        });

        document.querySelectorAll('pre').forEach(el=>{
        hljs.highlightElement(el);
        el.classList.add('p-3');
        el.classList.add('mt-3')
        el.classList.add('rounded-lg')
       });
       document.querySelectorAll('pre.hljs').forEach(block=>{
        hljs.lineNumbersBlock(block);
       });
    });

    let title, tags, qt, qta, content, mtags = false, express;

    
    const show = ()=>{
      let formData = {
          title: title,
          tags: Array.isArray(tags) ? tags : tags.split(','),
          qt: qt,
          qta: qta,
          content: (quill.root.innerHTML).replaceAll('\n', "<br>"),
          express: express
      }
      content = ((formData.content).replaceAll('&lt;', '<')).replaceAll('&gt;', '>');
      tags = formData.tags
      mtags = true;
      console.log(formData)
    }

    const getHtml = async () =>{
        //console.log("triggered!")
       // console.log((quill.root.innerHTML).replaceAll('\n', "<br>"))
       let formData = {
          title: title,
          tags: tags,
          qt: qt,
          qta: qta,
          content: content,
          express: express
      }
        //content = ((formData.content).replaceAll('&lt;', '<')).replaceAll('&gt;', '>');
        

        try {
            const docRef = await addDoc(collection(fstore, "posts"), {
                ...formData,
                content: content,
                createdAt: Timestamp.fromDate(new Date()),
                author: 'Faisal Shohag',
                like: 0,
                comments: [],
                reports: [],
                read: 0
            });
            console.log('Document written with ID: ', docRef.id);
            // await update(ref(db, "posts/"+docRef.id), {
            //     like: 0,
            //     comments: [],
            //     reports: [],
            //     read: 0
            // })
        } catch(err){
            console.log(err);
        }
    }


</script>


<label class="label">
	<input class="input" type="text" placeholder="Title" bind:value={title} />
</label>

<input class="input" type="text" placeholder="Tags" bind:value={tags}/>

<input class="input" type="text" placeholder="Quote" bind:value={qt}/>
<input class="input" type="text" placeholder="QuoteAuthor" bind:value={qta} />
<input class="input" type="text" placeholder="QuoteAuthor" bind:value={express} />
				

<div class="editor-wrapper">
    <div bind:this={editor} />
  </div>
<button on:click={show} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Show</button>
 

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

<div class="blog-content">
  {#if  content}
  {@html content}
  {:else}
  Content Goes Here...
  {/if}
  
</div>

<button on:click={getHtml} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Submit</button>

