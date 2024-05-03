import { useLocationSelected } from "@/contexts/locationSelectedContext"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
  showweatherData: boolean
  setshowweatherData: Dispatch<SetStateAction<boolean>>
}

const DashboardInput = ({ showweatherData, setshowweatherData }: Props) => {
  const { locationInfo } = useLocationSelected()
  // const { lat, lng } = locationInfo.position

  const [spotName, setspotName] = useState("")

  useEffect(() => {
    setspotName("")
    setspotName(locationInfo.name)
    // setshowweatherData(false)
  }, [locationInfo])

  const handleButtonClick = async () => {
    setshowweatherData(true)
  }

  return (
    <div>
      <div className="join">
        <input
          type="text"
          placeholder={locationInfo.name || "Type a name for the spot"}
          className="input input-bordered join-item w-full md:w-auto mb-2 md:mr-2"
          onChange={(e) => setspotName(e.target.value)}
          value={spotName}
        />
        <button
          disabled={!spotName || showweatherData}
          className="btn btn-primary join-item "
          onClick={handleButtonClick}
        >
          View data
        </button>
      </div>
    </div>
  )
}

export default DashboardInput
