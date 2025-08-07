'use client'

import { useState } from 'react'
import { Upload, Link2, FileText, RotateCcw } from 'lucide-react'

interface DocumentInputProps {
  onAnalyze: (content: string, source?: string) => void
  onReset: () => void
  isLoading: boolean
}

export default function DocumentInput({ onAnalyze, onReset, isLoading }: DocumentInputProps) {
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [inputType, setInputType] = useState<'text' | 'url'>('text')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputType === 'url' && url.trim()) {
      // Simulate URL fetching with mock content
      const mockContent = `Privacy Policy from ${url}

Data Collection:
We collect personal information including your name, email address, phone number, and usage data. We also collect information automatically through cookies, web beacons, and similar tracking technologies.

Data Usage:
Your information is used to provide and improve our services, send marketing communications, analyze usage patterns, and share with our business partners for advertising purposes.

Third-Party Sharing:
We may share your personal information with third-party service providers, advertising partners, data analytics companies, and other business partners. In case of a merger or acquisition, your data may be transferred to the acquiring company.

Data Retention:
We retain your personal information for as long as necessary to provide our services and for legitimate business purposes. Some data may be retained indefinitely for analytics and marketing purposes.

Your Rights:
You have the right to access, correct, or delete your personal information. However, some information may be retained for legal compliance and business operations.

Contact:
For privacy inquiries, contact our team at privacy@example.com`
      
      onAnalyze(mockContent, url)
      return
    }
    
    if (inputType === 'text' && content.trim()) {
      onAnalyze(content, 'Direct input')
    }
  }

  const handleClear = () => {
    setContent('')
    setUrl('')
    onReset()
  }

  const isSubmitDisabled = isLoading || (inputType === 'text' ? !content.trim() : !url.trim())

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 fade-in">
      {/* Input Type Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-8 w-fit mx-auto">
        <button
          type="button"
          onClick={() => setInputType('text')}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            inputType === 'text'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Paste Text
        </button>
        <button
          type="button"
          onClick={() => setInputType('url')}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            inputType === 'url'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Link2 className="w-4 h-4" />
          From URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {inputType === 'url' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Document URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/privacy-policy"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus-ring smooth-transition text-gray-900 placeholder-gray-500"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter the URL of a privacy policy or terms of service document
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Legal Document Text
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Paste your privacy policy, terms of service, or any legal document here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus-ring smooth-transition resize-none text-gray-900 placeholder-gray-500"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 100 characters required for analysis
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus-ring smooth-transition font-medium flex items-center gap-2 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            {isLoading ? 'Analyzing...' : 'Analyze Document'}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus-ring smooth-transition font-medium flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}