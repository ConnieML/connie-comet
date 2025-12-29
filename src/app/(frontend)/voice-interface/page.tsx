'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Voice {
  id: string
  name: string
  provider: string
  providerVoiceId: string
  engine: string
  gender: string
  language: string
  accent: string
  tone: string
  tags: string[]
  previewText: string
  sampleAudioUrl: string
  pricing: {
    perCharacter: number
    currency: string
  }
}

// Audio-reactive avatar component with glow pulse animation
function VoiceAvatar({ gender, isPlaying }: { gender: string; isPlaying: boolean }) {
  const genderColor = gender === 'female' ? '#9333ea' : '#2563eb' // purple for female, blue for male

  return (
    <div
      className={`relative flex-shrink-0 transition-all duration-200 ${isPlaying ? 'scale-105' : ''}`}
      style={{ width: '40px', height: '40px' }}
    >
      {/* Glow halo - uses Tailwind animate-pulse when playing */}
      <div
        className={`absolute inset-[-4px] rounded-full transition-all duration-200 ${
          isPlaying ? 'opacity-100 animate-pulse' : 'opacity-30'
        }`}
        style={{
          border: '2px solid transparent',
          boxShadow: isPlaying
            ? `0 0 14px 5px ${genderColor}, inset 0 0 6px 2px ${genderColor}`
            : `0 0 6px 1px ${genderColor}, inset 0 0 3px 1px ${genderColor}`,
        }}
      />
      {/* Avatar circle */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: gender === 'female'
            ? 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'
            : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: `2px solid ${genderColor}40`,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: genderColor }}>
          <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.25 0-6 1.34-6 3v2h12v-2c0-1.66-2.75-3-6-3z"/>
        </svg>
      </div>
    </div>
  )
}

// Language flag icons
function LanguageIcon({ language }: { language: string }) {
  const flags: Record<string, { emoji: string; label: string }> = {
    'en-US': { emoji: '🇺🇸', label: 'US' },
    'en-GB': { emoji: '🇬🇧', label: 'UK' },
    'es-US': { emoji: '🇺🇸', label: 'ES' },
    'es-MX': { emoji: '🇲🇽', label: 'MX' },
    'pt-BR': { emoji: '🇧🇷', label: 'BR' },
    'fr-FR': { emoji: '🇫🇷', label: 'FR' },
  }
  const flag = flags[language] || { emoji: '🌐', label: language }

  return (
    <div className="flex items-center gap-1.5" title={language}>
      <span className="text-lg">{flag.emoji}</span>
      <span className="text-xs text-slate-500 font-medium">{flag.label}</span>
    </div>
  )
}

// Gender icon - monochrome black with grey bg
function GenderIcon({ gender }: { gender: string }) {
  if (gender === 'female') {
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100" title="Female">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-700" fill="currentColor">
          <path d="M12 2a6 6 0 016 6c0 2.97-2.16 5.44-5 5.92V16h2v2h-2v2h-2v-2H9v-2h2v-2.08C8.16 13.44 6 10.97 6 8a6 6 0 016-6zm0 2a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4z"/>
        </svg>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100" title="Male">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-700" fill="currentColor">
        <path d="M9.5 11c1.93 0 3.5 1.57 3.5 3.5S11.43 18 9.5 18 6 16.43 6 14.5 7.57 11 9.5 11m0-2C6.46 9 4 11.46 4 14.5S6.46 20 9.5 20s5.5-2.46 5.5-5.5c0-1.16-.36-2.24-.97-3.12L18 7.42V10h2V4h-6v2h2.58l-3.97 3.97C11.73 9.36 10.65 9 9.5 9z"/>
      </svg>
    </div>
  )
}

// Engine icon (neural vs generative) - monochrome black with grey bg
function EngineIcon({ engine }: { engine: string }) {
  if (engine === 'neural') {
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100" title="Neural Engine">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-700" fill="currentColor">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100" title="Generative Engine">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-700" fill="currentColor">
        <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 00-1.41 0L1.29 18.96a.996.996 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/>
      </svg>
    </div>
  )
}

// Tone icon - monochrome black with grey bg
function ToneIcon({ tone }: { tone: string }) {
  const toneIcons: Record<string, JSX.Element> = {
    professional: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>,
    friendly: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>,
    warm: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
    authoritative: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>,
    conversational: <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>,
    formal: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>,
    casual: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>,
  }

  const icon = toneIcons[tone] || toneIcons.professional

  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100" title={tone}>
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-700" fill="currentColor">
        {icon}
      </svg>
    </div>
  )
}

