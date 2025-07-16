// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'

// Importação do AOS para animações
import 'aos/dist/aos.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jmsouza.com'),
  title: {
    default: 'JMSOUZA - Especialista em Tráfego Pago Barueri | Google Ads & Meta Ads',
    template: '%s | JMSOUZA - Tráfego Pago Barueri'
  },
  description: 'Especialista certificado em tráfego pago em Barueri e região. Gestor Google Ads Partner e Meta Ads para empresas locais. Criação de sites otimizados, landing pages e campanhas que geram resultados reais. Atendimento presencial em Barueri, Alphaville e Grande SP.',
  keywords: [
    // Palavras-chave principais
    'tráfego pago barueri',
    'google ads barueri',
    'meta ads barueri',
    'criação de site barueri',
    'agência marketing digital barueri',
    'especialista tráfego pago',
    'gestor de tráfego barueri',
    
    // Palavras-chave regionais
    'tráfego pago alphaville',
    'marketing digital osasco',
    'google ads carapicuíba',
    'meta ads jandira',
    'tráfego pago santana de parnaíba',
    
    // Palavras-chave de nicho
    'tráfego pago para psicólogas',
    'marketing digital para nutricionistas',
    'google ads para dentistas',
    'anúncios para advogados',
    'tráfego para clínicas médicas',
    'marketing para barbearias',
    
    // Palavras-chave de serviços
    'landing pages barueri',
    'sites responsivos',
    'campanhas google ads',
    'facebook ads profissional',
    'instagram ads barueri',
    'marketing digital local',
    'seo barueri',
    'consultoria digital'
  ].join(', '),
  authors: [{ name: 'JMSOUZA Agência Digital', url: 'https://jmsouza.com' }],
  creator: 'JMSOUZA',
  publisher: 'JMSOUZA Agência Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '16x16' },
    ],
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://jmsouza.com',
    siteName: 'JMSOUZA - Tráfego Pago Barueri',
    title: 'JMSOUZA - Especialista em Tráfego Pago Barueri | Google Ads & Meta Ads',
    description: 'Especialista certificado em tráfego pago em Barueri. Gestor Google Ads Partner e Meta Ads para empresas locais. Criação de sites e campanhas que geram resultados reais.',
    images: [
      {
        url: '/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg',
        width: 1200,
        height: 630,
        alt: 'JMSOUZA - Especialista em Tráfego Pago Barueri',
        type: 'image/jpeg',
      },
      {
        url: '/logo_novo_jmsouza.png',
        width: 800,
        height: 600,
        alt: 'Logo JMSOUZA Agência Digital',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jmsouzadigital',
    creator: '@jmsouzadigital',
    title: 'JMSOUZA - Especialista em Tráfego Pago Barueri',
    description: 'Especialista certificado em tráfego pago em Barueri. Google Ads Partner e Meta Ads para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://jmsouza.com',
    languages: {
      'pt-BR': 'https://jmsouza.com',
    },
  },
  verification: {
    google: 'google-site-verification-code', // Adicionar código real
    yandex: 'yandex-verification-code', // Adicionar se necessário
    other: {
      'msvalidate.01': 'bing-verification-code', // Adicionar código real
    },
  },
  category: 'Marketing Digital',
  classification: 'Agência de Marketing Digital',
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'Barueri, São Paulo',
    'geo.position': '-23.5106;-46.8761',
    'ICBM': '-23.5106, -46.8761',
    'DC.title': 'JMSOUZA - Tráfego Pago Barueri',
    'DC.creator': 'JMSOUZA',
    'DC.subject': 'Marketing Digital, Tráfego Pago, Google Ads, Meta Ads',
    'DC.description': 'Especialista em tráfego pago em Barueri',
    'DC.language': 'pt-BR',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '3 days',
  },
}

