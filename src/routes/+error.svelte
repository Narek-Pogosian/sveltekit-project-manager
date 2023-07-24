<script>
  import { Button } from "flowbite-svelte";
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <div class="flex w-auto flex-col items-center justify-center p-6 md:p-0">
    <div class="mb-8 flex w-full items-center">
      <div
        class="flex flex-none items-center justify-center rounded-full bg-white p-4"
      />
      <div class="mx-6 h-20 w-px bg-white" />
      <div class="text-xl font-semibold">
        Opps! The page you're looking for doesn't exist.
      </div>
    </div>
    <Button href="/" class="text-sm uppercase " color="alternative"
      >Return to Home Page</Button
    >
  </div>
</div>
