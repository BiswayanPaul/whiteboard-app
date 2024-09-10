import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { credentialsSchema } from "./utils/schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const validateFields = credentialsSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }

        const { email, password } = validateFields.data;

        try {
          const user = await getUserByEmail(email);
          console.log(user);
          if (!user) {
            return null;
          }
          const matchPassword = await bcrypt.compare(password, user.password);

          if (matchPassword) {
            return user;
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "auth/login",
  // },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
