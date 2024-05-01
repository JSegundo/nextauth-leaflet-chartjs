type Props = {
  lat: string
  lng: string
}

export async function getWeather({ lat, lng }: Props) {
  try {
    const res = await fetch(
      `/api/weather?` + new URLSearchParams({ location: `${lat},${lng}` })
    )

    return res.json()
  } catch (err) {
    console.error(err)
    throw new Error("Error while fetching weather data")
  }
}
