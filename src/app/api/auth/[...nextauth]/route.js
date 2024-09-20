import mongoose from "mongoose";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// MongoDB Connection Management
const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "receiptData",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Ensure MongoDB connection is established once
          await connectMongoDB();

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found with this email.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error("Invalid credentials.");
          }

          return user; // Return user object if authorized
        } catch (error) {
          console.error("Authorization Error: ", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect to this page for sign-in
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email; // Attach user ID to token
      }
      // console.log("JWT Token:", token);  // Log token for debugging
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      // console.log("Session:", session);  // Log session for debugging
      // Attach user ID to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
