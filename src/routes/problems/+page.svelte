<script>
    import Icon from '@iconify/svelte';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { writable } from 'svelte/store';
    // import { Timeline, TimelineItem, TimelineItemVertical, TimelineItemHorizontal, TimelineHorizontal, Activity, ActivityItem, Group, GroupItem } from 'flowbite-svelte';
    import { Dropdown, DropdownItem, ToolbarButton, MenuButton, DropdownDivider } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Button, Modal, Label, Input, Checkbox, Select } from 'flowbite-svelte'
    import toast, { Toaster } from 'svelte-french-toast';

    // supabase
    import {createClient} from '@supabase/supabase-js';
    import ProblemHead from '../../lib/Components/ProblemHead.svelte';
    const sbURL = 'https://cdwczasdurfzsiegsogb.supabase.co';
    const sbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd2N6YXNkdXJmenNpZWdzb2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3OTA1NTAsImV4cCI6MjAwNDM2NjU1MH0.Aye0LLaSfwDn5U400jmq0oTnjKEO4QIXNAxxbktCGLk';
    const sb = createClient(sbURL, sbKey);
    // 
    let formModal = false;

    let tabs = [
        {
            title: "✨ Top",
            name: "top",
            active: true,
            data: []
        },
        {
            title: "🌟 Revision",
            name: "rev",
            active: false,
            data: []
        },
        {
            title: "💖 Favorite",
            name: "fav",
            active: false,
            data: []
        },
        {
            title: "🌶 Hard",
            name: "hard",
            active: false,
            data: []
        }
    ]

const possibleTags = [
  { value: "top", name: "Top" },
  { value: "easy", name: "Easy" },
  { value: "medium", name: "Medium" },
  { value: "hard", name: "Hard" },
  { value: "array", name: "Array" },
  { value: "hashing", name: "Hashing" },
  { value: "string", name: "String" },
  { value: "recursion", name: "Recursion" },
  { value: "dp", name: "DP" },
  { value: "graph", name: "Graph Theory" },
  { value: "tree", name: "Tree" },
  { value: "backtracking", name: "Backtracking" },
  { value: "greedy", name: "Greedy" },
  { value: "sorting", name: "Sorting" },
  { value: "bs", name: "Binary Search" },
  { value: "bst", name: "Binary Search Tree" },
  { value: "stack", name: "Stack" },
  { value: "queue", name: "Queue" },
  { value: "sliding-window", name: "Sliding Window" },
  { value: "Math", name: "Math" },
];

const possibleCompanies = [
  {value:"google", name: "Google"},
  {value:"microsoft", name: "Microsoft"}, 
  {value:"amazon", name: "Amazon"}, 
  {value:"adobe", name: "Adobe"}, 
  {value:"linkedin", name: "LinkedIn"},
  {value:"facebook", name: "Facebook"},
  {value:"cisco", name: "Cisco"},
  {value:"oracle", name: "Oracle"},
  {value:"flipkart", name: "Flipkart"},
]

const problem_modal = () => {
    formModal = true;
}

let title = "";
let link = "";
let type = "";
let tag = "";
let company = "";
let platform = "";
let tags = [];
let companies = [];
let wait = 0;
let company_count = 0;

const addTag = () => {
    if(!tags.includes(tag)){
      tags.push(tag);
      tags = tags;
    } else {
      toast.error("Duplicates are not allowed!", {
      dismissible: true
      });
    }
}
const addCompany = () => {
  if(!companies.includes(company)){
      companies.push(company); 
      companies = companies;
    } else {
      toast.error("Duplicates are not allowed!", {
      dismissible: true
      });
    }
}

const save = async() => {
    let data = {title, link, companies, tags, type, platform, company_count};
    const {error} = await sb.from('Problems').insert({...data});
    console.log(data);
    console.log(error);
    toast.success("Saved!", {
      dismissible: true
    });

    title = "";
    link = "";
    type = "";
    tag = "";
    company = "";
    platform = "";
    tags = [];
    companies = [];

}

const del = async() => {

}

const addNewTag = async () => {
  const {error} = await sb.from('Problems').update({tags: ['dp', 'top']})
  .eq('id', 2);
  console.log(error);
}


let problems = [];
let total = 0;
onMount(async ()=>{
    document.title="Problems";
    //fetching initial data
    problems = [];
  const {data, count, error} = await sb.from('Problems')
  .select('*', {count: 'exact'})
  .contains('tags', [tabs[0].name]);
  problems = data;
  problems = problems;
  total = count;
  total = total;

  if(error){
    wait = -1;
  } else {
    wait = 1;
  }
  wait = wait;
    
});

//tab controller
let selectedTab = 0;
const tabSelect = async(tab, index) => {
  wait = 0;
  total = 0;
  selectedTab = index;
  //selecting certain tab
  let t = tabs.map((v, i) => {
    if(i!==index){
      return {...v, active: false};
    }
    return  {...v, active: true};
  });
  tabs = t;

  //fetching data 
  problems = [];
  const {data, count, error} = await sb.from('Problems')
  .select('*', {count: 'exact'})
  .contains('tags', [tabs[index].name]);
  problems = data;
  problems = problems;
  total = count;
  total = total;

  if(error){
    wait = -1;
  } else {
    wait = 1;
  }
  wait = wait;
}


