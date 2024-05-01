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

const options = {
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

const DashboardChartsSection = ({ locationInfo }: Props) => {
  let { lat, lng } = locationInfo.position
  const [weatherData, setweatherData] = useState<SpotWeatherData>()

  const labelsNext15Days = weatherData?.days?.map((entry) => entry.datetime)
  const temperaturesNext15Days = weatherData?.days?.map((entry) => entry.temp)
  //aca estoy mostrando los 15 dias, hago un toggle para que sea entre dias y horas del día?
  const labelsHourly = weatherData?.days[0].hours.map((entry) => entry.datetime)
  const temperaturesHourly = weatherData?.days[0].hours.map(
    (entry) => entry.temp
  )
  console.log("labelsNext15Days", labelsNext15Days)
  console.log("temperaturesNext15Days", temperaturesNext15Days)

  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            label: "Mis datos",
            data: temperaturesNext15Days,
            tension: 0.3,
            borderColor: "rgb(75, 192, 192)",
            pointRadius: 6,
            pointBackgroundColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.3)",
          },
          // {
          //   label: "Mis datos (2)",
          //   tension: 0.3,
          //   data: scores2,
          //   borderColor: "green",
          //   backgroundColor: "rgba(0, 255, 0, 0.3)",
          //   pointRadius: 6,
          // },
        ],
        labels: labelsNext15Days,
      }
    },
    [labelsNext15Days, temperaturesNext15Days]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeather({ lat: `${lat}`, lng: `${lng}` })
        console.log(data)
        setweatherData(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [lat, lng])

  return (
    <div>
      <Line
        options={options}
        data={data}
        //   {...props}
      />
    </div>
  )
}

export default DashboardChartsSection
