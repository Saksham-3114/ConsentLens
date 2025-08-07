/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { AnalysisResult as AnalysisResultType, RiskItem } from '../types'
import { CheckCircle, AlertTriangle, Brain, AlertCircle, Shield, Star } from 'lucide-react'

interface AnalysisResultProps {
  analysis: AnalysisResultType
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getRiskIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Safety Rating Badge */}
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-full text-xl font-bold ${
          analysis.safetyRating === 'safe' 
            ? 'bg-green-100 text-green-800 border-2 border-green-300' 
            : 'bg-red-100 text-red-800 border-2 border-red-300'
        }`}>
          {analysis.safetyRating === 'safe' ? (
            <>
              <CheckCircle className="w-6 h-6" />
              👍 Safe
            </>
          ) : (
            <>
              <AlertTriangle className="w-6 h-6" />
              ⚠️ Suspicious
            </>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
          <Star className="w-4 h-4" />
          <span>Confidence: {analysis.confidence}%</span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <Brain className="w-6 h-6 text-blue-600" />
          🧠 Key Takeaways
        </h3>
        <div className="space-y-4">
          {analysis.summary.map((point, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis Section */}
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-600" />
          🚨 Risk Analysis
        </h3>
        {analysis.risks.length > 0 ? (
          <div className="space-y-4">
            {analysis.risks.map((risk, index) => (
              <div 
                key={index} 
                className={`risk-item p-6 rounded-lg border-2 ${getRiskColor(risk.severity)}`}
              >
                <div className="flex items-start gap-4">
                  {getRiskIcon(risk.severity)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">{risk.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{risk.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-3 ${
                      risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                      risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {risk.severity.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-green-700 mb-2">No Major Risks Detected</p>
            <p className="text-gray-600">This document appears to follow standard privacy practices.</p>
          </div>
        )}
      </div>
    </div>
  )
}