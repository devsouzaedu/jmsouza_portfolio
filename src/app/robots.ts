import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/adminblog/', '/api/'],
    },
    sitemap: 'https://jmsouza.com/sitemap.xml',
  }
} 