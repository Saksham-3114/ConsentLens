'use client'

import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

interface SafetyBadgeProps {
  rating: 'safe' | 'suspicious'
  confidence: number
}

export default function SafetyBadge({ rating, confidence }: SafetyBadgeProps) {
  const isSafe = rating === 'safe'
  
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center">
      <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold ${
        isSafe 
          ? 'bg-green-50 text-green-800 border-2 border-green-200'
          : 'bg-red-50 text-red-800 border-2 border-red-200'
      }`}>
        {isSafe ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <AlertTriangle className="w-6 h-6" />
        )}
        {isSafe ? 'Document appears Safe' : 'Document needs Review'}
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-medium">Analysis Confidence: {confidence}%</span>
      </div>
    </div>
  )
}