import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'karthikbi.dev',
  description: 'Building data systems that actually scale. Senior BI Engineer @ LinkedIn.',
  metadataBase: new URL('https://karthikbi.dev'),
  openGraph: {
    title: 'karthikbi.dev',
    description: 'Building data systems that actually scale. 18 years from Cognos to Microsoft Fabric.',
    url: 'https://karthikbi.dev',
    siteName: 'karthikbi.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'karthikbi.dev',
    description: 'Building data systems that actually scale.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-bg text-text flex flex-col font-sans">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
