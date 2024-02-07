import { SetStateAction, useEffect, useMemo, useState } from "react"
import Leaflet, { Icon } from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup, TileLayer } from "react-leaflet"
import { Dispatch } from "react"

interface MyCompProps {
  position: [number, number]
  setPosition: Dispatch<SetStateAction<[number, number]>>
}
interface MapProps {
  position: [number, number]
  setPosition: Dispatch<SetStateAction<[number, number]>>
  zoom: number
  center: [number, number]
}

const { MapContainer } = ReactLeaflet

// const Map = ({ ...rest }) => {
const Map = ({ position, setPosition, zoom, center }: MapProps) => {
  return (
    <MapContainer
      className="w-100 h-full"
      style={{ borderRadius: "16px" }}
      zoom={13}
      center={position}
      //
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      {/* {children(ReactLeaflet, Leaflet)} */}
      {/* {children && children()} */}
      <Mycomp position={position} setPosition={setPosition} />
    </MapContainer>
  )
}

export default Map

const Mycomp = ({ position, setPosition }: MyCompProps) => {
  console.log(position)
  const customIcon = new Icon({
    iconUrl: "/surf.png",
    iconSize: [38, 38],
  })

  const map = ReactLeaflet.useMapEvents({
    click(e) {
      // console.log(e.containerPoint)
      console.log(e.latlng)
      const newPosition: [number, number] = [e?.latlng?.lat, e?.latlng?.lng]
      setPosition(newPosition)
    },
  })
  return position === null ? null : (
    <ReactLeaflet.Marker position={position} icon={customIcon}>
      <ReactLeaflet.Popup>Hi there!</ReactLeaflet.Popup>
    </ReactLeaflet.Marker>
  )
  var marker = Leaflet.marker([50, -0.09]).addTo(map)
  return <></>
}
