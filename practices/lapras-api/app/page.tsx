import { fetchLaprasProfile } from './actions'
import Image from 'next/image'

export default async function Home() {
  const profile = await fetchLaprasProfile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* プロフィールヘッダー */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <Image
                src={profile.iconimage_url}
                alt={profile.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-slate-200 dark:border-slate-700 shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {profile.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {profile.description}
              </p>
              
              {/* スコア表示 */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <span className="text-xs font-medium">Engineer</span>
                  <div className="text-xl font-bold">{profile.e_score.toFixed(2)}</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <span className="text-xs font-medium">Business</span>
                  <div className="text-xl font-bold">{profile.b_score.toFixed(2)}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <span className="text-xs font-medium">Influence</span>
                  <div className="text-xl font-bold">{profile.i_score.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* コンテンツグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* GitHub リポジトリ */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub リポジトリ
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {profile.github_repositories.slice(0, 5).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {repo.title.split('/')[1]}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span>{repo.language}</span>
                    <span>貢献: {repo.contributions}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Qiita 記事 */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Qiita 記事
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {profile.qiita_articles.map((article, index) => (
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
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>ストック: {article.stockers_count}</span>
                    <span>{new Date(article.updated_at).toLocaleDateString('ja-JP')}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Zenn 記事 */}
          {profile.zenn_articles.length > 0 && (
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Zenn 記事
              </h2>
              <div className="space-y-4">
                {profile.zenn_articles.map((article, index) => (
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
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(article.posted_at).toLocaleDateString('ja-JP')}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* イベント参加 */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
              </svg>
              最近のイベント
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {profile.events.slice(0, 10).map((event, index) => {
                const statusColors = {
                  1: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
                  2: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
                  3: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                }
                const statusLabels = {
                  1: '参加予定',
                  2: 'キャンセル',
                  3: '参加済み'
                }
                
                return (
                  <a
                    key={index}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 flex-1">
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded whitespace-nowrap ${statusColors[event.status] || statusColors[1]}`}>
                        {statusLabels[event.status] || '参加予定'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{new Date(event.date).toLocaleDateString('ja-JP')}</span>
                      {event.is_presenter && (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">登壇者</span>
                      )}
                      {event.is_organizer && (
                        <span className="text-purple-600 dark:text-purple-400 font-medium">主催者</span>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}