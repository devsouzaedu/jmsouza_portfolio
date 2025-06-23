// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'

// Importação do AOS para animações
import 'aos/dist/aos.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tráfego Pago em Barueri | Especialista em Google Ads e Meta Ads | JMSOUZA',
  description: 'Especialista em tráfego pago em Barueri. Gestor de Google Ads e Meta Ads para empresas locais. Criação de site em Barueri, marketing digital para psicólogas e anúncios regionais segmentados.',
  keywords: 'tráfego pago em Barueri, criação de site em Barueri, especialista em Google Ads Barueri, gestor de Meta Ads em Barueri, tráfego pago para psicólogas, anúncios para psicólogas no Google, marketing digital para psicólogas, sites para psicólogas em Barueri, anúncios em Barueri, agência de marketing em Barueri, gestor de tráfego Barueri, gestão de anúncios online, performance digital local, campanhas para clínicas e consultórios, presença online profissional, anúncios regionais segmentados, atrair pacientes com marketing digital, tráfego qualificado para psicólogas, consultoria em Google e Meta Ads, desenvolvimento de site personalizado, profissional de tráfego pago em SP',
  authors: [{ name: 'JMSOUZA Agência Digital' }],
  creator: 'JMSOUZA',
  publisher: 'JMSOUZA',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://jmsouza.com',
    siteName: 'JMSOUZA - Tráfego Pago Barueri',
    title: 'Tráfego Pago em Barueri | Especialista em Google Ads e Meta Ads',
    description: 'Especialista em tráfego pago em Barueri. Gestor de Google Ads e Meta Ads para empresas locais. Criação de site em Barueri e marketing digital para psicólogas.',
    images: [
      {
        url: '/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg',
        width: 1200,
        height: 630,
        alt: 'Tráfego Pago Barueri - Especialista em Google Ads e Meta Ads JMSOUZA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tráfego Pago em Barueri | Especialista em Google Ads e Meta Ads',
    description: 'Especialista em tráfego pago em Barueri. Gestor de Google Ads e Meta Ads para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jmsouza.com',
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "Barueri",
    "geo.position": "-23.5106;-46.8761",
    "ICBM": "-23.5106, -46.8761",
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
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://jmsouza.com" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Barueri, São Paulo" />
        <meta name="geo.position" content="-23.5106;-46.8761" />
        <meta name="ICBM" content="-23.5106, -46.8761" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16771968208"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16771968208');
          `}
        </Script>

        {/* Google tag (gtag.js) - Conversões */}
        <Script id="google-conversions" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16771968208/0gRdCOHfz9kZELLB6Og9',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "JMSOUZA - Tráfego Pago Barueri",
              "description": "Especialista em tráfego pago em Barueri. Gestor de Google Ads e Meta Ads para empresas locais.",
              "url": "https://jmsouza.com",
              "telephone": "+551195499-7799",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Maria Fernanda, 429",
                "addressLocality": "Barueri",
                "addressRegion": "SP",
                "postalCode": "06420-160",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.5106,
                "longitude": -46.8761
              },
              "areaServed": [
                "Barueri",
                "Alphaville",
                "Tamboré",
                "São Paulo"
              ],
              "serviceType": [
                "Tráfego Pago",
                "Google Ads",
                "Meta Ads",
                "Criação de Sites",
                "Marketing Digital"
              ],
              "priceRange": "$$"
            })
          }}
        />
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
