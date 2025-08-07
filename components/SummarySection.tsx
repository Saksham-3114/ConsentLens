'use client'

import { Lightbulb } from 'lucide-react'

interface SummarySectionProps {
  summary: string[]
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Key Insights</h2>
      </div>
      
      <div className="space-y-4">
        {summary.map((insight, index) => (
          <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-xl">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-semibold text-sm flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </section>
  )
}