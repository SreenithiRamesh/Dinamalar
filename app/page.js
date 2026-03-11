import Card from "./components/Card"

async function getNews() {
  try {
    const res = await fetch(
      "https://newsdata.io/api/1/latest?apikey=pub_b1efcac228a24eeabb7960a670ba6380&language=ta&country=in",
      { cache: "no-store" }
    )

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text()
      console.error("Non-JSON response:", text)
      return []
    }

    const data = await res.json()

    if (data.status === "error") {
      console.error("API error:", data.results?.message || "Unknown error")
      return []
    }

    return data.results || []
  } catch (err) {
    console.error("Failed to fetch news:", err)
    return []
  }
}

export default async function Home() {
  const news = await getNews()

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", fontFamily: "serif", fontSize: "2rem" }}>
        தமிழ் செய்திகள்
      </h1>

      {news.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>
          செய்திகள் இல்லை. சற்று நேரம் கழித்து முயற்சிக்கவும்.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {news.map((item) => (
          <Card
            key={item.article_id}
            article={item}
          />
        ))}
      </div>
    </div>
  )
}