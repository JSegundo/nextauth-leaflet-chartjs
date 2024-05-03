import { getWeather } from "@/lib/utils/getWeather"
import { LocationSelectedInfo } from "@/types/locationSelectedInterface"
import React, { useEffect, useMemo, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  locationInfo: LocationSelectedInfo
}

const optionsTemp = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      title: {
        display: true,
        text: "Temperature (°C)",
      },
    },
  },
}
const optionsPrecip = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      title: {
        display: true,
        text: "Precipitation",
      },
    },
  },
}
const optionsSunrise = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Days",
      },
    },
    y: {
      title: {
        display: true,
        text: "Time",
      },
    },
  },
}

const DashboardChartsSection = ({ locationInfo }: Props) => {
  let { lat, lng } = locationInfo.position
  const [weatherData, setweatherData] = useState<SpotWeatherData>()

  //displayMode
  const [displayMode, setdisplayMode] = useState("daily")
  const handleToggleMode = () => {
    setdisplayMode((displaymode) =>
      displaymode === "daily" ? "hourly" : "daily"
    )
  }

  // TEMPERATURE
  //daily
  const labelsNext15Days = weatherData?.days?.map((entry) => entry.datetime)
  const temperaturesNext15Days = weatherData?.days?.map((entry) => entry.temp)
  //hourly
  const labelsHourly = weatherData?.days[0].hours.map((entry) => entry.datetime)
  const temperaturesHourly = weatherData?.days[0].hours.map(
    (entry) => entry.temp
  )

  const temperatureData = useMemo(
    function () {
      let data
      let labels

      if (displayMode === "daily") {
        data = temperaturesNext15Days
        labels = labelsNext15Days
      } else {
        data = temperaturesHourly
        labels = labelsHourly
      }

      let datasets = [
        {
          fill: true,
          label: "Temperature data",
          data: data,
          tension: 0.8,
          borderColor: "#cc1234d1",
          pointRadius: 4,
          pointBackgroundColor: "#cc1234a3",
          backgroundColor: "#cc1234a3",
        },
      ]

      return {
        datasets,
        labels: labels,
      }
    },
    [labelsNext15Days, temperaturesNext15Days]
  )

  // PRECIPITATION
  //daily
  const precipitationNext15Days = weatherData?.days?.map(
    (entry) => entry.precip
  )
  const precipitationHourly = weatherData?.days[0].hours.map(
    (entry) => entry.precip
  )
  // probability
  const precipProbNext15Days = weatherData?.days?.map(
    (entry) => entry.precipprob
  )
  const precipProbHourly = weatherData?.days[0].hours.map(
    (entry) => entry.precipprob
  )

  const precipitationData = useMemo(
    function () {
      let data
      let labels
      let prob
      if (displayMode === "daily") {
        data = precipitationNext15Days
        labels = labelsNext15Days
        prob = precipProbNext15Days
      } else {
        data = precipitationHourly
        labels = labelsHourly
        prob = precipProbHourly
      }

      let datasets = [
        {
          fill: true,
          label: "Precipitation",
          data: data,
          tension: 0.5,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 4,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Precipitation Probabilty",
          data: prob,
          tension: 0.5,
          borderColor: "#cdcdcda1",
          pointRadius: 4,
          pointBackgroundColor: "#cdcdcda1",
          backgroundColor: "#cdcdcda1",
        },
      ]

      return {
        datasets,
        labels: labels,
      }
    },
    [
      displayMode,
      labelsHourly,
      labelsNext15Days,
      precipProbHourly,
      precipProbNext15Days,
      precipitationHourly,
      precipitationNext15Days,
    ]
  )

  // SUNRISE
  const [displayModeSun, setdisplayModeSun] = useState("sunset")
  const handleToggleModeSun = () => {
    setdisplayModeSun((displaymode) =>
      displaymode === "sunset" ? "sunrise" : "sunset"
    )
  }

  const sunriseNext15Days = weatherData?.days?.map((entry) => {
    const sunriseTime = entry.sunrise // Assuming sunrise is in format "06:33:11"
    const [hours, minutes, seconds] = sunriseTime.split(":")
    return Number(hours) + Number(minutes) / 60 + Number(seconds) / 3600
  })
  const sunsetNext15Days = weatherData?.days?.map((entry) => {
    const sunriseTime = entry.sunset // Assuming sunrise is in format "06:33:11"
    const [hours, minutes, seconds] = sunriseTime.split(":")
    return Number(hours) + Number(minutes) / 60 + Number(seconds) / 3600
  })

  const sunriseData = useMemo(
    function () {
      let labels = labelsNext15Days
      let data =
        displayModeSun === "sunrise" ? sunriseNext15Days : sunsetNext15Days

      let datasets = [
        {
          label: displayModeSun,
          data: data,
          tension: 0.1,
          borderColor: "#ddbb30",
          pointRadius: 4,
          pointBackgroundColor: "#ef3e16d9",
          backgroundColor: "#ef3e16d9",
        },
      ]

      return {
        datasets,
        labels: labels,
      }
    },
    [labelsNext15Days, sunriseNext15Days, sunsetNext15Days]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeather({ lat: `${lat}`, lng: `${lng}` })
        setweatherData(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [lat, lng])

  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer w-fit gap-2">
          <h4 className="text-xl">Display mode</h4>
          <input
            type="checkbox"
            className="toggle"
            onChange={handleToggleMode}
          />
          <span className="label-text">{displayMode}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 md:gap-8">
        <div>
          <Line
            options={optionsTemp}
            data={temperatureData}
            //   {...props}
          />
        </div>
        <div>
          <Line
            options={optionsPrecip}
            data={precipitationData}
            //   {...props}
          />
        </div>

        <div>
          <div className="form-control">
            <label className="label cursor-pointer w-fit gap-2">
              <h4 className="text-xl">Sunrise - Sunset</h4>
              <input
                type="checkbox"
                className="toggle"
                onChange={handleToggleModeSun}
              />
              <span className="label-text">{displayModeSun}</span>
            </label>
          </div>
          <Line
            options={optionsSunrise}
            data={sunriseData}
            //   {...props}
          />
        </div>
        {/* <div>
          <Line
            options={options}
            data={data}
            //   {...props}
          />
        </div> */}
      </div>
    </div>
  )
}

export default DashboardChartsSection
