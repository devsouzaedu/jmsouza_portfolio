import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jmsouza.com'
  
  // Páginas principais com alta prioridade
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/trafego-pago-barueri`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/criacao-de-site-barueri`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Páginas de serviços regionais (alta prioridade)
  const regionalPages = [
    'especialista-trafego-pago-barueri',
    'estrategista-digital-barueri',
    'gestor-de-trafego-barueri',
    'agencia-marketing-digital-barueri',
    'trafego-pago-alphaville',
    'google-ads-barueri',
    'meta-ads-barueri',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas de nichos específicos (boa prioridade)
  const nichePages = [
    'trafego-para-psicologas',
    'trafego-para-nutricionistas',
    'trafego-para-barbearias',
    'trafego-para-dentistas',
    'trafego-para-advogados',
    'trafego-para-medicos',
    'trafego-para-fisioterapeutas',
    'trafego-para-veterinarios',
    'trafego-para-contadores',
    'trafego-para-academias',
    'trafego-para-restaurantes',
    'trafego-para-saloes-de-beleza',
    'trafego-para-esteticistas',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Páginas de serviços adicionais
  const servicePages = [
    'ecommerce',
    'landing-pages',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Páginas do blog (prioridade média)
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog-seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]

  return [
    ...mainPages,
    ...regionalPages,
    ...nichePages,
    ...servicePages,
    ...blogPages,
  ]
} 