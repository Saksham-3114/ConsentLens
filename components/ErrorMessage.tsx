'use client'

import { AlertCircle, X } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border-2 border-red-200 p-6 slide-up">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">Analysis Failed</h3>
          <p className="text-red-700">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 smooth-transition focus-ring"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  )
}