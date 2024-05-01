"use client"
import Link from "next/link"
import React, { ReactNode } from "react"
import { MdSpaceDashboard } from "react-icons/md"
import { IoSettings } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"
import { FaCalendarAlt } from "react-icons/fa"
import { FaMapLocationDot } from "react-icons/fa6"

import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react"
import { logout } from "@/actions/logout"
import LogoutButton from "../auth/LogOutButton"
import { auth } from "@/auth"

type SidebarProps = {
  children: ReactNode
  isAuth: boolean
}

const routes = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    href: "/saved-location",
    name: "Saved location",
    icon: <MdFavorite />,
  },
  {
    href: "/calendar",
    name: "Calendar",
    icon: <FaCalendarAlt />,
  },
  {
    href: "/map",
    name: "Map",
    icon: <FaMapLocationDot />,
  },
  {
    href: "/settings",
    name: "Settings",
    icon: <IoSettings />,
  },
]

const Sidebar = ({ children, isAuth }: SidebarProps) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {children}
        {/* Page content here */}

        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div
        className="drawer-side"
        style={{ height: "calc(100vh - 100px)", overflowY: "auto" }} // extract navbar height to avoid unnecessary scroll
      >
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          {routes.map((route, idx) => (
            <li key={idx} className="my-1">
              <Link href={route.href} className="flex items-center ">
                {route.icon}
                {route.name}
              </Link>
            </li>
          ))}

          {isAuth && (
            <>
              <div className="divider"></div>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