export default function VoiceInterfacePage() {
  const [voices, setVoices] = useState<Voice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('https://doppel.center/api/voices')
        if (!response.ok) {
          throw new Error('Failed to fetch voices')
        }
        const data = await response.json()
        setVoices(data.voices || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVoices()
  }, [])

  const playAudio = async (voice: Voice) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    if (playingId === voice.id) {
      setPlayingId(null)
      return
    }

    const audioUrl = `https://doppel.center${voice.sampleAudioUrl}`
    console.log('Playing audio:', audioUrl)

    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.onerror = (e) => {
      console.error('Audio error:', e, audio.error)
      setPlayingId(null)
    }

    audio.onended = () => {
      setPlayingId(null)
    }

    audio.oncanplaythrough = () => {
      console.log('Audio can play through')
    }

    try {
      await audio.play()
      setPlayingId(voice.id)
    } catch (err) {
      console.error('Play failed:', err)
      setPlayingId(null)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-800">
      <div className="container mx-auto px-6 py-16">
        {/* Header - centered like /contact */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            Voice Interface
          </h1>
          <p className="text-xl text-slate-600">
            Available voice agents for your Connie contact center applications
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Voice Preview</p>
              <p className="text-blue-700">Click the preview button to hear a sample of each voice agent. Click select to apply selected voice to your application.</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center max-w-5xl mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading voices...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 max-w-5xl mx-auto">
            <p className="font-medium">Error loading voices</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Voice Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-3 py-3 text-sm font-semibold text-slate-700 w-14"></th>
                      <th className="text-left px-3 py-3 text-sm font-semibold text-slate-700 w-40">Voice</th>
                      <th className="text-center px-2 py-3 text-sm font-semibold text-slate-700 w-16">
                        <span title="Language">Lang</span>
                      </th>
                      <th className="text-center px-2 py-3 text-sm font-semibold text-slate-700 w-12">
                        <span title="Gender">Gen</span>
                      </th>
                      <th className="text-center px-2 py-3 text-sm font-semibold text-slate-700 w-12">
                        <span title="Engine">Eng</span>
                      </th>
                      <th className="text-center px-2 py-3 text-sm font-semibold text-slate-700 w-12">
                        <span title="Tone">Tone</span>
                      </th>
                      <th className="text-center px-3 py-3 text-sm font-semibold text-slate-700 w-24"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {voices.map((voice) => (
                      <tr key={voice.id} className="hover:bg-slate-50 transition-colors">
                        {/* Avatar column */}
                        <td className="px-3 py-3">
                          <VoiceAvatar gender={voice.gender} isPlaying={playingId === voice.id} />
                        </td>
                        {/* Voice name */}
                        <td className="px-3 py-3">
                          <div className="font-medium text-slate-800">{voice.name}</div>
                          <div className="text-xs text-slate-500">{voice.providerVoiceId}</div>
                        </td>
                        {/* Language icon */}
                        <td className="px-2 py-3 text-center">
                          <div className="flex justify-center">
                            <LanguageIcon language={voice.language} />
                          </div>
                        </td>
                        {/* Gender icon */}
                        <td className="px-2 py-3 text-center">
                          <div className="flex justify-center">
                            <GenderIcon gender={voice.gender} />
                          </div>
                        </td>
                        {/* Engine icon */}
                        <td className="px-2 py-3 text-center">
                          <div className="flex justify-center">
                            <EngineIcon engine={voice.engine} />
                          </div>
                        </td>
                        {/* Tone icon */}
                        <td className="px-2 py-3 text-center">
                          <div className="flex justify-center">
                            <ToneIcon tone={voice.tone} />
                          </div>
                        </td>
                        {/* Preview button - Twilio Paste style (black/white) */}
                        <td className="px-3 py-3 text-center">
                          <button
                            onClick={() => playAudio(voice)}
                            className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all border ${
                              playingId === voice.id
                                ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700'
                                : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                            }`}
                          >
                            {playingId === voice.id ? (
                              <>
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <rect x="6" y="5" width="4" height="14" rx="1" />
                                  <rect x="14" y="5" width="4" height="14" rx="1" />
                                </svg>
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <polygon points="5,3 19,12 5,21" />
                                </svg>
                                <span>Preview</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{voices.length} voices available</span>
                <span className="text-slate-400">Powered by <a href="https://doppel.center" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline">Doppel Center</a></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
