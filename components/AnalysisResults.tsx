'use client'

import { AnalysisResult } from '@/types'
import SafetyBadge from './SafetyBadge'
import SummarySection from './SummarySection' 
import RisksSection from './RiskSection'

interface AnalysisResultsProps {
  analysis: AnalysisResult
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-8 slide-up">
      <SafetyBadge 
        rating={analysis.safetyRating} 
        confidence={analysis.confidence} 
      />
      
      <SummarySection summary={analysis.summary} />
      
      <RisksSection risks={analysis.risks} />
    </div>
  )
}