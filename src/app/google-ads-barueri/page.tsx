import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaSearch, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaChartLine, FaUsers, FaTachometerAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Google Ads Barueri | Especialista em Campanhas Google Ads',
  description: 'Especialista em Google Ads Barueri. Gestão profissional de campanhas Google Ads para empresas locais. Aumente suas vendas com anúncios no Google.',
  keywords: 'Google Ads Barueri, especialista em Google Ads Barueri, campanhas Google Ads, anúncios Google Barueri, gestor Google Ads Barueri',
  openGraph: {
    title: 'Google Ads Barueri | Especialista em Campanhas Google Ads',
    description: 'Especialista em Google Ads Barueri. Gestão profissional de campanhas Google Ads para empresas locais.',
    images: ['/PartnerBadge.png'],
  },
};

export default function GoogleAdsBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Especialista em <span className="text-yellow-400">Google Ads Barueri</span>
              </h1>
              <p className="text-xl mb-8">
                Gestão profissional de campanhas Google Ads para empresas em Barueri. 
                Parceiro oficial do Google com expertise em anúncios locais que geram resultados reais.
              </p>
              <div className="flex items-center mb-6">
                <Image
                  src="/PartnerBadge.png"
                  alt="Google Partner Badge - Especialista Google Ads Barueri"
                  width={120}
                  height={40}
                  className="mr-4"
                />
                <span className="text-sm">Parceiro Oficial Google</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20Google%20Ads%20em%20Barueri" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Proposta
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#auditoria-gratuita">
                    Auditoria Gratuita
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Especialista em Google Ads Barueri - Campanhas profissionais"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Google Ads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Google Ads em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como especialista em Google Ads Barueri, oferecemos gestão completa de campanhas 
              para empresas que buscam aumentar vendas e gerar leads qualificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaSearch className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Campanhas de Pesquisa</h3>
              <p className="text-gray-600 mb-4">
                Anúncios no Google que aparecem quando seus clientes procuram por seus produtos 
                ou serviços em Barueri e região.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Palavras-chave estratégicas</li>
                <li>• Anúncios otimizados</li>
                <li>• Segmentação geográfica</li>
                <li>• Extensões de anúncio</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaMapMarkerAlt className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Google Ads Local</h3>
              <p className="text-gray-600 mb-4">
                Campanhas focadas em Barueri, Alphaville e Tamboré para empresas que atendem 
                clientes locais e regionais.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Anúncios no Google Maps</li>
                <li>• Campanhas "Perto de mim"</li>
                <li>• Extensões de localização</li>
                <li>• Horários comerciais</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaChartLine className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Remarketing Google</h3>
              <p className="text-gray-600 mb-4">
                Reconquiste visitantes que não converteram na primeira visita com campanhas 
                de remarketing inteligentes.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Listas de remarketing</li>
                <li>• Anúncios personalizados</li>
                <li>• Audiences similares</li>
                <li>• Otimização de conversões</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas e Resultados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Comprovados em Google Ads Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Números reais de campanhas Google Ads gerenciadas para empresas em Barueri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <FaUsers className="text-3xl text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">+50</div>
              <p className="text-gray-600">Empresas Atendidas</p>
            </div>

            <div className="text-center bg-green-50 p-6 rounded-lg">
              <FaChartLine className="text-3xl text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">+300%</div>
              <p className="text-gray-600">Aumento Médio em Conversões</p>
            </div>

            <div className="text-center bg-purple-50 p-6 rounded-lg">
              <FaTachometerAlt className="text-3xl text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.5x</div>
              <p className="text-gray-600">ROI Médio das Campanhas</p>
            </div>

            <div className="text-center bg-orange-50 p-6 rounded-lg">
              <FaGoogle className="text-3xl text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Taxa de Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processo de Trabalho */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona Nosso Google Ads em Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Processo estruturado para garantir o sucesso das suas campanhas Google Ads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Análise Inicial</h3>
              <p className="text-gray-600">
                Auditoria completa do seu negócio, concorrência em Barueri e oportunidades no Google Ads.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Estratégia</h3>
              <p className="text-gray-600">
                Desenvolvimento de estratégia personalizada com palavras-chave e segmentação específica.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Implementação</h3>
              <p className="text-gray-600">
                Criação e configuração das campanhas Google Ads com monitoramento constante.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Otimização</h3>
              <p className="text-gray-600">
                Otimização contínua baseada em dados para maximizar resultados e ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auditoria Gratuita */}
      <section id="auditoria-gratuita" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Auditoria Gratuita Google Ads
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Receba uma análise completa das suas campanhas atuais ou uma estratégia 
                personalizada para começar no Google Ads em Barueri.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-3" />
                  <span className="text-gray-700">Análise de palavras-chave</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-3" />
                  <span className="text-gray-700">Pesquisa de concorrência local</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-3" />
                  <span className="text-gray-700">Estimativa de investimento</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-3" />
                  <span className="text-gray-700">Projeção de resultados</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Solicite sua Auditoria Gratuita
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
                  <label htmlFor="site" className="block text-sm font-medium text-gray-700 mb-1">
                    Site (opcional)
                  </label>
                  <input
                    type="url"
                    id="site"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="www.suaempresa.com.br"
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
                  <a href="https://wa.me/5511954997799?text=Oi!%20Quero%20uma%20auditoria%20gratuita%20Google%20Ads" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Auditoria Gratuita
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
            Google Ads Barueri e Região
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Especialista em Google Ads atendendo empresas em Barueri, Alphaville, Tamboré 
            e toda região oeste da Grande São Paulo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Barueri</h3>
              <p className="text-gray-600">Atendimento presencial</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Alphaville</h3>
              <p className="text-gray-600">Campanhas locais</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tamboré</h3>
              <p className="text-gray-600">Google Ads regional</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <p className="font-semibold text-gray-900">JMSOUZA - Especialista Google Ads</p>
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
            Pronto para Dominar o Google em Barueri?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato agora e descubra como nosso especialista em Google Ads Barueri 
            pode transformar seus anúncios em vendas reais.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20começar%20com%20Google%20Ads%20em%20Barueri" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Google Ads Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 