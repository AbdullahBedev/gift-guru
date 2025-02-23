import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gift Guru - AI-Powered Gift Recommendations',
  description: 'Find the perfect gift with AI-powered recommendations tailored to your loved ones.',
  keywords: ['gift recommendations', 'AI gift finder', 'personalized gifts', 'gift ideas'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={`${GeistSans.className} antialiased bg-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
