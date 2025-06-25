// Funções para análise de SEO e performance

export interface SEOMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

export interface SEOData {
  url: string
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogImage: string
  structuredData: any[]
  internalLinks: number
  externalLinks: number
  imageCount: number
  wordCount: number
  headings: {
    h1: number
    h2: number
    h3: number
  }
}

// Função para coletar métricas de performance
export const collectPerformanceMetrics = (): Promise<SEOMetrics> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve({
        pageLoadTime: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        timeToInteractive: 0,
      })
      return
    }

    // Aguardar o carregamento completo
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        
        // Coletar métricas Web Vitals se disponível
        let lcp = 0
        let cls = 0
        let fid = 0
        let tti = 0

        // Observer para LCP
        if ('PerformanceObserver' in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1]
              lcp = lastEntry.startTime
            })
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
          } catch (e) {
            console.warn('LCP observer não suportado')
          }

          // Observer para CLS
          try {
            const clsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  cls += (entry as any).value
                }
              }
            })
            clsObserver.observe({ entryTypes: ['layout-shift'] })
          } catch (e) {
            console.warn('CLS observer não suportado')
          }

          // Observer para FID
          try {
            const fidObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                fid = (entry as any).processingStart - entry.startTime
              }
            })
            fidObserver.observe({ entryTypes: ['first-input'] })
          } catch (e) {
            console.warn('FID observer não suportado')
          }
        }

        resolve({
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          firstContentfulPaint: fcp,
          largestContentfulPaint: lcp,
          cumulativeLayoutShift: cls,
          firstInputDelay: fid,
          timeToInteractive: tti,
        })
      }, 1000)
    })
  })
}

// Função para analisar SEO da página
export const analyzeSEO = (): SEOData => {
  if (typeof window === 'undefined') {
    return {
      url: '',
      title: '',
      description: '',
      keywords: [],
      canonicalUrl: '',
      ogImage: '',
      structuredData: [],
      internalLinks: 0,
      externalLinks: 0,
      imageCount: 0,
      wordCount: 0,
      headings: { h1: 0, h2: 0, h3: 0 },
    }
  }

  const doc = document
  
  // Coletar dados básicos
  const title = doc.querySelector('title')?.textContent || ''
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || ''
  const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content')?.split(',').map(k => k.trim()) || []
  const canonicalUrl = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
  
  // Coletar structured data
  const structuredDataElements = doc.querySelectorAll('script[type="application/ld+json"]')
  const structuredData = Array.from(structuredDataElements).map(el => {
    try {
      return JSON.parse(el.textContent || '{}')
    } catch {
      return {}
    }
  })
  
  // Contar links
  const allLinks = doc.querySelectorAll('a[href]')
  let internalLinks = 0
  let externalLinks = 0
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href') || ''
    if (href.startsWith('/') || href.includes(window.location.hostname)) {
      internalLinks++
    } else if (href.startsWith('http')) {
      externalLinks++
    }
  })
  
  // Contar imagens
  const imageCount = doc.querySelectorAll('img').length
  
  // Contar palavras no conteúdo principal
  const mainContent = doc.querySelector('main') || doc.body
  const textContent = mainContent?.textContent || ''
  const wordCount = textContent.trim().split(/\s+/).length
  
  // Contar headings
  const headings = {
    h1: doc.querySelectorAll('h1').length,
    h2: doc.querySelectorAll('h2').length,
    h3: doc.querySelectorAll('h3').length,
  }
  
  return {
    url: window.location.href,
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    structuredData,
    internalLinks,
    externalLinks,
    imageCount,
    wordCount,
    headings,
  }
}

// Função para enviar dados de analytics
export const sendSEOAnalytics = async (metrics: SEOMetrics, seoData: SEOData) => {
  if (typeof window === 'undefined') return
  
  // Enviar para Google Analytics se disponível
  if (window.gtag) {
    window.gtag('event', 'page_performance', {
      custom_parameter_1: 'seo_metrics',
      page_load_time: Math.round(metrics.pageLoadTime),
      fcp: Math.round(metrics.firstContentfulPaint),
      lcp: Math.round(metrics.largestContentfulPaint),
      cls: metrics.cumulativeLayoutShift,
      fid: Math.round(metrics.firstInputDelay),
    })
    
    window.gtag('event', 'seo_analysis', {
      custom_parameter_1: 'seo_data',
      word_count: seoData.wordCount,
      internal_links: seoData.internalLinks,
      external_links: seoData.externalLinks,
      image_count: seoData.imageCount,
      h1_count: seoData.headings.h1,
      h2_count: seoData.headings.h2,
      h3_count: seoData.headings.h3,
    })
  }
  
  // Aqui você pode adicionar outros serviços de analytics
  console.log('SEO Metrics:', metrics)
  console.log('SEO Data:', seoData)
}

// Função para verificar Core Web Vitals
export const checkCoreWebVitals = (): Promise<{
  lcp: number
  fid: number
  cls: number
  grade: 'good' | 'needs-improvement' | 'poor'
}> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve({ lcp: 0, fid: 0, cls: 0, grade: 'poor' })
      return
    }

    const metrics = { lcp: 0, fid: 0, cls: 0 }
    let metricsCollected = 0
    const totalMetrics = 3

    const checkComplete = () => {
      metricsCollected++
      if (metricsCollected >= totalMetrics) {
        // Determinar grade baseada nos Core Web Vitals
        let grade: 'good' | 'needs-improvement' | 'poor' = 'good'
        
        if (metrics.lcp > 4000 || metrics.fid > 300 || metrics.cls > 0.25) {
          grade = 'poor'
        } else if (metrics.lcp > 2500 || metrics.fid > 100 || metrics.cls > 0.1) {
          grade = 'needs-improvement'
        }
        
        resolve({ ...metrics, grade })
      }
    }

    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          metrics.lcp = lastEntry.startTime
          checkComplete()
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch {
        checkComplete()
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            metrics.fid = (entry as any).processingStart - entry.startTime
            checkComplete()
            break
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch {
        checkComplete()
      }

      // CLS Observer
      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              metrics.cls += (entry as any).value
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        
        // CLS é cumulativo, então definimos um timeout
        setTimeout(() => {
          checkComplete()
        }, 5000)
      } catch {
        checkComplete()
      }
    } else {
      // Fallback se PerformanceObserver não estiver disponível
      setTimeout(() => {
        resolve({ lcp: 0, fid: 0, cls: 0, grade: 'poor' })
      }, 1000)
    }
  })
}

// Função para otimização automática de imagens
export const optimizeImages = () => {
  if (typeof window === 'undefined') return

  const images = document.querySelectorAll('img')
  
  images.forEach(img => {
    // Adicionar loading lazy se não estiver definido
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy')
    }
    
    // Adicionar decoding async
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async')
    }
    
    // Verificar se tem alt text
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
      console.warn('Imagem sem alt text encontrada:', img.src)
    }
  })
}

// Declaração global para gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
} 