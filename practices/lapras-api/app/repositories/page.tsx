import { fetchLaprasProfile } from '../actions'
import type { GitHubRepository } from '../types/lapras'

type RepositoryPageData = {
  repositories: GitHubRepository[]
}

export default async function RepositoriesPage() {
  const profile = await fetchLaprasProfile()
  
  const repoData: RepositoryPageData = {
    repositories: profile.github_repositories
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub リポジトリ
        </h1>
        
        <div className="text-center mb-6">
          <span className="text-slate-600 dark:text-slate-400">
            総リポジトリ数: {repoData.repositories.length}件
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repoData.repositories.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {repo.title.split('/')[1] || repo.title}
                </h3>
                <span className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-semibold">{repo.stargazers_count}</span>
                </span>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {repo.description || '説明なし'}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-slate-700 dark:text-slate-300">{repo.language}</span>
                    </span>
                  )}
                  <span className="text-slate-500 dark:text-slate-400">
                    貢献: {repo.contributions}
                  </span>
                </div>
              </div>
              
              {repo.languages && repo.languages.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">言語構成</div>
                  <div className="flex gap-1">
                    {repo.languages.slice(0, 3).map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded"
                      >
                        {lang.name}
                      </span>
                    ))}
                    {repo.languages.length > 3 && (
                      <span className="px-2 py-1 text-slate-500 dark:text-slate-400 text-xs">
                        +{repo.languages.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
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