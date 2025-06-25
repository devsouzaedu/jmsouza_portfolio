'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaChevronRight } from 'react-icons/fa'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[]
}

export default function Breadcrumbs({ customItems }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Gerar breadcrumbs automaticamente se não houver customItems
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems
    
    const pathSegments = pathname.split('/').filter(segment => segment)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Início', href: '/' }
    ]
    
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Mapear segmentos para labels mais amigáveis
      const labelMap: { [key: string]: string } = {
        'trafego-pago-barueri': 'Tráfego Pago Barueri',
        'criacao-de-site-barueri': 'Criação de Site Barueri',
        'especialista-trafego-pago-barueri': 'Especialista Tráfego Pago',
        'estrategista-digital-barueri': 'Estrategista Digital',
        'gestor-de-trafego-barueri': 'Gestor de Tráfego',
        'agencia-marketing-digital-barueri': 'Agência Marketing Digital',
        'trafego-pago-alphaville': 'Tráfego Pago Alphaville',
        'google-ads-barueri': 'Google Ads Barueri',
        'meta-ads-barueri': 'Meta Ads Barueri',
        'trafego-para-psicologas': 'Tráfego para Psicólogas',
        'trafego-para-nutricionistas': 'Tráfego para Nutricionistas',
        'trafego-para-barbearias': 'Tráfego para Barbearias',
        'trafego-para-dentistas': 'Tráfego para Dentistas',
        'trafego-para-advogados': 'Tráfego para Advogados',
        'trafego-para-medicos': 'Tráfego para Médicos',
        'trafego-para-fisioterapeutas': 'Tráfego para Fisioterapeutas',
        'trafego-para-veterinarios': 'Tráfego para Veterinários',
        'trafego-para-contadores': 'Tráfego para Contadores',
        'trafego-para-academias': 'Tráfego para Academias',
        'trafego-para-restaurantes': 'Tráfego para Restaurantes',
        'trafego-para-saloes-de-beleza': 'Tráfego para Salões de Beleza',
        'trafego-para-esteticistas': 'Tráfego para Esteticistas',
        'ecommerce': 'E-commerce',
        'landing-pages': 'Landing Pages',
        'blog': 'Blog',
        'blog-seo': 'Blog SEO'
      }
      
      const label = labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      
      breadcrumbs.push({
        label,
        href: currentPath
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // Gerar structured data para breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://jmsouza.com${item.href}`
    }))
  }
  
  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null // Não mostrar breadcrumbs na homepage
  }
  
  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {/* Breadcrumbs visuais */}
      <nav 
        aria-label="Breadcrumb" 
        className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <FaChevronRight 
                    className="text-gray-400 mr-2" 
                    size={12}
                    aria-hidden="true"
                  />
                )}
                
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
                    aria-label="Voltar para a página inicial"
                  >
                    <FaHome className="mr-1" size={14} aria-hidden="true" />
                    <span className="sr-only">Início</span>
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <span 
                    className="text-gray-700 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
} 