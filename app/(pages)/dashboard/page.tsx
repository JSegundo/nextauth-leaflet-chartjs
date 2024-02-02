"use client"
import React, { useState } from "react"
import Map from "@/components/map/Map"
import { useMapEvents } from "react-leaflet/hooks"

const Dashboard = () => {
  const [position, setPosition] = useState(null)

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng
    console.log(`Latitude: ${lat}, Longitude: ${lng}`)

    // Call a function to get weather data based on the coordinates (lat, lng)
    // getWeatherData(lat, lng);
  }
  //get user location and pass it

  return (
    <div className="w-3/4 h-full py-4">
      <Map
        position={[0, 0]}
        setPosition={setPosition}
        zoom={5}
        handleMapClick={handleMapClick}
      />
    </div>
  )
}

export default Dashboard
