import prisma from "@src/lib/prisma";
import { IAddress } from "@src/common/validation/user";
import * as trpc from "@trpc/server";
import { Context } from "../context";
import {
  createUserAddress,
  upsertUserAddress,
} from "../services/address.service";

export const createUserAddressController = async ({
  input,
  ctx,
}: {
  input: IAddress;
  ctx: Context;
}) => {
  const { session } = ctx;

  if (!session?.id) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }
  const id = session.id as string;

  const address = await createUserAddress(input, id);

  return {
    status: 200,
    message: "Profile updated successfully",
    address,
  };
};

export const updateUserAddressController = async ({
  input,
  ctx,
}: {
  input: IAddress;
  ctx: Context;
}) => {
  const { session } = ctx;
  if (!session?.id) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const id = session.id as string;

  const address = await upsertUserAddress(input, id);

  console.log(address);
  return {
    status: 200,
    message: "Profile updated successfully",
    address,
  };
};

export const removeUserAddressController = async ({
  input,
  ctx,
}: {
  input: IAddress;
  ctx: Context;
}) => {
  const { session } = ctx;
  if (!session?.id) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const address = await ctx.prisma.address.delete({
    where: { id: input.addressId },
  });

  return {
    status: 200,
    message: "Profile updated successfully",
    address,
  };
};
