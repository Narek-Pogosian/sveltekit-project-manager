<script lang="ts">
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { Button } from "flowbite-svelte";

  type Color =
    | "red"
    | "yellow"
    | "green"
    | "purple"
    | "blue"
    | "light"
    | "dark"
    | "primary"
    | "none"
    | "alternative";
  type Size = "xs" | "sm" | "lg" | "xl" | "md";

  export let isLoading: boolean = false;
  export let color: Color = "alternative";
  export let size: Size = "md";
</script>

<Button disabled={isLoading} type="submit" {color} {size} class={$$props.class}>
  {#if isLoading}
    <LoaderIcon />
  {/if}
  <slot /></Button
>
