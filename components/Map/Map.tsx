import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
})

// const DEFAULT_WIDTH = 600
// const DEFAULT_HEIGHT = 600

const Map = (props: any) => {
  // const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props
  return (
    <div className="h-52 md:h-80 ">
      {/* <div style={{ aspectRatio: width / height, height: "600px" }}> */}
      <DynamicMap {...props} />
    </div>
  )
}

export default Map
