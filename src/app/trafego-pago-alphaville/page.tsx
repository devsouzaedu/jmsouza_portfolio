import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone, FaBuilding } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago em Alphaville | Especialista em Google Ads e Meta Ads',
  description: 'Especialista em tráfego pago em Alphaville. Gestão profissional de Google Ads e Meta Ads para empresas em Alphaville, Barueri e Tamboré.',
  keywords: 'tráfego pago Alphaville, Google Ads Alphaville, Meta Ads Alphaville, gestor tráfego Alphaville, anúncios Alphaville',
};

export default function TrafegoPagoAlphavillePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago em <span className="text-yellow-400">Alphaville</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para empresas em Alphaville. 
              Gestão profissional de Google Ads e Meta Ads com foco no público de alto padrão da região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20tráfego%20pago%20em%20Alphaville" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Solicitar Orçamento
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="#diferenciais">
                  Ver Diferenciais
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços para Alphaville */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tráfego Pago Especializado para Alphaville
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads Premium</h3>
              <p className="text-gray-600 mb-4">
                Campanhas Google Ads segmentadas para o público de alto padrão 
                de Alphaville, Tamboré e região.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Segmentação por renda e comportamento</li>
                <li>• Anúncios no Google Maps</li>
                <li>• Campanhas de marca premium</li>
                <li>• Remarketing qualificado</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaBuilding className="text-4xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Meta Ads Alphaville</h3>
              <p className="text-gray-600 mb-4">
                Campanhas no Facebook e Instagram direcionadas para 
                moradores e empresários de Alphaville.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Segmentação geográfica precisa</li>
                <li>• Públicos lookalike premium</li>
                <li>• Criativos sofisticados</li>
                <li>• Campanhas para empresas B2B</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaChartLine className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Performance Exclusiva</h3>
              <p className="text-gray-600 mb-4">
                Estratégias diferenciadas para o mercado de Alphaville 
                com foco em ROI e qualidade dos leads.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Análise de mercado local</li>
                <li>• Otimização por valor do cliente</li>
                <li>• Relatórios executivos</li>
                <li>• Consultoria estratégica</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais para Alphaville */}
      <section id="diferenciais" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Especialista no Mercado de Alphaville
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-800 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Conhecimento do Público Local</h3>
                    <p className="text-gray-600">
                      Especialista que entende o perfil sofisticado dos moradores e empresários 
                      de Alphaville, criando campanhas adequadas ao público de alto padrão.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBuilding className="text-blue-800 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Experiência B2B Premium</h3>
                    <p className="text-gray-600">
                      Vasta experiência com empresas e serviços premium em Alphaville, 
                      desde consultórios médicos de luxo até empresas corporativas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaChartLine className="text-blue-800 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ROI Otimizado</h3>
                    <p className="text-gray-600">
                      Foco em qualidade sobre quantidade, priorizando leads de alto valor 
                      e clientes com maior potencial de faturamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Análise Gratuita para Alphaville
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Auditoria do mercado de Alphaville</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Análise da concorrência local</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Estratégia personalizada premium</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Projeção de ROI para Alphaville</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full bg-blue-800 hover:bg-blue-900">
                <a href="https://wa.me/5511954997799?text=Quero%20análise%20gratuita%20para%20Alphaville" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Solicitar Análise Gratuita
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Dominar o Mercado Digital de Alphaville?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que geram resultados excepcionais para seu negócio em Alphaville.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20em%20Alphaville" target="_blank">
                <FaWhatsapp className="mr-2" />
                Começar Agora
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