type ScoreType = 'engineer' | 'business' | 'influence'

type ScoreCardProps = {
  type: ScoreType
  value: number
}

const scoreConfig = {
  engineer: {
    label: 'Engineer',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600'
  },
  business: {
    label: 'Business',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-600'
  },
  influence: {
    label: 'Influence',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600'
  }
} as const

export function ScoreCard({ type, value }: ScoreCardProps) {
  const config = scoreConfig[type]
  
  return (
    <div className="text-center">
      <div className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white p-6 rounded-xl shadow-lg`}>
        <div className="text-sm font-medium mb-2">{config.label}</div>
        <div className="text-3xl font-bold">{value.toFixed(2)}</div>
      </div>
    </div>
  )
}