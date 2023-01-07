// @/src/server/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import prisma from "../lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    req,
    res,
    session,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
