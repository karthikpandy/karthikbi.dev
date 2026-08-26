import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'karthikbi.dev',
  description: 'Writing about BI engineering, data architecture, and the modern data stack.',
  metadataBase: new URL('https://karthikbi.dev'),
  openGraph: {
    title: 'karthikbi.dev',
    description: '18 years from Cognos to Microsoft Fabric. Sharing what I learn.',
    url: 'https://karthikbi.dev',
    siteName: 'karthikbi.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'karthikbi.dev',
    description: 'Writing about BI engineering and the modern data stack.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
