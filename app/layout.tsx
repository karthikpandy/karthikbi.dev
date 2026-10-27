import type { Metadata } from 'next'
import Script from 'next/script'
import { Instrument_Sans, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const display = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'karthikbi.dev',
  description: 'Writing about BI engineering, data architecture, and the modern data stack.',
  metadataBase: new URL('https://karthikbi.dev'),
  verification: {
    google: 'aX-TACEbk5xejp-MXQlv9k205eU9jLrCaXUepO5Wit0',
  },
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

// Applied before first paint so a stored theme never flashes.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`

const clarityScript = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "z43qzoudvq");
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-ground text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {clarityScript}
        </Script>
      </body>
    </html>
  )
}
