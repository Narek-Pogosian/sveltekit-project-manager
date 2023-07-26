import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Status } from "@prisma/client";

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = params.id;

  try {
    const task = await prisma.task.findFirst({
      where: { id: id },
    });

    if (task?.userId === locals.user.userId) {
      return {
        task: task,
      };
    }
  } catch (error) {}
};

export const actions: Actions = {
  editTask: async ({ url, request }) => {
    const id = url.searchParams.get("taskId");

    if (!id) return fail(400, { message: "Invalid task" });

    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const formDate = formData.get("expiresAt")?.toString()!;

    try {
      await prisma.task.update({
        where: { id: id },
        data: {
          title,
          description,
          expiresAt: formDate.length > 0 ? formDate + ":00.000Z" : null,
        },
      });

      return { success: true };
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }
  },

  updateStatus: async ({ url, request }) => {
    const id = url.searchParams.get("taskId");

    if (!id) return fail(400, { message: "Invalid task" });

    const status = (await request.formData()).get("status") as Status;

    try {
      await prisma.task.update({
        where: { id: id },
        data: {
          status: status,
        },
      });

      return { success: true, message: "Status updated successfully" };
    } catch (error) {
      return fail(500, { message: "Internal Server Error" });
    }
  },

  deleteTask: async ({ url }) => {
    const taskId = url.searchParams.get("taskId");
    if (!taskId) return fail(500, { message: "Invalid task" });

    const projectId = url.searchParams.get("projectId");

    console.log(url.searchParams);

    try {
      await prisma.task.delete({
        where: { id: taskId },
      });
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }

    throw redirect(303, `/project/${projectId}`);
  },
};
