import { useState } from "react"
import Leaflet, { Icon, LatLngExpression } from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { Dispatch } from "react"
import GeocoderControl from "./Geocoder"
import { useLocationSelected } from "@/contexts/locationSelectedContext"
import { LocationSelectedPosition } from "@/types/locationSelectedInterface.js"

interface MapProps {
  zoom: number
  center: [number, number]
}

const { MapContainer } = ReactLeaflet

const TransformPositionToArrayCenter = ({ lat, lng }: any) => {
  return [Number(lat), Number(lng)] as LatLngExpression
}

const Map = ({ zoom, center }: MapProps) => {
  const { locationInfo, setLocationInfo } = useLocationSelected()

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
        <GeocoderControl />

        <Marker position={locationInfo.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Mycomp />
      </MapContainer>
    </>
  )
}

export default Map

const Mycomp = () => {
  const { locationInfo, setLocationInfo } = useLocationSelected()

  const customIcon = new Icon({
    iconUrl: "/surf.png",
    iconSize: [38, 38],
  })

  const map = ReactLeaflet.useMapEvents({
    click(e) {
      const newPosition: LocationSelectedPosition = {
        lat: e?.latlng?.lat,
        lng: e?.latlng?.lng,
      }
      setLocationInfo({
        position: newPosition,
        name: `${newPosition.lat} , ${newPosition.lng}`,
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
