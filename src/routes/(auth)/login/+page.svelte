<script lang="ts">
  import { enhance } from "$app/forms";
  import LoadingButton from "$lib/components/LoadingButton.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type { ActionData } from "./$types";

  import { Input, Alert, Button } from "flowbite-svelte";

  export let form: ActionData;

  let isLoading = false;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1 class="mb-10 text-3xl font-bold text-center">Login</h1>

<form
  action=""
  method="post"
  class="grid gap-6 w-[450px]"
  use:enhance={() => {
    isLoading = true;
    return async ({ update }) => {
      isLoading = false;
      update();
    };
  }}
>
  <Input type="text" name="email" placeholder="Email" />
  <Input type="password" name="password" placeholder="Password" />

  {#if form?.errorMessage}
    <Alert color="red">
      <span>{form.errorMessage}</span>
    </Alert>
  {/if}

  <LoadingButton {isLoading} class="font-bold uppercase" color="primary"
    >Login</LoadingButton
  >

  <div class="text-sm text-center">
    Dont have an account? <a
      href="/register"
      class="text-primary-500 hover:underline font-semibold"
    >
      Register here</a
    >
  </div>
</form>

<form
  action=""
  method="post"
  class="mt-12"
  use:enhance={({ formData }) => {
    isLoading = true;
    formData.set("email", "demo@demo.com");
    formData.set("password", "a1b2z9y8");

    return async ({ update }) => {
      isLoading = false;
      update();
    };
  }}
>
  <LoadingButton
    color="alternative"
    {isLoading}
    class="font-bold uppercase w-full">Demo Account</LoadingButton
  >
</form>
