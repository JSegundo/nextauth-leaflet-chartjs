import React from "react"
import { TiDeleteOutline } from "react-icons/ti"

interface DisplaySpotCardProps {
  name: string
  description?: string
  icon: string
}
const DisplaySpotCard = ({ name, description, icon }: DisplaySpotCardProps) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-fit">
      <div className="avatar placeholder p-2  ">
        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
          <span className="text-xs">UI</span>
        </div>
      </div>
      <div className="card-body p-2 gap-0">
        <h2 className="text-sm font-medium">{name} </h2>
        <p>{description}</p>
        <p className="p-0">{icon}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-glass btn-sm">
            {/* <TiDeleteOutline /> */}X
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisplaySpotCard
