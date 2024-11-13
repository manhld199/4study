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
            throw new Error("Vui lòng nhập đầy đủ email và mật khẩu.");
          }

          // Tìm người dùng dựa trên email
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

          return {
            id: foundUser._id,
            email: foundUser.user_email,
            name: foundUser.name,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Có lỗi xảy ra khi xác thực.");
          }
          throw new Error("Có lỗi xảy ra khi xác thực.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

