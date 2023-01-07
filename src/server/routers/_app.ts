import * as trpc from "@trpc/server";
import { Context } from "../context";
import { router, publicProcedure } from "../trpc";
import { signUpSchema } from "@/src/common/validation/auth";
import { z } from "zod";

const appRouter = router({
  // This is the default, but it's good to be explicit
  // about the context type.
  // This is the type of the first argument to all procedures.
  // It's also the type of the second argument to createContext.
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      // const exists = await ctx.prisma.user.findFirst({
      //   where: { email },
      // });

      // if (exists) {
      //   throw new trpc.TRPCError({
      //     code: "CONFLICT",
      //     message: "User already exists.",
      //   });
      // }
    }),
});

export type AppRouter = typeof appRouter;
// export const serverRouter = trpc.router<Context>().mutation("signup", {
//   input: signUpSchema,
//   resolve: async ({ input, ctx }) => {
//     const { username, email, password } = input;

//     const exists = await ctx.prisma.user.findFirst({
//       where: { email },
//     });

//     if (exists) {
//       throw new trpc.TRPCError({
//         code: "CONFLICT",
//         message: "User already exists.",
//       });
//     }

//     const hashedPassword = await hash(password);

//     const result = await ctx.prisma.user.create({
//       data: { username, email, password: hashedPassword },
//     });

//     return {
//       status: 201,
//       message: "Account created successfully",
//       result: result.email,
//     };
//   },
// });

// export type ServerRouter = typeof serverRouter;
