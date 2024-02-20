import Link from "next/link"
import React from "react"

const HeroSection = () => {
  return (
    //   min-h-screen
    <div className="hero  ">
      <div className="hero-content flex-col lg:flex-row-reverse justify-around place-self-start">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold"> Stay Ahead of the Weather</h1>
          <p className="py-6">
            Enter your location to get accurate weather forecasts and stay
            informed about changing conditions.
          </p>
          <Link href={"/dashboard"}>
            <button className="btn-primary btn">go to dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
