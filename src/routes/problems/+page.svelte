<script>
    import Icon from '@iconify/svelte';
    import { Confetti } from "svelte-confetti"
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { writable } from 'svelte/store';
    import { Timeline, TimelineItem, TimelineItemVertical, TimelineItemHorizontal, TimelineHorizontal, Activity, ActivityItem, Group, GroupItem } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { Button, Modal, Label, Input, Checkbox, Select } from 'flowbite-svelte'
    import { ref, update, push, onValue } from 'firebase/database';
    import {db} from '../../firebase';

    let formModal = false;

    
    let tabSet = writable(0);


    let tabs = [
        {
            title: "⌛ Timeline",
            name: "time"
        },
        {
            title: "🌟 Revision",
            name: "rev"
        },
        {
            title: "💖 Favorite",
            name: "fav"
        },
        {
            title: "✨ Top",
            name: "Top"
        },
        {
            title: "🌶 Hard",
            name: "hard"
        }
    ]

const timeline_add = () => {
    formModal = true;
}

let date = "";
let title = "";
let link = "";
let type = ""
let problems = [];

const addProblem = () => {
        problems.push({title, link, type});
        // console.log(problems);
        problems = problems;
}

const addTimeline = () => {
    let data = {date, problems};
    push(ref(db, 'problems/timeline'), data);
    
}

let timeData = [];
onMount(()=>{
    document.title="Problems";
    const timeRef = ref(db, 'problems/timeline');

    onValue(timeRef, (snap) => {
        snap.forEach(timeline=>{
            timeData.push(timeline.val());
        })

        timeData.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // console.log(timeData);
        timeData = timeData;
    })

        
})

let p_type = {
    "Easy" : "primary",
    "Medium" : " bg-orange-400 text-black",
    "Hard" : "error"
}




</script>

<div class="variant-glass min-h-[100px] rounded relative overflow-hidden p-5">
    <Confetti noGravity x={[-2, 5]} y={[-1, 5]} delay={[2000, 1050]} duration=6000 colorRange={[240, 360]} infinite fallDistance="100vh" />
    <div class="top-head">
        <div class="blazing"></div>
        <div class="blazing"></div>
    </div>

    <div class="font-lato">
        <div class="animate__animated animate__fadeIn text-3xl max-sm:text-xl font-fold font-bold mb-2 drop-shadow-lg">
            <span class="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent box-decoration-clone">Problems</span>
            <span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">&</span>
            <span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">Me</span>
        </div>

           <div class="flex items-center gap-2 animate__animated animate__fadeInUp"> <Icon class="text-orange-400" icon="solar:star-bold-duotone" /> Topics</div>
           <div class="flex items-center gap-2 animate__animated animate__fadeInUp animate__delay-1s"> <Icon class="text-green-400" icon="solar:star-bold-duotone" /> Links</div>
           <div class="flex items-center gap-2 animate__animated animate__fadeInUp animate__delay-2s"> <Icon class="text-indigo-400" icon="solar:star-bold-duotone" /> Companies</div>
           <div class="flex items-center gap-2 animate__animated animate__fadeInUp animate__delay-3s"> <Icon class="text-pink-400" icon="solar:star-bold-duotone" /> Notes</div>
    </div>
</div>

<TabGroup 
	justify="justify-center gap-2 font-lato flex-wrap"
	active="variant-filled-primary dark:text-black"
	hover="hover:variant-glass-primary variant-soft"
	flex="flex"
	rounded="rounded-lg"
	border=""
	class=""
>
{#each tabs as tab, index}
<Tab bind:group={$tabSet} name={tab.name} value={index}>
    <div>{tab.title}</div>
</Tab>
{/each}
</TabGroup>

<center class="flex justify-center items-center gap-1">.::<hr class="w-[100px]"/>::.</center>


{#if $tabSet==0}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mt-5 text-[30px] font-bold flex justify-between items-center">{tabs[$tabSet].title} <span class="text-primary" on:click={timeline_add}><Icon icon="basil:edit-solid" /></span></div>
<div class="ml-5 font-lato">

{#each timeData as data}
<Timeline order="vertical">
    <TimelineItem customTimeClass="" title="" date={data.date}>
      <svelte:fragment slot="icon">
        <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
        <i class="fa-solid fa-calendar text-sm"> </i>
        </span>
      </svelte:fragment>
      {#each data.problems as problem}
       <a  target="_blank" href={problem.link}> <div class="text variant-glass-primary mt-1 p-1 rounded-lg flex justify-between items-center">{problem.title}  <span class="badge variant-filled-{p_type[problem.type]}">{problem.type}</span></div> </a>
      {/each}
    </TimelineItem>
  </Timeline>
{/each}

</div>
  {:else}
  <div class="mt-5 text-[30px] font-bold">{tabs[$tabSet].title}</div>
  <div class="variant-soft-error p-2 rounded-lg">This section is not completed yet!</div>

{/if}





<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Timeline</h3>
      <Label class="space-y-2">
        <span>Date</span>
        <Input type="text" name="date" placeholder="19 Jun 2023" bind:value={date} required />
      </Label>
      {#each problems as problem}
        <div class="">{problem.title} - {problem.type}</div>
      {/each}
      <Label class="space-y-2">
        <span>Problem Name</span>
        <Input type="text" name="p_name" placeholder="Problem Name" bind:value={title} required />
      </Label>
      <Label class="space-y-2">
        <span>Problem Link</span>
        <Input type="text" name="p_name" placeholder="Problem Link" bind:value={link} required />
      </Label>
      <Label class="space-y-2">
        <span>Problem Type</span>
        <Select bind:value={type} items={[{value:"Easy", name: "Easy"}, {value:"Medium", name: "Medium"}, {value:"Hard", name: "Hard"}]} placeholder="" />
      </Label>
      <Button on:click={addProblem}>Add Problem</Button>
      
      <Button on:click= {addTimeline} class="w-full1">Save</Button>

    </form>
  </Modal>




<style>
    .top-head{
    transform: skew(-20deg);
    width: 40px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    gap: 4px;
    z-index: 10;
    animation-name: blazing_anim;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-iteration-count: 3;
    animation-timing-function: ease-out;
}

.blazing{
    background: linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(216, 208, 208, 0.4) 100%);
    opacity: 1;
    filter: blur(0.5px);
    transform: scaleY(-1);
    width: 22px;
    height: 100%;
  
}

@keyframes blazing_anim{
    0% {
        left: 0%;
    }
    70% {
        left: 100%;
    }

    100% {
        left: 110%;
    }
}
</style>