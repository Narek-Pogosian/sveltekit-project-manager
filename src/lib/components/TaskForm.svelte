<script lang="ts">
  import { Input, Textarea } from "flowbite-svelte";

  const minDate = new Date()
    .toISOString()
    .slice(0, new Date().toISOString().lastIndexOf(":"));

  export let title = "";
  export let description = "";
  export let date: Date | null = null;
</script>

<div class="grid gap-4">
  <Input
    type="text"
    name="title"
    placeholder="Title"
    value={title}
    class="!bg-transparent"
    maxlength="55"
    required
  />
  <Textarea
    class="h-fit"
    rows="8"
    placeholder="Description (optional)"
    value={description}
    name="description"
  />

  <div>
    <label for="date-input" class="text-sm pl-2">Due date (optional)</label>
    <input
      type="datetime-local"
      value={date?.toISOString().slice(0, date.toISOString().lastIndexOf(":"))}
      name="expiresAt"
      id="date-input"
      min={minDate}
      class="rounded-lg w-full bg-transparent focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-500 text-sm text-slate-600 border-slate-200 dark:border-slate-600 dark:text-slate-300 py-1"
    />
  </div>
</div>
