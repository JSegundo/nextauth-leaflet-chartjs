import { LocationPosition } from "@/types/locationSelectedInterface"

export const DEFAULT_CENTER: LocationPosition = {
  lat: 38.907132,
  lng: -77.036546,
} // user location ? fav spot

export const initialLocationInfo = {
  position: DEFAULT_CENTER,
  name: "",
}
