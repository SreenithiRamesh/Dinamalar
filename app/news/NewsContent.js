"use client"

import { FaFacebookF, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function NewsContent() {

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [news, setNews] = useState(null)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!id) return
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setNews(data))
  }, [id])

  const addComment = () => {
    if (!comment) return
    setComments([...comments, comment])
    setComment("")
  }

  if (!news) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">

      <div className="flex items-center gap-3 bg-white p-3">
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <FaFacebookF />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <FaXTwitter />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <FaWhatsapp />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <FaTelegramPlane />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          Share <FiShare2 />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          Focus <MdOutlineArticle />
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{news.title}</h1>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
        <p className="text-gray-700 leading-relaxed text-lg">{news.body}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Comments</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Write comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addComment}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <div className="grid gap-4">
          {comments.map((c, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                  {c.charAt(0)}
                </div>
                <div className="flex-1">
                  <p>{c}</p>
                  <span className="text-xs text-gray-400">Just now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
