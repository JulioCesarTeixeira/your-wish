import { ILogin, ISignUp } from "@src/common/validation/auth";
import * as trpc from "@trpc/server";
import { Context } from "../context";
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { AuthUser } from "@src/types/user";
import { IAddress, IPersonalInfo } from "@src/common/validation/user";

// Create a user in the database using the input data.
// Return the user data.
export const createUserController = async ({
  input,
  ctx,
}: {
  input: ISignUp;
  ctx: Context;
}) => {
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
};

// Check user credentials
export const checkUserCredentialsController = async ({
  input,
  ctx,
}: {
  input: ILogin;
  ctx: Context;
}) => {
  const { email, password } = input;

  // Find a user by email in the database
  const prismaUser = await ctx.prisma.user.findFirst({
    where: { email },
  });

  // If the user was not found, throw an error
  if (!prismaUser) {
    throw new trpc.TRPCError({
      code: "NOT_FOUND",
      message: "User not found.",
    });
  }

  // Hash the password
  const { hash } = await hashPassword(password);

  // If the hashed password does not match the hashed password in the database, throw an error
  if (hash !== prismaUser.password) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid credentials.",
    });
  }
  const { id, name, emailVerified } = prismaUser;

  // Create a user object
  const user: AuthUser = {
    id,
    email,
    name,
    isEmailVerified: emailVerified,
  };

  // Return the user object
  return {
    status: 200,
    message: "Signed in successfully",
    user,
  };
};

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

  const address = await ctx.prisma.address.create({
    data: {
      ...input,
      userId: id,
    },
  });

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

  const address = await ctx.prisma.address.update({
    where: { id: input.addressId },
    data: {
      ...input,
    },
  });

  return {
    status: 200,
    message: "Profile updated successfully",
    address,
  };
};
