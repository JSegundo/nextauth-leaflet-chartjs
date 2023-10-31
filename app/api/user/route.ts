import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
export async function GET() {
  return NextResponse.json({ success: true })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, password } = body

    const userExistsByEmail = await prisma.user.findUnique({ where: { email } })
    if (userExistsByEmail) {
      return Response.json(
        {
          user: null,
          message: "Account with that email already exists",
        },
        { status: 409 }
      )
    }

    const userExistsByName = await prisma.user.findUnique({
      where: { name },
    })

    if (userExistsByName) {
      return Response.json(
        {
          user: null,
          message: "Account with that name already exists",
        },
        { status: 409 }
      )
    }

    const hashedPass = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    })

    const { password: hashedPassword, ...rest } = newUser

    return NextResponse.json(
      {
        user: rest,
        message: "User created succesfully",
      },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something went wrong " + err,
      },
      { status: 500 }
    )
  }
}
