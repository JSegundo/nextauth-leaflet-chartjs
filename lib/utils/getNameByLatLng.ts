export type getNameByLatLngProps = {
  lat: string
  lng: string
}

export async function getNameByLatLng({ lat, lng }: getNameByLatLngProps) {
  try {
    const res = await fetch(
      `/api/reverseGeocode?` +
        new URLSearchParams({ location: `${lat},${lng}` })
    )
    return res.json()
  } catch (err) {
    console.error(err)
    throw new Error("Error while fetching reverse geocoder data")
  }
}
