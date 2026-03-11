
let cachedNews = []

export function setNewsCache(news) {
  cachedNews = news
}

export function getNewsById(id) {
  return cachedNews.find(item => item.article_id === id) || null
}