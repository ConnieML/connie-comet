'use client'
import React, { useEffect } from 'react'
import { Logo } from '@/components/Logo/Logo'

type Props = {
  title: string
  subtitle?: string
  showEmailSignup?: boolean
  emailPlaceholder?: string
  buttonText?: string
  backgroundEffect?: 'dotMatrix' | 'gradient' | 'none'
}

export const HeroBlock: React.FC<Props> = ({
  title,
  subtitle,
  showEmailSignup = true,
  emailPlaceholder = 'your-email@company.com',
  buttonText = 'Join Waitlist',
  backgroundEffect = 'dotMatrix',
}) => {
  useEffect(() => {
    if (backgroundEffect === 'dotMatrix') {
      setTimeout(createDotMatrix, 100)
    }
  }, [backgroundEffect])

  const createDotMatrix = () => {
    const heroSection = document.querySelector('.hero-section')
    const existingMatrix = heroSection?.querySelector('.dot-matrix')
    if (existingMatrix || !heroSection) return

    const dotMatrix = document.createElement('div')
    dotMatrix.className = 'dot-matrix'

    // Grid configuration - smaller, more subtle
    const rows = 12
    const cols = 20
    const spacing = 50

    // Calculate grid dimensions
    const gridWidth = (cols - 1) * spacing
    const gridHeight = (rows - 1) * spacing

    // Center the grid within the container
    const startX = (1000 - gridWidth) / 2
    const startY = (600 - gridHeight) / 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const dot = document.createElement('div')
        dot.className = 'dot'

        // Calculate position in grid
        const x = startX + col * spacing
        const y = startY + row * spacing

        dot.style.left = x + 'px'
        dot.style.top = y + 'px'

        // Staggered animation delays for wave effect
        const delay = (row + col) * 0.15
        dot.style.animationDelay = delay + 's'

        dotMatrix.appendChild(dot)
      }
    }

    heroSection.appendChild(dotMatrix)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email')
    console.log('Email signup:', email)
    // TODO: Integrate with email service
    alert('Thanks for joining the waitlist!')
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .hero-section {
          min-height: 100vh;
          background: #ffffff;
          color: #000000;
          position: relative;
          overflow: hidden;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        .dot-matrix {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          height: 600px;
          pointer-events: none;
          z-index: 0;
          opacity: 0.3;
        }

        .dot {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #0066cc;
          border-radius: 50%;
          animation: pulse 6s ease-in-out infinite;
          opacity: 0.4;
        }

        .dot:nth-child(2n) {
          background: #333333;
          animation-delay: -2s;
          opacity: 0.2;
        }

        .dot:nth-child(3n) {
          animation-delay: -4s;
          animation-duration: 8s;
          opacity: 0.15;
        }

        .dot:nth-child(4n) {
          background: #0066cc;
          animation-delay: -1s;
          animation-duration: 7s;
          opacity: 0.25;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(0.5);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.6;
          }
        }


        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          padding: 40px 0 120px 0;
          position: relative;
        }

        .hero-logo {
          margin-bottom: 40px;
        }

        .hero-title {
          font-size: 72px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #000000;
          line-height: 0.9;
          letter-spacing: -0.03em;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          text-rendering: optimizeLegibility;
          position: relative;
          z-index: 1;
        }
        
        .hero-title .highlight {
          color: #0066cc;
          font-weight: 800;
        }

        .hero-subtitle {
          font-size: 22px;
          color: #555555;
          margin-bottom: 48px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
          line-height: 1.4;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          z-index: 1;
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 102, 204, 0.2);
          border-radius: 16px;
          padding: 40px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 8px 32px rgba(0, 102, 204, 0.08);
          position: relative;
          z-index: 1;
        }

        .email-form {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .email-input {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid #d0d0d0;
          border-radius: 8px;
          background: #ffffff;
          color: #000000;
          font-size: 16px;
          outline: none;
          transition: all 0.2s ease;
        }

        .email-input::placeholder {
          color: #888888;
        }

        .email-input:focus {
          border-color: #0066cc;
          box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
        }

        .cta-button {
          padding: 16px 32px;
          background: #0066cc;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cta-button:hover {
          background: #0052a3;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }
          
          .hero-subtitle {
            font-size: 20px;
          }
          
          .email-form {
            flex-direction: column;
          }
          
          .cta-button {
            width: 100%;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: title }}></h1>

            {subtitle && <p className="hero-subtitle">{subtitle}</p>}

            {showEmailSignup && (
              <div className="glassmorphism-card">
                <form className="email-form" onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="email-input"
                    placeholder={emailPlaceholder}
                    required
                  />
                  <button type="submit" className="cta-button">
                    {buttonText}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}