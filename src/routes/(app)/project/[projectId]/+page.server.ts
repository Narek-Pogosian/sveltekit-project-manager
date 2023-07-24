import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: params.projectId,
      },
      include: {
        tasks: true,
      },
    });

    if (locals.user.userId === project?.creatorId) {
      return {
        project: project,
      };
    }
  } catch (error) {}
};

export const actions: Actions = {
  addTask: async ({}) => {},

  deleteProject: async ({ url }) => {
    const id = url.searchParams.get("projectId");
    if (!id) return fail(500, { message: "Invalid project" });

    try {
      await prisma.project.delete({
        where: { id: id },
      });
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }

    // Project deleted successfully
    throw redirect(303, "/");
  },

  deleteTask: async ({ url }) => {
    const id = url.searchParams.get("taskId");
    if (!id) return fail(500, { message: "Invalid task" });

    try {
      await prisma.task.delete({
        where: { id: id },
      });
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }

    return { success: true, message: "Task deleted successfully" };
  },

  createTask: async ({ url, request, locals }) => {
    const id = url.searchParams.get("projectId");
    if (!id) return fail(400, { message: "Invalid project" });

    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const formDate = formData.get("expiresAt")?.toString()!;

    if (!title) return fail(400, { message: "Please enter a title." });

    try {
      await prisma.task.create({
        data: {
          title: title,
          description: description || "",
          expiresAt: formDate.length > 0 ? formDate + ":00.000Z" : null,
          projectId: id,
          userId: locals.user.userId,
        },
      });

      return { success: true };
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }
  },
};
