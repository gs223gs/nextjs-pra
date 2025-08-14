export type LaprasScore = {
  e_score: number
  b_score: number
  i_score: number
}

export type LaprasBasicInfo = {
  name: string
  description: string
  iconimage_url: string
}

export type QiitaArticle = {
  title: string
  url: string
  tags: string[]
  headlines: string[]
  stockers_count: number
  updated_at: string
}

export type ZennArticle = {
  title: string
  url: string
  tags: string[]
  posted_at: string
}

export type GitHubRepository = {
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
}

export type LaprasEvent = {
  title: string
  url: string
  status: number
  date: string
  is_presenter: boolean
  is_organizer: boolean
}

export type LaprasProfile = LaprasBasicInfo & LaprasScore & {
  qiita_articles: QiitaArticle[]
  zenn_articles: ZennArticle[]
  github_repositories: GitHubRepository[]
  events: LaprasEvent[]
}