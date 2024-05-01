"use client"
import React, { useState } from "react"
import Map from "@/components/Map/Map"
import DashboardInput from "@/components/ui/DashboardInput"
import DisplaySpotCard from "@/components/ui/Cards/DisplaySpotCard"
import { LocationSelectedInfo } from "@/types/locationSelectedInterface"
import { initialLocationInfo } from "@/lib/constants"
import { useLocationSelected } from "@/contexts/locationSelectedContext"
import DashboardChartsSection from "@/components/charts/DashboardChartsSection"

const Dashboard = () => {
  const { locationInfo, setLocationInfo } = useLocationSelected()
  const [showweatherData, setshowweatherData] = useState<any>()
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
          <DashboardInput
            showweatherData={showweatherData}
            setshowweatherData={setshowweatherData}
          />
        </article>
      </section>

      {/* show card selected spot */}
      {showweatherData && (
        <DisplaySpotCard
          name={locationInfo?.name}
          // icon={weatherData?.currentConditions?.icon}
          icon={"icon"}
        />
      )}
      {/* show graphs */}

      {showweatherData && (
        <section>
          <DashboardChartsSection locationInfo={locationInfo} />
        </section>
      )}
    </div>
  )
}

export default Dashboard
