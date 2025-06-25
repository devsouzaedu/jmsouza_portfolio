import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaMapMarkerAlt, FaCut } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Barbearias | Aumente Seu Movimento e Faturamento',
  description: 'Especialista em tráfego pago para barbearias. Google Ads e Meta Ads para barbershops. Atraia mais clientes e aumente o faturamento da sua barbearia.',
  keywords: 'tráfego pago para barbearias, Google Ads barbearia, anúncios para barbershop, marketing digital barbearia, atrair clientes barbearia',
};

export default function TrafegoPagoBarbeariasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tráfego Pago para <span className="text-yellow-400">Barbearias</span>
              </h1>
              <p className="text-xl mb-8">
                Especialista em tráfego pago para barbearias. Aumente o movimento da sua barbearia 
                com campanhas segmentadas que atraem clientes da sua região.
              </p>
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Tenho%20uma%20barbearia%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Mais Clientes
                </a>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/barbearia_da_gringa_card.png"
                alt="Tráfego pago para barbearias"
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
            Como Encher Sua Barbearia de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaMapMarkerAlt className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Anúncios Locais</h3>
              <p className="text-gray-600">
                Apareça quando as pessoas procuram por barbearia perto delas. 
                Segmentação geográfica precisa para sua região.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                             <FaGoogle className="text-4xl text-blue-800 mb-4" />
              <h3 className="text-xl font-bold mb-3">Instagram e Facebook</h3>
              <p className="text-gray-600">
                Mostre seus trabalhos nas redes sociais e atraia clientes 
                interessados em cortes modernos e barba bem feita.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaUsers className="text-4xl text-gray-700 mb-4" />
              <h3 className="text-xl font-bold mb-3">Fidelização de Clientes</h3>
              <p className="text-gray-600">
                Campanhas de remarketing para trazer clientes de volta 
                e aumentar a frequência de visitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que Sua Barbearia Precisa de Tráfego Pago?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                                     <FaCut className="text-red-600 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Concorrência Acirrada</h3>
                    <p className="text-gray-600">
                      Com tantas barbearias abrindo, você precisa se destacar online 
                      para não perder clientes para a concorrência.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-600 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Clientes Locais</h3>
                    <p className="text-gray-600">
                      Atraia clientes da sua região que estão procurando uma barbearia 
                      de qualidade perto de casa ou trabalho.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-red-600 text-xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Agenda Sempre Cheia</h3>
                    <p className="text-gray-600">
                      Mantenha sua agenda sempre lotada com um fluxo constante 
                      de novos clientes vindos dos anúncios online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Resultados para Barbearias
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Novos clientes por mês:</span>
                  <span className="text-yellow-400 font-bold">+150</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Aumento no faturamento:</span>
                  <span className="text-yellow-400 font-bold">+200%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Custo por cliente:</span>
                  <span className="text-yellow-400 font-bold">R$ 5</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full mt-6 bg-red-600 hover:bg-red-700">
                <a href="https://wa.me/5511954997799?text=Quero%20esses%20resultados%20para%20minha%20barbearia" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Esses Resultados
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Lotar Sua Barbearia de Clientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que trazem clientes qualificados para sua barbearia todos os dias.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20minha%20barbearia" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 