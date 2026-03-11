import { Suspense } from "react"
import NewsContent from "./NewsContent"

export default function NewsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">செய்தி ஏற்றுகிறது...</p>}>
      <NewsContent />
    </Suspense>
  )
}