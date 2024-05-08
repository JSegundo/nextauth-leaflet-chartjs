const API_KEY = process.env.VISSUAL_CROSSING_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`
    )
    const data = await res.json()

    return Response.json(data)
  } catch (err) {
    throw new Error("Error while fetchin data from weather api")
  }
}
