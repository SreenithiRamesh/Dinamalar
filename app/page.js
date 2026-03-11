import Card from "./components/Card"

async function getNews() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  return res.json()
}

export default async function Home() {
  const news = await getNews()

  const image =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c"

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Today's News</h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          maxWidth: "100%",
        }}
      >
        {news.slice(0, 5).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            image={image}
          />
        ))}
      </div>
    </div>
  )
}