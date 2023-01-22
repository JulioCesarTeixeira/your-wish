import * as trpc from "@trpc/server";
import { loginSchema, signUpSchema } from "@src/common/validation/auth";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import {
  checkUserCredentialsController,
  createUserController,
  updatePersonalInfoController,
} from "../controllers/user.controller";
import { personalInfoSchema } from "@src/common/validation/user";

export const userRouter = router({
  // POST /api/user/signup
  // Create a new user
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => createUserController({ input, ctx })),
  signIn: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) =>
      checkUserCredentialsController({ input, ctx })
    ),
  updateProfile: protectedProcedure
    .input(personalInfoSchema)
    .mutation(async ({ input, ctx }) =>
      updatePersonalInfoController({ input, ctx })
    ),
});
