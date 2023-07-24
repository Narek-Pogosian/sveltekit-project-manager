// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        name: string;
        email: string;
        userId: string;
      };
    }
    interface PageData {
      flash?: { type: "success" | "error"; message: string };
    }

    // interface Platform {}
  }

  var prisma: PrismaClient;
}

export {};
