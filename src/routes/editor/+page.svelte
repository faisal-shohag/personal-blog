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

       let str = '<p>Hello</p><p>sjskdj</p><h5>fff</h5><pre class="ql-syntax" spellcheck="false">class Node:<br>&nbsp; &nbsp; def __init__(self, val):<br>&nbsp; &nbsp; &nbsp; &nbsp; self.left = None<br>&nbsp; &nbsp; &nbsp; &nbsp; self.right = None<br>&nbsp; &nbsp; &nbsp; &nbsp; self.data = val&nbsp;<br></pre><p><br></p><p>sjdjhsd</p><p><br></p><p><br></p><p>djsdhs</p><p><br></p><p>dskjdjs</p><p><br></p><p>dsjdjh<strong>dsjdjs<em>djjjjdhj<u>djdj</u></em></strong></p><p>fjjshsh</p>'
        str = str.replaceAll('<br>', '\n')
        document.querySelector('.blog').innerHTML = str;

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

    let title, tags, qt, qta, content, mtags = false;

    
    const show = ()=>{
      let formData = {
          title: title,
          tags: Array.isArray(tags) ? tags : tags.split(','),
          qt: qt,
          qta: qta,
          content: (quill.root.innerHTML).replaceAll('\n', "<br>")
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
          content: content
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
<input class="input" type="text" placeholder="QuoteAuthor" bind:value={qta
} />
				

<div class="editor-wrapper">
    <div bind:this={editor} />
  </div>
<button on:click={show} class=" border-2 rounded-xl  text-white p-2 bg-blue-600 border-black
">show</button>
 

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
  {@html content}
</div>


<pre>  class Node:
    def __init__(self, val):
        self.left = None
        self.right = None
        self.data = val  

#create tree
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)
root.right.left = Node(6)
root.right.right = Node(7)

#dfs:preorder
def preorder(root):
  if root == None: return;
  print(root, end=" ");
  if root.left: preorder(root.left)
  if root.right: preorder(root.right)
</pre>
<p class="mt-14">I spent the next few summers indoors working on a rocket design, while I recovered from the multiple surgeries it took to fix my badly broken legs. It took nine iterations, but when I was 15 I sent my dad’s Blackberry into orbit and was able to transmit a photo back down to our family computer from space.</p>

<p class="mt-14">Today, I’m the founder of Planetaria, where we’re working on civilian space suits and manned shuttle kits you can assemble at home so that the next generation of kids really can make it to orbit — from the comfort of their own backyards.</p>



<div class="blog"></div>

<button on:click={getHtml} class=" border-2 rounded-xl  text-white p-2 bg-blue-600 border-black
">Submit</button>