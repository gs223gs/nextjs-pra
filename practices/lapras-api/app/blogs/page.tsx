import { fetchLaprasProfile } from '../actions'
import type { QiitaArticle, ZennArticle } from '../types/lapras'

type BlogPageData = {
  qiita_articles: QiitaArticle[]
  zenn_articles: ZennArticle[]
}

export default async function BlogsPage() {
  const profile = await fetchLaprasProfile()
  
  const blogData: BlogPageData = {
    qiita_articles: profile.qiita_articles,
    zenn_articles: profile.zenn_articles
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          ブログ記事
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Qiita 記事 ({blogData.qiita_articles.length}件)
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {blogData.qiita_articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                      </svg>
                      ストック: {article.stockers_count}
                    </span>
                    <span>{new Date(article.updated_at).toLocaleDateString('ja-JP')}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              Zenn 記事 ({blogData.zenn_articles.length}件)
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {blogData.zenn_articles.length > 0 ? (
                blogData.zenn_articles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(article.posted_at).toLocaleDateString('ja-JP')}
                    </p>
                  </a>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                  Zenn記事はまだ投稿されていません
                </p>
              )}
            </div>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← トップページに戻る
          </a>
        </div>
      </div>
    </div>
  )
}