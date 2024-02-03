import { useEffect, useMemo, useState } from "react"
import Leaflet from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"

const { MapContainer } = ReactLeaflet

const Map = ({ children, className, width, height, ...rest }: any) => {
  return (
    <MapContainer className="w-100 h-full" {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <Mycomp />
    </MapContainer>
  )
}

export default Map

// const Mycomp = ({ setPosition }: any) => {
const Mycomp = () => {
  const [position, setPosition] = useState<any>(null)

  //   const mapHandlers = useMemo(
  //     () => ({
  //       click(e: any) {
  //         // center view on the coordinates of the click
  //         // `this` is the Leaflet map object
  //         this.setView([e.latlng.lat, e.latlng.lng])
  //       },
  //     }),
  //     []
  //   )
  //   map.on('click', function(e){
  //   var coord = e.latlng;
  //   var lat = coord.lat;
  //   var lng = coord.lng;
  //   console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
  //   });
  const map = ReactLeaflet.useMapEvents({
    click(e) {
      let coord = e.latlng
      //   let lat = coord.lat
      //   let lng = coord.lng
      //   const location = Leaflet.latLng(lat, lng)
      setPosition(e.latlng)

      //   const res = map.getBounds()
      //   const bounds = res.getNorthEast()
      //   var targetLocation = Leaflet.latLng(bounds.lat, bounds.lng)
      //   console.log("with bounds", targetLocation)
      //   map.flyTo(targetLocation)
    },
    // locationfound(e) {
    //   console.log(e.latlng)
    //   setPosition(e.latlng)
    //   //   map.flyTo(e.latlng, map.getZoom())
    // },
  })
  return position === null ? null : (
    <ReactLeaflet.Marker position={position}>
      <ReactLeaflet.Popup>You are here</ReactLeaflet.Popup>
    </ReactLeaflet.Marker>
  )
  var marker = Leaflet.marker([50, -0.09]).addTo(map)
  return <></>
}
