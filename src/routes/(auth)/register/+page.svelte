<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import { Input, Alert, Button } from "flowbite-svelte";

  export let form: ActionData;

  let isLoading = false;
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<h1 class="mb-10 text-3xl font-bold text-center">Register</h1>

<form
  action=""
  method="post"
  class="grid gap-4 w-[450px]"
  use:enhance={() => {
    isLoading = true;
    return async ({ update }) => {
      isLoading = false;
      update();
    };
  }}
>
  <Input type="text" name="name" placeholder="Name" />
  <Input type="text" name="email" placeholder="Email" />
  <Input type="password" name="password" placeholder="Password" />
  <Input
    type="password"
    name="confirmPassword"
    placeholder="Confirm Password"
  />

  {#if form?.errorMessage}
    <Alert color="red">
      <svg
        slot="icon"
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >
      <span>{form.errorMessage}</span>
    </Alert>
  {/if}

  <Button class="font-bold uppercase" type="submit" disabled={isLoading}
    >Register</Button
  >
  <div class="text-sm text-center">
    Already registered? <a
      href="/login"
      class="text-primary-500 hover:underline font-semibold"
    >
      Sign in here</a
    >
  </div>
</form>
