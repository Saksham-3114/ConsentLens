'use client'

import { FileSearch, Brain, Shield } from 'lucide-react'

export default function LoadingAnimation() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="space-y-8">
        {/* Animated Icons */}
        <div className="flex justify-center gap-4">
          <div className="animate-bounce">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileSearch className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="animate-bounce delay-75">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="animate-bounce delay-150">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">Analyzing Document</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Our AI is reviewing your document for key insights and potential privacy concerns.
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Processing</span>
            <span>Analyzing</span>
            <span>Finalizing</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}