"use client"
import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useMapEvents } from "react-leaflet/hooks"
import L, { Icon } from "leaflet"
import { useMemo } from "react"

export default function MyMap(props: any) {
  const { position, setPosition, zoom, handleMapClick } = props

  const customIcon = new Icon({
    iconUrl: "/surf.png",
    iconSize: [38, 38],
  })

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <h2>asd</h2>
        </Popup>
      </Marker>
      <Mycomp setPosition={setPosition} />
    </MapContainer>
  )
}

const Mycomp = ({ setPosition }: any) => {
  // const mapHandlers = useMemo(
  //   () => ({
  //     click(e:any) {
  //       // center view on the coordinates of the click
  //       // `this` is the Leaflet map object
  //       this.setView([e.latlng.lat, e.latlng.lng])
  //     },
  //   }),
  //   []
  // )
  const map = useMapEvents({
    click(e) {
      const res = map.getBounds()
      const bounds = res.getNorthEast()
      var targetLocation = L.latLng(bounds.lat, bounds.lng)
      map.flyTo(targetLocation)
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })
  var marker = L.marker([50, -0.09]).addTo(map)
  return <></>
}
