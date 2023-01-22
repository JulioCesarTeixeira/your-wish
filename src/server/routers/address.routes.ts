import { router, protectedProcedure } from "../trpc";
import {
  createUserAddressController,
  updateUserAddressController,
} from "../controllers/address.controller";
import { addressSchema } from "@src/common/validation/user";

export const addressRouter = router({
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
