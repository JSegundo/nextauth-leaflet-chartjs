"use client"
import {
  LocationSelectedInfo,
  LocationSelectedPosition,
} from "@/types/locationSelectedInterface"
import { initialLocationInfo } from "@/lib/constants"
import React, { createContext, useContext, useState } from "react"

interface contextValue {
  locationInfo: {
    position: LocationSelectedPosition
    name: string
  }
  setLocationInfo: React.Dispatch<
    React.SetStateAction<{
      position: LocationSelectedPosition
      name: string
    }>
  >
}

const LocationContext = createContext<contextValue | undefined>(undefined)

export const LocationProvider = ({ children }: any) => {
  const [locationInfo, setLocationInfo] =
    useState<LocationSelectedInfo>(initialLocationInfo)

  const contextValue: contextValue = {
    locationInfo,
    setLocationInfo,
  }

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationSelected = () => {
  const context = useContext(LocationContext)

  if (context === undefined)
    throw new Error("useLocationSelected context is undefined")

  return context
}
