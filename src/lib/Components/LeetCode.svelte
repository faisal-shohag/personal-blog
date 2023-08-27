<script>
    import Icon from "@iconify/svelte";
    import { Doughnut } from 'svelte-chartjs';
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';
  import { onMount } from "svelte";
  import { ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';
  import moment from 'moment';
  import SvelteHeatmap from 'svelte-heatmap';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  let data;

  const parcent = (solved, total)=> Math.ceil((solved/total)*100);
  let leet;
  let submissionCalendar = [];
  let maxStreak = 0;
  let totalSubmission = 0;
  const dayDiff = (date1, date2) => {
    let one = new Date(date1);
    let two = new Date(date2);
    let diff = one - two;
    return Math.floor(diff/(1000 * 60 * 60 * 24));
  }
onMount(()=>{
    fetch('https://leetcode-api-faisalshohag.vercel.app/faisalshohagprog')
    .then(res=> res.json())
    .then(d=> {
        let cal = Object.entries(d.submissionCalendar);
        for(let i=0; i<cal.length; i++) {
            let date = new Date(parseInt(cal[i][0]) * 1000);
            submissionCalendar[i] = {
                date: date.toISOString(),
                value: cal[i][1]
            }
            totalSubmission += cal[i][1];
        }
        let cnt = 0;
        for(let i=0; i<submissionCalendar.length-2; i++){
            let diff = dayDiff(submissionCalendar[i+1].date, submissionCalendar[i].date);
            if(diff==1){
                cnt++;
            }
            if(diff!=1){
                maxStreak = Math.max(maxStreak, cnt);
                cnt = 0;
            }
        }
        maxStreak = Math.max(cnt, maxStreak);

        leet = {
            ...d,
            easy: parcent(d.easySolved, d.totalEasy),
            medium: parcent(d.mediumSolved, d.totalMedium),
            hard: parcent(d.hardSolved, d.totalHard)
        }
        data = {
         datasets: [
            {
            data: [leet.easy,leet.medium, leet.hard],
            backgroundColor: ['#0FB57D', '#EAB308', '#D41976'],
            hoverBackgroundColor: [
                '#22c55e',
                '#FFC870',
                '#FF5A5E'
            ],
            },
         ],
        };

        data = data;

    })
})

let options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2|2,
        borderWidth: 0,
        borderJoinStyle: 'round',
        cutout: 65,
}
  
</script>
<div class="variant-glass rounded-lg p-5">
    <div class="text-xl flex items-center justify-between pb-1">
        <div class="flex gap-2 items-center"><Icon icon="simple-icons:leetcode" /> LeetCode</div>
        <a class="flex items-center gap-1 text-sm" target="__blank" href="https://leetcode.com/faisalshohagprog/"><Icon icon="line-md:external-link-rounded" /> View</a>
    </div>
 <hr/>
 {#if data}
 <div class="flex items-center gap-3">
    <div class="w-[150px] relative">
        <div class="absolute text-center left-[35%] top-[35%]">
            <div class="dark:text-white text-2xl font-semibold">{leet.easySolved+leet.mediumSolved+leet.hardSolved}</div>
            <div class="dark:text-gray-400 text-gray-600">Solved</div>
        </div>
        <Doughnut {data} options={options} />
    </div>
<div class="w-[100%] flex flex-col gap-3">
    <div>
        <div class="dark:text-gray-400 text-gray-600 text-sm">
            Easy
            <span class="ml-5 text-lg dark:text-white font-bold">{leet.easySolved}</span><span>/{leet.totalEasy}</span>
        </div>
        <ProgressBar  meter="bg-primary-500" track="bg-primary-500/30" label="Progress Bar" value={leet.easy} max={100} />
    </div>  

    <div>
        <div class="dark:text-gray-400 text-gray-600 text-sm">
            Medium
            <span class="ml-5 text-lg dark:text-white font-bold">{leet.mediumSolved}</span><span>/{leet.totalMedium}</span>
        </div>
        <ProgressBar  meter="bg-warning-500" track="bg-warning-500/30" label="Progress Bar" value={leet.medium} max={100} />
    </div> 
    
    <div>
        <div class="dark:text-gray-400 text-gray-600 text-sm">
            Hard
            <span class="ml-5 text-lg dark:text-white font-bold">{leet.hardSolved}</span><span>/{leet.totalHard}</span>
        </div>
        <ProgressBar  meter="bg-error-500" track="bg-error-500/30" label="Progress Bar" value={leet.hard} max={100} />
    </div> 
</div>
 </div>

 {#if submissionCalendar.length > 0}
 <div class="mt-5">
    <div class=""><span class="text-md">{totalSubmission}</span> submissions</div>
    <div class="flex gap-5 text-[13px] mb-2"><span>Active days: {submissionCalendar.length}</span> <span>Max Streak: {maxStreak+2}</span> <span>Last Submission: {(moment(submissionCalendar[submissionCalendar.length-1].date).calendar()).split(' ')[0]}</span></div>
</div>
 <div>
    <SvelteHeatmap
    allowOverflow={true}
    cellGap={5}
    cellRadius={2}
    colors={['#3B7B54', '#53D680', '#71D192', '#71D192']}
    data={submissionCalendar}
    dayLabelWidth={20}
    emptyColor={'#222'}
    endDate={submissionCalendar[submissionCalendar.length-1].date}
    monthGap={20}
    monthLabelHeight={20}
    startDate={submissionCalendar[0].date}
    view={'monthly'},
    fontColor={'#868A88'}
  />
 </div>
 {/if}
 {:else}
 <div class="flex items-center gap-3 mt-3">
    <div class="w-[150px]"> <ProgressRadial width="w-[137px]" value={undefined} /> </div>
     <div  class="w-[100%]">
       <div class="animate-pulse mb-1 w-[80px] h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
       <div class="w-[100%] h-2 bg-gray-400 dark:bg-gray-600 rounded-full mb-3"></div>
       <div class="animate-pulse mb-1 w-[80px] h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
       <div class="w-[100%] h-2 bg-gray-400 dark:bg-gray-600 rounded-full mb-3"></div>
       <div class="animate-pulse mb-1 w-[80px] h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
       <div class="w-[100%] h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
     </div>
    </div>
 {/if}

</div>