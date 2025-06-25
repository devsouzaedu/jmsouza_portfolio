import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Salões de Beleza | Aumente Sua Agenda e Faturamento',
  description: 'Especialista em tráfego pago para salões de beleza e estética. Google Ads e Meta Ads para salões. Atraia mais clientes e aumente agendamentos.',
  keywords: 'tráfego pago para salões de beleza, Google Ads salão, anúncios para salão de beleza, marketing digital salão',
};

export default function TrafegoPagoSaloesBelezaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago para <span className="text-yellow-300">Salões de Beleza</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para salões de beleza e estética. 
              Aumente sua agenda com clientes que valorizam beleza e autoestima.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Tenho%20um%20salão%20de%20beleza%20e%20preciso%20de%20tráfego%20pago" target="_blank">
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
            Como Lotar Seu Salão de Beleza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Salões</h3>
              <p className="text-gray-600">
                Apareça quando pessoas procuram por salão de beleza na sua região. 
                Campanhas otimizadas para serviços de beleza e estética.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaStar className="text-4xl text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Serviços Especializados</h3>
              <p className="text-gray-600">
                Campanhas para cabelo, unhas, sobrancelhas, 
                maquiagem, tratamentos faciais e corporais.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agendamento Online</h3>
              <p className="text-gray-600">
                Integração com sistemas de agendamento para facilitar 
                o processo de marcação de horários.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pink-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Sempre Cheia?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que atraem clientes apaixonados por beleza e autoestima.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20meu%20salão%20de%20beleza" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 