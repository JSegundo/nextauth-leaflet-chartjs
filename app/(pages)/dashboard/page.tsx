"use client"
import React, { useState } from "react"
import Map from "@/components/Map/Map"
import DashboardInput from "@/components/ui/DashboardInput"
import DisplaySpotCard from "@/components/ui/Cards/DisplaySpotCard"
import { LocationSelectedInfo } from "@/interfaces/locationSelectedInterface"
import { initialLocationInfo } from "@/lib/constants"
import { useLocationSelected } from "@/contexts/locationSelectedContext"

const Dashboard = () => {
  const { locationInfo, setLocationInfo } = useLocationSelected()
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
            setlocationInfo={setLocationInfo}
            zoom={12}
          />
        </article>
        <article className="md:col-span-1 md:order-2 order-2">
          <DashboardInput />

          <div className="card card-side bg-base-100 shadow-xl w-fit">
            <div className="avatar placeholder p-2  ">
              <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                <span className="text-xs">UI</span>
              </div>
            </div>
            <div className="card-body p-2 gap-0">
              <h2 className="text-sm font-medium">{locationInfo.name} </h2>
              <p>{locationInfo.position.lat - locationInfo.position.lng}</p>
              {/* <p className="p-0">{icon}</p> */}
            </div>
          </div>
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
