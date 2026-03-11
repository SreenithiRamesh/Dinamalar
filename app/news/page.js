import { Suspense } from "react"
import NewsContent from "./NewsContent"

export default function NewsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <NewsContent />
    </Suspense>
  )
}