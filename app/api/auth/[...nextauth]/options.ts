import type { NextAuthOptions } from "next-auth"
// import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your password",
        },
      },

      async authorize(credentials) {
        console.log("credentials", credentials)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!existingUser) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          existingUser?.password
        )
        console.log(isPasswordValid)

        if (!isPasswordValid) {
          return null
        }
        console.log("asd")
        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
