<script>
    import Icon from '@iconify/svelte';
    import {onMount} from 'svelte'
    onMount(()=>{
        document.title = "Resume";
    })
</script>
<div  class="bg-white max-sm:zoom-50 dark:bg-gray-900 w-full h-auto p-10 font-lato">
<div class="text-center mb-2">
    <div class="text-4xl mb-1"><span class="font-light">Faisal</span> <span class="font-bold">Shohag</span></div>
    <div class="text-sm">---------@gmail.com | +88013xxxxxxxxxxxx | hellofaisal.netlify.app | Github: faisal-shohag</div>
</div>
<hr/>

<div class="flex mt-5 gap-10">
<div>
    <!-- Education -->
    <div>
    <div class="text-2xl font-light uppercase mb-2">Education</div>
    <div class="text-bold text-xl">Begum Rokeya University, Rangpur</div>
    <div class="text-md font-light">BSc in CSE(Studying)</div>
    <div class="text-sm font-light">Grad. March 2024 | CGPA: -:-</div>
    </div>

    <!-- Coursework -->
    <div class="mt-5">
        <div class="text-2xl font-light uppercase mb-2">CourseWork</div>
        <div class="text-bold text-xl">Undergraduate</div>
        <div class="text-sm font-light">
            <div>Object Oriented Programming</div>
            <div>Analysis & Design of Algorithm</div>
            <div>Data Structures</div>
            <div>RDBMS</div>
            <div>Theory of Computation & Automata</div>
            <div>Compiler Design</div>
            <div>Artificial Intelligent</div>
            <div>Micro-controller & Interfacing</div>
        </div>
    </div>

    <!-- Skills -->
    <div class="mt-5">
        <div class="text-2xl font-light uppercase mb-2">Skills</div>
        <div class="text-bold text-xl">Programming</div>
        <div class="text-md font-light mt-2">Languages:</div>
        <div class="text-sm font-light">
            <li>Advance: C++, JavaScript</li>
            <li>Intermediate: Java, Python</li>
            <li>Novice: Dart</li>
        </div>

        <div class="text-md font-light mt-2">Tools:</div>
        <div class="text-sm font-light">
            <li>Git</li>
            <li>Linux</li>
        </div>

        <div class="text-md font-light mt-2">Framework & Library:</div>
        <div class="text-sm font-light">
            <li>SvelteKit</li>
            <li>Flutter</li>
            <li>Electron Js</li>
        </div>

        <div class="text-md font-light mt-2">Technologies:</div>
        <div class="text-sm font-light">
            <li>Node Js</li>
            <li>JWT</li>
            <li>Prisma ORM</li>
            <li>Flutter</li>
            <li>Firebase</li>
            <li>MongoDB</li>
            <li>MySQL</li>
            <li>Tailwind CSS</li>
        </div>

        <div class="text-bold text-xl uppercase mt-4">Others</div>
        <div class="text-sm font-light">
            <li>Literature Writing</li>
        </div>
    </div>
    <!--  -->
</div>

<!-- section 2 -->
<div>
        <!-- Experience -->
        <div class="hidden">
        <div class="text-2xl font-light uppercase">Experience</div>
        <div class="text-[14px] font-bold uppercase mb-2">Fresher</div>
        </div>
        <!-- <div class="text-sm">3 Years</div>
        <div class="text-lg">Problem solving with C++, JavaScript & Python</div>
        <div class="text-sm">3 Years</div>
        <div class="text-lg">JavaScript & NodeJs</div>
        <div class="text-sm">1.5 Years</div>
        <div class="text-lg">SvelteKit</div> -->

        <!-- Programming Profiles -->
        <div class="mt-1">
            <div class="text-2xl font-light uppercase">Programming Profiles</div>
            <div class="text-lg italic mb-2 flex items-center gap-2"><Icon icon="simple-icons:leetcode" /> LeetCode <a class="flex items-center gap-1 text-sm" target="__blank" href="https://leetcode.com/faisalshohagprog/"><Icon icon="line-md:external-link-rounded" /> View</a></div>
            <div class="text-lg italic mb-2 flex items-center gap-2"><Icon icon="simple-icons:codechef" /> CodeChef <a class="flex items-center gap-1 text-sm" target="__blank" href="https://www.codechef.com/users/faisal_shohag"><Icon icon="line-md:external-link-rounded" /> View</a></div>
            <div class="hidden text-lg italic mb-2 flex items-center gap-2"><Icon icon="simple-icons:codeforces" /> Codeforces <a class="flex items-center gap-1 text-sm" target="__blank" href="https://codeforces.com/profile/Faisal_brur_11"><Icon icon="line-md:external-link-rounded" /> View</a></div>
        </div>
        <!-- Projects -->
        <div class="mt-5">
            <div class="text-2xl font-light uppercase mb-2">Selected Projects</div>
            <div class="text-bold text-xl flex items-center gap-2">Britto Edu. <a target="__blank" class="flex items-center gap-1 text-sm" href="https://britto.netlify.app"><Icon class="text-lg" icon="line-md:external-link-rounded" /> View</a></div>
            <div class="text-md font-light">An online MCQ exam website for university admission test students.</div>
            <div class="text-md font-light"><span class="font-bold">Tech. used: </span> HTML, CSS, JS, Firebase</div>
            
            <div class="mt-2 text-bold text-xl flex items-center gap-2">Projapoti <a target="__blank" class="flex items-center gap-1 text-sm" href="https://github.com/faisal-shohag/projapoti"><Icon class="text-lg" icon="line-md:external-link-rounded" /> View</a></div>
            <div class="text-md font-light">Android based bengali ebook reading app.</div>
            <div class="text-md font-light"><span class="font-bold">Tech. used: </span> Flutter, Firebase</div>

            <div class="mt-2 text-bold text-xl flex items-center gap-2">helloFaisal <a target="__blank" class="flex items-center gap-1 text-sm" href="https://hellofaisal.netlify.app"><Icon class="text-lg" icon="line-md:external-link-rounded" /> View</a></div>
            <div class="text-md font-light">Personal Blogging & Portfolio web app.</div>
            <div class="text-md font-light"><span class="font-bold">Tech. used: </span> Svelte, JavaScript, TailwindCSS, Firebase</div>

            <div class="mt-2 text-bold text-xl flex items-center gap-2">brurcoverpage <a target="__blank" class="flex items-center gap-1 text-sm" href="https://brurcoverpage.netlify.app"><Icon class="text-lg" icon="line-md:external-link-rounded" /> View</a></div>
            <div class="text-md font-light">Assignment coverpage downloading web app for my campus.</div>
            <div class="text-md font-light"><span class="font-bold">Tech. used: </span> Svelte, JavaScript, Firebase</div>

    
        </div>

        <!-- Achievements -->
        <div class="mt-5">
            <div class="text-2xl font-light uppercase mb-2">Achievements</div>
            <!-- <div class="font-bold text-xl">:(</div> -->
            <div class="font-bold text-lg">Grameen Phone Prothomalo Igen</div>
            <div>District Champion</div>

            <div class="font-bold mt-2 text-lg">Skill Dev. For Mobile Game & App. Project</div>
            <div>Participation | Two Hundred Hours of Training</div>

            <div class="font-bold mt-2 text-lg">LeetCode Data Structure I</div>
            <div>Badge</div>
        </div>
       
</div>

<!-- End -->

</div>
<hr class="mt-5"/>
</div>