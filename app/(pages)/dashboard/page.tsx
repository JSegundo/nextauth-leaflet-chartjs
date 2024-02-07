"use client"
import React, { useState } from "react"
import Map from "@/components/Map/Map"
import DashboardInput from "@/components/ui/DashboardInput"

const DEFAULT_CENTER: [number, number] = [38.907132, -77.036546] // user location ? fav spot
const Dashboard = () => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_CENTER)

  // const handleMapClick = (e: any) => {
  //   const { lat, lng } = e.latlng
  //   console.log(`Latitude: ${lat}, Longitude: ${lng}`)
  // }
  console.log("position desde dashboard", position)
  //get user location and pass it as center

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <section className="md:col-span-2 md:order-1 order-1 w-100">
        <Map
          center={position}
          position={position}
          setPosition={setPosition}
          zoom={12}
        />
      </section>
      <section className="md:col-span-1 md:order-2 order-2">
        <DashboardInput position={position} />
      </section>
    </section>
  )
}

export default Dashboard
