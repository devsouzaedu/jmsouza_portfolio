'use client'

import { Button } from '@/components/Button'
import Image from 'next/image'

export default function EbookContent() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Como Vender de Verdade No Instagram em 2025 Jmsouza.pdf'
    link.download = 'Como Vender de Verdade No Instagram em 2025 Jmsouza.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Capa do Ebook */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm mx-auto">
              <Image 
                src="/capa_ebook_comovender.png" 
                alt="Capa do Ebook: Como Vender de Verdade no Instagram em 2025"
                width={400}
                height={600}
                className="w-full h-auto object-contain rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                priority
              />
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Como Vender de Verdade no
              <br />
              <span className="text-blue-500">Instagram em 2025</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Preparamos um ebook exclusivo com dicas valiosas para você. Clique no botão abaixo para fazer o download gratuito.
            </p>
            
            <Button 
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
            >
              Baixar Ebook
            </Button>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>📄 Formato PDF | 📱 Compatível com todos os dispositivos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 