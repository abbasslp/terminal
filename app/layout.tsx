import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ABBAS SLP - Filmmaker, Director & Editor Portfolio',
  description: 'ABBAS SLP - Music Video Director & Editor Portfolio. Filmmaker, Director, Editor, and Software Developer specializing in cinematic music videos, DaVinci Resolve, and software development.',
  keywords: ['Abbas Salmanpour', 'ABBAS SLP', 'Filmmaker', 'Video Director', 'Video Editor', 'DaVinci Resolve', 'Music Video', 'Software Developer'],
  authors: [{ name: 'Abbas Salmanpour' }],
  creator: 'Abbas Salmanpour',
  publisher: 'Abbas Salmanpour',
  metadataBase: new URL('https://abbasslp.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ABBAS SLP - Filmmaker, Director & Editor Portfolio',
    description: 'Filmmaker, Director, Editor, and Software Developer. Specializing in cinematic music videos, DaVinci Resolve, and software development.',
    url: 'https://abbasslp.com',
    siteName: 'ABBAS SLP Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABBAS SLP - Filmmaker, Director & Editor Portfolio',
    description: 'Filmmaker, Director, Editor, and Software Developer. Specializing in cinematic music videos, DaVinci Resolve, and software development.',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abbas Salmanpour',
    alternateName: 'Abbas SLP',
    jobTitle: 'Filmmaker, Director, Editor, and Software Developer',
    description: 'Filmmaker, Director, Editor, and Software Developer. Specializing in directing and editing cinematic music videos, advanced editing and color grading in DaVinci Resolve, and software development.',
    url: 'https://abbasslp.com',
    sameAs: [
      'https://t.me/slpabbas',
    ],
    email: 'aspersiangolf@gmail.com',
    birthPlace: {
      '@type': 'Place',
      name: 'Bandar Abbas (Gambron), Iran',
    },
    knowsAbout: [
      'Video Editing',
      'Film Directing',
      'DaVinci Resolve',
      'Color Grading',
      'Music Video Production',
      'Next.js',
      'React',
      'Golang',
      'Software Development',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Professional Career Started 2017',
    },
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://abbasslp.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

