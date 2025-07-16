import { Metadata } from 'next'
import EbookContent from './EbookContent'

export const metadata: Metadata = {
  title: 'Como Vender de Verdade no Instagram em 2025 - Ebook Gratuito | JMSouza',
  description: 'Baixe nosso ebook exclusivo com dicas valiosas para vender no Instagram em 2025. Download gratuito com estratégias comprovadas.',
  keywords: 'ebook instagram, vender instagram, marketing digital, redes sociais, estratégias instagram',
  openGraph: {
    title: 'Como Vender de Verdade no Instagram em 2025 - Ebook Gratuito',
    description: 'Baixe nosso ebook exclusivo com dicas valiosas para vender no Instagram em 2025. Download gratuito com estratégias comprovadas.',
    type: 'website',
    url: 'https://jmsouza.com.br/ebook',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Como Vender de Verdade no Instagram em 2025 - Ebook Gratuito',
    description: 'Baixe nosso ebook exclusivo com dicas valiosas para vender no Instagram em 2025. Download gratuito com estratégias comprovadas.',
  },
}

export default function EbookPage() {
  return <EbookContent />
} 