// Configuração para otimização
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" dir="ltr">
      <head>
        {/* Preconnect para otimização de performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Canonical e alternates */}
        <link rel="canonical" href="https://jmsouza.com" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Barueri, São Paulo, Brasil" />
        <meta name="geo.position" content="-23.5106;-46.8761" />
        <meta name="ICBM" content="-23.5106, -46.8761" />
        
        {/* Business tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="3 days" />
        <meta name="language" content="Portuguese" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="classification" content="Agência de Marketing Digital" />
        <meta name="category" content="Marketing Digital" />
        <meta name="reply-to" content="contato@jmsouza.com" />
        
        {/* Open Graph adicional */}
        <meta property="og:street-address" content="Rua Maria Fernanda, 429" />
        <meta property="og:locality" content="Barueri" />
        <meta property="og:region" content="SP" />
        <meta property="og:postal-code" content="06420-160" />
        <meta property="og:country-name" content="Brasil" />
        <meta property="og:phone_number" content="+55 11 95499-7799" />
        <meta property="business:contact_data:street_address" content="Rua Maria Fernanda, 429" />
        <meta property="business:contact_data:locality" content="Barueri" />
        <meta property="business:contact_data:region" content="SP" />
        <meta property="business:contact_data:postal_code" content="06420-160" />
        <meta property="business:contact_data:country_name" content="Brasil" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16771968208"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16771968208', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'barueri_traffic'
              }
            });
            
            // Enhanced ecommerce tracking
            gtag('config', 'AW-16771968208', {
              'enhanced_ecommerce': true
            });
          `}
        </Script>

        {/* Google Conversions */}
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

        {/* Rich Snippets - LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://jmsouza.com#business",
              "name": "JMSOUZA - Tráfego Pago Barueri",
              "alternateName": "JMSOUZA Agência Digital",
              "description": "Especialista certificado em tráfego pago em Barueri. Google Ads Partner e Meta Ads para empresas locais. Criação de sites e campanhas que geram resultados reais.",
              "url": "https://jmsouza.com",
              "telephone": "+55 11 95499-7799",
              "email": "contato@jmsouza.com",
              "foundingDate": "2020",
              "founder": {
                "@type": "Person",
                "name": "João Marcos Souza",
                "jobTitle": "Especialista em Tráfego Pago"
              },
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
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Barueri",
                  "containedInPlace": {
                    "@type": "State",
                    "name": "São Paulo"
                  }
                },
                {
                  "@type": "City",
                  "name": "Alphaville"
                },
                {
                  "@type": "City",
                  "name": "Osasco"
                },
                {
                  "@type": "City",
                  "name": "Carapicuíba"
                },
                {
                  "@type": "City",
                  "name": "Jandira"
                },
                {
                  "@type": "City",
                  "name": "Santana de Parnaíba"
                }
              ],
              "serviceType": [
                "Tráfego Pago",
                "Google Ads",
                "Meta Ads",
                "Facebook Ads",
                "Instagram Ads",
                "Criação de Sites",
                "Landing Pages",
                "Marketing Digital",
                "SEO Local",
                "Consultoria Digital"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Serviços de Marketing Digital",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Gestão de Tráfego Pago",
                      "description": "Criação e gestão de campanhas Google Ads e Meta Ads"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Criação de Sites",
                      "description": "Desenvolvimento de sites responsivos e otimizados"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Landing Pages",
                      "description": "Páginas de conversão otimizadas para campanhas"
                    }
                  }
                ]
              },
              "priceRange": "$$",
              "currenciesAccepted": "BRL",
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "PIX"],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "47",
                "bestRating": "5",
                "worstRating": "1"
              },
              "sameAs": [
                "https://www.instagram.com/jmsouzadigital",
                "https://www.linkedin.com/company/jmsouza-digital",
                "https://wa.me/5511954997799"
              ],
              "logo": {
                "@type": "ImageObject",
                "url": "https://jmsouza.com/logo_novo_jmsouza.png",
                "width": 300,
                "height": 200
              },
              "image": [
                "https://jmsouza.com/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg",
                "https://jmsouza.com/logo_novo_jmsouza.png"
              ]
            })
          }}
        />

        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://jmsouza.com#service",
              "name": "JMSOUZA - Especialista em Tráfego Pago",
              "description": "Serviços especializados em tráfego pago, Google Ads, Meta Ads e criação de sites para empresas em Barueri e região.",
              "provider": {
                "@id": "https://jmsouza.com#business"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -23.5106,
                  "longitude": -46.8761
                },
                "geoRadius": "50000"
              },
              "serviceType": "Marketing Digital",
              "category": "Agência de Marketing Digital"
            })
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://jmsouza.com#website",
              "url": "https://jmsouza.com",
              "name": "JMSOUZA - Tráfego Pago Barueri",
              "description": "Site oficial da JMSOUZA, especialista em tráfego pago em Barueri",
              "publisher": {
                "@id": "https://jmsouza.com#business"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://jmsouza.com/blog?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "pt-BR"
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
