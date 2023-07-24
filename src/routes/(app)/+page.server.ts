import { redirect, type Actions, fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete("session", {
      path: "/",
      expires: new Date(0),
    });

    throw redirect(302, "/login");
  },

  createProject: async ({ request, locals }) => {
    const title = (await request.formData()).get("title")?.toString().trim();

    if (!title) return fail(400, { message: "Please enter a title." });

    try {
      const project = await prisma.project.create({
        data: {
          title,
          creatorId: locals.user.userId,
        },
      });

      if (project) return { success: true };
    } catch (error) {
      return fail(500, { message: "Something went wrong" });
    }
  },
};
