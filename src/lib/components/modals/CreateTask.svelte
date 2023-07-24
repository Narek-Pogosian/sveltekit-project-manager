<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { enhance } from "$app/forms";
  import toast from "svelte-french-toast";
  import TaskForm from "../TaskForm.svelte";

  export let projectId: string;

  let formModal = false;
  let isSubmitting = false;
</script>

<Button
  size="sm"
  class="h-fit"
  color="alternative"
  on:click={() => (formModal = true)}>Add task</Button
>

<Modal
  bind:open={formModal}
  size="md"
  title="Create new task."
  class="p-0"
  outsideclose
>
  <form
    class="grid gap-4"
    action="?/createTask&projectId={projectId}"
    method="post"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ update, result }) => {
        formModal = false;
        isSubmitting = false;

        if (result.type == "success") {
          toast.success("New task added successfully");
        }

        if (result.type == "failure") {
          toast.error("Something went wrong");
        }
        update();
      };
    }}
  >
    <TaskForm />

    <div class="mt-6 flex justify-end gap-4">
      <Button
        on:click={() => (formModal = false)}
        color="alternative"
        type="button">Cancel</Button
      >
      <Button type="submit" disabled={isSubmitting}>Add</Button>
    </div>
  </form></Modal
>
