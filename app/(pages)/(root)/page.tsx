import HeroSection from "@/components/root/HeroSection"
import Stats from "@/components/root/Stats"
import WindowMockupMap from "@/components/root/WindowMockupMap"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid gap-y-36">
      <HeroSection />
      {/* <WindowMockupMap /> */}
      <Stats />
    </div>
  )
}
