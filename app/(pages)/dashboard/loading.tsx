import React from "react"

const Loading = () => {
  return (
    <section className="w-screen grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <article className="w-100 md:col-span-2 md:order-1 order-1  ">
        <div className=" w-100 flex space-x-2 items-center  animate-pulse">
          <div
            style={{ width: "100%", height: "400px" }}
            className=" bg-gray-200 rounded-xl"
          ></div>
        </div>
      </article>
    </section>
  )
}

export default Loading
