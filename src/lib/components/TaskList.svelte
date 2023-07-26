<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import TableHeadTitle from "./TableHeadTitle.svelte";
  import DeleteTask from "./modals/DeleteTask.svelte";
  import { dateToString } from "$lib/utils/getDateString";
  import type { Task } from "@prisma/client";

  export let tasks: Task[];

  type SortOptions = keyof Task;

  let sortkey: SortOptions | undefined;

  // order: 1 means ascending, -1 means descending
  let order: 1 | -1 = 1;

  function setSortKey(key: SortOptions) {
    if (key === sortkey && order === -1) {
      // if order is -1 then it is the third time we click on the filter.
      // reset sortkey to undefined, and the list will be unsorted.
      sortkey = undefined;
    } else if (key === sortkey) {
      // this is the second time we click on the filter
      order = -1;
    } else {
      // first time we click on a filter
      sortkey = key;

      if (key === "createdAt") {
        // tasks are sorted by createdAt ascending by default
        // so skip the sort for order = 1
        order = -1;
      } else {
        order = 1;
      }
    }
  }

  function sortBy(
    key: SortOptions | undefined,
    tasks: Task[],
    order: number
  ): Task[] {
    if (key) {
      if (key === "title") {
        return [...tasks].sort((a, b) =>
          a[key].toLowerCase() > b[key].toLowerCase() ? order : order * -1
        );
      }

      return [...tasks].sort((a, b) =>
        a[key]! > b[key]! ? order : order * -1
      );
    } else {
      return tasks;
    }
  }

  $: sortedTasks = sortBy(sortkey, tasks, order);
</script>

<div class="mt-8">
  <Table shadow>
    <TableHead>
      <TableHeadCell class="!pr-72" on:click={() => setSortKey("title")}
        ><TableHeadTitle name="Title" /></TableHeadCell
      >
      <TableHeadCell on:click={() => setSortKey("status")}
        ><TableHeadTitle name="Status" /></TableHeadCell
      >
      <TableHeadCell on:click={() => setSortKey("expiresAt")}
        ><TableHeadTitle name="Expires" /></TableHeadCell
      >
      <TableHeadCell on:click={() => setSortKey("createdAt")}
        ><TableHeadTitle name="Created" /></TableHeadCell
      >
      <TableHeadCell />
    </TableHead>
    <TableBody>
      {#each sortedTasks as task}
        <TableBodyRow>
          <TableBodyCell
            ><a href="/task/{task.id}"
              ><p
                class="hover:text-primary-500 first-letter:uppercase text-sm hover:underline"
              >
                {task.title}
              </p></a
            ></TableBodyCell
          >
          <TableBodyCell
            ><span class="text-xs">{task.status}</span></TableBodyCell
          >
          <TableBodyCell>
            <span class="text-xs"
              >{!task.expiresAt ? "--/--" : dateToString(task.expiresAt)}</span
            >
          </TableBodyCell>
          <TableBodyCell
            ><span class="text-xs">{dateToString(task.createdAt)}</span
            ></TableBodyCell
          >
          <TableBodyCell tdClass="p-0">
            <DeleteTask id={task.id} />
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
