<script lang="ts">
  import SortIcon from "$lib/icons/SortIcon.svelte";

  export let name: string;
</script>

<button class="cursor-pointer flex gap-1 items-center">
  {name}
  <SortIcon />
</button>
