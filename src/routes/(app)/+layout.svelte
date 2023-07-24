<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import type { LayoutData } from "./$types";
  import { Toaster } from "svelte-french-toast";

  export let data: LayoutData;

  let menuCollapsed = false;
</script>

<Header bind:menuCollapsed />
<div class="flex h-screen pt-14">
  <Sidebar projects={data.projects} {menuCollapsed} />
  <main class="flex-1 py-8 px-16 overflow-y-auto">
    <slot />
  </main>
</div>
<Toaster />
