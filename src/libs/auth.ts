import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/libs/models";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter both email and password.");
          }

          const user = await User.aggregate([
            { $match: { user_email: credentials.email } },
            { $limit: 1 },
          ]);

          if (user.length === 0) {
            throw new Error("Incorrect email or password.");
          }

          const foundUser = user[0];
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            foundUser.user_password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect email or password.");
          }
          console.log("User found:", foundUser);
          return {
            id: foundUser._id.toString(),
            email: foundUser.user_email,
            name: foundUser.user_name,
            image: foundUser.user_img,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during authentication.");
          }
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};