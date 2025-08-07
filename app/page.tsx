'use client'

import { useState } from 'react'
import Header from '../components/Header'
import DocumentInput from '../components/DocumentInput'
import AnalysisResults from '../components/AnalysisResults'
import LoadingAnimation from '../components/LoadingAnimation'
import ErrorMessage from '../components/ErrorMessage'
import { AnalysisResult } from '@/types'

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (content: string, source?: string) => {
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, source }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze document')
      }

      const result = await response.json()
      setAnalysis(result)

      // Save to localStorage
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
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAnalysis(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Header />
        
        <div className="space-y-12">
          <DocumentInput 
            onAnalyze={handleAnalyze} 
            onReset={handleReset}
            isLoading={isLoading}
          />
          
          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
          
          {isLoading && <LoadingAnimation />}
          
          {analysis && <AnalysisResults analysis={analysis} />}
        </div>
      </div>
    </main>
  )
}