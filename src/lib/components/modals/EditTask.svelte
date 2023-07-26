<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { enhance } from "$app/forms";
  import TaskForm from "../TaskForm.svelte";
  import toast from "svelte-french-toast";
  import type { Task } from "@prisma/client";
  import LoadingButton from "../LoadingButton.svelte";

  export let task: Task;

  let formModal = false;
  let isSubmitting = false;
</script>

<Button
  size="sm"
  class="h-fit"
  color="alternative"
  on:click={() => (formModal = true)}>Edit Task</Button
>

<Modal bind:open={formModal} size="md" title="Edit task." class="p-0">
  <form
    class="grid gap-4"
    action="?/editTask&taskId={task.id}"
    method="post"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ update, result }) => {
        formModal = false;
        isSubmitting = false;

        if (result.type == "success") {
          toast.success("Task edited");
        }

        if (result.type == "failure") {
          toast.error("Something went wrong");
        }
        update();
      };
    }}
  >
    <TaskForm
      date={task.expiresAt}
      description={task.description}
      title={task.title}
    />

    <div class="mt-6 flex justify-end gap-4">
      <Button
        on:click={() => (formModal = false)}
        color="alternative"
        type="button"
        disabled={isSubmitting}>Cancel</Button
      >
      <LoadingButton color="primary" isLoading={isSubmitting}
        >Edit</LoadingButton
      >
    </div>
  </form></Modal
>
