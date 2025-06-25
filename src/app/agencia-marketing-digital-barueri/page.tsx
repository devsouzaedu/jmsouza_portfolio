import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaChartLine, FaUsers, FaMapMarkerAlt, FaPhone, FaRocket } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Agência de Marketing Digital em Barueri | Soluções Completas para Empresas',
  description: 'Agência de marketing digital especializada em Barueri. Tráfego pago, criação de sites, SEO e estratégias digitais para empresas locais.',
  keywords: 'agência marketing digital Barueri, agência Google Ads Barueri, agência tráfego pago Barueri, marketing digital empresas Barueri',
};

export default function AgenciaMarketingDigitalBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-yellow-400">Agência de Marketing Digital</span> em Barueri
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Agência especializada em marketing digital para empresas em Barueri. 
              Soluções completas em tráfego pago, criação de sites, SEO e estratégias digitais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20dos%20serviços%20da%20agência%20de%20marketing%20digital" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Solicitar Proposta
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="#servicos">
                  Ver Serviços
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços da Agência */}
      <section id="servicos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Serviços da Agência de Marketing Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tráfego Pago</h3>
              <p className="text-gray-600 mb-4">
                Gestão completa de Google Ads e Meta Ads. 
                Campanhas otimizadas para gerar leads e vendas.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google Ads</li>
                <li>• Meta Ads (Facebook/Instagram)</li>
                <li>• YouTube Ads</li>
                <li>• LinkedIn Ads</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaRocket className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Criação de Sites</h3>
              <p className="text-gray-600 mb-4">
                Sites profissionais otimizados para conversão 
                e rankeamento no Google.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sites Responsivos</li>
                <li>• Landing Pages</li>
                <li>• E-commerce</li>
                <li>• Otimização SEO</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaChartLine className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">SEO Local</h3>
              <p className="text-gray-600 mb-4">
                Otimização para aparecer no Google quando 
                procuram por seus serviços em Barueri.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google Meu Negócio</li>
                <li>• SEO Local</li>
                <li>• Criação de Conteúdo</li>
                <li>• Link Building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais da Agência */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que Escolher Nossa Agência?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl text-purple-600 mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Foco Local</h3>
              <p className="text-gray-600 text-sm">
                Agência especializada em empresas de Barueri e região.
              </p>
            </div>

            <div className="text-center">
              <FaUsers className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Time Especializado</h3>
              <p className="text-gray-600 text-sm">
                Profissionais certificados em todas as plataformas.
              </p>
            </div>

            <div className="text-center">
              <FaChartLine className="text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Resultados Comprovados</h3>
              <p className="text-gray-600 text-sm">
                Mais de 200 empresas atendidas com sucesso.
              </p>
            </div>

            <div className="text-center">
              <FaPhone className="text-4xl text-orange-600 mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Suporte Próximo</h3>
              <p className="text-gray-600 text-sm">
                Atendimento personalizado e comunicação direta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-purple-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Transformar Seu Negócio Digital?
          </h2>
          <p className="text-xl mb-8">
            Nossa agência está pronta para levar sua empresa ao próximo nível no marketing digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/5511954997799?text=Quero%20uma%20proposta%20da%20agência%20de%20marketing%20digital" target="_blank">
                <FaWhatsapp className="mr-2" />
                Solicitar Proposta
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