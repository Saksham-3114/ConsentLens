'use client'

import { useState } from 'react'
import { Upload, Link, FileText, Trash2 } from 'lucide-react'

interface InputSectionProps {
  onAnalyze: (content: string, source?: string) => void
  onClear: () => void
  isLoading: boolean
}

export default function InputSection({ onAnalyze, onClear, isLoading }: InputSectionProps) {
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'text' | 'url'>('text')

  const handleSubmit = () => {
    if (activeTab === 'url' && url.trim()) {
      handleFetchUrl()
    } else if (activeTab === 'text' && content.trim()) {
      onAnalyze(content, 'Direct input')
    }
  }

  const handleFetchUrl = async () => {
    if (!url.trim()) return
    
    try {
      // In a real implementation, you'd fetch the URL content
      // For now, we'll simulate it
      const simulatedContent = `Privacy Policy from ${url}

This privacy policy describes how we collect, use, and share your personal information when you use our services.

Information We Collect:
- Personal information you provide directly
- Information collected automatically through cookies and tracking
- Location data and device information
- Communication records and customer service interactions

How We Use Your Information:
- To provide and improve our services
- For marketing and advertising purposes
- To share with third-party partners for analytics
- For legal compliance and safety purposes

Third-Party Sharing:
We may share your information with:
- Service providers and business partners
- Advertising networks and data brokers
- Government agencies when required by law
- Other companies in case of merger or acquisition

Your Rights:
You may request access, correction, or deletion of your personal information. However, some information may be retained for legitimate business purposes.

Contact Us:
For questions about this policy, please contact our privacy team.`
      
      onAnalyze(simulatedContent, url)
    } catch (error) {
      console.error('Failed to fetch URL:', error)
    }
  }

  const handleClear = () => {
    setContent('')
    setUrl('')
    onClear()
  }

  return (
    <div className="glass-effect rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
        <FileText className="w-6 h-6" />
        Legal Text Input
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'text' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'url' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Link className="w-4 h-4" />
          From URL
        </button>
      </div>

      {activeTab === 'url' ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter URL (Privacy Policy or Terms of Service)
          </label>
          <div className="flex gap-3">
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/privacy-policy"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Legal Text Directly
          </label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="Paste your privacy policy, terms of service, or any legal document here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200"
            disabled={isLoading}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button 
          onClick={handleSubmit}
          disabled={isLoading || (!content.trim() && !url.trim())}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center gap-3"
        >
          <Upload className="w-5 h-5" />
          {isLoading ? 'Analyzing...' : 'Analyze Document'}
        </button>
        <button 
          onClick={handleClear}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  )
}