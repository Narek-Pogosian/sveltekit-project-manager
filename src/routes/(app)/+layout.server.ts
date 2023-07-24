import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  const projects = await prisma.project
    .findMany({
      where: { creatorId: locals.user.userId },
    })
    .catch();
  return {
    projects: projects ?? [],
  };
}) satisfies LayoutServerLoad;
