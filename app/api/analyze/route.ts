/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { AnalysisRequest, AnalysisResult } from '@/types'
import { analyzeWithAI, callGeminiAPI } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { content }: AnalysisRequest = await request.json()

    if (!content || content.trim().length < 100) {
      return NextResponse.json(
        { error: 'Content must be at least 100 characters long' },
        { status: 400 }
      )
    }

    const service = process.env.PREFERRED_AI_SERVICE || 'mock'

    let result: AnalysisResult

    switch (service) {
      case 'gemini':
        result = await callGeminiAPI(content)
        break
      default:
        result = await analyzeWithAI(content)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze document' },
      { status: 500 }
    )
  }
}
