//auth context
import { hashPassword } from "@/src/lib/encryption/hashPassword";
import axios from "axios";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";

import React, { useState, useEffect, useContext } from "react";

export type User = {
  email?: string;
  name?: string;
  isEmailVerified?: boolean;
};

type AuthContextType = {
  currentUser: User;
  handleSignIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function signUp(email: string, password: string) {
    console.log("signUp", email, password);

    try {
      const res = await axios.post("/api/users/create", {
        credentials: {
          email,
          password,
        },
      });
      console.log("res auth context", res.data.user);

      await handleSignIn(email, password);

      setCurrentUser(res.data);
    } catch (err) {
      console.log("err", err);
      setCurrentUser(null);
    }
  }
  async function handleSignIn(email: string, password: string) {
    setLoading(true);
    console.log("signUp", email, password);
    try {
      await signIn("credentials", {
        email,
        password,
        // redirect: true,
        // callbackUrl: "/",
      });
    } catch (err) {
      console.log("err", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    setCurrentUser(null);
    return Promise.resolve();
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
