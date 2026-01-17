import { Check } from 'lucide-react'

interface PricingCardProps {
  plan: string
  price: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({ plan, price, features, highlighted = false }: PricingCardProps) {
  return (
    <div className={`pricing-card${highlighted ? ' highlighted' : ''}`}>
      <div
        style={{
          fontSize: '1.2em',
          fontWeight: 600,
          color: 'var(--text)',
        }}
      >
        {plan}
      </div>
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 700,
          color: highlighted ? 'var(--accent-primary)' : 'var(--text)',
          lineHeight: 1.1,
        }}
      >
        {price}
      </div>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>
            <Check size={20} style={{ color: 'var(--accent-tertiary)', flexShrink: 0 }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
