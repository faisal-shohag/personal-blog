<script>
    import Icon from '@iconify/svelte';
    import { Confetti } from "svelte-confetti"
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