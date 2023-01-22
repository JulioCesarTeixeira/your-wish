import { ILogin, ISignUp } from "@src/common/validation/auth";
import * as trpc from "@trpc/server";
import { Context } from "../context";
import { IPersonalInfo } from "@src/common/validation/user";
import {
  checkUserCredentials,
  createUser,
  upsertUserPersonalInfo,
} from "../services/user.service";

// Create a user in the database using the input data.
// Return the user data.
export const createUserController = async ({
  input,
  ctx,
}: {
  input: ISignUp;
  ctx: Context;
}) => {
  const user = await createUser(input);

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
  const user = await checkUserCredentials(input);

  // Return the user object
  return {
    status: 200,
    message: "Signed in successfully",
    user,
  };
};

export const updatePersonalInfoController = async ({
  input,
  ctx,
}: {
  input: IPersonalInfo;
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

  const userProfile = await upsertUserPersonalInfo(input, id);

  return {
    status: 200,
    message: "Profile updated successfully",
    userProfile,
  };
};
