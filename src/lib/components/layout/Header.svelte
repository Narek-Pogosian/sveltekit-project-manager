<script lang="ts">
  import { enhance } from "$app/forms";
  import ExitIcon from "$lib/icons/ExitIcon.svelte";
  import HomeIcon from "$lib/icons/HomeIcon.svelte";
  import MenuIcon from "$lib/icons/MenuIcon.svelte";
  import { DarkMode } from "flowbite-svelte";

  export let menuCollapsed: boolean;
</script>

<header
  class="fixed inset-0 flex items-center justify-between px-8 h-14 bg-slate-50 dark:bg-[#242d3b] shadow"
>
  <div class="flex items-center gap-4">
    <button on:click={() => (menuCollapsed = !menuCollapsed)}
      ><MenuIcon /></button
    >
    <a href="/"><HomeIcon /></a>
  </div>
  <div class="flex items-center gap-4">
    <form
      action="/?/logout"
      method="post"
      class="flex items-center"
      use:enhance
    >
      <button title="Sign Out"><ExitIcon /></button>
    </form>
    <DarkMode />
  </div>
</header>
