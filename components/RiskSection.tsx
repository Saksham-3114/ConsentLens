'use client'

import { Shield, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { RiskItem } from '@/types'

interface RisksSectionProps {
  risks: RiskItem[]
}

export default function RisksSection({ risks }: RisksSectionProps) {
  const getRiskConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500',
          badgeColor: 'bg-red-100 text-red-800'
        }
      case 'medium':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-500',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        }
      case 'low':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500',
          badgeColor: 'bg-green-100 text-green-800'
        }
      default:
        return {
          icon: AlertCircle,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-500',
          badgeColor: 'bg-gray-100 text-gray-800'
        }
    }
  }

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Risk Assessment</h2>
      </div>
      
      {risks.length > 0 ? (
        <div className="space-y-4">
          {risks.map((risk, index) => {
            const config = getRiskConfig(risk.severity)
            const Icon = config.icon
            
            return (
              <div 
                key={index} 
                className={`p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor} smooth-transition hover:shadow-sm`}
              >
                <div className="flex gap-4">
                  <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{risk.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{risk.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}>
                      {risk.severity.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-green-800 mb-2">No Significant Risks Found</h3>
          <p className="text-gray-600">This document appears to follow standard privacy practices.</p>
        </div>
      )}
    </section>
  )
}