"use client"
import React, { useState } from "react"
import Map from "@/components/Map/Map"
import DashboardInput from "@/components/ui/DashboardInput"
import DisplaySpotCard from "@/components/ui/Cards/DisplaySpotCard"

const DEFAULT_CENTER: LocationPosition = { lat: 38.907132, lng: -77.036546 } // user location ? fav spot

const initialLocationInfo = {
  position: DEFAULT_CENTER,
  name: "",
}

export type LocationPosition = {
  lat: number
  lng: number
}

export type LocationInfo = {
  position: LocationPosition
  name: string
}

const Dashboard = () => {
  const [locationInfo, setlocationInfo] =
    useState<LocationInfo>(initialLocationInfo)
  const [weatherData, setweatherData] = useState<any>()
  // const [weatherData, setweatherData] = useState<SpotWeatherData>()

  console.log("position desde dashboard", locationInfo)
  //get user location and pass it as center
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <article className="md:col-span-2 md:order-1 order-1 w-100 bg-base-100 shadow-xl">
          <Map
            center={locationInfo}
            locationInfo={locationInfo}
            setlocationInfo={setlocationInfo}
            zoom={12}
          />
        </article>
        <article className="md:col-span-1 md:order-2 order-2">
          <DashboardInput
            locationInfo={locationInfo}
            setweatherData={setweatherData}
          />
        </article>
      </section>

      {/* show card selected spot */}
      <section className="">
        {weatherData && (
          <DisplaySpotCard
            name={weatherData?.location}
            icon={weatherData?.currentConditions?.icon}
          />
        )}
      </section>
      {/* show graphs */}
      <section></section>
    </div>
  )
}

export default Dashboard
