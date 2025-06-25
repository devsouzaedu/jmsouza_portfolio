import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/adminblog/',
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/adminblog/',
          '/api/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/adminblog/',
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://jmsouza.com/sitemap.xml',
    host: 'https://jmsouza.com',
  }
} 