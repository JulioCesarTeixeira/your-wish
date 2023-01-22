import * as trpc from "@trpc/server";
import { loginSchema, signUpSchema } from "@src/common/validation/auth";
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { AuthUser } from "@src/types/user";
import {
  checkUserCredentialsController,
  createUserAddressController,
  createUserController,
  updateUserAddressController,
} from "../controllers/user.controller";
import { addressSchema } from "@src/common/validation/user";

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
  createAddress: protectedProcedure
    .input(addressSchema)
    .mutation(async ({ input, ctx }) =>
      createUserAddressController({ input, ctx })
    ),
  updateAddress: protectedProcedure
    .input(addressSchema)
    .mutation(async ({ input, ctx }) =>
      updateUserAddressController({ input, ctx })
    ),
});
