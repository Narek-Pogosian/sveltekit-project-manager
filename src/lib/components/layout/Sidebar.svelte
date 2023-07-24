<script lang="ts">
  import CreateProject from "../modals/CreateProject.svelte";

  export let menuCollapsed: boolean;
  export let projects: {
    id: string;
    title: string;
    creatorId: string;
    createdAt: Date;
  }[];
</script>

<aside
  class={`p-8 w-72 bg-slate-100 border-r border-slate-200 dark:border-black/20 dark:bg-[#242d3b] overflow-y-auto 
    ${menuCollapsed ? "hidden" : "visible"}
  `}
>
  <div
    class="flex gap-5 items-center justify-between mb-6 pb-2 border-b-2 dark:border-white/5"
  >
    <h4 class="font-semibold tracking-wide">Projects</h4>
    <CreateProject />
  </div>
  <ul class="flex flex-col gap-3 text-sm">
    {#if projects.length > 0}
      {#each projects as project}
        <a href={`/project/${project.id}`}>{project.title}</a>
      {/each}
    {:else}
      No projects
    {/if}
  </ul>
</aside>
