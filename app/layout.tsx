import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SLP',
  description: 'ABBAS SLP - Music Video Director & Editor Portfolio',
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
    url: 'https://satyars.com',
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

