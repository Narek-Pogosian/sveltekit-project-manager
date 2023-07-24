<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Modal } from "flowbite-svelte";
  import toast from "svelte-french-toast";
  let popupModal = false;

  export let buttonSize: "xs" | "sm" | "md";
  export let id: string;
</script>

<Button
  on:click={() => (popupModal = true)}
  class="h-fit"
  size={buttonSize}
  color="red"
  outline>Delete</Button
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
      Are you sure you want to delete this Task?
    </h3>
    <div class="flex justify-center gap-4">
      <Button color="alternative" on:click={() => (popupModal = false)}
        >No, cancel</Button
      >

      <form
        action="?/deleteTask&taskId={id}"
        method="post"
        use:enhance={() => {
          return async ({ update, result }) => {
            if (result.type == "failure") {
              toast.error(String(result.data?.message));
              popupModal = false;
            }
            if (result.type == "success") {
              toast.success("Task deleted successfully.");
              popupModal = false;
            }
            update();
          };
        }}
      >
        <Button color="red" class="mr-2" type="submit">Yes, I'm sure</Button>
      </form>
    </div>
  </div>
</Modal>
