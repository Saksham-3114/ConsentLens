import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ConsentLens - Legal Text Analyzer',
  description: 'Decode legal jargon and understand what you\'re really agreeing to. Analyze privacy policies and terms of service in seconds.',
  keywords: 'privacy policy, terms of service, legal analysis, AI, consent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}