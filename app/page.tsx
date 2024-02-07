import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1>nice landing, presenta y lleva al producto</h1>
      <Link href={"/dashboard"}>
        <button className="btn-primary btn">go to dashboard</button>
      </Link>
    </main>
  )
}
