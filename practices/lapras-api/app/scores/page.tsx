import { fetchLaprasProfile } from '../actions'
import type { LaprasScore, LaprasBasicInfo } from '../types/lapras'
import Image from 'next/image'

type ScorePageData = LaprasBasicInfo & LaprasScore

export default async function ScoresPage() {
  const profile = await fetchLaprasProfile()
  
  const scoreData: ScorePageData = {
    name: profile.name,
    description: profile.description,
    iconimage_url: profile.iconimage_url,
    e_score: profile.e_score,
    b_score: profile.b_score,
    i_score: profile.i_score
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center">
            <Image
              src={scoreData.iconimage_url}
              alt={scoreData.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-slate-200 dark:border-slate-700 shadow-lg mb-6"
            />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {scoreData.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-center mb-8 max-w-2xl">
              {scoreData.description}
            </p>
            
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-sm font-medium mb-2">Engineer</div>
                  <div className="text-3xl font-bold">{scoreData.e_score.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-sm font-medium mb-2">Business</div>
                  <div className="text-3xl font-bold">{scoreData.b_score.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-sm font-medium mb-2">Influence</div>
                  <div className="text-3xl font-bold">{scoreData.i_score.toFixed(2)}</div>
                </div>
              </div>
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
      </div>
    </div>
  )
}