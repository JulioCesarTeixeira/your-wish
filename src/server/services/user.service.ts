import prisma from "@src/lib/prisma";
import * as trpc from "@trpc/server";
import { ILogin, ISignUp } from "@src/common/validation/auth";
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { AuthUser } from "@src/types/user";
import { IAddress, IPersonalInfo } from "@src/common/validation/user";

export const createUser = async (input: ISignUp) => {
  const { email, password } = input;

  const exists = await prisma.user.findFirst({
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

  const prismaUser = await prisma.user.create({
    data: { email, password: hash },
  });

  const {
    id,
    name,
    email: userEmail,
    emailVerified,
    role,
    createdAt,
  } = prismaUser;

  const user: AuthUser = {
    id,
    name,
    email: userEmail,
    isEmailVerified: emailVerified,
    role,
    createdAt,
  };

  return user;
};

export const checkUserCredentials = async (input: ILogin) => {
  const { email, password } = input;

  // Find a user by email in the database
  const prismaUser = await prisma.user.findFirst({
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

  // Compare the hashed password with the one in the database
  if (hash !== prismaUser.password) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "Incorrect password.",
    });
  }

  const {
    id,
    name,
    email: userEmail,
    emailVerified,
    role,
    createdAt,
  } = prismaUser;

  const user: AuthUser = {
    id,
    name,
    email: userEmail,
    isEmailVerified: emailVerified,
    role,
    createdAt,
  };

  return user;
};

// This function handles the upserting of user personal info into the database.
// It takes in the input from the user (firstName, lastName, phone, contactEmail)
// and the userId. It uses the prisma upsert method to either update or create
// a user profile in the database. It then returns the prismaPersonalInfo.
export const upsertUserPersonalInfo = async (
  input: IPersonalInfo,
  userId: string
) => {
  const { firstName, lastName, phone, contactEmail } = input;

  const prismaPersonalInfo = await prisma.profile.upsert({
    where: {
      userId,
    },
    update: {
      firstName,
      lastName,
      phone,
      contactEmail,
    },
    create: {
      firstName,
      lastName,
      phone,
      contactEmail,
      user: {
        connect: { id: userId },
      },
    },
  });

  return prismaPersonalInfo;
};

//get user profile by userId
export const getUserProfileByUserId = async (userId: string) => {
  const prismaPersonalInfo = await prisma.profile.findUnique({
    where: { userId },
  });

  return prismaPersonalInfo;
};
