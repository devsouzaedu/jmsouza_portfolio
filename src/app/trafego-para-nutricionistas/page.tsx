import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaFacebook, FaChartLine, FaUtensils, FaHeartbeat } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Nutricionistas | Atraia Mais Pacientes Online',
  description: 'Especialista em tráfego pago para nutricionistas. Google Ads e Meta Ads para consultórios de nutrição. Aumente sua agenda com pacientes qualificados.',
  keywords: 'tráfego pago para nutricionistas, Google Ads nutricionista, anúncios para nutrição, marketing digital nutricionista, atrair pacientes nutrição',
};

export default function TrafegoPagoNutricionistasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tráfego Pago para <span className="text-yellow-300">Nutricionistas</span>
              </h1>
              <p className="text-xl mb-8">
                Especialista em tráfego pago para nutricionistas. Aumente sua agenda com pacientes 
                qualificados através de campanhas segmentadas no Google Ads e Meta Ads.
              </p>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20nutricionista%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Mais Pacientes
                </a>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/dra_alessandranutricionista_card.png"
                alt="Tráfego pago para nutricionistas"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Atrair Mais Pacientes para Seu Consultório
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Nutricionistas</h3>
              <p className="text-gray-600">
                Apareça quando as pessoas procuram por nutricionista na sua região. 
                Campanhas otimizadas para consultórios de nutrição.
              </p>
            </div>
                         <div className="bg-white p-8 rounded-lg shadow-md">
               <FaFacebook className="text-4xl text-blue-800 mb-4" />
               <h3 className="text-xl font-bold mb-3">Instagram e Facebook Ads</h3>
              <p className="text-gray-600">
                Alcance pessoas interessadas em alimentação saudável e perda de peso 
                nas redes sociais com anúncios segmentados.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaHeartbeat className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Campanhas Especializadas</h3>
              <p className="text-gray-600">
                Estratégias específicas para nutrição esportiva, emagrecimento, 
                nutrição infantil e outros nichos especializados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Resultados Reais para Nutricionistas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">+250%</div>
              <p className="text-gray-600">Aumento na agenda de consultas</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">R$ 8</div>
              <p className="text-gray-600">Custo médio por agendamento</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">15x</div>
              <p className="text-gray-600">Retorno sobre investimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Cheia de Pacientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que trazem pacientes qualificados para seu consultório de nutrição.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20meu%20consultório%20de%20nutrição" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 