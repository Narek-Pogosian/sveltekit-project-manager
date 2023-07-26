<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Modal } from "flowbite-svelte";
  import toast from "svelte-french-toast";
  import LoadingButton from "../LoadingButton.svelte";
  let popupModal = false;
  let isSubmitting = false;

  export let id: string;
</script>

<Button
  on:click={() => (popupModal = true)}
  size="sm"
  class="h-fit"
  color="red"
  outline>Delete Project</Button
>

<Modal bind:open={popupModal} size="xs" outsideclose>
  <div class="text-center">
    <svg
      aria-hidden="true"
      class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this project?
    </h3>
    <div class="flex justify-center gap-4">
      <Button
        color="alternative"
        on:click={() => (popupModal = false)}
        disabled={isSubmitting}>No, cancel</Button
      >

      <form
        action="?/deleteProject&projectId={id}"
        method="post"
        use:enhance={() => {
          isSubmitting = true;

          return async ({ update, result }) => {
            if (result.type == "failure") {
              toast.error(String(result.data?.message));
            }
            if (result.type == "redirect") {
              toast.success("Project deleted successfully.");
            }

            popupModal = false;
            isSubmitting = false;
            update();
          };
        }}
      >
        <LoadingButton color="red" class="mr-2" isLoading={isSubmitting}
          >Yes, I'm sure</LoadingButton
        >
      </form>
    </div>
  </div>
</Modal>
