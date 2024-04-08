import Link from "next/link"
import React from "react"

const Navbar = () => {
  return (
    <div className="flex items-center justify-around navbar bg-base-300  theme-controller">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          Surf data app
        </Link>
      </div>

      <input
        type="text"
        placeholder={"Search cities"}
        className="input input-bordered join-item w-full md:w-auto mb-2 md:mr-2"
      />

      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Navbar
