//auth context
import React, { useState, useEffect, useContext } from "react";

export type User = {
  email?: string;
  name?: string;
  isEmailVerified?: boolean;
};

type AuthContextType = {
  currentUser: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    console.log("signUp", email, password);
    setCurrentUser({
      userId: 1,
      email: email,
      name: "John Doe",
      isEmailVerified: true,
    });
    return Promise.resolve();
  }
  async function signIn(email: string, password: string) {
    console.log("signUp", email, password);
    setCurrentUser({
      userId: 1,
      email: email,
      name: "John Doe",
      isEmailVerified: true,
    });
    return Promise.resolve();
  }
  async function logout() {
    setCurrentUser(null);
    return Promise.resolve();
  }

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
