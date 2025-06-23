import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaMeta, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago em Barueri | Especialista em Google Ads e Meta Ads',
  description: 'Especialista em tráfego pago em Barueri. Gestão profissional de Google Ads e Meta Ads para empresas locais. Aumente suas vendas com campanhas segmentadas.',
  keywords: 'tráfego pago em Barueri, Google Ads Barueri, Meta Ads Barueri, gestor de tráfego Barueri, anúncios em Barueri, marketing digital Barueri',
  openGraph: {
    title: 'Tráfego Pago em Barueri | Especialista em Google Ads e Meta Ads',
    description: 'Especialista em tráfego pago em Barueri. Gestão profissional de Google Ads e Meta Ads para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function TrafegoPagoBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Especialista em <span className="text-yellow-400">Tráfego Pago em Barueri</span>
              </h1>
              <p className="text-xl mb-8">
                Gestor de tráfego pago especializado em Google Ads e Meta Ads para empresas em Barueri, Alphaville e região. 
                Transforme visitantes em clientes com campanhas de anúncios segmentadas e de alta performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20tráfego%20pago%20em%20Barueri" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#casos-sucesso">
                    Ver Cases de Sucesso
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Especialista em tráfego pago em Barueri - Google Ads e Meta Ads"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços de Tráfego Pago */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Tráfego Pago em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como gestor de tráfego pago em Barueri, ofereço soluções completas em marketing digital 
              para empresas que buscam resultados reais e mensuráveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Google Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Gestão profissional de campanhas no Google Ads para empresas em Barueri. 
                Anúncios segmentados que aparecem quando seus clientes estão procurando seus serviços.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campanhas de pesquisa local</li>
                <li>• Anúncios no Google Maps</li>
                <li>• Remarketing personalizado</li>
                <li>• Otimização de conversões</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaMeta className="text-4xl text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meta Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Especialista em Meta Ads (Facebook e Instagram) para negócios locais em Barueri. 
                Alcance seu público-alvo com precisão nas redes sociais.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campanhas no Facebook e Instagram</li>
                <li>• Segmentação geográfica precisa</li>
                <li>• Criativos otimizados</li>
                <li>• Análise de performance</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaChartLine className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Digital Local</h3>
              <p className="text-gray-600 mb-4">
                Consultoria completa em tráfego pago focada em resultados para empresas da região de Barueri, 
                incluindo Alphaville e Tamboré.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Análise de concorrência local</li>
                <li>• Estratégias de conversão</li>
                <li>• Relatórios detalhados</li>
                <li>• Suporte contínuo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher nosso tráfego pago em Barueri */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que Escolher Nosso Gestor de Tráfego em Barueri?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Conhecimento Local</h3>
                    <p className="text-gray-600">
                      Especialista em tráfego pago com foco na região de Barueri, conhecendo o mercado local, 
                      concorrência e comportamento do consumidor da região.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUsers className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Segmentação Precisa</h3>
                    <p className="text-gray-600">
                      Anúncios regionais segmentados para atingir exatamente seu público-alvo em Barueri, 
                      Alphaville, Tamboré e cidades vizinhas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaChartLine className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resultados Comprovados</h3>
                    <p className="text-gray-600">
                      Histórico de sucesso em campanhas de tráfego pago para empresas locais, 
                      com aumento médio de 200% no tráfego qualificado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Solicite uma Análise Gratuita
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Quero%20uma%20análise%20gratuita%20de%20tráfego%20pago" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Enviar pelo WhatsApp
                  </a>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Área de Atendimento */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Atendimento em Tráfego Pago - Barueri e Região
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nosso escritório está localizado em Barueri, atendendo empresas em toda a região metropolitana oeste de São Paulo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Barueri</h3>
              <p className="text-gray-600">Atendimento presencial e online</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Alphaville</h3>
              <p className="text-gray-600">Consultoria especializada</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tamboré</h3>
              <p className="text-gray-600">Gestão de campanhas locais</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <p className="font-semibold text-gray-900">JMSOUZA - Especialista em Tráfego Pago</p>
            <p className="text-gray-600">Rua Maria Fernanda, 429</p>
            <p className="text-gray-600">Jardim Graziela - Barueri, SP</p>
            <p className="text-gray-600 mt-2">
              <FaPhone className="inline mr-2" />
              (11) 95499-7799
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Aumentar suas Vendas com Tráfego Pago?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato agora e descubra como nosso gestor de tráfego em Barueri 
            pode transformar seus anúncios em resultados reais.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20contratar%20tráfego%20pago%20em%20Barueri" target="_blank">
              <FaWhatsapp className="mr-2" />
              Falar com Especialista Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 