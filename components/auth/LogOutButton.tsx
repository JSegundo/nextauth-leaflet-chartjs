"use client"
import React from "react"
import PropTypes from "prop-types"
import { logout } from "@/actions/logout"
import { BiLogOut } from "react-icons/bi"

interface LogoutButtonProps {
  children?: React.ReactNode
}
const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onclick = () => {
    logout()
  }

  return (
    <button onClick={onclick} className="cursor-pointer btn btn-primary">
      <BiLogOut />
      Log out
    </button>
  )
}

export default LogoutButton
