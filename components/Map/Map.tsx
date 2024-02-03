import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
})

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

const Map = (props: any) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props
  return (
    <div style={{ aspectRatio: width / height, height: "600px" }}>
      <DynamicMap {...props} />
    </div>
  )
}

export default Map
// export default function MyMap(props: any) {
//   const { position, setPosition, zoom, handleMapClick } = props

//   const customIcon = new Icon({
//     iconUrl: "/surf.png",
//     iconSize: [38, 38],
//   })

//   return (
//     <MapContainer
//       center={position}
//       zoom={zoom}
//       scrollWheelZoom={true}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position} icon={customIcon}>
//         <Popup>
//           <h2>asd</h2>
//         </Popup>
//       </Marker>
//       <Mycomp setPosition={setPosition} />
//     </MapContainer>
//   )
// }
