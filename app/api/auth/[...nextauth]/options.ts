import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials, req) {
        //here is where i want to retrieve user data to verify with credentials
        // https://next-auth.js.org/providers/credentials
        console.log(credentials, req)
        const user = { id: "1", name: "segu", password: "examplepass" }
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
