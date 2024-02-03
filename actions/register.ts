"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/prisma"
import { RegisterSchema } from "@/schemas"
// import { sendVerificationEmail } from "@/lib/mail"
// import { generateVerificationToken } from "@/lib/tokens"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    console.log("asd")
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  } catch (err) {
    console.error(err)
    return { error: "something went wront" }
  }

  //   const verificationToken = await generateVerificationToken(email)
  //   await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent!" }
}
