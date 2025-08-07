'use client'

import { FileSearch, Shield, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-16 fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
        <FileSearch className="w-8 h-8 text-blue-600" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        ConsentLens
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Analyze privacy policies and legal documents with AI. 
        Get clear insights about your data rights in seconds.
      </p>
      
      <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Privacy First</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>AI Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-blue-500" />
          <span>Instant Analysis</span>
        </div>
      </div>
    </header>
  )
}