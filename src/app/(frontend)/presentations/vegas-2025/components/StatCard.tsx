import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  stat: string | number
  desc: string
}

export function StatCard({ icon: Icon, stat, desc }: StatCardProps) {
  return (
    <div className="stat-card">
      <Icon
        size={48}
        style={{ color: 'var(--accent-primary)' }}
      />
      <div
        style={{
          fontSize: '3em',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.1,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          fontSize: '0.5em',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
        }}
      >
        {desc}
      </div>
    </div>
  )
}
