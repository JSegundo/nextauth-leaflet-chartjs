import Link from "next/link"
import React from "react"
import WindowMockupMap from "./WindowMockupMap"

const HeroSection = () => {
  return (
    //   min-h-screen
    <div className="hero relative">
      <div className=" hero-content flex-col  md:flex-row justify-around place-self-start">
        <div>
          <h1 className="text-6xl font-bold">
            {" "}
            Monitor weather <br />
            on real-time dashboard
          </h1>
          <p className="py-6">
            Enter your location to get accurate weather forecasts and stay
            informed about changing conditions.
          </p>
          <Link href={"/dashboard"}>
            <button className="btn-primary btn">go to dashboard</button>
          </Link>
        </div>
      </div>
      <WindowMockupMap />
    </div>
  )
}

export default HeroSection
