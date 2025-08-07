// lib/ai.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnalysisResult } from '@/types'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Fallback mock AI analysis
export async function analyzeWithAI(content: string): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const risks: any[] = []
  const summary: string[] = []

  const riskKeywords = {
    'third-party': 'high',
    'share': 'medium',
    'tracking': 'high',
    'cookies': 'medium',
    'advertising': 'medium',
    'sell': 'high',
    'location': 'high',
    'biometric': 'high',
    'surveillance': 'high',
    'indefinitely': 'high',
    'partners': 'medium',
    'marketing': 'low',
  }

  const lowerContent = content.toLowerCase()

  Object.entries(riskKeywords).forEach(([keyword, severity]) => {
    if (lowerContent.includes(keyword)) {
      risks.push({
        title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Usage Detected`,
        description: `The document mentions "${keyword}" which may indicate data sharing or privacy concerns.`,
        severity: severity as 'low' | 'medium' | 'high',
      })
    }
  })

  if (lowerContent.includes('collect')) {
    summary.push('The service collects various types of personal information from users')
  }
  if (lowerContent.includes('share') || lowerContent.includes('third-party')) {
    summary.push('Personal data may be shared with third-party companies or partners')
  }
  if (lowerContent.includes('cookie')) {
    summary.push('The service uses cookies and tracking technologies')
  }
  if (lowerContent.includes('right')) {
    summary.push('Users have certain rights regarding their personal data')
  }
  if (lowerContent.includes('retention')) {
    summary.push('Data retention policies are specified in the document')
  }

  if (summary.length === 0) {
    summary.push(
      'This document outlines how personal information is handled',
      'Various data collection and usage practices are described',
      'User rights and contact information are typically included',
      'Legal compliance requirements are addressed',
      'Data security measures may be mentioned'
    )
  }

  const highRiskCount = risks.filter(r => r.severity === 'high').length
  const safetyRating = highRiskCount > 2 ? 'suspicious' : 'safe'
  const confidence = Math.floor(Math.random() * 20) + 75

  return {
    summary: summary.slice(0, 5),
    risks: risks.slice(0, 6),
    safetyRating,
    confidence,
  }
}

// Gemini API integration
export async function callGeminiAPI(content: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY
  const modelName = 'gemini-1.5-flash'

  if (!apiKey) throw new Error('Gemini API key not configured')

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: modelName })

    const prompt = `Please analyze this legal document and provide a JSON response with the following structure:
{
  "summary": [5 key takeaway points as strings],
  "risks": [
    {
      "title": "Risk title",
      "description": "Risk description", 
      "severity": "low|medium|high"
    }
  ],
  "safetyRating": "safe|suspicious",
  "confidence": number (0-100)
}

Document:
${content}`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    })

    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Invalid JSON format in Gemini response')
  } catch (error) {
    console.error('Gemini API call failed:', error)
    return analyzeWithAI(content)
  }
}
