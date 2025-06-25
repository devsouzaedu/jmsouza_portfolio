import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Gestor de Tráfego em Barueri | Profissional Certificado Google Ads e Meta',
  description: 'Gestor de tráfego especializado em Barueri. Profissional certificado em Google Ads e Meta Ads para empresas locais. Resultados comprovados.',
  keywords: 'gestor de tráfego Barueri, gestor Google Ads Barueri, gestor Meta Ads Barueri, profissional tráfego pago Barueri',
};

export default function GestorTrafegoBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-yellow-400">Gestor de Tráfego</span> em Barueri
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Sou gestor de tráfego especializado em Barueri, certificado Google Ads Partner e Meta Business Partner. 
              Transformo investimento em marketing digital em resultados reais para empresas locais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20um%20gestor%20de%20tráfego%20em%20Barueri" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Contratar Gestor
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
        </div>
      </section>

      {/* Serviços do Gestor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Serviços do Gestor de Tráfego
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Gestão Google Ads</h3>
              <p className="text-gray-600">
                Gestão completa de campanhas Google Ads com foco em ROI. 
                Otimização diária e relatórios detalhados de performance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaUsers className="text-4xl text-blue-800 mb-4" />
              <h3 className="text-xl font-bold mb-3">Gestão Meta Ads</h3>
              <p className="text-gray-600">
                Campanhas no Facebook e Instagram com segmentação avançada. 
                Criativos otimizados e testes A/B constantes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaChartLine className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Análise e Otimização</h3>
              <p className="text-gray-600">
                Análise profunda de dados, otimização contínua 
                e estratégias baseadas em performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que Contratar Este Gestor de Tráfego?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-700 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Especialista Local</h3>
                    <p className="text-gray-600">
                      Gestor de tráfego focado exclusivamente em Barueri, 
                      conhecendo o mercado local e comportamento do consumidor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaChartLine className="text-blue-700 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resultados Comprovados</h3>
                    <p className="text-gray-600">
                      Mais de 150 empresas atendidas em Barueri com aumento 
                      médio de 250% no ROI das campanhas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUsers className="text-blue-700 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Acompanhamento Próximo</h3>
                    <p className="text-gray-600">
                      Gestão hands-on com relatórios semanais e 
                      comunicação direta via WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Contrate o Gestor Agora
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxa de setup:</span>
                  <span className="font-bold text-blue-700">GRÁTIS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Primeira consultoria:</span>
                  <span className="font-bold text-blue-700">GRÁTIS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Relatórios:</span>
                  <span className="font-bold text-blue-700">Semanais</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Suporte:</span>
                  <span className="font-bold text-blue-700">WhatsApp</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full bg-blue-700 hover:bg-blue-800">
                <a href="https://wa.me/5511954997799?text=Quero%20contratar%20o%20gestor%20de%20tráfego" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Contratar Gestor
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter um Gestor de Tráfego Dedicado?
          </h2>
          <p className="text-xl mb-8">
            Vamos transformar seu investimento em marketing digital em resultados concretos para sua empresa em Barueri.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20contratar%20gestor%20de%20tráfego%20em%20Barueri" target="_blank">
              <FaWhatsapp className="mr-2" />
              Contratar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 