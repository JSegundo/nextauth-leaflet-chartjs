import { useLocationSelected } from "@/contexts/locationSelectedContext"
import React, {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react"

interface Props {
  showweatherData: boolean
  setshowweatherData: Dispatch<SetStateAction<boolean>>
}

const DashboardInput = ({ showweatherData, setshowweatherData }: Props) => {
  const { locationInfo } = useLocationSelected()
  const { lat, lng } = locationInfo.position

  const [spotName, setspotName] = useState("")

  useEffect(() => {
    setspotName("")
    setspotName(locationInfo.name)
  }, [locationInfo])

  const handleButtonClick = async () => {
    setshowweatherData(true)
    // const data = await fetch(
    //   `/api/weather?` + new URLSearchParams({ location: `${lat},${lng}` })
    // )
    //  setWeatherData(data ) from context
    // try {
    //   const res = await fetch(
    //     `/api/weather?` + new URLSearchParams({ location: `${lat},${lng}` })
    // )
    //   console.log(res)
    //   // const weatherDataWithLocation = { ...data, location: spotName }
    //   // setweatherData(weatherDataWithLocation)
    // } catch (err) {
    //   console.error(err)
    // }
  }

  return (
    <div>
      <h2 className="text-3xl font-medium pb-2">Save and visualize data!</h2>

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
          Save spot
        </button>
      </div>
    </div>
  )
}

export default DashboardInput
