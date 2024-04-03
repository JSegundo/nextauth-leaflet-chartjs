import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../globals.css"
import Sidebar from "@/components/ui/Sidebar"
import Navbar from "@/components/ui/Navbar"
import { auth } from "@/auth"
import { initialLocationInfo } from "@/lib/constants"
import { LocationProvider } from "@/contexts/locationSelectedContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Surf data App",
  description: "Compare and analyze weather data",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ height: "calc(100vh - 90px)", overflowY: "auto" }}
      >
        <LocationProvider>
          <>
            <Navbar />

            <Sidebar isAuth={session ? true : false}>
              <main className="w-100 h-full p-3">{children}</main>
            </Sidebar>
            {/* {session ? (
            <>
            <Navbar />
            
            <Sidebar>
            <main className="w-100 h-full p-3">{children}</main>
            </Sidebar>
            </>
            ) : (
              <>{children}</>
            )} */}
          </>
        </LocationProvider>
      </body>
    </html>
  )
}
