<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import { Input, Button, Modal, Alert } from "flowbite-svelte";
  import toast from "svelte-french-toast";

  let formModal = false;
  let isSubmitting = false;
</script>

<button
  on:click={() => (formModal = true)}
  class="flex items-center gap-1 text-sm hover:text-primary-600 text-primary-500"
  >Create <PlusIcon /></button
>

<Modal
  bind:open={formModal}
  size="xs"
  title="Create a new project"
  autoclose={false}
  class="p-0"
  outsideclose
>
  <form
    action="/?/createProject"
    method="post"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ update, result }) => {
        isSubmitting = false;
        formModal = false;

        if (result.type == "success") {
          toast.success("New project created.");
        }

        if (result.type == "failure") {
          toast.error("Something went wrong");
        }
        update();
      };
    }}
  >
    <Input
      type="text"
      class="mb-5 input"
      name="title"
      placeholder="Project Title"
      required
    />
    <div class="flex justify-end gap-4">
      <Button
        color="alternative"
        type="button"
        aria-label="cancel"
        size="sm"
        on:click={() => (formModal = false)}
        disabled={isSubmitting}>Cancel</Button
      >
      <Button color="primary" type="submit" size="sm" disabled={isSubmitting}
        >Create</Button
      >
    </div>
  </form>
</Modal>
