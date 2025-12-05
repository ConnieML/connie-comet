'use client'

import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'

export default function Presentation() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!deckRef.current) return

    const deck = new Reveal(deckRef.current, {
      hash: true,
      transition: 'fade',
      transitionSpeed: 'fast',
      controls: false,
      progress: true,
      center: true,
    })

    deck.initialize()

    return () => {
      deck.destroy()
    }
  }, [])

  return (
    <div className="reveal" ref={deckRef}>
      <img className="presentation-logo" src="/connie-logo-black-strong.svg" alt="Connie" />
      <div className="slides">
        <section>
          <h1>Slide One</h1>
        </section>
        <section>
          <h1>Slide Two</h1>
        </section>
        <section>
          <h1>Slide Three</h1>
        </section>
      </div>
      <div className="presentation-copyright">© 2025 Connie</div>
    </div>
  )
}
