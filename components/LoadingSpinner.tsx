'use client'

import { Brain, Search, Shield } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="glass-effect rounded-2xl p-12 text-center mb-8">
      <div className="space-y-6">
        {/* Animated Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="animate-bounce">
            <Search className="w-8 h-8 text-blue-500" />
          </div>
          <div className="animate-bounce delay-75">
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
          <div className="animate-bounce delay-150">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Analyzing Legal Document</h3>
          <p className="text-gray-600">Our AI is carefully reviewing your document for potential risks and key insights...</p>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Parsing content</span>
            <span>Analyzing risks</span>
            <span>Generating summary</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}