let p_type = {
    "Easy" : "primary",
    "Medium" : " bg-orange-400 text-black",
    "Hard" : "error"
}

let placement = 'left';
</script>
<Toaster/>
<ProblemHead/>

<div class="flex flex-wrap justify-center items-center gap-4">
  {#each tabs as tab, index}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={()=>tabSelect(tab, index)} class="{tab.active ? 'variant-filled-primary' : 'variant-soft-primary'} p-2 rounded-lg cursor-pointer hover:variant-filled-primary">{tab.title}</div>
  {/each}
</div>


<div class="flex gap-2 flex-wrap items-center justify-center">
    {#each possibleTags as tag}
    <span class="chip variant-filled-primary">{tag.value}</span>
    {/each}
</div>

<center class="flex justify-center items-center gap-1">.::<hr class="w-[100px]"/>::.</center>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mt-5 text-[30px] font-bold flex justify-between items-center">{tabs[selectedTab].title}({total}) <span class="text-primary" on:click={problem_modal}><Icon icon="basil:edit-solid" /></span></div>
{#if wait==0}
  <div class="">Loading...</div>
{:else if wait == 1}
  {#if problems.length > 0}
  <div class="rounded-lg shadow-md sm:rounded-lg">
    <table class="w-full rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Problem
                </th>
                <th scope="col" class="px-6 py-3">
                    Level
                </th>
                <th scope="col" class="px-6 py-3">
                    Companies
                </th>
                <th scope="col" class="px-6 py-3">
                    Tags
                </th>
                <th scope="col" class="px-6 py-3">
                    Link
                </th>
                <th scope="col" class="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
    {#each problems as p}
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td class="w-4 p-4">
                          <div class="flex items-center">
                              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                          </div>
                      </td>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {p.title}
                      </th>
                      <td class="px-6 py-4">
                          {p.type}
                      </td>
                      <td class="px-6 py-4">
                          {(p.companies).join(', ')}
                      </td>
                      <td class="px-6 py-4">
                      {(p.tags).join(', ')}
                      </td>
                      <td class="px-6 py-4">
                          {p.platform}
                      </td>
                      <td class="px-6 py-4">
                       <MenuButton class="dots-menu dark:text-white" vertical />
                       <Dropdown {placement}  frameClass="z-50" triggeredBy=".dots-menu">
                        <DropdownItem>+Top✨</DropdownItem>
                        <DropdownItem>+Revision🌟</DropdownItem>
                        <DropdownItem>+Favorite💖</DropdownItem>
                        <DropdownItem>+Hard🌶</DropdownItem>
                        <hr>
                          <DropdownItem>+-Edit</DropdownItem>
                          <DropdownItem>-Delete</DropdownItem>
                      </Dropdown>
                    </td>
      </tr>
    {/each}
  </tbody>
</table>

</div>
  {:else}
    <div>No problem found!</div>
  {/if}

{:else}
  <div>Error!</div>
{/if}




 




<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-4" action="#">
      <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Add Problem</h3>
      <Label class="space-y-2">
        <span>Problem Name</span>
        <Input type="text" name="p_name" placeholder="Problem Name" bind:value={title} required />
      </Label>

      <Label class="space-y-2">
        <span>Problem Link</span>
        <Input type="text" name="p_name" placeholder="Problem Link" bind:value={link} required />
      </Label>

      <Label class="space-y-2">
        <span>Companies</span>
        <Select bind:value={company} items={possibleCompanies} placeholder="Select Companies" />
      </Label>
      <div class="flex gap-2 flex-wrap">
        {#each companies as c}
          <b>{c}</b>
        {/each}
        </div>
      <Button on:click={()=>addCompany()}>Add Company</Button>
      
      <Label class="space-y-2">
        <span>Company Count</span>
        <Input type="number" name="p_name" placeholder="Problem Link" bind:value={company_count} required />
      </Label>

      <Label class="space-y-2">
        <span>Tags</span>
        <Select bind:value={tag} items={possibleTags} placeholder="Select Tags" />
      </Label>
      <div class="flex gap-2 flex-wrap">
      {#each tags as t}
        <b>{t}</b>
      {/each}
      </div>
      <Button on:click={()=>addTag()}>Add Tag</Button>

      <Label class="space-y-2">
        <span>Problem Level</span>
        <Select bind:value={type} items={[{value:"Easy", name: "Easy"}, {value:"Medium", name: "Medium"}, {value:"Hard", name: "Hard"}]} placeholder="Select Level" />
      </Label>

      <Label class="space-y-2">
        <span>Platform</span>
        <Select bind:value={platform} items={[{value:"leetcode", name: "LeetCode"}, {value:"gfg", name: "GFG"}, {value:"cs", name: "CodeStudio"}]} placeholder="Select Platform" />
      </Label>
      <!-- // -->
      <Button on:click={()=>save()}>Save</Button>
    </form>
  </Modal>
 

<!-- <button on:click={()=>addNewTag()}>Add Tag</button> -->