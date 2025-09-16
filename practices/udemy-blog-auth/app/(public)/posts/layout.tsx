import PublichHeder from '@/components/layouts/PublichHeder'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PublichHeder />
      {children}
    </div>
  )
}
