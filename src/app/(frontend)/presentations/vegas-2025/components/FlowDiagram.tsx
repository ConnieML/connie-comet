import { useId } from 'react'

interface FlowDiagramProps {
  steps: string[]
}

export function FlowDiagram({ steps }: FlowDiagramProps) {
  const markerId = useId()

  if (!steps || steps.length === 0) {
    return null
  }

  const stepWidth = 200
  const viewBoxWidth = steps.length * stepWidth
  const arrowGap = 80

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} 80`}
      className="flow-diagram"
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-primary)" />
        </marker>
      </defs>
      {steps.map((step, index) => {
        const x = index * stepWidth + 50
        const isLast = index === steps.length - 1

        return (
          <g key={index}>
            <text
              x={x}
              y={30}
              fontSize="22"
              fontWeight="600"
              fill="var(--text)"
            >
              {step}
            </text>
            {!isLast && (
              <path
                d={`M${x + arrowGap},22 L${x + stepWidth - 30},22`}
                stroke="var(--accent-primary)"
                strokeWidth="3"
                markerEnd={`url(#${markerId})`}
                fill="none"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
