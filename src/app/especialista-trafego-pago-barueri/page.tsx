import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaMeta, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone, FaCertificate, FaTrophy } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Especialista em Tráfego Pago em Barueri | Gestor Certificado Google Ads',
  description: 'Especialista certificado em tráfego pago em Barueri. Gestor experiente em Google Ads e Meta Ads com resultados comprovados para empresas locais.',
  keywords: 'especialista tráfego pago Barueri, gestor certificado Google Ads Barueri, especialista Meta Ads Barueri, consultor tráfego pago, expert marketing digital Barueri',
  openGraph: {
    title: 'Especialista em Tráfego Pago em Barueri | Gestor Certificado',
    description: 'Especialista certificado em tráfego pago em Barueri com resultados comprovados.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function EspecialistaTrafegoPagoBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-400">Especialista</span> em Tráfego Pago em Barueri
              </h1>
              <p className="text-xl mb-8">
                Sou especialista certificado em tráfego pago com mais de 5 anos de experiência em Barueri. 
                Gestor Google Ads Partner e Meta Business Partner, focado em resultados reais para empresas locais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Quero%20falar%20com%20o%20especialista%20em%20tráfego%20pago" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Falar com Especialista
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#certificacoes">
                    Ver Certificações
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Especialista em tráfego pago em Barueri - Certificado Google Ads"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certificações e Credenciais */}
      <section id="certificacoes" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certificações de Especialista em Tráfego Pago
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como especialista em tráfego pago em Barueri, possuo as principais certificações 
              do mercado digital para garantir os melhores resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaCertificate className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Google Ads Certified</h3>
              <p className="text-sm text-gray-600">Certificação oficial Google Ads</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaTrophy className="text-4xl text-blue-800 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Google Partner</h3>
              <p className="text-sm text-gray-600">Parceiro oficial Google</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaCertificate className="text-4xl text-purple-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Meta Business Partner</h3>
              <p className="text-sm text-gray-600">Parceiro oficial Meta</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaChartLine className="text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="font-bold text-gray-900 mb-2">Analytics Certified</h3>
              <p className="text-sm text-gray-600">Especialista em análise de dados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência e Resultados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que Sou o Especialista em Tráfego Pago Ideal para Barueri?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-purple-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Especialista Local</h3>
                    <p className="text-gray-600">
                      5+ anos como especialista em tráfego pago focado exclusivamente na região de Barueri, 
                      conhecendo profundamente o mercado local e comportamento do consumidor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaTrophy className="text-purple-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resultados Comprovados</h3>
                    <p className="text-gray-600">
                      Mais de 200 empresas atendidas em Barueri com aumento médio de 300% no ROI das campanhas. 
                      Especialista reconhecido pelos principais resultados da região.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCertificate className="text-purple-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Certificações Oficiais</h3>
                    <p className="text-gray-600">
                      Único especialista em Barueri com todas as certificações Google e Meta atualizadas. 
                      Sempre atualizado com as últimas tendências e ferramentas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Análise Gratuita com Especialista
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Auditoria completa das campanhas atuais</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Estratégia personalizada para seu negócio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Projeção de resultados baseada em dados</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                <a href="https://wa.me/5511954997799?text=Quero%20uma%20análise%20gratuita%20com%20o%20especialista" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Solicitar Análise Gratuita
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia do Especialista */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Metodologia do Especialista em Tráfego Pago
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como especialista, desenvolvi uma metodologia exclusiva para maximizar 
              os resultados de campanhas de tráfego pago em Barueri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Análise Estratégica</h3>
              <p className="text-gray-600">
                Análise profunda do mercado de Barueri, concorrência local e identificação 
                de oportunidades específicas para seu negócio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Implementação Técnica</h3>
              <p className="text-gray-600">
                Configuração avançada de campanhas com segmentação precisa para Barueri, 
                otimização de landing pages e tracking de conversões.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Otimização Contínua</h3>
              <p className="text-gray-600">
                Monitoramento diário, testes A/B constantes e ajustes baseados em dados 
                para maximizar o retorno sobre investimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Trabalhar com o Especialista em Tráfego Pago de Barueri?
          </h2>
          <p className="text-xl mb-8">
            Vamos transformar seu investimento em marketing digital em resultados concretos. 
            Entre em contato agora e descubra como um especialista pode revolucionar seus resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/5511954997799?text=Quero%20contratar%20o%20especialista%20em%20tráfego%20pago" target="_blank">
                <FaWhatsapp className="mr-2" />
                Contratar Especialista
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="tel:+5511954997799">
                <FaPhone className="mr-2" />
                Ligar Agora
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 