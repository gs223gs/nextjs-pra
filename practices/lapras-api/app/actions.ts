'use server'

import { LaprasProfile } from './types/lapras'

export async function fetchLaprasProfile(): Promise<LaprasProfile> {
  const res = await fetch('https://lapras.com/public/W4MC1JR.json', {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('プロフィールデータの取得に失敗しました')
  }
  
  return res.json()
}