import { SetStateAction, useEffect, useMemo, useState } from "react"
import Leaflet, { Icon, LatLngExpression } from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { Dispatch } from "react"
import GeocoderControl from "./Geocoder.tsx"
import {
  LocationInfo,
  LocationPosition,
} from "@/app/(pages)/dashboard/page.jsx"

interface MyCompProps {
  locationInfo: LocationInfo
  setlocationInfo: Dispatch<SetStateAction<LocationInfo>>
}
interface MapProps {
  locationInfo: LocationInfo
  setlocationInfo: Dispatch<SetStateAction<LocationInfo>>
  zoom: number
  center: [number, number]
}

const { MapContainer } = ReactLeaflet

const TransformPositionToArrayCenter = ({ lat, lng }: any) => {
  return [Number(lat), Number(lng)] as LatLngExpression
}

const Map = ({ locationInfo, setlocationInfo, zoom, center }: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const handleLocationSelect = (
    location: { lat: number; lng: number },
    name: string
  ) => {
    setSelectedLocation(location)
    setlocationInfo({
      position: { lat: location.lat, lng: location.lng },
      name: name,
    })
  }

  return (
    <>
      <MapContainer
        className="w-100 h-full"
        style={{ borderRadius: "16px" }}
        zoom={13}
        center={TransformPositionToArrayCenter(locationInfo.position)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeocoderControl onLocationSelect={handleLocationSelect} />

        <Marker position={locationInfo.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Mycomp locationInfo={locationInfo} setlocationInfo={setlocationInfo} />
      </MapContainer>
      <div className="text-center">
        {selectedLocation ? (
          <p>
            Selected location: {locationInfo.name}
            {/* Selected location: {selectedName} */}
            <br />
            Coordinates: {selectedLocation.lat}, {selectedLocation.lng}
          </p>
        ) : (
          <p>No location selected.</p>
        )}
      </div>
    </>
  )
}

export default Map

const Mycomp = ({ locationInfo, setlocationInfo }: MyCompProps) => {
  const customIcon = new Icon({
    iconUrl: "/surf.png",
    iconSize: [38, 38],
  })

  const map = ReactLeaflet.useMapEvents({
    click(e) {
      const newPosition: LocationPosition = {
        lat: e?.latlng?.lat,
        lng: e?.latlng?.lng,
      }
      setlocationInfo({
        position: newPosition,
        name: "",
      })
    },
  })
  return locationInfo === null ? null : (
    <ReactLeaflet.Marker position={locationInfo.position} icon={customIcon}>
      <ReactLeaflet.Popup>Hi there!</ReactLeaflet.Popup>
    </ReactLeaflet.Marker>
  )
  var marker = Leaflet.marker([50, -0.09]).addTo(map)
  return <></>
}
