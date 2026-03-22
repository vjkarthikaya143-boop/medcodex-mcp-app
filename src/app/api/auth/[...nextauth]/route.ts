import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "doctor@hospital.org" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock DB Authentication
        if (credentials?.email === "student@academy.com" && credentials?.password === "password") {
          return { id: "1", name: "Student Demo", email: "student@academy.com", role: "STUDENT" };
        }
        if (credentials?.email === "coder@hospital.org" && credentials?.password === "password") {
          return { id: "2", name: "Pro Coder", email: "coder@hospital.org", role: "CODER" };
        }
        return null; // Invalid credentials
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" }
});

export { handler as GET, handler as POST };
