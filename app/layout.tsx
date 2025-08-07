import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ConsentLens | AI Legal Document Analyzer',
  description: 'Understand privacy policies and terms of service with AI-powered analysis. Get clear summaries and risk assessments in seconds.',
  keywords: 'privacy policy, terms of service, legal analysis, AI, document analyzer',
  authors: [{ name: 'ConsentLens Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
