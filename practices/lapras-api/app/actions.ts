'use server'

export interface LaprasProfile {
  name: string
  description: string
  e_score: number
  b_score: number
  i_score: number
  iconimage_url: string
  qiita_articles: Array<{
    title: string
    url: string
    tags: string[]
    headlines: string[]
    stockers_count: number
    updated_at: string
  }>
  zenn_articles: Array<{
    title: string
    url: string
    tags: string[]
    posted_at: string
  }>
  github_repositories: Array<{
    id: number
    title: string
    url: string
    description: string
    stargazers_count: number
    language: string
    languages: Array<{
      name: string
      bytes: number
    }>
    contributions: number
  }>
  events: Array<{
    title: string
    url: string
    status: number
    date: string
    is_presenter: boolean
    is_organizer: boolean
  }>
}

export async function fetchLaprasProfile(): Promise<LaprasProfile> {
  const res = await fetch('https://lapras.com/public/W4MC1JR.json', {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('プロフィールデータの取得に失敗しました')
  }
  
  return res.json()
}