<script lang="ts">
  import { dateToString, getDateString } from "$lib/utils/getDateString";
  import { Button, Card, Select } from "flowbite-svelte";
  import type { PageServerData } from "./$types";
  import { enhance } from "$app/forms";
  import EditTask from "$lib/components/modals/EditTask.svelte";
  import toast from "svelte-french-toast";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";

  export let data: PageServerData;
  $: task = data.task;

  let selectedStatus = task?.status;
  let isUpdating = false;
</script>

<svelte:head>
  <title>Task</title>
</svelte:head>

{#if !task}
  <h1 class="text-6xl text-center pt-16">
    404 <br /> <span class="text-3xl">Task Not Found</span>
  </h1>
{/if}

{#if task}
  <div class="px-8">
    <div class="flex justify-between mb-16">
      <div class="flex gap-16 items-center">
        <div>
          <h1 class="text-xl font-semibold">{task.title}</h1>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <span class="text-base mr-2">Created:</span>
            {getDateString(task.createdAt)}
          </p>
        </div>
        {#if task.expiresAt}
          <div>
            <h2>Expires At</h2>
            <span class="text-sm text-slate-600 dark:text-slate-400"
              >{dateToString(task.expiresAt)}</span
            >
          </div>
        {/if}
      </div>
      <div class="flex gap-4">
        <EditTask {task} />
      </div>
    </div>

    <div class="flex gap-12">
      <div>
        <h5 class="mb-2 text-xl font-bold">Status</h5>
        <Card>
          <h6 class="mb-5">Current: {task.status}</h6>
          <form
            action="?/updateStatus&taskId={task.id}"
            method="post"
            class="grid gap-3"
            use:enhance={() => {
              isUpdating = true;
              return async ({ update, result }) => {
                isUpdating = false;

                if (result.type == "success") {
                  toast.success("Status updated successfully");
                }

                if (result.type == "failure") {
                  toast.error("Something went wrong");
                }
                update();
              };
            }}
          >
            <Select bind:value={selectedStatus} name="status">
              <option value="TODO" selected={task.status === "TODO"}
                >Todo</option
              >
              <option value="DOING" selected={task.status === "DOING"}
                >Doing</option
              >
              <option value="DONE" selected={task.status === "DONE"}
                >Done</option
              >
            </Select>
            <Button
              type="submit"
              disabled={selectedStatus === task.status || isUpdating}
              >{#if isUpdating}
                <LoaderIcon />
              {/if} Update</Button
            >
          </form>
        </Card>
      </div>
      {#if task.description.length > 0}
        <div>
          <h5 class="mb-2 text-xl font-bold">Description</h5>
          <Card>
            <p
              class="font-normal text-gray-700 dark:text-gray-400 leading-tight"
            >
              {task.description}
            </p>
          </Card>
        </div>
      {/if}
    </div>
  </div>
{/if}
