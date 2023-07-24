import type { Handle } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event);
  }

  if (!event.locals.user) {
    const user = await prisma.user.findUnique({
      where: { userAuthToken: session },
      select: { name: true, email: true, id: true },
    });
    if (user) {
      event.locals.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }

  return await resolve(event);
};
