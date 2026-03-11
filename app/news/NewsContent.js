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

    const stored = sessionStorage.getItem("selectedArticle")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.article_id === decodeURIComponent(id)) {
        setNews(parsed)
        return
      }
    }

    fetch(
      "https://newsdata.io/api/1/latest?apikey=pub_b1efcac228a24eeabb7960a670ba6380&language=ta&country=in",
      { cache: "no-store" }
    )
      .then(res => res.json())
      .then(data => {
        const found = (data.results || []).find(
          item => item.article_id === decodeURIComponent(id)
        )
        if (found) setNews(found)
      })
      .catch(err => console.error("Fetch error:", err))
  }, [id])

  const addComment = () => {
    if (!comment.trim()) return
    setComments([...comments, comment])
    setComment("")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news?.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("இணைப்பு நகலெடுக்கப்பட்டது!")
    }
  }

  if (!news) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-gray-500 text-lg">செய்தி ஏற்றுகிறது...</p>
    </div>
  )

  return (
  <div className="max-w-3xl mx-auto p-8 space-y-8">

    <div className="flex items-center gap-3 bg-white p-3 flex-wrap">
      <div className="flex gap-3">

        <button
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <FaFacebookF />
        </button>

        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${news.title}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <FaXTwitter />
        </button>

        <button
          onClick={() => window.open(`https://wa.me/?text=${news.title} ${window.location.href}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <FaWhatsapp />
        </button>

        <button
          onClick={() => window.open(`https://t.me/share/url?url=${window.location.href}&text=${news.title}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          <FaTelegramPlane />
        </button>

      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
      >
        Share <FiShare2 />
      </button>

      <button
        onClick={() => window.open(news.link, "_blank")}
        className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
      >
        Focus <MdOutlineArticle />
      </button>
    </div>

    <div>
      {news.image_url && (
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full rounded-xl mb-6"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      )}

      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "serif" }}>
        {news.title}
      </h1>

      <div className="flex gap-4 text-sm text-gray-500 mb-6 flex-wrap">
        {news.source_name && <span>📰 {news.source_name}</span>}
        {news.creator?.[0] && <span>✍️ {news.creator[0]}</span>}
        {news.pubDate && (
          <span>🕒 {new Date(news.pubDate).toLocaleDateString("ta-IN")}</span>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed text-lg" style={{ fontFamily: "serif" }}>
        {news.content || news.description || "உள்ளடக்கம் கிடைக்கவில்லை"}
      </p>

      {news.link && (
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          மூல செய்தியை படிக்க இங்கே கிளிக் செய்யுங்கள் →
        </a>
      )}
    </div>

    <div className="space-y-6">
      <h2 className="text-xl font-semibold">கருத்துகள்</h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="உங்கள் கருத்தை எழுதுங்கள்..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          சேர்
        </button>
      </div>

      <div className="grid gap-4">
        {comments.map((c, i) => (
          <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                {c.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <p>{c}</p>
                <span className="text-xs text-gray-400">இப்போது</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

  </div>
);

 
}