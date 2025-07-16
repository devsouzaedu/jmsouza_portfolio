'use client'

import { Button } from '@/components/Button'
import Image from 'next/image'
import { useState } from 'react'

export default function EbookContent() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Por favor, insira seu email.')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      // Salvar lead via API
      const response = await fetch('/api/ebook-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          name: name.trim() || undefined
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao processar solicitação')
      }

      if (result.existing) {
        setMessage('Este email já foi cadastrado. Iniciando download...')
      } else {
        setMessage('Email cadastrado com sucesso! Iniciando download...')
      }

      // Iniciar download após salvar
      setTimeout(() => {
        handleDownload()
        setShowForm(false)
        setMessage('Download iniciado! Verifique sua pasta de downloads.')
      }, 1500)

    } catch (error) {
      console.error('Erro ao salvar lead:', error)
      setMessage(error instanceof Error ? error.message : 'Erro ao processar solicitação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

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
                src="/capa_ebook_comovender2.png" 
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
              Preparamos um ebook exclusivo com dicas valiosas para você. Preencha os dados abaixo para fazer o download gratuito.
            </p>
            
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome (opcional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Seu melhor email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
                >
                  {isLoading ? 'Processando...' : 'Baixar Ebook Gratuito'}
                </Button>
              </form>
            ) : (
              <div className="mb-6">
                <Button 
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
                >
                  Baixar Novamente
                </Button>
              </div>
            )}
            
            {message && (
              <div className={`p-4 rounded-lg mb-4 ${
                message.includes('sucesso') || message.includes('Download iniciado') 
                  ? 'bg-green-900 text-green-300' 
                  : message.includes('Erro') 
                  ? 'bg-red-900 text-red-300'
                  : 'bg-blue-900 text-blue-300'
              }`}>
                {message}
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-400">
              <p>📄 Formato PDF | 📱 Compatível com todos os dispositivos</p>
              <p className="mt-2">🔒 Seus dados estão seguros e não serão compartilhados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 