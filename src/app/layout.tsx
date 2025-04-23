// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Criação de site - JMSOUZA AGÊNCIA',
  description: 'Criação de sites profissionais, landing pages e soluções digitais personalizadas para empresas. Agência JMSOUZA: destaque sua marca no digital.',
  keywords: ['criação de site', 'agência digital', 'landing page', 'sites profissionais', 'JMSOUZA', 'desenvolvimento web', 'SEO', 'marketing digital'],
  authors: [{ name: 'JMSOUZA AGÊNCIA' }],
  creator: 'JMSOUZA AGÊNCIA',
  publisher: 'JMSOUZA AGÊNCIA',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Criação de site - JMSOUZA AGÊNCIA',
    description: 'Criação de sites profissionais, landing pages e soluções digitais personalizadas para empresas. Agência JMSOUZA: destaque sua marca no digital.',
    url: 'https://seu-dominio.com',
    siteName: 'Criação de site - JMSOUZA AGÊNCIA',
    images: [
      {
        url: '/favicon.ico',
        width: 800,
        height: 600,
        alt: 'Criação de site - JMSOUZA AGÊNCIA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criação de site - JMSOUZA AGÊNCIA',
    description: 'Criação de sites profissionais, landing pages e soluções digitais personalizadas para empresas. Agência JMSOUZA: destaque sua marca no digital.',
    images: ['/favicon.ico'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Configurar para não usar cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16927678460"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16927678460');
          `}
        </Script>
        <Script id="google-conversion-report" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16927678460/tuEOCLD2764bkaEPy_34c_',
                  'value': 1.0,
                  'currency': 'BRL',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
