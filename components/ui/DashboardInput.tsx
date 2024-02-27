import React from "react"

interface DashboardInputrops {
  position: [number, number]
}

const DashboardInput = ({ position }: DashboardInputrops) => {
  const [lat, lng] = position

  return (
    <div>
      <h2 className="text-xl font-medium pb-2">Save and compare!</h2>
      <div className="join">
        <input
          type="text"
          placeholder={JSON.stringify(lat + " " + lng) || "Name of this spot!"}
          className="input input-bordered join-item w-full md:w-auto mb-2 md:mr-2"
        />
        <button className="btn btn-primary join-item ">Save spot</button>
      </div>
    </div>
  )
}

export default DashboardInput
