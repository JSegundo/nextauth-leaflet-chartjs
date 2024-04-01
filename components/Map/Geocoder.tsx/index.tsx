import React from "react"
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import { useMap } from "react-leaflet"
import { useEffect } from "react"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

interface GeocoderControlProps {
  onLocationSelect: (
    location: { lat: number; lng: number },
    name: string
  ) => void
}

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

const GeocoderControl = ({ onLocationSelect }: GeocoderControlProps) => {
  const map = useMap()

  useEffect(() => {
    const geocoder = (Leaflet.Control as any).Geocoder.nominatim()
    const control = (Leaflet.Control as any)
      .geocoder({
        geocoder: geocoder,
        showResultIcons: true,
        collapsed: true,
        position: "topright",
        placeholder: "Search...",
      })
      .addTo(map)

    control.on("markgeocode", (e: any) => {
      const { center, name } = e.geocode
      console.log(center, name)
      onLocationSelect(center, name)
    })

    return () => {
      control.remove()
    }
  }, [map, onLocationSelect])

  return null
}

export default GeocoderControl
