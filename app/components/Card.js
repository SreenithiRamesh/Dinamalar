"use client"

import { useRouter } from "next/navigation"

export default function Card({ id, title, image }) {

  const router = useRouter()

  return (
    <div className="shadow-2xl"
      onClick={() => router.push(`/news?id=${id}`)}
      style={{
        border: "1px solid gray",
        padding: "20px",
        width: "300px",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >

      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "180px",
          
          borderRadius: "8px"
        }}
      />

      <h3>{title}</h3>
      <p>Click to read full news</p>

    </div>
  )
}