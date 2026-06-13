// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { neon } from '@neondatabase/serverless';
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const sql = neon(process.env.DATABASE_URL);
        const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        const user = users[0];

        if (!user) throw new Error("No account found with this email.");

        // SECURITY CHECK: Is the email verified?
        if (user.is_verified === false) {
          throw new Error("Please check your email and verify your account first.");
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password_hash);
        if (!passwordsMatch) throw new Error("Invalid password.");

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Redirects here if they need to log in
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };