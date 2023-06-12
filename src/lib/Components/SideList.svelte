<script>
    import Icon from "@iconify/svelte";
    export let icon;
    export let name;
    export let link;
</script>

   
        <li class="p-0">
          <a href="{link}" target="_blank" class="variant-glass hover:bg-surface-200-700-token w-full flex items-center justify-between p-2 rounded-full">
            <div class="flex gap-2 items-center">
            <span class="dark:text-white text-gray-950"><Icon icon={icon}/></span>
            <span class="flex-auto dark:text-white text-gray-950 max-w-[180px] truncate">{name}</span>
            </div>
            <div class="dark:text-white text-gray-950">
                <Icon icon="uil:external-link-alt" />
            </div>
          </a>
        </li>
   

        <style>
            li{
                padding: 0 !important;
            }
        </style>