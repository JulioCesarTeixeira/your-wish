//auth context
import { ILogin, ISignUp } from "@src/common/validation/auth";
import { paths } from "@src/constants/navigation";
import { sleep } from "@src/helpers/sleep";
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { AuthUser } from "@src/types/user";
import { trpc } from "@src/utils/trpc";
import { TRPCClientError } from "@trpc/client";
import axios from "axios";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React, { useState, useEffect, useContext } from "react";

type AuthContextType = {
  currentUser: AuthUser | null;
  handleSignIn: (data: ILogin) => Promise<void>;
  signUp: (data: ISignUp) => Promise<void>;
  logout: () => Promise<void>;
  status: "loading" | "authenticated" | "unauthenticated";
  session: Session | null;
  // resetPassword: (email: string) => Promise<void>;
  // updateEmail: (email: string) => Promise<void>;
  // updatePassword: (password: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode;
}) {
  const { data, status } = useSession();
  const { push } = useRouter();
  const { home, signIn: signInPage } = paths;
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: signUpMutation } = trpc.user.signup.useMutation();
  const { mutateAsync: signInMutation } = trpc.user.signIn.useMutation();

  async function signUp({ email, password }: ISignUp) {
    // console.log("signUp", email, password);

    try {
      await signUpMutation(
        { email, password },
        {
          onSuccess: () => {
            push(signInPage);
          },
        }
      );
      // console.log("auth context:  ", user);

      return Promise.resolve();
    } catch (err: any) {
      // console.log(
      //   "auth context err",
      //   err instanceof TRPCClientError ? "TRPC ERROR" : err
      // );
      setCurrentUser(null);
      return Promise.reject(err);
    }
  }
  async function handleSignIn({ email, password, rememberMe }: ILogin) {
    // console.log("signUp", email, password);
    try {
      await signInMutation(
        { email, password, rememberMe },
        {
          onSuccess: ({ user }) => {
            setCurrentUser({
              email: user.email,
              id: user.id,
              name: user.name,
              isEmailVerified: null,
              role: user.role,
              createdAt: user.createdAt,
            });

            push(home);
          },
        }
      );

      return Promise.resolve();
    } catch (err) {
      console.log("err", err);
      setCurrentUser(null);
    }
  }
  async function logout() {
    setCurrentUser(null);
    await signOut({ redirect: true, callbackUrl: signInPage });
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleSignIn,
        signUp,
        logout,
        status,
        session: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
