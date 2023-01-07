import * as trpc from "@trpc/server";
import { signUpSchema } from "@/src/common/validation/auth";
import { hashPassword } from "@/src/lib/encryption/hashPassword";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  // POST /api/user/signup
  // Create a new user
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const { hash } = await hashPassword(password);

      const result = await ctx.prisma.user.create({
        data: { email, password: hash },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
