import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaFacebook, FaInstagram, FaMeta, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaChartLine, FaUsers, FaHeart, FaEye } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Meta Ads Barueri | Especialista em Facebook e Instagram Ads',
  description: 'Especialista em Meta Ads Barueri. Gestão profissional de campanhas Facebook e Instagram Ads para empresas locais. Aumente seu alcance nas redes sociais.',
  keywords: 'Meta Ads Barueri, Facebook Ads Barueri, Instagram Ads Barueri, gestor de Meta Ads em Barueri, anúncios Facebook Barueri',
  openGraph: {
    title: 'Meta Ads Barueri | Especialista em Facebook e Instagram Ads',
    description: 'Especialista em Meta Ads Barueri. Gestão profissional de campanhas Facebook e Instagram Ads para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function MetaAdsBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Especialista em <span className="text-yellow-400">Meta Ads Barueri</span>
              </h1>
              <p className="text-xl mb-8">
                Gestor de Meta Ads em Barueri especializado em Facebook e Instagram Ads. 
                Campanhas que geram engajamento, leads e vendas para empresas locais.
              </p>
              <div className="flex items-center mb-6">
                <FaFacebook className="text-2xl mr-2" />
                <FaInstagram className="text-2xl mr-4" />
                <span className="text-sm">Facebook & Instagram Certified</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20Meta%20Ads%20em%20Barueri" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Proposta
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#cases-meta">
                    Ver Cases Meta Ads
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Especialista em Meta Ads Barueri - Facebook e Instagram Ads"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Meta Ads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Meta Ads em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como gestor de Meta Ads em Barueri, oferecemos campanhas completas no Facebook e Instagram 
              para empresas que buscam aumentar vendas e engajamento nas redes sociais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaFacebook className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Facebook Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Campanhas no Facebook direcionadas para o público de Barueri e região, 
                com segmentação precisa e criativos que convertem.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campanhas de conversão</li>
                <li>• Geração de leads</li>
                <li>• Tráfego para site</li>
                <li>• Reconhecimento de marca</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaInstagram className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instagram Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Anúncios no Instagram com foco visual e storytelling para empresas 
                que querem se conectar com o público local de forma autêntica.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Stories e Feed Ads</li>
                <li>• Reels promocionais</li>
                <li>• Shopping no Instagram</li>
                <li>• Influencer partnerships</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaMeta className="text-4xl text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meta Business Suite</h3>
              <p className="text-gray-600 mb-4">
                Gestão completa através do Meta Business Suite com campanhas integradas 
                entre Facebook e Instagram para máximo alcance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campanhas integradas</li>
                <li>• Pixel de conversão</li>
                <li>• Catálogo de produtos</li>
                <li>• Remarketing avançado</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Campanhas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Campanhas Meta Ads que Criamos
            </h2>
            <p className="text-lg text-gray-600">
              Estratégias personalizadas para diferentes objetivos de negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <FaEye className="text-3xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reconhecimento</h3>
              <p className="text-gray-600 text-sm">
                Campanhas para aumentar o conhecimento da sua marca em Barueri e região.
              </p>
            </div>

            <div className="text-center bg-green-50 p-6 rounded-lg">
              <FaUsers className="text-3xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Geração de Leads</h3>
              <p className="text-gray-600 text-sm">
                Captura de contatos qualificados interessados nos seus produtos ou serviços.
              </p>
            </div>

            <div className="text-center bg-purple-50 p-6 rounded-lg">
              <FaChartLine className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conversões</h3>
              <p className="text-gray-600 text-sm">
                Campanhas focadas em vendas e ações específicas no seu site ou loja.
              </p>
            </div>

            <div className="text-center bg-pink-50 p-6 rounded-lg">
              <FaHeart className="text-3xl text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Engajamento</h3>
              <p className="text-gray-600 text-sm">
                Aumente curtidas, comentários e compartilhamentos nas suas publicações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens Meta Ads Local */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que Escolher Nosso Meta Ads em Barueri?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Segmentação Local Precisa</h3>
                    <p className="text-gray-600">
                      Especialista em Meta Ads com foco na região de Barueri, conhecendo o comportamento 
                      do público local nas redes sociais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUsers className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Criativos que Convertem</h3>
                    <p className="text-gray-600">
                      Desenvolvimento de criativos visuais e copy persuasivo que geram engajamento 
                      e conversões no Facebook e Instagram.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaChartLine className="text-blue-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Otimização Constante</h3>
                    <p className="text-gray-600">
                      Monitoramento e otimização diária das campanhas para garantir o melhor 
                      custo por resultado e ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Análise Gratuita Meta Ads
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
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram/Facebook (opcional)
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="@seuinstagram"
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
                  <a href="https://wa.me/5511954997799?text=Oi!%20Quero%20uma%20análise%20gratuita%20Meta%20Ads" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Análise Gratuita
                  </a>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Cases de Sucesso Meta */}
      <section id="cases-meta" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cases de Sucesso Meta Ads Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Resultados reais de campanhas Meta Ads para empresas em Barueri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src="/barbearia_da_gringa_card.png"
                  alt="Barbearia da Gringa - Meta Ads"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Barbearia da Gringa</h3>
                  <p className="text-gray-600 text-sm">Barbearia em Barueri</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Campanhas no Instagram que aumentaram agendamentos em 85% através de Stories e posts promocionais.
              </p>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-green-800 font-semibold text-sm">+85% agendamentos</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src="/oliver_fundo_site.jpg"
                  alt="Espaço Oliver Beauty - Meta Ads"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Espaço Oliver Beauty</h3>
                  <p className="text-gray-600 text-sm">Salão de beleza</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Meta Ads focado em público feminino local, gerando 120% mais leads qualificados.
              </p>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-blue-800 font-semibold text-sm">+120% leads</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src="/mariana_fundo_site.png"
                  alt="Mariana Nails - Meta Ads"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Mariana Nails</h3>
                  <p className="text-gray-600 text-sm">Nail designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Campanhas visuais no Instagram que triplicaram o engajamento e dobrou a cartela de clientes.
              </p>
              <div className="bg-purple-100 p-3 rounded">
                <p className="text-purple-800 font-semibold text-sm">+200% clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Área de Atendimento */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meta Ads Barueri e Região
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Gestor de Meta Ads especializado atendendo empresas em Barueri, Alphaville, Tamboré 
            e toda região oeste da Grande São Paulo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Barueri</h3>
              <p className="text-gray-600">Meta Ads local</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Alphaville</h3>
              <p className="text-gray-600">Facebook e Instagram Ads</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tamboré</h3>
              <p className="text-gray-600">Campanhas regionais</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <p className="font-semibold text-gray-900">JMSOUZA - Especialista Meta Ads</p>
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
      <section className="py-16 bg-gradient-to-r from-blue-800 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Dominar o Facebook e Instagram?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato agora e descubra como nosso gestor de Meta Ads em Barueri 
            pode transformar suas redes sociais em uma máquina de vendas.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20começar%20com%20Meta%20Ads%20em%20Barueri" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Meta Ads Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 