import { router, protectedProcedure } from "../trpc";
import {
  createUserAddressController,
  updateUserAddressController,
  getAddressByIdController,
  getUserAddressesController,
} from "../controllers/address.controller";
import { addressSchema } from "@src/common/validation/user";
import { getAddressById } from "../services/address.service";
import { z } from "zod";

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
  getAddress: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => getAddressByIdController({ input, ctx })),
  getAddresses: protectedProcedure.query(async ({ ctx }) =>
    getUserAddressesController({ ctx })
  ),
});
