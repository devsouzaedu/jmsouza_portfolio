import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaCalendarAlt, FaShieldAlt, FaTooth } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Dentistas | Aumente Sua Agenda de Pacientes',
  description: 'Especialista em tráfego pago para dentistas e clínicas odontológicas. Google Ads e Meta Ads para consultórios dentários. Atraia mais pacientes.',
  keywords: 'tráfego pago para dentistas, Google Ads dentista, anúncios para clínica odontológica, marketing digital dentista, atrair pacientes dentista',
};

export default function TrafegoPagoDentistasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tráfego Pago para <span className="text-yellow-300">Dentistas</span>
              </h1>
              <p className="text-xl mb-8">
                Especialista em tráfego pago para dentistas e clínicas odontológicas. 
                Aumente sua agenda com pacientes qualificados através de campanhas segmentadas.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20dentista%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Mais Pacientes
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Atrair Mais Pacientes para Sua Clínica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Dentistas</h3>
              <p className="text-gray-600">
                Apareça quando as pessoas procuram por dentista na sua região. 
                Campanhas otimizadas para clínicas odontológicas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agendamentos Online</h3>
              <p className="text-gray-600">
                Integração com sistemas de agendamento para facilitar 
                o processo de marcação de consultas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaShieldAlt className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Campanhas Especializadas</h3>
              <p className="text-gray-600">
                Estratégias específicas para ortodontia, implantes, 
                estética dental e outros tratamentos especializados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Cheia de Pacientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que trazem pacientes qualificados para sua clínica odontológica.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20minha%20clínica%20odontológica" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 