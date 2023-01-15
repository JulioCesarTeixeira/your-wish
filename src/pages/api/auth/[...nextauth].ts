import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import getServerUrl from "@src/helpers/getServerUrl";
import axios from "axios";
import { trpc } from "@src/utils/trpc";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "test@your-wish.be",
          required: true,
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log("credentials received", credentials);
        const baseUrl = getServerUrl();
        // const res = await fetch(`${baseUrl}/api/auth/check-credentials`, {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        //trpc server side call to check credentials
        // const response = trpc.user.signIn.useMutation({});

        const res = await axios.post(`${baseUrl}/api/auth/check-credentials`, {
          ...credentials,
        });
        console.log("res", res.data);
        const { user, success } = await res.data;

        // If no error and we have user data, return it
        if (success && user) {
          console.log("user", user);
          return user;
        }
        console.log(" no user found");
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  jwt: {
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },

  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // signIn(params) {
    //   console.log("signIn", params);
    //   return true;
    // },
    //add user id to token and return token
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // console.log({ token });
      // console.log({ user });
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
  },
};
export default NextAuth(authOptions);
