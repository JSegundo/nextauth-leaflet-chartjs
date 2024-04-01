import { LocationInfo } from "@/app/(pages)/dashboard/page"
import React, {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react"

interface DashboardInputrops {
  locationInfo: LocationInfo
  setweatherData: Dispatch<SetStateAction<SpotWeatherData | {}>>
}

const DashboardInput = ({
  locationInfo,
  setweatherData,
}: DashboardInputrops) => {
  const { lat, lng } = locationInfo?.position

  const locationHasName = locationInfo.name.length > 1
  const locationShortName = locationHasName
    ? locationInfo.name.split(",")[0]
    : JSON.stringify({ lat, lng })
  const [spotName, setspotName] = useState("")

  const inputRef = createRef<any>()

  useEffect(() => {
    setspotName("")
  }, [locationInfo, locationShortName])

  const handleButtonClick = () => {
    fetchWeatherData(spotName)
  }
  const fetchWeatherData = async (spotName: string) => {
    try {
      const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=metric&key=L7XFDK5NBSEYS3HEVD4SWTWHG&contentType=json`
      )
      const data = await res.json()
      // adjuntar el name con la data
      const weatherDataWithLocation = { ...data, location: spotName }
      setweatherData(weatherDataWithLocation)
      // setweatherData(data)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-medium pb-2">Save and visualize data!</h2>
      <h3 className="text-l font-medium pb-2 break-words text-bold">
        {locationShortName}
      </h3>
      <div className="join">
        <input
          ref={inputRef}
          type="text"
          placeholder={locationShortName || "Type a name for the spot"}
          className="input input-bordered join-item w-full md:w-auto mb-2 md:mr-2"
          onChange={(e) => setspotName(e.target.value)}
          value={spotName}
        />
        <button
          disabled={!spotName}
          className="btn btn-primary join-item "
          onClick={handleButtonClick}
        >
          Save spot
        </button>
      </div>
    </div>
  )
}

export default DashboardInput
