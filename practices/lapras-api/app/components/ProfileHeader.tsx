import Image from 'next/image'
import type { LaprasBasicInfo } from '../types/lapras'

type ProfileHeaderProps = LaprasBasicInfo

export function ProfileHeader({ name, description, iconimage_url }: ProfileHeaderProps) {
  return (
    <>
      <Image
        src={iconimage_url}
        alt={name}
        width={120}
        height={120}
        className="rounded-full border-4 border-slate-200 dark:border-slate-700 shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
        {name}
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-center mb-8 max-w-2xl">
        {description}
      </p>
    </>
  )
}