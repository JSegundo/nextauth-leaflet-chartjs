import { useState } from "react"
import Leaflet, { Icon, LatLngExpression } from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { Dispatch } from "react"
import GeocoderControl from "./Geocoder"
import { useLocationSelected } from "@/contexts/locationSelectedContext"
import { LocationSelectedPosition } from "@/types/locationSelectedInterface.js"
import {
  getNameByLatLng,
  getNameByLatLngProps,
} from "@/lib/utils/getNameByLatLng"

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
          // sin nombes capaz mejor calidad url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          // attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"

          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

  const handleOnMapClick = async (e: any) => {
    const newPosition: LocationSelectedPosition = {
      lat: e?.latlng?.lat,
      lng: e?.latlng?.lng,
    }

    const name = await getNameByLatLng({
      lat: `${newPosition.lat}`,
      lng: `${newPosition.lng}`,
    })

    setLocationInfo({
      position: newPosition,
      name: `${name}`,
    })
  }

  ReactLeaflet.useMapEvents({
    click(e) {
      handleOnMapClick(e)
    },
  })

  // Leaflet.marker(locationInfo.position)
  //   .addTo(map)
  //   .bindPopup(
  //     "<h1 className='text-xl'>asd</h1>A pretty CSS popup.<br> Easily customizable."
  //   )
  //   .openPopup()

  return locationInfo === null ? null : (
    <ReactLeaflet.Marker
      position={locationInfo.position}
      // icon={customIcon}
    >
      <ReactLeaflet.Popup>{locationInfo.name}</ReactLeaflet.Popup>
    </ReactLeaflet.Marker>
  )
}
