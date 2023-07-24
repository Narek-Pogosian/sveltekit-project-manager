<script lang="ts">
  import type { PageServerData } from "./$types";
  import DeleteProject from "$lib/components/modals/DeleteProject.svelte";
  import CreateTask from "$lib/components/modals/CreateTask.svelte";
  import TaskList from "$lib/components/TaskList.svelte";
  import { getDateString } from "$lib/utils/getDateString";

  export let data: PageServerData;
  $: project = data.project;
</script>

<svelte:head>
  <title>{project?.title}</title>
</svelte:head>

{#if !project}
  <h1 class="text-6xl text-center pt-16">
    404 <br /> <span class="text-3xl">Project Not Found</span>
  </h1>
{/if}

{#if project}
  <div class="flex justify-between">
    <div>
      <h1 class="text-xl font-semibold">{project.title}</h1>
      <span class="text-sm text-slate-600 dark:text-slate-400"
        >{getDateString(project.createdAt)}</span
      >
    </div>
    <div class="flex gap-4">
      <CreateTask projectId={project.id} />
      <DeleteProject id={project.id} />
    </div>
  </div>

  {#if project.tasks.length > 0}
    <TaskList tasks={project.tasks} />
  {:else}
    <div class="pt-12 flex flex-col items-center">
      <h2 class="text-2xl mb-4">No tasks</h2>
      <CreateTask projectId={project.id} />
    </div>
  {/if}
{/if}
