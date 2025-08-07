'use client'

import { useState } from 'react'
import InputSection from '../components/InputSection'
import AnalysisResult from '../components/AnalysisResult'
import LoadingSpinner from '../components/LoadingSpinner'
import { AnalysisResult as AnalysisResultType } from '../types'
import { Eye, Shield, Search } from 'lucide-react'

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (content: string, source?: string) => {
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, source }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze document')
      }

      const result = await response.json()
      setAnalysis(result)

      // Save to localStorage for history
      const history = JSON.parse(localStorage.getItem('consentlens_history') || '[]')
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        source: source || 'Direct input',
        preview: content.substring(0, 100) + '...',
        result
      }
      history.unshift(newEntry)
      localStorage.setItem('consentlens_history', JSON.stringify(history.slice(0, 10)))

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setAnalysis(null)
    setError(null)
  }

  return (
    <main className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Search className="w-16 h-16 text-white mr-4" />
              <Eye className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            ConsentLens
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            Decode legal jargon and understand what you're really agreeing to. 
            Analyze privacy policies and terms of service in seconds.
          </p>
          
          {/* Features */}
          <div className="flex justify-center gap-8 text-white opacity-80 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Instant Analysis</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <InputSection onAnalyze={handleAnalyze} onClear={handleClear} isLoading={isLoading} />
          
          {error && (
            <div className="glass-effect rounded-2xl p-6 mb-8 border-red-200">
              <div className="flex items-center gap-3 text-red-700">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-semibold">Analysis Failed</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          
          {analysis && <AnalysisResult analysis={analysis} />}
        </div>

        {/* Footer */}
        <footer className="text-center text-white opacity-60 mt-16">
          <p>&copy; 2024 ConsentLens. Built with Next.js & AI for transparency.</p>
        </footer>
      </div>
    </main>
  )
}