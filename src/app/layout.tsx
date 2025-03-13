// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eduardo - Desenvolvedor Full-Stack & IA',
  description: 'Desenvolvedor Full-Stack especializado na criação de aplicações web e mobile com integração de Inteligência Artificial. Transformando ideias em soluções tecnológicas inovadoras.',
  keywords: ['desenvolvedor full-stack', 'inteligência artificial', 'desenvolvimento web', 'aplicações IA', 'programador', 'react', 'next.js', 'node.js'],
  authors: [{ name: 'Eduardo' }],
  creator: 'Eduardo',
  publisher: 'Eduardo',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Eduardo - Desenvolvedor Full-Stack & IA',
    description: 'Desenvolvedor Full-Stack especializado na criação de aplicações web e mobile com integração de Inteligência Artificial.',
    url: 'https://seu-dominio.com',
    siteName: 'Portfólio de Eduardo',
    images: [
      {
        url: '/favicon.ico',
        width: 800,
        height: 600,
        alt: 'Eduardo - Desenvolvedor Full-Stack & IA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo - Desenvolvedor Full-Stack & IA',
    description: 'Desenvolvedor Full-Stack especializado na criação de aplicações web e mobile com integração de Inteligência Artificial.',
    images: ['/favicon.ico'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
