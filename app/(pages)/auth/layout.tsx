import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../globals.css"
import Navbar from "@/app/components/ui/Navbar"
// import { auth } from "@/auth"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Log in Weather comparisson data App",
  description: "Compare and analyze weather data",
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //   const session = await auth()

  return <>{children}</>
}
