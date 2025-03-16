import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { getSessionMaxAge } from "@/utils";

interface Credentials {
  email: string;
  token: string;
}

export const authorizedUsers = ["augustinenani@gmail.com"];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return {
          id: "1",
          email: (credentials as Credentials)?.email,
          name: null,
          image: null,
          password: (credentials as Credentials)?.token,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: getSessionMaxAge(),
  },

  pages: {
    signIn: "/signIn",
    error: "/auth/access-denied", // Error code passed in query string as ?error=
    // signOut: '/auth/signout',
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) {
        return (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        );
      }

      if (user) {
        user.image = "";
        return authorizedUsers.includes(user.email as string);
      }
      return false;
    },
    async session({ session, token }) {
      if (token) {
        token.picture = "";
      }
      if (session.user) session.user.image = "";
      return session;
    },
  },
};
