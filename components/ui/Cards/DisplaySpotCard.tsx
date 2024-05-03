import React from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { IoLocationOutline } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"
import { MdFavoriteBorder } from "react-icons/md"

interface DisplaySpotCardProps {
  name: string
  description?: string
  icon: string
}
const DisplaySpotCard = ({ name, description, icon }: DisplaySpotCardProps) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-fit">
      {/* <div className="avatar placeholder p-2  ">
        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
          <span className="text-xs">UI</span>
        </div>
      </div> */}
      <div className="card-body p-2 gap-0">
        <h2 className="text-sm font-extrabold">{name} </h2>
        <p>{description}</p>
        <p className="p-0">{icon}</p>
        <div className=" justify-end join">
          <button
            className="btn   join-item tooltip"
            data-tip="Save as favorite"
          >
            <MdFavoriteBorder className="text-xl" />
          </button>
          <button className="btn   join-item tooltip" data-tip="place in map">
            <IoLocationOutline className="text-xl" />
          </button>
          <button className="btn   join-item tooltip" data-tip="discard">
            <TiDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisplaySpotCard
