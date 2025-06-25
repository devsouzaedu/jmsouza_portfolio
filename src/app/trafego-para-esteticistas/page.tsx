import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaCalendarAlt, FaStar, FaHeart } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Esteticistas | Aumente Sua Agenda de Clientes',
  description: 'Especialista em tráfego pago para esteticistas e clínicas de estética. Google Ads e Meta Ads para estética. Atraia mais clientes para tratamentos.',
  keywords: 'tráfego pago para esteticistas, Google Ads esteticista, anúncios para estética, marketing digital esteticista',
};

export default function TrafegoPagoEsteticistasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago para <span className="text-yellow-300">Esteticistas</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para esteticistas e clínicas de estética. 
              Aumente sua agenda com clientes que buscam tratamentos de beleza e bem-estar.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20esteticista%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                <FaWhatsapp className="mr-2" />
                Quero Mais Clientes
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Atrair Mais Clientes para Sua Clínica de Estética
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Esteticistas</h3>
              <p className="text-gray-600">
                Apareça quando pessoas procuram por tratamentos estéticos na sua região. 
                Campanhas otimizadas para clínicas de estética e beleza.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaHeart className="text-4xl text-rose-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tratamentos Específicos</h3>
              <p className="text-gray-600">
                Campanhas para limpeza de pele, peeling, massagens, 
                drenagem linfática, depilação e outros tratamentos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agendamento Facilitado</h3>
              <p className="text-gray-600">
                Integração com sistemas de agendamento online 
                para facilitar o processo de marcação de tratamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Resultados para Esteticistas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-600 mb-2">+180%</div>
              <p className="text-gray-600">Aumento na agenda de tratamentos</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-600 mb-2">R$ 12</div>
              <p className="text-gray-600">Custo médio por agendamento</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-600 mb-2">12x</div>
              <p className="text-gray-600">Retorno sobre investimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rose-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Sempre Cheia?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que atraem clientes interessados em cuidar da beleza e autoestima.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20minha%20clínica%20de%20estética" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 