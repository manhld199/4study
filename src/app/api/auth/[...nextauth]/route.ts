import { User } from "@/libs/models";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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

          // Find user by email
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
          // Return user details including id, name, and email
          return {
            id: foundUser._id.toString(),
            email: foundUser.user_email,
            name: foundUser.user_name,
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
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };