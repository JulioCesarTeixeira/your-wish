import prisma from "@src/lib/prisma";
import * as trpc from "@trpc/server";
import { IAddress } from "@src/common/validation/user";

export const createUserAddress = async (input: IAddress, userId: string) => {
  const { street, city, state, zip, country, addressId } = input;

  const prismaAddress = await prisma.address.create({
    data: {
      street,
      city,
      state,
      country,
      zip,
      user: {
        connect: { id: userId },
      },
    },
  });

  return prismaAddress;
};

export const upsertUserAddress = async (input: IAddress, userId: string) => {
  const { street, city, state, zip, country, addressId } = input;

  const prismaAddress = await prisma.address.upsert({
    where: { id: addressId || "" },
    create: {
      street,
      city,
      state,
      country,
      zip,
      user: {
        connect: { id: userId },
      },
    },
    update: {
      street,
      city,
      state,
      country,
      zip,
    },
  });

  return prismaAddress;
};
