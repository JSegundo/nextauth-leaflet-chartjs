"use client"
import React, { useState } from "react"
import Map from "@/components/Map/Map"
import { useMapEvents } from "react-leaflet/hooks"
import Leaflet from "leaflet"

const DEFAULT_CENTER = [38.907132, -77.036546]

const Dashboard = () => {
  const [position, setPosition] = useState(DEFAULT_CENTER)

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng
    console.log(`Latitude: ${lat}, Longitude: ${lng}`)

    // Call a function to get weather data based on the coordinates (lat, lng)
    // getWeatherData(lat, lng);
  }
  //get user location and pass it

  return (
    <div className="w-[95%] sm:w-3/4 h-full py-4">
      <Map
        // className={styles.homeMap}
        width="800"
        height="600"
        center={DEFAULT_CENTER}
        zoom={12}
      >
        {({ TileLayer, Marker, Popup }: any) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
      </Map>
      {/* <Map
        position={[0, 0]}
        setPosition={setPosition}
        zoom={5}
        handleMapClick={handleMapClick}
      /> */}
    </div>
  )
}

export default Dashboard
