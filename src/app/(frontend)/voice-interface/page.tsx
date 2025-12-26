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

  const playAudio = (voice: Voice) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    if (playingId === voice.id) {
      setPlayingId(null)
      return
    }

    const audioUrl = `https://doppel.center${voice.sampleAudioUrl}`
    audioRef.current = new Audio(audioUrl)
    audioRef.current.play()
    setPlayingId(voice.id)

    audioRef.current.onended = () => {
      setPlayingId(null)
    }
  }

  const formatLanguage = (lang: string) => {
    const map: Record<string, string> = {
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'es-US': 'Spanish (US)',
      'es-MX': 'Spanish (MX)',
      'pt-BR': 'Portuguese (BR)',
      'fr-FR': 'French (FR)',
    }
    return map[lang] || lang
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-slate-500 mb-4">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Platform</span>
            <span className="mx-2">/</span>
            <span className="text-slate-700">Voice Interface</span>
          </nav>

          <h1 className="text-3xl font-semibold text-slate-800 mb-2">
            Voice Interface
          </h1>
          <p className="text-slate-600">
            Available text-to-speech voices for your IVR and contact center applications.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Voice Preview</p>
              <p className="text-blue-700">Click the play button to hear a sample of each voice. Voices are powered by AWS Polly via the Doppel Center API.</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading voices...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading voices</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Voice Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Voice</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Language</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Gender</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Engine</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Tone</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {voices.map((voice) => (
                    <tr key={voice.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{voice.name}</div>
                        <div className="text-xs text-slate-500">{voice.providerVoiceId}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {formatLanguage(voice.language)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          voice.gender === 'female'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {voice.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          voice.engine === 'neural'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {voice.engine}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 capitalize">
                        {voice.tone}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => playAudio(voice)}
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                            playingId === voice.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600'
                          }`}
                          title={playingId === voice.id ? 'Stop' : 'Play sample'}
                        >
                          {playingId === voice.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <rect x="6" y="5" width="3" height="10" rx="1" />
                              <rect x="11" y="5" width="3" height="10" rx="1" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
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
                <span className="text-slate-400">Powered by <a href="https://doppel.center" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Doppel Center</a></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
