import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone, FaBrain, FaRocket, FaBullseye } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Estrategista Digital em Barueri | Consultor de Marketing Digital Especializado',
  description: 'Estrategista digital especializado em Barueri. Consultoria em marketing digital, planejamento estratégico e growth hacking para empresas locais.',
  keywords: 'estrategista digital Barueri, consultor marketing digital Barueri, planejamento digital Barueri, growth hacking Barueri, estratégia marketing online',
  openGraph: {
    title: 'Estrategista Digital em Barueri | Consultor Especializado',
    description: 'Estrategista digital especializado em Barueri com foco em resultados mensuráveis.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function EstrategistaDigitalBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-400">Estrategista Digital</span> em Barueri
              </h1>
              <p className="text-xl mb-8">
                Estrategista digital especializado em transformar negócios através de estratégias 
                de marketing digital personalizadas para empresas em Barueri e região.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20um%20estrategista%20digital" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Consultoria Estratégica
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#metodologia">
                    Ver Metodologia
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Estrategista digital em Barueri - Consultoria especializada"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços de Estratégia Digital */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Estratégia Digital em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como estrategista digital, ofereço soluções completas para posicionar 
              sua empresa como líder no mercado digital de Barueri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaBrain className="text-4xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Planejamento Estratégico</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvimento de estratégias digitais personalizadas baseadas em análise 
                de mercado local de Barueri e objetivos específicos do seu negócio.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Análise competitiva local</li>
                <li>• Definição de personas</li>
                <li>• Roadmap de crescimento</li>
                <li>• KPIs e métricas estratégicas</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaRocket className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Hacking</h3>
              <p className="text-gray-600 mb-4">
                Estratégias de crescimento acelerado utilizando técnicas avançadas 
                de growth hacking adaptadas para o mercado de Barueri.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Funis de conversão otimizados</li>
                <li>• Automação de marketing</li>
                <li>• Testes A/B estratégicos</li>
                <li>• Viral loops e referrals</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaBullseye className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Digital</h3>
              <p className="text-gray-600 mb-4">
                Otimização contínua de performance digital com foco em ROI e 
                resultados mensuráveis para empresas em Barueri.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Otimização de conversões</li>
                <li>• Análise de dados avançada</li>
                <li>• Relatórios estratégicos</li>
                <li>• Consultoria contínua</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia do Estrategista */}
      <section id="metodologia" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Metodologia do Estrategista Digital
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Framework proprietário desenvolvido especificamente para empresas em Barueri, 
              baseado em data-driven decisions e growth mindset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBrain className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Diagnóstico</h3>
              <p className="text-gray-600 text-sm">
                Análise profunda do negócio, mercado de Barueri e identificação 
                de oportunidades de crescimento digital.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBullseye className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Estratégia</h3>
              <p className="text-gray-600 text-sm">
                Desenvolvimento de estratégia digital personalizada com objetivos 
                claros e timeline definido.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Execução</h3>
              <p className="text-gray-600 text-sm">
                Implementação das estratégias com acompanhamento próximo 
                e ajustes baseados em performance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Otimização</h3>
              <p className="text-gray-600 text-sm">
                Análise contínua de resultados e otimização das estratégias 
                para maximizar o ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais do Estrategista */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que Escolher Nosso Estrategista Digital?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-indigo-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Especialista Local</h3>
                    <p className="text-gray-600">
                      Estrategista digital com foco exclusivo em Barueri, conhecendo 
                      profundamente o mercado local e suas particularidades.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaChartLine className="text-indigo-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Data-Driven</h3>
                    <p className="text-gray-600">
                      Todas as estratégias são baseadas em dados reais e análises 
                      aprofundadas, garantindo decisões assertivas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaRocket className="text-indigo-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Growth Mindset</h3>
                    <p className="text-gray-600">
                      Foco em crescimento sustentável e escalável, sempre buscando 
                      inovação e otimização contínua.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Consultoria Estratégica Gratuita
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Diagnóstico completo do seu negócio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Plano estratégico personalizado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Roadmap de crescimento digital</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <a href="https://wa.me/5511954997799?text=Quero%20uma%20consultoria%20estratégica%20gratuita" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Agendar Consultoria Gratuita
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Transformar seu Negócio com Estratégia Digital?
          </h2>
          <p className="text-xl mb-8">
            Vamos desenvolver uma estratégia digital que posicione sua empresa como 
            líder no mercado de Barueri. Entre em contato agora!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/5511954997799?text=Quero%20contratar%20um%20estrategista%20digital" target="_blank">
                <FaWhatsapp className="mr-2" />
                Contratar Estrategista
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