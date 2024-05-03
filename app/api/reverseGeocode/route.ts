export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  try {
    const res = await fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${location}`
    )
    const data = await res.json()
    let name
    if (data.address) {
      const countryName = data.address.CntryName
      const LongLabel = data.address?.LongLabel
      name = LongLabel ?? countryName
    }
    return Response.json(name)
  } catch (err) {
    throw new Error("Error while fetchin data reverse geocoder api")
  }
}
