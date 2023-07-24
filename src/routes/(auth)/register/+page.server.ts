import { fail, type Actions, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcrypt";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, "/");
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    const confirmPassword = data.get("confirmPassword")?.toString().trim();

    if (!email || !password || !confirmPassword || !name) {
      return fail(400, { errorMessage: "Please fill in all fields." });
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return fail(400, {
        errorMessage: "Invalid email.",
      });
    }

    if (!(password.length >= 6)) {
      return fail(400, {
        errorMessage: "Passwords needs to be atleast 6 characters.",
      });
    }

    if (!(password === confirmPassword)) {
      return fail(400, { errorMessage: "Passwords must match." });
    }

    try {
      const alreadyRegistered = await prisma.user.findUnique({
        where: { email: email },
      });

      if (alreadyRegistered)
        return fail(400, { errorMessage: "Email is already registered." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          userAuthToken: crypto.randomUUID(),
        },
      });

      cookies.set("session", user.userAuthToken, {
        // send cookie for every page
        path: "/",
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: "strict",
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === "production",
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (error) {
      return fail(500, { errorMessage: "Internal Server Error" });
    }

    // Everything correct
    throw redirect(303, "/");
  },
};
