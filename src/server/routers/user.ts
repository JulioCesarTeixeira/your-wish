import * as trpc from "@trpc/server";
import { loginSchema, signUpSchema } from "@src/common/validation/auth";
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { router, publicProcedure } from "../trpc";
import { AuthUser } from "@src/types/user";

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
          cause: "auth/user-already-exists",
        });
      }

      const { hash } = await hashPassword(password);

      const res = await ctx.prisma.user.create({
        data: { email, password: hash },
      });

      const user: AuthUser = {
        id: res.id,
        email: res?.email,
        isEmailVerified: res?.emailVerified,
        name: res.name,
      };

      return {
        status: 201,
        message: "Account created successfully",
        user,
      };
    }),
  signIn: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const prismaUser = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (!prismaUser) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      const { hash } = await hashPassword(password);

      if (hash !== prismaUser.password) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials.",
        });
      }
      const { id, name, emailVerified } = prismaUser;

      const user: AuthUser = {
        id,
        email,
        name,
        isEmailVerified: emailVerified,
      };

      return {
        status: 200,
        message: "Signed in successfully",
        user,
      };
    }),
});
