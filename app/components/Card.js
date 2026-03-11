"use client"

import { useRouter } from "next/navigation"

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c"

export default function Card({ article }) {
  const router = useRouter()

  const handleClick = () => {
    // Store full article in sessionStorage so NewsContent can read it
    sessionStorage.setItem("selectedArticle", JSON.stringify(article))
    router.push(`/news?id=${encodeURIComponent(article.article_id)}`)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <img
        src={article.image_url || FALLBACK_IMAGE}
        alt={article.title}
        onError={(e) => { e.target.src = FALLBACK_IMAGE }}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "16px" }}>
        <h3 style={{
          fontSize: "14px",
          fontFamily: "serif",
          fontWeight: "bold",
          marginBottom: "8px",
          lineHeight: "1.5"
        }}>
          {article.title}
        </h3>

        <div style={{ fontSize: "12px", color: "#888", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {article.source_name && <span>📰 {article.source_name}</span>}
          {article.pubDate && (
            <span>🕒 {new Date(article.pubDate).toLocaleDateString("ta-IN")}</span>
          )}
        </div>

        <p style={{ fontSize: "12px", color: "#3b82f6", marginTop: "8px" }}>
          முழுவதும் படிக்க கிளிக் செய்யுங்கள் →
        </p>
      </div>
    </div>
  )
}