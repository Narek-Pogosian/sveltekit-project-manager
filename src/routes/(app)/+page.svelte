<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { getDateString } from "$lib/utils/getDateString";
  import CreateProject from "$lib/components/modals/CreateProject.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex flex-col items-center">
  <h1 class="text-center font-bold text-5xl mb-16">
    Welcome to Project Management
  </h1>

  {#if data.projects.length > 0}
    <h2 class="text-xl mb-8">Your Projects</h2>
    <div class="grid grid-cols-4 gap-8">
      {#each data.projects as project}
        <a href="/project/{project.id}">
          <Card>
            <h2 class="text-primary-500 text-lg font-semibold">
              {project.title}
            </h2>
            <p class="text-sm">{getDateString(project.createdAt)}</p>
          </Card>
        </a>
      {/each}
    </div>
  {:else}
    <h2 class="text-xl mb-2">You currently have no projects.</h2>
    <CreateProject />
  {/if}
</div>
