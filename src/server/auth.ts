import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/server/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      // Attach userId + tier for client convenience (still enforce on server)
      if (session.user) {
        // @ts-expect-error extend session
        session.user.id = user.id;
        const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { tier: true } });
        // @ts-expect-error extend session
        session.user.tier = dbUser?.tier ?? "free";
      }
      return session;
    }
  }
};

export const nextAuthHandler = NextAuth(authOptions);
